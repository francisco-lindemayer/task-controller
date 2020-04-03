const Task = require("../models/Task");

module.exports = {
  async reportByUser(request, response) {
    try {
      return response.status(501).json({ route: "Report by user" });
    } catch (error) {
      return response.status(500).json({ error: "Get details by user failed" });
    }
  },

  async reportByDepartment(request, reposponse) {
    try {
      return response.status(501).json({ route: "Report by department" });
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Get details by department failed" });
    }
  }
};
