import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const EditCoursePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', description: '', mediaUrl: '' });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`${API_URL}/CourseModels/${courseId}`);
        setFormData({
          title: res.data.title,
          description: res.data.description,
          mediaUrl: res.data.mediaUrl
        });
      } catch (err) {
        console.error("Failed to fetch course:", err);
      }
    };
    fetchCourse();
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/CourseModels/${courseId}`, {
        courseId,
        instructorId: user.userId,
        ...formData,
      });
      alert("Course updated!");
      navigate('/course');
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update course.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Course</h2>
      <form onSubmit={handleSubmit}>
        Course Title
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Course Title"
          required
          className="form-control mb-2"
        />
        Course Description
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Course Description"
          required
          className="form-control mb-2"
        />
        Media URL
        <textarea
          name="mediaUrl"
          value={formData.mediaUrl}
          onChange={handleChange}
          placeholder="MediaUrl"
          required
          className="form-control mb-2"
        />
        <button className="btn btn-primary" type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditCoursePage;
