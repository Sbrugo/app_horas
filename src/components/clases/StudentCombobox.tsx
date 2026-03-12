"use client";

import { useState, useMemo } from "react";

interface Student {
  id: string;
  name: string;
}

interface StudentComboboxProps {
  students: Student[];
  onSelectStudent: (studentId: string | null) => void;
}

export default function StudentCombobox({
  students,
  onSelectStudent,
}: StudentComboboxProps) {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const filteredStudents = useMemo(() => {
    if (!inputValue) return [];
    return students.filter((student) =>
      student.name.toLowerCase().includes(inputValue.toLowerCase()),
    );
  }, [inputValue, students]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowSuggestions(true);
    setHighlightedIndex(-1);
    onSelectStudent(null);
  };

  const handleSelectStudent = (student: Student) => {
    setInputValue(student.name);
    setShowSuggestions(false);
    onSelectStudent(student.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex < filteredStudents.length - 1 ? prevIndex + 1 : prevIndex,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (e.key === "Enter" && highlightedIndex !== -1) {
      e.preventDefault();
      handleSelectStudent(filteredStudents[highlightedIndex]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
        placeholder="Seleccione o Escriba un alumno"
        className="w-full px-4 py-3 mt-1 bg-gray-200 text-gray-700 rounded-4xl"
      />
      {showSuggestions && filteredStudents.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 text-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredStudents.map((student, index) => (
            <li
              key={student.id}
              onMouseDown={() => handleSelectStudent(student)}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                index === highlightedIndex ? "bg-gray-100" : ""
              }`}
            >
              {student.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
