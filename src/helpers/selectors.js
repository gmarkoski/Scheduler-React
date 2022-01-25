

//**-- get appointments for day --**//
export function getAppointmentsForDay(state, day) {
  const appointments = [];
  const foundDay = state.days
  .find((weekday) => weekday.name === day)
  
    if (!foundDay) {
    return [];
  }
  
  foundDay.appointments.forEach((appointment) => {
    const matchedAppointment = state.appointments[appointment]; // { id: 4, time: "3pm", interview: null } | undefined
    if (matchedAppointment) {
      appointments.push(matchedAppointment);
      console.log(appointment)
    }
  });

  return appointments;
}

/////****get interview****/////
export function getInterview(state, interview) {
  if (!interview) {
    return null;
    
  }
  let interviewer = state.interviewers[interview.interviewer]; 
  return { ...interview, interviewer }; 
}

//***---get interviewers for day ---***//
export function getInterviewersForDay(state, day) {
  
  
  const foundDay = state.days
  .find((weekday) => weekday.name === day)
  
    if (!foundDay) {
      return []
    };

  const interviewers = [];

  foundDay.interviewers.forEach((interviewer) => {
    const matchedInterviewer = state.interviewers[interviewer];
    if (matchedInterviewer) {
      interviewers.push(matchedInterviewer);
    }
  });

  return interviewers;
}