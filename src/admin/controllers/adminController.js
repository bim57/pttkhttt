import * as RoleModel from "../models/role.model.js";

// Trang quản lý admin (Trang chính)
export const getAdminPage = async (req, res) => {
  try {
    res.render("admin", {  // Render trang admin.hbs
      title: "Quản lý Book Store",  // Tiêu đề của trang
    });
  } catch (error) {
    console.error("Lỗi khi lấy trang admin:", error);
    res.status(500).send("Có lỗi xảy ra trong quá trình tải trang quản lý");
  }
};

// Trang hiển thị phân quyền
export const getRolePage = async (req, res) => {
  try {
    const roles = await RoleModel.getAllRoles();  // Lấy tất cả vai trò
    const functions = await RoleModel.getAllFunctions();  // Lấy tất cả chức năng
    
    res.render("roleManager", {
      title: "Quản lý phân quyền",
      roles,       // Dữ liệu về các vai trò
      functions,   // Dữ liệu về các chức năng
    });
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu phân quyền:", error);
    res.status(500).send("Có lỗi xảy ra trong quá trình lấy dữ liệu");
  }
};

// Lấy quyền chi tiết theo nhóm quyền (AJAX hoặc API)
export const getPermissions = async (req, res) => {
  const { id } = req.params;
  const permissions = await RoleModel.getPermissionsByRole(id);  // Lấy quyền theo nhóm quyền

  // Trả về kết quả dưới dạng JSON
  res.json(permissions);
};

// Cập nhật quyền
export const updatePermissions = async (req, res) => {
  const { ID_NhomQuyen, permissions } = req.body;

  try {
    // Xóa quyền cũ trước khi cập nhật quyền mới
    await RoleModel.deletePermissionsByRole(ID_NhomQuyen);

    // Thêm quyền mới vào
    for (const { ChucNang, HanhDong } of permissions) {
      await RoleModel.addPermission(ID_NhomQuyen, ChucNang, HanhDong);
    }

    // Trả về thông báo thành công
    res.json({ message: "Cập nhật quyền thành công!" });
  } catch (error) {
    console.error("Lỗi khi cập nhật quyền:", error);
    res.status(500).json({ message: "Có lỗi xảy ra trong quá trình cập nhật quyền" });
  }
};
