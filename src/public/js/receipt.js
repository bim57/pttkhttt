// Xử lý gợi ý nhà cung cấp trong form create
const provider = document.getElementById('provider');
const suggestions_provider = document.getElementById('suggestions_provider');

provider.addEventListener('input', async () => {
    const query = provider.value.trim();
    if (query === '') {
        suggestions_provider.innerHTML = '';
        return;
    }

    const response = await fetch(`/receipt/search_provider?q=${encodeURIComponent(query)}`);
    const products = await response.json();

    suggestions_provider.innerHTML = '';
    products.forEach(product => {
        const div = document.createElement('div');
        div.textContent = product.provider_info;
        div.classList.add('suggestion-item');
        div.addEventListener('click', () => {
            provider.value = product.provider_info;
            suggestions_provider.innerHTML = '';
        });
        suggestions_provider.appendChild(div);
    });
});

// Xử lý gợi ý nhân viên trong form create
const employee = document.getElementById('employee');
const suggestions_employee = document.getElementById('suggestions_employee');

employee.addEventListener('input', async () => {
    const query = employee.value.trim();
    if (query === '') {
        suggestions_employee.innerHTML = '';
        return;
    }

    const response = await fetch(`/receipt/search_employee?q=${encodeURIComponent(query)}`);
    const products = await response.json();

    suggestions_employee.innerHTML = '';
    products.forEach(product => {
        const div = document.createElement('div');
        div.textContent = product.employee_info;
        div.classList.add('suggestion-item');
        div.addEventListener('click', () => {
            employee.value = product.employee_info;
            suggestions_employee.innerHTML = '';
        });
        suggestions_employee.appendChild(div);
    });
});

// Xử lý gợi ý sản phẩm trong form create
const productInput = document.getElementById("product");
const suggestions_product = document.getElementById("suggestions_product");
const productList = document.getElementById("product-list").querySelector("tbody");

function updateEmptyMessage() {
    const existingMessageRow = productList.querySelector(".empty-row");

    if (productList.children.length === 0) {
        const row = document.createElement("tr");
        row.classList.add("empty-row");
        row.innerHTML = `<td colspan="4" style="text-align:center;">Chưa có sản phẩm nào</td>`;
        productList.appendChild(row);
    } else if (existingMessageRow) {
        existingMessageRow.remove();
    }
}

updateEmptyMessage(); // Cập nhật thông báo

productInput.addEventListener("input", async () => {
    const query = productInput.value.trim();
    if (query === '') {
        suggestions_product.innerHTML = '';
        return;
    }

    const response = await fetch(`/receipt/search_product?q=${encodeURIComponent(query)}`);
    const products = await response.json();

    suggestions_product.innerHTML = '';
    products.forEach(product => {
        const div = document.createElement('div');
        div.textContent = product.product_info;
        div.classList.add('suggestion-item');
        div.addEventListener('click', () => addProductToTable(product));
        suggestions_product.appendChild(div);
    });
});

function addProductToTable(product) {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${product.TenSanPham}</td>
        <td><input type="text" class="quantity" value="1"></td>
        <td><input type="text" class="price" value="0"></td>
        <td><button class="remove-btn">Xóa</button></td>
    `;

    row.querySelector(".quantity").addEventListener("input", () => validateNumber(row.querySelector(".quantity")));
    row.querySelector(".price").addEventListener("input", () => validateNumber(row.querySelector(".price")));

    row.querySelector(".remove-btn").addEventListener("click", () => {
        row.remove();
        updateEmptyMessage(); // cập nhật sau khi xóa
    });

    productList.appendChild(row);
    product.value = "";
    suggestions_product.innerHTML = "";
    updateEmptyMessage(); // cập nhật sau khi thêm
}

function validateNumber(input) {
    if (!/^\d*\.?\d*$/.test(input.value)) {
        alert("Vui lòng nhập số hợp lệ!");
        input.value = input.value.replace(/\D/g, "");
    }
}

// document.getElementById('allCheckbox').addEventListener('change', function () {
//     let checkboxes = document.querySelectorAll('.itemCheckbox');
//     checkboxes.forEach(checkbox => {
//         checkbox.checked = this.checked; // Đồng bộ tất cả checkbox với "Chọn tất cả"
//     });
// });

// // Xử lý khi chọn/bỏ chọn từng ô
// let itemCheckboxes = document.querySelectorAll('.itemCheckbox');
// itemCheckboxes.forEach(checkbox => {
//     checkbox.addEventListener('change', function () {
//         let allCheckbox = document.getElementById('allCheckbox');
//         // Nếu tất cả ô con đều được chọn, check "Chọn tất cả", nếu không thì bỏ check
//         allCheckbox.checked = [...itemCheckboxes].every(cb => cb.checked);
//     });
// });