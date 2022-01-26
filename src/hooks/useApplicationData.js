import { useState, useEffect } from "react"
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  const bookInterview = (id, interview) => {
    setState({ ...state, appointments });

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment) // send the new appointment info to the server
      .then((res) => {
        setState({
          ...state,
          appointments
        })
      })
      .catch((err) => {
        console.log("Error message: ", err)
      })
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

    return axios
      .delete(`/api/appointments/${id}`) // send the delete id request to the server
      .then((res) => {
        setState({ ...state, appointments });
      })
      .catch((err) => {
        console.log("Error message: ", err)
      });
  }
  useEffect(() => {

    const fetchDays = axios.get('/api/days');
    const fetchAppointments = axios.get('/api/appointments');
    const fetchInterviewers = axios.get('/api/interviewers');

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
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview }
};