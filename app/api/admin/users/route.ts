import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { connectToDatabase } from "@/lib/mongodb"

const ADMIN_EMAILS = ["peteragak61@gmail.com"]

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const { db } = await connectToDatabase()

        // Fetch all users sorted by most recent
        const users = await db.collection("users")
            .find({})
            .sort({ createdAt: -1 })
            .project({ password: 0 }) // Exclude password field
            .toArray()

        // Fetch all active subscriptions
        const now = new Date()
        const activeSubscriptions = await db.collection("subscriptions")
            .find({
                status: "active",
                expiryDate: { $gt: now }
            })
            .toArray()

        // Create a map of active subscriptions by user ID
        const subMap = new Map()
        activeSubscriptions.forEach(sub => {
            subMap.set(sub.userId.toString(), sub)
        })

        // Combine user data with subscription status
        const usersWithStatus = users.map(user => {
            const sub = subMap.get(user._id.toString())
            return {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                isPremium: !!sub,
                expiryDate: sub?.expiryDate || null,
                plan: sub?.plan || (sub ? "premium" : "free")
            }
        })

        return NextResponse.json({ users: usersWithStatus })
    } catch (error) {
        console.error("Error fetching users:", error)
        return NextResponse.json({ message: "Failed to fetch users" }, { status: 500 })
    }
}
