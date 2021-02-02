import { useState } from "react";

const useDropdown = (data, setSelectedItems) => {
  const [dropdownOptions, setDropdownItems] = useState(data);
  const handleChange = (optionToUpdate) => {
    const newDropdownItems = dropdownOptions.map((option) => {
      if (option.value === optionToUpdate) {
        return {
          ...option,
          checked: !option.checked,
        };
      }
      return option;
    });
    setDropdownItems(newDropdownItems);
  };
  const resetDropdown = () => {
    const updatedDropdownItems = dropdownOptions.map((option) => {
      return {
        ...option,
        checked: false,
      };
    });
    setDropdownItems(updatedDropdownItems);
    setSelectedItems([]);
  };
  const selectAllOptions = () => {
    const updatedDropdownItems = dropdownOptions.map((option) => {
      return {
        ...option,
        checked: true,
      };
    });
    setDropdownItems(updatedDropdownItems);
    setSelectedItems(updatedDropdownItems);
  };

  return {
    dropdownOptions,
    handleChange,
    resetDropdown,
    selectAllOptions,
  };
};

export default useDropdown;
