import React, { useState, useEffect } from "react";
import Column from "./Column";
import Dropdown from "../Display-Dropdown/Dropdown";
import "./Board.css";

const Board = () => {
  // State variables
  const [display, setDisplay] = useState("status");
  const [grouping, setGrouping] = useState("title"); 
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState(); 
  const [users, setUsers] = useState(); 

  // Function to handle display change
  const handleDisplayChange = (e) => {
    setDisplay(e);
  };

  // Function to handle grouping change
  const handleGroupingChange = (e) => {
    setGrouping(e);
  };

  // useEffect to fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const response_data = await response.json();
        console.log(response_data);
        setTickets(response_data.tickets); // Set fetched tickets to state
        setUsers(response_data.users); // Set fetched users to state
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.log(error); // Log error if fetch fails
      }
    };

    fetchData();
  }, []);

  // Priority list for tickets
  const priorityList = [
    { priority: "No priority", priorityLevel: 0 },
    { priority: "Urgent", priorityLevel: 1 },
    { priority: "High", priorityLevel: 2 },
    { priority: "Medium", priorityLevel: 3 },
    { priority: "Low", priorityLevel: 4 },
  ];

  // Function to get columns based on grouping and display settings
  const getColumns = () => {
    if (grouping === "priority") {
      if (display === "status") {
        return ["Open", "Todo", "In progress", "Backlog", "Canceled"].map(
          (status) => ({
            title: status,
            tickets: tickets
              .filter((ticket) => ticket.status === status)
              .sort((a, b) => a.priority - b.priority),
          })
        );
      } else if (display === "users") {
        return users.map((user) => ({
          title: user.name,
          tickets: tickets
            .filter((ticket) => ticket.userId === user.id)
            .sort((a, b) => a.priority - b.priority),
        }));
      } else if (display === "priority") {
        setGrouping("title");
        return priorityList.map((status) => ({
          title: status.priority,
          tickets: tickets
            .filter((ticket) => ticket.priority === status.priorityLevel)
            .sort((a, b) => a.priority - b.priority),
        }));
      }
    } else {
      if (display === "status") {
        return ["Open", "Todo", "In progress", "Backlog", "Canceled"].map(
          (status) => ({
            title: status,
            tickets: tickets
              .filter((ticket) => ticket.status === status)
              .sort((a, b) => a.title.localeCompare(b.title)),
          })
        );
      } else if (display === "users") {
        return users.map((user) => ({
          title: user.name,
          tickets: tickets
            .filter((ticket) => ticket.userId === user.id)
            .sort((a, b) => a.title.localeCompare(b.title)),
        }));
      } else if (display === "priority") {
        return priorityList.map((status) => ({
          title: status.priority,
          tickets: tickets
            .filter((ticket) => ticket.priority === status.priorityLevel)
            .sort((a, b) => a.title.localeCompare(b.title)),
        }));
      }
    }
  };

  return (
    <>
      {!loading && (
        <div className="board">
          <Dropdown
            onChange={handleDisplayChange}
            handleGroupingChange={handleGroupingChange}
            value={display}
            grouping={grouping}
          />
          <div className="columns">
            {getColumns().map((column) => (
              <Column
                key={column.title}
                title={column.title}
                tickets={column.tickets}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Board;
