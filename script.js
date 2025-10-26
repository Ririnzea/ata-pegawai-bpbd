// Data Storage
let employees = JSON.parse(localStorage.getItem('employees')) || [];
let currentEmployeeId = null;
let activities = JSON.parse(localStorage.getItem('activities')) || [];
let jabatanChart = null;
let golonganChart = null;
let statusChart = null;
let currentUser = null;

// Jabatan Options
const jabatanOptions = [
    'Kepala Pelaksana BPBD',
    'Sekretaris',
    'Kepala Sub Bagian Perencanaan dan Keuangan',
    'Kepala Sub Bagian Umum dan Kepegawaian',
    'Kepala Bidang Pencegahan dan Kesiapsiagaan',
    'Kepala Bidang Kedaruratan dan Logistik',
    'Kepala Bidang Rehabilitasi dan Rekonstruksi',
    'Kepala Seksi Pencegahan',
    'Kepala Seksi Kesiapsiagaan',
    'Kepala Seksi Kedaruratan',
    'Kepala Seksi Logistik',
    'Kepala Seksi Rehabilitasi',
    'Kepala Seksi Rekonstruksi',
    'Staf Bagian Umum dan Kepegawaian',
    'Staf Pencegahan',
    'Staf Kesiapsiagaan',
    'Staf Kedaruratan',
    'Staf Logistik',
    'Staf Rehabilitasi',
    'Staf Rekonstruksi',
    'Staf Perencanaan dan Keuangan'
];

// Golongan Options
const golonganOptions = [
    'Ia', 'Ib', 'Ic', 'Id',
    'IIa', 'IIb', 'IIc', 'IId',
    'IIIa', 'IIIb', 'IIIc', 'IIId',
    'IVa', 'IVb', 'IVc', 'IVd', 'IVe'
];

// User accounts
const users = {
    'admin': {
        password: 'admin123',
        role: 'admin',
        name: 'Administrator'
    },
    'user': {
        password: 'user123',
        role: 'user',
        name: 'User'
    }
};

// Simple Login Function
function doLogin() {
    console.log('doLogin called');
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    console.log('Attempting login with:', username, password);
    
    // Clear any existing messages
    const existingMsg = document.querySelector('.error-message, .success-message');
    if (existingMsg) existingMsg.remove();
    
    if (!username || !password) {
        showLoginMessage('Harap isi username dan password!', 'error');
        return;
    }
    
    if (users[username] && users[username].password === password) {
        currentUser = {
            username: username,
            name: users[username].name,
            role: users[username].role
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showLoginMessage('Login berhasil!', 'success');
        
        setTimeout(() => {
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('main-app').style.display = 'block';
            document.getElementById('current-user').textContent = currentUser.name;
            initializeMainApp();
        }, 500);
    } else {
        showLoginMessage('Username atau password salah!', 'error');
    }
}

// Quick Login Function
function doQuickLogin(type) {
    console.log('Quick login:', type);
    
    if (type === 'admin') {
        document.getElementById('username').value = 'admin';
        document.getElementById('password').value = 'admin123';
    } else if (type === 'user') {
        document.getElementById('username').value = 'user';
        document.getElementById('password').value = 'user123';
    }
    
    doLogin();
}

// Show Login Message
function showLoginMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'error' ? 'error-message' : 'success-message';
    messageDiv.textContent = message;
    
    const loginForm = document.querySelector('.login-form');
    loginForm.insertBefore(messageDiv, loginForm.firstChild);
    
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 3000);
}

// Jabatan Options
const jabatanOptions = [
    'Kepala Pelaksana BPBD',
    'Sekretaris',
    'Kepala Sub Bagian Perencanaan dan Keuangan',
    'Kepala Sub Bagian Umum dan Kepegawaian',
    'Kepala Bidang Pencegahan dan Kesiapsiagaan',
    'Kepala Bidang Kedaruratan dan Logistik',
    'Kepala Bidang Rehabilitasi dan Rekonstruksi',
    'Kepala Seksi Pencegahan',
    'Kepala Seksi Kesiapsiagaan',
    'Kepala Seksi Kedaruratan',
    'Kepala Seksi Logistik',
    'Kepala Seksi Rehabilitasi',
    'Kepala Seksi Rekonstruksi',
    'Staf Bagian Umum dan Kepegawaian',
    'Staf Pencegahan',
    'Staf Kesiapsiagaan',
    'Staf Kedaruratan',
    'Staf Logistik',
    'Staf Rehabilitasi',
    'Staf Rekonstruksi',
    'Staf Perencanaan dan Keuangan'
];

// Golongan Options
const golonganOptions = [
    'Ia', 'Ib', 'Ic', 'Id',
    'IIa', 'IIb', 'IIc', 'IId',
    'IIIa', 'IIIb', 'IIIc', 'IIId',
    'IVa', 'IVb', 'IVc', 'IVd', 'IVe'
];

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    console.log('App starting...');
    
    // Check if already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('main-app').style.display = 'block';
            document.getElementById('current-user').textContent = currentUser.name;
            initializeMainApp();
        } catch (e) {
            localStorage.removeItem('currentUser');
            showLoginScreen();
        }
    } else {
        showLoginScreen();
    }
    
    // Add Enter key support
    document.getElementById('username').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') doLogin();
    });
    
    document.getElementById('password').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') doLogin();
    });
});

function showLoginScreen() {
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('main-app').style.display = 'none';
}

// Check Login Status
function checkLoginStatus() {
    console.log('Checking login status...'); // Debug
    
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            console.log('Found saved user:', currentUser); // Debug
            showMainApp();
        } catch (e) {
            console.error('Error parsing saved user:', e); // Debug
            localStorage.removeItem('currentUser');
            showLoginScreen();
        }
    } else {
        console.log('No saved user found'); // Debug
        showLoginScreen();
    }
}

// Show Login Screen
function showLoginScreen() {
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('main-app').style.display = 'none';
}

// Show Main App
function showMainApp() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('main-app').style.display = 'block';
    
    // Update user info in header
    if (currentUser) {
        document.getElementById('current-user').textContent = currentUser.name;
    }
    
    initializeMainApp();
}

// Initialize Main App
function initializeMainApp() {
    console.log('Initializing main app...'); // Debug
    
    initializeSelects();
    displayEmployees();
    updateSummary();
    updateDashboard();
    updateCurrentDate();
    
    // Add employee form event listener if not already added
    const employeeForm = document.getElementById('employee-form');
    if (employeeForm && !employeeForm.hasAttribute('data-listener-added')) {
        employeeForm.addEventListener('submit', handleFormSubmit);
        employeeForm.setAttribute('data-listener-added', 'true');
        console.log('Employee form event listener added'); // Debug
    }
}

// Old login functions removed - using doLogin() instead

// Show Message
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'error' ? 'error-message' : 'success-message';
    messageDiv.textContent = message;
    
    const form = document.getElementById('login-form');
    form.insertBefore(messageDiv, form.firstChild);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Logout
function logout() {
    if (confirm('Apakah Anda yakin ingin logout?')) {
        // Add logout activity
        addActivity('logout', currentUser.name);
        
        // Clear user data
        currentUser = null;
        localStorage.removeItem('currentUser');
        
        // Reset form
        document.getElementById('login-form').reset();
        
        // Show login screen
        showLoginScreen();
        
        // Show logout message
        setTimeout(() => {
            showMessage('Anda telah berhasil logout', 'success');
        }, 100);
    }
}

// Initialize Select Options
function initializeSelects() {
    const jabatanSelects = document.querySelectorAll('#jabatan, #jabatan-filter');
    const golonganSelects = document.querySelectorAll('#golongan, #golongan-filter');
    
    jabatanSelects.forEach(select => {
        jabatanOptions.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            select.appendChild(optionElement);
        });
    });
    
    golonganSelects.forEach(select => {
        golonganOptions.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            select.appendChild(optionElement);
        });
    });
}

// Tab Navigation
function showTab(tabName) {
    console.log('Switching to tab:', tabName);
    
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    const targetTab = document.getElementById(tabName + '-tab');
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    // Add active class to clicked button
    const targetBtn = document.querySelector(`[onclick="showTab('${tabName}')"]`);
    if (targetBtn) {
        targetBtn.classList.add('active');
    }
    
    // Update content based on tab
    if (tabName === 'report') {
        updateSummary();
    } else if (tabName === 'dashboard') {
        updateDashboard();
    } else if (tabName === 'data') {
        displayEmployees();
    }
}

// Handle Form Submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const isEdit = !!currentEmployeeId;
    const employee = {
        id: currentEmployeeId || Date.now(),
        nama: document.getElementById('nama').value,
        nip: document.getElementById('nip').value,
        jabatan: document.getElementById('jabatan').value,
        status: document.getElementById('status').value,
        golongan: document.getElementById('golongan').value,
        masaKerja: document.getElementById('masa-kerja').value,
        tempatLahir: document.getElementById('tempat-lahir').value,
        tanggalLahir: document.getElementById('tanggal-lahir').value,
        alamat: document.getElementById('alamat').value,
        foto: document.getElementById('image-preview').querySelector('img')?.src || ''
    };
    
    if (isEdit) {
        // Update existing employee
        const index = employees.findIndex(emp => emp.id === currentEmployeeId);
        employees[index] = employee;
    } else {
        // Add new employee
        employees.push(employee);
    }
    
    // Reset currentEmployeeId and form title
    currentEmployeeId = null;
    const formTitle = document.getElementById('form-title');
    if (formTitle) {
        formTitle.textContent = 'Tambah Pegawai Baru';
    }
    
    saveEmployees();
    displayEmployees();
    updateSummary();
    updateDashboard();
    
    // Add activity
    addActivity(isEdit ? 'update' : 'add', employee.nama);
    
    // Reset form and show success message
    e.target.reset();
    document.getElementById('image-preview').innerHTML = '';
    alert(isEdit ? 'Data pegawai berhasil diperbarui!' : 'Data pegawai berhasil disimpan!');
    
    // Switch to data tab
    showTab('data');
}

// Save employees to localStorage
function saveEmployees() {
    localStorage.setItem('employees', JSON.stringify(employees));
}

// Display Employees
function displayEmployees(filteredEmployees = null) {
    const grid = document.getElementById('employee-grid');
    const employeesToShow = filteredEmployees || employees;
    
    if (employeesToShow.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #666; grid-column: 1/-1;">Belum ada data pegawai</p>';
        return;
    }
    
    grid.innerHTML = employeesToShow.map(employee => `
        <div class="employee-card" onclick="showEmployeeDetail(${employee.id})">
            <img src="${employee.foto || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiNkZGQiLz4KPHN2ZyB4PSIyNSIgeT0iMjAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAxMmMyLjIxIDAgNC0xLjc5IDQtNHMtMS43OS00LTQtNC00IDEuNzktNCA0IDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz4KPC9zdmc+Cjwvc3ZnPg=='}" 
                 alt="${employee.nama}" class="employee-photo">
            <h3>${employee.nama}</h3>
            <div class="jabatan">${employee.jabatan}</div>
            <div class="nip">${employee.nip || 'NIP: -'}</div>
            <span class="status-badge ${employee.status ? employee.status.toLowerCase().replace(' ', '-') : 'non-pns'}">${employee.status || 'Non PNS'}</span>
        </div>
    `).join('');
}

// Show Employee Detail Modal
function showEmployeeDetail(id) {
    console.log('Show employee detail called with ID:', id, 'Type:', typeof id);
    
    // Reload employees from localStorage to ensure we have latest data
    employees = JSON.parse(localStorage.getItem('employees')) || [];
    console.log('Current employees:', employees);
    
    // Convert id to number for comparison
    const numId = parseInt(id);
    const employee = employees.find(emp => emp.id === numId || emp.id === id);
    
    if (!employee) {
        console.log('Employee not found with ID:', id);
        alert('Data pegawai tidak ditemukan!');
        return;
    }
    
    currentEmployeeId = id;
    
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div class="employee-detail">
            <img src="${employee.foto || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjYwIiBjeT0iNjAiIHI9IjYwIiBmaWxsPSIjZGRkIi8+CjxzdmcgeD0iMzciIHk9IjMwIiB3aWR0aD0iNDYiIGhlaWdodD0iNDYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPgo8cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS43OSA0LTRzLTEuNzktNC00LTQtNCAxLjc5LTQgNCAxLjc5IDQgNCA0em0wIDJjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6Ii8+Cjwvc3ZnPgo8L3N2Zz4='}" 
                 alt="${employee.nama}" class="photo">
            <h2>${employee.nama}</h2>
            <div class="info">
                <div class="info-row">
                    <div class="info-label">NIP:</div>
                    <div class="info-value">${employee.nip || '-'}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Jabatan:</div>
                    <div class="info-value">${employee.jabatan}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Status:</div>
                    <div class="info-value">
                        <span class="status-badge ${employee.status ? employee.status.toLowerCase().replace(' ', '-') : 'non-pns'}">${employee.status || 'Non PNS'}</span>
                    </div>
                </div>
                <div class="info-row">
                    <div class="info-label">Golongan:</div>
                    <div class="info-value">${employee.golongan || '-'}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Masa Kerja:</div>
                    <div class="info-value">${employee.masaKerja ? employee.masaKerja + ' tahun' : '-'}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Tempat Lahir:</div>
                    <div class="info-value">${employee.tempatLahir || '-'}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Tanggal Lahir:</div>
                    <div class="info-value">${employee.tanggalLahir ? new Date(employee.tanggalLahir).toLocaleDateString('id-ID') : '-'}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Alamat:</div>
                    <div class="info-value">${employee.alamat || '-'}</div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('employee-modal').style.display = 'block';
}

// Close Modal
function closeModal() {
    document.getElementById('employee-modal').style.display = 'none';
    currentEmployeeId = null;
}

// Edit Employee
function editEmployee() {
    console.log('Edit employee called with currentEmployeeId:', currentEmployeeId);
    
    // Reload employees from localStorage
    employees = JSON.parse(localStorage.getItem('employees')) || [];
    
    const numId = parseInt(currentEmployeeId);
    const employee = employees.find(emp => emp.id === numId || emp.id === currentEmployeeId);
    
    if (!employee) {
        console.log('Employee not found for editing');
        alert('Data pegawai tidak ditemukan!');
        return;
    }
    
    // Fill form with employee data
    document.getElementById('nama').value = employee.nama;
    document.getElementById('nip').value = employee.nip || '';
    document.getElementById('jabatan').value = employee.jabatan;
    document.getElementById('status').value = employee.status || '';
    document.getElementById('golongan').value = employee.golongan || '';
    document.getElementById('masa-kerja').value = employee.masaKerja || '';
    document.getElementById('tempat-lahir').value = employee.tempatLahir || '';
    document.getElementById('tanggal-lahir').value = employee.tanggalLahir || '';
    document.getElementById('alamat').value = employee.alamat || '';
    
    if (employee.foto) {
        document.getElementById('image-preview').innerHTML = `<img src="${employee.foto}" alt="Preview">`;
    }
    
    // Change form title to indicate editing
    const formTitle = document.getElementById('form-title');
    if (formTitle) {
        formTitle.textContent = 'Edit Data Pegawai';
    }
    
    closeModal();
    showTab('add');
}

// Delete Employee
function deleteEmployee() {
    console.log('Delete employee called with currentEmployeeId:', currentEmployeeId);
    
    // Reload employees from localStorage
    employees = JSON.parse(localStorage.getItem('employees')) || [];
    
    const numId = parseInt(currentEmployeeId);
    const employee = employees.find(emp => emp.id === numId || emp.id === currentEmployeeId);
    
    if (!employee) {
        console.log('Employee not found for deletion');
        alert('Data pegawai tidak ditemukan!');
        return;
    }
    
    if (confirm(`Apakah Anda yakin ingin menghapus data pegawai "${employee.nama}"?`)) {
        employees = employees.filter(emp => emp.id !== numId && emp.id !== currentEmployeeId);
        saveEmployees();
        displayEmployees();
        updateSummary();
        updateDashboard();
        closeModal();
        alert('Data pegawai berhasil dihapus!');
    }
}

// Edit employee from card
function editEmployeeFromCard(id) {
    console.log('Edit employee from card called with ID:', id);
    currentEmployeeId = id;
    editEmployee();
}

// Delete employee from card  
function deleteEmployeeFromCard(id) {
    console.log('Delete employee from card called with ID:', id);
    currentEmployeeId = id;
    deleteEmployee();
}

// Make functions immediately available globally
window.showEmployeeDetail = showEmployeeDetail;
window.closeModal = closeModal;
window.editEmployee = editEmployee;
window.deleteEmployee = deleteEmployee;
window.editEmployeeFromCard = editEmployeeFromCard;
window.deleteEmployeeFromCard = deleteEmployeeFromCard;

console.log('Employee functions assigned to window:', {
    showEmployeeDetail: typeof window.showEmployeeDetail,
    editEmployeeFromCard: typeof window.editEmployeeFromCard,
    deleteEmployeeFromCard: typeof window.deleteEmployeeFromCard
});

// Search Employee
function searchEmployee() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filtered = employees.filter(emp => 
        emp.nama.toLowerCase().includes(searchTerm) ||
        emp.nip.toLowerCase().includes(searchTerm) ||
        emp.jabatan.toLowerCase().includes(searchTerm) ||
        (emp.status && emp.status.toLowerCase().includes(searchTerm))
    );
    displayEmployees(filtered);
}

// Filter by Jabatan
function filterByJabatan() {
    const jabatan = document.getElementById('jabatan-filter').value;
    if (!jabatan) {
        displayEmployees();
        return;
    }
    
    const filtered = employees.filter(emp => emp.jabatan === jabatan);
    displayEmployees(filtered);
}

// Filter by Status
function filterByStatus() {
    const status = document.getElementById('status-filter').value;
    if (!status) {
        displayEmployees();
        return;
    }
    
    const filtered = employees.filter(emp => emp.status === status);
    displayEmployees(filtered);
}

// Filter by Golongan
function filterByGolongan() {
    const golongan = document.getElementById('golongan-filter').value;
    if (!golongan) {
        displayEmployees();
        return;
    }
    
    const filtered = employees.filter(emp => emp.golongan === golongan);
    displayEmployees(filtered);
}

// Preview Image
function previewImage(input) {
    const preview = document.getElementById('image-preview');
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        };
        
        reader.readAsDataURL(input.files[0]);
    }
}

// Edit Logo
function editLogo() {
    document.getElementById('logo-input').click();
}

// Update Logo
function updateLogo(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            document.getElementById('logo').src = e.target.result;
            localStorage.setItem('customLogo', e.target.result);
        };
        
        reader.readAsDataURL(input.files[0]);
    }
}

// Load custom logo on page load
window.addEventListener('load', function() {
    const customLogo = localStorage.getItem('customLogo');
    if (customLogo) {
        document.getElementById('logo').src = customLogo;
    }
});

// Update Summary
function updateSummary() {
    document.getElementById('total-employees').textContent = employees.length;
    
    // Jabatan summary
    const jabatanCount = {};
    employees.forEach(emp => {
        jabatanCount[emp.jabatan] = (jabatanCount[emp.jabatan] || 0) + 1;
    });
    
    const jabatanSummary = document.getElementById('jabatan-summary');
    jabatanSummary.innerHTML = Object.entries(jabatanCount)
        .map(([jabatan, count]) => `<div>${jabatan}: ${count}</div>`)
        .join('');
    
    // Status summary
    const statusCount = {};
    employees.forEach(emp => {
        const status = emp.status || 'Non PNS';
        statusCount[status] = (statusCount[status] || 0) + 1;
    });
    
    const statusSummary = document.getElementById('status-summary');
    statusSummary.innerHTML = Object.entries(statusCount)
        .map(([status, count]) => `<div>${status}: ${count}</div>`)
        .join('');
    
    // Golongan summary
    const golonganCount = {};
    employees.forEach(emp => {
        if (emp.golongan) {
            golonganCount[emp.golongan] = (golonganCount[emp.golongan] || 0) + 1;
        }
    });
    
    const golonganSummary = document.getElementById('golongan-summary');
    golonganSummary.innerHTML = Object.entries(golonganCount)
        .map(([golongan, count]) => `<div>Golongan ${golongan}: ${count}</div>`)
        .join('');
}

// Generate PDF
function generatePDF(type) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(16);
    doc.text('BADAN PENANGGULANGAN BENCANA DAERAH', 105, 20, { align: 'center' });
    doc.text('KOTA TIDORE KEPULAUAN', 105, 30, { align: 'center' });
    doc.setFontSize(14);
    doc.text('DATA PEGAWAI', 105, 40, { align: 'center' });
    
    let yPosition = 60;
    
    if (type === 'single' && currentEmployeeId) {
        const employee = employees.find(emp => emp.id === currentEmployeeId);
        if (employee) {
            doc.setFontSize(12);
            doc.text(`Nama: ${employee.nama}`, 20, yPosition);
            yPosition += 10;
            doc.text(`NIP: ${employee.nip || '-'}`, 20, yPosition);
            yPosition += 10;
            doc.text(`Jabatan: ${employee.jabatan}`, 20, yPosition);
            yPosition += 10;
            doc.text(`Golongan: ${employee.golongan || '-'}`, 20, yPosition);
            yPosition += 10;
            doc.text(`Tempat Lahir: ${employee.tempatLahir || '-'}`, 20, yPosition);
            yPosition += 10;
            doc.text(`Tanggal Lahir: ${employee.tanggalLahir ? new Date(employee.tanggalLahir).toLocaleDateString('id-ID') : '-'}`, 20, yPosition);
            yPosition += 10;
            doc.text(`Alamat: ${employee.alamat || '-'}`, 20, yPosition);
        }
        doc.save(`Data_Pegawai_${employee.nama.replace(/\s+/g, '_')}.pdf`);
    } else {
        doc.setFontSize(10);
        employees.forEach((employee, index) => {
            if (yPosition > 250) {
                doc.addPage();
                yPosition = 20;
            }
            
            doc.text(`${index + 1}. ${employee.nama}`, 20, yPosition);
            yPosition += 6;
            doc.text(`   NIP: ${employee.nip || '-'}`, 20, yPosition);
            yPosition += 6;
            doc.text(`   Jabatan: ${employee.jabatan}`, 20, yPosition);
            yPosition += 6;
            doc.text(`   Golongan: ${employee.golongan || '-'}`, 20, yPosition);
            yPosition += 10;
        });
        
        doc.save('Data_Semua_Pegawai_BPBD.pdf');
    }
}

// Print Report
function printReport() {
    window.print();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('employee-modal');
    if (event.target === modal) {
        closeModal();
    }
}// Updat
e Current Date
function updateCurrentDate() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    document.getElementById('current-date').textContent = now.toLocaleDateString('id-ID', options);
}

// Update Dashboard
function updateDashboard() {
    // Update statistics
    document.getElementById('dash-total-employees').textContent = employees.length;
    
    // Count by status
    const pnsCount = employees.filter(emp => emp.status === 'PNS').length;
    const pppkCount = employees.filter(emp => emp.status === 'PPPK').length;
    const nonPnsCount = employees.filter(emp => !emp.status || emp.status === 'Non PNS').length;
    
    document.getElementById('dash-pns').textContent = pnsCount;
    document.getElementById('dash-pppk').textContent = pppkCount;
    document.getElementById('dash-non-pns').textContent = nonPnsCount;
    
    // Count pimpinan vs staff
    const pimpinanJabatan = ['Kepala Pelaksana BPBD', 'Sekretaris', 'Kepala Sub Bagian Perencanaan dan Keuangan', 'Kepala Sub Bagian Umum dan Kepegawaian', 'Kepala Bidang Pencegahan dan Kesiapsiagaan', 'Kepala Bidang Kedaruratan dan Logistik', 'Kepala Bidang Rehabilitasi dan Rekonstruksi'];
    const pimpinanCount = employees.filter(emp => pimpinanJabatan.includes(emp.jabatan)).length;
    const staffCount = employees.length - pimpinanCount;
    
    document.getElementById('dash-pimpinan').textContent = pimpinanCount;
    document.getElementById('dash-staff').textContent = staffCount;
    
    // Update charts
    updateJabatanChart();
    updateStatusChart();
    updateGolonganChart();
    
    // Update recent activities
    updateRecentActivities();
}

// Update Jabatan Chart
function updateJabatanChart() {
    const ctx = document.getElementById('jabatan-chart').getContext('2d');
    
    if (jabatanChart) {
        jabatanChart.destroy();
    }
    
    const jabatanCount = {};
    employees.forEach(emp => {
        jabatanCount[emp.jabatan] = (jabatanCount[emp.jabatan] || 0) + 1;
    });
    
    const labels = Object.keys(jabatanCount);
    const data = Object.values(jabatanCount);
    
    jabatanChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    '#ff6700', '#ff8533', '#ffb366', '#ffd199',
                    '#28a745', '#20c997', '#17a2b8', '#6f42c1',
                    '#e83e8c', '#fd7e14', '#ffc107', '#dc3545'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        padding: 10,
                        font: {
                            size: 10
                        }
                    }
                }
            }
        }
    });
}

// Update Status Chart
function updateStatusChart() {
    const ctx = document.getElementById('status-chart').getContext('2d');
    
    if (statusChart) {
        statusChart.destroy();
    }
    
    const statusCount = {
        'PNS': employees.filter(emp => emp.status === 'PNS').length,
        'PPPK': employees.filter(emp => emp.status === 'PPPK').length,
        'Non PNS': employees.filter(emp => !emp.status || emp.status === 'Non PNS').length
    };
    
    statusChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(statusCount),
            datasets: [{
                label: 'Jumlah Pegawai',
                data: Object.values(statusCount),
                backgroundColor: ['#28a745', '#007bff', '#ffc107'],
                borderColor: ['#1e7e34', '#0056b3', '#e0a800'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

// Update Golongan Chart
function updateGolonganChart() {
    const ctx = document.getElementById('golongan-chart').getContext('2d');
    
    if (golonganChart) {
        golonganChart.destroy();
    }
    
    const golonganCount = {};
    employees.forEach(emp => {
        if (emp.golongan) {
            const group = emp.golongan.charAt(0);
            golonganCount[`Golongan ${group}`] = (golonganCount[`Golongan ${group}`] || 0) + 1;
        }
    });
    
    const labels = Object.keys(golonganCount);
    const data = Object.values(golonganCount);
    
    if (labels.length > 0) {
        golonganChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Jumlah Pegawai',
                    data: data,
                    borderColor: '#ff6700',
                    backgroundColor: 'rgba(255, 103, 0, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }
}

// Add Activity
function addActivity(type, employeeName) {
    const activity = {
        id: Date.now(),
        type: type,
        employeeName: employeeName,
        user: currentUser ? currentUser.name : 'System',
        timestamp: new Date().toISOString()
    };
    
    activities.unshift(activity);
    
    // Keep only last 10 activities
    if (activities.length > 10) {
        activities = activities.slice(0, 10);
    }
    
    localStorage.setItem('activities', JSON.stringify(activities));
}

// Update Recent Activities
function updateRecentActivities() {
    const container = document.getElementById('recent-activities');
    
    if (activities.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-history"></i>
                <h3>Belum ada aktivitas</h3>
                <p>Aktivitas terbaru akan muncul di sini</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = activities.map(activity => {
        const timeAgo = getTimeAgo(new Date(activity.timestamp));
        let icon, action, description;
        
        switch(activity.type) {
            case 'add':
                icon = 'fa-user-plus';
                action = 'Menambahkan data pegawai';
                description = activity.employeeName;
                break;
            case 'update':
                icon = 'fa-user-edit';
                action = 'Memperbarui data pegawai';
                description = activity.employeeName;
                break;
            case 'delete':
                icon = 'fa-user-minus';
                action = 'Menghapus data pegawai';
                description = activity.employeeName;
                break;
            case 'login':
                icon = 'fa-sign-in-alt';
                action = 'Login sistem';
                description = activity.employeeName;
                break;
            case 'logout':
                icon = 'fa-sign-out-alt';
                action = 'Logout sistem';
                description = activity.employeeName;
                break;
            default:
                icon = 'fa-info';
                action = 'Aktivitas';
                description = activity.employeeName;
        }
        
        return `
            <div class="recent-item">
                <div class="recent-icon">
                    <i class="fas ${icon}"></i>
                </div>
                <div class="recent-info">
                    <h4>${action}</h4>
                    <p>${description} ${activity.user ? '- oleh ' + activity.user : ''}</p>
                </div>
                <div class="recent-time">${timeAgo}</div>
            </div>
        `;
    }).join('');
}

// Get Time Ago
function getTimeAgo(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
        return 'Baru saja';
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} menit yang lalu`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} jam yang lalu`;
    } else {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} hari yang lalu`;
    }
}
// Qu
ick Login Function
function quickLogin(userType) {
    console.log('Quick login for:', userType); // Debug
    
    const credentials = {
        'admin': { username: 'admin', password: 'admin123' },
        'user': { username: 'user', password: 'user123' }
    };
    
    if (credentials[userType]) {
        document.getElementById('username').value = credentials[userType].username;
        document.getElementById('password').value = credentials[userType].password;
        
        // Call login function directly
        const fakeEvent = { preventDefault: () => {} };
        handleLoginClick(fakeEvent);
    }
}// Add Ent
er key support for login inputs
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        
        if (usernameInput) {
            usernameInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleLoginClick(e);
                }
            });
        }
        
        if (passwordInput) {
            passwordInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleLoginClick(e);
                }
            });
        }
    }, 100);
});

// Test function to verify login works
function testLogin() {
    console.log('Testing login function...');
    document.getElementById('username').value = 'admin';
    document.getElementById('password').value = 'admin123';
    const fakeEvent = { preventDefault: () => {} };
    handleLoginClick(fakeEvent);
}// Simple
 Logout Function
function logout() {
    if (confirm('Yakin ingin logout?')) {
        currentUser = null;
        localStorage.removeItem('currentUser');
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        showLoginScreen();
    }
}// Fix for 
missing functions and ensure everything works after login
window.addEventListener('load', function() {
    // Ensure all functions are available globally
    window.showTab = showTab;
    window.editLogo = editLogo;
    window.logout = logout;
    window.generatePDF = generatePDF;
    window.printReport = printReport;
    window.searchEmployee = searchEmployee;
    window.filterByJabatan = filterByJabatan;
    window.filterByStatus = filterByStatus;
    window.filterByGolongan = filterByGolongan;
    window.previewImage = previewImage;
    window.showEmployeeDetail = showEmployeeDetail;
    window.closeModal = closeModal;
    window.editEmployee = editEmployee;
    window.deleteEmployee = deleteEmployee;
    window.editEmployeeFromCard = editEmployeeFromCard;
    window.deleteEmployeeFromCard = deleteEmployeeFromCard;
    window.updateLogo = updateLogo;
    
    console.log('All functions loaded and available globally');
});

// Ensure charts are properly initialized
function ensureChartsLoaded() {
    if (typeof Chart !== 'undefined') {
        console.log('Chart.js is loaded');
        return true;
    } else {
        console.log('Chart.js not loaded yet, retrying...');
        setTimeout(ensureChartsLoaded, 100);
        return false;
    }
}

// Enhanced initializeMainApp with better error handling
function initializeMainApp() {
    console.log('Initializing main app...');
    
    try {
        // Initialize selects
        if (typeof initializeSelects === 'function') {
            initializeSelects();
        }
        
        // Display employees
        if (typeof displayEmployees === 'function') {
            displayEmployees();
        }
        
        // Update summary
        if (typeof updateSummary === 'function') {
            updateSummary();
        }
        
        // Update current date
        if (typeof updateCurrentDate === 'function') {
            updateCurrentDate();
        }
        
        // Initialize dashboard with delay to ensure DOM is ready
        setTimeout(() => {
            if (typeof updateDashboard === 'function') {
                updateDashboard();
            }
        }, 200);
        
        // Add employee form event listener
        const employeeForm = document.getElementById('employee-form');
        if (employeeForm && !employeeForm.hasAttribute('data-listener-added')) {
            employeeForm.addEventListener('submit', handleFormSubmit);
            employeeForm.setAttribute('data-listener-added', 'true');
            console.log('Employee form event listener added');
        }
        
        console.log('Main app initialized successfully');
    } catch (error) {
        console.error('Error initializing main app:', error);
    }
}

// Initialize Select Options (simplified since options are now in HTML)
function initializeSelects() {
    console.log('Select options are already loaded in HTML');
    return true;
        });
    });
}

// Display Employees
function displayEmployees(filteredEmployees = null) {
    console.log('Displaying employees...');
    
    const grid = document.getElementById('employee-grid');
    if (!grid) {
        console.error('Employee grid not found');
        return;
    }
    
    // Always reload from localStorage to get latest data
    employees = JSON.parse(localStorage.getItem('employees')) || [];
    console.log('Loaded employees from localStorage:', employees.length);
    
    const employeesToShow = filteredEmployees || employees;
    
    if (employeesToShow.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #666; grid-column: 1/-1;">Belum ada data pegawai</p>';
        return;
    }
    
    grid.innerHTML = employeesToShow.map(employee => `
        <div class="employee-card" onclick="showEmployeeDetail(${employee.id})">
            <img src="${employee.foto || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiNkZGQiLz4KPHN2ZyB4PSIyNSIgeT0iMjAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAxMmMyLjIxIDAgNC0xLjc5IDQtNHMtMS43OS00LTQtNC00IDEuNzktNCA0IDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz4KPC9zdmc+Cjwvc3ZnPg=='}" 
                 alt="${employee.nama}" class="employee-photo">
            <h3>${employee.nama}</h3>
            <div class="jabatan">${employee.jabatan}</div>
            <div class="nip">${employee.nip || 'NIP: -'}</div>
            <span class="status-badge ${employee.status ? employee.status.toLowerCase().replace(' ', '-') : 'non-pns'}">${employee.status || 'Non PNS'}</span>
        </div>
    `).join('');
}

// Save employees to localStorage
function saveEmployees() {
    localStorage.setItem('employees', JSON.stringify(employees));
}

// Search and Filter Functions
window.searchEmployeeFunc = function() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filtered = employees.filter(emp => 
        emp.nama.toLowerCase().includes(searchTerm) ||
        (emp.nip && emp.nip.toLowerCase().includes(searchTerm)) ||
        emp.jabatan.toLowerCase().includes(searchTerm) ||
        (emp.status && emp.status.toLowerCase().includes(searchTerm))
    );
    displayEmployees(filtered);
};

window.filterByJabatanFunc = function() {
    const jabatan = document.getElementById('jabatan-filter').value;
    if (!jabatan) {
        displayEmployees();
        return;
    }
    const filtered = employees.filter(emp => emp.jabatan === jabatan);
    displayEmployees(filtered);
};

window.filterByStatusFunc = function() {
    const status = document.getElementById('status-filter').value;
    if (!status) {
        displayEmployees();
        return;
    }
    const filtered = employees.filter(emp => emp.status === status);
    displayEmployees(filtered);
};

window.filterByGolonganFunc = function() {
    const golongan = document.getElementById('golongan-filter').value;
    if (!golongan) {
        displayEmployees();
        return;
    }
    const filtered = employees.filter(emp => emp.golongan === golongan);
    displayEmployees(filtered);
};

// Update Summary
function updateSummary() {
    console.log('Updating summary...');
    
    // Always reload from localStorage to get latest data
    employees = JSON.parse(localStorage.getItem('employees')) || [];
    console.log('Summary: Loaded employees from localStorage:', employees.length);
    
    const totalElement = document.getElementById('total-employees');
    if (totalElement) {
        totalElement.textContent = employees.length;
    }
    
    // Jabatan summary
    const jabatanCount = {};
    employees.forEach(emp => {
        jabatanCount[emp.jabatan] = (jabatanCount[emp.jabatan] || 0) + 1;
    });
    
    const jabatanSummary = document.getElementById('jabatan-summary');
    if (jabatanSummary) {
        jabatanSummary.innerHTML = Object.entries(jabatanCount)
            .map(([jabatan, count]) => `<div>${jabatan}: ${count}</div>`)
            .join('');
    }
    
    // Status summary
    const statusCount = {};
    employees.forEach(emp => {
        const status = emp.status || 'Non PNS';
        statusCount[status] = (statusCount[status] || 0) + 1;
    });
    
    const statusSummary = document.getElementById('status-summary');
    if (statusSummary) {
        statusSummary.innerHTML = Object.entries(statusCount)
            .map(([status, count]) => `<div>${status}: ${count}</div>`)
            .join('');
    }
    
    // Golongan summary
    const golonganCount = {};
    employees.forEach(emp => {
        if (emp.golongan) {
            golonganCount[emp.golongan] = (golonganCount[emp.golongan] || 0) + 1;
        }
    });
    
    const golonganSummary = document.getElementById('golongan-summary');
    if (golonganSummary) {
        golonganSummary.innerHTML = Object.entries(golonganCount)
            .map(([golongan, count]) => `<div>Golongan ${golongan}: ${count}</div>`)
            .join('');
    }
}

// Update Current Date
function updateCurrentDate() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        dateElement.textContent = now.toLocaleDateString('id-ID', options);
    }
}

// Update Dashboard
function updateDashboard() {
    console.log('Updating dashboard...');
    
    // Always reload from localStorage to get latest data
    employees = JSON.parse(localStorage.getItem('employees')) || [];
    console.log('Dashboard: Loaded employees from localStorage:', employees.length);
    
    // Update statistics
    const totalElement = document.getElementById('dash-total-employees');
    if (totalElement) {
        totalElement.textContent = employees.length;
    }
    
    // Count by status
    const pnsCount = employees.filter(emp => emp.status === 'PNS').length;
    const pppkCount = employees.filter(emp => emp.status === 'PPPK').length;
    const nonPnsCount = employees.filter(emp => !emp.status || emp.status === 'Non PNS').length;
    
    const pnsElement = document.getElementById('dash-pns');
    const pppkElement = document.getElementById('dash-pppk');
    const nonPnsElement = document.getElementById('dash-non-pns');
    
    if (pnsElement) pnsElement.textContent = pnsCount;
    if (pppkElement) pppkElement.textContent = pppkCount;
    if (nonPnsElement) nonPnsElement.textContent = nonPnsCount;
    
    // Count pimpinan vs staff
    const pimpinanJabatan = ['Kepala Pelaksana BPBD', 'Sekretaris', 'Kepala Sub Bagian Perencanaan dan Keuangan', 'Kepala Sub Bagian Umum dan Kepegawaian', 'Kepala Bidang Pencegahan dan Kesiapsiagaan', 'Kepala Bidang Kedaruratan dan Logistik', 'Kepala Bidang Rehabilitasi dan Rekonstruksi'];
    const pimpinanCount = employees.filter(emp => pimpinanJabatan.includes(emp.jabatan)).length;
    const staffCount = employees.length - pimpinanCount;
    
    const pimpinanElement = document.getElementById('dash-pimpinan');
    const staffElement = document.getElementById('dash-staff');
    
    if (pimpinanElement) pimpinanElement.textContent = pimpinanCount;
    if (staffElement) staffElement.textContent = staffCount;
}

// Duplicate functions removed - using the complete implementations above
    console.log('Edit employee function called');
}

function deleteEmployee() {
    // Implementation for deleting employee
    console.log('Delete employee function called');
}

// Initialize Main App
function initializeMainApp() {
    console.log('Initializing main app...');
    
    try {
        // Initialize selects
        initializeSelects();
        
        // Display employees
        displayEmployees();
        
        // Update summary
        updateSummary();
        
        // Update current date
        updateCurrentDate();
        
        // Update dashboard
        setTimeout(() => {
            updateDashboard();
        }, 200);
        
        // Add employee form event listener
        const employeeForm = document.getElementById('employee-form');
        if (employeeForm && !employeeForm.hasAttribute('data-listener-added')) {
            employeeForm.addEventListener('submit', handleFormSubmit);
            employeeForm.setAttribute('data-listener-added', 'true');
            console.log('Employee form event listener added');
        }
        
        console.log('Main app initialized successfully');
    } catch (error) {
        console.error('Error initializing main app:', error);
    }
}

// Load custom logo on page load
window.addEventListener('load', function() {
    const customLogo = localStorage.getItem('customLogo');
    if (customLogo) {
        const logoElement = document.getElementById('logo');
        if (logoElement) {
            logoElement.src = customLogo;
        }
    }
});/
/ Global function to refresh all data displays
function refreshAllData() {
    console.log('Refreshing all data displays...');
    
    // Reload employees from localStorage
    employees = JSON.parse(localStorage.getItem('employees')) || [];
    
    // Update all displays
    if (typeof displayEmployees === 'function') {
        displayEmployees();
    }
    
    if (typeof updateDashboard === 'function') {
        updateDashboard();
    }
    
    if (typeof updateSummary === 'function') {
        updateSummary();
    }
    
    if (typeof updateCurrentDate === 'function') {
        updateCurrentDate();
    }
    
    console.log('All data displays refreshed');
}

// Make refreshAllData available globally
window.refreshAllData = refreshAllData;// 
Function to update global employees variable
function updateGlobalEmployees(newEmployees) {
    employees = newEmployees;
    console.log('Global employees variable updated:', employees.length);
}

// Make it available globally
window.updateGlobalEmployees = updateGlobalEmployees;

// Function to force reload all data from localStorage
function forceReloadData() {
    employees = JSON.parse(localStorage.getItem('employees')) || [];
    console.log('Force reloaded employees from localStorage:', employees.length);
    
    // Update all displays
    displayEmployees();
    updateDashboard();
    updateSummary();
    updateCurrentDate();
}

// Make it available globally
window.forceReloadData = forceReloadData;

// Make all employee functions globally available
window.showEmployeeDetail = showEmployeeDetail;
window.closeModal = closeModal;
window.editEmployee = editEmployee;
window.deleteEmployee = deleteEmployee;
window.editEmployeeFromCard = editEmployeeFromCard;
window.deleteEmployeeFromCard = deleteEmployeeFromCard;

console.log('Employee functions made globally available:', {
    showEmployeeDetail: typeof window.showEmployeeDetail,
    editEmployeeFromCard: typeof window.editEmployeeFromCard,
    deleteEmployeeFromCard: typeof window.deleteEmployeeFromCard
});