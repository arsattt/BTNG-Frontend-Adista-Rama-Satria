// Endpoint API Resmi dari Panitia Tugas Akhir BTNG
const API_URL = "https://api-web.dnccudinus.org/api/mobil";

// Menangkap elemen HTML
const carContainer = document.getElementById("car-container");
const loadingIndicator = document.getElementById("loading");
const errorMessage = document.getElementById("error-message");
const searchInput = document.getElementById("search-input");
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

let allMobilData = [];

// Fungsi utama mengambil data dari API menggunakan fetch()
async function fetchMobilData() {
    try {
        loadingIndicator.style.display = "block";
        errorMessage.style.display = "none";
        carContainer.innerHTML = "";

        const response = await fetch(API_URL);
        
        // Cek apakah response HTTP sukses (200-299)
        if (!response.ok) {
            throw new Error(`Gagal mengambil data. Status: ${response.status}`);
        }
        
        const result = await response.json();
        loadingIndicator.style.display = "none";
        
        // Mengolah data JSON dari API
        allMobilData = result.data || result; 
        
        renderCarCards(allMobilData);

    } catch (error) {
        console.error("Terjadi kesalahan:", error);
        loadingIndicator.style.display = "none";
        errorMessage.textContent = "Gagal memuat data kendaraan dari server. Periksa koneksi internet Anda.";
        errorMessage.style.display = "block";
    }
}

// Fungsi manipulasi DOM secara dinamis untuk menampilkan kartu mobil
function renderCarCards(cars) {
    carContainer.innerHTML = "";

    if (!Array.isArray(cars) || cars.length === 0) {
        carContainer.innerHTML = "<p style='text-align: center; grid-column: 1/-1; color: var(--text-muted);'>Tidak ada kendaraan yang sesuai dengan pencarian Anda.</p>";
        return;
    }

    cars.forEach(car => {
        const card = document.createElement("div");
        card.classList.add("car-card");

        const namaMobil = car.nama || car.merk || 'Kendaraan ARS';
        const hargaMobil = Number(car.harga || 0).toLocaleString('id-ID');
        const deskripsiMobil = car.deskripsi || car.spesifikasi || 'Kendaraan eksklusif berperforma tinggi dengan standar kemewahan tertinggi.';
        const gambarMobil = car.image || car.foto || 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=500&q=80';

        card.innerHTML = `
            <img src="${gambarMobil}" alt="${namaMobil}" class="car-img" onerror="this.src='https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=500&q=80'">
            <div class="car-body">
                <h3 class="car-title">${namaMobil}</h3>
                <p class="car-price">Rp ${hargaMobil}</p>
                <p class="car-desc">${deskripsiMobil}</p>
                <button class="btn-detail" onclick="alert('Informasi unit: ${namaMobil}\\nSilakan hubungi sales eksekutif ARS Showroom atau kirim pesan di bagian Kontak bawah.')">Lihat Detail Unit</button>
            </div>
        `;

        carContainer.appendChild(card);
    });
}

// Fitur Pencarian Realtime
if (searchInput) {
    searchInput.addEventListener("input", (e) => {
        const keyword = e.target.value.toLowerCase();
        const filtered = allMobilData.filter(car => {
            const nama = (car.nama || car.merk || "").toLowerCase();
            const desc = (car.deskripsi || car.spesifikasi || "").toLowerCase();
            return nama.includes(keyword) || desc.includes(keyword);
        });
        renderCarCards(filtered);
    });
}

// Toggle Navigation Menu versi Mobile (Hamburger Menu)
if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}

// Jalankan pengambilan data API saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
    fetchMobilData();
});

//handle form
const form = document.getElementById("contact-form");

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log("data: ",data)

    const name = document.getElementById("nama").value;
    const noTelp = document.getElementById("telp").value;
    const pertanyaan = document.getElementById("question").value;

    // console.log("nama", name)
    // console.log("telp", noTelp)
    // console.log("pertanyaan", pertanyaan)

    window.location.href = `https://wa.me/6281229223937?text=Halo Aku ${name}, Aku mau tanya tentang ${pertanyaan}`
})