import React from 'react'
import ResponsiveAppBar from './UserNav'
import Calendar from '../Calendar'

function CalendarUser() {
  return (
    <div>
        <ResponsiveAppBar></ResponsiveAppBar>
        <div style={{marginTop:"10%"}}>
        <Calendar></Calendar>
        </div>
    </div>
  )
}

export default CalendarUser