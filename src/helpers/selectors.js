

//**-- GET APPOINTMENTS FOR DAY --**//
export function getAppointmentsForDay(state, day) {
  const appointments = [];
  const filteredAppointments = state.days
    .filter((weekday) => weekday.name === day)
    .map((d) => d.appointments)
    .flat();

    if (!filteredAppointments) {
    return [];
  }
  
  filteredAppointments.forEach((appointment) => {
    const matchedAppointment = state.appointments[appointment]; // { id: 4, time: "3pm", interview: null } | undefined
    if (matchedAppointment) {
      appointments.push(matchedAppointment);
    }
  });

  return appointments;
}

/////----- GET INTERVIEW -----/////
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  let interviewer = state.interviewers[interview.interviewer]; // state is current state, then we access the interviewers object, then we access the interviewer id
  return { ...interview, interviewer }; // we are creating an object, containing the interview properties (student + interviewer as a number) then after the , we add another key to the object which is the 'interviewer'
}

/////-----GET INTERVIEWERS FOR DAY -----/////
export function getInterviewersForDay(state, day) {
  const appointments = state.days
    .filter((weekday) => weekday.name === day)
    .map((d) => d.appointments)
    .flat();
  const interviewers = [];

  appointments.forEach((appointment) => {
    const matchedInterviewer = state.interviewers[appointment];
    if (matchedInterviewer) {
      interviewers.push(matchedInterviewer);
    }
  });

  return interviewers;
}