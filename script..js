document.addEventListener("DOMContentLoaded", () => {
    // 1. Array untuk Menyimpan Data Sesuai Inputan Satu per Satu
    let daftarHobi = [];
    let daftarBahasa = [];

    // Opsi pilihan untuk dropdown & pilihan cepat
    const statusOptions = ["Mahasiswa Aktif", "Freelancer", "Full-stack Developer", "Lainnya"];
    const pilihanHobiPool = ["Bermain Game", "Membaca Buku", "Coding", "Menonton Anime", "Olahraga"];
    const pilihanBahasaPool = ["Java", "Python", "JavaScript", "C++", "PHP"];

    // 2. Tambahkan Kontainer Interaktif ke dalam <main>
    const mainSection = document.querySelector("section");
    
    const interactiveContainer = document.createElement("div");
    interactiveContainer.className = "interactive-form-container";
    interactiveContainer.style.cssText = `
        flex: 1;
        width: 100%;
        background: rgba(15, 23, 42, 0.6);
        padding: 1.5rem;
        border-radius: 12px;
        border: 1px solid rgba(56, 189, 248, 0.2);
    `;

    interactiveContainer.innerHTML = `
        <h3 style="font-family: 'Fira Code', monospace; color: var(--accent-cyan); font-size: 1.1rem; margin-bottom: 1rem;">> interactive_input_step_by_step()</h3>
        <div style="display: flex; flex-direction: column; gap: 1.2rem;">
            
            <!-- Input Teks Nama -->
            <div>
                <label style="font-size: 0.8rem; color: var(--text-muted); font-family: 'Fira Code', monospace;">Nama Lengkap:</label>
                <input type="text" id="inputNama" placeholder="Ketik nama..." style="width: 100%; padding: 8px; border-radius: 6px; background: rgba(11, 15, 25, 0.8); border: 1px solid rgba(255,255,255,0.1); color: #fff; margin-top: 4px;">
            </div>

            <!-- Input Email dengan Validasi Pattern -->
            <div>
                <label style="font-size: 0.8rem; color: var(--text-muted); font-family: 'Fira Code', monospace;">Email Validasi:</label>
                <input type="email" id="inputEmail" placeholder="contoh@gmail.com" style="width: 100%; padding: 8px; border-radius: 6px; background: rgba(11, 15, 25, 0.8); border: 1px solid rgba(255,255,255,0.1); color: #fff; margin-top: 4px;">
            </div>

            <!-- Input Number dengan Error Handling (Spinner) -->
            <div>
                <label style="font-size: 0.8rem; color: var(--text-muted); font-family: 'Fira Code', monospace;">Jam Ngoding / Hari (Spinner 1-12):</label>
                <input type="number" id="inputJam" min="1" max="12" value="4" style="width: 100%; padding: 8px; border-radius: 6px; background: rgba(11, 15, 25, 0.8); border: 1px solid rgba(255,255,255,0.1); color: #fff; margin-top: 4px;">
            </div>

            <!-- Dropdown Status -->
            <div>
                <label style="font-size: 0.8rem; color: var(--text-muted); font-family: 'Fira Code', monospace;">Status Saat Ini:</label>
                <select id="selectStatus" style="width: 100%; padding: 8px; border-radius: 6px; background: rgba(11, 15, 25, 0.8); border: 1px solid rgba(255,255,255,0.1); color: #fff; margin-top: 4px;"></select>
            </div>

            <!-- Input Tambah Hobi 1 per 1 (Checkbox / Tombol Pilih) -->
            <div>
                <label style="font-size: 0.8rem; color: var(--text-muted); font-family: 'Fira Code', monospace; display: block; margin-bottom: 4px;">Klik Hobi (Masuk 1 per 1 ke Array):</label>
                <div id="hobiButtonContainer" style="display: flex; flex-wrap: wrap; gap: 8px;"></div>
                <div style="font-size: 0.85rem; color: var(--accent-green); margin-top: 6px;" id="hobiTerpilihText">Hobi dipilih: (Belum ada)</div>
            </div>

            <!-- Input Tambah Bahasa Pemrograman 1 per 1 (Radio-like button) -->
            <div>
                <label style="font-size: 0.8rem; color: var(--text-muted); font-family: 'Fira Code', monospace; display: block; margin-bottom: 4px;">Klik Bahasa Pemrograman (1 per 1):</label>
                <div id="bahasaButtonContainer" style="display: flex; flex-wrap: wrap; gap: 8px;"></div>
                <div style="font-size: 0.85rem; color: var(--accent-cyan); margin-top: 6px;" id="bahasaTerpilihText">Bahasa dipilih: (Belum ada)</div>
            </div>

            <!-- Tombol Render Akhir -->
            <button id="btnRender" style="margin-top: 5px; background: var(--accent-cyan); color: #0b0f19; font-weight: bold; padding: 10px; border: none; border-radius: 6px; cursor: pointer; font-family: 'Fira Code', monospace;">Tampilkan Hasil Akhir (DOM)</button>
        </div>

        <!-- DOM Output Area -->
        <div id="outputArea" style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px dashed rgba(255,255,255,0.1); display: none;">
            <h4 style="font-family: 'Fira Code', monospace; color: var(--accent-green); font-size: 0.95rem; margin-bottom: 0.5rem;">> Live DOM Output Result:</h4>
            <div id="outputContent" style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.6;"></div>
        </div>
    `;

    mainSection.appendChild(interactiveContainer);

    // 3. Looping Mengisi Dropdown Status
    const selectElement = document.getElementById("selectStatus");
    statusOptions.forEach(status => {
        const option = document.createElement("option");
        option.value = status;
        option.textContent = status;
        selectElement.appendChild(option);
    });

    // 4. Looping Membuat Tombol Klik Hobi 1 per 1 (Memasukkan ke Array)
    const hobiButtonContainer = document.getElementById("hobiButtonContainer");
    const hobiTerpilihText = document.getElementById("hobiTerpilihText");

    pilihanHobiPool.forEach(hobi => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = `+ ${hobi}`;
        btn.style.cssText = "background: rgba(56, 189, 248, 0.1); color: var(--text-main); border: 1px solid rgba(56, 189, 248, 0.3); padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; transition: 0.2s;";
        
        btn.addEventListener("click", () => {
            // Cek apakah hobi sudah ada di array agar tidak duplikat
            if (!daftarHobi.includes(hobi)) {
                daftarHobi.push(hobi); // Masukkan ke array 1 per 1
                hobiTerpilihText.textContent = `Hobi dipilih: ${daftarHobi.join(", ")}`;
                btn.style.background = "var(--accent-green)";
                btn.style.color = "#0b0f19";
            } else {
                // Toggle hapus jika diklik lagi
                daftarHobi = daftarHobi.filter(item => item !== hobi);
                hobiTerpilihText.textContent = `Hobi dipilih: ${daftarHobi.length > 0 ? daftarHobi.join(", ") : "(Belum ada)"}`;
                btn.style.background = "rgba(56, 189, 248, 0.1)";
                btn.style.color = "var(--text-main)";
            }
        });
        hobiButtonContainer.appendChild(btn);
    });

    // 5. Looping Membuat Tombol Klik Bahasa Pemrograman 1 per 1
    const bahasaButtonContainer = document.getElementById("bahasaButtonContainer");
    const bahasaTerpilihText = document.getElementById("bahasaTerpilihText");

    pilihanBahasaPool.forEach(lang => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = lang;
        btn.style.cssText = "background: rgba(168, 85, 247, 0.1); color: var(--text-main); border: 1px solid rgba(168, 85, 247, 0.3); padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem;";

        btn.addEventListener("click", () => {
            // Sistem pemilihan berganti (mengganti isi array/bahasa utama 1 per 1)
            daftarBahasa = [lang]; 
            bahasaTerpilihText.textContent = `Bahasa dipilih: ${lang}`;
            
            // Reset style tombol lain
            Array.from(bahasaButtonContainer.children).forEach(b => {
                b.style.background = "rgba(168, 85, 247, 0.1)";
                b.style.color = "var(--text-main)";
            });
            btn.style.background = "var(--accent-purple)";
            btn.style.color = "#fff";
        });
        bahasaButtonContainer.appendChild(btn);
    });

    // 6. Tombol Aksi Render DOM dengan Error Handling Lengkap
    const btnRender = document.getElementById("btnRender");
    btnRender.addEventListener("click", () => {
        const nama = document.getElementById("inputNama").value.trim();
        const email = document.getElementById("inputEmail").value.trim();
        const jam = parseInt(document.getElementById("inputJam").value);
        const status = document.getElementById("selectStatus").value;

        // Error Handling Nama Kosong
        if (!nama) {
            alert("⚠️ Error: Nama lengkap tidak boleh kosong!");
            document.getElementById("inputNama").focus();
            return;
        }

        // Error Handling Email Pattern Matching Regex
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("⚠️ Error: Format email salah! Mohon masukkan email yang valid (contoh: nama@domain.com) dan ulangi.");
            document.getElementById("inputEmail").focus();
            return;
        }

        // Error Handling Spinner Number (1 - 12)
        if (isNaN(jam) || jam < 1 || jam > 12) {
            alert("⚠️ Error: Jumlah jam ngoding pada spinner harus berada di antara angka 1 sampai 12!");
            document.getElementById("inputJam").focus();
            return;
        }

        // Render hasil akhir ke DOM
        const outputArea = document.getElementById("outputArea");
        const outputContent = document.getElementById("outputContent");

        outputArea.style.display = "block";
        outputContent.innerHTML = `
            <p><strong>Nama:</strong> ${nama}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Jam Ngoding:</strong> ${jam} jam/hari</p>
            <p><strong>Status:</strong> ${status}</p>
            <p><strong>Array Hobi:</strong> [ ${daftarHobi.join(", ") || "Kosong"} ]</p>
            <p><strong>Array Bahasa Utama:</strong> [ ${daftarBahasa.join(", ") || "Kosong"} ]</p>
        `;
    });
});