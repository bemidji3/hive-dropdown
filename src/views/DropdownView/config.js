import { range } from "lodash";

//USE THIS TO POPULATE THE DROPDOWN WITH DUMMY DROPDOWN ITEMS
export const DROPDOWN_SEED_DATA = range(10).map((number) => {
  return {
    text: `Option ${number}`,
    value: `option_${number}`,
    checked: false,
    key: number,
  };
});
