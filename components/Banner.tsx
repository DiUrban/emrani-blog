import React from 'react'

type Props = {}

function Banner({}: Props) {
  return (
    <div className="flex flex-col lg:flex-row lg:space-x-5 justify-between font-bold px-10 py-5 mb-10 max-w-6xl items-center mx-auto">
      <div className="">
        <h1 className="text-4xl text-center">
          Nassr Al <span className=" underline decoration-primary-700">Emrani</span>'s Daily Blog
        </h1>
      </div>
      <p className="mt-5 md:mt-2 text-gray-400 max-w-sm text-center">
        Follow my proffesional development in <br />
        <span className="underline decoration-primary-500 text-primary-900 decoration-2">
          Software{' '}
        </span>
        <span className="underline decoration-primary-900 text-primary-500 decoration-2">
          Development
        </span>
      </p>
    </div>
  )
}

export default Banner
