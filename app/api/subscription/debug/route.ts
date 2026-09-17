import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { connectToDatabase } from "@/lib/mongodb"
import { authOptions } from "@/auth"
import { isAdminEmail } from "@/lib/admin"

export async function GET(request: NextRequest) {
  try {
    // Get the current user session
    const session = await getServerSession(authOptions)

    // Was `email.includes("admin")` — a substring match, so any account whose
    // address merely contained "admin" (admin@gmail.com, notadmin@x.com) got
    // in. Now uses the same allowlist as every other admin surface.
    if (!session?.user?.email || !isAdminEmail(session.user.email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      )
    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const reference = searchParams.get("reference")

    const { db } = await connectToDatabase()
    const subscriptions = db.collection("subscriptions")

    let query = {}

    if (userId) {
      query = { ...query, userId }
    }

    if (reference) {
      query = { ...query, reference }
    }

    const subscriptionData = await subscriptions.find(query).toArray()

    return NextResponse.json({
      success: true,
      subscriptions: subscriptionData,
    })
  } catch (error) {
    console.error("Debug error:", error)
    const err = error as Error
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 },
    )
  }
}

