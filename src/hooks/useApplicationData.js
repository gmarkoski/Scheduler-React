import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday", // The day string is a direct child of the state object
    days: [], // The days array is a direct child of the state object
    appointments: {}, // This object is a direct child of the state object, originally set to null it will set to an object when we book an interview
    interviewers: {}, // This object is a direct child of the state object
    cancelInterview: {},
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day })); // added this as part of the separation of concerns refactor

  // Intital request to get all the data from the three endpoints, days, appointments, interviewers
  useEffect(() => {
    const fetchDays = axios.get("http://localhost:8001/api/days");
    const fetchAppointments = axios.get(
      "http://localhost:8001/api/appointments"
    );
    const fetchInterviewers = axios.get(
      "http://localhost:8001/api/interviewers"
    );

    Promise.all([
      Promise.resolve(fetchDays),
      Promise.resolve(fetchAppointments),
      Promise.resolve(fetchInterviewers),
    ])
      .then((response) => {
        setState((prev) => ({
          ...prev,
          days: response[0].data,
          appointments: response[1].data,
          interviewers: response[2].data,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /////----- book interview -----/////
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = copyDayState(state.days, appointments); // this is update spots

    return axios
      .put(`/api/appointments/${id}`, appointment) // send the new appointment info to the server
      .then(() => {
        setState({ ...state, appointments, days }); //updateSpots is linked via the last variable here
      });
  }

  /////----- delete -----/////
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = copyDayState(state.days, appointments); // this is update spots

    return axios
      .delete(`/api/appointments/${id}`) // send the delete id request to the server
      .then(() => {
        setState({ ...state, appointments, days }); //updateSpots is last variable here
      });
  }

  /////----- update spots -----/////
  function updateSpots(day, appointments) {
    let counter = 0;
    day.appointments.forEach((id) => {
      if (appointments[id].interview === null) {
        counter++;
      }
    });
    return counter;
  }

  function copyDayState(days, appointments) {
    const dayArray = days.map((day) => {
      return { ...day, spots: updateSpots(day, appointments) };
    });
    return dayArray;
  }

  return { state, setState, setDay, bookInterview, cancelInterview };
}