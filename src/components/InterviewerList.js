import React, {useState} from 'react';
import InterviewerListItem from 'components/InterviewerListItem';
import PropTypes from 'prop-types';
import 'components/InterviewerList.scss';


// Set prop types
InterviewerList.propTypes = {
  interviewer: PropTypes.number,
  setInterviewer: PropTypes.func.isRequired
};

export default function InterviewerList(props) {
  const [value, setValue] = useState(props.value);
  const onChange = (id) => {
    setValue(id);
  }

  let interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem 
  key={interviewer.id}
  name={interviewer.name}
  avatar={interviewer.avatar}
  selected={interviewer.id === value}
  setInterviewer={() => onChange(interviewer.id)}    
/>
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}
