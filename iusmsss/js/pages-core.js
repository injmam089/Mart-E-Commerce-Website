window.Pages = window.Pages || {};

Pages.login = function() {
  return `
    <div class="auth-page">
      <div class="auth-container fade-in">
        <div class="auth-card glass-card">
          <div class="auth-logo" style="font-size: 48px; text-align: center;">🎓</div>
          <h1 class="auth-title">UniPortal</h1>
          <p class="auth-subtitle">University Management System</p>
          <form onsubmit="App.handleLogin(event)">
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <div class="input-group">
                <span class="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </span>
                <input type="email" class="form-input" placeholder="admin@university.edu" required>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Password</label>
              <div class="input-group">
                <span class="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </span>
                <input type="password" class="form-input" placeholder="Enter your password" required id="login-password">
                <button type="button" class="btn btn-icon" style="position: absolute; right: 10px; background: none; border: none; cursor: pointer;" onclick="const p=document.getElementById('login-password'); p.type = p.type==='password'?'text':'password';">👁️</button>
              </div>
            </div>
            <div class="remember-row" style="display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 14px;">
              <label class="checkbox-group"><input type="checkbox"> Remember me</label>
              <a href="#/forgot-password" onclick="App.navigate('#/forgot-password'); return false;">Forgot Password?</a>
            </div>
            <button type="submit" class="btn btn-primary w-full btn-lg" style="width: 100%;">Sign In</button>
          </form>
          <div class="auth-footer" style="text-align: center; margin-top: 20px; font-size: 14px; color: #6b7280;">
            <p>Demo: Use any email/password to login</p>
          </div>
        </div>
      </div>
    </div>
  `;
};

Pages.forgotPassword = function() {
  return `
    <div class="auth-page">
      <div class="auth-container fade-in">
        <div class="auth-card glass-card">
          <a href="#/login" onclick="App.navigate('#/login'); return false;" style="display: inline-block; margin-bottom: 20px; text-decoration: none; color: #4F46E5;">← Back to Login</a>
          <div class="auth-logo" style="font-size: 48px; text-align: center;">🎓</div>
          <h1 class="auth-title">Forgot Password</h1>
          <p class="auth-subtitle">Enter your email to reset password</p>
          <form onsubmit="event.preventDefault(); alert('Reset link sent!'); App.navigate('#/login');">
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <div class="input-group">
                <span class="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </span>
                <input type="email" class="form-input" placeholder="Enter your email" required>
              </div>
            </div>
            <button type="submit" class="btn btn-primary w-full btn-lg" style="width: 100%; margin-top: 20px;">Send Reset Link</button>
          </form>
          <div class="auth-footer" style="text-align: center; margin-top: 20px; font-size: 14px;">
            <p>Remembered? <a href="#/login" onclick="App.navigate('#/login'); return false;">Sign In</a></p>
          </div>
        </div>
      </div>
    </div>
  `;
};

Pages.resetPassword = function() {
  return `
    <div class="auth-page">
      <div class="auth-container fade-in">
        <div class="auth-card glass-card">
          <div class="auth-logo" style="font-size: 48px; text-align: center;">🎓</div>
          <h1 class="auth-title">Reset Password</h1>
          <p class="auth-subtitle">Enter your new password</p>
          <form onsubmit="event.preventDefault(); alert('Password reset successful!'); App.navigate('#/login');">
            <div class="form-group">
              <label class="form-label">New Password</label>
              <div class="input-group">
                <span class="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </span>
                <input type="password" class="form-input" placeholder="New Password" required id="reset-password" oninput="
                  const val = this.value;
                  const fill = document.getElementById('pw-strength-fill');
                  let w = 0;
                  if(val.length > 0) w = 20;
                  if(val.length > 5) w = 50;
                  if(val.length > 8 && /[A-Z]/.test(val) && /[0-9]/.test(val)) w = 100;
                  fill.style.width = w + '%';
                  fill.style.backgroundColor = w === 100 ? '#10B981' : (w === 50 ? '#F59E0B' : '#EF4444');
                ">
                <button type="button" class="btn btn-icon" style="position: absolute; right: 10px; background: none; border: none; cursor: pointer;" onclick="const p=document.getElementById('reset-password'); p.type = p.type==='password'?'text':'password';">👁️</button>
              </div>
              <div class="password-strength" style="height: 4px; background: #e5e7eb; margin-top: 8px; border-radius: 2px; overflow: hidden;">
                <div id="pw-strength-fill" class="password-strength-fill" style="height: 100%; width: 0%; transition: all 0.3s ease;"></div>
              </div>
            </div>
            <div class="form-group" style="margin-top: 16px;">
              <label class="form-label">Confirm Password</label>
              <div class="input-group">
                <span class="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </span>
                <input type="password" class="form-input" placeholder="Confirm Password" required>
              </div>
            </div>
            <button type="submit" class="btn btn-primary w-full btn-lg" style="width: 100%; margin-top: 20px;">Reset Password</button>
          </form>
          <div class="auth-footer" style="text-align: center; margin-top: 20px; font-size: 14px;">
            <p><a href="#/login" onclick="App.navigate('#/login'); return false;">Back to Login</a></p>
          </div>
        </div>
      </div>
    </div>
  `;
};

Pages.dashboard = function() {
  const totalStudents = AppData.students.length;
  const totalFaculty = AppData.faculty.length;
  const activeCourses = AppData.courses.filter(c => c.status === 'Active').length;
  
  let totalAtt = 0;
  let count = 0;
  AppData.students.forEach(s => {
    if (s.attendance !== undefined) {
      totalAtt += s.attendance;
      count++;
    }
  });
  const avgAttendance = count > 0 ? (totalAtt / count).toFixed(1) + '%' : '0%';

  const activitiesHtml = AppData.activities.map(a => Components.renderActivityItem(a)).join('');
  
  const eventsHtml = AppData.events.slice(0, 5).map(e => `
    <div class="event-item" style="border-left: 4px solid ${e.color || '#4F46E5'}; padding: 12px; background: #f9fafb; margin-bottom: 8px; border-radius: 4px;">
      <h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 600;">${e.title}</h4>
      <div style="font-size: 12px; color: #6b7280; display: flex; justify-content: space-between;">
        <span>📅 ${e.date}</span>
        <span>📍 ${e.venue}</span>
      </div>
    </div>
  `).join('');
  
  const announcementsHtml = AppData.announcements.slice(0, 4).map(a => `
    <div class="announcement-card" style="padding: 12px; border: 1px solid #e5e7eb; border-radius: 6px; margin-bottom: 8px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        ${Components.renderBadge(a.priority, a.priority === 'High' ? 'danger' : 'info')}
        <span style="font-size: 12px; color: #6b7280;">${a.date}</span>
      </div>
      <h4 style="margin: 0; font-size: 14px; font-weight: 500;">${a.title}</h4>
    </div>
  `).join('');

  return `
    <div class="page-container fade-in">
      <div class="page-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1 class="page-title" style="margin: 0; font-size: 24px; font-weight: 700;">Dashboard</h1>
          <p class="page-subtitle" style="margin: 4px 0 0 0; color: #6b7280;">Welcome back, Admin! Here's your university overview.</p>
        </div>
        <div class="btn-group">
          <button class="btn btn-outline btn-sm" style="margin-right: 8px;">Download Report</button>
          <button class="btn btn-primary btn-sm">+ New Entry</button>
        </div>
      </div>
      
      <!-- Stat Cards Row - 4 cards -->
      <div class="grid grid-4" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;">
        ${Components.renderStatCard('Total Students', totalStudents, '+12% this month', 'up', 'primary', '🎓')}
        ${Components.renderStatCard('Total Faculty', totalFaculty, '+3 new joined', 'up', 'success', '👥')}
        ${Components.renderStatCard('Active Courses', activeCourses, '5 upcoming', 'up', 'info', '📘')}
        ${Components.renderStatCard('Avg Attendance', avgAttendance, '+2% vs last month', 'up', 'warning', '📊')}
      </div>
      
      <!-- Charts Row - 2 charts -->
      <div class="grid grid-2 mt-3" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top:24px">
        <div class="card" style="background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <div class="chart-card-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h3 style="margin: 0; font-size: 16px; font-weight: 600;">Enrollment Trends</h3>
            ${Components.renderBadge('Last 6 Years', 'info')}
          </div>
          ${Components.renderChart('enrollmentChart', '100%', '300px')}
        </div>
        <div class="card" style="background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <div class="chart-card-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h3 style="margin: 0; font-size: 16px; font-weight: 600;">Department Distribution</h3>
            ${Components.renderBadge('Current', 'info')}
          </div>
          ${Components.renderChart('departmentChart', '100%', '300px')}
        </div>
      </div>
      
      <!-- Bottom Section - 3 columns -->
      <div class="grid grid-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top:24px">
        <!-- Recent Activities -->
        <div class="card" style="background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:16px; margin-top:0;">Recent Activities</h3>
          <div class="activity-list">
            ${activitiesHtml}
          </div>
        </div>
        
        <!-- Upcoming Events -->
        <div class="card" style="background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:16px; margin-top:0;">Upcoming Events</h3>
          <div class="events-list">
            ${eventsHtml}
          </div>
        </div>
        
        <!-- Latest Announcements -->
        <div class="card" style="background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:16px; margin-top:0;">Latest Announcements</h3>
          <div class="announcements-list">
            ${announcementsHtml}
          </div>
        </div>
      </div>
    </div>
  `;
};

Pages.initDashboard = function() {
  if (typeof Chart === 'undefined') return;

  const enrollCtx = document.getElementById('enrollmentChart');
  if (enrollCtx && AppData.enrollmentTrends) {
    new Chart(enrollCtx, {
      type: 'line',
      data: {
        labels: AppData.enrollmentTrends.map(e => e.year),
        datasets: [{
          label: 'Students Enrolled',
          data: AppData.enrollmentTrends.map(e => e.students),
          borderColor: '#4F46E5',
          backgroundColor: 'rgba(79,70,229,0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#4F46E5',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: false, grid: { color: 'rgba(0,0,0,0.05)' } },
          x: { grid: { display: false } }
        }
      }
    });
  }
  
  const deptCtx = document.getElementById('departmentChart');
  if (deptCtx && AppData.departmentDistribution) {
    new Chart(deptCtx, {
      type: 'doughnut',
      data: {
        labels: AppData.departmentDistribution.map(d => d.department),
        datasets: [{
          data: AppData.departmentDistribution.map(d => d.students),
          backgroundColor: AppData.departmentDistribution.map(d => d.color || '#4F46E5'),
          borderWidth: 0,
          spacing: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { padding: 16, usePointStyle: true, pointStyle: 'circle' } }
        },
        cutout: '65%'
      }
    });
  }
};

Pages.studentProfile = function(id) {
  const student = AppData.students.find(s => s.id === id || s.id === parseInt(id));
  
  if (!student) {
    return \`
      <div class="page-container fade-in">
        <div class="empty-state" style="text-align: center; padding: 60px 20px;">
          <div style="font-size: 48px; margin-bottom: 16px;">🔍</div>
          <h3>Student Not Found</h3>
          <p>The student you are looking for does not exist or has been removed.</p>
          <button class="btn btn-primary mt-3" onclick="App.navigate('#/students')">Back to Students</button>
        </div>
      </div>
    \`;
  }

  // Generate Tabs content
  const tabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'academics', label: 'Academics' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'results', label: 'Results' },
    { id: 'fees', label: 'Fees' }
  ];

  // Tab 1: Personal Info
  const personalInfoHtml = \`
    <div id="tab-personal" class="tab-panel active" style="padding: 24px; background: #fff; border-radius: 0 0 8px 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
      <h3 style="margin-top: 0; margin-bottom: 16px;">Personal Details</h3>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div class="profile-detail-row">
          <div class="profile-detail-label" style="font-weight: 600; color: #6b7280; font-size: 14px;">Full Name</div>
          <div class="profile-detail-value">\${student.name}</div>
        </div>
        <div class="profile-detail-row">
          <div class="profile-detail-label" style="font-weight: 600; color: #6b7280; font-size: 14px;">Email</div>
          <div class="profile-detail-value">\${student.email}</div>
        </div>
        <div class="profile-detail-row">
          <div class="profile-detail-label" style="font-weight: 600; color: #6b7280; font-size: 14px;">Phone</div>
          <div class="profile-detail-value">\${student.phone || 'N/A'}</div>
        </div>
        <div class="profile-detail-row">
          <div class="profile-detail-label" style="font-weight: 600; color: #6b7280; font-size: 14px;">Date of Birth</div>
          <div class="profile-detail-value">\${student.dob || 'N/A'}</div>
        </div>
        <div class="profile-detail-row">
          <div class="profile-detail-label" style="font-weight: 600; color: #6b7280; font-size: 14px;">Gender</div>
          <div class="profile-detail-value">\${student.gender || 'N/A'}</div>
        </div>
        <div class="profile-detail-row">
          <div class="profile-detail-label" style="font-weight: 600; color: #6b7280; font-size: 14px;">Blood Group</div>
          <div class="profile-detail-value">\${student.bloodGroup || 'N/A'}</div>
        </div>
        <div class="profile-detail-row" style="grid-column: span 2;">
          <div class="profile-detail-label" style="font-weight: 600; color: #6b7280; font-size: 14px;">Address</div>
          <div class="profile-detail-value">\${student.address || 'N/A'}</div>
        </div>
        <div class="profile-detail-row">
          <div class="profile-detail-label" style="font-weight: 600; color: #6b7280; font-size: 14px;">Guardian Name</div>
          <div class="profile-detail-value">\${student.guardianName || 'N/A'}</div>
        </div>
        <div class="profile-detail-row">
          <div class="profile-detail-label" style="font-weight: 600; color: #6b7280; font-size: 14px;">Guardian Phone</div>
          <div class="profile-detail-value">\${student.guardianPhone || 'N/A'}</div>
        </div>
        <div class="profile-detail-row">
          <div class="profile-detail-label" style="font-weight: 600; color: #6b7280; font-size: 14px;">Enrollment Date</div>
          <div class="profile-detail-value">\${student.enrollmentDate || 'N/A'}</div>
        </div>
      </div>
    </div>
  \`;

  // Tab 2: Academics
  const enrolledCourses = AppData.courses ? AppData.courses.filter(c => c.department === student.department && c.semester === student.semester) : [];
  const coursesHtml = enrolledCourses.length > 0 ? enrolledCourses.map(c => \`
    <div class="course-card" style="padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 12px;">
      <h4 style="margin: 0 0 8px 0;">\${c.name} <span style="color: #6b7280; font-weight: normal; font-size: 14px;">(\${c.code})</span></h4>
      <div style="font-size: 14px; color: #4b5563;">
        <p style="margin: 4px 0;"><strong>Faculty:</strong> \${c.faculty}</p>
        <p style="margin: 4px 0;"><strong>Credits:</strong> \${c.credits}</p>
        <p style="margin: 4px 0;"><strong>Schedule:</strong> \${c.schedule}</p>
      </div>
    </div>
  \`).join('') : '<p>No enrolled courses found for the current semester.</p>';

  const academicsHtml = \`
    <div id="tab-academics" class="tab-panel" style="padding: 24px; background: #fff; border-radius: 0 0 8px 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); display: none;">
      <div style="display: flex; align-items: center; margin-bottom: 24px; background: #f9fafb; padding: 20px; border-radius: 8px;">
        <div style="margin-right: 24px; text-align: center;">
          <div style="font-size: 36px; font-weight: 700; color: #4F46E5;">\${student.gpa || 'N/A'}</div>
          <div style="font-size: 14px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px;">Current GPA</div>
        </div>
        <div style="flex: 1;">
          <div style="margin-bottom: 8px; font-weight: 600;">Academic Progress</div>
          \${Components.renderProgressBar(student.gpa ? (student.gpa/4.0)*100 : 0, 'primary')}
        </div>
      </div>
      <h3 style="margin-top: 0; margin-bottom: 16px;">Enrolled Courses (Semester \${student.semester})</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px;">
        \${coursesHtml}
      </div>
    </div>
  \`;

  // Tab 3: Attendance
  const studentAttendanceRecords = AppData.attendance ? AppData.attendance.filter(a => a.studentId === student.id) : [];
  const attendanceHtml = \`
    <div id="tab-attendance" class="tab-panel" style="padding: 24px; background: #fff; border-radius: 0 0 8px 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); display: none;">
      <div style="display: flex; align-items: center; margin-bottom: 24px; background: #f9fafb; padding: 20px; border-radius: 8px;">
        <div style="margin-right: 24px; text-align: center;">
          <div style="font-size: 36px; font-weight: 700; color: \${student.attendance >= 75 ? '#10B981' : (student.attendance >= 60 ? '#F59E0B' : '#EF4444')};">\${student.attendance || 0}%</div>
          <div style="font-size: 14px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px;">Overall Attendance</div>
        </div>
        <div style="flex: 1;">
          <div style="margin-bottom: 8px; font-weight: 600;">Attendance Progress</div>
          \${Components.renderProgressBar(student.attendance || 0, student.attendance >= 75 ? 'success' : (student.attendance >= 60 ? 'warning' : 'danger'))}
        </div>
      </div>
      <h3 style="margin-top: 0; margin-bottom: 16px;">Recent Attendance Records</h3>
      \${studentAttendanceRecords.length > 0 ? 
        Components.renderDataTable({
          headers: ['Date', 'Course', 'Status'],
          rows: studentAttendanceRecords.map(r => [
            r.date, 
            r.courseName, 
            Components.renderBadge(r.status, r.status === 'Present' ? 'success' : (r.status === 'Absent' ? 'danger' : 'warning'))
          ])
        }) : '<p>No recent attendance records found.</p>'
      }
    </div>
  \`;

  // Tab 4: Results
  const studentResults = AppData.results ? AppData.results.filter(r => r.studentId === student.id) : [];
  let totalCredits = 0;
  let earnedPoints = 0;
  
  const resultsRows = studentResults.map(r => {
    totalCredits += r.credits;
    // Dummy calculation for points
    const gradePoints = { 'A+': 4.0, 'A': 3.75, 'B+': 3.5, 'B': 3.0, 'C+': 2.5, 'C': 2.0, 'D': 1.0, 'F': 0 };
    earnedPoints += (gradePoints[r.grade] || 0) * r.credits;
    return [r.courseName, r.courseCode, r.marks, r.grade, r.credits, (gradePoints[r.grade] || 0).toFixed(2)];
  });
  
  const cgpa = totalCredits > 0 ? (earnedPoints / totalCredits).toFixed(2) : 'N/A';

  const resultsHtml = \`
    <div id="tab-results" class="tab-panel" style="padding: 24px; background: #fff; border-radius: 0 0 8px 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); display: none;">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; text-align: center;">
          <div style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">Total Credits</div>
          <div style="font-size: 24px; font-weight: 700;">\${totalCredits}</div>
        </div>
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; text-align: center;">
          <div style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">CGPA</div>
          <div style="font-size: 24px; font-weight: 700; color: #4F46E5;">\${cgpa}</div>
        </div>
      </div>
      <h3 style="margin-top: 0; margin-bottom: 16px;">Academic Results</h3>
      \${resultsRows.length > 0 ? 
        Components.renderDataTable({
          headers: ['Course', 'Code', 'Marks', 'Grade', 'Credits', 'GPA'],
          rows: resultsRows
        }) : '<p>No result records found.</p>'
      }
    </div>
  \`;

  // Tab 5: Fees
  const studentFees = AppData.fees ? AppData.fees.filter(f => f.studentId === student.id) : [];
  let totalFees = 0;
  let paidFees = 0;
  
  const feeRows = studentFees.map(f => {
    totalFees += f.amount;
    if (f.status === 'Paid') paidFees += f.amount;
    return [f.date, f.type, '$' + f.amount, Components.renderBadge(f.status, f.status === 'Paid' ? 'success' : (f.status === 'Pending' ? 'warning' : 'danger')), f.transactionId || 'N/A'];
  });
  
  const pendingFees = totalFees - paidFees;

  const feesHtml = \`
    <div id="tab-fees" class="tab-panel" style="padding: 24px; background: #fff; border-radius: 0 0 8px 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); display: none;">
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px;">
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; text-align: center;">
          <div style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">Total Fees</div>
          <div style="font-size: 24px; font-weight: 700;">$\${totalFees}</div>
        </div>
        <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; text-align: center; border: 1px solid #a7f3d0;">
          <div style="font-size: 14px; color: #065f46; margin-bottom: 4px;">Paid</div>
          <div style="font-size: 24px; font-weight: 700; color: #059669;">$\${paidFees}</div>
        </div>
        <div style="background: #fffbeb; padding: 20px; border-radius: 8px; text-align: center; border: 1px solid #fde68a;">
          <div style="font-size: 14px; color: #92400e; margin-bottom: 4px;">Pending</div>
          <div style="font-size: 24px; font-weight: 700; color: #d97706;">$\${pendingFees}</div>
        </div>
      </div>
      <h3 style="margin-top: 0; margin-bottom: 16px;">Fee Transactions</h3>
      \${feeRows.length > 0 ? 
        Components.renderDataTable({
          headers: ['Date', 'Type', 'Amount', 'Status', 'Transaction ID'],
          rows: feeRows
        }) : '<p>No fee records found.</p>'
      }
    </div>
  \`;

  return \`
    <div class="page-container fade-in">
      <!-- Profile Header -->
      <div class="profile-header" style="background: #fff; border-radius: 8px; padding: 24px; margin-bottom: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); display: flex; align-items: center; flex-wrap: wrap; gap: 24px;">
        \${Components.renderAvatar(student.name, 'xxl', student.image)}
        <div style="flex: 1; min-width: 250px;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
            <h1 style="margin: 0; font-size: 24px;">\${student.name}</h1>
            \${Components.renderBadge(student.status, student.status === 'Active' ? 'success' : 'danger')}
          </div>
          <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 16px;">\${student.department} • Semester \${student.semester}</p>
          <div style="display: flex; gap: 16px; font-size: 14px; color: #4b5563;">
            <span>✉️ \${student.email}</span>
            <span>📱 \${student.phone || 'N/A'}</span>
          </div>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-outline" onclick="alert('Edit profile functionality coming soon')">Edit Profile</button>
          <button class="btn btn-primary" onclick="alert('Message feature coming soon')">Message</button>
        </div>
      </div>

      <!-- Tabs and Content -->
      <div class="profile-tabs-container" style="margin-bottom: 24px;">
        \${Components.renderTabs(tabs, 'personal')}
        \${personalInfoHtml}
        \${academicsHtml}
        \${attendanceHtml}
        \${resultsHtml}
        \${feesHtml}
      </div>
      
      <!-- Script for tab switching logic -->
      <script>
        // Tab switching logic normally handled globally, but here for fallback
        document.querySelectorAll('.tab-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const tabId = e.target.getAttribute('data-tab');
            if(tabId) {
              document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
              e.target.classList.add('active');
              document.querySelectorAll('.tab-panel').forEach(p => p.style.display = 'none');
              const panel = document.getElementById('tab-' + tabId);
              if(panel) panel.style.display = 'block';
            }
          });
        });
      </script>
    </div>
  \`;
};
