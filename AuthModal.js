// Staff Registration & Auth Modal Component

function renderAuthModal(containerId, store) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div id="staff-auth-modal" class="hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div class="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto my-8">
        
        <div class="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <span class="badge badge-purple text-[10px] uppercase font-bold tracking-wider">Staff Onboarding</span>
            <h3 class="text-xl font-bold text-slate-800 mt-1">Staff Member Registration Form</h3>
            <p class="text-xs text-slate-500">Submitted registrations enter 'Pending Verification' status until approved by Super Admin.</p>
          </div>
          <button id="close-auth-modal-btn" class="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <form id="staff-registration-form" class="space-y-4 text-xs">
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="form-label">Full Name *</label>
              <input type="text" id="reg-name" required placeholder="e.g. Dr. Ramesh Gupta" class="form-input">
            </div>
            <div>
              <label class="form-label">Employee ID *</label>
              <input type="text" id="reg-emp-id" required placeholder="e.g. EMP-2026-904" class="form-input">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="form-label">Email Address *</label>
              <input type="email" id="reg-email" required placeholder="name@college.edu" class="form-input">
            </div>
            <div>
              <label class="form-label">Phone Number *</label>
              <input type="tel" id="reg-phone" required placeholder="+91 98765 43210" class="form-input">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="form-label">Date of Birth</label>
              <input type="date" id="reg-dob" value="1985-06-15" class="form-input">
            </div>
            <div>
              <label class="form-label">Gender</label>
              <select id="reg-gender" class="form-select">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label class="form-label">Hostel / Block</label>
              <select id="reg-hostel" class="form-select">
                <option value="All Blocks">All Blocks</option>
                <option value="Block A (Boys)">Block A (Boys)</option>
                <option value="Block B (Girls)">Block B (Girls)</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="form-label">Role *</label>
              <select id="reg-role" required class="form-select">
                <option value="Warden">Warden</option>
                <option value="Plumber Head">Plumber Head</option>
                <option value="Electricity Head">Electricity Head</option>
                <option value="Maintenance Head">Maintenance Head</option>
                <option value="Mess/Food Head">Mess/Food Head</option>
                <option value="Housekeeping Head">Housekeeping Head</option>
                <option value="Security Guard">Security Guard</option>
                <option value="Security Head">Security Head</option>
                <option value="Other Staff">Other Staff</option>
              </select>
            </div>
            <div>
              <label class="form-label">Department *</label>
              <input type="text" id="reg-dept" required placeholder="e.g. Hostel Administration" class="form-input">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="form-label">Designation</label>
              <input type="text" id="reg-designation" placeholder="e.g. Senior Hostel Superintendent" class="form-input">
            </div>
            <div>
              <label class="form-label">Emergency Contact Phone</label>
              <input type="tel" id="reg-emergency" placeholder="+91 98765 00000" class="form-input">
            </div>
          </div>

          <div>
            <label class="form-label">Address</label>
            <input type="text" id="reg-address" placeholder="Staff Quarters, Campus Sector 1" class="form-input">
          </div>

          <div>
            <label class="form-label">Password *</label>
            <input type="password" id="reg-password" required value="Password123" class="form-input">
          </div>

          <div class="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button type="button" id="cancel-auth-btn" class="btn-secondary text-xs">Cancel</button>
            <button type="submit" class="btn-primary text-xs font-bold py-2.5 px-5">Submit Registration</button>
          </div>

        </form>

      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  const modal = document.getElementById('staff-auth-modal');
  const closeBtn = document.getElementById('close-auth-modal-btn');
  const cancelBtn = document.getElementById('cancel-auth-btn');
  const form = document.getElementById('staff-registration-form');

  window.openRegisterModal = () => {
    if (modal) modal.classList.remove('hidden');
  };

  const closeModal = () => {
    if (modal) modal.classList.add('hidden');
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const newStaff = store.registerStaff({
        name: document.getElementById('reg-name').value,
        employeeId: document.getElementById('reg-emp-id').value,
        email: document.getElementById('reg-email').value,
        phone: document.getElementById('reg-phone').value,
        gender: document.getElementById('reg-gender').value,
        hostel: document.getElementById('reg-hostel').value,
        role: document.getElementById('reg-role').value,
        department: document.getElementById('reg-dept').value,
        designation: document.getElementById('reg-designation').value,
        address: document.getElementById('reg-address').value
      });

      alert(`✓ Registration submitted for ${newStaff.name}!\nStatus: Pending Verification.\nSuper Admin can now approve your account.`);
      closeModal();
      window.renderApp();
    });
  }
}

window.renderAuthModal = renderAuthModal;
