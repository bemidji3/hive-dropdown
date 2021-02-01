import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import "./Dropdown.scss";

function DropdownItem({
  item,
  extraClassNames,
  onClick,
  preview = false,
  key,
}) {
  const { text, value, checked } = item;
  const dropdownItemClassNames = classNames("DropdownItem", {
    [extraClassNames]: !!extraClassNames,
    checked: !!checked,
  });
  return (
    <span className={dropdownItemClassNames}>
      {!preview && (
        <input
          onClick={() => {
            onClick();
          }}
          checked={checked}
          type="radio"
          id={key}
          value={value}
        />
      )}
      <label className="DropdownItemLabel">{text}</label>
    </span>
  );
}

function Dropdown({ options, handleChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(options[0]);
  const dropdownClassNames = classNames("DropdownContent", {
    expanded: !!isOpen,
  });
  const previewItemClassNames = classNames("PreviewItem", {
    expanded: !!isOpen,
  });
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleItemClick = (option) => {
    setSelectedItem(option);
    handleChange(option.value)
  };
  return (
    <div className="DropdownContainer">
      <span className={previewItemClassNames} onClick={handleToggle}>
        <DropdownItem
          preview
          item={selectedItem}
          onClick={() => {
            handleItemClick(selectedItem);
          }}
        />
        {isOpen ? (
          <FontAwesomeIcon className="ToggleIcon" icon={faArrowUp} />
        ) : (
          <FontAwesomeIcon className="ToggleIcon" icon={faArrowDown} />
        )}
      </span>
      <div className={dropdownClassNames}>
        {options &&
          options.map((option, index) => {
            return (
              <DropdownItem
                item={option}
                onClick={() => {
                  handleItemClick(option);
                }}
                key={index}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Dropdown;
