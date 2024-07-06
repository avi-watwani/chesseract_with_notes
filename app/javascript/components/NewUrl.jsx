import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NewUrl = () => {
  const navigate = useNavigate();
  const [shortUrl, setShortUrl] = useState("");
  const [longUrl, setLongUrl] = useState("");

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/urls/create";

    if (longUrl.length == 0)
      return;

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url}),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setShortUrl(response.short))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Create a new short url
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="longUrl">Paste your url below</label>
              <input
                type="text"
                name="longUrl"
                id="longUrl"
                className="form-control"
                required
                onChange={(event) => onChange(event, setLongUrl)}
              />
            </div>
            <div>
              <label htmlFor="shortUrl">Short URL</label>
              <p>{shortUrl}</p>
            </div>
            <button type="submit" className="btn custom-button mt-3">
              Generate Short URL
            </button>
            <Link to="/" className="btn btn-link mt-3">
              Home
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewUrl;
