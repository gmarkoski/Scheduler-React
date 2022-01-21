import React from "react";
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"



export default function Appointment(props) {
  return (props.interview ?
    <article className="appointment">
      <Header time={props.time}/>
      <Show student={props.interview.student} interviewer={props.interview.interviewer}/>
    </article> :
    <article className="appointment">
      <Header time={props.time}/>
      <Empty />
    </article>
  )
}