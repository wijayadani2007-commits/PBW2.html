document.addEventListener("DOMContentLoaded", function () {
    // 1. ARRAY UNTUK OPSI CHECKBOX & RADIO BUTTON
    const hobiOptions = ["Ngoding", "Bermain Game", "Membaca Buku", "Rebahan"];
    const statusOptions = ["Mahasiswa", "Freelancer", "Software Engineer"];

    // 2. MEMBUAT FORM DENGAN JAVASCRIPT DOM (Tanpa Mengubah HTML Asli)
    const mainSection = document.querySelector("main section");

    const formContainer = document.createElement("div");
    formContainer.id = "dynamic-form-container";
    formContainer.style.cssText = `
        margin-top: 25px;
        padding: 20px;
        background: rgba(15, 23, 42, 0.6);
        border: 1px solid rgba(56, 189, 248, 0.3);
        border-radius: 12px;
        width: 100%;
        color: #f8fafc;
        font-family: 'Fira Code', monospace;
    `;

    formContainer.innerHTML = `
        <h3 style="color: #38bdf8; margin-bottom: 15px; border-bottom: 1px solid #334155; padding-bottom: 8px;">
            &gt; Form Interaktif
        </h3>
        
        <form id="interactiveForm" onsubmit="return false;">
            <!-- Input Teks -->
            <div style="margin-bottom: 15px;">
                <label style="display:block; color: #34d399; font-size: 0.85rem; margin-bottom: 5px;">Input Teks (Pesan/Kesan):</label>
                <input type="text" id="inputText" placeholder="Masukkan pesan..." style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #334155; background: #0f172a; color: #fff;">
            </div>

            <!-- Input Email dengan Pattern Checking -->
            <div style="margin-bottom: 15px;">
                <label style="display:block; color: #34d399; font-size: 0.85rem; margin-bottom: 5px;">Input Email:</label>
                <input type="text" id="inputEmail" placeholder="contoh@domain.com" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #334155; background: #0f172a; color: #fff;">
            </div>

            <!-- Input Jumlah Pilihan (Number) dengan Error Handling Spinner -->
            <div style="margin-bottom: 15px;">
                <label style="display:block; color: #34d399; font-size: 0.85rem; margin-bottom: 5px;">Jumlah Pilihan Hobi (1 - ${hobiOptions.length}):</label>
                <input type="number" id="inputNumber" min="1" max="${hobiOptions.length}" placeholder="Masukkan angka..." style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #334155; background: #0f172a; color: #fff;">
                <small id="numberError" style="color: #f43f5e; display: none; margin-top: 4px; font-size: 0.75rem;"></small>
            </div>

            <!-- Loop untuk Dropdown / Checkbox dinamis -->
            <div style="margin-bottom: 15px;">
                <label style="display:block; color: #34d399; font-size: 0.85rem; margin-bottom: 5px;">Pilih Hobi (Dropdown Dinamis dari Array):</label>
                <select id="selectHobi" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #334155; background: #0f172a; color: #fff;">
                    <option value="">-- Pilih Hobi --</option>
                </select>
            </div>

            <!-- Loop untuk Radio Button -->
            <div style="margin-bottom: 15px;">
                <label style="display:block; color: #34d399; font-size: 0.85rem; margin-bottom: 5px;">Status Pekerjaan (Radio Button dari Array):</label>
                <div id="radioContainer" style="display: flex; gap: 15px; flex-wrap: wrap;"></div>
            </div>

            <button type="button" id="btnSubmit" style="width: 100%; padding: 10px; background: linear-gradient(135deg, #f43f5e, #38bdf8); border: none; border-radius: 8px; color: white; font-weight: bold; cursor: pointer; transition: 0.3s;">
                Kirim Data
            </button>
        </form>

        <!-- Container Output DOM -->
        <div id="outputResult" style="margin-top: 20px; padding: 15px; background: #0f172a; border-radius: 8px; border: 1px dashed #38bdf8; display: none;">
            <h4 style="color: #38bdf8; margin-bottom: 10px;">&gt; Output Data (DOM Result):</h4>
            <div id="outputContent" style="font-size: 0.85rem; line-height: 1.6; color: #94a3b8;"></div>
        </div>
    `;

    mainSection.appendChild(formContainer);

    // 3. LOOP UNTUK MEMBUAT OPTION DROPDOWN DARI ARRAY
    const selectHobi = document.getElementById("selectHobi");
    hobiOptions.forEach((hobi) => {
        const option = document.createElement("option");
        option.value = hobi;
        option.textContent = hobi;
        selectHobi.appendChild(option);
    });

    // 4. LOOP UNTUK MEMBUAT RADIO BUTTON DARI ARRAY
    const radioContainer = document.getElementById("radioContainer");
    statusOptions.forEach((status, index) => {
        const label = document.createElement("label");
        label.style.cssText = "display: flex; align-items: center; gap: 5px; cursor: pointer; font-size: 0.85rem;";
        
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "statusOption";
        radio.value = status;
        if (index === 0) radio.checked = true; // Set default

        label.appendChild(radio);
        label.appendChild(document.createTextNode(status));
        radioContainer.appendChild(label);
    });

    // 5. EVENT LISTENER & VALIDASI ATURAN
    document.getElementById("btnSubmit").addEventListener("click", function () {
        const textVal = document.getElementById("inputText").value.trim();
        const emailVal = document.getElementById("inputEmail").value.trim();
        const numberVal = parseInt(document.getElementById("inputNumber").value);
        const hobiVal = selectHobi.value;
        const selectedRadio = document.querySelector('input[name="statusOption"]:checked');
        const numberError = document.getElementById("numberError");

        // Reseting error
        numberError.style.display = "none";

        // A. Validasi Pattern Email (Alert + Minta Masukkan Ulang)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailVal)) {
            alert("Format Email Salah! Harap masukkan format email yang benar (contoh: nama@domain.com).");
            document.getElementById("inputEmail").focus();
            return;
        }

        // B. Validasi Error Handling Number (Spinner Check)
        if (isNaN(numberVal) || numberVal < 1 || numberVal > hobiOptions.length) {
            numberError.textContent = `Error: Angka harus di antara 1 sampai ${hobiOptions.length}!`;
            numberError.style.display = "block";
            document.getElementById("inputNumber").focus();
            return;
        }

        // C. TAMPILKAN OUTPUT DENGAN JAVASCRIPT DOM
        const outputResult = document.getElementById("outputResult");
        const outputContent = document.getElementById("outputContent");

        outputContent.innerHTML = `
            <p><strong>Pesan:</strong> ${textVal || "-"}</p>
            <p><strong>Email:</strong> ${emailVal}</p>
            <p><strong>Jumlah Pilihan Number:</strong> ${numberVal}</p>
            <p><strong>Hobi Terpilih (Dropdown):</strong> ${hobiVal || "Belum dipilih"}</p>
            <p><strong>Status (Radio Button):</strong> ${selectedRadio ? selectedRadio.value : "-"}</p>
        `;

        outputResult.style.display = "block";
    });
});