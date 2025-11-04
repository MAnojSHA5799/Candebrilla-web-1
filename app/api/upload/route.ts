import { put } from "@vercel/blob"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 })
    }

    const buffer = await file.arrayBuffer()
    const timestamp = Date.now()
    const filename = `candebrilla/${timestamp}-${file.name}`

    const token = process.env.BLOB_READ_WRITE_TOKEN

    if (!token) {
      console.error("Missing BLOB_READ_WRITE_TOKEN")
      return NextResponse.json({ message: "Server token missing" }, { status: 500 })
    }

    const blob = await put(filename, buffer, {
      access: "public",
      contentType: file.type,
      token
    })
    console.log("Blob:", blob)

    return NextResponse.json({
      success: true,
      url: blob.url,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ message: "Failed to upload image" }, { status: 500 })
  }
}
