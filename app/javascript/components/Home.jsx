import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const handleLogout = async () => {
    try {
      const url = '/api/v1/sign_out';
      const token = document.querySelector('meta[name="csrf-token"]').content;
  
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        window.location.href = "/";
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
          <h1 className="display-4">The Chesseract</h1>
          <p className="lead">
            A chess website for all, learn chess from our world class tutors, play with your friends online or shop our merchs
          </p>
          <hr className="my-4" />
          {false ? (
            <button type="button" onClick={handleLogout} className="btn btn-danger">Sign out</button>
          ) : (
            <>
              <Link
                to="/register"
                className="btn btn-lg custom-button"
              >
                Register
              </Link>
              <Link to="/login" className="btn btn-link">Login</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
