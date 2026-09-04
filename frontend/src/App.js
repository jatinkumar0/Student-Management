import React, { useState, useEffect } from 'react';
import './App.css';

// Replace with your ALB DNS or current backend IP
const API_BASE_URL = 'http://13.126.189.150:5000/api';

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', roll_no: '', class: '' });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/students`);
      const data = await response.json();
      setStudents(data);
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editing 
      ? `${API_BASE_URL}/students/${editing}`
      : `${API_BASE_URL}/students`;
    
    await fetch(url, {
      method: editing ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    
    setForm({ name: '', roll_no: '', class: '' });
    setEditing(null);
    fetchStudents();
  };

  const handleEdit = (student) => {
    setForm({ name: student.name, roll_no: student.roll_no, class: student.class });
    setEditing(student.id);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_BASE_URL}/students/${id}`, { method: 'DELETE' });
    fetchStudents();
  };

  const handleCancel = () => {
    setEditing(null);
    setForm({ name: '', roll_no: '', class: '' });
  };

  return (
    <div className="App">
      <div className="header-section">
        <h1>Student Management Portal</h1>
        <p>AWS 3-Tier Architecture Demo (ALB &bull; EC2 &bull; RDS)</p>
      </div>

      <div className="card form-card">
        <div className="form-title">{editing ? 'Edit Student Details' : 'Register New Student'}</div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Roll Number"
              value={form.roll_no}
              onChange={(e) => setForm({ ...form, roll_no: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Class / Stream"
              value={form.class}
              onChange={(e) => setForm({ ...form, class: e.target.value })}
              required
            />
          </div>
          <div className="btn-group">
            <button type="submit" className="btn-primary">
              {editing ? 'Save Changes' : 'Add Student'}
            </button>
            {editing && (
              <button type="button" className="btn-cancel" onClick={handleCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="card table-container">
        <div className="table-header">
          <span className="table-title">Enrolled Students</span>
          <span className="badge-count">{students.length} Records</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll Number</th>
              <th>Class</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id}>
                  <td className="student-name">{student.name}</td>
                  <td>{student.roll_no}</td>
                  <td>
                    <span className="class-badge">{student.class}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="action-buttons" style={{ justifyContent: 'flex-end' }}>
                      <button className="btn-edit" onClick={() => handleEdit(student)}>
                        Edit
                      </button>
                      <button className="btn-delete" onClick={() => handleDelete(student.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="empty-state">
                  No student records found in the database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
