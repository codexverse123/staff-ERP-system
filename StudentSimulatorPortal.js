// Student Portal Simulator Component (Shares database with Staff ERP)

function renderStudentSimulatorPortal(containerId, store, activeSubTab = 'student-simulator') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const data = store.data;
  const currentStudent = data.students[0]; // Aarav Patel CS2023-045
  const myPasses = data.gate_passes.filter(g => g.studentId === currentStudent.id || g.studentName === currentStudent.name);
  const myComplaints = data.complaints.filter(c => c.studentId === currentStudent.id || c.studentName === currentStudent.name);
  const notices = data.notices.filter(n => n.status === 'Published');

  container.innerHTML = `
    <div class="animate-fade-in space-y-6">
      
      <!-- Student Banner -->
      <div class="bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="badge bg-white/20 text-white border border-white/30 text-[10px] uppercase font-bold tracking-wider">Student Portal Simulator</span>
            <span class="badge ${currentStudent.status === 'Outside' ? 'badge-orange' : 'badge-green'} text-[10px]">
              Status: ${currentStudent.status}
            </span>
          </div>
          <h2 class="text-2xl font-extrabold tracking-tight">${currentStudent.name} (${currentStudent.rollNo})</h2>
          <p class="text-xs text-blue-100 mt-1">${currentStudent.course} • ${currentStudent.hostel} • Room ${currentStudent.roomNo}</p>
        </div>
        <div class="flex items-center gap-3">
          <button id="student-new-gatepass-btn" class="btn-primary bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs py-2.5 px-4 shadow">
            <i data-lucide="plus-circle" class="w-4 h-4"></i> Apply Gate Pass
          </button>
          <button id="student-new-complaint-btn" class="btn-secondary bg-indigo-900/50 text-white hover:bg-indigo-900 font-bold text-xs py-2.5 px-4 border border-indigo-400/40">
            <i data-lucide="message-square-plus" class="w-4 h-4"></i> File Complaint
          </button>
        </div>
      </div>

      <!-- Main Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <!-- Left: My Active Gate Passes & QR Code Display -->
        <div class="lg:col-span-7 space-y-6">
          <div class="card space-y-4 shadow-sm">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 class="font-bold text-slate-800 text-sm flex items-center gap-2">
                <i data-lucide="qr-code" class="w-4 h-4 text-blue-600"></i> My Gate Passes & QR Pass
              </h3>
              <span class="badge badge-blue text-xs">${myPasses.length} Total Applications</span>
            </div>

            ${myPasses.length === 0 ? `
              <p class="text-xs text-slate-400 text-center py-6">You have no gate pass applications yet.</p>
            ` : `
              <div class="space-y-4">
                ${myPasses.map(pass => `
                  <div class="p-4 rounded-2xl border ${pass.status === 'Approved' ? 'border-emerald-200 bg-emerald-50/20' : pass.status === 'Pending' ? 'border-amber-200 bg-amber-50/20' : 'border-slate-200 bg-slate-50'} space-y-3">
                    
                    <div class="flex items-center justify-between">
                      <div>
                        <span class="font-mono text-xs font-bold text-blue-600">${pass.id}</span>
                        <h4 class="font-bold text-slate-800 text-sm mt-0.5">${pass.reason}</h4>
                      </div>
                      <div>
                        ${pass.status === 'Approved' ? '<span class="badge badge-green text-xs">✓ Approved by Warden</span>' : ''}
                        ${pass.status === 'Pending' ? '<span class="badge badge-orange text-xs">⏳ Pending Warden Approval</span>' : ''}
                        ${pass.status === 'Rejected' ? '<span class="badge badge-red text-xs">✕ Rejected</span>' : ''}
                        ${pass.status === 'Completed' ? '<span class="badge badge-blue text-xs">✓ Completed</span>' : ''}
                      </div>
                    </div>

                    <div class="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-100">
                      <div><span class="text-slate-400 text-[10px] block">Destination:</span> 📍 ${pass.destination}</div>
                      <div><span class="text-slate-400 text-[10px] block">Campus Status:</span> <strong>${pass.movementStatus === 'OUT' ? 'Outside Campus' : 'Inside Campus'}</strong></div>
                      <div><span class="text-slate-400 text-[10px] block">Out Date/Time:</span> ${pass.outDate} @ ${pass.outTime}</div>
                      <div><span class="text-slate-400 text-[10px] block">Expected Return:</span> ${pass.expectedReturnDate} @ ${pass.expectedReturnTime}</div>
                    </div>

                    <!-- Interactive Generated QR Pass Box -->
                    ${pass.status === 'Approved' ? `
                      <div class="p-4 rounded-xl bg-white border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div class="space-y-1 text-center sm:text-left">
                          <span class="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Official Gate Pass QR Code</span>
                          <p class="text-xs text-slate-600">Show this QR code to Security Guard at Main Gate to Mark OUT / Mark IN.</p>
                          <div class="text-[11px] font-mono text-slate-500 font-semibold bg-slate-50 px-2 py-1 rounded inline-block">Token: ${pass.qrToken}</div>
                        </div>

                        <!-- Generated Visual QR Code Card -->
                        <div class="flex flex-col items-center bg-white p-2 border border-slate-200 rounded-xl shadow-inner">
                          <div class="w-24 h-24 bg-slate-900 rounded-lg p-2 flex items-center justify-center text-white relative">
                            <!-- SVG QR pattern simulation -->
                            <svg viewBox="0 0 100 100" class="w-full h-full fill-current text-white">
                              <rect x="0" y="0" width="30" height="30" fill="currentColor" />
                              <rect x="5" y="5" width="20" height="20" fill="#0f172a" />
                              <rect x="10" y="10" width="10" height="10" fill="currentColor" />
                              <rect x="70" y="0" width="30" height="30" fill="currentColor" />
                              <rect x="75" y="5" width="20" height="20" fill="#0f172a" />
                              <rect x="80" y="10" width="10" height="10" fill="currentColor" />
                              <rect x="0" y="70" width="30" height="30" fill="currentColor" />
                              <rect x="5" y="75" width="20" height="20" fill="#0f172a" />
                              <rect x="10" y="80" width="10" height="10" fill="currentColor" />
                              <rect x="40" y="10" width="10" height="10" fill="currentColor" />
                              <rect x="50" y="30" width="20" height="10" fill="currentColor" />
                              <rect x="40" y="50" width="10" height="20" fill="currentColor" />
                              <rect x="70" y="40" width="20" height="20" fill="currentColor" />
                              <rect x="50" y="70" width="30" height="20" fill="currentColor" />
                            </svg>
                          </div>
                          <span class="text-[9px] font-bold text-slate-400 mt-1 uppercase">Scan at Gate</span>
                        </div>
                      </div>
                    ` : ''}

                  </div>
                `).join('')}
              </div>
            `}
          </div>

          <!-- My Complaints -->
          <div class="card space-y-4 shadow-sm">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 class="font-bold text-slate-800 text-sm flex items-center gap-2">
                <i data-lucide="message-square" class="w-4 h-4 text-blue-600"></i> My Submitted Complaints
              </h3>
              <span class="badge badge-gray text-xs">${myComplaints.length} Filed</span>
            </div>

            <div class="space-y-3">
              ${myComplaints.map(cmp => `
                <div class="p-3.5 rounded-xl border border-slate-100 bg-slate-50 text-xs space-y-1.5">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-slate-800">${cmp.subject}</span>
                    <span class="badge ${cmp.status === 'Resolved' ? 'badge-green' : 'badge-blue'} text-[10px]">${cmp.status}</span>
                  </div>
                  <p class="text-slate-600 text-[11px]">${cmp.description}</p>
                  <div class="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    <span>Category: ${cmp.category} (${cmp.assignedDeptHead})</span>
                    <span>${cmp.createdAt}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Right: Published Warden Notices -->
        <div class="lg:col-span-5 space-y-6">
          <div class="card space-y-4 shadow-sm">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 class="font-bold text-slate-800 text-sm flex items-center gap-2">
                <i data-lucide="megaphone" class="w-4 h-4 text-blue-600"></i> Official Warden Notices
              </h3>
              <span class="badge badge-blue text-xs">${notices.length} Active</span>
            </div>

            <div class="space-y-3">
              ${notices.map(notice => `
                <div class="p-4 rounded-xl border border-blue-100 bg-blue-50/30 text-xs space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="badge ${notice.priority === 'Urgent' ? 'badge-red' : 'badge-blue'} text-[10px]">${notice.priority}</span>
                    <span class="text-[10px] text-slate-400">${notice.publishedAt}</span>
                  </div>
                  <h4 class="font-bold text-slate-800 text-sm leading-snug">${notice.title}</h4>
                  <p class="text-slate-600 text-[11px] leading-relaxed">${notice.content}</p>
                  <div class="text-[10px] font-semibold text-blue-700 pt-1">
                    Issued by: ${notice.createdBy}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

      </div>

    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Bind New Gate Pass Application Button
  const newPassBtn = document.getElementById('student-new-gatepass-btn');
  if (newPassBtn) {
    newPassBtn.addEventListener('click', () => {
      const reason = prompt('Enter Gate Pass Reason:', 'Medical Checkup & Doctor Visit');
      if (!reason) return;
      const destination = prompt('Enter Destination:', 'City Hospital, Sector 4');
      if (!destination) return;
      const outTime = prompt('Enter Expected Exit Time (HH:MM):', '17:00');
      if (!outTime) return;
      const expectedReturnTime = prompt('Enter Expected Return Time (HH:MM):', '20:00');
      if (!expectedReturnTime) return;

      const todayStr = new Date().toISOString().split('T')[0];

      store.createGatePassRequest({
        studentId: currentStudent.id,
        studentName: currentStudent.name,
        rollNo: currentStudent.rollNo,
        roomNo: currentStudent.roomNo,
        hostel: currentStudent.hostel,
        reason,
        destination,
        outDate: todayStr,
        outTime,
        expectedReturnDate: todayStr,
        expectedReturnTime
      });

      alert('✓ Gate Pass Application submitted! It is now pending Warden Approval in the Staff ERP.');
      window.renderApp();
    });
  }

  // Bind File Complaint Button (Individual or Group)
  const newCmpBtn = document.getElementById('student-new-complaint-btn');
  if (newCmpBtn) {
    newCmpBtn.addEventListener('click', () => {
      const type = confirm('Click OK for Group Complaint, Cancel for Individual Complaint') ? 'Group' : 'Individual';
      const category = prompt('Enter Complaint Category (Plumbing, Electricity, Maintenance, Mess, Housekeeping, Internet/WiFi):', 'Plumbing');
      if (!category) return;
      const subject = prompt('Enter Complaint Subject:', 'Bathroom Tap Leakage in Room A-204');
      if (!subject) return;
      const description = prompt('Enter Detailed Description:', 'Water leaking continuously causing floor overflow.');
      if (!description) return;

      let groupMembers = [];
      if (type === 'Group') {
        const membersStr = prompt('Enter affected student names / rooms separated by commas:', 'Aarav Patel (A-204), Rohan Mehta (A-312)');
        if (membersStr) groupMembers = membersStr.split(',').map(s => s.trim());
      }

      store.createComplaint({
        type,
        studentId: currentStudent.id,
        studentName: currentStudent.name,
        groupMembers,
        roomNo: currentStudent.roomNo,
        hostel: currentStudent.hostel,
        category,
        subject,
        description,
        priority: 'High'
      });

      alert(`✓ ${type} Complaint submitted and auto-routed to ${category} Department Head!`);
      window.renderApp();
    });
  }
}

window.renderStudentSimulatorPortal = renderStudentSimulatorPortal;
