import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";


export default function DayListItem(props) {
  
  const DayListItem = classNames("DayClass", {
    "day-list__item": props,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = function() {
  
    if (props.spots === 0) {
      return "no spots remaining";
    }

    if (props.spots === 1) {
      return `${props.spots} spot remaining`;
    }

    else {
      return `${props.spots} spots remaining`;
    }
  };

  return (
    <li className={DayListItem} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}