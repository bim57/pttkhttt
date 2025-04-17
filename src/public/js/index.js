// Menu Bar

// Checkbox
document.addEventListener("DOMContentLoaded", () => {
  const setupSelectAllCheckbox = (containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const selectAllCheckbox = /**@type{HTMLInputElement} */ (
      container.querySelector("thead .checkbox-custom")
    );
    const checkboxes = /**@type{NodeListOf<HTMLInputElement>} */ (
      container.querySelectorAll("tbody .checkbox-custom")
    );

    if (selectAllCheckbox) {
      selectAllCheckbox.addEventListener("change", () => {
        checkboxes.forEach((checkbox) => {
          checkbox.checked = selectAllCheckbox.checked;
        });
      });

      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
          const allChecked = Array.from(checkboxes).every((c) => c.checked);
          const someChecked = Array.from(checkboxes).some((c) => c.checked);

          selectAllCheckbox.checked = allChecked;
          selectAllCheckbox.indeterminate = someChecked && !allChecked;
        });
      });
    }
  };

  setupSelectAllCheckbox("all-orders");
  setupSelectAllCheckbox("return-cancel-requests");
  setupSelectAllCheckbox("archived-orders");

  const fromDateInput = /**@type {HTMLInputElement}*/ (
    document.getElementById("fromDate")
  );
  const toDateInput = /**@type {HTMLInputElement}*/ (
    document.getElementById("toDate")
  );

  const filterForm = /**@type {HTMLFormElement}*/ (
    document.querySelector(".filter-form")
  );
  const filterBtn = document.querySelector(".filter-button");

  if (fromDateInput && toDateInput && filterBtn) {
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

    if (fromDateInput.value) {
      toDateInput.min = fromDateInput.value;
    }

    // Xử lý sự kiện submit của form lọc đơn hàng
    if (filterForm) {
      filterForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!fromDateInput.value && toDateInput.value) {
          alert("Vui lòng chọn ngày bắt đầu trước khi chọn ngày kết thúc.");
          return;
        }

        const formData = new FormData(filterForm);
        const params = new URLSearchParams();

        for (const [key, value] of formData.entries()) {
          if (value) {
            if (typeof value === "string") {
              params.set(key, value);
            }
          }
        }

        const currentTab = new URLSearchParams(window.location.search).get(
          "tab"
        );
        if (currentTab) {
          params.set("tab", currentTab);
        }

        const url = `${window.location.pathname}?${params.toString()}`;

        window.location.href = url;
      });
    }
  }

  // Sửa lại để các tab có thể sử dụng bộ lọc
  const orderTabs = document.querySelectorAll(".order-tab");
  orderTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const tabValue = this.getAttribute("data-value") || "";

      const currentParams = new URLSearchParams(window.location.search);

      if (tabValue) {
        currentParams.set("tab", tabValue);
      } else {
        currentParams.delete("tab");
      }

      const newUrl = `${window.location.pathname}?${currentParams.toString()}`;

      window.location.href = newUrl;
    });
  });

  const exportBtn = document.querySelector(".export-button");
  if (exportBtn) {
    exportBtn.addEventListener("click", (event) => {
      event.preventDefault();

      const queryParams = new URLSearchParams(window.location.search);
      window.location.href = `/orders/export-excel?${queryParams.toString()}`;
    });
  }
});
