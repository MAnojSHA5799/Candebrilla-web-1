import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Demo credentials check
    if (email === "admin@candebrilla.com" && password === "Admin@123") {
      const token = Buffer.from(JSON.stringify({ email, role: "admin" })).toString("base64")
      return NextResponse.json({
        success: true,
        token,
        message: "Login successful",
      })
    }

    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}
