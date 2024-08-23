import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ShowNote = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({ content: "" });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            {title}
          </h1>
          <p>
            {content}
          </p>
          <Link to={`/note/${note.id}/edit`} className="btn custom-button">
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowNote;
