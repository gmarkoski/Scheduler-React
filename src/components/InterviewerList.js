import React, { useState } from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';



InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
export default function InterviewerList(props) {

  const [value, setValue] = useState(props.value);
  const onChange = (id) => {
    props.onChange(id)
    console.log(id) 
    setValue(id);
  }
  const interviewers = props.interviewers.map((interviewer) => 

  <InterviewerListItem 
    key= {interviewer.id}
    name= {interviewer.name}
    avatar= {interviewer.avatar}
    selected= {interviewer.id === props.value}
    setInterviewer={() => onChange(interviewer.id)}
  />
  )
 
  return <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewers</h4>
  <ul className="interviewers__list">{interviewers}</ul>
</section>


} 
