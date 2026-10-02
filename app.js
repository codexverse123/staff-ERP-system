// Main Application Orchestrator & Router

window.appState = {
  currentTab: 'warden-overview' // Default tab
};

function renderApp() {
  const store = window.appStore;
  const activeTab = window.appState.currentTab;

  // 1. Render Header
  if (window.renderHeader) {
    window.renderHeader('app-header-container', store);
  }

  // 2. Render Sidebar
  if (window.renderSidebar) {
    window.renderSidebar('app-sidebar-container', store, activeTab, (newTab) => {
      window.appState.currentTab = newTab;
      renderApp();
    });
  }

  // 3. Render Main Content based on activeTab
  const mainContent = document.getElementById('app-main-content');
  if (mainContent) {
    if (activeTab.startsWith('warden')) {
      if (window.renderWardenPortal) {
        window.renderWardenPortal('app-main-content', store, activeTab);
      }
    } else if (activeTab === 'security' || activeTab.startsWith('security-')) {
      if (activeTab === 'security-scan') {
        if (window.renderQRScanner) {
          window.renderQRScanner('app-main-content', store);
        }
      } else {
        if (window.renderSecurityPortal) {
          window.renderSecurityPortal('app-main-content', store, activeTab);
        }
      }
    } else if (activeTab === 'dept-complaints') {
      if (window.renderDepartmentPortal) {
        window.renderDepartmentPortal('app-main-content', store);
      }
    } else if (activeTab === 'superadmin' || activeTab.startsWith('superadmin-')) {
      if (window.renderSuperAdminPortal) {
        window.renderSuperAdminPortal('app-main-content', store);
      }
    } else if (activeTab === 'student-simulator' || activeTab.startsWith('student-')) {
      if (window.renderStudentSimulatorPortal) {
        window.renderStudentSimulatorPortal('app-main-content', store, activeTab);
      }
    } else if (activeTab === 'reports') {
      if (window.renderReportsPortal) {
        window.renderReportsPortal('app-main-content', store);
      }
    } else if (activeTab === 'staff-login') {
      if (window.renderLoginPortal) {
        window.renderLoginPortal('app-main-content', store);
      }
    } else if (activeTab === 'staff-profile') {
      renderStaffProfile('app-main-content', store);
    } else {
      // Fallback
      if (window.renderWardenPortal) {
        window.renderWardenPortal('app-main-content', store, 'warden-overview');
      }
    }
  }

  // 4. Render Registration Modal
  if (window.renderAuthModal) {
    window.renderAuthModal('app-modal-container', store);
  }

  // Mobile sidebar toggle handler
  const toggleBtn = document.getElementById('toggle-sidebar-btn');
  const sidebarContainer = document.getElementById('app-sidebar-container');
  if (toggleBtn && sidebarContainer) {
    toggleBtn.onclick = () => {
      sidebarContainer.classList.toggle('hidden');
    };
  }

  // Re-initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function renderStaffProfile(containerId, store) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const user = store.currentUser;

  container.innerHTML = `
    <div class="animate-fade-in max-w-3xl mx-auto space-y-6">
      <div class="card space-y-6 shadow-sm">
        <div class="flex items-center gap-4 border-b border-slate-100 pb-6">
          <div class="w-16 h-16 rounded-2xl bg-blue-600 text-white font-bold text-2xl flex items-center justify-center shadow-md">
            ${user.name.charAt(0)}
          </div>
          <div>
            <span class="badge badge-blue text-xs uppercase font-bold">${user.role}</span>
            <h2 class="text-xl font-extrabold text-slate-800 mt-1">${user.name}</h2>
            <p class="text-xs text-slate-500">Employee ID: ${user.employeeId} • ${user.department || 'Administration'}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <span class="text-slate-400 block mb-1">Email Address:</span>
            <strong class="text-slate-800">${user.email}</strong>
          </div>
          <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <span class="text-slate-400 block mb-1">Phone Number:</span>
            <strong class="text-slate-800">${user.phone}</strong>
          </div>
          <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <span class="text-slate-400 block mb-1">Assigned Hostel/Block:</span>
            <strong class="text-slate-800">${user.hostel || 'All Blocks'}</strong>
          </div>
          <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <span class="text-slate-400 block mb-1">Verification Status:</span>
            <strong class="text-emerald-600">✓ ${user.status}</strong>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button onclick="store.resetToDefault(); window.renderApp();" class="text-xs text-red-600 hover:underline font-semibold">
            Reset Demo Local Storage Data
          </button>
          <button onclick="window.openRegisterModal();" class="btn-primary text-xs py-2 px-4">
            Register New Staff Account
          </button>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
}

// Global exposure
window.renderApp = renderApp;

// Subscribe to store updates
window.appStore.subscribe(() => {
  renderApp();
});

// Initial boot
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
});
