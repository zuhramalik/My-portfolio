import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, email, message } = data

    // Validate the data
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    // Log the email data (this will be visible in your server logs)
    console.log("Email submission from:", name)
    console.log("Email address:", email)
    console.log("Message:", message)

    // In a real implementation, you would integrate with an email service here
    // For now, we'll simulate a successful submission

    return NextResponse.json({
      success: true,
      message: "Your message has been received successfully.",
    })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Failed to process your message" }, { status: 500 })
  }
}
