// Staff ERP Shared Database & State Manager (LocalStorage Backed)

const DB_KEY = 'STAFF_ERP_DB_V1';

// Initial pre-seeded mock database
const initialData = {
  users: [
    { id: 'usr-1', name: 'Abhijeet das', email: 'warden@college.edu', role: 'Warden', employeeId: 'EMP-1001', phone: '+91 98765 43213', status: 'Approved', department: 'Hostel Administration', hostel: 'Block A (Boys)', dateJoined: '2023-01-15', password: 'Password123' },
    { id: 'usr-2', name: 'Gurpreet singh', email: 'admin@college.edu', role: 'Super Admin', employeeId: 'EMP-0001', phone: '+91 98765 00000', status: 'Approved', department: 'IT & Management', hostel: 'All Blocks', dateJoined: '2022-06-01', password: 'Password123' },
    { id: 'usr-3', name: 'Rajesh kumar', email: 'plumber@college.edu', role: 'Plumber Head', employeeId: 'EMP-2001', phone: '+91 98765 11111', status: 'Approved', department: 'Plumbing & Water', hostel: 'All Blocks', dateJoined: '2023-03-10', password: 'Password123' },
    { id: 'usr-4', name: 'Vikram Singh', email: 'electricity@college.edu', role: 'Electricity Head', employeeId: 'EMP-2002', phone: '+91 98765 22222', status: 'Approved', department: 'Electrical Maintenance', hostel: 'All Blocks', dateJoined: '2023-03-12', password: 'Password123' },
    { id: 'usr-5', name: 'Saranga pallei', email: 'maintenance@college.edu', role: 'Maintenance Head', employeeId: 'EMP-2003', phone: '+91 98765 33333', status: 'Approved', department: 'General Repairs', hostel: 'All Blocks', dateJoined: '2023-04-01', password: 'Password123' },
    { id: 'usr-6', name: 'Arun patel', email: 'mess@college.edu', role: 'Mess/Food Head', employeeId: 'EMP-2004', phone: '+91 98765 44444', status: 'Approved', department: 'Mess & Catering', hostel: 'Central Dining', dateJoined: '2023-02-20', password: 'Password123' },
    { id: 'usr-7', name: 'Brijesh kumar', email: 'housekeeping@college.edu', role: 'Housekeeping Head', employeeId: 'EMP-2005', phone: '+91 98765 55555', status: 'Approved', department: 'Cleaning & Hygiene', hostel: 'All Blocks', dateJoined: '2023-05-15', password: 'Password123' },
    { id: 'usr-8', name: 'Ramakant', email: 'security@college.edu', role: 'Security Guard', employeeId: 'SEC-3001', phone: '+91 98765 66666', status: 'Approved', department: 'Security Division', hostel: 'Main Gate Gate-1', dateJoined: '2023-01-01', shift: 'Evening (2PM - 10PM)', agency: 'Sentinel Security Solutions', password: 'Password123' },
    { id: 'usr-9', name: 'Mohan', email: 'securityhead@college.edu', role: 'Security Head', employeeId: 'SEC-3000', phone: '+91 98765 77777', status: 'Approved', department: 'Security Division', hostel: 'Campus Security Office', dateJoined: '2022-11-01', shift: 'General (9AM - 6PM)', agency: 'Sentinel Security Solutions', password: 'Password123' },
    { id: 'usr-10', name: 'Priya Sharma (Pending Staff)', email: 'priya.staff@college.edu', role: 'Other Staff', employeeId: 'EMP-4001', phone: '+91 98765 88888', status: 'Pending Verification', department: 'Library', hostel: 'N/A', dateJoined: '2026-10-01', password: 'Password123' }
  ],
  students: [
    { id: 'STU-101', name: 'Aarav Patel', rollNo: 'CS2023-045', roomNo: 'A-204', hostel: 'H1 (Boys)', phone: '+91 91234 56789', email: 'aarav.p@student.edu', guardianPhone: '+91 98222 11111', course: 'B.Tech CS', status: 'Outside' },
    { id: 'STU-102', name: 'Ananya Deshmukh', rollNo: 'EC2023-012', roomNo: 'B-108', hostel: 'H2 (Girls)', phone: '+91 91234 56790', email: 'ananya.d@student.edu', guardianPhone: '+91 98222 22222', course: 'B.Tech ECE', status: 'Inside' },
    { id: 'STU-103', name: 'Rohan Mehta', rollNo: 'ME2022-089', roomNo: 'A-312', hostel: 'H1 (Boys)', phone: '+91 91234 56791', email: 'rohan.m@student.edu', guardianPhone: '+91 98222 33333', course: 'B.Tech Mech', status: 'Inside' },
    { id: 'STU-104', name: 'Sneha Iyer', rollNo: 'CS2024-102', roomNo: 'B-305', hostel: 'H2 (Girls)', phone: '+91 91234 56792', email: 'sneha.i@student.edu', guardianPhone: '+91 98222 44444', course: 'B.Tech CS', status: 'Outside' },
    { id: 'STU-105', name: 'Vikrant Gupta', rollNo: 'EE2023-034', roomNo: 'A-105', hostel: 'H1 (Boys)', phone: '+91 91234 56793', email: 'vikrant.g@student.edu', guardianPhone: '+91 98222 55555', course: 'B.Tech Electrical', status: 'Inside' }
  ],
  hostels: [
    { id: 'HST-1', name: 'H1 (Boys)', wardenId: 'usr-1', totalRooms: 120, capacity: 240, occupied: 210 },
    { id: 'HST-2', name: 'H2 (Girls)', wardenId: 'usr-1', totalRooms: 100, capacity: 200, occupied: 185 }
  ],
  gate_passes: [
    {
      id: 'GP-8901',
      studentId: 'STU-101',
      studentName: 'Aarav Patel',
      rollNo: 'CS2023-045',
      roomNo: 'A-204',
      hostel: 'H1 (Boys)',
      reason: 'Doctor Appointment & Medical Checkup',
      destination: 'City Hospital, Sector 4',
      applicationTime: '2026-10-02 14:00',
      outDate: '2026-10-02',
      outTime: '15:30',
      expectedReturnDate: '2026-10-02',
      expectedReturnTime: '18:30',
      actualExitTime: '2026-10-02 15:45',
      actualReturnTime: null,
      status: 'Approved', // Pending, Approved, Rejected, Completed, Expired
      approvedBy: 'Abhijeet das (Warden)',
      approvalTime: '2026-10-02 14:30',
      rejectionReason: '',
      qrToken: 'GP-8901-SEC-AARAV',
      movementStatus: 'OUT' // INSIDE, OUT
    },
    {
      id: 'GP-8902',
      studentId: 'STU-103',
      studentName: 'Rohan Mehta',
      rollNo: 'ME2022-089',
      roomNo: 'A-312',
      hostel: 'H1 (Boys)',
      reason: 'Buying Textbooks & Project Supplies',
      destination: 'Central Book Market',
      applicationTime: '2026-10-02 16:00',
      outDate: '2026-10-02',
      outTime: '17:00',
      expectedReturnDate: '2026-10-02',
      expectedReturnTime: '20:00',
      actualExitTime: null,
      actualReturnTime: null,
      status: 'Pending',
      approvedBy: null,
      approvalTime: null,
      rejectionReason: '',
      qrToken: 'GP-8902-SEC-ROHAN',
      movementStatus: 'INSIDE'
    },
    {
      id: 'GP-8903',
      studentId: 'STU-104',
      studentName: 'Sneha Iyer',
      rollNo: 'CS2024-102',
      roomNo: 'B-305',
      hostel: 'H2 (Girls)',
      reason: 'Family Gathering / Weekend Home Visit',
      destination: 'Green Park, Block 12',
      applicationTime: '2026-10-02 17:30',
      outDate: '2026-10-02',
      outTime: '19:30',
      expectedReturnDate: '2026-10-02',
      expectedReturnTime: '21:00',
      actualExitTime: '2026-10-02 19:45',
      actualReturnTime: null,
      status: 'Approved',
      approvedBy: 'Abhijeet das (Warden)',
      approvalTime: '2026-10-02 18:00',
      rejectionReason: '',
      qrToken: 'GP-8903-SEC-SNEHA',
      movementStatus: 'OUT'
    },
    {
      id: 'GP-8899',
      studentId: 'STU-105',
      studentName: 'Vikrant Gupta',
      rollNo: 'EE2023-034',
      roomNo: 'A-105',
      hostel: 'H1 (Boys)',
      reason: 'Evening Gym & Groceries',
      destination: 'Local Supermarket',
      applicationTime: '2026-10-01 16:00',
      outDate: '2026-10-01',
      outTime: '17:00',
      expectedReturnDate: '2026-10-01',
      expectedReturnTime: '19:00',
      actualExitTime: '2026-10-01 17:05',
      actualReturnTime: '2026-10-01 20:15',
      status: 'Completed',
      approvedBy: 'Abhijeet das (Warden)',
      approvalTime: '2026-10-01 16:20',
      rejectionReason: '',
      qrToken: 'GP-8899-SEC-VIKRANT',
      movementStatus: 'INSIDE'
    }
  ],
  security_logs: [
    {
      id: 'LOG-701',
      gatePassId: 'GP-8901',
      studentId: 'STU-101',
      studentName: 'Aarav Patel',
      movementType: 'EXIT',
      timestamp: '2026-10-02 15:45',
      guardName: 'Officer Ramakant',
      guardId: 'SEC-3001',
      qrToken: 'GP-8901-SEC-AARAV',
      verificationMethod: 'QR Camera Scan',
      isAfter7PM: false,
      isLateReturn: false,
      lateDuration: null,
      notes: 'Gate Pass verified successfully.'
    },
    {
      id: 'LOG-702',
      gatePassId: 'GP-8903',
      studentId: 'STU-104',
      studentName: 'Sneha Iyer',
      movementType: 'EXIT',
      timestamp: '2026-10-02 19:45',
      guardName: 'Ramakant',
      guardId: 'SEC-3001',
      qrToken: 'GP-8903-SEC-SNEHA',
      verificationMethod: 'QR Token Manual Entry',
      isAfter7PM: true, // FLAGGED AFTER 7 PM EXIT
      isLateReturn: false,
      lateDuration: null,
      notes: 'FLAGGED: Exit after 7:00 PM. Notified Warden.'
    },
    {
      id: 'LOG-700',
      gatePassId: 'GP-8899',
      studentId: 'STU-105',
      studentName: 'Vikrant Gupta',
      movementType: 'ENTRY',
      timestamp: '2026-10-01 20:15',
      guardName: 'Ramakant',
      guardId: 'SEC-3001',
      qrToken: 'GP-8899-SEC-VIKRANT',
      verificationMethod: 'QR Scan',
      isAfter7PM: false,
      isLateReturn: true, // FLAGGED LATE RETURN (1 hr 15 mins late)
      lateDuration: '1h 15m',
      notes: 'FLAGGED: Late Return by 1 hour 15 minutes.'
    }
  ],
  complaints: [
    {
      id: 'CMP-501',
      type: 'Individual',
      studentId: 'STU-101',
      studentName: 'Aarav Patel',
      roomNo: 'A-204',
      hostel: 'H1 (Boys)',
      category: 'Plumbing', // Plumbing, Electricity, Maintenance, Mess, Cleaning, Internet/WiFi, Security, Other
      assignedDeptHead: 'Plumber Head',
      assignedStaffName: 'Rajesh kumar',
      subject: 'Severe Pipe Leakage in Bathroom Unit 2',
      description: 'The sink pipe in bathroom A-204 is leaking heavily, causing water accumulation on the floor.',
      priority: 'High',
      status: 'In Progress', // Submitted, Under Review, Assigned, In Progress, Resolved, Rejected, Closed
      createdAt: '2026-10-02 09:30',
      updatedAt: '2026-10-02 11:15',
      remarks: 'Plumber assigned, replacement pipe dispatched.'
    },
    {
      id: 'CMP-502',
      type: 'Group',
      studentId: 'STU-102',
      studentName: 'Ananya Deshmukh',
      groupMembers: ['Ananya Deshmukh (B-108)', 'Sneha Iyer (B-305)', 'Riya Sen (B-110)'],
      roomNo: 'B-108 / 1st Floor Wing B',
      hostel: 'H2 (Girls)',
      category: 'Electricity',
      assignedDeptHead: 'Electricity Head',
      assignedStaffName: 'Vikram Singh',
      subject: 'Frequent Voltage Fluctuations & MCB Tripping',
      description: 'Entire 1st floor corridor lighting and socket outlets keep tripping every 30 minutes.',
      priority: 'Urgent',
      status: 'Assigned',
      createdAt: '2026-10-02 11:00',
      updatedAt: '2026-10-02 11:30',
      remarks: 'Inspection scheduled for afternoon shift.'
    },
    {
      id: 'CMP-503',
      type: 'Individual',
      studentId: 'STU-103',
      studentName: 'Rohan Mehta',
      roomNo: 'A-312',
      hostel: 'H1 (Boys)',
      category: 'Mess',
      assignedDeptHead: 'Mess/Food Head',
      assignedStaffName: 'Arun patel',
      subject: 'Food Quality Issue - Undercooked Rice at Lunch',
      description: 'The lunch served today contained undercooked rice and inadequate vegetable quantity.',
      priority: 'Medium',
      status: 'Submitted',
      createdAt: '2026-10-02 13:45',
      updatedAt: '2026-10-02 13:45',
      remarks: 'Pending department head review.'
    },
    {
      id: 'CMP-504',
      type: 'Individual',
      studentId: 'STU-105',
      studentName: 'Vikrant Gupta',
      roomNo: 'A-105',
      hostel: 'H1 (Boys)',
      category: 'Housekeeping',
      assignedDeptHead: 'Housekeeping Head',
      assignedStaffName: 'Brijesh kumar',
      subject: 'Corridor Waste Bin Clearance Required',
      description: 'Dustbins on 1st Floor Block A have not been emptied since yesterday morning.',
      priority: 'Low',
      status: 'Resolved',
      createdAt: '2026-10-01 10:00',
      updatedAt: '2026-10-01 14:00',
      remarks: 'Housekeeping staff cleared dustbins and sanitized corridor.'
    }
  ],
  notices: [
    {
      id: 'NTC-301',
      title: 'Mandatory Hostel Roll Call at 9:00 PM Tonight',
      category: 'Hostel', // General, Hostel, Mess, Maintenance, Emergency, Discipline, Important
      priority: 'Urgent', // Normal, Important, Urgent
      content: 'All residents of Block A and Block B must be present in their respective rooms for the official monthly warden inspection tonight at 9:00 PM.',
      createdBy: 'Abhijeet das (Warden)',
      publishedAt: '2026-10-02 08:00',
      scheduledDate: '',
      status: 'Published', // Published, Scheduled, Draft, Archived
      targetAudience: 'All Hostel Students'
    },
    {
      id: 'NTC-302',
      title: 'Water Supply Maintenance Schedule (Block A)',
      category: 'Maintenance',
      priority: 'Important',
      content: 'Overhead tank cleaning and valve maintenance will take place on Saturday from 6:00 AM to 9:00 AM. Please store adequate water.',
      createdBy: 'Abhijeet das (Warden)',
      publishedAt: '2026-10-01 14:00',
      scheduledDate: '',
      status: 'Published',
      targetAudience: 'Block A Residents'
    }
  ],
  events: [
    { id: 'EVT-1', title: 'Inter-Hostel Sports Fest Registration', date: '2026-10-10', venue: 'Campus Main Ground', organizedBy: 'Warden & Sports Committee', description: 'Annual intra-college sports competition including Cricket, Football, Badminton and Chess.' },
    { id: 'EVT-2', title: 'Health & Hygiene Workshop', date: '2026-10-15', venue: 'Auditorium Hall B', organizedBy: 'Hostel Medical Team', description: 'Interactive session on personal wellness, nutrition, and first aid for hostel students.' }
  ],
  notifications: [
    { id: 'NOT-1', userId: 'usr-1', title: 'After 7 PM Exit Flagged!', message: 'Student Sneha Iyer (STU-104) exited campus at 19:45 PM.', timestamp: '2026-10-02 19:45', read: false, type: 'Security' },
    { id: 'NOT-2', userId: 'usr-1', title: 'New Gate Pass Request', message: 'Rohan Mehta (STU-103) requested a gate pass for 17:00 PM.', timestamp: '2026-10-02 16:00', read: true, type: 'GatePass' },
    { id: 'NOT-3', userId: 'usr-3', title: 'New Complaint Assigned', message: 'Complaint #CMP-501 (Plumbing) assigned to Plumber Head.', timestamp: '2026-10-02 09:30', read: false, type: 'Complaint' }
  ],
  staff_activity_logs: [
    { id: 'ACT-1', staffName: 'Abhijeet das', role: 'Warden', action: 'Approved Gate Pass GP-8901 for Aarav Patel', timestamp: '2026-10-02 14:30' },
    { id: 'ACT-2', staffName: 'Ramakant', role: 'Security Guard', action: 'Marked OUT for Aarav Patel (GP-8901)', timestamp: '2026-10-02 15:45' },
    { id: 'ACT-3', staffName: 'Suresh Kumar', role: 'Plumber Head', action: 'Updated Complaint CMP-501 status to In Progress', timestamp: '2026-10-02 11:15' },
    { id: 'ACT-4', staffName: 'Ramakant', role: 'Security Guard', action: 'Marked OUT (AFTER 7 PM) for Sneha Iyer (GP-8903)', timestamp: '2026-10-02 19:45' }
  ]
};

class Store {
  constructor() {
    this.data = this.load();
    this.currentUser = this.data.users[0]; // Default logged in as Warden
    this.listeners = [];
  }

  load() {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) {
      localStorage.setItem(DB_KEY, JSON.stringify(initialData));
      return initialData;
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error('Failed to parse DB, resetting to default', e);
      localStorage.setItem(DB_KEY, JSON.stringify(initialData));
      return initialData;
    }
  }

  save() {
    localStorage.setItem(DB_KEY, JSON.stringify(this.data));
    this.notify();
  }

  resetToDefault() {
    localStorage.setItem(DB_KEY, JSON.stringify(initialData));
    this.data = JSON.parse(JSON.stringify(initialData));
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(fn => fn(this.data));
  }

  setCurrentUser(user) {
    this.currentUser = user;
    this.notify();
  }

  // --- AUTHENTICATION & LOGIN ---
  authenticateStaff(empIdOrEmail, password) {
    const cleanInput = (empIdOrEmail || '').trim().toLowerCase();
    const user = this.data.users.find(u =>
      (u.employeeId && u.employeeId.toLowerCase() === cleanInput) ||
      (u.email && u.email.toLowerCase() === cleanInput)
    );

    if (!user) {
      return { success: false, reason: 'Invalid Employee ID / Email or Password.' };
    }

    // Allow default demo password 'Password123' if password property missing or matching
    const expectedPassword = user.password || 'Password123';
    if (password !== expectedPassword) {
      return { success: false, reason: 'Invalid Employee ID / Email or Password.' };
    }

    if (user.status === 'Pending Verification') {
      return { success: false, reason: 'Account Pending Verification. Please contact Super Admin for account approval.' };
    }

    if (user.status === 'Suspended' || user.status === 'Rejected') {
      return { success: false, reason: `Account status is '${user.status}'. Access denied.` };
    }

    this.currentUser = user;
    this.logActivity(user.name, user.role, `Successfully logged into Staff ERP (${user.employeeId})`);
    this.notify();
    return { success: true, user };
  }

  logoutStaff() {
    this.currentUser = null;
    this.notify();
  }

  // --- STAFF & RBAC HELPERS ---
  registerStaff(staffObj) {
    const newStaff = {
      id: 'usr-' + (this.data.users.length + 1) + '-' + Math.floor(Math.random() * 1000),
      status: 'Pending Verification', // Super Admin approval needed
      dateJoined: new Date().toISOString().split('T')[0],
      ...staffObj
    };
    this.data.users.unshift(newStaff);
    this.logActivity(staffObj.name || 'New Staff', staffObj.role || 'Staff', `Registered new staff account (${staffObj.email}) - Pending Verification`);
    this.save();
    return newStaff;
  }

  updateStaffStatus(userId, newStatus) {
    const user = this.data.users.find(u => u.id === userId);
    if (user) {
      user.status = newStatus;
      this.logActivity(this.currentUser.name, this.currentUser.role, `Updated staff ${user.name} status to ${newStatus}`);
      this.save();
    }
  }

  // --- GATE PASS & WARDEN WORKFLOW ---
  // RULE: ONLY WARDEN CAN APPROVE OR REJECT GATE PASS
  createGatePassRequest(passData) {
    const id = 'GP-' + Math.floor(1000 + Math.random() * 9000);
    const newPass = {
      id,
      applicationTime: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Pending',
      approvedBy: null,
      approvalTime: null,
      rejectionReason: '',
      qrToken: `${id}-SEC-${passData.studentName.split(' ')[0].toUpperCase()}`,
      movementStatus: 'INSIDE',
      actualExitTime: null,
      actualReturnTime: null,
      ...passData
    };
    this.data.gate_passes.unshift(newPass);

    // Notify Warden
    this.data.notifications.unshift({
      id: 'NOT-' + Date.now(),
      userId: 'usr-1',
      title: 'New Gate Pass Application',
      message: `${passData.studentName} applied for a gate pass to ${passData.destination}.`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      read: false,
      type: 'GatePass'
    });

    this.logActivity(passData.studentName, 'Student', `Submitted Gate Pass Application #${id}`);
    this.save();
    return newPass;
  }

  approveGatePass(passId, notes = '') {
    if (this.currentUser.role !== 'Warden' && this.currentUser.role !== 'Super Admin') {
      throw new Error('CRITICAL PERMISSION ERROR: Only the Warden can approve gate passes.');
    }
    const pass = this.data.gate_passes.find(g => g.id === passId);
    if (pass) {
      pass.status = 'Approved';
      pass.approvedBy = `${this.currentUser.name} (${this.currentUser.role})`;
      pass.approvalTime = new Date().toISOString().replace('T', ' ').substring(0, 16);
      pass.remarks = notes;

      // Add Notification
      this.data.notifications.unshift({
        id: 'NOT-' + Date.now(),
        userId: pass.studentId,
        title: 'Gate Pass Approved!',
        message: `Your Gate Pass #${pass.id} has been approved by the Warden. QR code generated.`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
        read: false,
        type: 'GatePass'
      });

      this.logActivity(this.currentUser.name, this.currentUser.role, `APPROVED Gate Pass #${passId} for ${pass.studentName}`);
      this.save();
    }
  }

  rejectGatePass(passId, reason) {
    if (this.currentUser.role !== 'Warden' && this.currentUser.role !== 'Super Admin') {
      throw new Error('CRITICAL PERMISSION ERROR: Only the Warden can reject gate passes.');
    }
    const pass = this.data.gate_passes.find(g => g.id === passId);
    if (pass) {
      pass.status = 'Rejected';
      pass.approvedBy = `${this.currentUser.name} (${this.currentUser.role})`;
      pass.approvalTime = new Date().toISOString().replace('T', ' ').substring(0, 16);
      pass.rejectionReason = reason || 'Not permitted by Warden.';

      this.logActivity(this.currentUser.name, this.currentUser.role, `REJECTED Gate Pass #${passId} for ${pass.studentName}`);
      this.save();
    }
  }

  // --- SECURITY QR & MOVEMENT WORKFLOW ---
  markStudentOut(passId, guardName = 'Officer Security') {
    const pass = this.data.gate_passes.find(g => g.id === passId || g.qrToken === passId);
    if (!pass) throw new Error('Gate pass not found!');
    if (pass.status !== 'Approved') throw new Error(`Gate pass is currently ${pass.status}. Cannot mark OUT.`);
    if (pass.movementStatus === 'OUT') throw new Error('Student is already marked OUT!');

    const now = new Date();
    const formattedNow = now.toISOString().replace('T', ' ').substring(0, 16);
    const hour = now.getHours();

    // Auto-flag rule: Exits after 7:00 PM (19:00)
    const isAfter7PM = hour >= 19;

    pass.movementStatus = 'OUT';
    pass.actualExitTime = formattedNow;

    // Update student status
    const student = this.data.students.find(s => s.id === pass.studentId || s.name === pass.studentName);
    if (student) {
      student.status = 'Outside';
    }

    // Create Security Log
    const logId = 'LOG-' + Math.floor(100 + Math.random() * 900);
    const securityLog = {
      id: logId,
      gatePassId: pass.id,
      studentId: pass.studentId,
      studentName: pass.studentName,
      movementType: 'EXIT',
      timestamp: formattedNow,
      guardName: guardName,
      guardId: this.currentUser.employeeId || 'SEC-GUARD',
      qrToken: pass.qrToken,
      verificationMethod: 'QR Scan & Guard Verification',
      isAfter7PM: isAfter7PM,
      isLateReturn: false,
      lateDuration: null,
      notes: isAfter7PM ? 'AUTOMATIC FLAG: Exit recorded after 7:00 PM. Warden notified.' : 'Gate Pass Exit Verified'
    };

    this.data.security_logs.unshift(securityLog);

    if (isAfter7PM) {
      // Create high-priority notification for Warden & Admin
      this.data.notifications.unshift({
        id: 'NOT-' + Date.now(),
        userId: 'usr-1',
        title: '⚠️ AFTER 7 PM EXIT ALERT',
        message: `Student ${pass.studentName} exited campus at ${formattedNow.substring(11)} (After 7:00 PM).`,
        timestamp: formattedNow,
        read: false,
        type: 'Alert'
      });
    }

    this.logActivity(guardName, 'Security Guard', `Marked OUT student ${pass.studentName} (${pass.id}) ${isAfter7PM ? '[FLAGGED AFTER 7PM]' : ''}`);
    this.save();
    return { pass, securityLog, isAfter7PM };
  }

  markStudentIn(passId, guardName = 'Officer Security') {
    const pass = this.data.gate_passes.find(g => g.id === passId || g.qrToken === passId);
    if (!pass) throw new Error('Gate pass not found!');
    if (pass.movementStatus !== 'OUT') throw new Error('Student is not marked OUT currently!');

    const now = new Date();
    const formattedNow = now.toISOString().replace('T', ' ').substring(0, 16);

    pass.movementStatus = 'INSIDE';
    pass.actualReturnTime = formattedNow;
    pass.status = 'Completed';

    // Update student status
    const student = this.data.students.find(s => s.id === pass.studentId || s.name === pass.studentName);
    if (student) {
      student.status = 'Inside';
    }

    // Check Late Return rule
    let isLateReturn = false;
    let lateDurationStr = null;

    if (pass.expectedReturnDate && pass.expectedReturnTime) {
      const expectedDateTimeStr = `${pass.expectedReturnDate} ${pass.expectedReturnTime}`;
      const expectedDateObj = new Date(expectedDateTimeStr.replace(' ', 'T'));

      if (now > expectedDateObj) {
        isLateReturn = true;
        const diffMs = now - expectedDateObj;
        const diffMins = Math.floor(diffMs / (1000 * 60));
        const hrs = Math.floor(diffMins / 60);
        const mins = diffMins % 60;
        lateDurationStr = hrs > 0 ? `${hrs}h ${mins}m` : `${mins} mins`;
      }
    }

    const logId = 'LOG-' + Math.floor(100 + Math.random() * 900);
    const securityLog = {
      id: logId,
      gatePassId: pass.id,
      studentId: pass.studentId,
      studentName: pass.studentName,
      movementType: 'ENTRY',
      timestamp: formattedNow,
      guardName: guardName,
      guardId: this.currentUser.employeeId || 'SEC-GUARD',
      qrToken: pass.qrToken,
      verificationMethod: 'QR Scan Verification',
      isAfter7PM: false,
      isLateReturn: isLateReturn,
      lateDuration: lateDurationStr,
      notes: isLateReturn ? `AUTOMATIC FLAG: Late Return by ${lateDurationStr}. Warden notified.` : 'Gate Pass Entry Verified'
    };

    this.data.security_logs.unshift(securityLog);

    if (isLateReturn) {
      this.data.notifications.unshift({
        id: 'NOT-' + Date.now(),
        userId: 'usr-1',
        title: '⚠️ LATE RETURN ALERT',
        message: `Student ${pass.studentName} returned ${lateDurationStr} late (Expected: ${pass.expectedReturnTime}).`,
        timestamp: formattedNow,
        read: false,
        type: 'Alert'
      });
    }

    this.logActivity(guardName, 'Security Guard', `Marked IN student ${pass.studentName} (${pass.id}) ${isLateReturn ? `[LATE BY ${lateDurationStr}]` : ''}`);
    this.save();
    return { pass, securityLog, isLateReturn, lateDurationStr };
  }

  // --- COMPLAINTS WORKFLOW ---
  createComplaint(complaintObj) {
    const id = 'CMP-' + Math.floor(500 + Math.random() * 500);
    const category = complaintObj.category || 'Other';

    // Auto suggest / assign to department head based on category
    let assignedDeptHead = 'Maintenance Head';
    let assignedStaffName = 'Ramesh Verma';

    if (['Water', 'Plumbing'].includes(category)) {
      assignedDeptHead = 'Plumber Head';
      assignedStaffName = 'Rajesh Kumar';
    } else if (['Electricity', 'Power'].includes(category)) {
      assignedDeptHead = 'Electricity Head';
      assignedStaffName = 'Vikram Singh';
    } else if (['Mess', 'Food'].includes(category)) {
      assignedDeptHead = 'Mess/Food Head';
      assignedStaffName = 'Arun patel';
    } else if (['Cleaning', 'Housekeeping', 'Sanitation'].includes(category)) {
      assignedDeptHead = 'Housekeeping Head';
      assignedStaffName = 'Brijesh kumar';
    }

    const newComplaint = {
      id,
      type: complaintObj.type || 'Individual',
      studentId: complaintObj.studentId || 'STU-101',
      studentName: complaintObj.studentName || 'Aarav Patel',
      groupMembers: complaintObj.groupMembers || [],
      roomNo: complaintObj.roomNo || 'A-204',
      hostel: complaintObj.hostel || 'H1 (Boys)',
      category,
      assignedDeptHead,
      assignedStaffName,
      subject: complaintObj.subject,
      description: complaintObj.description,
      priority: complaintObj.priority || 'Medium',
      status: 'Submitted', // Submitted, Under Review, Assigned, In Progress, Resolved, Rejected, Closed
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      remarks: `Submitted and auto-routed to ${assignedDeptHead}`
    };

    this.data.complaints.unshift(newComplaint);
    this.logActivity(complaintObj.studentName || 'Student', 'Student', `Logged new complaint #${id} (${category})`);
    this.save();
    return newComplaint;
  }

  updateComplaintStatus(complaintId, newStatus, remarks = '', assignedStaff = null) {
    const cmp = this.data.complaints.find(c => c.id === complaintId);
    if (cmp) {
      cmp.status = newStatus;
      cmp.updatedAt = new Date().toISOString().replace('T', ' ').substring(0, 16);
      if (remarks) cmp.remarks = remarks;
      if (assignedStaff) cmp.assignedStaffName = assignedStaff;

      this.logActivity(this.currentUser.name, this.currentUser.role, `Updated Complaint #${complaintId} status to ${newStatus}`);
      this.save();
    }
  }

  // --- WARDEN NOTICES WORKFLOW ---
  createNotice(noticeData) {
    const id = 'NTC-' + Math.floor(300 + Math.random() * 700);
    const newNotice = {
      id,
      title: noticeData.title,
      category: noticeData.category || 'General',
      priority: noticeData.priority || 'Normal',
      content: noticeData.content,
      createdBy: `${this.currentUser.name} (${this.currentUser.role})`,
      publishedAt: noticeData.status === 'Published' ? new Date().toISOString().replace('T', ' ').substring(0, 16) : '',
      scheduledDate: noticeData.scheduledDate || '',
      status: noticeData.status || 'Published',
      targetAudience: noticeData.targetAudience || 'All Hostel Students'
    };

    this.data.notices.unshift(newNotice);

    if (newNotice.status === 'Published') {
      // Sync to student notifications
      this.data.notifications.unshift({
        id: 'NOT-' + Date.now(),
        userId: 'ALL_STUDENTS',
        title: `📢 Notice: ${newNotice.title}`,
        message: newNotice.content.substring(0, 100) + '...',
        timestamp: newNotice.publishedAt,
        read: false,
        type: 'Notice'
      });
    }

    this.logActivity(this.currentUser.name, this.currentUser.role, `Created Notice #${id} - ${noticeData.title}`);
    this.save();
    return newNotice;
  }

  updateNotice(noticeId, updatedFields) {
    const notice = this.data.notices.find(n => n.id === noticeId);
    if (notice) {
      Object.assign(notice, updatedFields);
      this.logActivity(this.currentUser.name, this.currentUser.role, `Updated Notice #${noticeId}`);
      this.save();
    }
  }

  deleteNotice(noticeId) {
    this.data.notices = this.data.notices.filter(n => n.id !== noticeId);
    this.logActivity(this.currentUser.name, this.currentUser.role, `Deleted Notice #${noticeId}`);
    this.save();
  }

  // --- LOGGING ---
  logActivity(staffName, role, action) {
    this.data.staff_activity_logs.unshift({
      id: 'ACT-' + Date.now(),
      staffName,
      role,
      action,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
    });
  }
}

// Global window singleton instance
window.appStore = new Store();
