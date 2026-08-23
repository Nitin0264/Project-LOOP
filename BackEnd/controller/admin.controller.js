import { User } from "../model/user.js";

// =====================================================
// GET ADMIN DASHBOARD STATS
// =====================================================

const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const adminUsers = await User.countDocuments({
      role: "admin",
    });

    const managerUsers = await User.countDocuments({
      role: "manager",
    });

    const memberUsers = await User.countDocuments({
      role: "member",
    });

    return res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        adminUsers,
        managerUsers,
        memberUsers,
      },
    });
  } catch (error) {
    console.error("Admin stats error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load admin statistics.",
    });
  }
};

// =====================================================
// GET ALL USERS
// =====================================================

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Get users error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load users.",
    });
  }
};

// =====================================================
// UPDATE USER ROLE
// =====================================================

const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // -------------------------------------------------
    // VALIDATE ROLE
    // -------------------------------------------------

    const allowedRoles = [
      "admin",
      "manager",
      "member",
    ];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user role.",
      });
    }

    // -------------------------------------------------
    // FIND USER
    // -------------------------------------------------

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // -------------------------------------------------
    // UPDATE ROLE
    // -------------------------------------------------

    user.role = role;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User role updated successfully.",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Update user role error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update user role.",
    });
  }
};

// =====================================================
// DELETE USER
// =====================================================

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // -------------------------------------------------
    // PREVENT ADMIN FROM DELETING THEMSELVES
    // -------------------------------------------------

    if (req.user?.id === id || req.user?._id === id) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own admin account.",
      });
    }

    // -------------------------------------------------
    // FIND USER
    // -------------------------------------------------

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // -------------------------------------------------
    // DELETE
    // -------------------------------------------------

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.error("Delete user error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete user.",
    });
  }
};

export {
  getAdminStats,
  getAllUsers,
  updateUserRole,
  deleteUser,
};