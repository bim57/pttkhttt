document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("confirmationModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalMessage = document.getElementById("modalMessage");
  const modalConfirmBtn = document.getElementById("modalConfirmBtn");
  const modalCancelBtn = document.getElementById("modalCancelBtn");
  const closeModalBtn = document.querySelector(".close-modal");

  function setupOrderButton(
    buttonId,
    modalTitleText,
    modalMessageTemplate,
    endpoint,
    statusValue
  ) {
    if (
      !modal ||
      !modalTitle ||
      !modalMessage ||
      !modalConfirmBtn ||
      !modalCancelBtn ||
      !closeModalBtn
    ) {
      console.error("Confirmation modal elements not found!");
      return;
    }
    const button = document.getElementById(buttonId);
    if (button) {
      button.addEventListener("click", () => {
        const orderId = button.getAttribute("data-order-id");

        modalTitle.textContent = modalTitleText;
        modalMessage.textContent = modalMessageTemplate.replace(
          "{orderId}",
          orderId
        );

        modalConfirmBtn.onclick = () => {
          try {
            fetch(`/orders/${orderId}/${endpoint}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ status: statusValue }),
            })
              .then((res) => {
                if (!res.ok) {
                  throw new Error("Lỗi mạng hoặc server");
                }
                console.log(`Đơn hàng đã ${endpoint} thành công`);
                closeModal(modal);
                window.location.href = `/orders/${orderId}`;
                return res.json();
              })
              .catch((error) => {
                console.error("Error", error);
                closeModal(modal);
              });
          } catch (error) {
            console.error("Lỗi xử lý", error);
            closeModal(modal);
          }
        };
        openModal(modal);
      });
    }
  }

  setupOrderButton(
    "confirmOrderBtn",
    "Xác nhận đơn hàng",
    "Bạn có chắc chắn muốn xác nhận đơn hàng #{orderId} không?",
    "confirm",
    "Chờ lấy hàng"
  );

  setupOrderButton(
    "cancelOrderBtn",
    "Hủy đơn hàng",
    "Bạn có chắc chắn muốn hủy đơn hàng #{orderId} không?",
    "cancel",
    "Đã hủy"
  );

  setupOrderButton(
    "archiveOrderBtn",
    "Lưu trữ đơn hàng",
    "Bạn có chắc chắn muốn lưu trữ đơn hàng #{orderId} không?",
    "archive",
    1
  );

  setupOrderButton(
    "unarchiveOrderBtn",
    "Bỏ lưu trữ đơn hàng",
    "Bạn có chắc chắn muốn bỏ lưu trữ đơn hàng #{orderId} không?",
    "unarchive",
    "0"
  );
  // Confirm Order Button
  // const confirmOrderBtn = document.getElementById("confirmOrderBtn");
  // if (confirmOrderBtn) {
  //   confirmOrderBtn.addEventListener("click", () => {
  //     const orderId = confirmOrderBtn.getAttribute("data-order-id");

  //     modalConfirmBtn.onclick = () => {
  //       try {
  //         fetch(`/orders/${orderId}/confirm`, {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ status: "Chờ lấy hàng" }),
  //         })
  //           .then((res) => {
  //             if (!res.ok) {
  //               throw new Error("Lỗi mạng hăặc server");
  //             }
  //             console.log("Đơn hàng đã được xác nhận thành công");
  //             closeModal(modal);
  //             // window.location.href = "/orders/show";
  //             window.location.href = `/orders/${orderId}`;
  //             return res.json();
  //           })
  //           .catch((error) => {
  //             console.error("Error", error);
  //             closeModal(modal);
  //           });
  //       } catch (error) {
  //         console.error("Khùng ròi", error);
  //         closeModal(modal);
  //       }
  //     };

  //     openModal(modal);
  //   });
  // }

  // // Cancel Order Button
  // const cancelOrderBtn = document.getElementById("cancelOrderBtn");
  // if (cancelOrderBtn) {
  //   cancelOrderBtn.addEventListener("click", () => {
  //     const orderId = cancelOrderBtn.getAttribute("data-order-id");

  //     modalTitle.textContent = "Hủy đơn hàng";
  //     modalMessage.textContent = `Bạn có chắc chắn muốn hủy đơn hàng #${orderId} không?`;

  //     modalConfirmBtn.onclick = () => {
  //       try {
  //         fetch(`/orders/${orderId}/cancel`, {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ status: "Đã hủy" }),
  //         })
  //           .then((res) => {
  //             if (!res.ok) {
  //               throw new Error("Lỗi mạng hăặc server");
  //             }
  //             console.log("Đơn hàng đã hủy thành công");
  //             closeModal(modal);
  //             // window.location.href = "/orders/show";
  //             window.location.href = `/orders/${orderId}`;
  //             return res.json();
  //           })
  //           .catch((error) => {
  //             console.error("Error", error);
  //             closeModal(modal);
  //           });
  //       } catch (error) {
  //         console.error("Khùng ròi", error);
  //         closeModal(modal);
  //       }
  //     };

  //     openModal(modal);
  //   });
  // }

  // Close modal functions
  modalCancelBtn?.addEventListener("click", () => closeModal(modal));
  closeModalBtn?.addEventListener("click", () => closeModal(modal));

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });

  function openModal(modal) {
    modal.style.display = "flex";
  }

  function closeModal(modal) {
    modal.style.display = "none";
  }

  // const exportPdfBtn = document.getElementById("exportPdfBtn");
  // if (exportPdfBtn) {
  //   exportPdfBtn.addEventListener("click", () => {
  //     const orderId = exportPdfBtn.dataset.orderId;
  //     try {
  //       fetch(`/orders/${orderId}/export-pdf`, {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }).then((res) => {
  //         if (!res.ok) {
  //           console.error("Lỗi mạng hoặc server");
  //           throw new Error("Lỗi mạng hoặc server");
  //         }
  //         res
  //           .json()
  //           .then((data) => {
  //             if (data.success && data.fileName) {
  //               console.log("Xuất PDF thành công");
  //               window.open(data.pdfUrl, "_blank");
  //             } else {
  //               console.error("Xuất PDF thất bại", data.message);
  //             }
  //           })
  //           .catch((error) => {
  //             console.error("Lỗi khi phân tích dữ liệu JSON", error);
  //           });
  //       });
  //     } catch (error) {
  //       console.error("Error", error);
  //     }
  //   });
  // }
});
