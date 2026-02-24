import axios from "axios";

// Environment variables
const MPESA_CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY!;
const MPESA_CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET!;
const MPESA_PASSKEY = process.env.MPESA_PASSKEY!;
const MPESA_SHORTCODE = process.env.MPESA_SHORTCODE!;
const MPESA_ENVIRONMENT = process.env.MPESA_ENVIRONMENT || "sandbox";
const MPESA_CALLBACK_URL = process.env.MPESA_CALLBACK_URL!;

// Base URLs
const BASE_URL =
    MPESA_ENVIRONMENT === "production"
        ? "https://api.safaricom.co.ke"
        : "https://sandbox.safaricom.co.ke";

// Types
interface AccessTokenResponse {
    access_token: string;
    expires_in: string;
}

interface STKPushResponse {
    MerchantRequestID: string;
    CheckoutRequestID: string;
    ResponseCode: string;
    ResponseDescription: string;
    CustomerMessage: string;
}

/**
 * Generate an OAuth access token from Safaricom
 */
export async function getAccessToken(): Promise<string> {
    const auth = Buffer.from(
        `${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`
    ).toString("base64");

    console.log("[Daraja Debug] Environment:", MPESA_ENVIRONMENT);
    console.log("[Daraja Debug] Base URL:", BASE_URL);
    console.log("[Daraja Debug] Consumer Key (first 10 chars):", MPESA_CONSUMER_KEY?.substring(0, 10));
    console.log("[Daraja Debug] Shortcode:", MPESA_SHORTCODE);

    try {
        const response = await axios.get<AccessTokenResponse>(
            `${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
            {
                headers: {
                    Authorization: `Basic ${auth}`,
                },
            }
        );
        console.log("[Daraja Debug] Access token obtained successfully");
        return response.data.access_token;
    } catch (error: any) {
        console.error("Error generating access token:", error.response?.data || error.message);
        console.error("[Daraja Debug] Full error status:", error.response?.status);
        throw new Error("Failed to generate M-Pesa access token");
    }
}

/**
 * Initiate an STK Push (M-Pesa Express)
 * @param phoneNumber - The customer's phone number (format: 2547XXXXXXXX)
 * @param amount - The amount to charge
 * @param reference - A unique reference for the transaction (e.g., Account Reference)
 */
export async function initiateSTKPush(
    phoneNumber: string,
    amount: number,
    reference: string
): Promise<STKPushResponse> {
    const token = await getAccessToken();

    // Format timestamp: YYYYMMDDHHmmss
    const date = new Date();
    const timestamp =
        date.getFullYear().toString() +
        String(date.getMonth() + 1).padStart(2, "0") +
        String(date.getDate()).padStart(2, "0") +
        String(date.getHours()).padStart(2, "0") +
        String(date.getMinutes()).padStart(2, "0") +
        String(date.getSeconds()).padStart(2, "0");

    const password = Buffer.from(
        `${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`
    ).toString("base64");

    const payload = {
        BusinessShortCode: MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: Math.ceil(amount), // Amount must be an integer, ensure no decimals
        PartyA: phoneNumber,
        PartyB: MPESA_SHORTCODE,
        PhoneNumber: phoneNumber,
        CallBackURL: MPESA_CALLBACK_URL,
        AccountReference: reference,
        TransactionDesc: `Payment for ${reference}`,
    };

    try {
        const response = await axios.post<STKPushResponse>(
            `${BASE_URL}/mpesa/stkpush/v1/processrequest`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error: any) {
        console.error("Error initiating STK push:", error.response?.data || error.message);
        throw new Error("Failed to initiate M-Pesa payment");
    }
}

/**
 * Check the status of an STK Push transaction
 * @param checkoutRequestID - The unique ID returned from the STK Push initiation
 */
export async function querySTKPushStatus(checkoutRequestID: string): Promise<any> {
    const token = await getAccessToken();

    // Format timestamp: YYYYMMDDHHmmss
    const date = new Date();
    const timestamp =
        date.getFullYear().toString() +
        String(date.getMonth() + 1).padStart(2, "0") +
        String(date.getDate()).padStart(2, "0") +
        String(date.getHours()).padStart(2, "0") +
        String(date.getMinutes()).padStart(2, "0") +
        String(date.getSeconds()).padStart(2, "0");

    const password = Buffer.from(
        `${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`
    ).toString("base64");

    const payload = {
        BusinessShortCode: MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: checkoutRequestID,
    };

    try {
        const response = await axios.post(
            `${BASE_URL}/mpesa/stkpushquery/v1/query`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error: any) {
        // Safaricom returns 500 or 404 if the transaction is still processing or not found, which is annoying.
        // We log it but don't strictly throw if it's just "not found yet" (though usually it throws).
        console.error("Error querying STK status:", error.response?.data || error.message);
        throw error;
    }
}
