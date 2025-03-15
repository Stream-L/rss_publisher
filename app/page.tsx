import fs from "fs/promises"
import path from "path"
import Link from "next/link"
import { RssIcon } from "lucide-react"

export default async function Home() {
  // Read all RSS files from the feeds directory
  const feedsDirectory = path.join(process.cwd(), "feeds")

  let feeds: string[] = []
  try {
    const files = await fs.readdir(feedsDirectory)
    feeds = files.filter((file) => file.endsWith(".rss") || file.endsWith(".xml"))
  } catch (error) {
    console.error("Error reading feeds directory:", error)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">RSS Feed Publisher</h1>
        <p className="text-gray-600">Browse and access all available RSS feeds</p>
      </header>

      {feeds.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p>No RSS feeds found in the feeds directory.</p>
          <p className="text-sm text-gray-500 mt-2">
            Add .rss or .xml files to the /feeds directory to see them listed here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {feeds.map((feed) => (
            <Link
              key={feed}
              href={`/api/feeds/${feed}`}
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <RssIcon className="h-6 w-6 text-orange-500" />
                <h2 className="text-lg font-medium">{feed}</h2>
              </div>
              <p className="mt-2 text-sm text-gray-600">View this RSS feed directly</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

