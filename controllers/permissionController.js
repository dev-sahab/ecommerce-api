import Permission from "../models/Permission.js";
import asyncHandler from "express-async-handler";
import createSlug from "../utils/createSlug.js";

/**
 * @Desc Get All Permissions
 * @Route /api/v1/permission
 * @METHOD GET
 * @Access private
 */
export const getAllPermissions = asyncHandler(async (req, res) => {
  // get all permission data
  const permission = await Permission.find();

  // send a message with all permission data
  res.status(200).json(permission);
});

/**
 * @Desc Get Single permission
 * @Route /api/v1/permission/:id
 * @METHOD GET
 * @Access private
 */
export const getSinglePermission = asyncHandler(async (req, res) => {
  // get single permission data
  const permission = await Permission.findById(req.params.id);

  // check permission
  if (!permission)
    return res.status(404).json({ message: "Permission not found!" });

  // send a message with permission data
  res.status(200).json({
    permission,
  });
});

/**
 * @Desc create new permission
 * @Route /api/v1/permission
 * @METHOD POST
 * @Access private
 */
export const createPermission = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // validation
  if (!name)
    return res.status(400).json({ message: "Permission name is required!" });

  // check permission name exist or not
  const permissionName = await Permission.findOne({ name });
  if (permissionName)
    return res.status(400).json({ message: "Permission name already exist" });

  // create new permission
  const permission = await Permission.create({
    name: name,
    slug: createSlug(name),
  });

  // send a message with new permission details
  res.status(201).json({
    message: "Permission created successfully",
    permission,
  });
});

/**
 * @Desc update permission
 * @Route /api/v1/permission/:id
 * @METHOD PUT/PATCH
 * @Access private
 */
export const updatePermission = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const updatedPermission = await Permission.findByIdAndUpdate(
    id,
    {
      name,
      slug: createSlug(name),
    },
    { new: true }
  );

  // send a message with permission details
  res.status(200).json({
    message: "Permission updated successfully",
    permission: updatedPermission,
  });
});

/**
 * @Desc delete permission
 * @Route /api/v1/permission/:id
 * @METHOD DELETE
 * @Access private
 */
export const deletePermission = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedPermission = await Permission.findByIdAndDelete(id);

  if (!deletedPermission)
    return res.status(400).json({ message: "Permission not found!" });

  // send a message with permission details
  res.status(200).json({
    message: "Permission deleted successfully",
    permission: deletedPermission,
  });
});

/**
 * @Desc update permission status
 * @Route /api/v1/permission/status/:id
 * @METHOD PATCH
 * @Access private
 */
export const updatePermissionStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const permission = await Permission.findByIdAndUpdate(
    id,
    {
      status: !status,
    },
    { new: true }
  );

  // send a message with permission details
  res.status(200).json({
    message: "Permission status updated",
    permission,
  });
});
