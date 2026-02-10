import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

const ADMIN_EMAILS = ["peteragak61@gmail.com"]

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const { userId, action, durationDays = 365 } = await request.json()

        if (!userId || !["grant", "revoke"].includes(action)) {
            return NextResponse.json({ message: "Invalid request" }, { status: 400 })
        }

        const { db } = await connectToDatabase()
        const subscriptions = db.collection("subscriptions")
        const users = db.collection("users")

        // Verify user exists first
        const targetUser = await users.findOne({ _id: new ObjectId(userId) })
        if (!targetUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }

        if (action === "grant") {
            // Grant Premium
            const startDate = new Date()
            const expiryDate = new Date()
            expiryDate.setDate(expiryDate.getDate() + durationDays)

            // Deactivate any existing active subscriptions for this user
            await subscriptions.updateMany(
                { userId: userId, status: "active" },
                { $set: { status: "inactive", updatedAt: new Date() } }
            )

            // Create new subscription
            await subscriptions.insertOne({
                userId,
                userEmail: targetUser.email,
                status: "active",
                plan: "premium",
                startDate,
                expiryDate,
                amount: 0, // Manual grant
                currency: "KES",
                reference: `MANUAL_GRANT_BY_${session.user.email}`,
                createdAt: new Date(),
                updatedAt: new Date()
            })

            return NextResponse.json({ message: `Granted premium to ${targetUser.email}` })

        } else {
            // Revoke Premium
            await subscriptions.updateMany(
                { userId: userId, status: "active" },
                { $set: { status: "revoked", updatedAt: new Date() } }
            )

            return NextResponse.json({ message: `Revoked premium from ${targetUser.email}` })
        }

    } catch (error) {
        console.error("Error updating subscription:", error)
        return NextResponse.json({ message: "Failed to update subscription" }, { status: 500 })
    }
}
