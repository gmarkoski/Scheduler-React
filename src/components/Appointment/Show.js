import React from "react";
import InterviewerList from "components/InterviewerList";

export default function Show(props) {

  return (
    <main className="appointment__card appointment__card--show">
      <section className="appointment__card-left">
        <h2 className="text--regular">{props.name}</h2>
        <section className="interviewer">
          <h4 className="text--light">{props.interviewer}</h4>
          <h3 className="text--regular">{props.name}</h3>
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <img
            className="appointment__actions-button"
            src="images/edit.png"
            alt="Edit"
          />
          <img
            className="appointment__actions-button"
            src="images/trash.png"
            alt="Delete"
          />
        </section>
      </section>
    </main>
  );
}