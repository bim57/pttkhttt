// Menu Bar

// Checkbox functionality for order table
document.addEventListener("DOMContentLoaded", function () {
  const selectAllCheckbox = /**@type {HTMLInputElement} */ (
    document.getElementById("select-all-checkbox")
  );
  const orderCheckboxes = /**@type {NodeListOf<HTMLInputElement>} */ (
    document.querySelectorAll(".order-checkbox")
  );

  // Add event listener to "select all" checkbox
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener("change", function () {
      orderCheckboxes.forEach((checkbox) => {
        checkbox.checked = selectAllCheckbox.checked;
      });
    });
  }

  // Update "select all" checkbox state based on individual checkboxes
  orderCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const allChecked = [...orderCheckboxes].every((cb) => cb.checked);
      // const someChecked = [...orderCheckboxes].some((cb) => cb.checked);

      if (selectAllCheckbox) {
        selectAllCheckbox.checked = allChecked;
        // selectAllCheckbox.indeterminate = someChecked && !allChecked;
      }
    });
  });

  // Date range validation
  const fromDateInput = /**@type {HTMLInputElement}*/ (
    document.getElementById("fromDate")
  );
  const toDateInput = /**@type {HTMLInputElement}*/ (
    document.getElementById("toDate")
  );

  const filterBtn = document.querySelector(".filter-button");

  if (fromDateInput && toDateInput && filterBtn) {
    // When "from date" changes, make sure "to date" is not earlier
    fromDateInput.addEventListener("change", () => {
      if (
        fromDateInput.value &&
        toDateInput.value &&
        toDateInput.value < fromDateInput.value
      ) {
        toDateInput.value = fromDateInput.value;
      }
      toDateInput.min = fromDateInput.value;
    });

    // Initialize min date on page load if "from date" already has a value
    if (fromDateInput.value) {
      toDateInput.min = fromDateInput.value;
    }

    filterBtn.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!fromDateInput.value && toDateInput.value) {
        alert("Vui lòng chọn ngày bắt đầu trước khi chọn ngày kết thúc.");
        return;
      }
    });
  }

  const exportBtn = document.querySelector(".export-button");
  // if (exportBtn) {
  //   exportBtn.addEventListener('click', (event)=>{
  //     event.preventDefault()
  //     const selectedOrders = [...orderCheckboxes]
  //       .filter((checkbox) => checkbox.checked)
  //       .map((checkbox) => checkbox.value);
  //     if (selectedOrders.length === 0) {
  //       alert("Vui lòng chọn ít nhất một đơn hàng để xuất.");
  //       return;
  //     }
  //     const form = document.createElement("form");
  //     form.method = "POST";
  //     form.action = "/orders/export-pdf";
  //     form.style.display = "none";
  //     selectedOrders.forEach((orderId) => {
  //       const input = document.createElement("input");
  //       input.type = "hidden";
  //       input.name = "orderIds[]"; // Use array notation to send multiple values
  //       input.value = orderId;
  //       form.appendChild(input);
  //     });
  //     document.body.appendChild(form);
  //     form.submit();
  //     document.body.removeChild(form);
  //   });
  // }

  if (exportBtn) {
    exportBtn.addEventListener("click", (event) => {
      event.preventDefault();

      const queryParams = new URLSearchParams(window.location.search);
      console.log(queryParams.toString());

      window.location.href = `/orders/export-excel?${queryParams.toString()}`;
    });
  }
});
