import { type NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { querySTKPushStatus } from "@/lib/daraja";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const checkoutRequestID = searchParams.get("checkoutRequestID");

    if (!checkoutRequestID) {
        return NextResponse.json({ success: false, message: "Missing checkoutRequestID" }, { status: 400 });
    }

    try {
        const { db } = await connectToDatabase();
        const transaction = await db.collection("mpesa_transactions").findOne({ checkoutRequestID });

        if (!transaction) {
            return NextResponse.json({ success: false, message: "Transaction not found" }, { status: 404 });
        }

        // If still pending, maybe try to query Safaricom directly to see if we missed the callback?
        // But Safaricom Query API has limits and can trigger errors if queried too soon. 
        // For now, just return what we have in DB.

        // OPTIONAL: If it's been > 30 seconds and still PENDING, trigger a querySTKPushStatus
        // preventing this for now to keep it simple and avoid rate limits.

        return NextResponse.json({
            success: true,
            status: transaction.status,
            resultDesc: transaction.resultDesc
        });
    } catch (error) {
        console.error("Error checking status:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
