import React, { useEffect } from 'react'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { useLocation } from 'react-router-dom'

const CreateTournament = () => {
  const location = useLocation()

  // const {tourn_name,startDate,endDate,status,_id}=location?.state

  const navigate = useNavigate()
  const Schema = yup.object({
    tourn_name: yup.string().required('Tournament is required. '),
    startDate: yup.string().required('Start Date is required. '),
    endDate: yup.string().required('End Date is required. '),
    //  status :yup.string().required("status is required. "),
    status: yup.object({
      label: yup.string().required('please select status'),
    }),
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
      status: value?.status?.value,
    }

    try {
      const resp = await axios[watch('_id') ? 'put' : 'post'](
        `https://indi-gg-node.vercel.app/tournament/${watch('_id') ? `update/${watch('_id')}` : 'create'}`,
        payload
      )
      if (resp) {
        navigate('/tournament')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const options = [
    { value: 'Upcoming', label: 'Upcoming' },
    { value: 'Active', label: 'Active' },
    { value: 'Completed', label: 'Completed' },
  ]
  useEffect(() => {
    if (location.state !== null && location.state._id) {
      setValue('_id', location?.state._id)
      setValue('tourn_name', location?.state?.tourn_name)
      setValue('startDate', dayjs(location?.state?.startDate))
      setValue('endDate', dayjs(location?.state?.endDate))
      setValue('status', { value: location?.state?.status, label: location?.state?.status })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // eslint-disable-next-line
  }, [location.state])

  return (
    <div className="forms-tournament">
      <button onClick={()=>navigate(-1)} className='btn btn-primary'>Dashboard</button>
      <form>
        <div className="form-part">
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Tournament Name
            </label>
            <input
              {...register(`tourn_name`)}
              value={watch('tourn_name')}
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter tournament name"
              onChange={(e) => {
                setValue('tourn_name', e.target.value)
                clearErrors('tourn_name')
              }}
            />
            {errors && (
              <span className="" style={{ marginRight: '50%', color: 'red' }}>
                {errors?.tourn_name?.message}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Start Date
            </label>
            <div>
              <DatePicker
                isClearable
                {...register(`startDate`)}
                format="DD/MM/YY"
                value={watch(`startDate`)}
                onChange={(date) => {
                  console.log(dayjs(date))
                  setValue(`startDate`, dayjs(date))
                  clearErrors('startDate')
                }}
                className="date-picker"
              />
              {errors && (
                <span className="" style={{ marginRight: '50%', color: 'red' }}>
                  {errors?.startDate?.message}
                </span>
              )}
            </div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              End Date
            </label>
            <div>
              <DatePicker
                {...register(`endDate`)}
                format="DD/MM/YY"
                value={watch(`endDate`)}
                onChange={(date) => {
                  console.log(date)
                  setValue(`endDate`, dayjs(date))
                  clearErrors('endDate')
                }}
                className="date-picker"
              />
              {errors && (
                <span className="" style={{ marginRight: '50%', color: 'red' }}>
                  {errors?.endDate?.message}
                </span>
              )}
            </div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Status
            </label>
            <Select
              {...register(`status`)}
              value={watch(`status`)}
              placeholder="Status"
              onChange={(opt) => {
                setValue(`status`, opt)
                clearErrors('status')
              }}
              options={options}
              styles={{
                control: (base) => ({
                  ...base,
                  height: 31,
                  // width: 100%,
                  minHeight: 31,
                  marginLeft: '5px',
                  // marginTop: 10,
                  borderRadius: 3,
                  border: '1px solid #e5e5e5',
                  backgroundColor: 'rgba(255,255,255,1)',
                }),
                placeholder: (defaultStyles) => ({
                  ...defaultStyles,
                  fontSize: '14px',
                  textAlign: 'left',
                  lineHeight: '16px',
                  width: '59px',
                  height: '26px',
                }),
                option: (base) => ({
                  ...base,
                  height: '26px',
                  overflow: 'hidden',
                  fontFamily: 'Segoe UI',
                  fontSize: '14px',
                  textAlign: 'left',
                  lineHeight: '16px',
                  color: '#262E39',
                  margin: '5px 0',
                  backgroundColor: 'rgba(247,250,252,1)',
                }),

                indicatorSeparator: () => {},
                // dropdownIndicator: (defaultStyles) => ({
                //   ...defaultStyles,
                //   display: "none", // your changes to the arrow
                // }),
              }}
            />
            {errors && (
              <span className="" style={{ marginRight: '50%', color: 'red' }}>
                {errors?.status?.label?.message}
              </span>
            )}
          </div>
          <button onClick={handleSubmit(onSubmit)} className="submit-tournament btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateTournament
