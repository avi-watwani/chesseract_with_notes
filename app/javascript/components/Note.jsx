import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Note = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({ content: "" });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const encodeHtmlEntities = (str) => {
    return String(str)
      .replace(/\n/g, "<br>")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const decodeHtmlEntities = (str) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = str;
    return textarea.value.replace(/<br>/g, "\n");
  };

  useEffect(() => {
    const url = `/api/v1/show/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        setNote(response);
        setTitle(response.title);
        setContent(decodeHtmlEntities(response.content));
      })
      .catch(() => navigate("/notes"));
  }, [params.id]);

  const deleteNote = () => {
    const url = `/api/v1/destroy/${params.id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => navigate("/notes"))
      .catch((error) => console.log(error.message));
  };

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = `/api/v1/update/${params.id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    const updatedNote = {
      title,
      content: encodeHtmlEntities(content),
    };

    fetch(url, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedNote),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => navigate("/notes"))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Update a note
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                className="form-control"
                value={title}
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
              value={content}
              onChange={(event) => onChange(event, setContent)}
            />
            <button type="submit" className="btn custom-button mt-3">
              Update Note
            </button>
            <button type="button" className="btn btn-danger mt-3" onClick={deleteNote}>
              Delete Note
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

export default Note;
