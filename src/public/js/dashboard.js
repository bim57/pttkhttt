document.addEventListener("DOMContentLoaded", function () {
  // Get revenue data from server
  const revenueData = JSON.parse(
    document.getElementById("revenue-data")?.textContent || "[]"
  );

  if (revenueData.length > 0) {
    drawRevenueChart(revenueData);
  }

  function drawRevenueChart(data) {
    const ctx = /**@type {HTMLCanvasElement}*/ (
      document.getElementById("revenue-chart")
    )?.getContext("2d");

    if (!ctx) {
      console.error("Canvas context not found.");
      return;
    }

    // Format dates and revenue values
    const dates = data.map((item) => {
      const date = new Date(item.Ngay);
      return date.getDate() + "/" + (date.getMonth() + 1);
    });
    const revenues = data.map((item) => item.DoanhThu);

    // Create the chart
    new Chart(ctx, {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            label: "Doanh thu (VNĐ)",
            data: revenues,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
            tension: 0.4,
            pointBackgroundColor: "rgba(54, 162, 235, 1)",
            pointBorderColor: "#fff",
            pointRadius: 5,
            pointHoverRadius: 7,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                  minimumFractionDigits: 0,
                }).format(value);
              },
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                return new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                  minimumFractionDigits: 0,
                }).format(context.raw);
              },
            },
          },
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Doanh thu theo ngày",
          },
        },
      },
    });
  }
});
