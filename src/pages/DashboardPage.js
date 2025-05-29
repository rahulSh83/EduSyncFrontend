// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';


// const DashboardPage = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem('user'));

//   useEffect(() => {
//     if (!user) {
//       navigate('/login');
//     }
//   }, [user, navigate]);

//   return user? (
//     <div>
//       <h2>Welcome, {user.name}</h2>
//       <p>Email: {user.email}</p>
//       <p>Role: {user.role}</p>
//     </div>
//   ) : null;
// };

// export default DashboardPage;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return user ? (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '75vh' }}>
      <div className="card p-4 shadow-sm w-100" style={{ maxWidth: '500px' }}>
        <h3 className="text-center mb-3">Welcome, <span className="text-primary">{user.name}</span></h3>
        
        <ul className="list-group">
          <li className="list-group-item"><strong>Email:</strong> {user.email}</li>
          <li className="list-group-item"><strong>Role:</strong> {user.role}</li>
        </ul>

        <div className="text-center mt-4">
          {user.role === 'Instructor' ? (
            <>
              <p className="text-muted">Go to <strong>Courses</strong> to manage assessments.</p>
            </>
          ) : (
            <p className="text-muted">Go to <strong>Courses</strong> to attempt quizzes.</p>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default DashboardPage;

// import React, { useEffect, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { getAllCourses } from '../services/courseService';

// const DashboardPage = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem('user'));
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     if (!user) {
//       navigate('/login');
//     } else {
//       fetchCourses();
//     }
//   }, [user]);

//   const fetchCourses = async () => {
//     try {
//       const all = await getAllCourses();
//       const filtered = user.role === 'Instructor'
//         ? all.filter(c => c.instructorId === user.userId)
//         : all;
//       setCourses(filtered);
//     } catch (err) {
//       console.error('Failed to load courses', err);
//     }
//   };

//   if (!user) return null;

//   return (
//     <div className="container py-5">
//       <div className="mb-4">
//         <h2>Welcome, <span className="text-primary">{user.name}</span></h2>
//         <p className="text-muted">Role: {user.role}</p>
//         {user.role === 'Instructor' && (
//           <Link to="/courses/create" className="btn btn-success mb-3">Create New Course</Link>
//         )}
//       </div>

//       <h4>Your Courses</h4>
//       {courses.length === 0 ? (
//         <p className="text-muted">No courses available.</p>
//       ) : (
//         <div className="row">
//           {courses.map(course => (
//             <div className="col-md-6 col-lg-4 mb-4" key={course.courseId}>
//               <div className="card h-100 shadow-sm">
//                 <div className="card-body d-flex flex-column">
//                   <h5 className="card-title">{course.title}</h5>
//                   <p className="card-text">{course.description}</p>
//                   <Link to={`/courses/${course.courseId}`} className="btn btn-primary mt-auto">
//                     View Course
//                   </Link>
//                   {user.role === 'Instructor' && (
//                     <Link
//                       to={`/instructor/assessments/${course.courseId}`}
//                       className="btn btn-outline-secondary mt-2"
//                     >
//                       Manage Assessments
//                     </Link>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DashboardPage;
