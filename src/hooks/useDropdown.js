import { useState } from "react";

const useDropdown = (data, setSelectedItems, value) => {
  const [dropdownOptions, setDropdownItems] = useState(data);
  const [dropdownValue, setDropdownValue] = useState(value);
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
  const updateDropdownValueObject = (newData) => {
    const updatedValueObject = newData.reduce((acc, currentValue) => {
      let newObject = {};
      newObject[currentValue.key] = currentValue;
      return Object.assign(acc, newObject)
    }, {});
    setDropdownValue(updatedValueObject);
  };

  return {
    dropdownOptions,
    dropdownValue,
    handleChange,
    resetDropdown,
    selectAllOptions,
    updateDropdownValueObject,
  };
};

export default useDropdown;
