'use client'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {FormEvent, useState} from 'react'

type Props = {}

function SignupForm({}: Props) {
  const [signupForm, setSignupForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSignupForm(false)
    toast.success('You been signed up', {
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
  return (
    <div className="sticky flex flex-col items-center justify-center overflow-x-visible">
      <div
        className="text-primary-200 h-8 w-56 bg-primary-900 items-center justify-center rounded-2xl relative cursor-pointer hidden sm:flex"
        onClick={() => setSignupForm(!signupForm)}
      >
        Sign up to the newsletter
      </div>
      <div className={`${!signupForm ? 'hidden' : 'inline'} absolute top-[30px]`}>
        <form
          className=" flex flex-col items-center justify-center h-28 w-64 mt-1 border-primary-500 text-primary-900 bg-primary-800 bordershadow-sm text-center rounded-lg space-y-2 gap-2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            type="text"
            name=""
            id=""
            className="-mt-6 rounded-lg text-center"
            placeholder="Enter your name (optional)"
          />
          <input
            type="email"
            name=""
            id=""
            className="rounded-lg text-center"
            placeholder="Enter your email"
          />
          <button
            type="submit"
            className="uppercase w-full rounded-b-lg bg-primary-300 absolute bottom-0 cursor-pointer"
          >
            signup
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  )
}

export default SignupForm
