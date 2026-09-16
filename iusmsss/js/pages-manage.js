window.Pages = window.Pages || {};

Pages.studentList = function() {
    let data = window.AppData.students;
    const state = window.App.state;
    
    // Filtering
    const query = state.searchQueries.students || '';
    if (query) {
        const q = query.toLowerCase();
        data = data.filter(s => 
            s.name.toLowerCase().includes(q) || 
            s.email.toLowerCase().includes(q) || 
            s.department.toLowerCase().includes(q)
        );
    }
    
    const dept = state.filters.students?.department;
    if (dept) data = data.filter(s => s.department === dept);
    
    const sem = state.filters.students?.semester;
    if (sem) data = data.filter(s => s.semester.toString() === sem.toString());
    
    const status = state.filters.students?.status;
    if (status) data = data.filter(s => s.status === status);
    
    // Sorting
    const sortConfig = state.sortConfig.students || { column: 'name', direction: 'asc' };
    if (window.Components.helpers.sortData) {
        data = window.Components.helpers.sortData(data, sortConfig.column, sortConfig.direction);
    } else {
        data.sort((a, b) => {
            let valA = a[sortConfig.column];
            let valB = b[sortConfig.column];
            if (typeof valA === 'string') valA = valA.toLowerCase();
            if (typeof valB === 'string') valB = valB.toLowerCase();
            if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
            if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }
    
    // Pagination
    const currentPage = state.currentPages.students || 1;
    const itemsPerPage = state.itemsPerPage || 10;
    const paginatedData = window.Components.helpers.paginateData ? 
        window.Components.helpers.paginateData(data, currentPage, itemsPerPage) :
        data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    
    // Stats
    const totalStudents = window.AppData.students.length;
    const activeStudents = window.AppData.students.filter(s => s.status === 'active').length;
    const graduatedStudents = window.AppData.students.filter(s => s.status === 'graduated').length;
    const avgGPA = (window.AppData.students.reduce((sum, s) => sum + s.gpa, 0) / (totalStudents || 1)).toFixed(2);
    
    // Departments
    const depts = window.AppData.departments.map(d => d.name);
    
    const columns = [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'id', label: 'ID', sortable: false },
        { key: 'department', label: 'Department', sortable: true },
        { key: 'semester', label: 'Semester', sortable: false },
        { key: 'gpa', label: 'GPA', sortable: true },
        { key: 'attendance', label: 'Attendance', sortable: true },
        { key: 'feeStatus', label: 'Fee Status', sortable: false },
        { key: 'actions', label: 'Actions', sortable: false }
    ];
    
    const renderCell = (row, col) => {
        if (col.key === 'name') {
            return `
                <div style="display: flex; align-items: center; gap: 10px;">
                    ${window.Components.renderAvatar(row.name, row.avatar || null, 'sm')}
                    <div>
                        <div style="font-weight: 500;">${row.name}</div>
                        <div style="font-size: 12px; color: var(--text-muted);">${row.email}</div>
                    </div>
                </div>
            `;
        }
        if (col.key === 'id') return `STU-${row.id.toString().padStart(3, '0')}`;
        if (col.key === 'gpa') {
            let color = 'var(--danger)';
            if (row.gpa >= 3.5) color = 'var(--success)';
            else if (row.gpa >= 3.0) color = 'var(--warning)';
            return `<span style="color: ${color}; font-weight: 600;">${row.gpa.toFixed(2)}</span>`;
        }
        if (col.key === 'attendance') {
            return window.Components.renderProgressBar(row.attendance, row.attendance >= 75 ? 'success' : 'danger');
        }
        if (col.key === 'feeStatus') {
            return window.Components.renderBadge(row.feeStatus, row.feeStatus === 'paid' ? 'success' : 'warning');
        }
        if (col.key === 'actions') {
            return `
                <button class="btn btn-sm btn-outline" onclick="App.navigate('#/students/profile/${row.id}')">View</button>
                <button class="btn btn-sm btn-outline" onclick="App.navigate('#/students/edit/${row.id}')">Edit</button>
            `;
        }
        return row[col.key];
    };
    
    return `
        <div class="page-container fade-in">
            <div class="page-header">
                <div>
                    <h1 class="page-title">Students</h1>
                    <p class="page-subtitle">Manage student records</p>
                </div>
                <div class="btn-group">
                    <button class="btn btn-outline btn-sm" onclick="App.exportData('students')">Export</button>
                    <button class="btn btn-primary btn-sm" onclick="App.navigate('#/students/add')">+ Add Student</button>
                </div>
            </div>
            
            <div class="grid grid-4" style="margin-bottom:24px">
                ${window.Components.renderStatCard('Total Students', totalStudents, 'primary', 'users')}
                ${window.Components.renderStatCard('Active Students', activeStudents, 'success', 'check-circle')}
                ${window.Components.renderStatCard('Graduated', graduatedStudents, 'info', 'award')}
                ${window.Components.renderStatCard('Average GPA', avgGPA, 'warning', 'star')}
            </div>
            
            <div class="search-filter-bar" style="display: flex; gap: 15px; margin-bottom: 20px;">
                ${window.Components.renderSearchBar('Search students...', 'students', query)}
                ${window.Components.renderFilterDropdown('Department', depts, 'students-department', dept || '')}
                ${window.Components.renderFilterDropdown('Semester', ['1','2','3','4','5','6','7','8'], 'students-semester', sem || '')}
                ${window.Components.renderFilterDropdown('Status', ['active','inactive','graduated'], 'students-status', status || '')}
            </div>
            
            <div class="card">
                ${data.length > 0 ? 
                    window.Components.renderDataTable(columns, paginatedData, renderCell, 'students') : 
                    window.Components.renderEmptyState('No students found', 'Try adjusting your search or filters.')
                }
                ${data.length > 0 ? window.Components.renderPagination(currentPage, totalPages, 'students') : ''}
            </div>
        </div>
    `;
};

Pages.studentForm = function(id) {
    const isEdit = !!id;
    let student = {
        name: '', email: '', phone: '', dob: '', gender: 'male', bloodGroup: 'A+',
        address: '', department: '', semester: '1', enrollmentDate: '', guardianName: '', guardianPhone: ''
    };
    
    if (isEdit) {
        const found = window.AppData.students.find(s => s.id.toString() === id.toString());
        if (found) student = { ...found };
    }
    
    const depts = window.AppData.departments.map(d => d.name);
    
    return `
        <div class="page-container fade-in">
            <div class="page-header">
                <div>
                    <h1 class="page-title">${isEdit ? 'Edit Student' : 'Add New Student'}</h1>
                </div>
            </div>
            
            <div class="card" style="padding: 24px;">
                <form onsubmit="event.preventDefault(); window.App.showToast('Student saved successfully!', 'success'); window.App.navigate('#/students');">
                    <h3 class="form-section-title" style="margin-bottom: 15px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">Personal Information</h3>
                    <div class="form-section" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 25px;">
                        <div class="form-group">
                            <label class="form-label">First Name</label>
                            <input type="text" class="form-input" required value="${student.name ? student.name.split(' ')[0] : ''}">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Last Name</label>
                            <input type="text" class="form-input" required value="${student.name ? student.name.split(' ').slice(1).join(' ') : ''}">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-input" required value="${student.email}">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Phone</label>
                            <input type="tel" class="form-input" value="${student.phone}">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Date of Birth</label>
                            <input type="date" class="form-input" value="${student.dob}">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Gender</label>
                            <select class="form-select">
                                <option value="male" ${student.gender === 'male' ? 'selected' : ''}>Male</option>
                                <option value="female" ${student.gender === 'female' ? 'selected' : ''}>Female</option>
                                <option value="other" ${student.gender === 'other' ? 'selected' : ''}>Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Blood Group</label>
                            <select class="form-select">
                                ${['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => `<option value="${bg}" ${student.bloodGroup === bg ? 'selected' : ''}>${bg}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group" style="margin-bottom: 25px;">
                        <label class="form-label">Address</label>
                        <textarea class="form-input" rows="3">${student.address}</textarea>
                    </div>
                    
                    <h3 class="form-section-title" style="margin-bottom: 15px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">Academic Details</h3>
                    <div class="form-section" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 25px;">
                        <div class="form-group">
                            <label class="form-label">Department</label>
                            <select class="form-select" required>
                                <option value="">Select Department</option>
                                ${depts.map(d => `<option value="${d}" ${student.department === d ? 'selected' : ''}>${d}</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Semester</label>
                            <select class="form-select" required>
                                ${[1,2,3,4,5,6,7,8].map(s => `<option value="${s}" ${student.semester == s ? 'selected' : ''}>Semester ${s}</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Enrollment Date</label>
                            <input type="date" class="form-input" value="${student.enrollmentDate}">
                        </div>
                    </div>
                    
                    <h3 class="form-section-title" style="margin-bottom: 15px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">Guardian Information</h3>
                    <div class="form-section" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 25px;">
                        <div class="form-group">
                            <label class="form-label">Guardian Name</label>
                            <input type="text" class="form-input" value="${student.guardianName}">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Guardian Phone</label>
                            <input type="tel" class="form-input" value="${student.guardianPhone}">
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 10px; justify-content: flex-end;">
                        <button type="button" class="btn btn-outline" onclick="App.navigate('#/students')">Cancel</button>
                        <button type="submit" class="btn btn-primary">Save Student</button>
                    </div>
                </form>
            </div>
        </div>
    `;
};

Pages.facultyList = function() {
    let data = window.AppData.faculty;
    const state = window.App.state;
    
    // Filtering
    const query = state.searchQueries.faculty || '';
    if (query) {
        const q = query.toLowerCase();
        data = data.filter(f => 
            f.name.toLowerCase().includes(q) || 
            f.email.toLowerCase().includes(q) || 
            f.department.toLowerCase().includes(q)
        );
    }
    
    const dept = state.filters.faculty?.department;
    if (dept) data = data.filter(f => f.department === dept);
    
    // Sorting
    const sortConfig = state.sortConfig.faculty || { column: 'name', direction: 'asc' };
    if (window.Components.helpers.sortData) {
        data = window.Components.helpers.sortData(data, sortConfig.column, sortConfig.direction);
    } else {
        data.sort((a, b) => {
            let valA = a[sortConfig.column];
            let valB = b[sortConfig.column];
            if (typeof valA === 'string') valA = valA.toLowerCase();
            if (typeof valB === 'string') valB = valB.toLowerCase();
            if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
            if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }
    
    // Pagination
    const currentPage = state.currentPages.faculty || 1;
    const itemsPerPage = state.itemsPerPage || 10;
    const paginatedData = window.Components.helpers.paginateData ? 
        window.Components.helpers.paginateData(data, currentPage, itemsPerPage) :
        data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    
    // Stats
    const totalFaculty = window.AppData.faculty.length;
    const activeFaculty = window.AppData.faculty.filter(f => f.status === 'active').length;
    const onLeaveFaculty = window.AppData.faculty.filter(f => f.status === 'on_leave').length;
    
    // Departments
    const depts = window.AppData.departments.map(d => d.name);
    
    const columns = [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'id', label: 'ID', sortable: false },
        { key: 'department', label: 'Department', sortable: true },
        { key: 'specialization', label: 'Specialization', sortable: false },
        { key: 'experience', label: 'Experience', sortable: true },
        { key: 'courses', label: 'Courses', sortable: false },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'actions', label: 'Actions', sortable: false }
    ];
    
    const renderCell = (row, col) => {
        if (col.key === 'name') {
            return `
                <div style="display: flex; align-items: center; gap: 10px;">
                    ${window.Components.renderAvatar(row.name, row.avatar || null, 'sm')}
                    <div>
                        <div style="font-weight: 500;">${row.name}</div>
                        <div style="font-size: 12px; color: var(--text-muted);">${row.email}</div>
                    </div>
                </div>
            `;
        }
        if (col.key === 'id') return `FAC-${row.id.toString().padStart(3, '0')}`;
        if (col.key === 'experience') return `${row.experience} Years`;
        if (col.key === 'courses') {
            const coursesCount = window.AppData.courses.filter(c => c.facultyId === row.id).length;
            return window.Components.renderBadge(`${coursesCount} Courses`, 'info');
        }
        if (col.key === 'status') {
            return window.Components.renderBadge(row.status, row.status === 'active' ? 'success' : 'warning');
        }
        if (col.key === 'actions') {
            return `<button class="btn btn-sm btn-outline" onclick="App.navigate('#/faculty/profile/${row.id}')">Profile</button>`;
        }
        return row[col.key];
    };
    
    return `
        <div class="page-container fade-in">
            <div class="page-header">
                <div>
                    <h1 class="page-title">Faculty</h1>
                    <p class="page-subtitle">Manage faculty records</p>
                </div>
                <div class="btn-group">
                    <button class="btn btn-primary btn-sm" onclick="App.navigate('#/faculty/add')">+ Add Faculty</button>
                </div>
            </div>
            
            <div class="grid grid-3" style="margin-bottom:24px">
                ${window.Components.renderStatCard('Total Faculty', totalFaculty, 'primary', 'user')}
                ${window.Components.renderStatCard('Active', activeFaculty, 'success', 'check-circle')}
                ${window.Components.renderStatCard('On Leave', onLeaveFaculty, 'warning', 'clock')}
            </div>
            
            <div class="search-filter-bar" style="display: flex; gap: 15px; margin-bottom: 20px;">
                ${window.Components.renderSearchBar('Search faculty...', 'faculty', query)}
                ${window.Components.renderFilterDropdown('Department', depts, 'faculty-department', dept || '')}
            </div>
            
            <div class="card">
                ${data.length > 0 ? 
                    window.Components.renderDataTable(columns, paginatedData, renderCell, 'faculty') : 
                    window.Components.renderEmptyState('No faculty found', 'Try adjusting your search or filters.')
                }
                ${data.length > 0 ? window.Components.renderPagination(currentPage, totalPages, 'faculty') : ''}
            </div>
        </div>
    `;
};

Pages.facultyProfile = function(id) {
    const faculty = window.AppData.faculty.find(f => f.id.toString() === id.toString());
    
    if (!faculty) {
        return `<div class="page-container fade-in">${window.Components.renderEmptyState('Faculty not found', 'Invalid faculty ID.')}</div>`;
    }
    
    const coursesTaught = window.AppData.courses.filter(c => c.facultyId === faculty.id);
    
    return `
        <div class="page-container fade-in">
            <div class="page-header">
                <div>
                    <h1 class="page-title">Faculty Profile</h1>
                </div>
                <button class="btn btn-outline" onclick="App.navigate('#/faculty')">Back to List</button>
            </div>
            
            <div class="grid" style="grid-template-columns: 1fr 2fr; gap: 24px;">
                <!-- Profile Sidebar -->
                <div class="card" style="padding: 24px; text-align: center;">
                    ${window.Components.renderAvatar(faculty.name, faculty.avatar, 'lg')}
                    <h2 style="margin-top: 15px; margin-bottom: 5px;">${faculty.name}</h2>
                    <p style="color: var(--text-muted); margin-bottom: 15px;">${faculty.department}</p>
                    ${window.Components.renderBadge(faculty.status, faculty.status === 'active' ? 'success' : 'warning')}
                    
                    <div style="margin-top: 25px; text-align: left;">
                        <h4 style="margin-bottom: 10px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">Contact Info</h4>
                        <p style="margin-bottom: 8px;"><strong>Email:</strong> ${faculty.email}</p>
                        <p style="margin-bottom: 8px;"><strong>Phone:</strong> ${faculty.phone}</p>
                        <p><strong>Join Date:</strong> ${faculty.joinDate || 'N/A'}</p>
                    </div>
                </div>
                
                <!-- Details Area -->
                <div>
                    <div class="card" style="padding: 24px; margin-bottom: 24px;">
                        <h3 style="margin-bottom: 15px;">Professional Details</h3>
                        <div class="grid grid-3" style="gap: 15px; margin-bottom: 20px;">
                            <div style="background: var(--bg-alt); padding: 15px; border-radius: 8px;">
                                <div style="font-size: 12px; color: var(--text-muted);">Specialization</div>
                                <div style="font-weight: 600;">${faculty.specialization}</div>
                            </div>
                            <div style="background: var(--bg-alt); padding: 15px; border-radius: 8px;">
                                <div style="font-size: 12px; color: var(--text-muted);">Qualification</div>
                                <div style="font-weight: 600;">${faculty.qualification || 'N/A'}</div>
                            </div>
                            <div style="background: var(--bg-alt); padding: 15px; border-radius: 8px;">
                                <div style="font-size: 12px; color: var(--text-muted);">Experience</div>
                                <div style="font-weight: 600;">${faculty.experience} Years</div>
                            </div>
                        </div>
                        
                        <h4 style="margin-bottom: 10px;">Bio</h4>
                        <p style="line-height: 1.6; color: var(--text-light);">${faculty.bio || 'No biography available.'}</p>
                    </div>
                    
                    <div class="card" style="padding: 24px;">
                        <h3 style="margin-bottom: 15px;">Courses Taught</h3>
                        ${coursesTaught.length > 0 ? `
                            <table style="width: 100%; border-collapse: collapse;">
                                <thead>
                                    <tr style="border-bottom: 1px solid var(--border-color); text-align: left;">
                                        <th style="padding: 10px;">Code</th>
                                        <th style="padding: 10px;">Course Name</th>
                                        <th style="padding: 10px;">Semester</th>
                                        <th style="padding: 10px;">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${coursesTaught.map(c => `
                                        <tr style="border-bottom: 1px solid var(--border-light);">
                                            <td style="padding: 10px;">${c.code}</td>
                                            <td style="padding: 10px;">${c.name}</td>
                                            <td style="padding: 10px;">${c.semester}</td>
                                            <td style="padding: 10px;">
                                                <button class="btn btn-sm btn-outline" onclick="App.navigate('#/courses/details/${c.id}')">View</button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        ` : '<p>No courses assigned.</p>'}
                    </div>
                </div>
            </div>
        </div>
    `;
};

Pages.courseCatalog = function() {
    let data = window.AppData.courses;
    const state = window.App.state;
    const viewMode = state.viewMode || 'grid'; // Need viewMode in state
    
    // Filtering
    const query = state.searchQueries.courses || '';
    if (query) {
        const q = query.toLowerCase();
        data = data.filter(c => 
            c.name.toLowerCase().includes(q) || 
            c.code.toLowerCase().includes(q) || 
            c.department.toLowerCase().includes(q)
        );
    }
    
    const dept = state.filters.courses?.department;
    if (dept) data = data.filter(c => c.department === dept);
    
    const sem = state.filters.courses?.semester;
    if (sem) data = data.filter(c => c.semester.toString() === sem.toString());
    
    const status = state.filters.courses?.status;
    if (status) data = data.filter(c => c.status === status);
    
    // Departments for dropdown and coloring
    const depts = window.AppData.departments.map(d => d.name);
    const getDeptColor = (deptName) => {
        const d = window.AppData.departments.find(d => d.name === deptName);
        return d ? d.color : 'var(--primary)';
    };
    
    let contentHTML = '';
    
    if (data.length === 0) {
        contentHTML = window.Components.renderEmptyState('No courses found', 'Try adjusting filters.');
    } else if (viewMode === 'list') {
        const columns = [
            { key: 'code', label: 'Code', sortable: false },
            { key: 'name', label: 'Name', sortable: false },
            { key: 'department', label: 'Department', sortable: false },
            { key: 'credits', label: 'Credits', sortable: false },
            { key: 'faculty', label: 'Faculty', sortable: false },
            { key: 'actions', label: 'Actions', sortable: false }
        ];
        
        const renderCell = (row, col) => {
            if (col.key === 'faculty') {
                const fac = window.AppData.faculty.find(f => f.id === row.facultyId);
                return fac ? fac.name : 'Unassigned';
            }
            if (col.key === 'actions') {
                return `<button class="btn btn-sm btn-outline" onclick="App.navigate('#/courses/details/${row.id}')">View</button>`;
            }
            return row[col.key];
        };
        
        contentHTML = `<div class="card">${window.Components.renderDataTable(columns, data, renderCell, 'courses')}</div>`;
    } else {
        contentHTML = `
            <div class="grid grid-3" style="gap: 20px;">
                ${data.map(c => {
                    const fac = window.AppData.faculty.find(f => f.id === c.facultyId);
                    return `
                        <div class="card course-card" style="overflow: hidden; cursor: pointer; display: flex; flex-direction: column;" onclick="App.navigate('#/courses/details/${c.id}')">
                            <div style="height: 6px; background: ${getDeptColor(c.department)}; width: 100%;"></div>
                            <div style="padding: 20px; flex: 1; display: flex; flex-direction: column;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                                    ${window.Components.renderBadge(c.code, 'primary')}
                                    ${window.Components.renderBadge(`${c.credits} Credits`, 'info')}
                                </div>
                                <h3 style="margin-bottom: 10px;">${c.name}</h3>
                                <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 10px; flex: 1;">
                                    <i class="icon-user"></i> ${fac ? fac.name : 'Unassigned'}
                                </p>
                                <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 15px;">
                                    <i class="icon-clock"></i> ${c.schedule || 'TBD'}
                                </p>
                                <div style="border-top: 1px solid var(--border-light); padding-top: 15px; display: flex; justify-content: space-between; align-items: center;">
                                    <div style="flex: 1; margin-right: 15px;">
                                        <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 5px;">
                                            <span>Enrolled</span>
                                            <span>${c.enrolled}/${c.capacity}</span>
                                        </div>
                                        ${window.Components.renderProgressBar(Math.round((c.enrolled/c.capacity)*100), (c.enrolled/c.capacity) > 0.9 ? 'danger' : 'primary')}
                                    </div>
                                    ${window.Components.renderBadge(c.status, c.status === 'active' ? 'success' : 'warning')}
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }
    
    return `
        <div class="page-container fade-in">
            <div class="page-header">
                <div>
                    <h1 class="page-title">Course Catalog</h1>
                    <p class="page-subtitle">View and manage courses</p>
                </div>
                <div class="btn-group">
                    <button class="btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline'} btn-sm" onclick="App.state.viewMode = 'grid'; App.navigate('#/courses')">Grid</button>
                    <button class="btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline'} btn-sm" onclick="App.state.viewMode = 'list'; App.navigate('#/courses')">List</button>
                </div>
            </div>
            
            <div class="search-filter-bar" style="display: flex; gap: 15px; margin-bottom: 24px;">
                ${window.Components.renderSearchBar('Search courses...', 'courses', query)}
                ${window.Components.renderFilterDropdown('Department', depts, 'courses-department', dept || '')}
                ${window.Components.renderFilterDropdown('Semester', ['1','2','3','4','5','6','7','8'], 'courses-semester', sem || '')}
                ${window.Components.renderFilterDropdown('Status', ['active','upcoming','archived'], 'courses-status', status || '')}
            </div>
            
            ${contentHTML}
        </div>
    `;
};

Pages.courseDetails = function(id) {
    const course = window.AppData.courses.find(c => c.id.toString() === id.toString());
    
    if (!course) {
        return `<div class="page-container fade-in">${window.Components.renderEmptyState('Course not found', 'Invalid course ID.')}</div>`;
    }
    
    const faculty = window.AppData.faculty.find(f => f.id === course.facultyId);
    
    // Students enrolled in this department and semester
    const enrolledStudents = window.AppData.students.filter(s => s.department === course.department && s.semester.toString() === course.semester.toString());
    
    const columns = [
        { key: 'name', label: 'Student Name', sortable: false },
        { key: 'id', label: 'ID', sortable: false },
        { key: 'gpa', label: 'GPA', sortable: false }
    ];
    
    const renderCell = (row, col) => {
        if (col.key === 'id') return `STU-${row.id.toString().padStart(3, '0')}`;
        return row[col.key];
    };
    
    return `
        <div class="page-container fade-in">
            <div class="page-header">
                <div>
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
                        <h1 class="page-title" style="margin: 0;">${course.code}: ${course.name}</h1>
                        ${window.Components.renderBadge(course.status, course.status === 'active' ? 'success' : 'warning')}
                    </div>
                </div>
                <button class="btn btn-outline" onclick="App.navigate('#/courses')">Back to Catalog</button>
            </div>
            
            <div class="grid grid-3" style="gap: 20px; margin-bottom: 24px;">
                <div class="card" style="padding: 20px;">
                    <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 5px;">Department & Semester</div>
                    <div style="font-weight: 600;">${course.department} - Sem ${course.semester}</div>
                </div>
                <div class="card" style="padding: 20px;">
                    <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 5px;">Credits</div>
                    <div style="font-weight: 600;">${course.credits} Credits</div>
                </div>
                <div class="card" style="padding: 20px;">
                    <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 5px;">Faculty</div>
                    <div style="font-weight: 600;">${faculty ? faculty.name : 'Unassigned'}</div>
                </div>
                <div class="card" style="padding: 20px;">
                    <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 5px;">Schedule</div>
                    <div style="font-weight: 600;">${course.schedule || 'TBD'}</div>
                </div>
                <div class="card" style="padding: 20px; grid-column: span 2;">
                    <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 5px;">Enrollment</div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <span style="font-weight: 600;">${course.enrolled} / ${course.capacity}</span>
                        <span style="font-size: 12px; color: var(--text-muted);">${Math.round((course.enrolled/course.capacity)*100)}% Full</span>
                    </div>
                    ${window.Components.renderProgressBar(Math.round((course.enrolled/course.capacity)*100), 'primary')}
                </div>
            </div>
            
            <div class="card" style="padding: 24px; margin-bottom: 24px;">
                <h3 style="margin-bottom: 15px;">Course Description</h3>
                <p style="line-height: 1.6; color: var(--text-light);">${course.description || 'No description available for this course.'}</p>
            </div>
            
            <div class="card">
                <div style="padding: 20px; border-bottom: 1px solid var(--border-color);">
                    <h3 style="margin: 0;">Enrolled Students</h3>
                </div>
                ${enrolledStudents.length > 0 ? 
                    window.Components.renderDataTable(columns, enrolledStudents, renderCell, 'course-students') :
                    window.Components.renderEmptyState('No students', 'No students match this course criteria.')
                }
            </div>
        </div>
    `;
};

Pages.departments = function() {
    const data = window.AppData.departments;
    
    return `
        <div class="page-container fade-in">
            <div class="page-header">
                <div>
                    <h1 class="page-title">Departments</h1>
                    <p class="page-subtitle">University departments overview</p>
                </div>
            </div>
            
            <div class="grid grid-2" style="gap: 24px;">
                ${data.map(dept => {
                    const studentCount = window.AppData.students.filter(s => s.department === dept.name).length;
                    const facultyCount = window.AppData.faculty.filter(f => f.department === dept.name).length;
                    const courseCount = window.AppData.courses.filter(c => c.department === dept.name).length;
                    
                    return `
                        <div class="card dept-card" style="overflow: hidden; cursor: pointer; display: flex; flex-direction: column;" onclick="App.state.filters.courses = { department: '${dept.name}' }; App.navigate('#/courses')">
                            <div style="height: 6px; background: ${dept.color}; width: 100%;"></div>
                            <div style="padding: 24px;">
                                <h2 style="margin-bottom: 5px; font-size: 24px;">${dept.name}</h2>
                                <p style="color: var(--text-muted); margin-bottom: 15px;">HOD: ${dept.headOfDepartment}</p>
                                
                                <p style="line-height: 1.5; color: var(--text-light); margin-bottom: 20px; min-height: 45px;">
                                    ${dept.description || 'Department description.'}
                                </p>
                                
                                <div class="grid grid-3" style="gap: 10px; background: var(--bg-alt); padding: 15px; border-radius: 8px;">
                                    <div style="text-align: center;">
                                        <div style="font-size: 18px; font-weight: 600; color: ${dept.color};">${studentCount}</div>
                                        <div style="font-size: 12px; color: var(--text-muted);">Students</div>
                                    </div>
                                    <div style="text-align: center; border-left: 1px solid var(--border-color); border-right: 1px solid var(--border-color);">
                                        <div style="font-size: 18px; font-weight: 600; color: ${dept.color};">${facultyCount}</div>
                                        <div style="font-size: 12px; color: var(--text-muted);">Faculty</div>
                                    </div>
                                    <div style="text-align: center;">
                                        <div style="font-size: 18px; font-weight: 600; color: ${dept.color};">${courseCount}</div>
                                        <div style="font-size: 12px; color: var(--text-muted);">Courses</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
};
