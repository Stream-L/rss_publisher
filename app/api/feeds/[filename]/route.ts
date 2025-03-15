import { type NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

export async function GET(request: NextRequest, { params }: { params: { filename: string } }) {
  const { filename } = params
  const feedsDirectory = path.join(process.cwd(), "feeds")
  const filePath = path.join(feedsDirectory, filename)

  try {
    // Check if file exists
    await fs.access(filePath)

    // Read the file content
    const fileContent = await fs.readFile(filePath, "utf-8")

    // Return the XML content with appropriate headers
    return new NextResponse(fileContent, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    })
  } catch (error) {
    console.error(`Error serving RSS feed ${filename}:`, error)
    return new NextResponse("RSS feed not found", { status: 404 })
  }
}

