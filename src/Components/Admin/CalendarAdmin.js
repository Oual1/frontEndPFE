import React from 'react'
import Topbar from '../global/Topbar'
import Calendar from '../Calendar'

function CalendarAdmin() {
  return (
    <div>
        <Topbar></Topbar>
        <div style={{marginLeft:"18%", marginTop:"2%"}}>
        <Calendar></Calendar>
        </div>
    </div>
  )
}

export default CalendarAdmin