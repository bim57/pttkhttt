import * as RoleModel from "../models/role.model.js";

// API: Lấy quyền chi tiết theo nhóm quyền
export const getPermissions = async (req, res) => {
  const { id } = req.params;
  const permissions = await RoleModel.getPermissionsByRole(id);
  res.json(permissions);
};

// API: Cập nhật quyền cho nhóm
export const updatePermissions = async (req, res) => {
  const { ID_NhomQuyen, permissions } = req.body;

  await RoleModel.deletePermissionsByRole(ID_NhomQuyen);

  for (const { ChucNang, HanhDong } of permissions) {
    await RoleModel.addPermission(ID_NhomQuyen, ChucNang, HanhDong);
  }

  res.json({ message: "Cập nhật quyền thành công!" });
};
