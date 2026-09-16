window.Components = {
  // ==========================================
  // HELPER FUNCTIONS
  // ==========================================

  getInitials: function(name) {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  },

  getAvatarColor: function(name) {
    const colors = ['#4F46E5','#0EA5E9','#10B981','#F59E0B','#EF4444','#8B5CF6','#EC4899','#14B8A6','#F97316','#6366F1'];
    let hash = 0;
    for (let i = 0; i < (name || '').length; i++) {
      hash += name.charCodeAt(i);
    }
    return colors[hash % colors.length];
  },

  formatDate: function(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  },

  formatCurrency: function(amount) {
    if (amount === undefined || amount === null) return '';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  },

  getRelativeTime: function(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // seconds
    if (diff < 60) return diff + 's ago';
    if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
    if (diff < 2592000) return Math.floor(diff / 86400) + 'd ago';
    return this.formatDate(dateStr);
  },

  paginateData: function(data, page, perPage) {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return data.slice(start, end);
  },

  sortData: function(data, column, direction) {
    const sorted = [...data].sort((a, b) => {
      let valA = a[column];
      let valB = b[column];
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      if (valA < valB) return -1;
      if (valA > valB) return 1;
      return 0;
    });
    return direction === 'desc' ? sorted.reverse() : sorted;
  },

  filterData: function(data, filters) {
    return data.filter(item => {
      for (const key in filters) {
        if (filters[key] && item[key] !== filters[key]) {
          return false;
        }
      }
      return true;
    });
  },

  // ==========================================
  // UI COMPONENTS
  // ==========================================

  renderSidebar: function(activeRoute) {
    const navItems = [
      { route: '#/dashboard', label: 'Dashboard', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>' },
      { route: '#/students', label: 'Students', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>' },
      { route: '#/faculty', label: 'Faculty', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>' },
      { route: '#/courses', label: 'Courses', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>' },
      { route: '#/departments', label: 'Departments', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>' },
      { route: '#/attendance', label: 'Attendance', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M9 14l2 2 4-4"></path></svg>' },
      { route: '#/exams', label: 'Examinations', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>' },
      { route: '#/results', label: 'Results', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>' },
      { route: '#/fees', label: 'Fee Management', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>' },
      { route: '#/library', label: 'Library', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>' },
      { route: '#/announcements', label: 'Announcements', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>' }
    ];

    let itemsHtml = navItems.map(item => `
      <a href="${item.route}" class="sidebar-item ${activeRoute === item.route ? 'active' : ''}" onclick="window.App && App.navigate('${item.route}'); return false;">
        <span class="sidebar-icon">${item.icon}</span>
        <span class="sidebar-label">${item.label}</span>
      </a>
    `).join('');

    return `
      <div class="sidebar-overlay" onclick="document.body.classList.remove('sidebar-open')"></div>
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="logo">🎓</div>
          <h2>UniPortal</h2>
        </div>
        <nav class="sidebar-nav">
          ${itemsHtml}
        </nav>
        <div class="sidebar-footer">
          <button class="collapse-btn" onclick="document.body.classList.toggle('sidebar-collapsed')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
            <span class="sidebar-label">Collapse</span>
          </button>
        </div>
      </aside>
    `;
  },

  renderNavbar: function(title) {
    let unreadCount = 0;
    let notifsHtml = '<div class="empty-notifications">No new notifications</div>';
    
    if (window.AppData && window.AppData.notifications) {
      const unread = window.AppData.notifications.filter(n => !n.read);
      unreadCount = unread.length;
      if (window.AppData.notifications.length > 0) {
        notifsHtml = window.AppData.notifications.map(n => `
          <div class="notification-item ${n.read ? 'read' : 'unread'}">
            <div class="notification-content">
              <p>${n.message}</p>
              <span class="notification-time">${this.getRelativeTime(n.time)}</span>
            </div>
          </div>
        `).join('');
      }
    }

    return `
      <header class="navbar">
        <div class="navbar-left">
          <button class="mobile-menu-btn" onclick="document.body.classList.toggle('sidebar-open')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
          <h1 class="page-title">${title || 'Dashboard'}</h1>
        </div>
        <div class="navbar-right">
          <div class="navbar-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="Search...">
          </div>
          
          <button id="theme-toggle-btn" class="theme-toggle" onclick="window.App && App.toggleTheme()">
            <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          </button>

          <div class="notification-wrapper">
            <button class="notification-bell" onclick="document.getElementById('notif-panel').classList.toggle('show')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              ${unreadCount > 0 ? `<span class="notification-badge">${unreadCount}</span>` : ''}
            </button>
            <div id="notif-panel" class="notification-panel dropdown-menu">
              <div class="notification-header">
                <h3>Notifications</h3>
              </div>
              <div class="notification-list">
                ${notifsHtml}
              </div>
            </div>
          </div>

          <button class="user-avatar-btn">
            ${this.renderAvatar('Admin User', 'sm')}
            <span class="user-name">Admin</span>
          </button>
        </div>
      </header>
    `;
  },

  renderStatCard: function({icon, title, value, trend, trendUp, color}) {
    const trendIcon = trendUp ? '↑' : '↓';
    const trendClass = trendUp ? 'up' : 'down';
    return `
      <div class="stat-card glass-card">
        <div class="stat-header">
          <div class="stat-icon ${color || 'primary'}">${icon}</div>
          ${trend ? `<div class="stat-trend ${trendClass}">${trendIcon} ${trend}</div>` : ''}
        </div>
        <div class="stat-content">
          <div class="stat-label">${title}</div>
          <div class="stat-value">${value}</div>
        </div>
      </div>
    `;
  },

  renderDataTable: function({columns, data, tableId}) {
    if (!data || data.length === 0) {
      return this.renderEmptyState('No data available');
    }

    let sortConfig = window.App?.state?.sortConfig?.[tableId] || { key: null, direction: 'asc' };

    const headers = columns.map(col => {
      let sortIcon = '';
      if (col.sortable) {
        if (sortConfig.key === col.key) {
          sortIcon = sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
        } else {
          sortIcon = ' ↕'; // unsorted
        }
      }
      const sortAttr = col.sortable ? `onclick="window.App && App.handleSort('${tableId}', '${col.key}')"` : '';
      const cls = col.sortable ? 'class="sortable"' : '';
      return `<th ${cls} ${sortAttr}>${col.label}${sortIcon}</th>`;
    }).join('');

    const rows = data.map(row => {
      const cells = columns.map(col => {
        const val = row[col.key];
        const cellHtml = col.render ? col.render(val, row) : (val !== undefined && val !== null ? val : '');
        return `<td>${cellHtml}</td>`;
      }).join('');
      return `<tr>${cells}</tr>`;
    }).join('');

    return `
      <div class="table-container">
        <table class="data-table" id="${tableId}">
          <thead><tr>${headers}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
  },

  renderPagination: function({currentPage, totalPages, totalItems, itemsPerPage, pageId}) {
    if (totalPages <= 1) return '';

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    let pagesHtml = '';
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pagesHtml += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="window.App && App.handlePageChange('${pageId}', ${i})">${i}</button>`;
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pagesHtml += `<span class="page-ellipsis">...</span>`;
      }
    }

    return `
      <div class="pagination">
        <div class="pagination-info">Showing ${startItem}-${endItem} of ${totalItems}</div>
        <div class="pagination-controls">
          <button class="page-btn prev-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="window.App && App.handlePageChange('${pageId}', ${currentPage - 1})">Prev</button>
          ${pagesHtml}
          <button class="page-btn next-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="window.App && App.handlePageChange('${pageId}', ${currentPage + 1})">Next</button>
        </div>
      </div>
    `;
  },

  renderModal: function({id, title, content, size = 'md'}) {
    return `
      <div class="modal-overlay" id="${id}" onclick="if(event.target === this) { window.App && App.closeModal('${id}') }">
        <div class="modal modal-${size}">
          <div class="modal-header">
            <h3 class="modal-title">${title}</h3>
            <button class="modal-close" onclick="window.App && App.closeModal('${id}')">&times;</button>
          </div>
          <div class="modal-body">
            ${content}
          </div>
        </div>
      </div>
    `;
  },

  showToast: function(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = 'ℹ';
    if (type === 'success') icon = '✓';
    if (type === 'error') icon = '✕';
    if (type === 'warning') icon = '⚠';

    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-message">${message}</div>
      <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      if (document.body.contains(toast)) {
        toast.style.animation = 'fadeOut 0.3s forwards';
        setTimeout(() => toast.remove(), 300);
      }
    }, 4000);
  },

  renderCalendar: function(month, year, events = []) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const prevDays = new Date(year, month, 0).getDate();
    
    const today = new Date();
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;

    let daysHtml = '';
    
    // Prev month days
    for (let x = firstDayIndex; x > 0; x--) {
      daysHtml += `<div class="calendar-day other-month">${prevDays - x + 1}</div>`;
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = isCurrentMonth && i === today.getDate() ? 'today' : '';
      const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(i).padStart(2,'0')}`;
      const dayEvents = events.filter(e => e.date === dateStr);
      const hasEventClass = dayEvents.length > 0 ? 'has-event' : '';
      
      let eventsHtml = dayEvents.map(e => `<div class="calendar-event ${e.type}" title="${e.title}"></div>`).join('');

      daysHtml += `
        <div class="calendar-day ${isToday} ${hasEventClass}">
          <span class="day-number">${i}</span>
          <div class="event-dots">${eventsHtml}</div>
        </div>
      `;
    }

    // Next month days (pad to 42 cells)
    const totalCells = firstDayIndex + daysInMonth;
    let nextDays = 42 - totalCells;
    for (let j = 1; j <= nextDays; j++) {
      daysHtml += `<div class="calendar-day other-month">${j}</div>`;
    }

    return `
      <div class="calendar-widget">
        <div class="calendar-header">
          <button class="icon-btn" onclick="window.App && App.handleCalendarNav('prev')">&lt;</button>
          <h4>${months[month]} ${year}</h4>
          <button class="icon-btn" onclick="window.App && App.handleCalendarNav('next')">&gt;</button>
        </div>
        <div class="calendar-weekdays">
          <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
        </div>
        <div class="calendar-grid">
          ${daysHtml}
        </div>
      </div>
    `;
  },

  renderTabs: function(tabs, activeTab, tabGroupId) {
    const tabsHtml = tabs.map(tab => `
      <button class="tab-btn ${tab.id === activeTab ? 'active' : ''}" 
              onclick="window.App && App.handleTabChange('${tabGroupId}', '${tab.id}')">
        ${tab.label}
      </button>
    `).join('');

    return `
      <div class="tabs-container">
        <div class="tabs" id="${tabGroupId}">
          ${tabsHtml}
        </div>
      </div>
    `;
  },

  renderSearchBar: function(placeholder, id) {
    return `
      <div class="search-input-wrapper">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input type="text" id="${id}" placeholder="${placeholder}" oninput="window.App && App.handleSearch('${id}', this.value)">
      </div>
    `;
  },

  renderFilterDropdown: function(label, options, id, selectedValue) {
    const optsHtml = options.map(opt => `
      <option value="${opt.value}" ${opt.value === selectedValue ? 'selected' : ''}>${opt.label}</option>
    `).join('');

    return `
      <div class="filter-dropdown">
        <select id="${id}" onchange="window.App && App.handleFilter('${id}', this.value)">
          <option value="">All ${label}</option>
          ${optsHtml}
        </select>
      </div>
    `;
  },

  renderBadge: function(text, type) {
    let badgeClass = 'primary';
    const t = (type || text || '').toLowerCase();
    
    if (['paid', 'active', 'present', 'success'].includes(t)) badgeClass = 'success';
    else if (['pending', 'upcoming', 'late', 'warning'].includes(t)) badgeClass = 'warning';
    else if (['overdue', 'absent', 'inactive', 'danger'].includes(t)) badgeClass = 'danger';
    else if (['info', 'on-leave'].includes(t)) badgeClass = 'info';

    return `<span class="badge badge-${badgeClass}">${text}</span>`;
  },

  renderAvatar: function(name, size = 'md') {
    const initials = this.getInitials(name);
    const color = this.getAvatarColor(name);
    return `
      <div class="avatar avatar-${size}" style="background-color: ${color}; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold;">
        ${initials}
      </div>
    `;
  },

  renderSkeleton: function(type, count = 1) {
    let html = '';
    for (let i = 0; i < count; i++) {
      if (type === 'card') {
        html += `<div class="skeleton-card skeleton-anim"></div>`;
      } else if (type === 'table') {
        html += `<div class="skeleton-row skeleton-anim" style="height:40px; margin-bottom:8px;"></div>`;
      } else {
        html += `<div class="skeleton-text skeleton-anim" style="height:20px; margin-bottom:8px; width: ${80 - (i%3)*10}%;"></div>`;
      }
    }
    return html;
  },

  renderProfileCard: function({name, role, department, email, phone, avatar, stats = []}) {
    const avatarHtml = avatar ? `<img src="${avatar}" alt="${name}" class="profile-avatar">` : this.renderAvatar(name, 'xl');
    const statsHtml = stats.map(s => `
      <div class="profile-stat">
        <div class="stat-val">${s.value}</div>
        <div class="stat-lbl">${s.label}</div>
      </div>
    `).join('');

    return `
      <div class="profile-card glass-card">
        <div class="profile-header text-center">
          ${avatarHtml}
          <h3>${name}</h3>
          <p class="text-muted">${role} | ${department}</p>
        </div>
        <div class="profile-contact">
          <div class="contact-item">📧 ${email}</div>
          <div class="contact-item">📞 ${phone}</div>
        </div>
        ${stats.length > 0 ? `<div class="profile-stats-grid">${statsHtml}</div>` : ''}
      </div>
    `;
  },

  renderActivityItem: function({text, time, type = 'info', icon = '•'}) {
    return `
      <div class="activity-item">
        <div class="activity-icon bg-${type}">${icon}</div>
        <div class="activity-content">
          <p class="activity-text">${text}</p>
          <span class="activity-time">${this.getRelativeTime(time)}</span>
        </div>
      </div>
    `;
  },

  renderEmptyState: function(message, icon = '📭') {
    return `
      <div class="empty-state">
        <div class="empty-icon">${icon}</div>
        <p class="empty-message">${message}</p>
      </div>
    `;
  },

  renderProgressBar: function(value, max, color = 'primary') {
    const percent = Math.min(100, Math.max(0, (value / max) * 100));
    return `
      <div class="progress-bar">
        <div class="progress-fill bg-${color}" style="width: ${percent}%"></div>
      </div>
    `;
  },

  renderChart: function(canvasId, width = '100%', height = '300px') {
    return `
      <div class="chart-container" style="width: ${width}; height: ${height}; position: relative;">
        <canvas id="${canvasId}"></canvas>
      </div>
    `;
  }
};
