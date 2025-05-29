import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_BASE_URL;

const CreateCoursePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [error, setError] = useState("");

  if (!user || user.role !== "Instructor") {
    navigate("/login"); // prevent access for non-instructors
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const payload = {
    //   title,
    //   description,
    //   instructorId: user.userId,
    //   mediaUrl
    // };

    // console.log("Payload:", payload);

    if (!title.trim() || !description.trim() || !mediaUrl.trim()) {
      setError("All fields are required");
      return;
    }

    try {
      await axios.post(`${API_URL}/CourseModels`, {
        title,
        description,
        instructorId: user.userId,
        mediaUrl,
      });

      navigate("/course");
    } catch (err) {
      console.error("Course creation failed:", err);
      setError("Failed to create course");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "75vh" }}
    >
      <div className="card p-4 shadow-sm w-100" style={{ maxWidth: "500px" }}>
        <h3 className="text-center mb-4">Create New Course</h3>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Course Title
            </label>
            <input
              type="text"
              id="title"
              className="form-control"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Course Description
            </label>
            <textarea
              id="description"
              className="form-control"
              rows="4"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="mediaUrl" className="form-label">
              Media URL
            </label>
            <input
              type="url"
              className="form-control"
              id="mediaUrl"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              placeholder="https://example.com/video.mp4"
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCoursePage;
