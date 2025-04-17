document.addEventListener('DOMContentLoaded', () => {
  const addUserBtn = document.getElementById('addUserBtn');
  
  addUserBtn.addEventListener('click', () => {
    const name = prompt('Nhập tên người dùng:');
    const email = prompt('Nhập email người dùng:');
    const password = prompt('Nhập mật khẩu:');
    const role = prompt('Nhập quyền người dùng:');

    if (name && email && password && role) {
      fetch('/admin/users/add', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, role }),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          location.reload();
        }
      });
    }
  });

  const deleteButtons = document.querySelectorAll('.deleteBtn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const userId = event.target.dataset.id;
      fetch(`/admin/users/delete/${userId}`, { method: 'GET' })
        .then(response => {
          if (response.ok) {
            location.reload();
          }
        });
    });
  });

  const editButtons = document.querySelectorAll('.editBtn');
  editButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const userId = event.target.dataset.id;
      const name = prompt('Nhập tên mới người dùng:');
      const email = prompt('Nhập email mới người dùng:');
      const role = prompt('Nhập quyền mới người dùng:');
      
      if (name && email && role) {
        fetch('/admin/users/update', {
          method: 'POST',
          body: JSON.stringify({ id: userId, name, email, role }),
          headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
          if (response.ok) {
            location.reload();
          }
        });
      }
    });
  });
});
