import React from 'react';

function EmptyTest(props) {
  return (

    <main className="appointment__add">
      <h2>Hiya</h2>
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      
      />
    </main>

  );
}

export default EmptyTest;