import {useState} from "react";

const useDropdown = (data) => {
    const [dropdownOptions, setDropdownItems] = useState(data);
    const updateOption = (optionToUpdate) => {
        const newDropdownItems = dropdownOptions.map((option) => {
            if(option.value === optionToUpdate) {
                return {
                    ...option,
                    checked: !option.checked,
                }
            }
            return option
        });
        setDropdownItems(newDropdownItems);
    };

    return {
        dropdownOptions,
        updateOption,
    }
};

export default useDropdown;