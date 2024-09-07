// store.js
import dayjs from "dayjs";
import { atom } from "jotai";

export const selectedDateAtom = atom(dayjs());
export const recurrenceAtom = atom("daily");
