import { type NextRequest, NextResponse } from "next/server"
import { createUser } from "@/lib/auth"

// Ensure this route always runs in Node.js runtime (needed for MongoDB + bcryptjs)
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Name, email, and password are required" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ message: "Password must be at least 8 characters long" }, { status: 400 })
    }

    // Create user
    const user = await createUser({ name, email, password })

    return NextResponse.json({
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)

    if (error instanceof Error && error.message.includes("already exists")) {
      return NextResponse.json({ message: error.message }, { status: 409 })
    }

    const errorMessage = error instanceof Error ? error.message : "Failed to register user"
    return NextResponse.json({ message: errorMessage }, { status: 500 })
  }
}
