"use client";
import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { getDates } from "@/utils/getDays";

const FutureDateSelector = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedDays, setSelectedDays] = useState(new Set());

  const [recurrenceType, setRecurrenceType] = useState<string>("none");
  const [intervalChange, setIntervalChange] = useState(1);
  const [weekInterval, setWeekInterval] = useState(1);

  const [recurrenceTypeC, setRecurrenceTypeC] = useState<string>("none");

  const handleDateSelect = (date: any) => {
    setSelectedDate(date);
  };
  const handleRecurrenceTypeChange = (date: any) => {
    setRecurrenceTypeC(date.target.value);
  };
  const handleIntervalChange = (val: any) => {
    setIntervalChange(val.target.value);
  };
  const handleDayOfWeekChange = (day: any) => {
    setSelectedDays((prev: any) => {
      const updatedDays = new Set(prev);
      if (updatedDays.has(day)) {
        updatedDays.delete(day);
      } else {
        updatedDays.add(day);
      }
      return updatedDays;
    });
  };
  return (
    <div>
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
        modifiers={{
          future: (date) => {
            return getDates({
              date: date,
              recurrenceType: recurrenceType,
              recurrenceTypeC: recurrenceTypeC,
              intervalChange: intervalChange,
              selectedDate: selectedDate,
              selectedDays: selectedDays,
              weekInterval: weekInterval,
            });
          },
        }}
        modifiersClassNames={{
          future: "bg-blue-200 text-blue-900", // Tailwind classes to highlight future dates
        }}
      />
      <select
        value={recurrenceType}
        onChange={(e) => setRecurrenceType(e.target.value)}
        className="mb-4 border p-2 rounded"
      >
        <option value="none">None</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
      <div className="flex flex-row gap-3 align-middle items-center mb-4">
        <label className="block mb-2">Select Custom Intervel:</label>

        <label className="block mb-2">Interval:</label>
        <input
          type="number"
          min="1"
          value={intervalChange}
          onChange={handleIntervalChange}
          className="border p-2 rounded w-[100px]"
        />
        <select
          value={recurrenceTypeC}
          onChange={handleRecurrenceTypeChange}
          className="border p-2 rounded"
        >
          <option value="none">None</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Select Days of the Week:</label>
        <div className="mb-4">
          <label className="block mb-2">Interval (Weeks):</label>
          <input
            type="number"
            min="1"
            value={weekInterval}
            onChange={(e) => setWeekInterval(Number(e.target.value))}
            className="border p-2 rounded w-[100px]"
          />
        </div>
        <div className="mb-4">
          <div className="flex gap-2">
            {[
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ].map((day, index) => (
              <label key={day} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedDays.has(index)}
                  onChange={() => handleDayOfWeekChange(index)}
                  className="mr-2"
                />
                {day}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FutureDateSelector;
