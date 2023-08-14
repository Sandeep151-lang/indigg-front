import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className="dahsboard">
      <div className="dash-part">
        <p className="admin">
          <Link to="/tournament">Admin</Link>
        </p>
        <p className="participant">
          <Link to="/participant">Pariticipant</Link>
        </p>
      </div>
    </div>
  )
}

export default Dashboard
