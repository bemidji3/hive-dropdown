import React from "react";
import Dropdown from "../../components/Dropdown/Dropdown";
import { DUMMY_DROPDOWN_ITEMS } from "./config";
import "./DropdownView.scss";

function DropdownView() {
  return (
    <div className="DropdownViewContainer">
      <Dropdown label="Jack's Dropdown Label" options={DUMMY_DROPDOWN_ITEMS} />
    </div>
  );
}

export default DropdownView;
