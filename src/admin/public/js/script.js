document.addEventListener('DOMContentLoaded', function () {
  const userModal = document.getElementById('userModal');
  const deleteModal = document.getElementById('deleteModal');
  const userForm = document.getElementById('userForm');
  const modalTitle = document.getElementById('modalTitle');
  const userIdField = document.getElementById('userId');
  const userNameField = document.getElementById('userName');
  const userEmailField = document.getElementById('userEmail'); // dùng làm mật khẩu
  const userRoleField = document.getElementById('userRole');
  const closeModalBtn = document.querySelector('.close');
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
  const cancelModalBtn = document.getElementById('cancelModalBtn');
  const addUserBtn = document.getElementById('addUserBtn');
  
  // Gán options nhóm quyền
  const roleOptions = [
  { value: 1, text: 'Admin' },
  { value: 2, text: 'Nhân viên bán hàng' },
  { value: 3, text: 'Quản lý kho' },
  { value: 4, text: 'Người quản lý doanh nghiệp' }
  ];
  roleOptions.forEach(role => {
  const option = document.createElement('option');
  option.value = role.value;
  option.textContent = role.text;
  userRoleField.appendChild(option);
  });
  
  // Mở modal thêm người dùng
  addUserBtn?.addEventListener('click', function () {
  modalTitle.textContent = 'Thêm người dùng';
  userForm.reset();
  userIdField.value = '';
  userModal.style.display = 'block';
  });
  
  closeModalBtn?.addEventListener('click', () => userModal.style.display = 'none');
  cancelModalBtn?.addEventListener('click', () => userModal.style.display = 'none');
  
  // Xử lý nút sửa người dùng
  document.querySelectorAll('.editBtn').forEach(button => {
  button.addEventListener('click', function () {
    const userId = this.dataset.id;
    fetch(`/admin/get-user/${userId}`)
      .then(res => res.json())
      .then(user => {
        modalTitle.textContent = 'Sửa người dùng';
        userIdField.value = user.ID_TK;
        userNameField.value = user.TenNhanVien;
        userEmailField.value = user.MatKhau || '';
        userRoleField.value = user.ID_NhomQuyen;
        userModal.style.display = 'block';
      });
  });
  });
  
  // Xóa người dùng
  let deleteUserId = null;
  let deleteUserRow = null;
  document.querySelectorAll('.deleteBtn').forEach(button => {
  button.addEventListener('click', function () {
    deleteUserId = this.dataset.id;
    deleteUserRow = this.closest('tr');
    deleteModal.style.display = 'block';
  });
  });
  
  confirmDeleteBtn?.addEventListener('click', () => {
  fetch(`/admin/delete-user/${deleteUserId}`, { method: 'POST' })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        deleteUserRow.classList.add('fade-out');
        setTimeout(() => deleteUserRow.remove(), 300);
      } else {
        alert('Xóa người dùng thất bại!');
      }
      deleteModal.style.display = 'none';
    });
  });
  
  cancelDeleteBtn?.addEventListener('click', () => deleteModal.style.display = 'none');
  
  // Gửi form thêm/sửa người dùng
  userForm?.addEventListener('submit', function (e) {
  e.preventDefault();
  const userId = userIdField.value;
  const isEdit = !!userId;
  const payload = {
    ID_NhanVien: userNameField.value,
    MatKhau: userEmailField.value,
    ID_NhomQuyen: userRoleField.value
  };
  
  const url = isEdit ? `/admin/edit-user/${userId}` : '/admin/add-user';
  
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        if (!isEdit) {
          const tableBody = document.getElementById('userTableBody');
          const newRow = document.createElement('tr');
          newRow.innerHTML = `
            <td>${data.newUser.ID_TK}</td>
            <td>${data.newUser.TenNhanVien}</td>
            <td>${data.newUser.TenQuyen}</td>
            <td>
              <button class="editBtn" data-id="${data.newUser.ID_TK}">Sửa</button>
              <button class="deleteBtn" data-id="${data.newUser.ID_TK}">Xóa</button>
            </td>`;
          tableBody.appendChild(newRow);
        } else {
          location.reload(); // reload cho đơn giản
        }
        userModal.style.display = 'none';
      } else {
        alert('Thêm/Sửa người dùng thất bại!');
      }
    });
  });
  
  const addRoleBtn = document.getElementById('addRoleBtn');
  const addRoleModal = document.getElementById('addRoleModal');
  const cancelAddRoleBtn = document.getElementById('cancelAddRoleBtn');
  const submitAddRoleBtn = document.getElementById('submitAddRoleBtn');
  const confirmDeleteRoleBtn = document.getElementById('confirmDeleteRoleBtn');
  const cancelDeleteRoleBtn = document.getElementById('cancelDeleteRoleBtn');
  
  // Mở modal thêm quyền
  addRoleBtn?.addEventListener('click', async () => {
  // Hiển thị modal thêm vai trò
  addRoleModal.style.display = 'block';
  
  try {
  // Gọi API để lấy danh sách chức năng
  const res = await fetch('/admin/roles/functions');
  
  if (!res.ok) {
    throw new Error('Không thể lấy dữ liệu chức năng');
  }
  
  const functions = await res.json();
  const tableBody = document.getElementById('permissionTableBody');
  
  // Làm sạch nội dung bảng trước khi thêm mới
  tableBody.innerHTML = '';
  
  // Tạo hàng cho mỗi chức năng
  functions.forEach(func => {
    const row = document.createElement('tr');
  
    row.innerHTML = `
      <td>${func.TenChucNang}</td>
      <td><input type="checkbox" data-func="${func.MaChucNang}" value="xem" /></td>
      <td><input type="checkbox" data-func="${func.MaChucNang}" value="tao" /></td>
      <td><input type="checkbox" data-func="${func.MaChucNang}" value="capnhat" /></td>
      <td><input type="checkbox" data-func="${func.MaChucNang}" value="xoa" /></td>
    `;
  
    tableBody.appendChild(row);
  });
  } catch (error) {
  console.error('Lỗi khi tải chức năng:', error);
  }
  });
  
  
  // Đóng modal khi nhấn Cancel
  cancelAddRoleBtn?.addEventListener('click', () => {
  addRoleModal.style.display = 'none';
  });
  
  // Thêm nhóm quyền mới
  submitAddRoleBtn?.addEventListener('click', () => {
  const roleName = document.getElementById('newRoleName').value.trim();
  if (!roleName) return alert('Vui lòng nhập tên nhóm quyền');
  const permissions = [];
    document.querySelectorAll('#permissionTableBody input[type=checkbox]:checked').forEach(cb => {
    permissions.push({ ChucNang: cb.dataset.func, HanhDong: cb.value });
  });
  if (permissions.length === 0) return alert('Vui lòng chọn ít nhất một quyền');
  
  fetch('/admin/roles/add-full', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ TenNhomQuyen: roleName, permissions })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      addRoleModal.style.display = 'none';
      location.reload();
    });
  });
  
  // Xóa nhóm quyền
  let deleteRoleId = null;
  let deleteRoleRow = null;

  document.querySelectorAll('.deleteRoleBtn').forEach(button => {
    button.addEventListener('click', function () {
      deleteRoleId = this.dataset.id;
      deleteRoleRow = this.closest('tr');
      document.getElementById('deleteRoleModal').style.display = 'block';
    });
  });

  // Xử lý xác nhận xóa nhóm quyền
  confirmDeleteRoleBtn?.addEventListener('click', () => {
    fetch(`/admin/delete-role/${deleteRoleId}`, { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          deleteRoleRow.classList.add('fade-out');
          setTimeout(() => deleteRoleRow.remove(), 300);
        } else {
          alert('Xóa nhóm quyền thất bại!');
        }
        deleteModal.style.display = 'none';
      });
  });

  // Xử lý hủy bỏ xóa nhóm quyền
  cancelDeleteRoleBtn?.addEventListener('click', () => deleteModal.style.display = 'none');

  // Mở modal sửa nhóm quyền
  document.querySelectorAll('.editRoleBtn').forEach(button => {
  button.addEventListener('click', async function () {
    const roleId = this.dataset.id;
    const roleName = this.dataset.name;
    addRoleModal.style.display = 'block';
    document.getElementById('newRoleName').value = roleName;
  
    const res = await fetch(`/admin/roles/functions/${roleId}`);
    const functions = await res.json();
    const tableBody = document.getElementById('permissionTableBody');
    tableBody.innerHTML = functions.map(func => `
      <tr>
        <td>${func.TenChucNang}</td>
        <td><input type="checkbox" data-func="${func.MaChucNang}" value="xem" ${func.Quyen.includes('xem') ? 'checked' : ''} /></td>
        <td><input type="checkbox" data-func="${func.MaChucNang}" value="tao" ${func.Quyen.includes('tao') ? 'checked' : ''} /></td>
        <td><input type="checkbox" data-func="${func.MaChucNang}" value="capnhat" ${func.Quyen.includes('capnhat') ? 'checked' : ''} /></td>
        <td><input type="checkbox" data-func="${func.MaChucNang}" value="xoa" ${func.Quyen.includes('xoa') ? 'checked' : ''} /></td>
      </tr>
    `).join('');
  });
  });
  
  });
  
  const addRoleBtn = document.getElementById('addRoleBtn');
  const addRoleModal = document.getElementById('addRoleModal');
  const closeAddRoleModal = document.getElementById('closeAddRoleModal');
  const cancelAddRoleBtn = document.getElementById('cancelAddRoleBtn');
  
  addRoleBtn?.addEventListener('click', async () => {
    addRoleModal.style.display = 'block';
  
    try {
      const res = await fetch('/admin/roles/functions');
      const functions = await res.json();
      const tableBody = document.getElementById('permissionTableBody');
      tableBody.innerHTML = '';
  
      functions.forEach(func => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${func.TenChucNang}</td>
          <td><input type="checkbox" data-func="${func.MaChucNang}" value="xem" /></td>
          <td><input type="checkbox" data-func="${func.MaChucNang}" value="tao" /></td>
          <td><input type="checkbox" data-func="${func.MaChucNang}" value="capnhat" /></td>
          <td><input type="checkbox" data-func="${func.MaChucNang}" value="xoa" /></td>
        `;
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error('Lỗi khi lấy danh sách chức năng:', error);
    }
  });
  
  closeAddRoleModal?.addEventListener('click', () => {
    addRoleModal.style.display = 'none';
  });
  
  cancelAddRoleBtn?.addEventListener('click', () => {
    addRoleModal.style.display = 'none';
  });
  
  // Tùy chọn: đóng modal khi nhấn ra ngoài nội dung
  window.addEventListener('click', (event) => {
    if (event.target === addRoleModal) {
      addRoleModal.style.display = 'none';
    }
  });