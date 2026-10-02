// Sidebar Navigation Component with Strict Role-Based Visibility

function renderSidebar(containerId, store, activeTab, setTabCallback) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const user = store.currentUser;
  const isStudentMode = activeTab === 'student-simulator' || activeTab.startsWith('student-');
  const role = user ? user.role : 'Warden';

  // Define Navigation Items based on Role
  let menuGroups = [];

  if (isStudentMode) {
    menuGroups = [
      {
        title: 'STUDENT PORTAL (SIMULATION)',
        items: [
          { id: 'student-simulator', label: 'Student Home', icon: 'home' },
          { id: 'student-apply-gatepass', label: 'Apply Gate Pass', icon: 'file-text' },
          { id: 'student-my-passes', label: 'My Gate Passes & QR', icon: 'qr-code' },
          { id: 'student-complaints', label: 'File Complaint', icon: 'alert-circle' },
          { id: 'student-notices', label: 'Hostel Notices', icon: 'megaphone' }
        ]
      }
    ];
  } else if (role === 'Warden') {
    menuGroups = [
      {
        title: 'WARDEN PORTAL',
        items: [
          { id: 'warden-overview', label: 'Overview / Dashboard', icon: 'layout-dashboard' },
          { id: 'warden-gatepasses', label: 'Gate Pass Approval', icon: 'check-square', badge: store.data.gate_passes.filter(g => g.status === 'Pending').length },
          { id: 'warden-students', label: 'Students Directory', icon: 'users' },
          { id: 'warden-attendance', label: 'Hostel Attendance', icon: 'clipboard-check' },
          { id: 'warden-movement', label: 'Student Movement', icon: 'footprints' },
          { id: 'warden-complaints', label: 'Complaints', icon: 'message-square-warning' },
          { id: 'warden-notices', label: 'Warden Notices', icon: 'bell-plus' },
          { id: 'reports', label: 'Reports & Analytics', icon: 'bar-chart-3' },
          { id: 'staff-login', label: 'Staff Login Portal', icon: 'lock' },
          { id: 'staff-profile', label: 'Warden Profile', icon: 'user' }
        ]
      }
    ];
  } else if (role === 'Super Admin') {
    menuGroups = [
      {
        title: 'SUPER ADMIN PORTAL',
        items: [
          { id: 'superadmin', label: 'Admin Overview', icon: 'shield-alert' },
          { id: 'superadmin-staff', label: 'Staff Approvals', icon: 'user-check', badge: store.data.users.filter(u => u.status === 'Pending Verification').length },
          { id: 'warden-students', label: 'All Students', icon: 'graduation-cap' },
          { id: 'warden-gatepasses', label: 'Gate Passes Master', icon: 'key' },
          { id: 'dept-complaints', label: 'All Complaints', icon: 'file-spreadsheet' },
          { id: 'warden-notices', label: 'Notices & Broadcasts', icon: 'megaphone' },
          { id: 'reports', label: 'Comprehensive Reports', icon: 'pie-chart' },
          { id: 'staff-login', label: 'Staff Login Portal', icon: 'lock' },
          { id: 'superadmin-logs', label: 'System Audit Logs', icon: 'history' }
        ]
      }
    ];
  } else if (role.includes('Head')) {
    menuGroups = [
      {
        title: `${role.toUpperCase()} PORTAL`,
        items: [
          { id: 'dept-complaints', label: 'Department Complaints', icon: 'wrench', badge: store.data.complaints.filter(c => c.assignedDeptHead === role && c.status !== 'Resolved').length },
          { id: 'warden-notices', label: 'Warden Notices', icon: 'bell' },
          { id: 'reports', label: 'Department Reports', icon: 'line-chart' },
          { id: 'staff-login', label: 'Staff Login Portal', icon: 'lock' },
          { id: 'staff-profile', label: 'My Profile', icon: 'user' }
        ]
      }
    ];
  } else if (role.includes('Security')) {
    menuGroups = [
      {
        title: 'SECURITY PORTAL',
        items: [
          { id: 'security', label: 'Security Dashboard', icon: 'shield' },
          { id: 'security-scan', label: 'Scan Gate Pass QR', icon: 'qr-code' },
          { id: 'security-outside', label: 'Students Outside', icon: 'external-link', badge: store.data.gate_passes.filter(g => g.movementStatus === 'OUT').length },
          { id: 'security-logs', label: 'Movement Logs', icon: 'file-text' },
          { id: 'staff-login', label: 'Staff Login Portal', icon: 'lock' },
          { id: 'staff-profile', label: 'Security Profile', icon: 'user' }
        ]
      }
    ];
  } else {
    // Other Staff
    menuGroups = [
      {
        title: 'STAFF PORTAL',
        items: [
          { id: 'dept-complaints', label: 'Assigned Complaints', icon: 'tool' },
          { id: 'warden-notices', label: 'Notices Feed', icon: 'bell' },
          { id: 'staff-login', label: 'Staff Login Portal', icon: 'lock' },
          { id: 'staff-profile', label: 'My Profile', icon: 'user' }
        ]
      }
    ];
  }

  // Quick switch back to Staff ERP button if in student simulator mode
  const bottomBox = isStudentMode ? `
    <div class="mt-auto p-4 bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl shadow-sm">
      <div class="flex items-center gap-2 mb-2">
        <i data-lucide="info" class="w-4 h-4 text-indigo-600"></i>
        <span class="text-xs font-bold text-indigo-900">Student Simulator</span>
      </div>
      <p class="text-[11px] text-indigo-700 leading-relaxed mb-3">You are testing the Student Portal view. Actions sync to Warden & Security in real-time.</p>
      <button id="exit-student-mode-btn" class="w-full btn-primary text-xs py-2">
        Return to Warden ERP
      </button>
    </div>
  ` : `
    <div class="mt-auto p-4 bg-slate-50 border border-slate-200/70 rounded-2xl space-y-2.5">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-xs flex items-center justify-center">
          ${role.charAt(0)}
        </div>
        <div class="overflow-hidden flex-1">
          <div class="text-xs font-bold text-slate-800 truncate">${user ? user.name : 'Staff Member'}</div>
          <div class="text-[10px] font-semibold text-emerald-600 truncate">● Active Logged In</div>
        </div>
      </div>
      <div class="flex items-center justify-between pt-2 border-t border-slate-200/60 text-[10px] text-slate-500">
        <span>ID: ${user ? user.employeeId : 'N/A'}</span>
        <button id="sidebar-logout-btn" class="text-blue-600 font-bold hover:underline flex items-center gap-1">
          <i data-lucide="log-out" class="w-3 h-3"></i> Switch / Login
        </button>
      </div>
    </div>
  `;

  container.innerHTML = `
    <aside class="w-64 bg-white border-r border-slate-100 flex flex-col justify-between p-4 h-[calc(100vh-65px)] sticky top-[65px] z-20 overflow-y-auto">
      <div class="space-y-6">
        ${menuGroups.map(group => `
          <div>
            <h3 class="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">${group.title}</h3>
            <nav class="space-y-1">
              ${group.items.map(item => `
                <a href="#" data-tab="${item.id}" class="sidebar-link ${activeTab === item.id ? 'active' : ''}">
                  <i data-lucide="${item.icon}" class="w-4 h-4"></i>
                  <span class="flex-1 truncate">${item.label}</span>
                  ${item.badge !== undefined && item.badge > 0 ? `
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${activeTab === item.id ? 'bg-white text-blue-700' : 'bg-blue-100 text-blue-700'}">
                      ${item.badge}
                    </span>
                  ` : ''}
                </a>
              `).join('')}
            </nav>
          </div>
        `).join('')}
      </div>

      ${bottomBox}
    </aside>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Setup click listeners for nav links
  const links = container.querySelectorAll('.sidebar-link');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = link.getAttribute('data-tab');
      if (tabId && setTabCallback) {
        setTabCallback(tabId);
      }
    });
  });

  const exitBtn = document.getElementById('exit-student-mode-btn');
  if (exitBtn) {
    exitBtn.addEventListener('click', () => {
      store.setCurrentUser(store.data.users[0]); // Reset to Warden
      setTabCallback('warden-overview');
    });
  }

  const logoutBtn = document.getElementById('sidebar-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      if (setTabCallback) setTabCallback('staff-login');
    });
  }
}

window.renderSidebar = renderSidebar;
