import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

const Tournament = () => {
  const navigate = useNavigate()
  const [data, setData] = useState()

  const onCreate = () => {
    navigate('/create/tournament')
  }

  const onDelete = async (item) => {
    try {
      const resp = await axios.delete(`https://indi-gg-node.vercel.app/tournament/delete/${item?._id}`)
      if (resp) {
        getList()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onUpdate = async (item) => {
    navigate('/create/tournament', { state: item })
  }

  const getList = async () => {
    try {
      const resp = await axios.post('https://indi-gg-node.vercel.app/tournament/list')
      if (resp) {
        setData(resp?.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="tournament">
      <nav>
        <button className='btn btn-primary goBack' onClick={()=>navigate('/')}>Dashboard</button>
        <div className="nav-part">
          <h3 className="mt-2 ">Tournament</h3>
          <button className="create-tournament btn btn-primary mt-2" type="button" onClick={onCreate}>
            Create
          </button>
        </div>
      </nav>
      <div>
        <table class="table table-bordered table-striped mt-2">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Participants</th>
              <th colspan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => {
              
              return (
                <>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item?.tourn_name}</td>
                    <td>{dayjs(item?.startDate).format('DD/MM/YY')}</td>
                    <td>{dayjs(item?.endDate).format('DD/MM/YY')}</td>
                    <td>{item?.status}</td>
                    <td>{item?.participant.length}</td>
                    <td>
                      <button className=" btn btn-danger" onClick={() => onDelete(item)} type="button">
                        Delete
                      </button>
                      <button className=" btn btn-primary mx-2" type="button" onClick={() => onUpdate(item)}>
                        Update
                      </button>
                    </td>
                  </tr>
                </>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Tournament
