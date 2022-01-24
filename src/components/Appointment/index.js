import React from "react";
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import useVisualMode from "../../hooks/useVisualMode"
import Form from "components/Appointment/Form"



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


    /////----- SAVE -----/////
  function save(name, interviewer) {
    const interview = {
     student: name,
      interviewer
    };
    props.bookInterview(props.id, interview);

    transition(SHOW) // this calls the transition function, with 'SHOW' as the argument
  }

  return (


  <article className="appointment">
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />)}
    {mode === CREATE && (
      <Form
        onSave= {save}
        onCancel={(e) => back(EMPTY)}
        interviewers={props.interviewers}
      />)}

  </article>
  );
}