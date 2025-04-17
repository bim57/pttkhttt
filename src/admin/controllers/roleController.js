import * as RoleModel from "../models/role.model.js";

// Trang hiển thị phân quyền
export const getRolePage = async (req, res) => {
  const roles = await RoleModel.getAllRoles();
  const functions = await RoleModel.getAllFunctions();
  res.render("roleManager", { roles, functions });  // Thay permissions thành roleManager
};

// Lấy quyền chi tiết theo nhóm quyền (AJAX hoặc API)
export const getPermissions = async (req, res) => {
  const { id } = req.params;
  const permissions = await RoleModel.getPermissionsByRole(id);
  res.json(permissions);
};

// Cập nhật quyền
export const updatePermissions = async (req, res) => {
  const { ID_NhomQuyen, permissions } = req.body;

  await RoleModel.deletePermissionsByRole(ID_NhomQuyen);

  for (const { ChucNang, HanhDong } of permissions) {
    await RoleModel.addPermission(ID_NhomQuyen, ChucNang, HanhDong);
  }

  res.json({ message: "Cập nhật quyền thành công!" });
};
