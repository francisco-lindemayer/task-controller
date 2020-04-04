const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const paginate = require("../utils/paginator");
const filtering = require("../utils/filteringQuery");

module.exports = {
  async show(request, response) {
    try {
      const users = await User.findAll({
        where: {
          ...filtering(request.query, {
            role: null,
            email: null,
            created_at: Op.between,
            updated_at: Op.between,
            started_at: Op.between,
            completed_at: Op.between,
          }),
        },
        attributes: { exclude: ["password"], ...paginate(request.query) },
      });

      response.header("X-Total-Count", users.length);

      return response.status(200).json(users);
    } catch (error) {
      return response.status(500).json({ error: "Get users list failed" });
    }
  },

  async index(request, response) {
    const { id } = request.params;

    try {
      const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
      });

      if (!user) {
        return response.status(400).json({ error: "User not found" });
      }

      response.status(200).json(user);
    } catch (error) {
      return response.status(500).json({ error: "Find user failed" });
    }
  },

  async store(request, response) {
    const { name, email, password } = request.body;

    try {
      if (await User.findOne({ where: { email } })) {
        return response.status(400).json({ error: "User already exists" });
      }

      const user = await User.create({
        name,
        email,
        password,
      });

      user.password = undefined;

      const token = generateToken({ id: user.id });

      return response.status(201).json({ user, token });
    } catch (error) {
      return response.status(500).json({ error: "Registration failed" });
    }
  },

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    try {
      if (!(await User.findByPk(id))) {
        return response.status(400).json({ error: "User not found" });
      }

      console.log(id, name);
      const user = User.update({ name }, { where: { id } });

      return response.status(204).json(user);
    } catch (error) {
      return response.status(500).json({ error: "Update user failed" });
    }
  },

  async delete(request, response) {
    const { id } = request.params;

    try {
      if (!(await User.findByPk(id))) {
        return response.status(400).json({ error: "User not found" });
      }

      await User.destroy({ where: { id } });

      return response.status(204).json({});
    } catch (error) {
      return response.status(500).json({ error: "Delete user failed" });
    }
  },

  async auth(request, response) {
    const { email, password } = request.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return response.status(400).json({ error: "User not found" });
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return response.status(400).json({ erro: "Invalid password" });
      }

      user.password = undefined;

      const token = generateToken({ id: user.id });

      response.status(201).json({ user, token });
    } catch (error) {
      return response.status(500).json({ error: "Login failed" });
    }
  },
};
