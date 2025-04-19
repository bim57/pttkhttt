// Gán sự kiện tự động cho các cột có class "sortable"
window.addEventListener("DOMContentLoaded", () => {
    const headers = document.querySelectorAll("#header-row td");
    headers.forEach((td, index) => {
        if (td.classList.contains("sortable")) {
            td.style.cursor = "pointer";
            td.addEventListener("click", () => sortTable(index));
        }
    });

    // --- Giữ lại trạng thái chọn của select-box ---
    const currentPath = window.location.pathname;
    const selectBox = document.getElementById("selection-box");
    const options = selectBox.options;

    for (let i = 0; i < options.length; i++) {
        if (options[i].value === currentPath) {
            options[i].selected = true;
            break;
        }
    }
});

// --- Sự kiện thay đổi lựa chọn trong dropdown ---
document.getElementById("selection-box").addEventListener("change", function () {
    const url = this.value;
    window.location.href = url;
});

// Sắp xếp
let sortDirections = {}; // lưu trạng thái sort từng cột

function sortTable(colIndex) {
    const table = document.getElementById("provider_table");
    const rows = Array.from(table.tBodies[0].rows);
  
    const isAscending = !sortDirections[colIndex];
    sortDirections[colIndex] = isAscending;
  
    rows.sort((a, b) => {
        const cellA = a.cells[colIndex];
        const cellB = b.cells[colIndex];
      
        const valA = cellA.dataset.value || cellA.innerText.trim();
        const valB = cellB.dataset.value || cellB.innerText.trim();
      
        const isNumber = !isNaN(valA) && !isNaN(valB);
        return isNumber
          ? (isAscending ? valA - valB : valB - valA)
          : (isAscending ? valA.localeCompare(valB) : valB.localeCompare(valA));
    });
  
    const tbody = table.tBodies[0];
    rows.forEach(row => tbody.appendChild(row));
  
    // Reset mũi tên tất cả
    const allArrows = document.querySelectorAll("#header-row .arrow");
    allArrows.forEach(arrow => arrow.textContent = "▲");
  
    // Đặt lại mũi tên cho cột đang sort
    const currentArrow = table.rows[0].cells[colIndex].querySelector(".arrow");
    if (currentArrow) currentArrow.textContent = isAscending ? "▲" : "▼";
}