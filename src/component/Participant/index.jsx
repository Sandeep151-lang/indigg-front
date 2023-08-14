import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Participant = () => {
  const navigate = useNavigate()
  const Schema = yup.object({
    email: yup.string().required('Email is required. '),
    password: yup.string().required('Password is required. '),
  })

  const defaultValue = {
    email: undefined,
    password: undefined,
  }
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValue,
    resolver: yupResolver(Schema),
  })

  const onSubmit = async (value) => {
    const payload = {
      ...value,
    }

    try {
      const resp = await axios.post(`https://indi-gg-node.vercel.app/participant/login`, payload)
      if (resp) {
        localStorage.setItem('profile', JSON.stringify(resp?.data))
        navigate(`/participant/apply/${resp?.data?._id}`)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="forms-tournament">
      <form>
        <div className="form-part">
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              {...register(`email`)}
              value={watch('email')}
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={(e) => {
                setValue('email', e.target.value)
                clearErrors('email')
              }}
            />
            {errors && (
              <span className="" style={{ marginRight: '50%', color: 'red' }}>
                {errors?.email?.message}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Password
            </label>
            <input
              {...register(`password`)}
              value={watch('password')}
              type="password"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter password"
              onChange={(e) => {
                setValue('password', e.target.value)
                clearErrors('password')
              }}
            />
            {errors && (
              <span className="" style={{ marginRight: '50%', color: 'red' }}>
                {errors?.email?.message}
              </span>
            )}
          </div>

          <button onClick={handleSubmit(onSubmit)} className="submit-tournament btn btn-primary">
            Submit
          </button>
        </div>
        <div className='p-3'>
        <h3>Credential</h3>
        <p><span>Email : sandeep1234@gmail.com</span></p>
        <p><span>Password : sand123</span></p>
        </div>
        
      </form>
    </div>
  )
}

export default Participant
