import Role from "../models/Role.js";
import asyncHandler from "express-async-handler";
import createSlug from "../utils/createSlug.js";

/**
 * @Desc Get All Role
 * @Route /api/v1/permission
 * @METHOD GET
 * @Access private
 */
export const getAllRole = asyncHandler(async (req, res) => {
  // get all permission data
  const role = await Role.find();

  // send a message with all role data
  res.status(200).json(role);
});

/**
 * @Desc Get Single role
 * @Route /api/v1/role/:id
 * @METHOD GET
 * @Access private
 */
export const getSingleRole = asyncHandler(async (req, res) => {
  // get single role data
  const role = await Role.findById(req.params.id);

  // check role
  if (!role) return res.status(404).json({ message: "Role not found!" });

  // send a message with role data
  res.status(200).json({
    role,
  });
});

/**
 * @Desc create new role
 * @Route /api/v1/role
 * @METHOD POST
 * @Access private
 */
export const createRole = asyncHandler(async (req, res) => {
  const { name, permissions } = req.body;

  // validation
  if (!name) return res.status(400).json({ message: "Role name is required!" });

  // check role name exist or not
  const roleName = await Role.findOne({ name });
  if (roleName) {
    return res.status(400).json({ message: "Role name is already exist" });
  }

  console.log(name);
  // create new role
  const role = await Role.create({
    name: name,
    slug: createSlug(name),
    permissions: permissions,
  });

  // send a message with new role details
  res.status(201).json({
    message: "Role created successfully",
    role,
  });
});

/**
 * @Desc update role
 * @Route /api/v1/role/:id
 * @METHOD PUT/PATCH
 * @Access private
 */
export const updateRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, permissions } = req.body;

  console.log(id);

  if (!name) {
    return res.status(400).json({ message: "Name Required!" });
  }

  const updatedRole = await Role.findByIdAndUpdate(
    id,
    {
      name,
      slug: createSlug(name),
      permissions,
    },
    { new: true }
  );

  // send a message with permission details
  res.status(200).json({
    message: "Permission updated successfully",
    role: updatedRole,
  });
});

/**
 * @Desc update role status
 * @Route /api/v1/role/:id
 * @METHOD PUT/PATCH
 * @Access private
 */
export const updateRoleStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const updatedRole = await Role.findByIdAndUpdate(
    id,
    {
      status: !status,
    },
    { new: true }
  );

  // send a message with permission details
  res.status(200).json({
    message: "Permission status updated",
    role: updatedRole,
  });
});

/**
 * @Desc delete role
 * @Route /api/v1/role/:id
 * @METHOD DELETE
 * @Access private
 */
export const deleteRole = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedRole = await Role.findByIdAndDelete(id);

  if (!deletedRole) return res.status(400).json({ message: "Role not found!" });

  // send a message with Role details
  res.status(200).json({
    message: "Role deleted successfully",
    role: deletedRole,
  });
});
