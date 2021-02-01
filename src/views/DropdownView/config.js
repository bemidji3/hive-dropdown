import { range } from "lodash";

export const dynamicDropdownItems = range(10).map((number) => {
  return {
    text: `Option ${number}`,
    value: `option_${number}`,
    checked: false,
  };
});
