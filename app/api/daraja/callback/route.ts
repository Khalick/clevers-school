import { type NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        console.log("M-Pesa Callback received:", JSON.stringify(data, null, 2));

        const { Body } = data;
        const { stkCallback } = Body;

        if (!stkCallback) {
            return NextResponse.json({ success: false, message: "Invalid callback data" }, { status: 400 });
        }

        const { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } = stkCallback;

        const { db } = await connectToDatabase();
        const transactions = db.collection("mpesa_transactions");

        // Find the transaction
        const transaction = await transactions.findOne({ checkoutRequestID: CheckoutRequestID });

        if (!transaction) {
            console.error(`Transaction not found for CheckoutRequestID: ${CheckoutRequestID}`);
            return NextResponse.json({ success: false, message: "Transaction not found" }, { status: 404 });
        }

        if (ResultCode === 0) {
            // Payment Successful
            // Extract details from CallbackMetadata usually has Amount, MpesaReceiptNumber, TransactionDate, PhoneNumber
            const items = CallbackMetadata?.Item || [];
            const receiptNumber = items.find((i: any) => i.Name === "MpesaReceiptNumber")?.Value;
            const amount = items.find((i: any) => i.Name === "Amount")?.Value;
            const phoneNumber = items.find((i: any) => i.Name === "PhoneNumber")?.Value;

            // Update transaction status
            await transactions.updateOne(
                { _id: transaction._id },
                {
                    $set: {
                        status: "COMPLETED",
                        receiptNumber,
                        actualAmount: amount,
                        paidPhoneNumber: phoneNumber,
                        resultDesc: ResultDesc,
                        updatedAt: new Date(),
                    },
                }
            );

            // ACTIVATE SUBSCRIPTION
            // This logic mirrors app/api/subscription/create/route.ts but allows for cleaner separation

            const subscriptions = db.collection("subscriptions");

            // Check for existing active subscription to extend? Or just overwrite?
            // For now, mirroring the "create if not exists or update" logic

            // Calculate expiry
            const startDate = new Date();
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 365); // 1 year default

            const existingSubscription = await subscriptions.findOne({
                userId: transaction.userId.toString(),
            });

            if (existingSubscription) {
                await subscriptions.updateOne(
                    { _id: existingSubscription._id },
                    {
                        $set: {
                            status: "active",
                            reference: transaction.reference, // or receiptNumber
                            amount: amount,
                            currency: "KES",
                            startDate,
                            expiryDate,
                            updatedAt: new Date(),
                            paymentMethod: "MPESA",
                            mpesaReceipt: receiptNumber
                        },
                    }
                );
            } else {
                await subscriptions.insertOne({
                    userId: transaction.userId.toString(),
                    userEmail: transaction.userEmail,
                    reference: transaction.reference,
                    amount: amount,
                    currency: "KES",
                    startDate,
                    expiryDate,
                    status: "active",
                    paymentMethod: "MPESA",
                    mpesaReceipt: receiptNumber,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
            }

        } else {
            // Payment Failed/Cancelled
            await transactions.updateOne(
                { _id: transaction._id },
                {
                    $set: {
                        status: "FAILED",
                        resultDesc: ResultDesc,
                        updatedAt: new Date(),
                    },
                }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error processing M-Pesa callback:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}
