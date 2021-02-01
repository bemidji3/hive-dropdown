import React from "react";
import Dropdown from "../../components/Dropdown/Dropdown";
import { dynamicDropdownItems } from "./config";
import useDropdown from "../../hooks/useDropdown";
import "./DropdownView.scss";

function DropdownView() {
    const { dropdownOptions, updateOption } = useDropdown(dynamicDropdownItems);
    return (
        <div className="DropdownViewContainer">
            <Dropdown options={dropdownOptions} handleChange={updateOption} />
            <div className="SelectedItems">
                Selected Items:
                {dropdownOptions && dropdownOptions.map(item => {
                    if(item.checked) {
                        return (
                            <span>{item.text}</span>
                        )
                    }
                })}
            </div>
        </div>
  );
}

export default DropdownView;
