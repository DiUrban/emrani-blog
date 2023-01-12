import {previewData} from 'next/headers'
import {groq} from 'next-sanity'
import {client} from '../../lib/sanity.client'
import PreviewSuspense from '../../components/PreviewSuspense'
import PreviewBlogList from '../../components/PreviewBlogList'
import BlogList from '../../components/BlogList'
type Props = {}
const query = groq`*[_type=='post']{...,author->,categories[]->}|order(_createdAt desc)`
export async function HomePage({}: Props) {
  if (previewData()) {
    return (
      <PreviewSuspense
        fallback={
          <div>
            <p className="text-center text-lg animate-pulse text-primary-700">
              Loading Preview Data
            </p>
          </div>
        }
      >
        <PreviewBlogList query={query} />
      </PreviewSuspense>
    )
  }
  const posts = await client.fetch(query)
  return (
    <div className="text-4xl">
      <BlogList posts={posts} />
    </div>
  )
}

export default HomePage
export const revalidate = 30
