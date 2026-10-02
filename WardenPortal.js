// Warden Portal Component with Full Dashboard, Gate Pass Approvals, Movement & Notice Management

function renderWardenPortal(containerId, store, subTab = 'warden-overview') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const data = store.data;
  const pendingPasses = data.gate_passes.filter(g => g.status === 'Pending');
  const approvedPasses = data.gate_passes.filter(g => g.status === 'Approved');
  const studentsOutside = data.gate_passes.filter(g => g.movementStatus === 'OUT');
  const openComplaints = data.complaints.filter(c => c.status !== 'Resolved' && c.status !== 'Closed');

  container.innerHTML = `
    <div class="animate-fade-in space-y-6">
      
      <!-- Sub-Navigation Tabs Bar for Warden -->
      <div class="flex items-center gap-2 overflow-x-auto border-b border-slate-200 pb-3 scrollbar-none">
        <button data-subtab="warden-overview" class="warden-subtab-btn text-xs font-semibold px-4 py-2 rounded-xl transition-all ${subTab === 'warden-overview' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100'}">
          Overview
        </button>
        <button data-subtab="warden-gatepasses" class="warden-subtab-btn text-xs font-semibold px-4 py-2 rounded-xl transition-all relative ${subTab === 'warden-gatepasses' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100'}">
          Gate Pass Approval
          ${pendingPasses.length > 0 ? `<span class="ml-1.5 px-1.5 py-0.5 text-[10px] bg-red-500 text-white rounded-full font-bold">${pendingPasses.length}</span>` : ''}
        </button>
        <button data-subtab="warden-students" class="warden-subtab-btn text-xs font-semibold px-4 py-2 rounded-xl transition-all ${subTab === 'warden-students' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100'}">
          Students Directory
        </button>
        <button data-subtab="warden-attendance" class="warden-subtab-btn text-xs font-semibold px-4 py-2 rounded-xl transition-all ${subTab === 'warden-attendance' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100'}">
          Hostel Attendance
        </button>
        <button data-subtab="warden-movement" class="warden-subtab-btn text-xs font-semibold px-4 py-2 rounded-xl transition-all ${subTab === 'warden-movement' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100'}">
          Student Movement
        </button>
        <button data-subtab="warden-complaints" class="warden-subtab-btn text-xs font-semibold px-4 py-2 rounded-xl transition-all ${subTab === 'warden-complaints' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100'}">
          Complaints
        </button>
        <button data-subtab="warden-notices" class="warden-subtab-btn text-xs font-semibold px-4 py-2 rounded-xl transition-all ${subTab === 'warden-notices' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100'}">
          Notice Publishing
        </button>
      </div>

      <!-- Tab Content Area -->
      <div id="warden-content-area">
        ${renderSubTabContent(subTab, store)}
      </div>

    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Setup subtab click listeners
  const subTabBtns = container.querySelectorAll('.warden-subtab-btn');
  subTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetSubTab = btn.getAttribute('data-subtab');
      window.appState.currentTab = targetSubTab;
      window.renderApp();
    });
  });

  bindWardenEvents(container, store);
}

function renderSubTabContent(subTab, store) {
  const data = store.data;

  if (subTab === 'warden-overview') {
    const pendingPasses = data.gate_passes.filter(g => g.status === 'Pending');
    const studentsOutside = data.gate_passes.filter(g => g.movementStatus === 'OUT');
    const openComplaints = data.complaints.filter(c => c.status !== 'Resolved' && c.status !== 'Closed');

    return `
      <div class="space-y-6">
        
        <!-- Header Banner -->
        <div class="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-blue-200">Welcome Back</span>
            <h2 class="text-2xl font-extrabold tracking-tight">Abhijeet das (Chief Warden)</h2>
            <p class="text-xs text-blue-100 mt-1 max-w-xl">Overseeing Hostel Block A & B operations, student movement authorizations, notice broadcasts, and security synchronization.</p>
          </div>
          <div class="flex items-center gap-3">
            <button onclick="window.appState.currentTab='warden-gatepasses'; window.renderApp();" class="btn-primary bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs py-2.5 px-4 shadow">
              <i data-lucide="check-square" class="w-4 h-4"></i> Approve Gate Passes (${pendingPasses.length})
            </button>
          </div>
        </div>

        <!-- Metric Stat Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div class="stat-card border-l-4 border-l-blue-600">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Residents</span>
              <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <i data-lucide="users" class="w-5 h-5"></i>
              </div>
            </div>
            <div class="text-2xl font-extrabold text-slate-800 mt-2">${data.students.length}</div>
            <span class="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
              <i data-lucide="arrow-up-right" class="w-3 h-3"></i> 395 Occupied Beds
            </span>
          </div>

          <div class="stat-card border-l-4 border-l-amber-500">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Gate Passes</span>
              <div class="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <i data-lucide="clock" class="w-5 h-5"></i>
              </div>
            </div>
            <div class="text-2xl font-extrabold text-amber-600 mt-2">${pendingPasses.length}</div>
            <span class="text-[11px] text-amber-700 font-semibold mt-1 block">Requires Warden Action</span>
          </div>

          <div class="stat-card border-l-4 border-l-indigo-600">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Students Outside</span>
              <div class="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <i data-lucide="external-link" class="w-5 h-5"></i>
              </div>
            </div>
            <div class="text-2xl font-extrabold text-indigo-600 mt-2">${studentsOutside.length}</div>
            <span class="text-[11px] text-slate-500 font-medium mt-1 block">Active Gate Passes OUT</span>
          </div>

          <div class="stat-card border-l-4 border-l-red-500">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Open Complaints</span>
              <div class="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <i data-lucide="alert-circle" class="w-5 h-5"></i>
              </div>
            </div>
            <div class="text-2xl font-extrabold text-red-600 mt-2">${openComplaints.length}</div>
            <span class="text-[11px] text-slate-500 font-medium mt-1 block">Assigned to Dept Heads</span>
          </div>

        </div>

        <!-- Two Column Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <!-- Pending Gate Passes Quick Review -->
          <div class="lg:col-span-7 card space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 class="font-bold text-slate-800 text-sm flex items-center gap-2">
                <i data-lucide="key" class="w-4 h-4 text-blue-600"></i> Pending Gate Pass Requests
              </h3>
              <span class="badge badge-orange text-xs">${pendingPasses.length} Action Needed</span>
            </div>

            ${pendingPasses.length === 0 ? `
              <p class="text-xs text-slate-400 text-center py-8">No pending gate passes waiting for approval.</p>
            ` : `
              <div class="space-y-3">
                ${pendingPasses.map(pass => `
                  <div class="p-4 rounded-xl border border-slate-200/80 bg-slate-50 hover:bg-white hover:shadow-sm transition-all space-y-3">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-3">
                        <div class="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
                          ${pass.studentName.charAt(0)}
                        </div>
                        <div>
                          <h4 class="font-bold text-slate-800 text-xs">${pass.studentName}</h4>
                          <p class="text-[11px] text-slate-500">${pass.rollNo} • ${pass.hostel} (${pass.roomNo})</p>
                        </div>
                      </div>
                      <span class="badge badge-orange text-[10px]">${pass.id}</span>
                    </div>

                    <div class="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-100">
                      <div><span class="text-slate-400 text-[10px] block">Reason:</span> ${pass.reason}</div>
                      <div><span class="text-slate-400 text-[10px] block">Destination:</span> ${pass.destination}</div>
                      <div><span class="text-slate-400 text-[10px] block">Exit Date/Time:</span> ${pass.outDate} @ ${pass.outTime}</div>
                      <div><span class="text-slate-400 text-[10px] block">Return Expected:</span> ${pass.expectedReturnDate} @ ${pass.expectedReturnTime}</div>
                    </div>

                    <!-- Warden-Only Action Buttons -->
                    <div class="flex items-center justify-end gap-2 pt-1">
                      <button class="approve-pass-btn btn-success text-xs py-1.5 px-3" data-id="${pass.id}">
                        <i data-lucide="check" class="w-3.5 h-3.5"></i> Approve
                      </button>
                      <button class="reject-pass-btn btn-danger text-xs py-1.5 px-3" data-id="${pass.id}">
                        <i data-lucide="x" class="w-3.5 h-3.5"></i> Reject
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
          </div>

          <!-- Active Warden Notices Feed -->
          <div class="lg:col-span-5 card space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 class="font-bold text-slate-800 text-sm flex items-center gap-2">
                <i data-lucide="megaphone" class="w-4 h-4 text-blue-600"></i> Published Warden Notices
              </h3>
              <button onclick="window.appState.currentTab='warden-notices'; window.renderApp();" class="text-xs text-blue-600 font-semibold hover:underline">Manage All</button>
            </div>

            <div class="space-y-3">
              ${data.notices.map(notice => `
                <div class="p-3.5 rounded-xl border border-slate-100 bg-slate-50 text-xs space-y-1.5">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-slate-800">${notice.title}</span>
                    <span class="badge ${notice.priority === 'Urgent' ? 'badge-red' : 'badge-blue'} text-[10px]">${notice.priority}</span>
                  </div>
                  <p class="text-slate-600 text-[11px] line-clamp-2">${notice.content}</p>
                  <div class="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    <span>${notice.category}</span>
                    <span>${notice.publishedAt}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>

      </div>
    `;
  }

  if (subTab === 'warden-gatepasses') {
    return `
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="page-header">Gate Pass Authorization Portal</h2>
            <p class="page-subtitle">Warden-only workflow: Review, approve or reject student gate passes</p>
          </div>
          <div class="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold flex items-center gap-2">
            <i data-lucide="shield-alert" class="w-4 h-4 text-blue-600"></i> Strict Business Rule: Only Warden can approve/reject.
          </div>
        </div>

        <div class="table-container shadow-sm">
          <table class="data-table">
            <thead>
              <tr>
                <th>Pass ID</th>
                <th>Student Details</th>
                <th>Reason & Destination</th>
                <th>Timings</th>
                <th>Status</th>
                <th>Warden Action</th>
              </tr>
            </thead>
            <tbody>
              ${data.gate_passes.map(pass => `
                <tr>
                  <td class="font-mono font-bold text-xs text-blue-600">${pass.id}</td>
                  <td>
                    <div class="font-bold text-slate-800 text-xs">${pass.studentName}</div>
                    <div class="text-[11px] text-slate-500">${pass.rollNo} • ${pass.roomNo} (${pass.hostel})</div>
                  </td>
                  <td>
                    <div class="font-medium text-xs text-slate-700">${pass.reason}</div>
                    <div class="text-[11px] text-slate-500">📍 ${pass.destination}</div>
                  </td>
                  <td class="text-xs">
                    <div>Out: <strong>${pass.outDate} ${pass.outTime}</strong></div>
                    <div>Return: <strong>${pass.expectedReturnDate} ${pass.expectedReturnTime}</strong></div>
                  </td>
                  <td>
                    ${pass.status === 'Approved' ? '<span class="badge badge-green">✓ Approved</span>' : ''}
                    ${pass.status === 'Pending' ? '<span class="badge badge-orange">⏳ Pending</span>' : ''}
                    ${pass.status === 'Rejected' ? '<span class="badge badge-red">✕ Rejected</span>' : ''}
                    ${pass.status === 'Completed' ? '<span class="badge badge-blue">✓ Completed</span>' : ''}
                  </td>
                  <td>
                    ${pass.status === 'Pending' ? `
                      <div class="flex items-center gap-1.5">
                        <button class="approve-pass-btn btn-success text-xs py-1 px-2.5" data-id="${pass.id}">Approve</button>
                        <button class="reject-pass-btn btn-danger text-xs py-1 px-2.5" data-id="${pass.id}">Reject</button>
                      </div>
                    ` : `
                      <span class="text-[11px] text-slate-400 font-medium">${pass.approvedBy || 'Processed'}</span>
                    `}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  if (subTab === 'warden-notices') {
    return `
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="page-header">Notice Broadcast Management</h2>
            <p class="page-subtitle">Publish, schedule, edit and manage notices for the Student Portal</p>
          </div>
          <button id="open-notice-modal-btn" class="btn-primary text-xs font-bold py-2.5 px-4 shadow">
            <i data-lucide="plus-circle" class="w-4 h-4"></i> Create New Notice
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          ${data.notices.map(notice => `
            <div class="card space-y-3 relative group hover:border-blue-200 transition-all">
              <div class="flex items-center justify-between">
                <span class="badge ${notice.priority === 'Urgent' ? 'badge-red' : 'badge-blue'} text-[10px]">${notice.priority} Priority</span>
                <span class="badge badge-gray text-[10px]">${notice.category}</span>
              </div>
              <h3 class="font-bold text-slate-800 text-sm leading-snug">${notice.title}</h3>
              <p class="text-xs text-slate-600 leading-relaxed">${notice.content}</p>
              <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>By ${notice.createdBy.split(' ')[0]}</span>
                <span>${notice.publishedAt || 'Scheduled'}</span>
              </div>
              <div class="flex items-center justify-end gap-2 pt-1">
                <button class="delete-notice-btn text-xs text-red-600 hover:underline font-semibold" data-id="${notice.id}">Delete</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Fallback for students directory / movement / complaints in warden view
  return `
    <div class="card space-y-4">
      <h3 class="font-bold text-slate-800 text-base">Warden Management View (${subTab})</h3>
      <p class="text-xs text-slate-500">Displaying data records for hostel administration.</p>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student / Record</th>
              <th>Details</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${data.students.map(s => `
              <tr>
                <td class="font-mono text-xs font-bold text-blue-600">${s.id}</td>
                <td class="font-bold text-xs text-slate-800">${s.name} (${s.rollNo})</td>
                <td class="text-xs text-slate-600">${s.hostel} - Room ${s.roomNo}</td>
                <td><span class="badge ${s.status === 'Outside' ? 'badge-orange' : 'badge-green'}">${s.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function bindWardenEvents(container, store) {
  // Gate Pass Approval Click Handlers
  const approveBtns = container.querySelectorAll('.approve-pass-btn');
  approveBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const passId = btn.getAttribute('data-id');
      try {
        store.approveGatePass(passId);
        alert(`✓ Gate Pass ${passId} Approved by Warden! QR Code Token generated.`);
        window.renderApp();
      } catch (e) {
        alert(e.message);
      }
    });
  });

  const rejectBtns = container.querySelectorAll('.reject-pass-btn');
  rejectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const passId = btn.getAttribute('data-id');
      const reason = prompt('Enter rejection reason for Student:', 'Not permitted due to evening curfew');
      if (reason !== null) {
        try {
          store.rejectGatePass(passId, reason);
          alert(`✕ Gate Pass ${passId} Rejected.`);
          window.renderApp();
        } catch (e) {
          alert(e.message);
        }
      }
    });
  });

  // Notice Creation Modal trigger
  const newNoticeBtn = document.getElementById('open-notice-modal-btn');
  if (newNoticeBtn) {
    newNoticeBtn.addEventListener('click', () => {
      const title = prompt('Enter Notice Title:');
      if (!title) return;
      const content = prompt('Enter Notice Description/Content:');
      if (!content) return;
      const category = prompt('Enter Category (General, Hostel, Mess, Maintenance, Emergency, Discipline, Important):', 'General');
      
      store.createNotice({
        title,
        content,
        category: category || 'General',
        priority: 'Important',
        status: 'Published'
      });
      alert('✓ Notice published to Student Portal!');
      window.renderApp();
    });
  }

  // Notice Delete handler
  const deleteNoticeBtns = container.querySelectorAll('.delete-notice-btn');
  deleteNoticeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const noticeId = btn.getAttribute('data-id');
      if (confirm(`Delete Notice ${noticeId}?`)) {
        store.deleteNotice(noticeId);
        window.renderApp();
      }
    });
  });
}

window.renderWardenPortal = renderWardenPortal;
