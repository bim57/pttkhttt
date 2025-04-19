document.addEventListener("DOMContentLoaded", function () {
  // Get revenue data from hidden element
  const revenueDataElement = document.getElementById("revenue-data");
  const revenueData = JSON.parse(revenueDataElement.textContent);

  // Extract dates and values
  const dates = revenueData.map((item) => {
    const date = new Date(item.Ngay);
    return date.getDate() + "/" + (date.getMonth() + 1);
  });

  const revenue = revenueData.map((item) => item.DoanhThu || 0);
  const costs = revenueData.map((item) => item.Von || 0);
  const profits = revenueData.map((item) => item.LoiNhuan || 0);

  // Create chart
  const ctx = document.getElementById("revenue-chart").getContext("2d");
  const revenueChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Doanh thu",
          data: revenue,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 2,
          tension: 0.4,
          fill: false,
        },
        {
          label: "Vốn",
          data: costs,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 2,
          tension: 0.4,
          fill: false,
        },
        {
          label: "Lợi nhuận",
          data: profits,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          tension: 0.4,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
                maximumFractionDigits: 0,
              }).format(value);
            },
          },
        },
      },
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return (
                context.dataset.label +
                ": " +
                new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                  maximumFractionDigits: 0,
                }).format(context.raw)
              );
            },
          },
        },
      },
    },
  });
});
