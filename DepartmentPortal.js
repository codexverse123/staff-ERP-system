// Department Head Complaints & Task Management Component

function renderDepartmentPortal(containerId, store) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const data = store.data;
  const currentUser = store.currentUser;
  const isSuperAdminOrWarden = currentUser.role === 'Super Admin' || currentUser.role === 'Warden';

  // Filter complaints assigned to this department head, or all if Admin/Warden
  let deptComplaints = data.complaints;
  if (!isSuperAdminOrWarden && currentUser.role.includes('Head')) {
    deptComplaints = data.complaints.filter(c => c.assignedDeptHead === currentUser.role);
  }

  const activeComplaints = deptComplaints.filter(c => c.status !== 'Resolved' && c.status !== 'Closed');
  const resolvedComplaints = deptComplaints.filter(c => c.status === 'Resolved' || c.status === 'Closed');

  container.innerHTML = `
    <div class="animate-fade-in space-y-6">
      
      <!-- Department Header Banner -->
      <div class="bg-gradient-to-r from-slate-800 via-blue-900 to-indigo-900 rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span class="badge bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] uppercase font-bold tracking-wider">${currentUser.department || 'Department Administration'}</span>
          <h2 class="text-2xl font-extrabold tracking-tight mt-1">${currentUser.role} Complaints Dashboard</h2>
          <p class="text-xs text-blue-100 mt-1">Managing student individual & group complaints, staff task assignments, and repair resolution workflows.</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="badge badge-green text-xs px-3 py-1 bg-emerald-500 text-white font-bold">
            ${activeComplaints.length} Open Active Tasks
          </span>
        </div>
      </div>

      <!-- Department Complaint Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        ${deptComplaints.map(cmp => `
          <div class="card space-y-4 shadow-sm border ${cmp.status === 'In Progress' ? 'border-blue-200 bg-blue-50/20' : 'border-slate-100'}">
            
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="badge ${cmp.type === 'Group' ? 'badge-purple' : 'badge-blue'} text-[10px] font-bold">
                  ${cmp.type} Complaint
                </span>
                <span class="badge ${cmp.priority === 'Urgent' ? 'badge-red' : cmp.priority === 'High' ? 'badge-orange' : 'badge-gray'} text-[10px]">
                  ${cmp.priority} Priority
                </span>
              </div>
              <span class="font-mono text-xs font-bold text-blue-600">${cmp.id}</span>
            </div>

            <div>
              <h3 class="font-bold text-slate-800 text-sm leading-snug">${cmp.subject}</h3>
              <p class="text-xs text-slate-600 mt-1 leading-relaxed">${cmp.description}</p>
            </div>

            <!-- Student & Room Details -->
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-xs text-slate-600">
              <div class="flex items-center justify-between">
                <span>Submitted by: <strong>${cmp.studentName}</strong></span>
                <span class="text-slate-400 text-[10px]">${cmp.createdAt}</span>
              </div>
              <div>Location: <strong>${cmp.hostel} - Room ${cmp.roomNo}</strong></div>
              ${cmp.groupMembers && cmp.groupMembers.length > 0 ? `
                <div class="text-[11px] text-purple-700 font-medium">Group Members: ${cmp.groupMembers.join(', ')}</div>
              ` : ''}
            </div>

            <!-- Current Status & Assigned Staff -->
            <div class="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
              <div>
                <span class="text-slate-400 text-[10px] block">Current Status:</span>
                <span class="badge ${cmp.status === 'Resolved' ? 'badge-green' : cmp.status === 'In Progress' ? 'badge-blue' : 'badge-orange'} font-bold">
                  ${cmp.status}
                </span>
              </div>
              <div class="text-right">
                <span class="text-slate-400 text-[10px] block">Assigned Staff:</span>
                <span class="font-semibold text-slate-800">${cmp.assignedStaffName || 'Unassigned'}</span>
              </div>
            </div>

            ${cmp.remarks ? `
              <div class="p-2.5 rounded-lg bg-amber-50/80 border border-amber-100 text-[11px] text-amber-900">
                <strong>Remarks:</strong> ${cmp.remarks}
              </div>
            ` : ''}

            <!-- Action Status Update Selector -->
            <div class="pt-2 border-t border-slate-100 flex items-center gap-2">
              <select class="complaint-status-select form-select text-xs py-1.5 px-3 rounded-lg" data-id="${cmp.id}">
                <option value="Submitted" ${cmp.status === 'Submitted' ? 'selected' : ''}>Submitted</option>
                <option value="Under Review" ${cmp.status === 'Under Review' ? 'selected' : ''}>Under Review</option>
                <option value="Assigned" ${cmp.status === 'Assigned' ? 'selected' : ''}>Assigned</option>
                <option value="In Progress" ${cmp.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                <option value="Resolved" ${cmp.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
                <option value="Rejected" ${cmp.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
                <option value="Closed" ${cmp.status === 'Closed' ? 'selected' : ''}>Closed</option>
              </select>
              <button class="update-complaint-btn btn-primary text-xs py-1.5 px-3 whitespace-nowrap" data-id="${cmp.id}">
                Update Status
              </button>
            </div>

          </div>
        `).join('')}
      </div>

    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Update complaint status handler
  const updateBtns = container.querySelectorAll('.update-complaint-btn');
  updateBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmpId = btn.getAttribute('data-id');
      const selectEl = container.querySelector(`.complaint-status-select[data-id="${cmpId}"]`);
      if (selectEl) {
        const newStatus = selectEl.value;
        const remarks = prompt(`Enter resolution notes or status remark for ${cmpId}:`, `Status updated to ${newStatus} by ${currentUser.name}`);
        if (remarks !== null) {
          store.updateComplaintStatus(cmpId, newStatus, remarks);
          alert(`✓ Complaint ${cmpId} updated to '${newStatus}'!`);
          window.renderApp();
        }
      }
    });
  });
}

window.renderDepartmentPortal = renderDepartmentPortal;
