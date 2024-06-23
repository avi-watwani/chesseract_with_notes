import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Note = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({ content: "" });

  useEffect(() => {
    const url = `/api/v1/show/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setNote(response))
      .catch(() => navigate("/notes"));
  }, [params.id]);

  const addHtmlEntities = (str) => {
    return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  };

  const noteContent = addHtmlEntities(note.content);
  
  return (
    <div className="">
      <div className="row">
        <div className="">
          <h5 className="">Your note content</h5>
          <div
            dangerouslySetInnerHTML={{
              __html: `${noteContent}`,
            }}
          />
        </div>
        <div className="">
          <button
            type="button"
            className="btn btn-danger"
          >
            Delete Note
          </button>
        </div>
      </div>
      <Link to="/notes" className="btn btn-link">
        Back to notes
      </Link>
    </div>
  );
};

export default Note;
