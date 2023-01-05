import React from 'react';
import './StudentTable.css'

function StudentsTable(props) {
  const rows = props.students.map(student => (
    <tr key={student.roll_no}>
      <td>{student.roll_no}</td>
      <td>{student.name}</td>
      <td>{student.check_in}</td>
      <td>{student.check_out}</td>
    </tr>
  ));

  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Roll Number</th>
          <th>Name</th>
          <th>Check In</th>
          <th>Check Out</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default StudentsTable;
