
import React from "react";
import { Routes, Route } from "react-router-dom";

// =====================================================
// PUBLIC PAGES
// =====================================================

import WelcomePage from "./Pages/WelcomePage";
import InfoPage from "./Pages/InfoPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";

// =====================================================
// PROTECTED PAGES
// =====================================================

import DashboardPage from "./Pages/DashboardPage";
import FeedbackPage from "./Pages/FeedbackPage";
import AddFeedbackPage from "./Pages/AddFeedbackPage";
import AnalyticsPage from "./Pages/AnalyticsPage";
import AskAIPage from "./Pages/AskAI";
import AdminPage from "./Pages/AdminPage";

// =====================================================
// COMPONENTS
// =====================================================

import ProtectedRoute from "./Components/ProtectedRoute";

// =====================================================
// APP
// =====================================================

function App() {
  return (
    <Routes>

      {/* =================================================
          PUBLIC ROUTES
      ================================================= */}

      <Route
        path="/"
        element={<WelcomePage />}
      />

      <Route
        path="/info"
        element={<InfoPage />}
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />


      {/* =================================================
          PROTECTED USER ROUTES
      ================================================= */}

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
          path="/analytics"
          element={<AnalyticsPage />}
        />

        <Route
          path="/ask-ai"
          element={<AskAIPage />}
        />

      </Route>


      {/* =================================================
          ADMIN ROUTES
      ================================================= */}

      <Route
        element={
          <ProtectedRoute
            allowedRoles={["admin"]}
          />
        }
      >

        <Route
          path="/admin"
          element={<AdminPage />}
        />

      </Route>


      {/* =================================================
          FALLBACK
      ================================================= */}

      <Route
        path="*"
        element={<WelcomePage />}
      />

    </Routes>
  );
}

export default App;

