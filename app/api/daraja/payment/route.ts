import { type NextRequest, NextResponse } from "next/server";
import { initiateSTKPush } from "@/lib/daraja";
import { connectToDatabase } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const { phoneNumber, amount, reference } = await request.json();

        if (!phoneNumber || !amount) {
            return NextResponse.json(
                { success: false, message: "Phone number and amount are required" },
                { status: 400 }
            );
        }

        // Format phone number to 254...
        let formattedPhone = phoneNumber.replace(/\+/g, "").replace(/\s/g, "");
        if (formattedPhone.startsWith("0")) {
            formattedPhone = "254" + formattedPhone.substring(1);
        }

        // Initiate STK Push
        const response = await initiateSTKPush(formattedPhone, amount, reference || "Subscription");

        if (response.ResponseCode === "0") {
            // Save pending transaction to DB
            const { db } = await connectToDatabase();

            const transaction = {
                userId: new ObjectId(session.user.id),
                userEmail: session.user.email,
                merchantRequestID: response.MerchantRequestID,
                checkoutRequestID: response.CheckoutRequestID,
                amount: amount,
                phoneNumber: formattedPhone,
                reference: reference || "Subscription",
                status: "PENDING", // Wait for callback
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            await db.collection("mpesa_transactions").insertOne(transaction);

            return NextResponse.json({
                success: true,
                message: "STK Push initiated successfully",
                checkoutRequestID: response.CheckoutRequestID,
            });
        } else {
            return NextResponse.json(
                { success: false, message: response.ResponseDescription },
                { status: 400 }
            );
        }
    } catch (error: any) {
        console.error("Error initiating payment:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
