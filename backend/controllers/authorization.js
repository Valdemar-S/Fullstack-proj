import EmployeesUsers from "../models/employeesModel.js";
import jwt from "jsonwebtoken";

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("all input is required");
    }

    const userArray = await EmployeesUsers.findOne({
      where: {
        email: email,
      },
      raw: true,
    });
    let user = userArray;

    if (user && password === user.password) {
      const token = jwt.sign({ user_id: user.id, email }, "qwertyuiop", {
        expiresIn: "2h",
      });

      user.token = token;

      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials " + user.email);
  } catch (err) {
    console.log(err);
  }
};
