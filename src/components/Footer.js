import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light text-center text-muted py-3 border-top mt-auto">
      <small>© {new Date().getFullYear()} EduSync LMS by Rahul | All rights reserved.</small>
    </footer>
  );
};

export default Footer;
