import { notFound } from "next/navigation"
import ArticleDetail from "@/components/ArticleDetail"

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  // This is a placeholder, in a real app you might fetch article data from an API or database
  const validSlugs = ["womens-day-2024"]
  
  if (!validSlugs.includes(params.slug)) {
    notFound()
  }

  return <ArticleDetail slug={params.slug} />
} 