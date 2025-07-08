// pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import AssignTeacherForm from "../child_components/AssignTeacherCard";
import studentImg from "../assets/boy.gif";
import { FaPlus, FaTimes } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { supabase } from "../supabaseClient";

const AdminDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // 🔽 Form state values-==================================================
  // 🔽 Form states
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [department, setDepartment] = useState("");
  const [section, setSection] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  // ✅ Fetch all teachers on mount=============================================================
  useEffect(() => {
    const fetchTeachers = async () => {
      const { data, error } = await supabase.from("teachers").select("*");
      if (error) {
        console.error("Error fetching teachers:", error.message);
      } else {
        setTeachers(data);
      }
    };

    fetchTeachers();
  }, []);
  // end hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { full_name, employee_id, id } = selectedTeacher;

    const { data, error } = await supabase.from("assigned_teachers").insert([
      {
        teacher_id: id,
        full_name,
        employee_id,
        department,
        section,
      },
    ]);

    if (error) {
      console.error("Error assigning teacher:", error.message);
      alert("Something went wrong!");
    } else {
      alert(
        `Assigned: ${full_name} (${employee_id}) to Section ${section} - ${department}`
      );
      setShowModal(false);
      setSelectedTeacher(null);
      setDepartment("");
      setSection("");
    }
  };
  const attendancePercent = 83;

  const programPlan = [
    { title: "Lesson", time: "40 min" },
    { title: "Test", time: "15 min / 10 questions" },
    { title: "Homework", time: "Nothing is here yet" },
    { title: "Lesson", time: "25 min" },
  ];

  const barData = [
    { name: "1 week", performance: 100 },
    { name: "2 week", performance: 63 },
    { name: "3 week", performance: 27 },
    { name: "4 week", performance: 81 },
  ];

  const COLORS = ["#3b82f6", "#1e293b"];

  const inputStyle1 = {
    width: "89%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "1px solid #555",
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "#fff",
    fontSize: "16px",
    outline: "none",
  };

  // 🧊 Glassmorphism Style Modal
  const modalOverlay = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backdropFilter: "blur(8px)",
  };

  const modalContent = {
    background: "rgba(30, 30, 30, 0.75)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    padding: "30px",
    borderRadius: "16px",
    width: "95%",
    maxWidth: "450px",
    color: "white",
    position: "relative",
  };

  const inputStyle = {
    width: "94%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "1px solid #555",
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "#fff",
    fontSize: "16px",
    outline: "none",
  };

  const headingStyle = {
    fontSize: "30px",
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "center",
    marginBottom: "25px",
    fontFamily: "cursive",
  };

  const submitBtn = {
    backgroundColor: "#00cc99",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    width: "94%",
    marginTop: "10px",
    transition: "0.3s ease",
  };

  return (
    <div
      style={{
        backgroundColor: "#000",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Segoe UI",
        color: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          marginTop: "-20px",
        }}
      >
        <h1 style={{ marginLeft: "20px" }}>👋 Have a nice day, Admin!</h1>
        <button
          onClick={() => setShowModal(true)}
          style={{
            backgroundColor: "#00cc99",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            marginRight: "20px",
          }}
        >
          <FaPlus style={{ marginRight: "8px" }} />
          Assign Teacher
        </button>

        {/* modal hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee  */}

        {showModal && (
          <div style={modalOverlay} onClick={() => setShowModal(false)}>
            <div style={modalContent} onClick={(e) => e.stopPropagation()}>
              {/* ❌ Close Button */}
              <div
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  color: "#fff",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
                onClick={() => setShowModal(false)}
              >
                <FaTimes />
              </div>

              {/* 🟡 Heading */}
              <div style={headingStyle}>EduMentra</div>

              <form onSubmit={handleSubmit}>
                {/* 🔽 Select Teacher */}
                <select
                  style={inputStyle}
                  value={JSON.stringify(selectedTeacher)}
                  onChange={(e) =>
                    setSelectedTeacher(JSON.parse(e.target.value))
                  }
                  required
                >
                  <option value="null">Select Teacher</option>

                  {teachers.map((t) => (
                    <option
                      key={t.id}
                      value={JSON.stringify(t)}
                      style={{ color: "black" }}
                    >
                      {t.full_name}
                    </option>
                  ))}
                </select>

                {/* 🆔 Employee ID (auto-filled) */}
                <input
                  type="text"
                  style={inputStyle1}
                  value={selectedTeacher?.employee_id || ""}
                  placeholder="Employee ID"
                  disabled
                />

                <select
                  style={inputStyle}
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                >
                  <option value="" style={{ color: "black" }} disabled>
                    Select Department
                  </option>
                  <option value="BCA" style={{ color: "black" }}>
                    BCA
                  </option>
                </select>

                {/* 🧑‍🏫 Section dropdown */}
                <select
                  style={inputStyle}
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  required
                >
                  <option value="A" style={{ color: "black" }}>
                    Section A
                  </option>
                  <option value="B" style={{ color: "black" }}>
                    Section B
                  </option>
                  <option value="C" style={{ color: "black" }}>
                    Section C
                  </option>
                  <option value="D" style={{ color: "black" }}>
                    Section D
                  </option>
                </select>

                <button type="submit" style={submitBtn}>
                  Assign Now
                </button>
              </form>
            </div>
          </div>
        )}

        {/* modal end hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee  */}
      </div>

      <hr
        style={{
          height: "1px",
          width: "100%",
          backgroundColor: "#444",
          border: "none",
        }}
      />

      {/* 👉 PDP Banner + Assign Card Row */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        {/* PDP Banner */}
        <div
          style={{
            flex: 2,
            background:
              "linear-gradient(135deg, rgba(255,192,203,0.2), rgba(173,216,230,0.2))",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            padding: "25px",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 6px rgba(255,255,255,0.05)",
          }}
        >
          <div style={{ maxWidth: "60%" }}>
            <h3
              style={{
                fontSize: "22px",
                marginBottom: "10px",
                color: "#fff",
              }}
            >
              Your PDP Journey Begins Here
            </h3>
            <p
              style={{
                fontSize: "15px",
                marginBottom: "15px",
                color: "#ccc",
              }}
            >
              Get started with career-building lectures & resources specially
              crafted by our top mentors.
            </p>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#ff7f50",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Start Learning
            </button>
          </div>
          <img
            src={studentImg}
            alt="hero"
            style={{
              width: "150px",
              height: "auto",
              borderRadius: "10px",
            }}
          />
        </div>

        {/* Assign Teacher Card */}
      </div>

      {/* 📊 Charts Section */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <div style={cardStyle}>
          <h3>📊 Student Performance</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="performance" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={cardStyle}>
          <h3>📈 Attendance</h3>
          <PieChart width={200} height={200}>
            <Pie
              data={[
                { name: "Present", value: attendancePercent },
                { name: "Remaining", value: 100 - attendancePercent },
              ]}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              <Cell fill={COLORS[0]} />
              <Cell fill={COLORS[1]} />
            </Pie>
          </PieChart>
          <p style={{ textAlign: "center", color: "#ccc" }}>
            {attendancePercent}% Attendance
          </p>
          <button style={btnStyle}>📥 Download Report</button>
        </div>
      </div>

      {/* 📝 Program Plan & Stats */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div style={cardStyle}>
          <h3>🗓 Program Plan</h3>
          {programPlan.map((item, idx) => (
            <div
              key={idx}
              style={{ padding: "10px 0", borderBottom: "1px solid #333" }}
            >
              <strong>{item.title}</strong> —{" "}
              <span style={{ color: "#999" }}>{item.time}</span>
            </div>
          ))}
        </div>

        <div style={{ ...cardStyle, width: "200px" }}>
          <h4>👥 Total Groups</h4>
          <p style={{ fontSize: "24px", color: "#3b82f6" }}>6</p>
        </div>

        <div style={{ ...cardStyle, width: "200px" }}>
          <h4>🎓 Total Students</h4>
          <p style={{ fontSize: "24px", color: "#3b82f6" }}>127</p>
        </div>

        <div style={{ ...cardStyle, width: "200px" }}>
          <h4>📚 Planned Lessons</h4>
          <p style={{ fontSize: "24px", color: "#3b82f6" }}>34</p>
        </div>

        <div style={{ flex: 1 }}>
          {!showForm && (
            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                padding: "20px",
                borderRadius: "12px",
                cursor: "pointer",
                textAlign: "center",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid #333",
                color: "#fff",
                boxShadow: "0 2px 6px rgba(255,255,255,0.05)",
                width: "100%",
                height: "100%",
              }}
              onClick={() => setShowForm(true)}
            >
              <h3 style={{ marginBottom: "10px" }}>👨‍🏫 Assign Teacher</h3>
              <p style={{ color: "#ccc", fontSize: "14px" }}>
                Click to assign section to a teacher
              </p>
            </div>
          )}
          {showForm && <AssignTeacherForm onClose={() => setShowForm(false)} />}
        </div>
      </div>
    </div>
  );
};

const cardStyle = {
  background: "rgba(255,255,255,0.05)",
  borderRadius: "12px",
  padding: "20px",
  flex: 1,
  minWidth: "250px",
  border: "1px solid #333",
  boxShadow: "0 2px 6px rgba(255,255,255,0.05)",
};

const btnStyle = {
  backgroundColor: "#3b82f6",
  border: "none",
  padding: "8px 16px",
  borderRadius: "8px",
  color: "#fff",
  marginTop: "10px",
  cursor: "pointer",
};

export default AdminDashboard;
