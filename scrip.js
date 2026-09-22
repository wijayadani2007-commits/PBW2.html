// ================================
// DATA ARRAY
// ================================

// Array untuk pilihan checkbox
const pilihanHobi = [
    "Bermain Game",
    "Membaca Buku",
    "Ngoding",
    "Olahraga"
];

// Array untuk pilihan dropdown
const pilihanKelas = [
    "Kelas A",
    "Kelas B",
    "Kelas C",
    "Kelas D"
];

// Array untuk pilihan radio button
const pilihanJenisKelamin = [
    "Laki-laki",
    "Perempuan"
];


// ================================
// MEMBUAT FORM DENGAN DOM
// ================================

const container = document.querySelector(".container");

// Membuat elemen form
const form = document.createElement("div");

form.style.marginTop = "20px";
form.style.padding = "20px";
form.style.border = "1px solid #ccc";
form.style.borderRadius = "8px";
form.style.backgroundColor = "#f5f5f5";


// ================================
// INPUT TEKS
// ================================

const labelNama = document.createElement("label");
labelNama.textContent = "Nama Lengkap : ";

const inputNama = document.createElement("input");
inputNama.type = "text";
inputNama.id = "nama";
inputNama.placeholder = "Masukkan nama";

form.appendChild(labelNama);
form.appendChild(inputNama);
form.appendChild(document.createElement("br"));
form.appendChild(document.createElement("br"));


// ================================
// INPUT NUMBER + SPINNER
// ================================

const labelJumlah = document.createElement("label");
labelJumlah.textContent = "Jumlah Pilihan : ";

const inputJumlah = document.createElement("input");
inputJumlah.type = "number";
inputJumlah.id = "jumlah";
inputJumlah.min = "1";
inputJumlah.max = "10";
inputJumlah.value = "1";

// Error message
const errorJumlah = document.createElement("span");
errorJumlah.style.color = "red";
errorJumlah.style.marginLeft = "10px";

form.appendChild(labelJumlah);
form.appendChild(inputJumlah);
form.appendChild(errorJumlah);

form.appendChild(document.createElement("br"));
form.appendChild(document.createElement("br"));


// ================================
// INPUT EMAIL + PATTERN MATCHING
// ================================

const labelEmail = document.createElement("label");
labelEmail.textContent = "Email : ";

const inputEmail = document.createElement("input");
inputEmail.type = "email";
inputEmail.id = "email";
inputEmail.placeholder = "contoh@gmail.com";

form.appendChild(labelEmail);
form.appendChild(inputEmail);

form.appendChild(document.createElement("br"));
form.appendChild(document.createElement("br"));


// ================================
// CHECKBOX
// ================================

const judulHobi = document.createElement("p");
judulHobi.innerHTML = "<strong>Pilih Hobi :</strong>";

form.appendChild(judulHobi);

// Loop membuat checkbox
pilihanHobi.forEach(function (hobi, index) {

    const label = document.createElement("label");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "hobi";
    checkbox.value = hobi;
    checkbox.id = "hobi" + index;

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(" " + hobi));

    form.appendChild(label);
    form.appendChild(document.createElement("br"));
});

form.appendChild(document.createElement("br"));


// ================================
// DROP-DOWN
// ================================

const judulKelas = document.createElement("p");
judulKelas.innerHTML = "<strong>Pilih Kelas :</strong>";

form.appendChild(judulKelas);

const selectKelas = document.createElement("select");
selectKelas.id = "kelas";

// Loop membuat option dropdown
pilihanKelas.forEach(function (kelas) {

    const option = document.createElement("option");

    option.value = kelas;
    option.textContent = kelas;

    selectKelas.appendChild(option);
});

form.appendChild(selectKelas);

form.appendChild(document.createElement("br"));
form.appendChild(document.createElement("br"));


// ================================
// RADIO BUTTON
// ================================

const judulJenisKelamin = document.createElement("p");
judulJenisKelamin.innerHTML = "<strong>Jenis Kelamin :</strong>";

form.appendChild(judulJenisKelamin);

// Loop membuat radio button
pilihanJenisKelamin.forEach(function (jenis, index) {

    const label = document.createElement("label");

    const radio = document.createElement("input");

    radio.type = "radio";
    radio.name = "jenisKelamin";
    radio.value = jenis;
    radio.id = "jenis" + index;

    label.appendChild(radio);
    label.appendChild(document.createTextNode(" " + jenis));

    form.appendChild(label);
    form.appendChild(document.createElement("br"));
});

form.appendChild(document.createElement("br"));


// ================================
// BUTTON
// ================================

const tombol = document.createElement("button");

tombol.textContent = "Tampilkan Data";

tombol.style.padding = "8px 15px";
tombol.style.cursor = "pointer";

form.appendChild(tombol);


// ================================
// OUTPUT DOM
// ================================

const output = document.createElement("div");

output.id = "output";

output.style.marginTop = "20px";
output.style.padding = "15px";
output.style.backgroundColor = "white";
output.style.border = "1px solid #aaa";

form.appendChild(output);


// Memasukkan form ke dalam HTML
container.appendChild(form);


// ================================
// VALIDASI JUMLAH
// ================================

inputJumlah.addEventListener("input", function () {

    const jumlah = Number(inputJumlah.value);

    if (jumlah < 1 || jumlah > 10 || inputJumlah.value === "") {

        errorJumlah.textContent =
            " Jumlah harus antara 1 sampai 10!";

    } else {

        errorJumlah.textContent = "";

    }
});


// ================================
// VALIDASI EMAIL
// ================================

function validasiEmail(email) {

    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);
}


// ================================
// TOMBOL TAMPILKAN DATA
// ================================

tombol.addEventListener("click", function () {

    // Ambil data input teks
    const nama = inputNama.value.trim();

    // Ambil jumlah
    const jumlah = Number(inputJumlah.value);

    // Ambil email
    const email = inputEmail.value.trim();


    // ============================
    // CEK JUMLAH
    // ============================

    if (
        inputJumlah.value === "" ||
        jumlah < 1 ||
        jumlah > 10
    ) {

        errorJumlah.textContent =
            " Jumlah harus antara 1 sampai 10!";

        inputJumlah.focus();

        return;
    }


    // ============================
    // CEK EMAIL
    // ============================

    if (!validasiEmail(email)) {

        alert(
            "Email tidak valid!\n" +
            "Silakan masukkan email dengan format yang benar."
        );

        inputEmail.value = "";
        inputEmail.focus();

        return;
    }


    // ============================
    // AMBIL CHECKBOX
    // ============================

    const checkboxTerpilih =
        document.querySelectorAll(
            'input[name="hobi"]:checked'
        );

    let daftarHobi = [];

    checkboxTerpilih.forEach(function (checkbox) {
        daftarHobi.push(checkbox.value);
    });


    // ============================
    // AMBIL DROPDOWN
    // ============================

    const kelas =
        selectKelas.value;


    // ============================
    // AMBIL RADIO BUTTON
    // ============================

    const radioTerpilih =
        document.querySelector(
            'input[name="jenisKelamin"]:checked'
        );

    let jenisKelamin = "";

    if (radioTerpilih) {
        jenisKelamin = radioTerpilih.value;
    } else {
        jenisKelamin = "Belum dipilih";
    }


    // ============================
    // OUTPUT MENGGUNAKAN DOM
    // ============================

    output.innerHTML = `
        <h3>Hasil Input Data</h3>

        <p>
            <strong>Nama :</strong>
            ${nama || "Belum diisi"}
        </p>

        <p>
            <strong>Jumlah Pilihan :</strong>
            ${jumlah}
        </p>

        <p>
            <strong>Email :</strong>
            ${email}
        </p>

        <p>
            <strong>Hobi :</strong>
            ${
                daftarHobi.length > 0
                ? daftarHobi.join(", ")
                : "Belum memilih"
            }
        </p>

        <p>
            <strong>Kelas :</strong>
            ${kelas}
        </p>

        <p>
            <strong>Jenis Kelamin :</strong>
            ${jenisKelamin}
        </p>
    `;
});