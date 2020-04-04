const Task = require("../models/Task");
const filtering = require("../utils/filteringQuery");

module.exports = {
  async reportByUser(request, response) {
    try {
      let filteredQueryParams = filtering(request.query, [
        "user_id",
        "department_id",
        "status",
      ]);

      console.log(filteredQueryParams);
      /*
      console.log("Passando", request.query);
      filteringQueryParams.splitParams(request.query, [
        { name: "name", operator: "" },
        { name: "email", operation: "" },
      ]);
      */

      return response.status(501).json();
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
  },
};
