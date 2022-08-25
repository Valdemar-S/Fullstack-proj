import EmployeesUsers from "../models/employeesModel.js";

export const getAllEmployeesUsers = async (req, res) => {
  try {
    const employeesUsers = await EmployeesUsers.findAll();
    res.json(employeesUsers);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getEmployeesUsersById = async (req, res) => {
  try {
    const employeesUsers = await EmployeesUsers.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(employeesUsers[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createEmployeesUsers = async (req, res) => {
  try {
    await EmployeesUsers.create(req.body);
    res.json({
      message: "Employee Created",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateEmployeesUsers = async (req, res) => {
  try {
    await EmployeesUsers.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Employees Updated",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteEmployeesUsers = async (req, res) => {
  try {
    await EmployeesUsers.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Employee Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
