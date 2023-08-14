import React from 'react'
import Tournament from './component/Tournaments'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateTournament from './component/Tournaments/tournament'
import Dashboard from './component/Dashboard'
import Participant from './component/Participant'
import ParticipantApply from './component/Participant/ParticipantApply'

const App = () => {
  return (
    <>
      {/* <Tournament/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tournament" element={<Tournament />} />
          <Route path="/create/tournament" element={<CreateTournament />} />
          <Route path="/participant" element={<Participant />} />
          <Route path="/participant/apply/:id" element={<ParticipantApply />} />
          {/* <Route path="/" element={<PrivateRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="post" element={<Post />} />
        </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
