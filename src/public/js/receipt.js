document.getElementById('allCheckbox').addEventListener('change', function () {
    let checkboxes = document.querySelectorAll('.itemCheckbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked; // Đồng bộ tất cả checkbox với "Chọn tất cả"
    });
});

// Xử lý khi chọn/bỏ chọn từng ô
let itemCheckboxes = document.querySelectorAll('.itemCheckbox');
itemCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        let allCheckbox = document.getElementById('allCheckbox');
        // Nếu tất cả ô con đều được chọn, check "Chọn tất cả", nếu không thì bỏ check
        allCheckbox.checked = [...itemCheckboxes].every(cb => cb.checked);
    });
});
