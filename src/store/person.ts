import { defineStore } from "pinia";
export const usePerson = defineStore("person", {
  state() {
    return {
      sum: 6,
    };
  },
});
