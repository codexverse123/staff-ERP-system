// QR Scanner Component for Security Staff with Camera & Token Simulation

function renderQRScanner(containerId, store) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Active passes available for easy demo scanning
  const activePasses = store.data.gate_passes;

  container.innerHTML = `
    <div class="animate-fade-in max-w-4xl mx-auto space-y-6">
      
      <!-- Title Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="page-header flex items-center gap-2">
            <i data-lucide="qr-code" class="w-7 h-7 text-blue-600"></i> Security QR Code Verification Scanner
          </h2>
          <p class="page-subtitle">Scan student Gate Pass QR code or input QR Token at Campus Gate (/staff/security/scan)</p>
        </div>
        <div class="flex items-center gap-2">
          <span class="badge badge-green py-1 px-3 text-xs">
            <i data-lucide="shield-check" class="w-3.5 h-3.5"></i> Security Portal Active
          </span>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <!-- Left Side: Scanner / Input Box -->
        <div class="lg:col-span-6 space-y-6">
          
          <div class="card space-y-5 shadow-md">
            <h3 class="font-bold text-slate-800 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
              <i data-lucide="camera" class="w-4 h-4 text-blue-600"></i> QR Camera / Token Scanner
            </h3>

            <!-- Simulated Camera Scanner Viewfinder -->
            <div id="qr-camera-viewport" class="relative bg-slate-900 rounded-2xl h-56 flex flex-col items-center justify-center text-white overflow-hidden group shadow-inner">
              <div class="absolute inset-4 border-2 border-dashed border-blue-400/60 rounded-xl flex items-center justify-center pointer-events-none">
                <div class="w-full h-0.5 bg-blue-500 animate-pulse"></div>
              </div>
              <i data-lucide="scan" class="w-12 h-12 text-blue-400 mb-2 animate-bounce"></i>
              <p class="text-xs font-semibold text-slate-300">Position Student Gate Pass QR code here</p>
              <span class="text-[10px] text-slate-400 mt-1">Live Camera Feed Ready</span>
            </div>

            <!-- Manual Token Input or Quick Select -->
            <div class="space-y-3 pt-2">
              <label class="form-label font-bold text-xs flex items-center gap-1.5">
                <i data-lucide="key" class="w-3.5 h-3.5 text-slate-500"></i> Direct Token Input or Select Active Pass:
              </label>
              <div class="flex gap-2">
                <input type="text" id="qr-token-input" placeholder="e.g. GP-8901-SEC-AARAV" class="form-input text-xs uppercase tracking-wider font-mono">
                <button id="verify-qr-btn" class="btn-primary text-xs py-2.5 px-4 whitespace-nowrap">
                  Verify Pass
                </button>
              </div>

              <!-- Quick Demo Picker Pills -->
              <div class="space-y-1.5 pt-2">
                <span class="text-[11px] font-semibold text-slate-500 block">Click a Demo Gate Pass to Scan Instant:</span>
                <div class="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-1">
                  ${activePasses.map(p => `
                    <button class="demo-qr-pill border border-slate-200 hover:border-blue-500 bg-slate-50 hover:bg-blue-50 text-slate-700 text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all text-left" data-token="${p.qrToken}">
                      <i data-lucide="qr-code" class="w-3.5 h-3.5 ${p.status === 'Approved' ? 'text-blue-600' : 'text-slate-400'}"></i>
                      <div>
                        <span class="font-bold block">${p.studentName} (${p.id})</span>
                        <span class="text-[10px] text-slate-500">${p.status} | ${p.movementStatus}</span>
                      </div>
                    </button>
                  `).join('')}
                </div>
              </div>

            </div>
          </div>

          <!-- Business Rules Banner -->
          <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs space-y-1.5">
            <div class="font-bold flex items-center gap-2">
              <i data-lucide="alert-triangle" class="w-4 h-4 text-amber-600"></i> Automated Security Rules Active:
            </div>
            <ul class="list-disc pl-5 space-y-1 text-amber-800 text-[11px]">
              <li><strong>AFTER 7 PM EXIT:</strong> Exits marked after 7:00 PM are automatically flagged & trigger a Warden notification.</li>
              <li><strong>LATE RETURN:</strong> Returns past expected return time calculate total late duration automatically.</li>
              <li><strong>APPROVAL RESTRICTION:</strong> Security staff can verify & record movement, but CANNOT create or approve gate passes.</li>
            </ul>
          </div>

        </div>

        <!-- Right Side: Scanned Gate Pass Details & Action Box -->
        <div class="lg:col-span-6">
          <div id="scanned-result-panel" class="card space-y-5 h-full flex flex-col justify-between shadow-md">
            <div class="text-center py-12 text-slate-400 space-y-3">
              <i data-lucide="scan-line" class="w-12 h-12 mx-auto text-slate-300"></i>
              <h4 class="font-semibold text-slate-600 text-sm">No Gate Pass Scanned Yet</h4>
              <p class="text-xs text-slate-400 max-w-xs mx-auto">Select a pass from the left or scan a QR code to view student verification details & perform MARK OUT / MARK IN.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Setup Verification logic
  const tokenInput = document.getElementById('qr-token-input');
  const verifyBtn = document.getElementById('verify-qr-btn');
  const resultPanel = document.getElementById('scanned-result-panel');

  const processTokenVerification = (token) => {
    if (!token) return;
    const cleanToken = token.trim();
    const pass = store.data.gate_passes.find(g => g.qrToken.toLowerCase() === cleanToken.toLowerCase() || g.id.toLowerCase() === cleanToken.toLowerCase());

    if (!pass) {
      resultPanel.innerHTML = `
        <div class="p-6 bg-red-50 border border-red-200 rounded-2xl text-center text-red-700 space-y-3 animate-fade-in">
          <i data-lucide="x-circle" class="w-12 h-12 text-red-500 mx-auto"></i>
          <h4 class="font-bold text-base">Invalid or Unrecognized QR Code</h4>
          <p class="text-xs text-red-600">No matching active gate pass record found for token: <code class="font-mono bg-red-100 px-2 py-0.5 rounded">${cleanToken}</code></p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    renderScannedPassDetails(pass);
  };

  const renderScannedPassDetails = (pass) => {
    const isApproved = pass.status === 'Approved';
    const isPending = pass.status === 'Pending';
    const isRejected = pass.status === 'Rejected';
    const isCompleted = pass.status === 'Completed';

    const now = new Date();
    const isCurrentTimeAfter7PM = now.getHours() >= 19;

    resultPanel.innerHTML = `
      <div class="space-y-5 animate-fade-in">
        
        <!-- Status Header Badge -->
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Scanned Pass ID</span>
            <h3 class="font-bold text-slate-800 text-lg flex items-center gap-2 font-mono">
              ${pass.id}
            </h3>
          </div>
          <div>
            ${isApproved ? '<span class="badge badge-green text-xs px-3 py-1">✓ Approved by Warden</span>' : ''}
            ${isPending ? '<span class="badge badge-orange text-xs px-3 py-1">⏳ Pending Warden Approval</span>' : ''}
            ${isRejected ? '<span class="badge badge-red text-xs px-3 py-1">✕ Rejected</span>' : ''}
            ${isCompleted ? '<span class="badge badge-blue text-xs px-3 py-1">✓ Completed Pass</span>' : ''}
          </div>
        </div>

        <!-- Student Photo & Info Card -->
        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-4">
          <div class="w-14 h-14 rounded-2xl bg-blue-600 text-white font-bold text-xl flex items-center justify-center shadow-md">
            ${pass.studentName.charAt(0)}
          </div>
          <div class="flex-1 space-y-1">
            <h4 class="font-bold text-slate-800 text-base leading-tight">${pass.studentName}</h4>
            <div class="grid grid-cols-2 gap-x-4 text-xs text-slate-600">
              <div><span class="text-slate-400">Roll No:</span> <strong>${pass.rollNo}</strong></div>
              <div><span class="text-slate-400">Hostel:</span> <strong>${pass.hostel} (${pass.roomNo})</strong></div>
            </div>
          </div>
        </div>

        <!-- Gate Pass Details Grid -->
        <div class="grid grid-cols-2 gap-3 text-xs">
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <span class="text-slate-400 font-medium block text-[11px]">Reason for Exit</span>
            <span class="font-semibold text-slate-800 block">${pass.reason}</span>
          </div>
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <span class="text-slate-400 font-medium block text-[11px]">Destination</span>
            <span class="font-semibold text-slate-800 block">${pass.destination}</span>
          </div>
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <span class="text-slate-400 font-medium block text-[11px]">Expected Exit</span>
            <span class="font-semibold text-slate-800 block">${pass.outDate} @ ${pass.outTime}</span>
          </div>
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <span class="text-slate-400 font-medium block text-[11px]">Expected Return</span>
            <span class="font-semibold text-slate-800 block">${pass.expectedReturnDate} @ ${pass.expectedReturnTime}</span>
          </div>
        </div>

        <!-- Warden Approval Verification Box -->
        <div class="p-3 rounded-xl bg-blue-50/80 border border-blue-100 text-xs text-blue-900 space-y-1">
          <div class="font-bold flex items-center justify-between">
            <span>Warden Verification:</span>
            <span>${pass.approvalTime || 'N/A'}</span>
          </div>
          <p class="text-blue-800 text-[11px]">Approved By: <strong>${pass.approvedBy || 'Pending'}</strong></p>
        </div>

        <!-- Movement Status Indicator -->
        <div class="p-3 rounded-xl ${pass.movementStatus === 'OUT' ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-emerald-50 border-emerald-200 text-emerald-900'} text-xs font-semibold flex items-center justify-between">
          <span class="flex items-center gap-1.5">
            <i data-lucide="${pass.movementStatus === 'OUT' ? 'log-out' : 'log-in'}" class="w-4 h-4"></i>
            Current Location Status: <strong>${pass.movementStatus === 'OUT' ? 'OUTSIDE CAMPUS' : 'INSIDE CAMPUS'}</strong>
          </span>
          <span class="text-[10px] text-slate-500">${pass.actualExitTime ? 'Exit: ' + pass.actualExitTime.substring(11) : ''}</span>
        </div>

        ${isCurrentTimeAfter7PM && pass.movementStatus === 'INSIDE' ? `
          <div class="p-2.5 bg-red-100 border border-red-300 rounded-xl text-red-800 text-xs font-semibold flex items-center gap-2 animate-pulse">
            <i data-lucide="clock" class="w-4 h-4 text-red-600"></i>
            <span>⚠️ Current Time is After 7:00 PM. Marking OUT will trigger AFTER 7 PM flag.</span>
          </div>
        ` : ''}

        <!-- Security Action Buttons -->
        <div class="pt-3 border-t border-slate-100 flex items-center gap-3">
          ${isApproved && pass.movementStatus === 'INSIDE' ? `
            <button id="mark-out-action-btn" class="w-full btn-danger text-xs py-3 rounded-xl flex items-center justify-center gap-2 font-bold shadow-md">
              <i data-lucide="log-out" class="w-4 h-4"></i> MARK OUT (Record Campus Exit)
            </button>
          ` : ''}

          ${pass.movementStatus === 'OUT' ? `
            <button id="mark-in-action-btn" class="w-full btn-success text-xs py-3 rounded-xl flex items-center justify-center gap-2 font-bold shadow-md">
              <i data-lucide="log-in" class="w-4 h-4"></i> MARK IN (Record Campus Return)
            </button>
          ` : ''}

          ${!isApproved && pass.movementStatus === 'INSIDE' ? `
            <div class="w-full p-3 bg-slate-100 text-slate-500 text-xs rounded-xl text-center font-medium">
              Cannot Mark OUT. Only Warden Approved Gate Passes can be processed by Security.
            </div>
          ` : ''}
        </div>

      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    // Event handlers for Mark Out & Mark In
    const markOutBtn = document.getElementById('mark-out-action-btn');
    if (markOutBtn) {
      markOutBtn.addEventListener('click', () => {
        try {
          const res = store.markStudentOut(pass.id, store.currentUser.name || 'Ramakant');
          alert(`✓ Student ${pass.studentName} marked OUT successfully! ${res.isAfter7PM ? '\n⚠️ FLAGGED: Exit after 7:00 PM. Warden notified.' : ''}`);
          window.renderApp();
        } catch (e) {
          alert('Error: ' + e.message);
        }
      });
    }

    const markInBtn = document.getElementById('mark-in-action-btn');
    if (markInBtn) {
      markInBtn.addEventListener('click', () => {
        try {
          const res = store.markStudentIn(pass.id, store.currentUser.name || 'Ramakant');
          alert(`✓ Student ${pass.studentName} marked IN successfully! ${res.isLateReturn ? `\n⚠️ FLAGGED: Late Return by ${res.lateDurationStr}. Warden notified.` : ''}`);
          window.renderApp();
        } catch (e) {
          alert('Error: ' + e.message);
        }
      });
    }
  };

  if (verifyBtn && tokenInput) {
    verifyBtn.addEventListener('click', () => {
      processTokenVerification(tokenInput.value);
    });
  }

  // Demo pills click handler
  const pills = container.querySelectorAll('.demo-qr-pill');
  pills.forEach(p => {
    p.addEventListener('click', () => {
      const tok = p.getAttribute('data-token');
      if (tokenInput) tokenInput.value = tok;
      processTokenVerification(tok);
    });
  });
}

window.renderQRScanner = renderQRScanner;
