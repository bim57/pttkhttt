document.getElementById("imageUpload").addEventListener("change", function(event) {
    let preview = document.getElementById("imagePreview");
    let hiddenInput = document.getElementById("imageBase64"); // Input ẩn
    let clearButton = document.getElementById("clearAllImages");
    let imageArray = hiddenInput.value ? JSON.parse(hiddenInput.value) : []; // Giữ lại ảnh đã có

    for (let file of event.target.files) {
        let reader = new FileReader();
        
        reader.onload = function(e) {
            let imageData = e.target.result; // Base64

            if (imageArray.includes(imageData)) {
                alert("Ảnh này đã được chọn trước đó!");
                return;
            }

            imageArray.push(imageData); // Lưu vào mảng
            
            let frame = document.createElement("div");
            frame.classList.add("image-frame");
            
            let img = document.createElement("img");
            img.src = imageData; // Hiển thị ảnh

            frame.appendChild(img);
            preview.appendChild(frame); 

            hiddenInput.value = JSON.stringify(imageArray); // Gán vào input ẩn

            // Hiện nút "Xóa Tất Cả" khi có ảnh
            clearButton.style.display = "block";
        };
        
        reader.readAsDataURL(file);
    }

    document.getElementById("clearAllImages").addEventListener("click", function () {
        document.getElementById("imagePreview").innerHTML = ""; // Xóa giao diện ảnh
        document.getElementById("imageBase64").value = "[]"; // Reset input ẩn
        document.getElementById("clearAllImages").style.display = "none"; // Ẩn nút sau khi xóa hết ảnh
    });
});
