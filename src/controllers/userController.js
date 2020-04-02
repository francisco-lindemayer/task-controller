const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

module.exports = {
  async store(request, response) {
    const { name, email, password } = request.body;

    try {
      if (await User.findOne({ where: { email } })) {
        return response.status(400).send({ error: "User already exists" });
      }

      const user = await User.create({
        name,
        email,
        password
      });

      user.password = undefined;

      const token = generateToken({ id: user.id });

      return response.json({ user, token });
    } catch (error) {
      return response.status(400).send({ error: "Registration failed" });
    }
  },

  async getAll(request, response) {
    try {
      const users = await User.findAll({});

      return response.json(users);
    } catch (error) {
      return response.status(400).send({ error: "Get users list failed" });
    }
  },

  async auth(request, response) {
    const { email, password } = request.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return response.status(400).send({ error: "User not found" });
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return response.status(400).send({ erro: "Invalid password" });
      }

      user.password = undefined;

      const token = generateToken({ id: user.id });

      response.send({ user, token });
    } catch (error) {
      return response.status(400).send({ error: "Login failed" });
    }
  }
};
