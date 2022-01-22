import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import getAppointmentsForDay from "../helpers/selectors";
import Appointment from "components/Appointment";
import axios from "axios";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  
  const dailyAppointment=getAppointmentsForDay(state, state.day);
  
  const schedule = dailyAppointment.map((appointment) => (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={appointment.interview}
    />
  ));


  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {

    const fetchDays = axios.get('http://localhost:8001/api/days');
    const fetchAppointments = axios.get('http://localhost:8001/api/appointments');
    const fetchInterviewers = axios.get('http://localhost:8001/api/interviewers');

    Promise.all([
      Promise.resolve(fetchDays),
      Promise.resolve(fetchAppointments),
      Promise.resolve(fetchInterviewers)

    ])
      .then((response) => {
        setState(prev => ({
          ...prev,
          days: response[0].data,
          appointments: response[1].data,
          interviewers: response[2].data
        }));
      });
  }, []);


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
