import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CoursePage from './pages/CoursePage';
// import Navbar from './components/Navbar';
import CreateCoursePage from './pages/CreateCoursePage';
import CreateAssessmentPage from './pages/CreateAssessmentPage';
// import InstructorAssessmentsPage from './pages/InstructorAssessmentsPage';
import SubmitResultPage from './pages/SubmitResultPage';
import CourseDetailPage from './pages/CourseDetailPage';
import AttemptAssessmentPage from './pages/AttemptAssessmentPage';
import ReviewResultsPage from './pages/ReviewResultsPage';
import EditCoursePage from './pages/EditCoursePage';
import EditAssessmentPage from './pages/EditAssessmentPage';
import ViewAssessmentPage from './pages/ViewAssessmentPage';
// import ForgotPasswordPage from './pages/ForgotPasswordPage';
import StudentDashboard from './pages/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import AssessmentsPage from './pages/AssessmentsPage';
import ResultPage from './pages/ResultPage';
import InstructorResultPage from './pages/InstructorResultPage';

function App() {
  return (
    <>
    <Router>
    <div className="d-flex flex-column min-vh-100">
    <Header />
      <div className="container mt-4 mb-5">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/course" element={<CoursePage />} />
        <Route path="/course/create" element={<CreateCoursePage />} />
        <Route path="/assessments/create" element={<CreateAssessmentPage />} />
        {/* <Route path="/instructor/assessments/:courseId" element={<InstructorAssessmentsPage />} /> */}
        {/* <Route path="/assessments" elements={<InstructorAssessmentsPage />} /> */}
        <Route path="/assessments" element={<AssessmentsPage />} />
        <Route path="/submit-result" element={<SubmitResultPage />} />
        <Route path="/course/:courseId" element={<CourseDetailPage />} />
        <Route path="/course/edit/:courseId" element={<EditCoursePage />} />
        <Route path="/assessments/edit/:assessmentId" element={<EditAssessmentPage />} />
        <Route path="/assessments/view/:assessmentId" element={<ViewAssessmentPage />} />
        <Route path="/assessments/attempt/:assessmentId" element={<AttemptAssessmentPage />} />
        <Route path="/results/review/:assessmentId" element={<ReviewResultsPage />} />
        // <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/instructor-result" element={<InstructorResultPage />} />

      </Routes>
      </div>
    <Footer />
    </div>
    </Router>
    </>
  );
}

export default App;
