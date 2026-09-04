import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'http://13.126.189.150:5000/api';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background-color: #0b0f19 !important;
    background-image: 
      radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.18) 0px, transparent 50%),
      radial-gradient(at 100% 100%, rgba(16, 185, 129, 0.12) 0px, transparent 50%) !important;
    min-height: 100vh;
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    color: #f8fafc !important;
  }
  .app-container {
    max-width: 1050px;
    margin: 40px auto;
    padding: 0 24px;
  }
  .header-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 28px;
    flex-wrap: wrap;
    gap: 16px;
  }
  .header-box h1 {
    font-size: 2.2rem;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.03em;
  }
  .header-box p {
    color: #94a3b8;
    font-size: 0.95rem;
    margin-top: 4px;
  }
  .arch-pill {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 8px 18px;
    border-radius: 9999px;
    font-size: 0.85rem;
    font-weight: 600;
    color: #cbd5e1;
  }
  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #10b981;
    box-shadow: 0 0 10px #10b981;
  }
  .glass-card {
    background: rgba(18, 24, 38, 0.8);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    padding: 24px;
    margin-bottom: 28px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  }
  .card-title {
    font-size: 1.15rem;
    font-weight: 600;
    margin-bottom: 18px;
    color: #ffffff;
  }
  .styled-form {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
  }
  .styled-input {
    flex: 1;
    min-width: 200px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 12px 18px;
    font-size: 0.95rem;
    color: #ffffff;
    outline: none;
    transition: 0.2s ease;
  }
  .styled-input:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.25);
  }
  .btn-submit {
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    color: #ffffff;
    font-weight: 600;
    padding: 12px 24px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.35);
    transition: 0.2s ease;
  }
  .btn-submit:hover {
    transform: translateY(-2px);
  }
  .btn-cancel {
    background: rgba(255, 255, 255, 0.08);
    color: #e2e8f0;
    font-weight: 600;
    padding: 12px 20px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
  }
  .table-header-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
  .counter-badge {
    background: rgba(99, 102, 241, 0.15);
    color: #818cf8;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
  }
  .styled-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 8px;
  }
  .styled-table th {
    color: #94a3b8;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 10px 18px;
    text-align: left;
  }
  .styled-table tbody tr {
    background: rgba(255, 255, 255, 0.02);
  }
  .styled-table tbody tr:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  .styled-table td {
    padding: 16px 18px;
    color: #e2e8f0;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }
  .styled-table td:first-child {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    border-left: 1px solid rgba(255, 255, 255, 0.06);
    font-weight: 600;
    color: #ffffff;
  }
  .styled-table td:last-child {
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    border-right: 1px solid rgba(255, 255, 255, 0.06);
  }
  .class-pill {
    display: inline-block;
    background: rgba(255, 255, 255, 0.06);
    padding: 3px 12px;
    border-radius: 8px;
    font-size: 0.85rem;
    color: #cbd5e1;
  }
  .act-btn {
    padding: 6px 14px;
    font-size: 0.8rem;
    font-weight: 600;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    margin-left: 8px;
  }
  .act-edit {
    background: rgba(99, 102, 241, 0.2);
    color: #a5b4fc;
  }
  .act-edit:hover { background: rgba(99, 102, 241, 0.35); }
  .act-del {
    background: rgba(239, 68, 68, 0.2);
    color: #fca5a5;
  }
  .act-del:hover { background: rgba(239, 68, 68, 0.35); }
  .empty-row {
    text-align: center;
    padding: 40px;
    color: #94a3b8;
  }
`;

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

  return (
    <div className="app-container">
      <style>{STYLES}</style>
      
      <div className="header-box">
        <div>
          <h1>Student Management Portal</h1>
          <p>Enterprise 3-Tier Production Architecture</p>
        </div>
        <div className="arch-pill">
          <span className="status-dot"></span>
          CLOUD COMPUTING WORKSHOP , GLA UNIVERSITY 
        </div>
      </div>

      <div className="glass-card">
        <div className="card-title">
          {editing ? '⚡ Edit Student Record' : '➕ Register New Student'}
        </div>
        <form onSubmit={handleSubmit} className="styled-form">
          <input
            className="styled-input"
            type="text"
            placeholder="Student Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            className="styled-input"
            type="text"
            placeholder="Roll Number"
            value={form.roll_no}
            onChange={(e) => setForm({ ...form, roll_no: e.target.value })}
            required
          />
          <input
            className="styled-input"
            type="text"
            placeholder="Branch / Class"
            value={form.class}
            onChange={(e) => setForm({ ...form, class: e.target.value })}
            required
          />
          <button type="submit" className="btn-submit">
            {editing ? 'Update Student' : 'Enroll Student'}
          </button>
          {editing && (
            <button
              type="button"
              className="btn-cancel"
              onClick={() => {
                setEditing(null);
                setForm({ name: '', roll_no: '', class: '' });
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="glass-card">
        <div className="table-header-info">
          <div className="card-title" style={{ margin: 0 }}>Active Records</div>
          <span className="counter-badge">{students.length} Total Enrolled</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Roll Number</th>
                <th>Class / Stream</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.roll_no}</td>
                    <td><span className="class-pill">{student.class}</span></td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="act-btn act-edit" onClick={() => handleEdit(student)}>
                        Edit
                      </button>
                      <button className="act-btn act-del" onClick={() => handleDelete(student.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="empty-row">
                    No active student records found in MySQL RDS.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
