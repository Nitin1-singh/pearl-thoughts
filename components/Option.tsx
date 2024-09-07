// components/RecurrenceOptions.js
"use client";
import React from "react";
import { useAtom } from "jotai";
import { recurrenceAtom } from "@/store/store";

const RecurrenceOptions = () => {
  const [recurrence, setRecurrence] = useAtom(recurrenceAtom);

  const handleRecurrenceChange = (e: any) => {
    setRecurrence(e.target.value);
  };

  return (
    <div className="mt-4">
      <label className="block mb-2">Recurrence:</label>
      <select
        value={recurrence}
        onChange={handleRecurrenceChange}
        className="p-2 border rounded"
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
    </div>
  );
};

export default RecurrenceOptions;
