import React from "react";
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import useVisualMode from "../../hooks/useVisualMode"
import Form from "components/Appointment/Form"
import Status from "components/Appointment/Status"
import Confirm from "components/Appointment/Confirm"




export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const SAVING = "SAVING"
  const DELETING = "DELETING"
  const CONFIRM_DELETE = "CONFIRM_DELETE"
  const EDIT = "EDIT"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  /////----- save -----/////
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING)
    if (props.bookInterview) {
      props
        .bookInterview(props.id, interview)
      transition(SHOW); // this calls the transition function, with 'SHOW' as the argument
      console.log("transition check ", transition);
    }
  }

  /////----- delete -----/////
  function cancel() {
    transition(DELETING);
    props.cancelInterview(props.id).then(() => transition(EMPTY));
  }

  function confirmDelete() {
    transition(CONFIRM_DELETE);
  }

  ///---edit---///
  function edit() {
    transition(EDIT);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onDelete={confirmDelete}
          onEdit= {edit}
        />)}
      {mode === CREATE && (
        <Form
          onSave={save}
          onCancel={(e) => back(EMPTY)}
          interviewers={props.interviewers}

        />)}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM_DELETE && (
        <Confirm
          message="Are you sure?"
          onConfirm={cancel}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onSave={save}
        />
      )}

    </article>
  );
}