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
import VedioRoom from '../src/ClassRoomVedio/VideoRoom';


import TeacherLayout from './Layouts/TeacherLayout';
import TeacherSendMessages from './components/TeacherSendMessage';
import TeacherAllStudent from './child_components/TeacherAllStudent';

import AdminLayout from './Layouts/AdminLayout';
import AdminStudent from './components/AdminStudent';
import AdminSendMessages from './child_components/AdminSendMessages';


import PersonaAi from './pages/PersonaAi';
import AtsScore from './pages/AtsScore';
import Modal from 'react-modal';
import TeacherPersona from './pages/PersonaAi';
import StudentQRScanner from './child_components/StudentQRScanner';
import ResumeGenerato from './pages/ResumeGenerato';

Modal.setAppElement('#root');


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/career" element={<Career />} />
          <Route path="/student-qr-scanner" element={<StudentQRScanner />} />
        </Route>

       
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
          <Route path="persona-ai" element={<PersonaAi/>}/>
          <Route path="ats-score" element={<AtsScore/> } />
         <Route path="room/:roomId" element={<VedioRoom />} />
         <Route path="resume-generato" element={<ResumeGenerato/>}/>
         {/* <Route path="student-qr-scanner" element={<StudentQRScanner/>}/> */}

        </Route>

        {/* teaachere dahsbaord hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee  */}
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
        <Route path="room/:roomId" element={<VedioRoom />} />
        <Route path="teacher-all-student" element={<TeacherAllStudent/>}/>
        <Route path="persona-ai" element={<TeacherPersona/>}/>

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
  <Route path="admin-send-messages" element={<AdminSendMessages/>}/>
</Route>
      </Routes>
    </Router>
  );
}

export default App;
