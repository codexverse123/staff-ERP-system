// Security Portal Component inside Staff ERP

function renderSecurityPortal(containerId, store, subTab = 'security-overview') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const data = store.data;
  const gatePasses = data.gate_passes;
  const securityLogs = data.security_logs;

  const studentsOutside = gatePasses.filter(g => g.movementStatus === 'OUT');
  const studentsInside = data.students.filter(s => s.status === 'Inside');
  const todayExits = securityLogs.filter(l => l.movementType === 'EXIT');
  const todayEntries = securityLogs.filter(l => l.movementType === 'ENTRY');
  const after7PMExits = securityLogs.filter(l => l.isAfter7PM);
  const lateReturns = securityLogs.filter(l => l.isLateReturn);

  container.innerHTML = `
    <div class="animate-fade-in space-y-6">
      
      <!-- Security Header Banner -->
      <div class="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="badge bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] uppercase font-bold tracking-wider">Gate Security Portal</span>
            <span class="text-xs text-slate-400">Shift: Evening (2 PM - 10 PM)</span>
          </div>
          <h2 class="text-2xl font-extrabold tracking-tight">Main Gate Security Terminal</h2>
          <p class="text-xs text-slate-300 mt-1">Real-time gate pass QR verification, campus movement logging, after-7PM exit flagging & late return detection.</p>
        </div>
        <div class="flex items-center gap-3">
          <button onclick="window.appState.currentTab='security-scan'; window.renderApp();" class="btn-primary bg-blue-600 hover:bg-blue-500 font-bold text-xs py-2.5 px-5 shadow-lg shadow-blue-500/30 flex items-center gap-2">
            <i data-lucide="qr-code" class="w-4 h-4"></i> Scan Gate Pass QR Code
          </button>
        </div>
      </div>

      <!-- Security Stat Cards Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <div class="stat-card p-4 border-t-4 border-t-amber-500">
          <span class="text-[11px] font-bold text-slate-500 uppercase block">Currently Outside</span>
          <div class="text-xl font-extrabold text-amber-600 mt-1">${studentsOutside.length}</div>
          <span class="text-[10px] text-slate-400">On Active Gate Pass</span>
        </div>

        <div class="stat-card p-4 border-t-4 border-t-emerald-500">
          <span class="text-[11px] font-bold text-slate-500 uppercase block">Inside Campus</span>
          <div class="text-xl font-extrabold text-emerald-600 mt-1">${studentsInside.length}</div>
          <span class="text-[10px] text-slate-400">Hostel Residents</span>
        </div>

        <div class="stat-card p-4 border-t-4 border-t-blue-500">
          <span class="text-[11px] font-bold text-slate-500 uppercase block">Today's Exits</span>
          <div class="text-xl font-extrabold text-blue-600 mt-1">${todayExits.length}</div>
          <span class="text-[10px] text-slate-400">Recorded Out</span>
        </div>

        <div class="stat-card p-4 border-t-4 border-t-indigo-500">
          <span class="text-[11px] font-bold text-slate-500 uppercase block">Today's Entries</span>
          <div class="text-xl font-extrabold text-indigo-600 mt-1">${todayEntries.length}</div>
          <span class="text-[10px] text-slate-400">Recorded In</span>
        </div>

        <div class="stat-card p-4 border-t-4 border-t-red-500 bg-red-50/40">
          <span class="text-[11px] font-bold text-red-700 uppercase block">After 7 PM Exits</span>
          <div class="text-xl font-extrabold text-red-600 mt-1">${after7PMExits.length}</div>
          <span class="text-[10px] text-red-500 font-semibold">Flagged Alerts</span>
        </div>

        <div class="stat-card p-4 border-t-4 border-t-purple-500 bg-purple-50/40">
          <span class="text-[11px] font-bold text-purple-700 uppercase block">Late Returns</span>
          <div class="text-xl font-extrabold text-purple-600 mt-1">${lateReturns.length}</div>
          <span class="text-[10px] text-purple-500 font-semibold">Overdue Duration</span>
        </div>

      </div>

      <!-- Students Currently Outside Table -->
      <div class="card space-y-4 shadow-sm">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 class="font-bold text-slate-800 text-sm flex items-center gap-2">
            <i data-lucide="external-link" class="w-4 h-4 text-amber-600"></i> Students Currently Outside Campus
          </h3>
          <span class="badge badge-orange text-xs">${studentsOutside.length} Active Outside</span>
        </div>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Gate Pass ID</th>
                <th>Student Name</th>
                <th>Roll No & Room</th>
                <th>Destination</th>
                <th>Exit Time</th>
                <th>Expected Return</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${studentsOutside.length === 0 ? `
                <tr><td colspan="7" class="text-center py-6 text-slate-400 text-xs">No students currently outside campus.</td></tr>
              ` : studentsOutside.map(p => `
                <tr>
                  <td class="font-mono font-bold text-xs text-blue-600">${p.id}</td>
                  <td class="font-bold text-xs text-slate-800">${p.studentName}</td>
                  <td class="text-xs text-slate-600">${p.rollNo} (${p.roomNo})</td>
                  <td class="text-xs text-slate-600">${p.destination}</td>
                  <td class="text-xs font-semibold text-amber-700">${p.actualExitTime || 'OUT'}</td>
                  <td class="text-xs text-slate-700">${p.expectedReturnDate} @ ${p.expectedReturnTime}</td>
                  <td>
                    <button class="mark-in-table-btn btn-success text-xs py-1 px-3" data-id="${p.id}">
                      Mark IN
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Security Activity & Movement Logs Table -->
      <div class="card space-y-4 shadow-sm">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 class="font-bold text-slate-800 text-sm flex items-center gap-2">
            <i data-lucide="history" class="w-4 h-4 text-blue-600"></i> Security Movement Activity Logs
          </h3>
          <span class="badge badge-gray text-xs">${securityLogs.length} Records</span>
        </div>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Log ID</th>
                <th>Pass ID</th>
                <th>Student Name</th>
                <th>Movement</th>
                <th>Timestamp</th>
                <th>Guard Name</th>
                <th>Verification Flag / Notes</th>
              </tr>
            </thead>
            <tbody>
              ${securityLogs.map(log => `
                <tr>
                  <td class="font-mono text-xs font-semibold text-slate-500">${log.id}</td>
                  <td class="font-mono text-xs font-bold text-blue-600">${log.gatePassId}</td>
                  <td class="font-bold text-xs text-slate-800">${log.studentName}</td>
                  <td>
                    ${log.movementType === 'EXIT' ? '<span class="badge badge-orange text-[10px]">EXIT</span>' : '<span class="badge badge-green text-[10px]">ENTRY</span>'}
                  </td>
                  <td class="text-xs text-slate-600">${log.timestamp}</td>
                  <td class="text-xs text-slate-600">${log.guardName}</td>
                  <td>
                    ${log.isAfter7PM ? '<span class="badge badge-red text-[10px] mr-1">⚠️ AFTER 7 PM EXIT</span>' : ''}
                    ${log.isLateReturn ? `<span class="badge badge-purple text-[10px] mr-1">⚠️ LATE RETURN (${log.lateDuration})</span>` : ''}
                    <span class="text-[11px] text-slate-500">${log.notes}</span>
                  </td>
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

  // Bind Mark IN buttons from the table
  const markInBtns = container.querySelectorAll('.mark-in-table-btn');
  markInBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const passId = btn.getAttribute('data-id');
      try {
        const res = store.markStudentIn(passId, store.currentUser.name || 'Ramakant');
        alert(`✓ Student marked IN successfully! ${res.isLateReturn ? `\n⚠️ FLAGGED: Late Return by ${res.lateDurationStr}` : ''}`);
        window.renderApp();
      } catch (e) {
        alert('Error: ' + e.message);
      }
    });
  });
}

window.renderSecurityPortal = renderSecurityPortal;
