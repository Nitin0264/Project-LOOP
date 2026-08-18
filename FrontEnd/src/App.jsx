import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import ProtectedRoute from "./Components/ProtectedRoute";

import WelcomePage from "./Pages/WelcomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import InfoPage from "./Pages/InfoPage";
import DashboardPage from "./Pages/Dashboard";
import FeedbackPage from "./Pages/FeedbackPage";
import AddFeedbackPage from "./Pages/AddFeedbackPage";
import EditFeedbackPage from "./Pages/EditFeedbackPage";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* =====================================================
            PUBLIC ROUTES
        ===================================================== */}

        <Route
          path="/"
          element={<WelcomePage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/info"
          element={<InfoPage />}
        />


        {/* =====================================================
            PROTECTED ROUTES
        ===================================================== */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="/feedback"
            element={<FeedbackPage />}
          />

          <Route
            path="/add-feedback"
            element={<AddFeedbackPage />}
          />

          <Route
            path="/edit-feedback/:id"
            element={<EditFeedbackPage />}
          />

        </Route>

      </Routes>
    </>
  );
}

export default App;