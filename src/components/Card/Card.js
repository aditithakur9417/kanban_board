import React from "react";
import "./Card.css";
import { FaCircle } from "react-icons/fa";
import { BsExclamationSquareFill } from "react-icons/bs";

const Card = ({ ticket }) => {
  return (
    <div className="card">
      <div className="card-id">{ticket.id}</div>
      <div className="card-title truncate">{ticket.title}</div>
      <div className="flex card-tag">
        <div className="card-tag-icon">
          <BsExclamationSquareFill fill="#A8A8B7" />
        </div>
        <div className="card-user">
          <FaCircle fill="#A8A8B7" />
          {ticket.tag}
        </div>
      </div>
    </div>
  );
};

export default Card;
