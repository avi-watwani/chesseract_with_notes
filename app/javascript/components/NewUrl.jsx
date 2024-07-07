import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NewUrl = () => {
  const navigate = useNavigate();
  const [shortUrl, setShortUrl] = useState("");
  const [longUrl, setLongUrl] = useState("");
  const [isShortUrlVisible, setIsShortUrlVisible] = useState(false); // State to manage the visibility of the short URL

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/urls/create";

    if (longUrl.length === 0) return;

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ original: longUrl }), // Use the correct variable
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        setShortUrl(`http://localhost:3000/${response.short}`);
        setIsShortUrlVisible(true); // Show the short URL after successful response
      })
      .catch((error) => console.log(error.message));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      alert("Short URL copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy the text to clipboard", err);
    });
  };

  const navigateToLongUrl = () => {
    window.location.href = shortUrl;
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Create a new Short URL
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="longUrl">Paste your URL below</label>
              <input
                type="text"
                name="longUrl"
                id="longUrl"
                className="form-control"
                required
                onChange={(event) => onChange(event, setLongUrl)}
              />
            </div>
            {isShortUrlVisible && ( // Conditionally render the short URL
              <div className="d-flex align-items-center mt-4">
                <label htmlFor="shortUrl">Short URL:</label>
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={navigateToLongUrl}
                >
                  {shortUrl}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm ml-2"
                  onClick={copyToClipboard}
                >
                  Copy
                </button>
              </div>
            )}
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
