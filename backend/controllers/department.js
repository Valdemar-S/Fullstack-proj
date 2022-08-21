import DepUsers from "../models/departmentModel.js";

export const getAllDepUsers = async (req, res) => {
  try {
    const depUsers = await DepUsers.findAll();
    res.json(depUsers);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getDepUsersById = async (req, res) => {
  try {
    const depUsers = await DepUsers.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(depUsers[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createDepUsers = async (req, res) => {
  try {
    await DepUsers.create(req.body);
    res.json({
      message: "Department User Created",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateDepUsers = async (req, res) => {
  try {
    await DepUsers.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Department User Updated",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteDepUsers = async (req, res) => {
  try {
    await DepUsers.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Depatrment User Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
