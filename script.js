// BloodBank Cloud - Complete Dashboard System
// Data stored in localStorage simulating cloud database

// Global data stores
let donors = JSON.parse(localStorage.getItem('donors')) || [];
let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
let requests = JSON.parse(localStorage.getItem('requests')) || [];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  loadAllData();
  setupEventListeners();
});

// Navigation
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      
      // Update active link
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      // Show target section
      sections.forEach(s => s.classList.remove('active'));
      document.getElementById(targetId).classList.add('active');
    });
  });

  // Mobile hamburger menu
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// Load all data and update UI
function loadAllData() {
  updateDashboardStats();
  renderDonorsTable();
  renderInventory();
  renderRequests();
}

// Dashboard Stats
function updateDashboardStats() {
  document.getElementById('totalDonors').textContent = donors.length;
  document.getElementById('totalUnits').textContent = inventory.reduce((sum, item) => sum + item.units, 0);
  document.getElementById('urgentRequests').textContent = requests.filter(r => r.urgency === 'high').length;
}

// Donors Table
function renderDonorsTable(filteredDonors = donors) {
  const tbody = document.getElementById('donorsTableBody');
  tbody.innerHTML = '';
  
  filteredDonors.forEach(donor => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${donor.name}</td>
      <td><span class="blood-badge">${donor.bloodGroup}</span></td>
      <td>${donor.location}</td>
      <td>${donor.lastDonation || 'Never'}</td>
      <td>${donor.phone}</td>
      <td>
        <button class="btn-small" onclick="viewDonor(${donor.id})">View</button>
        <button class="btn-small danger" onclick="deleteDonor(${donor.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function searchDonors() {
  const searchTerm = document.getElementById('donorSearch').value.toLowerCase();
  const filtered = donors.filter(donor => 
    donor.name.toLowerCase().includes(searchTerm) ||
    donor.bloodGroup.toLowerCase().includes(searchTerm) ||
    donor.location.toLowerCase().includes(searchTerm)
  );
  renderDonorsTable(filtered);
}

// Donor Registration Form
document.getElementById('donorForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const newDonor = {
    id: Date.now(),
    name: document.getElementById('donorName').value,
    bloodGroup: document.getElementById('bloodGroup').value,
    dob: document.getElementById('dob').value,
    location: document.getElementById('location').value,
    phone: document.getElementById('phone').value,
    email: document.getElementById('email').value,
    weight: document.getElementById('weight').value,
    lastDonation: null,
    createdAt: new Date().toISOString()
  };
  
  donors.push(newDonor);
  saveData();
  this.reset();
  updateDashboardStats();
  renderDonorsTable();
  showNotification('Donor registered successfully!', 'success');
});

// Inventory Management
function renderInventory() {
  const grid = document.getElementById('inventoryGrid');
  grid.innerHTML = '';
  
  inventory.forEach(item => {
    const card = document.createElement('div');
    card.className = 'inventory-card';
    card.innerHTML = `
      <div class="inventory-blood-group">${item.bloodGroup}</div>
      <div class="inventory-units">${item.units}</div>
      <div class="inventory-components">${item.components.join(', ')}</div>
      <div class="inventory-expiry">Expires: ${new Date(item.expiry).toLocaleDateString()}</div>
      <div class="inventory-status ${item.testResults}">${item.testResults.toUpperCase()}</div>
    `;
    grid.appendChild(card);
  });
}

function showAddInventoryModal() {
  document.getElementById('addInventoryModal').style.display = 'block';
}

document.getElementById('inventoryForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const components = Array.from(document.querySelectorAll('input[name="components"]:checked')).map(cb => cb.value);
  
  const newInventory = {
    id: Date.now(),
    bloodGroup: document.getElementById('invBloodGroup').value,
    units: parseInt(document.getElementById('invUnits').value),
    components,
    batchNumber: document.getElementById('batchNumber').value,
    donorId: document.getElementById('donorId').value,
    testResults: document.getElementById('testResults').value,
    expiry: document.getElementById('invExpiry').value
  };
  
  inventory.push(newInventory);
  saveData();
  this.reset();
  document.getElementById('addInventoryModal').style.display = 'none';
  renderInventory();
  updateDashboardStats();
  showNotification('Inventory updated!', 'success');
});

// Requests Management
function renderRequests() {
  const list = document.getElementById('requestsList');
  list.innerHTML = '';
  
  requests.forEach(request => {
    const card = document.createElement('div');
    card.className = `request-card urgency-${request.urgency}`;
    card.innerHTML = `
      <div class="request-header">
        <span class="blood-badge">${request.bloodGroup}</span>
        <span class="urgency-badge">${request.urgency.toUpperCase()}</span>
      </div>
      <h4>${request.patientName}</h4>
      <p>${request.hospital} - ${request.units} units</p>
      <p class="request-location">${request.requestLocation}</p>
    `;
    list.appendChild(card);
  });
}

function showAddRequestModal() {
  document.getElementById('addRequestModal').style.display = 'block';
}

document.getElementById('requestForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const newRequest = {
    id: Date.now(),
    patientName: document.getElementById('patientName').value,
    bloodGroup: document.getElementById('reqBloodGroup').value,
    units: parseInt(document.getElementById('reqUnits').value),
    hospital: document.getElementById('hospital').value,
    requestLocation: document.getElementById('requestLocation').value,
    urgency: document.getElementById('urgency').value,
    createdAt: new Date().toISOString(),
    status: 'pending'
  };
  
  requests.push(newRequest);
  saveData();
  this.reset();
  document.getElementById('addRequestModal').style.display = 'none';
  renderRequests();
  updateDashboardStats();
  showNotification('Request created!', 'success');
});

// Utility Functions
function saveData() {
  localStorage.setItem('donors', JSON.stringify(donors));
  localStorage.setItem('inventory', JSON.stringify(inventory));
  localStorage.setItem('requests', JSON.stringify(requests));
}

function showNotification(message, type = 'success') {
  // Simple notification - can be enhanced with toast library
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed; top: 20px; right: 20px; padding: 1rem 2rem;
    background: ${type === 'success' ? 'var(--success)' : 'var(--danger)'};
    color: white; border-radius: 10px; box-shadow: var(--shadow);
    z-index: 3000; transform: translateX(400px); transition: all 0.3s;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  setTimeout(() => {
    document.body.removeChild(notification);
  }, 3000);
}

function viewDonor(id) {
  const donor = donors.find(d => d.id === id);
  alert(`Donor Details:\n\n${JSON.stringify(donor, null, 2)}`);
}

function deleteDonor(id) {
  if (confirm('Delete this donor?')) {
    donors = donors.filter(d => d.id !== id);
    saveData();
    renderDonorsTable();
    updateDashboardStats();
    showNotification('Donor deleted', 'danger');
  }
}

// Modal close handlers
document.querySelectorAll('.close').forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    closeBtn.closest('.modal').style.display = 'none';
  });
});

window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    e.target.style.display = 'none';
  }
});

// Demo data loader (remove in production)
function loadDemoData() {
  if (donors.length === 0) {
    donors = [
      {id: 1, name: 'John Doe', bloodGroup: 'O+', location: 'NYC', phone: '+1-555-1234', lastDonation: '2024-01-15'},
      {id: 2, name: 'Jane Smith', bloodGroup: 'A-', location: 'LA', phone: '+1-555-5678', lastDonation: '2024-02-01'}
    ];
    inventory = [
      {id: 1, bloodGroup: 'O+', units: 25, components: ['Whole Blood'], testResults: 'pass', expiry: '2024-06-01'}
    ];
    requests = [
      {id: 1, patientName: 'Emergency Patient', bloodGroup: 'O-', units: 4, hospital: 'Central Hospital', requestLocation: 'Downtown', urgency: 'high'}
    ];
    saveData();
    loadAllData();
  }
}

// Auto-load demo data on first visit
loadDemoData();

function setupEventListeners() {
  // Search input live search
  document.getElementById('donorSearch').addEventListener('input', function() {
    searchDonors();
  });
}
