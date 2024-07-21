import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Notes from "../components/Notes";
import Note from "../components/Note";
import NewNote from "../components/NewNote";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import NewUrl from "../components/NewUrl";
import AnalysisBoard from "../components/AnalysisBoard/AnalysisBoard";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/notes" element={<Notes />} />
      <Route path="/note/:id" element={<Note />} />
      <Route path="/note" element={<NewNote />} />

      <Route path="/register" element={<SignUp />} />
      <Route path="/login" element={<Login />} />

      <Route path="/url-shortner" element={<NewUrl />} />

      <Route path="/analysis" element={<AnalysisBoard />} />
    </Routes>
  </Router>
);
