// Header Component with Quick Role Switcher, Notifications, and Live Clock

function renderHeader(containerId, store) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const user = store.currentUser;
  const unreadCount = store.data.notifications.filter(n => !n.read).length;

  const rolesList = [
    { label: 'Warden (Abhijeet das)', id: 'usr-1' },
    { label: 'Super Admin (Gurpreet singh)', id: 'usr-2' },
    { label: 'Plumber Head (Rajesh kumar)', id: 'usr-3' },
    { label: 'Electricity Head (Vikram Singh)', id: 'usr-4' },
    { label: 'Maintenance Head (Saranga pallei)', id: 'usr-5' },
    { label: 'Mess/Food Head (Arun patel)', id: 'usr-6' },
    { label: 'Housekeeping Head (Brijesh kumar)', id: 'usr-7' },
    { label: 'Security Guard (Ramakant)', id: 'usr-8' },
    { label: 'Security Head (Mohan naik)', id: 'usr-9' },
    { label: '🔑 Staff Login Portal', id: 'staff-login-tab' },
    { label: '🎓 Student Portal Simulator', id: 'student-mode' }
  ];

  container.innerHTML = `
    <header class="bg-white border-b border-slate-100 sticky top-0 z-30 px-4 lg:px-8 py-3.5 shadow-sm transition-all">
      <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        <!-- Left: Brand Logo & Title -->
        <div class="flex items-center gap-3">
          <button id="toggle-sidebar-btn" class="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors">
            <i data-lucide="menu" class="w-6 h-6"></i>
          </button>
          
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
              <i data-lucide="shield-check" class="w-6 h-6"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h1 class="font-bold text-slate-800 text-base leading-tight tracking-tight">Staff ERP System</h1>
                <span class="badge badge-blue text-[10px] uppercase tracking-wider">College & Hostel</span>
              </div>
              <p class="text-xs text-slate-500 hidden sm:block">Integrated Warden, Department & Security Management</p>
            </div>
          </div>
        </div>

        <!-- Center: Quick Role Switcher (Crucial for live demo testing) -->
        <div class="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-xl p-1.5 shadow-inner">
          <span class="text-xs font-semibold text-slate-500 px-2.5 flex items-center gap-1.5">
            <i data-lucide="user-check" class="w-3.5 h-3.5 text-blue-600"></i> Active Role:
          </span>
          <select id="role-switcher-select" class="bg-white text-xs font-semibold text-slate-700 border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm">
            ${rolesList.map(r => `
              <option value="${r.id}" ${user && user.id === r.id ? 'selected' : ''}>
                ${r.label}
              </option>
            `).join('')}
          </select>
        </div>

        <!-- Right: Actions & Profile -->
        <div class="flex items-center gap-2 sm:gap-3">
          
          <!-- Live Clock -->
          <div class="hidden lg:flex flex-col text-right pr-2 border-r border-slate-200">
            <span id="live-clock-time" class="text-xs font-bold text-slate-800 tracking-wide">--:--:--</span>
            <span id="live-clock-date" class="text-[10px] text-slate-500 font-medium">--</span>
          </div>

          <!-- Quick QR Scan Button -->
          <button id="quick-qr-btn" class="btn-primary text-xs py-2 px-3 sm:px-4 rounded-xl shadow-sm flex items-center gap-1.5" title="Open Security QR Scanner">
            <i data-lucide="qr-code" class="w-4 h-4"></i>
            <span class="hidden sm:inline">QR Scanner</span>
          </button>

          <!-- Staff Login Button -->
          <button id="header-staff-login-btn" class="btn-secondary text-xs py-2 px-3 sm:px-4 rounded-xl shadow-sm flex items-center gap-1.5" title="Staff Login Portal">
            <i data-lucide="lock" class="w-4 h-4 text-blue-600"></i>
            <span class="hidden sm:inline">Staff Login</span>
          </button>

          <!-- Notifications Bell -->
          <div class="relative">
            <button id="notif-bell-btn" class="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors relative">
              <i data-lucide="bell" class="w-5 h-5"></i>
              ${unreadCount > 0 ? `
                <span class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                  ${unreadCount}
                </span>
              ` : ''}
            </button>

            <!-- Notifications Dropdown Popup -->
            <div id="notif-popup" class="hidden absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 p-4 animate-slide-up">
              <div class="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <h3 class="font-bold text-slate-800 text-sm flex items-center gap-2">
                  <i data-lucide="bell-ring" class="w-4 h-4 text-blue-600"></i> System Alerts & Notifications
                </h3>
                <button id="clear-notifs-btn" class="text-xs text-blue-600 hover:underline font-medium">Mark all read</button>
              </div>
              <div class="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                ${store.data.notifications.length === 0 ? `
                  <p class="text-xs text-slate-400 text-center py-6">No new notifications</p>
                ` : store.data.notifications.map(n => `
                  <div class="p-3 rounded-xl ${n.type === 'Alert' ? 'bg-red-50 border border-red-100' : 'bg-slate-50 border border-slate-100'} text-xs">
                    <div class="flex items-center justify-between mb-1">
                      <span class="font-bold ${n.type === 'Alert' ? 'text-red-700' : 'text-slate-800'}">${n.title}</span>
                      <span class="text-[10px] text-slate-400">${n.timestamp.substring(11)}</span>
                    </div>
                    <p class="text-slate-600 leading-relaxed">${n.message}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- User Profile Badge -->
          <div class="flex items-center gap-2.5 pl-2 border-l border-slate-200">
            <div class="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center border border-blue-200 shadow-sm">
              ${user ? user.name.charAt(0) : 'U'}
            </div>
            <div class="hidden xl:block text-left">
              <div class="text-xs font-bold text-slate-800 leading-tight">${user ? user.name : 'Guest User'}</div>
              <div class="text-[11px] font-semibold text-blue-600">${user ? user.role : 'Staff'}</div>
            </div>
          </div>

        </div>
      </div>
    </header>
  `;

  // Init Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Live Clock Updater
  const updateClock = () => {
    const timeEl = document.getElementById('live-clock-time');
    const dateEl = document.getElementById('live-clock-date');
    if (timeEl && dateEl) {
      const now = new Date();
      timeEl.textContent = now.toLocaleTimeString();
      dateEl.textContent = now.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    }
  };
  updateClock();
  setInterval(updateClock, 1000);

  // Role Switcher Event Handler
  const selectEl = document.getElementById('role-switcher-select');
  if (selectEl) {
    selectEl.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val === 'student-mode') {
        window.appState.currentTab = 'student-simulator';
      } else if (val === 'staff-login-tab') {
        window.appState.currentTab = 'staff-login';
      } else {
        const selectedUser = store.data.users.find(u => u.id === val);
        if (selectedUser) {
          store.setCurrentUser(selectedUser);
          // Auto switch tab based on role
          if (selectedUser.role === 'Warden') window.appState.currentTab = 'warden-overview';
          else if (selectedUser.role === 'Super Admin') window.appState.currentTab = 'superadmin';
          else if (selectedUser.role.includes('Head')) window.appState.currentTab = 'dept-complaints';
          else if (selectedUser.role.includes('Security')) window.appState.currentTab = 'security';
        }
      }
      window.renderApp();
    });
  }

  // Quick QR scanner listener
  const qrBtn = document.getElementById('quick-qr-btn');
  if (qrBtn) {
    qrBtn.addEventListener('click', () => {
      window.appState.currentTab = 'security-scan';
      window.renderApp();
    });
  }

  // Staff Login Header Button listener
  const loginHeaderBtn = document.getElementById('header-staff-login-btn');
  if (loginHeaderBtn) {
    loginHeaderBtn.addEventListener('click', () => {
      window.appState.currentTab = 'staff-login';
      window.renderApp();
    });
  }

  // Notifications Bell toggle
  const bellBtn = document.getElementById('notif-bell-btn');
  const notifPopup = document.getElementById('notif-popup');
  if (bellBtn && notifPopup) {
    bellBtn.addEventListener('click', () => {
      notifPopup.classList.toggle('hidden');
    });
  }

  const clearNotifs = document.getElementById('clear-notifs-btn');
  if (clearNotifs) {
    clearNotifs.addEventListener('click', () => {
      store.data.notifications.forEach(n => n.read = true);
      store.save();
      window.renderApp();
    });
  }
}

window.renderHeader = renderHeader;
