// Super Admin Portal Component for Staff Verification & Role Management

function renderSuperAdminPortal(containerId, store) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const data = store.data;
  const pendingStaff = data.users.filter(u => u.status === 'Pending Verification');
  const activeStaff = data.users.filter(u => u.status === 'Approved');
  const suspendedStaff = data.users.filter(u => u.status === 'Suspended' || u.status === 'Rejected');

  container.innerHTML = `
    <div class="animate-fade-in space-y-6">
      
      <!-- Super Admin Header Banner -->
      <div class="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span class="badge bg-purple-500/20 text-purple-300 border border-purple-400/30 text-[10px] uppercase font-bold tracking-wider">Master System Administration</span>
          <h2 class="text-2xl font-extrabold tracking-tight mt-1">Super Admin ERP Management</h2>
          <p class="text-xs text-purple-200 mt-1">Verify new staff registrations, assign system roles & RBAC permissions, suspend accounts, and audit campus activity logs.</p>
        </div>
        <div class="flex items-center gap-3">
          <button id="open-register-modal-btn" class="btn-primary bg-purple-600 hover:bg-purple-500 font-bold text-xs py-2.5 px-4 shadow">
            <i data-lucide="user-plus" class="w-4 h-4"></i> Register New Staff Member
          </button>
        </div>
      </div>

      <!-- Stat Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
        
        <div class="stat-card border-l-4 border-l-amber-500">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block">Pending Staff Verifications</span>
          <div class="text-2xl font-extrabold text-amber-600 mt-2">${pendingStaff.length}</div>
          <span class="text-[11px] text-amber-700 font-semibold mt-1 block">Awaiting Admin Approval</span>
        </div>

        <div class="stat-card border-l-4 border-l-emerald-500">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block">Approved Active Staff</span>
          <div class="text-2xl font-extrabold text-emerald-600 mt-2">${activeStaff.length}</div>
          <span class="text-[11px] text-slate-500 font-medium mt-1 block">Active System Access</span>
        </div>

        <div class="stat-card border-l-4 border-l-red-500">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block">Suspended / Rejected</span>
          <div class="text-2xl font-extrabold text-red-600 mt-2">${suspendedStaff.length}</div>
          <span class="text-[11px] text-slate-500 font-medium mt-1 block">Revoked Permissions</span>
        </div>

      </div>

      <!-- Staff Accounts Verification & Management Table -->
      <div class="card space-y-4 shadow-sm">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 class="font-bold text-slate-800 text-sm flex items-center gap-2">
            <i data-lucide="users" class="w-4 h-4 text-purple-600"></i> Staff Directory & Account Approvals
          </h3>
          <span class="badge badge-purple text-xs">${data.users.length} Total Registered Accounts</span>
        </div>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Staff Member</th>
                <th>Role & Department</th>
                <th>Contact Details</th>
                <th>Status</th>
                <th>Super Admin Action</th>
              </tr>
            </thead>
            <tbody>
              ${data.users.map(u => `
                <tr class="${u.status === 'Pending Verification' ? 'bg-amber-50/40' : ''}">
                  <td class="font-mono text-xs font-bold text-purple-700">${u.employeeId}</td>
                  <td>
                    <div class="font-bold text-xs text-slate-800">${u.name}</div>
                    <div class="text-[11px] text-slate-500">Joined: ${u.dateJoined || '2023'}</div>
                  </td>
                  <td>
                    <div class="font-semibold text-xs text-slate-800">${u.role}</div>
                    <div class="text-[11px] text-slate-500">${u.department || 'N/A'} • ${u.hostel || 'All'}</div>
                  </td>
                  <td class="text-xs text-slate-600">
                    <div>📧 ${u.email}</div>
                    <div>📞 ${u.phone}</div>
                  </td>
                  <td>
                    ${u.status === 'Approved' ? '<span class="badge badge-green">✓ Approved</span>' : ''}
                    ${u.status === 'Pending Verification' ? '<span class="badge badge-orange">⏳ Pending Verification</span>' : ''}
                    ${u.status === 'Suspended' ? '<span class="badge badge-red">🚫 Suspended</span>' : ''}
                    ${u.status === 'Rejected' ? '<span class="badge badge-red">✕ Rejected</span>' : ''}
                  </td>
                  <td>
                    <div class="flex items-center gap-1.5">
                      ${u.status !== 'Approved' ? `
                        <button class="approve-staff-btn btn-success text-xs py-1 px-2.5" data-id="${u.id}">Approve</button>
                      ` : ''}
                      ${u.status === 'Approved' ? `
                        <button class="suspend-staff-btn btn-danger text-xs py-1 px-2.5" data-id="${u.id}">Suspend</button>
                      ` : ''}
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Staff Activity Audit Log -->
      <div class="card space-y-4 shadow-sm">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 class="font-bold text-slate-800 text-sm flex items-center gap-2">
            <i data-lucide="history" class="w-4 h-4 text-purple-600"></i> Master Staff Activity Audit Trail
          </h3>
          <span class="badge badge-gray text-xs">${data.staff_activity_logs.length} Logged Events</span>
        </div>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Log ID</th>
                <th>Staff Member</th>
                <th>Role</th>
                <th>Action Executed</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              ${data.staff_activity_logs.map(log => `
                <tr>
                  <td class="font-mono text-xs font-semibold text-slate-400">${log.id}</td>
                  <td class="font-bold text-xs text-slate-800">${log.staffName}</td>
                  <td class="text-xs text-purple-700 font-semibold">${log.role}</td>
                  <td class="text-xs text-slate-700">${log.action}</td>
                  <td class="text-xs text-slate-500">${log.timestamp}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Bind Approve and Suspend buttons
  const approveBtns = container.querySelectorAll('.approve-staff-btn');
  approveBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      store.updateStaffStatus(id, 'Approved');
      alert(`✓ Staff account ${id} approved! Staff member can now access their role dashboard.`);
      window.renderApp();
    });
  });

  const suspendBtns = container.querySelectorAll('.suspend-staff-btn');
  suspendBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (confirm(`Suspend staff account ${id}?`)) {
        store.updateStaffStatus(id, 'Suspended');
        alert(`🚫 Staff account ${id} suspended.`);
        window.renderApp();
      }
    });
  });

  const registerBtn = document.getElementById('open-register-modal-btn');
  if (registerBtn) {
    registerBtn.addEventListener('click', () => {
      window.openRegisterModal();
    });
  }
}

window.renderSuperAdminPortal = renderSuperAdminPortal;
