import React from "react";
import Dropdown from "../../components/Dropdown/Dropdown";
import { DROPDOWN_SEED_DATA } from "./config";
import "./DropdownView.scss";

function DropdownView() {
  return (
    <div className="DropdownViewContainer">
      <Dropdown
        value={{}}
        label="Jack's Dropdown Label"
        options={DROPDOWN_SEED_DATA}
      />
    </div>
  );
}

export default DropdownView;
