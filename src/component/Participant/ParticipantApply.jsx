import axios from 'axios'
import dayjs from 'dayjs'
import React, { useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const ParticipantApply = () => {
  const navigate = useNavigate()
  const { id } = useParams();

  const [data, setData] = useState([])
  const [tournId, setTournId] = useState([])
  
  const getList = async () => {
    try {
      const resp = await axios.post('https://indi-gg-node.vercel.app/tournament/list')
      if (resp) {
        setData(resp?.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const profile = JSON.parse(localStorage.getItem('profile'))
  const apply = async (item) => {
    const payload = {
      tourn_id: item?._id,
      user_id: profile?._id,
    }
    try {
      await axios.post('https://indi-gg-node.vercel.app/participant/update', payload)
      getDetail()
    } catch (error) {
      console.log(error)
    }
  }
  const getDetail = async () => {
    const payload = {
      id: id,
    }
    try {
      const resp = await axios.post('https://indi-gg-node.vercel.app/participant/apply', payload)
      setTournId(resp?.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if(id){
      getList()
      getDetail()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <>
    <div className='d-flex flex-row justify-content-evenly'>

      <h2>Tournament</h2>
      <button className='btn btn-primary' onClick={()=>{navigate('/')
    localStorage.removeItem('profile')}}>Logout</button>
    </div>
      <div className="d-flex flex-row mx-3 mb-3 justify-content-evenly">
      {data?.map((item) => {
        
        return (
            <div className="card" style={{width:"18rem"}}>
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{item?.tourn_name}</h5>
                <p className="card-text">
                  <span>Start Date: {dayjs(item?.startDate).format('DD/MM/YY')}</span>
                </p>
                <p className="card-text">
                  <span>End Date: {dayjs(item?.endDate).format('DD/MM/YY')}</span>
                </p>
                <p className="card-text">
                  <span>Status :{item?.status}</span>
                </p>
                <button
                  className="btn btn-primary "
                  onClick={() => apply(item)}
                  disabled={id && tournId?.tournament.find((i) => i === item._id)}
                >
                  {id && tournId?.tournament.find((i) => i === item._id) ? 'Applied' : 'Apply'}
                </button>
              </div>
              
            </div>
        )
      })}
      </div>
    </>
  )
}

export default ParticipantApply
