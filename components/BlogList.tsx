import {ArrowRightIcon} from '@heroicons/react/24/solid'
import Image from 'next/image'
import React from 'react'
import urlFor from '../lib/urlFor'
import {Post} from '../typings'
import ClientSideRoute from './ClientSideRoute'

type Props = {posts: Post[]}

function BlogList({posts}: Props) {
  return (
    <div>
      <hr className="border-primary-600 mb-10" />
      <div className="grid grid-cols-1 md:grid-cols-2 px-10 gap-x-10 gap-y-16 pb-24">
        {posts.map((post) => (
          <ClientSideRoute
            route={`${post.slug ? `/post/${post.slug.current}` : '/studio'}`}
            key={post._id}
          >
            <div className="group cursor-pointer flex flex-col">
              <div className="relative w-full h-80 drop-shadow-xl group-hover:scale-105 transition-transform duration-200 ease-out">
                {post.mainImage && post.title ? (
                  <Image
                    fill
                    alt={post.title}
                    src={urlFor(post.mainImage).url()}
                    className="object-contain object-left lg:object-center"
                  />
                ) : (
                  <h1>No Image or Title provided...</h1>
                )}
                <div className="absolute bottom-0 w-full bg-opacity-20 bg-primary-1000 backdrop-blur-lg rounded-sm drop-shadow-lg text-primary-100 p-5 flex justify-between items-center">
                  <div className="">
                    <p className="text-bold">{post.title ? post.title : 'No Title Given'}</p>
                    {post.publishedAt ? (
                      <p className="text-sm">
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
                  <div className="flex flex-col md:flex-row md:gap-x-2 gap-y-2 items-center">
                    {post.categories
                      ? post.categories.map((category) => (
                          <div
                            className="bg-primary-900 text-center text-primary-200 px-3 py-1 rounded-full text-sm font-semibold"
                            key={category._id}
                          >
                            <p>{category.title}</p>
                          </div>
                        ))
                      : 'Has not been assigned a category'}
                  </div>
                </div>
              </div>
              <div className="w-full mt-5 flex-1">
                <p className="underline text-lg font-bold">
                  {post.title ? post.title : 'No Title Yet'}
                </p>
                <p className="text-primary-900 line-clamp-2">
                  {post.description ? post.description : 'No Description Yet'}
                </p>
              </div>
              <p className="w-full mt-5 font-bold flex items-center group-hover:underline text-sm">
                Read Post <ArrowRightIcon className="ml-2 h-4 w-4 text-primary-1000" />
              </p>
            </div>
          </ClientSideRoute>
        ))}
      </div>
    </div>
  )
}

export default BlogList
