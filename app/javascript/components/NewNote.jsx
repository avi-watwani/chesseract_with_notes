import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NewNote = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const stripHtmlEntities = (str) => {
    return String(str)
      .replace(/\n/g, "<br> <br>")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/notes/create";

    if (title.length == 0 || content.length == 0)
      return;

    const body = {
      title: stripHtmlEntities(title),
      content: stripHtmlEntities(content),
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => navigate(`/note/${response.id}`))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Add a new note
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                className="form-control"
                required
                onChange={(event) => onChange(event, setTitle)}
              />
            </div>
            <label htmlFor="content">Content</label>
            <textarea
              className="form-control"
              id="content"
              name="content"
              rows="10"
              onChange={(event) => onChange(event, setContent)}
            />
            <button type="submit" className="btn custom-button mt-3">
              Create Note
            </button>
            <Link to="/notes" className="btn btn-link mt-3">
              Back to notes
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewNote;
