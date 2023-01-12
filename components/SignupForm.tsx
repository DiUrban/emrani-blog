'use client'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {FormEvent, useEffect, useState} from 'react'
import {SubmitHandler, useForm, useFormState} from 'react-hook-form'

type Props = {}
type inputs = {
  name: string
  email: string
}
function SignupForm({}: Props) {
  const {
    register,
    handleSubmit,
    formState,
    reset,
    formState: {isValid, isSubmitted},
  } = useForm<inputs>()

  const [signupForm, setSignupForm] = useState(false)
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
          toast.success('You have been signed up to the newsletter', {
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
      reset({name: '', email: ''}), setSignupForm(false)
    }
  })
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
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register('name', {required: true, maxLength: 200})}
            type="text"
            name="name"
            id="name"
            className="-mt-6 rounded-lg text-center"
            placeholder="Enter your name (optional)"
          />
          <input
            {...register('email', {required: true, maxLength: 200})}
            type="email"
            name="email"
            id="email"
            className="rounded-lg text-center"
            placeholder="Enter your email"
          />
          <button
            type="submit"
            className={`uppercase w-full rounded-b-lg bg-primary-300 absolute bottom-0 cursor-pointer ${
              isValid ? 'text-primary-200' : 'text-primary-800'
            }`}
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
