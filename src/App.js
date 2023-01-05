import React, { useState, useEffect } from 'react';
import './App.css'
import StudentsTable from './StudentsTable';

const StudentAttendance = () => {
  const [students, setStudents] = useState([]);
  const [rollNumber, setRollNumber] = useState('');
  const [name, setName] = useState('');

  // useEffect to fetch the list of students from the API
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:5000/get_students');
      const students = await res.json();
      setStudents(students);
    };
  
    const interval = setInterval(fetchData, 3000);
  
    return () => clearInterval(interval);
  }, []);
  

  const handleRollNumberChange = event => {
    setRollNumber(event.target.value);
  }

  const handleNameChange = event => {
    setName(event.target.value);
  }


  const handleCheckIn = () => {
    fetch('http://localhost:5000/student_checkin', {
      method: 'POST',
      body: JSON.stringify({ rollNumber, name }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(student => setStudents([...students, student]));
  }

  const handleCheckOut = () => {
    fetch('http://localhost:5000/student_checkout', {
      method: 'POST',
      body: JSON.stringify({ rollNumber, name }),
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const totalStudents = students.filter(item => item.check_out === 'None');
  const count = totalStudents.length;

  return (
    <div className="form-container">
      <h1>Student Attendance</h1>
      <fieldset>
        <legend>Check In/Out</legend>
        <form id="form_id" className="form">
          <label className="label">
            Roll Number:
            <input type="text" value={rollNumber} placeholder="enter roll no" onChange={handleRollNumberChange} className="input" />
          </label>
          <br />
          <label className="label">
            Name:
            <input type="text" value={name} placeholder="enter name" onChange={handleNameChange} className="input" />
          </label>
          <br />
          <div className='button-container'>
            <button type="button" onClick={handleCheckIn} className="button">Check In</button>
            <button type="button" onClick={() => handleCheckOut(rollNumber)} className="button">Check Out</button>
          </div>
        </form>
      </fieldset>
      <h2>Students Present: {count}</h2>
      <StudentsTable students={students} />
    </div>
  );

}

export default StudentAttendance;
