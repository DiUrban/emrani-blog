import {PortableText} from '@portabletext/react'
import {groq} from 'next-sanity'
import Image from 'next/image'
import React from 'react'
import {RichTextComponents} from '../../../../components/RichTextComponents'
import {client} from '../../../../lib/sanity.client'
import urlFor from '../../../../lib/urlFor'
import {Post} from '../../../../typings'

type Props = {params: {slug: string}}
export async function generateStaticParams() {
  const query = groq`*[_type=='post']{slug}`
  const slugs: Post[] = await client.fetch(query)
  const slugRoutes = slugs.map((slug) => slug.slug.current)
  return slugRoutes.map((slug) => ({slug}))
}
export const revalidate = 30
async function Post({params: {slug}}: Props) {
  const query = groq`*[_type=='post'&&slug.current==$slug][0]{...,author->,categories[]->}`
  const post: Post = await client.fetch(query, {slug})
  return (
    <article>
      <section className="space-y-2 border border-primary-800 text-primary-200">
        <div className="relative min-h-56 flex flex-col md:flex-row justify-between">
          <div className="absolute top-0 w-full h-full opacity-20 blur-sm p-10">
            {post.mainImage && post.title ? (
              <Image
                fill
                alt={post.title}
                src={urlFor(post.mainImage).url()}
                className="object-cover object-center mx-auto"
              />
            ) : (
              <h1>No Image or Title provided...</h1>
            )}
          </div>
          <section className="p-5 bg-primary-600 w-full">
            <div className="flex flex-col md:flex-row justify-between gap-y-5">
              <div className="">
                {post.title ? (
                  <h1 className="text-4xl font-extrabold">{post.title}</h1>
                ) : (
                  <h1 className="text-4xl font-extrabold bg-red-700">No Title was provided</h1>
                )}
                {post.publishedAt ? (
                  <p>
                    {new Date(post.publishedAt).toLocaleDateString('en-us', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                ) : (
                  <p className="text-red-800 uppercase text-sm">Has not been published yet</p>
                )}
              </div>
              {post.author ? (
                <div className="flex items-center space-x-2">
                  <Image
                    height={40}
                    width={40}
                    alt={post.author.name}
                    src={urlFor(post.author.image).url()}
                    className="rounded-full"
                  />
                  <div className="w-64">
                    <h3 className="text-lg font-bold">{post.author.name}</h3>
                    <div className=""></div>
                  </div>
                </div>
              ) : (
                <div className="">
                  <h1>No Author Provided</h1>
                </div>
              )}
            </div>

            <div className="">
              {post.description ? (
                <h2 className="italic pt-10 text-center">{post.description}</h2>
              ) : (
                <h2 className="italic pt-10 bg-red-700 uppercase"> No Description Given</h2>
              )}
              <div className="flex items-center justify-end mt-auto">
                {post.categories ? (
                  post.categories.map((category) => (
                    <p
                      key={category._id}
                      className="bg-primary-900 text-center text-primary-200 px-3 py-1 rounded-full text-sm font-semibold"
                    >
                      {category.title}
                    </p>
                  ))
                ) : (
                  <p className="text-red-700 uppercase text-center">
                    Has not been assigned a category
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>
      </section>
      <PortableText value={post.body} components={RichTextComponents} />
    </article>
  )
}

export default Post
