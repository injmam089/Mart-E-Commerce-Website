window.Pages = window.Pages || {};

// 1. Pages.attendance()
Pages.attendance = function() {
    const state = window.App.state;
    const { attendance, monthlyAttendance } = window.AppData;
    
    // Computations
    const overallAvg = monthlyAttendance ? (monthlyAttendance.reduce((acc, curr) => acc + curr.present, 0) / monthlyAttendance.length).toFixed(1) : 0;
    
    let presentToday = 0, absentToday = 0, lateToday = 0;
    if (attendance && attendance.length > 0) {
        // Just counting from the array for demo purposes
        presentToday = attendance.filter(a => a.status === 'present').length;
        absentToday = attendance.filter(a => a.status === 'absent').length;
        lateToday = attendance.filter(a => a.status === 'late').length;
    }

    // Filters and pagination
    const searchQuery = state.searchQueries['attendance'] || '';
    const statusFilter = state.filters['attendanceStatus'] || 'all';
    
    let filteredData = window.Components.helpers.filterData(attendance || [], {
        status: statusFilter !== 'all' ? statusFilter : null
    });
    
    if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        filteredData = filteredData.filter(item => 
            (item.studentName && item.studentName.toLowerCase().includes(lowerQuery)) ||
            (item.course && item.course.toLowerCase().includes(lowerQuery))
        );
    }
    
    const page = state.currentPages['attendance'] || 1;
    const itemsPerPage = state.itemsPerPage || 10;
    const paginatedData = window.Components.helpers.paginateData(filteredData, page, itemsPerPage);

    return `
        <div class="page-header d-flex justify-content-between align-items-center mb-4">
            <h1 class="h3 mb-0 text-gray-800">Attendance Management</h1>
            <button class="btn btn-primary shadow-sm"><i class="fas fa-check-circle fa-sm text-white-50 mr-2"></i>Mark Attendance</button>
        </div>

        <div class="row mb-4">
            <div class="col-xl-3 col-md-6 mb-4">
                ${window.Components.renderStatCard('Overall Attendance', overallAvg + '%', 'primary', 'fas fa-calendar-check')}
            </div>
            <div class="col-xl-3 col-md-6 mb-4">
                ${window.Components.renderStatCard('Present Today', presentToday, 'success', 'fas fa-user-check')}
            </div>
            <div class="col-xl-3 col-md-6 mb-4">
                ${window.Components.renderStatCard('Absent Today', absentToday, 'danger', 'fas fa-user-times')}
            </div>
            <div class="col-xl-3 col-md-6 mb-4">
                ${window.Components.renderStatCard('Late Today', lateToday, 'warning', 'fas fa-clock')}
            </div>
        </div>

        <div class="row mb-4">
            <div class="col-xl-6 col-lg-6 mb-4">
                <div class="card shadow h-100">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Monthly Attendance Trends</h6>
                    </div>
                    <div class="card-body">
                        ${window.Components.renderChart('monthlyAttendanceChart', 'bar')}
                    </div>
                </div>
            </div>
            <div class="col-xl-6 col-lg-6 mb-4">
                <div class="card shadow h-100">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Weekly Attendance</h6>
                    </div>
                    <div class="card-body">
                        ${window.Components.renderChart('weeklyAttendanceChart', 'line')}
                    </div>
                </div>
            </div>
        </div>

        <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Attendance Records</h6>
                <div class="d-flex">
                    <div class="mr-2">
                        ${window.Components.renderSearchBar('attendance', 'Search students...', searchQuery)}
                    </div>
                    <div>
                        ${window.Components.renderFilterDropdown('attendanceStatus', ['all', 'present', 'absent', 'late'], statusFilter, 'Status: All')}
                    </div>
                </div>
            </div>
            <div class="card-body">
                ${window.Components.renderDataTable({
                    columns: ['Student Name', 'Course', 'Date', 'Status'],
                    data: paginatedData.map(record => ({
                        'Student Name': `<div class="d-flex align-items-center">
                            ${window.Components.renderAvatar(record.studentName, null, 'sm')}
                            <span class="ml-2">${record.studentName}</span>
                        </div>`,
                        'Course': record.course,
                        'Date': window.Components.helpers.formatDate(record.date),
                        'Status': window.Components.renderBadge(
                            record.status, 
                            record.status === 'present' ? 'success' : (record.status === 'absent' ? 'danger' : 'warning')
                        )
                    }))
                })}
                <div class="mt-3">
                    ${window.Components.renderPagination(filteredData.length, page, itemsPerPage, 'attendance')}
                </div>
            </div>
        </div>
    `;
};

// 2. Pages.initAttendance()
Pages.initAttendance = function() {
    const { monthlyAttendance, attendanceTrends } = window.AppData;
    
    const monthlyCanvas = document.getElementById('monthlyAttendanceChart');
    if (monthlyCanvas && monthlyAttendance) {
        new Chart(monthlyCanvas, {
            type: 'bar',
            data: {
                labels: monthlyAttendance.map(m => m.month),
                datasets: [
                    {
                        label: 'Present %',
                        data: monthlyAttendance.map(m => m.present),
                        backgroundColor: '#10B981',
                    },
                    {
                        label: 'Absent %',
                        data: monthlyAttendance.map(m => m.absent),
                        backgroundColor: '#EF4444',
                    },
                    {
                        label: 'Late %',
                        data: monthlyAttendance.map(m => m.late),
                        backgroundColor: '#F59E0B',
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { stacked: true, grid: { display: false } },
                    y: { stacked: true, grid: { color: '#f3f4f6' } }
                }
            }
        });
    }

    const weeklyCanvas = document.getElementById('weeklyAttendanceChart');
    if (weeklyCanvas && attendanceTrends) {
        new Chart(weeklyCanvas, {
            type: 'line',
            data: {
                labels: attendanceTrends.map(t => t.day),
                datasets: [{
                    label: 'Attendance %',
                    data: attendanceTrends.map(t => t.percentage),
                    borderColor: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { grid: { display: false } },
                    y: { min: 0, max: 100, grid: { color: '#f3f4f6' } }
                }
            }
        });
    }
};

// 3. Pages.examSchedule()
Pages.examSchedule = function() {
    const state = window.App.state;
    const exams = window.AppData.exams || [];
    
    const totalExams = exams.length;
    const upcomingExams = exams.filter(e => new Date(e.date) >= new Date());
    const midterms = exams.filter(e => e.type && e.type.toLowerCase() === 'midterm').length;
    const finals = exams.filter(e => e.type && e.type.toLowerCase() === 'final').length;

    const typeFilter = state.filters['examType'] || 'all';
    const deptFilter = state.filters['examDept'] || 'all';
    
    let filteredExams = window.Components.helpers.filterData(exams, {
        type: typeFilter !== 'all' ? typeFilter : null,
        department: deptFilter !== 'all' ? deptFilter : null
    });
    
    // Sort by date ascending
    filteredExams = window.Components.helpers.sortData(filteredExams, 'date', 'asc');

    const typeColors = {
        'midterm': 'warning',
        'final': 'danger',
        'quiz': 'info',
        'practical': 'success'
    };

    return `
        <div class="page-header mb-4">
            <h1 class="h3 mb-0 text-gray-800">Examination Schedule</h1>
        </div>

        <div class="row mb-4">
            <div class="col-xl-3 col-md-6 mb-4">
                ${window.Components.renderStatCard('Total Exams', totalExams, 'primary', 'fas fa-file-alt')}
            </div>
            <div class="col-xl-3 col-md-6 mb-4">
                ${window.Components.renderStatCard('Upcoming Exams', upcomingExams.length, 'info', 'fas fa-calendar-alt')}
            </div>
            <div class="col-xl-3 col-md-6 mb-4">
                ${window.Components.renderStatCard('Midterms', midterms, 'warning', 'fas fa-file-signature')}
            </div>
            <div class="col-xl-3 col-md-6 mb-4">
                ${window.Components.renderStatCard('Finals', finals, 'danger', 'fas fa-graduation-cap')}
            </div>
        </div>
        
        <div class="d-flex flex-wrap mb-4 align-items-center gap-3">
            <div class="mr-2">
                ${window.Components.renderFilterDropdown('examType', ['all', 'midterm', 'final', 'quiz', 'practical'], typeFilter, 'Type: All')}
            </div>
            <div>
                ${window.Components.renderFilterDropdown('examDept', ['all', 'Computer Science', 'Electrical', 'Mechanical', 'Civil'], deptFilter, 'Department: All')}
            </div>
        </div>

        <h4 class="mb-3 text-gray-800">Upcoming in Next 30 Days</h4>
        <div class="row mb-4">
            ${upcomingExams.slice(0, 4).map(exam => `
                <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card shadow h-100 border-left-${typeColors[exam.type.toLowerCase()] || 'primary'}">
                        <div class="card-body">
                            <div class="text-xs font-weight-bold text-${typeColors[exam.type.toLowerCase()] || 'primary'} text-uppercase mb-1">
                                ${exam.type}
                            </div>
                            <div class="h5 mb-1 font-weight-bold text-gray-800">${exam.name}</div>
                            <div class="text-sm text-muted mb-2">${exam.courseCode}</div>
                            <div class="text-sm mb-1"><i class="fas fa-calendar mr-2"></i>${window.Components.helpers.formatDate(exam.date)}</div>
                            <div class="text-sm mb-1"><i class="fas fa-clock mr-2"></i>${exam.time}</div>
                            <div class="text-sm"><i class="fas fa-map-marker-alt mr-2"></i>${exam.venue}</div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Full Exam Schedule</h6>
            </div>
            <div class="card-body">
                ${window.Components.renderDataTable({
                    columns: ['Exam Name', 'Course', 'Department', 'Date', 'Time', 'Venue', 'Type', 'Semester'],
                    data: filteredExams.map(exam => ({
                        'Exam Name': exam.name,
                        'Course': exam.courseCode,
                        'Department': exam.department,
                        'Date': window.Components.helpers.formatDate(exam.date),
                        'Time': exam.time,
                        'Venue': exam.venue,
                        'Type': window.Components.renderBadge(exam.type, typeColors[exam.type.toLowerCase()] || 'primary'),
                        'Semester': exam.semester
                    }))
                })}
            </div>
        </div>
    `;
};

// 4. Pages.results()
Pages.results = function() {
    const state = window.App.state;
    const results = window.AppData.results || [];
    
    const totalResults = results.length;
    const avgGPA = totalResults > 0 ? (results.reduce((acc, r) => acc + r.gpa, 0) / totalResults).toFixed(2) : 0;
    const highestGPA = totalResults > 0 ? Math.max(...results.map(r => r.gpa)) : 0;
    const highestStudent = results.find(r => r.gpa === highestGPA)?.studentName || 'N/A';
    const passed = results.filter(r => r.gpa >= 2.0).length;
    const passRate = totalResults > 0 ? ((passed / totalResults) * 100).toFixed(1) : 0;

    const searchQuery = state.searchQueries['results'] || '';
    const semFilter = state.filters['resultsSem'] || 'all';
    const gradeFilter = state.filters['resultsGrade'] || 'all';
    
    let filteredResults = window.Components.helpers.filterData(results, {
        semester: semFilter !== 'all' ? semFilter : null,
        grade: gradeFilter !== 'all' ? gradeFilter : null
    });
    
    if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        filteredResults = filteredResults.filter(r => 
            (r.studentName && r.studentName.toLowerCase().includes(lowerQuery)) ||
            (r.course && r.course.toLowerCase().includes(lowerQuery))
        );
    }

    const page = state.currentPages['results'] || 1;
    const itemsPerPage = state.itemsPerPage || 10;
    const paginatedResults = window.Components.helpers.paginateData(filteredResults, page, itemsPerPage);

    const gradeColors = {
        'A+': 'success', 'A': 'success',
        'B+': 'info', 'B': 'info',
        'C+': 'warning', 'C': 'warning',
        'D': 'danger', 'F': 'danger'
    };

    return `
        <div class="page-header d-flex justify-content-between align-items-center mb-4">
            <h1 class="h3 mb-0 text-gray-800">Examination Results</h1>
            <button class="btn btn-primary shadow-sm"><i class="fas fa-download fa-sm text-white-50 mr-2"></i>Download All</button>
        </div>

        <div class="row mb-4">
            <div class="col-xl-3 col-md-6 mb-4">
                ${window.Components.renderStatCard('Total Results', totalResults, 'primary', 'fas fa-list-ol')}
            </div>
            <div class="col-xl-3 col-md-6 mb-4">
                ${window.Components.renderStatCard('Average GPA', avgGPA, 'info', 'fas fa-chart-line')}
            </div>
            <div class="col-xl-3 col-md-6 mb-4">
                ${window.Components.renderStatCard('Highest GPA', \`\${highestGPA} (\${highestStudent})\`, 'success', 'fas fa-trophy')}
            </div>
            <div class="col-xl-3 col-md-6 mb-4">
                ${window.Components.renderStatCard('Pass Rate', passRate + '%', 'warning', 'fas fa-check-double')}
            </div>
        </div>

        <div class="row mb-4">
            <div class="col-xl-8 col-lg-7 mb-4">
                <div class="card shadow h-100">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">Results Table</h6>
                        <div class="d-flex">
                            <div class="mr-2">
                                ${window.Components.renderSearchBar('results', 'Search student/course...', searchQuery)}
                            </div>
                            <div class="mr-2">
                                ${window.Components.renderFilterDropdown('resultsSem', ['all', 'Fall 2023', 'Spring 2024'], semFilter, 'Semester: All')}
                            </div>
                            <div>
                                ${window.Components.renderFilterDropdown('resultsGrade', ['all', 'A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'], gradeFilter, 'Grade: All')}
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        ${window.Components.renderDataTable({
                            columns: ['Student', 'Course', 'Code', 'Marks/Total', 'Grade', 'GPA', 'Credits'],
                            data: paginatedResults.map(r => ({
                                'Student': \`<div class="d-flex align-items-center">
                                    \${window.Components.renderAvatar(r.studentName, null, 'sm')}
                                    <span class="ml-2">\${r.studentName}</span>
                                </div>\`,
                                'Course': r.course,
                                'Code': r.code,
                                'Marks/Total': \`\${r.marks}/\${r.total}\`,
                                'Grade': window.Components.renderBadge(r.grade, gradeColors[r.grade] || 'secondary'),
                                'GPA': r.gpa.toFixed(2),
                                'Credits': r.credits
                            }))
                        })}
                        <div class="mt-3">
                            ${window.Components.renderPagination(filteredResults.length, page, itemsPerPage, 'results')}
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-xl-4 col-lg-5 mb-4">
                <div class="card shadow h-100">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Grade Distribution</h6>
                    </div>
                    <div class="card-body">
                        ${window.Components.renderChart('gradeDistributionChart', 'doughnut')}
                    </div>
                </div>
            </div>
        </div>
    `;
};

// 5. Pages.initResults()
Pages.initResults = function() {
    const results = window.AppData.results || [];
    const canvas = document.getElementById('gradeDistributionChart');
    
    if (canvas && results.length > 0) {
        const grades = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'];
        const counts = grades.map(g => results.filter(r => r.grade === g).length);
        
        new Chart(canvas, {
            type: 'doughnut',
            data: {
                labels: grades,
                datasets: [{
                    data: counts,
                    backgroundColor: [
                        '#10B981', '#34D399', '#3B82F6', '#60A5FA', 
                        '#F59E0B', '#FBBF24', '#EF4444', '#991B1B'
                    ],
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' }
                },
                cutout: '70%'
            }
        });
    }
};

// 6. Pages.fees()
Pages.fees = function() {
    const state = window.App.state;
    const fees = window.AppData.fees || [];
    
    const totalCollected = fees.filter(f => f.status === 'paid').reduce((sum, f) => sum + f.amount, 0);
    const pendingAmount = fees.filter(f => f.status === 'pending').reduce((sum, f) => sum + f.amount, 0);
    const overdueAmount = fees.filter(f => f.status === 'overdue').reduce((sum, f) => sum + f.amount, 0);
    const totalTransactions = fees.length;

    const activeTabId = state.activeTabs['feesTabs'] || 'overview';
    const searchQuery = state.searchQueries['fees'] || '';
    const statusFilter = state.filters['feesStatus'] || 'all';
    const typeFilter = state.filters['feesType'] || 'all';
    
    let filteredFees = window.Components.helpers.filterData(fees, {
        status: statusFilter !== 'all' ? statusFilter : null,
        type: typeFilter !== 'all' ? typeFilter : null
    });
    
    if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        filteredFees = filteredFees.filter(f => 
            (f.studentName && f.studentName.toLowerCase().includes(lowerQuery)) ||
            (f.transactionId && f.transactionId.toLowerCase().includes(lowerQuery))
        );
    }
    
    const page = state.currentPages['fees'] || 1;
    const itemsPerPage = state.itemsPerPage || 10;
    const paginatedFees = window.Components.helpers.paginateData(filteredFees, page, itemsPerPage);

    const statusColors = { 'paid': 'success', 'pending': 'warning', 'overdue': 'danger' };

    const overviewContent = `
        <div class="row">
            <div class="col-xl-8 col-lg-7">
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Fee Collection Overview</h6>
                    </div>
                    <div class="card-body">
                        ${window.Components.renderChart('feeCollectionChart', 'bar')}
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-lg-5">
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Recent Payments</h6>
                    </div>
                    <div class="card-body p-0">
                        <ul class="list-group list-group-flush">
                            ${fees.filter(f => f.status === 'paid').slice(0, 5).map(f => `
                                <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                    <div class="d-flex align-items-center">
                                        ${window.Components.renderAvatar(f.studentName, null, 'sm')}
                                        <div class="ml-3">
                                            <div class="font-weight-bold text-sm">${f.studentName}</div>
                                            <div class="text-xs text-muted">${f.type}</div>
                                        </div>
                                    </div>
                                    <div class="font-weight-bold text-success">
                                        ${window.Components.helpers.formatCurrency(f.amount)}
                                    </div>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;

    const historyContent = `
        <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Payment History</h6>
                <div class="d-flex">
                    <div class="mr-2">
                        ${window.Components.renderSearchBar('fees', 'Search student/Txn ID...', searchQuery)}
                    </div>
                    <div class="mr-2">
                        ${window.Components.renderFilterDropdown('feesStatus', ['all', 'paid', 'pending', 'overdue'], statusFilter, 'Status: All')}
                    </div>
                    <div>
                        ${window.Components.renderFilterDropdown('feesType', ['all', 'tuition', 'hostel', 'library', 'exam'], typeFilter, 'Type: All')}
                    </div>
                </div>
            </div>
            <div class="card-body">
                ${window.Components.renderDataTable({
                    columns: ['Student', 'Type', 'Amount', 'Due Date', 'Paid Date', 'Status', 'Transaction ID'],
                    data: paginatedFees.map(f => ({
                        'Student': f.studentName,
                        'Type': f.type,
                        'Amount': window.Components.helpers.formatCurrency(f.amount),
                        'Due Date': window.Components.helpers.formatDate(f.dueDate),
                        'Paid Date': f.paidDate ? window.Components.helpers.formatDate(f.paidDate) : '-',
                        'Status': window.Components.renderBadge(f.status, statusColors[f.status] || 'secondary'),
                        'Transaction ID': f.transactionId || '-'
                    }))
                })}
                <div class="mt-3">
                    ${window.Components.renderPagination(filteredFees.length, page, itemsPerPage, 'fees')}
                </div>
            </div>
        </div>
    `;

    const pendingOverdue = fees.filter(f => f.status !== 'paid');
    const invoicesContent = `
        <div class="row">
            ${pendingOverdue.map(f => `
                <div class="col-xl-4 col-md-6 mb-4">
                    <div class="card shadow invoice-card h-100 border-left-${statusColors[f.status]}">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <h6 class="font-weight-bold mb-0">${f.type.toUpperCase()}</h6>
                                ${window.Components.renderBadge(f.status, statusColors[f.status])}
                            </div>
                            <h4 class="font-weight-bold text-gray-800 mb-3">${window.Components.helpers.formatCurrency(f.amount)}</h4>
                            <div class="text-sm mb-2"><span class="text-muted">Student:</span> ${f.studentName}</div>
                            <div class="text-sm mb-4"><span class="text-muted">Due Date:</span> ${window.Components.helpers.formatDate(f.dueDate)}</div>
                            <button class="btn btn-sm btn-${statusColors[f.status]} w-100">Pay Now</button>
                        </div>
                    </div>
                </div>
            `).join('')}
            ${pendingOverdue.length === 0 ? window.Components.renderEmptyState('No pending invoices') : ''}
        </div>
    `;

    const tabs = [
        { id: 'overview', label: 'Overview', content: overviewContent },
        { id: 'history', label: 'Payment History', content: historyContent },
        { id: 'invoices', label: 'Invoices', content: invoicesContent }
    ];

    return `
        <div class="page-header d-flex justify-content-between align-items-center mb-4">
            <h1 class="h3 mb-0 text-gray-800">Fee Management</h1>
            <button class="btn btn-primary shadow-sm"><i class="fas fa-file-invoice-dollar fa-sm text-white-50 mr-2"></i>Generate Invoice</button>
        </div>

        <div class="row mb-4">
            <div class="col-xl-3 col-md-6 mb-4">
                ${window.Components.renderStatCard('Total Collected', window.Components.helpers.formatCurrency(totalCollected), 'success', 'fas fa-wallet')}
            </div>
            <div class="col-xl-3 col-md-6 mb-4">
                ${window.Components.renderStatCard('Pending Amount', window.Components.helpers.formatCurrency(pendingAmount), 'warning', 'fas fa-hourglass-half')}
            </div>
            <div class="col-xl-3 col-md-6 mb-4">
                ${window.Components.renderStatCard('Overdue Amount', window.Components.helpers.formatCurrency(overdueAmount), 'danger', 'fas fa-exclamation-circle')}
            </div>
            <div class="col-xl-3 col-md-6 mb-4">
                ${window.Components.renderStatCard('Total Transactions', totalTransactions, 'info', 'fas fa-receipt')}
            </div>
        </div>

        ${window.Components.renderTabs('feesTabs', tabs, activeTabId)}
    `;
};

// 7. Pages.initFees()
Pages.initFees = function() {
    const fees = window.AppData.fees || [];
    const canvas = document.getElementById('feeCollectionChart');
    
    if (canvas && fees.length > 0) {
        const types = [...new Set(fees.map(f => f.type))];
        const collectedData = types.map(t => 
            fees.filter(f => f.type === t && f.status === 'paid').reduce((sum, f) => sum + f.amount, 0)
        );
        const pendingData = types.map(t => 
            fees.filter(f => f.type === t && f.status !== 'paid').reduce((sum, f) => sum + f.amount, 0)
        );

        new Chart(canvas, {
            type: 'bar',
            data: {
                labels: types,
                datasets: [
                    {
                        label: 'Collected',
                        data: collectedData,
                        backgroundColor: '#10B981',
                    },
                    {
                        label: 'Pending/Overdue',
                        data: pendingData,
                        backgroundColor: '#F59E0B',
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { grid: { display: false } },
                    y: { grid: { color: '#f3f4f6' }, beginAtZero: true }
                }
            }
        });
    }
};

// 8. Pages.library()
Pages.library = function() {
    const state = window.App.state;
    const books = window.AppData.books || [];
    const issuedBooks = window.AppData.issuedBooks || [];
    
    const totalBooks = books.reduce((sum, b) => sum + b.total, 0);
    const availableBooks = books.reduce((sum, b) => sum + b.available, 0);
    const totalIssued = issuedBooks.filter(i => i.status === 'issued').length;
    const totalOverdue = issuedBooks.filter(i => i.status === 'overdue').length;

    const activeTabId = state.activeTabs['libraryTabs'] || 'catalog';
    
    // Catalog filters
    const searchQuery = state.searchQueries['libraryCatalog'] || '';
    const catFilter = state.filters['libraryCategory'] || 'all';
    
    let filteredBooks = window.Components.helpers.filterData(books, {
        category: catFilter !== 'all' ? catFilter : null
    });
    
    if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        filteredBooks = filteredBooks.filter(b => 
            (b.title && b.title.toLowerCase().includes(lowerQuery)) ||
            (b.author && b.author.toLowerCase().includes(lowerQuery))
        );
    }
    
    const catColors = {
        'Computer Science': 'primary',
        'Engineering': 'info',
        'Mathematics': 'success',
        'Physics': 'warning',
        'Literature': 'secondary'
    };

    const catalogContent = `
        <div class="d-flex justify-content-between mb-4">
            <div>
                ${window.Components.renderSearchBar('libraryCatalog', 'Search title/author...', searchQuery)}
            </div>
            <div>
                ${window.Components.renderFilterDropdown('libraryCategory', ['all', 'Computer Science', 'Engineering', 'Mathematics', 'Physics', 'Literature'], catFilter, 'Category: All')}
            </div>
        </div>
        
        <div class="row">
            ${filteredBooks.map(b => {
                const availPct = (b.available / b.total) * 100;
                const accentColor = catColors[b.category] || 'primary';
                return `
                <div class="col-xl-4 col-md-6 mb-4">
                    <div class="card shadow h-100 book-card border-top-${accentColor}">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <h5 class="font-weight-bold text-gray-800 mb-0">${b.title}</h5>
                                ${window.Components.renderBadge(b.category, accentColor)}
                            </div>
                            <div class="text-sm text-muted mb-3">by ${b.author}</div>
                            <div class="text-sm mb-2"><i class="fas fa-barcode mr-2"></i>ISBN: ${b.isbn}</div>
                            <div class="text-sm mb-3"><i class="fas fa-layer-group mr-2"></i>Shelf: ${b.shelf}</div>
                            
                            <div class="mb-3">
                                <div class="d-flex justify-content-between text-xs mb-1">
                                    <span>Availability</span>
                                    <span class="font-weight-bold">${b.available} / ${b.total}</span>
                                </div>
                                ${window.Components.renderProgressBar(availPct, availPct > 20 ? 'success' : 'danger', 'sm')}
                            </div>
                            
                            <button class="btn btn-sm btn-outline-primary w-100" ${b.available === 0 ? 'disabled' : ''}>
                                ${b.available > 0 ? 'Issue Book' : 'Out of Stock'}
                            </button>
                        </div>
                    </div>
                </div>
            `}).join('')}
            ${filteredBooks.length === 0 ? window.Components.renderEmptyState('No books found') : ''}
        </div>
    `;

    const statusColors = { 'issued': 'info', 'returned': 'success', 'overdue': 'danger' };
    
    const issuedContent = `
        <div class="card shadow mb-4">
            <div class="card-body">
                ${window.Components.renderDataTable({
                    columns: ['Book Title', 'Student', 'Issue Date', 'Due Date', 'Return Date', 'Status', 'Fine'],
                    data: issuedBooks.map(i => ({
                        'Book Title': i.bookTitle,
                        'Student': i.studentName,
                        'Issue Date': window.Components.helpers.formatDate(i.issueDate),
                        'Due Date': window.Components.helpers.formatDate(i.dueDate),
                        'Return Date': i.returnDate ? window.Components.helpers.formatDate(i.returnDate) : '-',
                        'Status': window.Components.renderBadge(i.status, statusColors[i.status] || 'secondary'),
                        'Fine': window.Components.helpers.formatCurrency(i.fine || 0)
                    }))
                })}
            </div>
        </div>
    `;

    const tabs = [
        { id: 'catalog', label: 'Book Catalog', content: catalogContent },
        { id: 'issued', label: 'Issued Books', content: issuedContent }
    ];

    return `
        <div class="page-header d-flex justify-content-between align-items-center mb-4">
            <h1 class="h3 mb-0 text-gray-800">Library Portal</h1>
            <button class="btn btn-primary shadow-sm"><i class="fas fa-plus fa-sm text-white-50 mr-2"></i>Add Book</button>
        </div>

        <div class="row mb-4">
            <div class="col-xl-3 col-md-6 mb-4">
                ${window.Components.renderStatCard('Total Books', totalBooks, 'primary', 'fas fa-book')}
            </div>
            <div class="col-xl-3 col-md-6 mb-4">
                ${window.Components.renderStatCard('Available', availableBooks, 'success', 'fas fa-check-circle')}
            </div>
            <div class="col-xl-3 col-md-6 mb-4">
                ${window.Components.renderStatCard('Issued', totalIssued, 'info', 'fas fa-hand-holding')}
            </div>
            <div class="col-xl-3 col-md-6 mb-4">
                ${window.Components.renderStatCard('Overdue Books', totalOverdue, 'danger', 'fas fa-exclamation-triangle')}
            </div>
        </div>

        ${window.Components.renderTabs('libraryTabs', tabs, activeTabId)}
    `;
};

// 9. Pages.announcements()
Pages.announcements = function() {
    const state = window.App.state;
    const announcements = window.AppData.announcements || [];
    const events = window.AppData.events || [];
    
    const activeTabId = state.activeTabs['announcementsTabs'] || 'news';

    const priorityColors = { 'high': 'danger', 'medium': 'warning', 'low': 'info' };

    const newsContent = `
        <div class="row">
            <div class="col-12">
                ${announcements.map(a => `
                    <div class="card shadow mb-4 announcement-card border-left-${priorityColors[a.priority] || 'primary'}">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <div class="d-flex gap-2 mb-2">
                                    ${window.Components.renderBadge(a.category, 'primary')}
                                    ${window.Components.renderBadge(a.priority + ' Priority', priorityColors[a.priority])}
                                </div>
                                <div class="text-sm text-muted">
                                    <i class="fas fa-calendar mr-1"></i>${window.Components.helpers.formatDate(a.date)}
                                </div>
                            </div>
                            <h4 class="font-weight-bold text-gray-800 mb-3">${a.title}</h4>
                            <p class="text-gray-700 mb-3">${a.content}</p>
                            <div class="text-sm font-italic text-muted">Posted by: ${a.author}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    const eventsContent = `
        <div class="row">
            <div class="col-xl-8 col-lg-7 mb-4">
                <div class="card shadow h-100">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Event Calendar</h6>
                    </div>
                    <div class="card-body">
                        ${window.Components.renderCalendar(new Date().getFullYear(), new Date().getMonth(), events)}
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-lg-5 mb-4">
                <div class="card shadow h-100">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Upcoming Events</h6>
                    </div>
                    <div class="card-body p-0">
                        <ul class="list-group list-group-flush">
                            ${events.slice(0, 5).map(e => `
                                <li class="list-group-item p-3">
                                    <div class="font-weight-bold text-gray-800 mb-1">${e.title}</div>
                                    <div class="text-sm text-muted mb-2">
                                        <i class="fas fa-calendar mr-1"></i>${window.Components.helpers.formatDate(e.date)} at ${e.time}
                                    </div>
                                    <div class="text-sm mb-2"><i class="fas fa-map-marker-alt mr-1"></i>${e.venue}</div>
                                    <div class="d-flex gap-1">
                                        ${window.Components.renderBadge(e.type, 'info')}
                                        ${window.Components.renderBadge(e.department, 'secondary')}
                                    </div>
                                    <p class="text-xs mt-2 mb-0">${e.description || ''}</p>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;

    const noticeBoardContent = `
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Notice Board</h6>
            </div>
            <div class="card-body p-0">
                <div class="list-group list-group-flush">
                    ${announcements.map((a, i) => `
                        <div class="list-group-item list-group-item-action flex-column align-items-start p-3" style="cursor: pointer" onclick="$(this).find('.collapse').collapse('toggle')">
                            <div class="d-flex w-100 justify-content-between align-items-center">
                                <div class="d-flex align-items-center">
                                    <div class="bg-${priorityColors[a.priority]} rounded-circle mr-3" style="width: 12px; height: 12px;"></div>
                                    <h6 class="mb-0 font-weight-bold">${a.title}</h6>
                                </div>
                                <div class="text-sm text-muted">${window.Components.helpers.formatDate(a.date)}</div>
                            </div>
                            <div class="collapse mt-3" id="notice-${i}">
                                <div class="mb-2">${window.Components.renderBadge(a.category, 'secondary')}</div>
                                <p class="mb-0 text-gray-700">${a.content}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    const tabs = [
        { id: 'news', label: 'News Feed', content: newsContent },
        { id: 'events', label: 'Event Calendar', content: eventsContent },
        { id: 'notices', label: 'Notice Board', content: noticeBoardContent }
    ];

    return `
        <div class="page-header d-flex justify-content-between align-items-center mb-4">
            <h1 class="h3 mb-0 text-gray-800">Announcements & Events</h1>
            <button class="btn btn-primary shadow-sm"><i class="fas fa-bullhorn fa-sm text-white-50 mr-2"></i>New Announcement</button>
        </div>

        ${window.Components.renderTabs('announcementsTabs', tabs, activeTabId)}
    `;
};
