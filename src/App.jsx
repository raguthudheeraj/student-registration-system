import React, { useState } from "react";
import "./index.css";

export default function StudentRegistrationApp() {
  const [courseTypes, setCourseTypes] = useState(["Individual", "Group", "Special"]);
  const [courses, setCourses] = useState(["Hindi", "English", "Urdu"]);
  const [offerings, setOfferings] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [newCourseType, setNewCourseType] = useState("");
  const [newCourse, setNewCourse] = useState("");
  const [selectedCourseType, setSelectedCourseType] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [studentName, setStudentName] = useState("");
  const [filterType, setFilterType] = useState("");

  const addCourseType = () => {
    if (newCourseType && !courseTypes.includes(newCourseType)) {
      setCourseTypes([...courseTypes, newCourseType]);
      setNewCourseType("");
    }
  };

  const addCourse = () => {
    if (newCourse && !courses.includes(newCourse)) {
      setCourses([...courses, newCourse]);
      setNewCourse("");
    }
  };

  const addOffering = () => {
    if (selectedCourse && selectedCourseType) {
      const offering = `${selectedCourseType} - ${selectedCourse}`;
      if (!offerings.includes(offering)) {
        setOfferings([...offerings, offering]);
      }
    }
  };

  const registerStudent = (offering) => {
    if (studentName) {
      setRegistrations([...registrations, { student: studentName, offering }]);
      setStudentName("");
    }
  };

  const filteredOfferings = filterType
    ? offerings.filter((o) => o.startsWith(filterType))
    : offerings;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Student Registration System</h1>

      <div className="border p-4 rounded">
        <h2 className="text-xl font-semibold">Manage Course Types</h2>
        <input
          className="border px-2 py-1 mr-2"
          placeholder="New course type"
          value={newCourseType}
          onChange={(e) => setNewCourseType(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-3 py-1" onClick={addCourseType}>Add</button>
        <ul className="list-disc pl-6">
          {courseTypes.map((type, idx) => <li key={idx}>{type}</li>)}
        </ul>
      </div>

      <div className="border p-4 rounded">
        <h2 className="text-xl font-semibold">Manage Courses</h2>
        <input
          className="border px-2 py-1 mr-2"
          placeholder="New course"
          value={newCourse}
          onChange={(e) => setNewCourse(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-3 py-1" onClick={addCourse}>Add</button>
        <ul className="list-disc pl-6">
          {courses.map((course, idx) => <li key={idx}>{course}</li>)}
        </ul>
      </div>

      <div className="border p-4 rounded">
        <h2 className="text-xl font-semibold">Create Course Offering</h2>
        <select className="border px-2 py-1 mr-2" onChange={(e) => setSelectedCourseType(e.target.value)}>
          <option value="">Select Course Type</option>
          {courseTypes.map((type, idx) => <option key={idx} value={type}>{type}</option>)}
        </select>
        <select className="border px-2 py-1 mr-2" onChange={(e) => setSelectedCourse(e.target.value)}>
          <option value="">Select Course</option>
          {courses.map((course, idx) => <option key={idx} value={course}>{course}</option>)}
        </select>
        <button className="bg-blue-500 text-white px-3 py-1" onClick={addOffering}>Add Offering</button>
        <ul className="list-disc pl-6">
          {offerings.map((off, idx) => <li key={idx}>{off}</li>)}
        </ul>
      </div>

      <div className="border p-4 rounded">
        <h2 className="text-xl font-semibold">Register Student</h2>
        <input
          className="border px-2 py-1 mr-2"
          placeholder="Student name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
        <select className="border px-2 py-1 mr-2" onChange={(e) => setFilterType(e.target.value)}>
          <option value="">All Types</option>
          {courseTypes.map((type, idx) => <option key={idx} value={type}>{type}</option>)}
        </select>
        <ul className="list-disc pl-6">
          {filteredOfferings.map((offering, idx) => (
            <li key={idx}>
              {offering}
              <button className="text-blue-500 ml-2" onClick={() => registerStudent(offering)}>Register</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="border p-4 rounded">
        <h2 className="text-xl font-semibold">Registered Students</h2>
        <ul className="list-disc pl-6">
          {registrations.map((reg, idx) => (
            <li key={idx}>{reg.student} → {reg.offering}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
