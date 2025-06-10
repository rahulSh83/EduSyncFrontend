// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem('user'));

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   return (
//     <nav style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
//       <Link to="/">Home</Link>{" | "}
//       {user ? (
//         <>
//           <Link to="/dashboard">Dashboard</Link>{" | "}
//           <Link to="/courses">Courses</Link>{" | "}
//           {user.role === 'Instructor' && (
//             <>
//             <Link to="/create-course">Create Course</Link>{" | "}
//             </>
//           )}

//           {user.role === 'Instructor' && (
//             <>
//             <Link to="/create-course">Create Course</Link>{" | "}
//             <Link to="/create-assessment">Create Assessment</Link>{" | "}
//             </>
//           )}

//           {user.role === 'Student' && (
//             <Link to="/submit-result">Submit Result</Link>
//           )}

//           <button onClick={handleLogout} style={{ color: 'red', marginLeft: '10px' }}>
//             Logout
//           </button>
//         </>
//       ) : (
//         <>
//           <Link to="/login">Login</Link>{" | "}
//           <Link to="/register">Register</Link>
//         </>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
