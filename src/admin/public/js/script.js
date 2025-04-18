document.addEventListener('DOMContentLoaded', function () {
  const addUserBtn = document.getElementById('addUserBtn');
  const userModal = document.getElementById('userModal');
  const deleteModal = document.getElementById('deleteModal');
  const userForm = document.getElementById('userForm');
  const modalTitle = document.getElementById('modalTitle');
  const userIdField = document.getElementById('userId');
  const userNameField = document.getElementById('userName');
  const userEmailField = document.getElementById('userEmail');
  const userRoleField = document.getElementById('userRole');
  const closeModalBtn = document.querySelector('.close');
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
  //let deleteUserId = null;

  // Hiển thị modal Thêm người dùng
  addUserBtn.addEventListener('click', function () {
    modalTitle.textContent = 'Thêm người dùng';
    userForm.reset();  // Đặt lại form
    userIdField.value = '';  // Xóa ID cũ
    userModal.style.display = 'block';  // Hiển thị modal
  });

  // Đóng modal khi nhấn nút đóng
  closeModalBtn.addEventListener('click', function () {
    userModal.style.display = 'none';
  });

  // Xử lý sửa người dùng
  document.querySelectorAll('.editBtn').forEach(button => {
    button.addEventListener('click', function () {
      const userId = this.dataset.id;
      fetch(`/admin/get-user/${userId}`)
        .then(response => response.json())
        .then(user => {
          modalTitle.textContent = 'Sửa người dùng';
          userIdField.value = user.ID_TK;
          userNameField.value = user.Name;
          userEmailField.value = user.Email;
          userRoleField.value = user.Role;  // Giả sử trả về role ID
          userModal.style.display = 'block';  // Hiển thị modal
        })
        .catch(error => console.error(error));
    });
  });

  // Xử lý xóa người dùng sử dụng modal xác nhận đẹp
  let deleteUserId = null;
  let deleteUserRow = null;

  document.querySelectorAll('.deleteBtn').forEach(button => {
    button.addEventListener('click', function () {
      deleteUserId = this.dataset.id;                  // Lưu ID người dùng cần xóa
      deleteUserRow = this.closest('tr');              // Lưu dòng bảng tương ứng
      deleteModal.style.display = 'block';             // Hiện modal xác nhận
    });
  });

  // Xác nhận xóa người dùng
  confirmDeleteBtn.addEventListener('click', function () {
    fetch(`/admin/delete-user/${deleteUserId}`, { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          deleteUserRow.classList.add('fade-out');
          setTimeout(() => deleteUserRow.remove(), 300); // Xóa dòng bảng sau khi mờ dần
        } else {
          alert('Xóa người dùng thất bại!');
        }
      })
      .catch(error => console.error(error));

    deleteModal.style.display = 'none';
  });

  // Hủy bỏ xóa người dùng
  cancelDeleteBtn.addEventListener('click', function () {
    deleteModal.style.display = 'none';
  });


  // Xử lý form thêm/sửa người dùng
  userForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const userId = userIdField.value;
    const userName = userNameField.value;
    const userEmail = userEmailField.value;
    const userRole = userRoleField.value;

    const url = userId ? `/admin/edit-user/${userId}` : '/admin/add-user';
    const method = userId ? 'POST' : 'POST';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: userName, email: userEmail, role: userRole }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          window.location.reload();  // Tải lại trang sau khi thêm/sửa
        } else {
          alert('Thêm/Sửa người dùng thất bại!');
        }
      })
      .catch(error => console.error(error));

    userModal.style.display = 'none';  // Đóng modal sau khi gửi form
  });
});
const cancelModalBtn = document.getElementById('cancelModalBtn');
cancelModalBtn.addEventListener('click', function () {
  userModal.style.display = 'none';
});

// Quản lý nhóm quyền
/*document.getElementById('addRoleBtn').addEventListener('click', () => {
  const tenNhom = prompt('Nhập tên nhóm quyền mới:');
  if (tenNhom) {
    fetch('/admin/roles/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ TenNhomQuyen: tenNhom })
    }).then(res => res.json()).then(data => {
      alert(data.message);
      location.reload();
    });
  }
});
*/
document.getElementById('editRoleBtn').addEventListener('click', () => {
  const selected = document.querySelector('input[name="roleRadio"]:checked');
  if (!selected) return alert('Vui lòng chọn nhóm quyền để sửa');
  const tenMoi = prompt('Nhập tên mới:');
  if (tenMoi) {
    fetch(`/admin/roles/edit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ID_NhomQuyen: selected.value, TenNhomQuyen: tenMoi })
    }).then(res => res.json()).then(data => {
      alert(data.message);
      location.reload();
    });
  }
});

document.getElementById('deleteRoleBtn').addEventListener('click', () => {
  const selected = document.querySelector('input[name="roleRadio"]:checked');
  if (!selected) return alert('Chọn nhóm quyền để xóa');
  if (confirm('Bạn có chắc chắn muốn xóa nhóm quyền này không?')) {
    fetch(`/admin/roles/delete/${selected.value}`, { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        location.reload();
      });
  }
});


document.getElementById('addRoleBtn').addEventListener('click', async () => {
  document.getElementById('addRoleModal').style.display = 'block';

  // Gọi API lấy danh sách chức năng
  const res = await fetch('/admin/roles/functions');
  const functions = await res.json();

  const tableBody = document.getElementById('permissionTableBody');
  tableBody.innerHTML = functions.map(func => `
    <tr>
      <td>${func.TenChucNang}</td>
      <td><input type="checkbox" data-func="${func.MaChucNang}" value="xem" /></td>
      <td><input type="checkbox" data-func="${func.MaChucNang}" value="tao" /></td>
      <td><input type="checkbox" data-func="${func.MaChucNang}" value="capnhat" /></td>
      <td><input type="checkbox" data-func="${func.MaChucNang}" value="xoa" /></td>
    </tr>
  `).join('');
});

// Xử lý nút Hủy bỏ trong modal
document.getElementById('cancelAddRoleBtn').addEventListener('click', () => {
  document.getElementById('addRoleModal').style.display = 'none';
});

// Xử lý nút Thêm nhóm quyền
document.getElementById('submitAddRoleBtn').addEventListener('click', () => {
  const roleName = document.getElementById('newRoleName').value.trim();
  if (!roleName) return alert('Vui lòng nhập tên nhóm quyền');

  const permissions = [];
  document.querySelectorAll('#permissionTableBody input[type=checkbox]:checked').forEach(checkbox => {
    permissions.push({
      ChucNang: checkbox.dataset.func,
      HanhDong: checkbox.value
    });
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
      document.getElementById('addRoleModal').style.display = 'none';
      location.reload();
    })
    .catch(error => console.error('Lỗi khi thêm nhóm quyền:', error));
});
