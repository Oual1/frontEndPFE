import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Appel à l'API pour récupérer les événements depuis le backend
    axios.get("http://localhost:8080/invoices/consultations")
      .then(response => {
        const formattedEvents = response.data.map(event => ({
          id: event.id,
          title: event.patient.firstName+event.patient.lastName,
          date: event.date, // Assurez-vous que le format de la date est valide ici (par exemple, "2023-07-19T15:30:00")
        }));
        console.log(response.data)
        setEvents(formattedEvents);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  
  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (selected) => {
    const selectedDate = selected.event.start.toISOString(); // Convert to ISO string format
    const selectedId = selected.event.id
  // Store the selected date in localStorage
  localStorage.setItem('selectedId', selectedId);

    window.location.href = '/add-consultation';
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.blueAccent[700]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            events={events} // Utilisez directement le tableau d'événements formatés ici
          />
        </Box>
      </Box>
    </div>
  );
};

export default Calendar;