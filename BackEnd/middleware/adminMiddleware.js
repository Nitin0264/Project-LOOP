// =====================================================
// ADMIN AUTHORIZATION MIDDLEWARE
// =====================================================

const adminMiddleware = (req, res, next) => {
  try {
    // -------------------------------------------------
    // AUTHENTICATION CHECK
    // -------------------------------------------------

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    // -------------------------------------------------
    // ADMIN ROLE CHECK
    // -------------------------------------------------

    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required.",
      });
    }

    // -------------------------------------------------
    // AUTHORIZED
    // -------------------------------------------------

    next();
  } catch (error) {
    console.error("Admin authorization error:", error);

    return res.status(500).json({
      success: false,
      message: "Authorization error.",
    });
  }
};

export default adminMiddleware;