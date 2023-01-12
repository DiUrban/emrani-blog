'use client'
import {EnvelopeIcon, PhoneIcon} from '@heroicons/react/24/solid'
import React, {useEffect} from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import {toast, ToastContainer} from 'react-toastify'

type Props = {}
type inputs = {
  name: string
  email: string
  subject: string
  message: string
}
function ContactPage({}: Props) {
  const {
    register,
    handleSubmit,
    formState,
    reset,
    formState: {isSubmitted, isValid},
  } = useForm<inputs>()

  const onSubmit: SubmitHandler<inputs> = async (data) => {
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 200) {
          toast.success('Thank you for getting in touch!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          })
        } else {
          toast.error('There was an issue sending the form, please contact using another media', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          })
        }
      })
      .catch((e) => console.log(e))
  }
  useEffect(() => {
    if (formState.isSubmitted) {
      reset({name: '', email: '', subject: '', message: ''})
    }
  })
  return (
    <div className="h-screen  relative flex flex-col text-center md:text-left max-w-7xl px-10 justify-evenly mx-auto items-center -mb-6 ">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <h3 className="absolute top-20 mb-2 uppercase tracking-[20px] text-primary-400 text-2xl max-sm:text-lg">
        Contact
      </h3>
      <div className="flex flex-col space-y-10 max-xs:space-y-1 max-xs:mt-10 ">
        <h4 className="text-4xl font-semibold text-center max-sm:text-xl max-xs:text-lg max-xs:mt-6">
          Get in touch and see how much
          <br />
          <span className="underline decoration-primary-200">Value I Can Provide you</span>
        </h4>
        <div className="flex flex-col space-y-4 max-xs:space-y-0">
          <a href={`https://wa.me/+447460933915`}>
            <div className="flex items-center space-x-5">
              <PhoneIcon className="text-primary-900 h-7 w-7 animate-pulse" />
              <p className="text-2xl max-sm:text-lg max-xs:text-base ">+447460933915</p>
            </div>
          </a>
          <a href={`mailto:nassr@emrani.co.uk`}>
            <div className="flex items-center space-x-5">
              <EnvelopeIcon className="text-primary-900 h-7 w-7 animate-pulse" />
              <p className="text-2xl max-sm:text-lg max-xs:text-base">Email me</p>
            </div>
          </a>
        </div>
        <form className="flex flex-col space-y-2 w-fit mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex space-x-2 ">
            <input
              {...register('name', {required: true, maxLength: 200})}
              className="contactInput"
              type="text"
              placeholder="Name"
            />
            <input
              {...register('email', {required: true, maxLength: 300})}
              className="contactInput"
              type="text"
              placeholder="Email"
            />
          </div>
          <input
            {...register('subject', {required: true, maxLength: 800})}
            className="contactInput"
            type="text"
            placeholder="Subject"
          />
          <textarea
            {...register('message', {required: true, maxLength: 2000})}
            placeholder="Message"
            className="contactInput resize-none"
          />
          <button
            className={`bg-primary-900 border-primary-400 border py-5 px-10 rounded-md text-primary-100 font-bold text-lg uppercase  ${
              isValid ? 'animate-bounce' : ''
            }`}
          >
            submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default ContactPage
