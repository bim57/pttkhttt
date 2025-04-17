document.addEventListener("DOMContentLoaded", () => {
  const tabTK = document.getElementById("tab-tk");
  const tabRoles = document.getElementById("tab-roles");
  const tabTaiKhoan = document.getElementById("tai-khoan-tab");
  const tabPhanQuyen = document.getElementById("phan-quyen-tab");

  tabTK.onclick = () => {
    tabTaiKhoan.classList.add("active");
    tabPhanQuyen.classList.remove("active");
  };
  
  tabRoles.onclick = () => {
    tabPhanQuyen.classList.add("active");
    tabTaiKhoan.classList.remove("active");
    loadRoles();
  };

  // Load tài khoản
  const loadUsers = async () => {
    const res = await fetch("/admin/users");
    const users = await res.json();
    const tbody = document.querySelector("#userTable tbody");
    tbody.innerHTML = "";
    users.forEach(u => {
      tbody.innerHTML += `
        <tr>
          <td>${u.ID_TK}</td>
          <td>${u.TenNhanVien || ""}</td>
          <td>${u.TenNhomQuyen || ""}</td>
          <td>
            <button onclick='editUser(${JSON.stringify(u)})'>Sửa</button>
            <button onclick='deleteUser(${u.ID_TK})'>Xóa</button>
          </td>
        </tr>`;
    });
  };

  loadUsers();

  // Gửi form thêm/sửa
  const userForm = document.getElementById("userForm");
  userForm.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(userForm);
    const data = Object.fromEntries(formData.entries());

    const url = data.ID_TK ? "/admin/edit" : "/admin/add";
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    userForm.reset();
    loadUsers();
  };

  window.editUser = (u) => {
    Object.keys(u).forEach(k => {
      const field = userForm.querySelector(`[name="${k}"]`);
      if (field) field.value = u[k];
    });
  };

  window.deleteUser = async (id) => {
    if (confirm("Bạn có chắc muốn xóa?")) {
      await fetch("/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ID_TK: id }),
      });
      loadUsers();
    }
  };

  // Load nhóm quyền và quyền chi tiết
  const roleSelect = document.getElementById("roleSelect");
  const permissionList = document.getElementById("permissionList");

  const loadRoles = async () => {
    const [rolesRes, funcsRes] = await Promise.all([
      fetch("/roles"),
      fetch("/roles/permissions/1"), // load tạm nhóm 1
    ]);

    const roles = await rolesRes.json();
    const functions = await funcsRes.json();

    roleSelect.innerHTML = roles.map(role => 
      `<option value="${role.ID_NhomQuyen}">${role.TenNhomQuyen}</option>`
    ).join("");

    permissionList.innerHTML = functions.map(func => 
      `<li>
        <input type="checkbox" id="permission-${func.ID_ChucNang}" data-chucnang="${func.ID_ChucNang}" value="${func.HanhDong}">
        <label for="permission-${func.ID_ChucNang}">${func.TenChucNang}</label>
      </li>`
    ).join("");

    initRolePermissionEvents();
  };

  const initRolePermissionEvents = () => {
    const select = document.getElementById("roleSelect");
    const list = document.getElementById("permissionList");

    select.onchange = async () => {
      const id = select.value;
      const res = await fetch(`/roles/permissions/${id}`);
      const permissions = await res.json();

      const checkboxes = list.querySelectorAll("input[type=checkbox]");
      checkboxes.forEach(cb => {
        const permission = permissions.find(p => p.ChucNang === cb.dataset.chucnang && p.HanhDong === cb.value);
        cb.checked = permission ? true : false;
      });
    };

    const saveBtn = document.getElementById("savePermission");
    saveBtn.onclick = async () => {
      const id = select.value;
      const checkboxes = [...list.querySelectorAll("input[type=checkbox]")];
      const permissions = checkboxes
        .filter(cb => cb.checked)
        .map(cb => ({
          ChucNang: cb.dataset.chucnang,
          HanhDong: cb.value,
        }));

      await fetch("/roles/permissions/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ID_NhomQuyen: id, permissions }),
      });

      alert("Đã lưu phân quyền!");
    };
  };
});
