import React, { useState } from "react";
import "./Dropdown.css";
import Select from "react-select";
import { FaAngleDown } from "react-icons/fa6";
import downArrow from '../../assets/images/down.svg'

const Dropdown = ({ onChange, handleGroupingChange, value, grouping }) => {
 
  const [isDisplayDropdownVisible, setIsDisplayDropdownVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState(value);
  const [groupingValue, setGroupingValue] = useState(grouping);

  // Function to handle changes in the display dropdown
  function displayChangeHandler(currentValue) {
    setDisplayValue(currentValue); 
    onChange(currentValue); 
  }

  // Function to handle changes in the grouping dropdown
  function orderChangeHandler(currentValue) {
    setGroupingValue(currentValue); 
    handleGroupingChange(currentValue); 
  }

  return (
    <div className="dropdown">
      <div
        className="dropdown-label"
        onClick={() => {
          setIsDisplayDropdownVisible(!isDisplayDropdownVisible); // Toggle the visibility of the dropdown
        }}
      >
        Display <img src={downArrow} alt="downArrow" />
      </div>
      {isDisplayDropdownVisible && (
        <div className="flex">
          <div className="flex selection-bar">
            <div className="flex selection-bar-inner">
              <label style={{ fontSize: 14 }}>Grouping</label>
              <Select
                value={{ label: displayValue, value: displayValue }} // Set the current display value
                onChange={(selectedOption) =>
                  displayChangeHandler(selectedOption.value) // Handle selection changes
                }
                options={[
                  { label: "status", value: "status" },
                  { label: "users", value: "users" },
                  { label: "priority", value: "priority" },
                ]}
                className="w-full sm:w-48 md:w-64 lg:w-80 xl:w-96"
                placeholder="Select"
              />
            </div>
            <div className="flex selection-bar-inner">
              <label style={{ fontSize: 14 }}>Ordering</label>
              <Select
                value={{ label: grouping, value: grouping }} // Set the current grouping value
                onChange={(selectedOption) =>
                  orderChangeHandler(selectedOption.value) // Handle selection changes
                }
                options={[
                  { label: "priority", value: "priority" },
                  { label: "title", value: "title" },
                ]}
                isDisabled={value === 'priority'} 
                className="w-full sm:w-48 md:w-64 lg:w-80 xl:w-96"
                placeholder="Select"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
