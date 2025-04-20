document.addEventListener("DOMContentLoaded", function () {
  // Handle tab switching
  document.querySelectorAll(".tab-item").forEach((tab) => {
    tab.addEventListener("click", function () {
      // Remove active class from all tabs
      document
        .querySelectorAll(".tab-item")
        .forEach((t) => t.classList.remove("active"));

      // Add active class to current tab
      this.classList.add("active");

      // Get selected tab value
      const tabValue = this.getAttribute("data-tab");
      console.log("Tab changed to:", tabValue);

      // Hide all selectors first
      document.getElementById("date-range-selector").style.display = "none";
      document.getElementById("year-selector").style.display = "none";
      document.getElementById("month-in-year-selector").style.display = "none";
      document.getElementById("day-in-month-selector").style.display = "none";

      // Show appropriate selector based on tab
      if (tabValue === "custom") {
        document.getElementById("date-range-selector").style.display = "block";
      } else if (tabValue === "year") {
        document.getElementById("year-selector").style.display = "block";
      } else if (tabValue === "month") {
        document.getElementById("month-in-year-selector").style.display =
          "block";
      } else if (tabValue === "day") {
        document.getElementById("day-in-month-selector").style.display =
          "block";
      }

      // Here you would update the table data based on the selected tab
    });
  });

  // Initialize the day-in-month selector as visible since its tab is active by default
  document.getElementById("day-in-month-selector").style.display = "block";

  // Apply button event listeners
  document
    .getElementById("apply-date-range")
    .addEventListener("click", function () {
      const startDate = document.getElementById("start-date").value;
      const endDate = document.getElementById("end-date").value;
      console.log("Applied date range:", startDate, "to", endDate);
      // Fetch and update table data based on date range
    });

  document.getElementById("apply-year").addEventListener("click", function () {
    const year = document.getElementById("select-year").value;
    console.log("Applied year:", year);
    // Fetch and update table data based on year
  });

  document
    .getElementById("apply-month-in-year")
    .addEventListener("click", function () {
      const year = document.getElementById("select-year-for-months").value;
      console.log("Applied year for monthly stats:", year);
      // Fetch and update table data based on year (showing monthly breakdown)
    });

  document
    .getElementById("apply-day-in-month")
    .addEventListener("click", function () {
      const month = document.getElementById("select-month").value;
      console.log("Applied month:", month);
      // Fetch and update table data based on month (showing daily breakdown)
    });

  document.getElementById("export-btn").addEventListener("click", function () {
    // Xử lý xuất báo cáo
    console.log("Export report");
  });
});
