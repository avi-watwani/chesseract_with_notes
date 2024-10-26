import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Notes from "../components/Notes";
import NewNote from "../components/NewNote";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import NewUrl from "../components/NewUrl";
import EditNote from "../components/EditNote";
import ShowNote from "../components/ShowNote";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/note" element={<NewNote />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/note/:id" element={<ShowNote />} />
      <Route path="/note/:id/edit" element={<EditNote />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/analysis-board" element={<AnalysisBoard/>} />

      <Route path="/url-shortner" element={<NewUrl />} />
    </Routes>
  </Router>
);
