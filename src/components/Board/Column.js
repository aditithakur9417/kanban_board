import React from "react";
import Card from "../Card/Card";
import no_priority from "../../assets/images/No-priority.svg";
import urgent_priority from "../../assets/images/SVG - Urgent Priority colour.svg";
import high_priority from "../../assets/images/Img - High Priority.svg";
import medium_priority from "../../assets/images/Img - Medium Priority.svg";
import low_priority from "../../assets/images/Img - Low Priority.svg";

// Import status images
import todo_status from "../../assets/images/To-do.svg";
import inProgress_status from "../../assets/images/in-progress.svg";
import backlog_status from "../../assets/images/Backlog.svg";
import cancelled_status from "../../assets/images/Cancelled.svg";

// Import symbols
import add_symbol from "../../assets/images/add.svg";
import threeDot_symbol from "../../assets/images/3 dot menu.svg";

import "./Column.css";

const Column = ({ title, tickets }) => {

  // Function to get the appropriate symbol based on the title
  function getSymbol(title) {
    switch (title) {
      case "No priority":
        return <img src={no_priority} alt="no_priority" />;
      case "Urgent":
        return <img src={urgent_priority} alt="urgent_priority" />;
      case "High":
        return <img src={high_priority} alt="high_priority" />;
      case "Medium":
        return <img src={medium_priority} alt="medium_priority" />;
      case "Low":
        return <img src={low_priority} alt="low_priority" />;
      case "Open":
        return <></>;
      case "Todo":
        return <img src={todo_status} alt="todo_status" />;
      case "In progress":
        return <img src={inProgress_status} alt="inProgress_status" />;
      case "Backlog":
        return <img src={backlog_status} alt="backlog_status" />;
      case "Canceled":
        return <img src={cancelled_status} alt="cancelled_status" />;
      default:
        return null; 
    }
  }
  
  return (
    <div className="column">
      <div className="flex column_header">
        <div className="flex column_container">
          {getSymbol(title)}
          <div className="column-title">{title}</div>
          <span className="no-wrap">{tickets.length}</span>
        </div>
      { tickets.length > 0 &&
        <div className="flex">
          <div className="task_symbol">
            <img src={add_symbol} alt="add_symbol" />
          </div>
          <div className="task_symbol">
            <img src={threeDot_symbol} alt="threeDot_symbol" />
          </div>
        </div>
      }
      </div>

      <div className="column-tickets">
        {tickets.map((ticket) => (
          <Card key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default Column;
