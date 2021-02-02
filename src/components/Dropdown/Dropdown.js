import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import { selectedItemText } from "./config";
import useOutsideClick from "../../hooks/useClickOutside";
import useDropdown from "../../hooks/useDropdown";
import "./Dropdown.scss";
import { DROPDOWN_SEED_DATA } from "../../views/DropdownView/config";

function SelectedDropdownItem({ item, extraClassNames, onClick }) {
  const { text } = item;
  const selectedDropdownItemClassNames = classNames("SelectedDropdownItem", {
    [extraClassNames]: !!extraClassNames,
  });

  return (
    <div className={selectedDropdownItemClassNames}>
      {text}
      <div
        className="SelectedItemCloseIcon"
        onClick={() => {
          onClick();
        }}
      >
        <FontAwesomeIcon className="CloseIcon" icon={faTimes} />
      </div>
    </div>
  );
}

function DropdownListItem({ item, extraClassNames, onClick }) {
  const { text, value, checked, key } = item;
  const dropdownItemClassNames = classNames("DropdownItem", {
    [extraClassNames]: !!extraClassNames,
    checked: !!checked,
  });
  return (
    <span
      className={dropdownItemClassNames}
      onClick={() => {
        onClick();
      }}
    >
      <input readOnly checked={checked} type="radio" id={key} value={value} />
      <label className="DropdownItemLabel">{text}</label>
    </span>
  );
}

function Dropdown({
  options,
  placeHolder = "Select item(s)",
  label,
  onChange,
  value,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const ref = useRef(null);
  const {
    dropdownValue,
    dropdownOptions,
    handleChange,
    resetDropdown,
    selectAllOptions,
    updateDropdownValueObject,
  } = useDropdown(options || DROPDOWN_SEED_DATA, setSelectedItems, value);
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
    if (!option.checked) {
      const wrappedOption = {
        ...option,
        checked: true,
      };
      setSelectedItems([...selectedItems, wrappedOption]);
      handleChange(option.value);
      if (onChange) {
        onChange(option);
      }
    } else {
      handleItemDelete(option);
    }
  };
  const handleItemDelete = (option) => {
    setSelectedItems(selectedItems.filter((item) => item.key !== option.key));
    handleChange(option.value);
    if (onChange) {
      onChange(option);
    }
  };
  useOutsideClick(ref, () => {
    setIsOpen(false);
  });
  useEffect(() => {
    updateDropdownValueObject(selectedItems);
  }, [selectedItems]);
  return (
    <div className="LabelWrapper">
      {label && <label className="DropdownLabel">{label}</label>}
      <div className="DropdownContainer" ref={ref}>
        <span className={previewItemClassNames} onClick={() => handleToggle()}>
          <div className="PreviewItemText">
            {isEmpty(selectedItems)
              ? placeHolder
              : selectedItemText(selectedItems)}
          </div>
          <FontAwesomeIcon
            className="ToggleIcon"
            icon={isOpen ? faArrowUp : faArrowDown}
          />
        </span>
        <div className={dropdownClassNames}>
          {dropdownOptions &&
            dropdownOptions.map((option, index) => {
              return (
                isOpen && (
                  <DropdownListItem
                    item={option}
                    onClick={() => {
                      handleItemClick(option);
                    }}
                    key={index}
                  />
                )
              );
            })}
          <div className="SelectedItemsView">
            {!isOpen &&
              !isEmpty(selectedItems) &&
              dropdownOptions.map((option, index) => {
                return (
                  option.checked && (
                    <SelectedDropdownItem
                      item={option}
                      onClick={() => {
                        handleItemDelete(option);
                      }}
                      key={index}
                    />
                  )
                );
              })}
          </div>
        </div>
      </div>
      <div className="FooterActions">
        <button className="SelectAll" onClick={() => selectAllOptions()}>
          Select All
        </button>
        <button className="Reset" onClick={() => resetDropdown()}>
          Reset Selection
        </button>
      </div>
    </div>
  );
}

export default Dropdown;

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.string,
      checked: PropTypes.bool,
    })
  ),
  handleChange: PropTypes.func,
  placeHolder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.shape({}),
};

SelectedDropdownItem.propTypes = {
  item: PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.string,
    checked: PropTypes.bool,
  }),
  extraClassNames: PropTypes.string,
  onClick: PropTypes.func,
};

DropdownListItem.propTypes = {
  item: PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.string,
    checked: PropTypes.bool,
    key: PropTypes.number,
  }),
  extraClassNames: PropTypes.string,
  onClick: PropTypes.func,
};
