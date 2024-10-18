const db = require("../models/hoameModels.js");

const roleController = {};


// Function to get roles by userId
roleController.getUserRoles = async (userId) => {
  const query = `
    SELECT roles.role_name 
    FROM roles
    JOIN user_roles ON roles.id = user_roles.role_id
    JOIN users ON user_roles.users_id = users.id
    WHERE users.id = $1;
  `;

  const values = [userId];
  
  try {
    const result = await db.query(query, values);
    return result.rows.map(row => row.role_name); // Return list of role names
  } catch (err) {
    throw new Error('Error fetching user roles: ' + err.message);
  }
};

// Middleware to check permissions
roleController.checkPermissions = (requiredRoles) => {
  return (req, res, next) => {
    try {
      const userRoles = req.session.user ? req.session.user.roles : null;

      // If no roles found or user is not logged in
      if (!userRoles) {
        return res.status(403).json({ message: 'Access Denied: Not Authorized' });
      }

      // Check if the user has at least one of the required roles
      const hasPermission = userRoles.some(role => requiredRoles.includes(role));

      if (!hasPermission) {
        return res.status(403).json({ message: 'Access Denied: Insufficient Permissions' });
      }

      next(); // User has the correct role, proceed to next middleware or route handler
    } catch (err) {
      console.error('Error in checkPermissions middleware:', err);
      return res.status(500).json({ message: 'Server Error: Unable to check permissions' });
    }
  };
};


module.exports = roleController;