
export function getAppointmentsForDay(state, day) {
    const filteredAppointments = [];
    const filteredDay = state.days.filter((weekday) => weekday.name === day)[0]; // {} | undefined

  
  if (!filteredDay) {
      return [];
  }

  filteredDay.appointments.forEach((appointment) => {
    const matchedAppointment = state.appointments[appointment]; // { id: 4, time: "3pm", interview: null } | undefined
    if (matchedAppointment) {
      filteredAppointments.push(matchedAppointment);
    }
  });

  return filteredAppointments;
}