// Comprehensive Dashboard Reports & Analytics Component with CSV / JSON Exporter

function renderReportsPortal(containerId, store) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const data = store.data;
  const gatePasses = data.gate_passes;
  const complaints = data.complaints;
  const logs = data.security_logs;

  const totalPasses = gatePasses.length;
  const approvedPasses = gatePasses.filter(g => g.status === 'Approved' || g.status === 'Completed').length;
  const rejectedPasses = gatePasses.filter(g => g.status === 'Rejected').length;
  const pendingPasses = gatePasses.filter(g => g.status === 'Pending').length;

  const after7PMCount = logs.filter(l => l.isAfter7PM).length;
  const lateReturnsCount = logs.filter(l => l.isLateReturn).length;

  // Department complaints distribution
  const deptStats = {
    Plumbing: complaints.filter(c => c.category === 'Plumbing' || c.category === 'Water').length,
    Electricity: complaints.filter(c => c.category === 'Electricity' || c.category === 'Power').length,
    Maintenance: complaints.filter(c => c.category === 'Maintenance' || c.category === 'Furniture').length,
    Mess: complaints.filter(c => c.category === 'Mess' || c.category === 'Food').length,
    Housekeeping: complaints.filter(c => c.category === 'Housekeeping' || c.category === 'Cleaning').length
  };

  container.innerHTML = `
    <div class="animate-fade-in space-y-6">
      
      <!-- Reports Header Banner -->
      <div class="bg-gradient-to-r from-blue-800 via-slate-800 to-indigo-900 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span class="badge bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] uppercase font-bold tracking-wider">Analytics & Compliance</span>
          <h2 class="text-2xl font-extrabold tracking-tight mt-1">Staff ERP Analytics & Reports</h2>
          <p class="text-xs text-blue-100 mt-1">Exportable audit reports for hostel attendance, warden gate pass approvals, security logs, and complaint resolution rates.</p>
        </div>
        <div class="flex items-center gap-3">
          <button id="export-csv-btn" class="btn-primary bg-emerald-600 hover:bg-emerald-500 font-bold text-xs py-2.5 px-4 shadow flex items-center gap-2">
            <i data-lucide="download" class="w-4 h-4"></i> Export CSV Report
          </button>
          <button id="export-json-btn" class="btn-secondary bg-slate-700 text-white hover:bg-slate-600 font-bold text-xs py-2.5 px-4 border border-slate-500 flex items-center gap-2">
            <i data-lucide="file-json" class="w-4 h-4"></i> Export JSON Data
          </button>
        </div>
      </div>

      <!-- Stat Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div class="stat-card border-t-4 border-t-blue-600">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block">Total Gate Passes</span>
          <div class="text-2xl font-extrabold text-slate-800 mt-2">${totalPasses}</div>
          <div class="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
            <span class="text-emerald-600 font-bold">${approvedPasses} Approved</span> •
            <span class="text-red-600 font-bold">${rejectedPasses} Rejected</span>
          </div>
        </div>

        <div class="stat-card border-t-4 border-t-amber-500">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block">Pending Warden Authorization</span>
          <div class="text-2xl font-extrabold text-amber-600 mt-2">${pendingPasses}</div>
          <span class="text-[11px] text-amber-700 font-semibold mt-1 block">Awaiting Decision</span>
        </div>

        <div class="stat-card border-t-4 border-t-red-500 bg-red-50/20">
          <span class="text-xs font-bold text-red-700 uppercase tracking-wider block">After 7 PM Exits Flagged</span>
          <div class="text-2xl font-extrabold text-red-600 mt-2">${after7PMCount}</div>
          <span class="text-[11px] text-red-500 font-semibold mt-1 block">Warden Alerted</span>
        </div>

        <div class="stat-card border-t-4 border-t-purple-500 bg-purple-50/20">
          <span class="text-xs font-bold text-purple-700 uppercase tracking-wider block">Late Returns Flagged</span>
          <div class="text-2xl font-extrabold text-purple-600 mt-2">${lateReturnsCount}</div>
          <span class="text-[11px] text-purple-600 font-semibold mt-1 block">Overdue Exits</span>
        </div>

      </div>

      <!-- Department Complaint Resolution Progress Bars -->
      <div class="card space-y-4 shadow-sm">
        <h3 class="font-bold text-slate-800 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
          <i data-lucide="pie-chart" class="w-4 h-4 text-blue-600"></i> Department-wise Complaint Distribution
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-5 gap-4 pt-2">
          ${Object.entries(deptStats).map(([dept, count]) => `
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <span class="text-xs font-bold text-slate-700 block">${dept}</span>
              <div class="text-xl font-extrabold text-blue-600">${count} Complaints</div>
              <div class="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div class="bg-blue-600 h-full rounded-full" style="width: ${Math.min(count * 25, 100)}%"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Security Flagged Incidents Summary Table -->
      <div class="card space-y-4 shadow-sm">
        <h3 class="font-bold text-slate-800 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
          <i data-lucide="shield-alert" class="w-4 h-4 text-red-600"></i> Security Flagged Movement Incidents
        </h3>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Log ID</th>
                <th>Student Name</th>
                <th>Gate Pass ID</th>
                <th>Movement Type</th>
                <th>Flag Category</th>
                <th>Guard Name</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              ${logs.filter(l => l.isAfter7PM || l.isLateReturn).map(log => `
                <tr class="bg-red-50/20">
                  <td class="font-mono text-xs font-semibold text-slate-500">${log.id}</td>
                  <td class="font-bold text-xs text-slate-800">${log.studentName}</td>
                  <td class="font-mono text-xs font-bold text-blue-600">${log.gatePassId}</td>
                  <td class="text-xs font-semibold text-slate-700">${log.movementType}</td>
                  <td>
                    ${log.isAfter7PM ? '<span class="badge badge-red text-[10px]">AFTER 7 PM EXIT</span>' : ''}
                    ${log.isLateReturn ? `<span class="badge badge-purple text-[10px]">LATE RETURN (${log.lateDuration})</span>` : ''}
                  </td>
                  <td class="text-xs text-slate-600">${log.guardName}</td>
                  <td class="text-xs text-slate-600">${log.timestamp}</td>
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

  // Export CSV Handler
  const csvBtn = document.getElementById('export-csv-btn');
  if (csvBtn) {
    csvBtn.addEventListener('click', () => {
      let csvContent = 'data:text/csv;charset=utf-8,';
      csvContent += 'Gate Pass ID,Student Name,Roll No,Hostel,Reason,Destination,Status,Approved By,Exit Time,Return Time,Movement Status\n';

      data.gate_passes.forEach(p => {
        csvContent += `"${p.id}","${p.studentName}","${p.rollNo}","${p.hostel}","${p.reason}","${p.destination}","${p.status}","${p.approvedBy || ''}","${p.actualExitTime || ''}","${p.actualReturnTime || ''}","${p.movementStatus}"\n`;
      });

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `Staff_ERP_GatePass_Report_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // Export JSON Handler
  const jsonBtn = document.getElementById('export-json-btn');
  if (jsonBtn) {
    jsonBtn.addEventListener('click', () => {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `Staff_ERP_Master_Export_${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    });
  }
}

window.renderReportsPortal = renderReportsPortal;
