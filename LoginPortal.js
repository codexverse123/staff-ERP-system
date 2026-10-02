// Staff Login Portal Component for Staff Login using Employee ID / Email & Password

function renderLoginPortal(containerId, store) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const demoAccounts = [
    { label: 'Warden (Abhijeet das)', id: 'EMP-1001', role: 'Warden', icon: 'shield-check' },
    { label: 'Super Admin(Gurupreet singh)', id: 'EMP-0001', role: 'Super Admin', icon: 'shield-alert' },
    { label: 'Plumber Head (Rajesh Kumar)', id: 'EMP-2001', role: 'Plumber Head', icon: 'wrench' },
    { label: 'Electricity Head (Vikram Singh)', id: 'EMP-2002', role: 'Electricity Head', icon: 'zap' },
    { label: 'Maintenance Head (Saranga pallei)', id: 'EMP-2003', role: 'Maintenance Head', icon: 'tool' },
    { label: 'Mess/Food Head (Arun patel)', id: 'EMP-2004', role: 'Mess/Food Head', icon: 'utensils' },
    { label: 'Housekeeping Head (Brijesh kumar)', id: 'EMP-2005', role: 'Housekeeping Head', icon: 'sparkles' },
    { label: 'Security Guard (Ramakant)', id: 'SEC-3001', role: 'Security Guard', icon: 'shield' },
    { label: 'Pending Staff (Priya Sharma)', id: 'EMP-4001', role: 'Pending Verification', icon: 'clock' }
  ];

  container.innerHTML = `
    <div class="animate-fade-in max-w-xl mx-auto space-y-6 py-6">
      
      <!-- Login Card Header -->
      <div class="card space-y-6 shadow-xl border border-slate-100">
        
        <div class="text-center space-y-2 border-b border-slate-100 pb-5">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-md shadow-blue-500/20">
            <i data-lucide="lock" class="w-7 h-7"></i>
          </div>
          <h2 class="text-2xl font-extrabold text-slate-800 tracking-tight">Staff ERP Login Portal</h2>
          <p class="text-xs text-slate-500 max-w-sm mx-auto">Enter your assigned Employee ID or registered Email Address & Password to access your staff dashboard.</p>
        </div>

        <!-- Dynamic Error Banner -->
        <div id="login-error-banner" class="hidden p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 space-y-1 animate-fade-in">
          <div class="font-bold flex items-center gap-1.5">
            <i data-lucide="alert-triangle" class="w-4 h-4 text-red-600"></i> Authentication Failed
          </div>
          <p id="login-error-message" class="text-[11px] text-red-600"></p>
        </div>

        <!-- Login Form -->
        <form id="staff-login-form" class="space-y-4">
          
          <div>
            <label class="form-label font-bold text-xs flex items-center gap-1.5">
              <i data-lucide="user-check" class="w-3.5 h-3.5 text-blue-600"></i> Employee ID or Email Address
            </label>
            <input type="text" id="login-identifier" required placeholder="e.g. EMP-1001 or warden@college.edu" class="form-input text-xs font-semibold">
          </div>

          <div>
            <label class="form-label font-bold text-xs flex items-center justify-between">
              <span class="flex items-center gap-1.5"><i data-lucide="key" class="w-3.5 h-3.5 text-blue-600"></i> Password</span>
              <span class="text-[10px] text-slate-400 font-normal">Default: Password123</span>
            </label>
            <div class="relative">
              <input type="password" id="login-password" required value="Password123" placeholder="Enter password" class="form-input text-xs pr-10 font-semibold">
              <button type="button" id="toggle-password-btn" class="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600">
                <i data-lucide="eye" class="w-4 h-4"></i>
              </button>
            </div>
          </div>

          <button type="submit" class="w-full btn-primary text-xs py-3 font-bold rounded-xl shadow-md shadow-blue-500/20 flex items-center justify-center gap-2">
            <i data-lucide="log-in" class="w-4 h-4"></i> Log In to Staff Portal
          </button>

        </form>

        <!-- Demo Account Quick Picker Pill Grid -->
        <div class="pt-4 border-t border-slate-100 space-y-2.5">
          <div class="flex items-center justify-between">
            <span class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Quick Demo Login Shortcuts:</span>
            <span class="text-[10px] text-blue-600 font-semibold">Click to Autofill</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            ${demoAccounts.map(acc => `
              <button type="button" class="demo-login-pill border border-slate-200 hover:border-blue-500 bg-slate-50 hover:bg-blue-50 text-slate-700 text-xs p-2.5 rounded-xl flex items-center gap-2 transition-all text-left" data-empid="${acc.id}">
                <div class="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <i data-lucide="${acc.icon}" class="w-3.5 h-3.5"></i>
                </div>
                <div class="overflow-hidden">
                  <span class="font-bold text-[11px] block truncate text-slate-800">${acc.label}</span>
                  <span class="text-[10px] font-mono text-slate-400">${acc.id} • ${acc.role}</span>
                </div>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Registration Link -->
        <div class="pt-2 text-center text-xs text-slate-500">
          New staff member? 
          <button type="button" id="login-open-register-btn" class="text-blue-600 font-bold hover:underline">
            Register New Account Here
          </button>
        </div>

      </div>

    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  const form = document.getElementById('staff-login-form');
  const idInput = document.getElementById('login-identifier');
  const passInput = document.getElementById('login-password');
  const togglePassBtn = document.getElementById('toggle-password-btn');
  const errorBanner = document.getElementById('login-error-banner');
  const errorMessage = document.getElementById('login-error-message');

  // Toggle Password Visibility
  if (togglePassBtn && passInput) {
    togglePassBtn.addEventListener('click', () => {
      const isPass = passInput.type === 'password';
      passInput.type = isPass ? 'text' : 'password';
      togglePassBtn.innerHTML = `<i data-lucide="${isPass ? 'eye-off' : 'eye'}" class="w-4 h-4"></i>`;
      if (window.lucide) window.lucide.createIcons();
    });
  }

  // Handle Form Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      errorBanner.classList.add('hidden');

      const empIdOrEmail = idInput.value;
      const password = passInput.value;

      const res = store.authenticateStaff(empIdOrEmail, password);

      if (!res.success) {
        errorMessage.textContent = res.reason;
        errorBanner.classList.remove('hidden');
        if (window.lucide) window.lucide.createIcons();
      } else {
        const role = res.user.role;
        alert(`✓ Welcome back, ${res.user.name}!\nLogged in successfully as ${role}.`);

        // Automatically route to appropriate dashboard based on role
        if (role === 'Warden') window.appState.currentTab = 'warden-overview';
        else if (role === 'Super Admin') window.appState.currentTab = 'superadmin';
        else if (role.includes('Head')) window.appState.currentTab = 'dept-complaints';
        else if (role.includes('Security')) window.appState.currentTab = 'security';
        else window.appState.currentTab = 'warden-overview';

        window.renderApp();
      }
    });
  }

  // Demo pills click handlers
  const pills = container.querySelectorAll('.demo-login-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const empId = pill.getAttribute('data-empid');
      if (idInput) idInput.value = empId;
      if (passInput) passInput.value = 'Password123';

      // Auto-trigger submit for instant login test
      if (form) form.requestSubmit();
    });
  });

  const regBtn = document.getElementById('login-open-register-btn');
  if (regBtn) {
    regBtn.addEventListener('click', () => {
      window.openRegisterModal();
    });
  }
}

window.renderLoginPortal = renderLoginPortal;
