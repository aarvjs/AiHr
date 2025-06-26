// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PublicLayout from "./Layouts/PublicLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Career from "./pages/Career";

import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import StudentLayout from "./Layouts/StudentLayout";
import StudentMessage from "./pages/StudentMessage";



import TeacherLayout from './Layouts/TeacherLayout';
import TeacherSendMessages from './components/TeacherSendMessage';

import AdminLayout from './Layouts/AdminLayout';
import AdminStudent from './components/AdminStudent';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/career" element={<Career />} />
        </Route>

        {/* ✅ Protected Routes */}
        {/* studnet dahbaord hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee  */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute>
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentDashboard />} />
          <Route path="student-message" element={<StudentMessage />} />
          {/* <Route path="profile" element={<StudentProfile />} />
  <Route path="courses" element={<StudentCourses />} />
  <Route path="results" element={<StudentResults />} /> */}
        </Route>

        {/* teavjer dahsbaord hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee  */}
        <Route
        path="/teacher-dashboard"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <TeacherLayout />
          </ProtectedRoute>
        }
      >
        {/* ✅ Ye nested route hai, Outlet ke through dikhega */}
        <Route index element={<TeacherDashboard />} />
        <Route path="teacher-send-message" element={ <TeacherSendMessages/>}/>

      </Route>


{/* admin routh ereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee */}


  <Route
  path="/admin-dashboard"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<AdminDashboard />} />
  <Route path="admin-student" element={<AdminStudent />} /> 
</Route>
      </Routes>
    </Router>
  );
}

export default App;
