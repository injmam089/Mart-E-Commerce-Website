/* ===================================================================
   UNIVERSITY PORTAL - App Controller (Router, State, Theme, Init)
   =================================================================== */

(function () {
  'use strict';

  // ─── State Management ──────────────────────────────────────────────
  const state = {
    theme: localStorage.getItem('theme') || 'light',
    sidebarCollapsed: false,
    sidebarMobileOpen: false,
    currentRoute: '',
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',

    // Search queries per page
    searchQueries: {
      students: '',
      faculty: '',
      courses: '',
      attendance: '',
      exams: '',
      results: '',
      fees: '',
      library: '',
      announcements: ''
    },

    // Filters per page
    filters: {
      students: { department: '', semester: '', status: '' },
      faculty: { department: '' },
      courses: { department: '', semester: '', status: '' },
      attendance: { status: '', date: '' },
      exams: { type: '', department: '' },
      results: { semester: '', grade: '' },
      fees: { status: '', type: '' },
      library: { category: '' }
    },

    // Sort configuration per table
    sortConfig: {
      students: { column: '', direction: 'asc' },
      faculty: { column: '', direction: 'asc' },
      courses: { column: '', direction: 'asc' },
      attendance: { column: '', direction: 'asc' },
      exams: { column: '', direction: 'asc' },
      results: { column: '', direction: 'asc' },
      fees: { column: '', direction: 'asc' }
    },

    // Current pagination page per page
    currentPages: {
      students: 1,
      faculty: 1,
      attendance: 1,
      exams: 1,
      results: 1,
      fees: 1,
      issuedBooks: 1
    },

    itemsPerPage: 10,

    // Active tabs per tabbed section
    activeTabs: {
      studentProfile: 'personal',
      library: 'catalog',
      announcements: 'news',
      fees: 'overview'
    },

    // View mode for course catalog
    viewMode: 'grid',

    // Calendar state
    calendarMonth: new Date().getMonth(),
    calendarYear: new Date().getFullYear()
  };

  // ─── Route Definitions ─────────────────────────────────────────────
  const routes = {
    '#/login': { page: 'login', title: 'Login', auth: false },
    '#/forgot-password': { page: 'forgotPassword', title: 'Forgot Password', auth: false },
    '#/reset-password': { page: 'resetPassword', title: 'Reset Password', auth: false },
    '#/dashboard': { page: 'dashboard', title: 'Dashboard', auth: true },
    '#/students': { page: 'studentList', title: 'Students', auth: true },
    '#/students/add': { page: 'studentForm', title: 'Add Student', auth: true },
    '#/faculty': { page: 'facultyList', title: 'Faculty', auth: true },
    '#/courses': { page: 'courseCatalog', title: 'Courses', auth: true },
    '#/departments': { page: 'departments', title: 'Departments', auth: true },
    '#/attendance': { page: 'attendance', title: 'Attendance', auth: true },
    '#/exams': { page: 'examSchedule', title: 'Examinations', auth: true },
    '#/results': { page: 'results', title: 'Results', auth: true },
    '#/fees': { page: 'fees', title: 'Fee Management', auth: true },
    '#/library': { page: 'library', title: 'Library', auth: true },
    '#/announcements': { page: 'announcements', title: 'Announcements', auth: true }
  };

  // Route patterns for dynamic routes (with parameters)
  const dynamicRoutes = [
    { pattern: /^#\/students\/profile\/(\d+)$/, page: 'studentProfile', title: 'Student Profile', auth: true },
    { pattern: /^#\/students\/edit\/(\d+)$/, page: 'studentForm', title: 'Edit Student', auth: true },
    { pattern: /^#\/faculty\/profile\/(\d+)$/, page: 'facultyProfile', title: 'Faculty Profile', auth: true },
    { pattern: /^#\/courses\/(\d+)$/, page: 'courseDetails', title: 'Course Details', auth: true }
  ];

  // ─── Router ────────────────────────────────────────────────────────
  function handleRoute() {
    const hash = window.location.hash || '#/login';
    state.currentRoute = hash;

    // Check static routes first
    let routeConfig = routes[hash];
    let params = [];

    // Check dynamic routes if no static match
    if (!routeConfig) {
      for (const dr of dynamicRoutes) {
        const match = hash.match(dr.pattern);
        if (match) {
          routeConfig = dr;
          params = match.slice(1);
          break;
        }
      }
    }

    // Default to login/dashboard
    if (!routeConfig) {
      window.location.hash = state.isLoggedIn ? '#/dashboard' : '#/login';
      return;
    }

    // Auth guard
    if (routeConfig.auth && !state.isLoggedIn) {
      window.location.hash = '#/login';
      return;
    }
    if (!routeConfig.auth && state.isLoggedIn && hash !== '#/login') {
      // Allow access to forgot/reset even if logged in
    }

    // Update page title
    document.title = `${routeConfig.title} | UniPortal`;

    // Get page content
    const pageFn = Pages[routeConfig.page];
    if (!pageFn) {
      console.error(`Page function Pages.${routeConfig.page} not found`);
      return;
    }

    const isAuthPage = !routeConfig.auth;
    const appContainer = document.getElementById('app');

    if (isAuthPage) {
      // Auth pages render without sidebar/navbar
      appContainer.innerHTML = pageFn(...params);
    } else {
      // Main app pages with sidebar and navbar
      const sidebarHTML = Components.renderSidebar(hash);
      const navbarHTML = Components.renderNavbar(routeConfig.title);
      const pageHTML = pageFn(...params);

      appContainer.innerHTML = `
        <div class="app-container">
          ${sidebarHTML}
          <div class="main-content" id="main-content">
            ${navbarHTML}
            ${pageHTML}
          </div>
        </div>
      `;

      // Apply sidebar collapsed state
      if (state.sidebarCollapsed) {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) sidebar.classList.add('collapsed');
      }
    }

    // Run page init function if exists (for charts etc.)
    const initFnName = 'init' + routeConfig.page.charAt(0).toUpperCase() + routeConfig.page.slice(1);
    if (Pages[initFnName]) {
      // Small delay to ensure DOM is ready
      requestAnimationFrame(() => {
        Pages[initFnName](...params);
      });
    }

    // Scroll to top
    window.scrollTo(0, 0);

    // Close mobile sidebar after navigation
    state.sidebarMobileOpen = false;
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (sidebar) sidebar.classList.remove('mobile-open');
    if (overlay) overlay.classList.remove('active');
  }

  // ─── Navigation ────────────────────────────────────────────────────
  function navigate(route) {
    window.location.hash = route;
  }

  // ─── Theme ─────────────────────────────────────────────────────────
  function initTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
  }

  function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('theme', state.theme);

    // Update theme toggle icon
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) {
      btn.innerHTML = state.theme === 'light'
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
    }

    Components.showToast(`Switched to ${state.theme} mode`, 'info');
  }

  // ─── Sidebar ───────────────────────────────────────────────────────
  function toggleSidebar() {
    // On mobile, toggle mobile-open
    if (window.innerWidth <= 1024) {
      state.sidebarMobileOpen = !state.sidebarMobileOpen;
      const sidebar = document.querySelector('.sidebar');
      const overlay = document.querySelector('.sidebar-overlay');
      if (sidebar) sidebar.classList.toggle('mobile-open', state.sidebarMobileOpen);
      if (overlay) overlay.classList.toggle('active', state.sidebarMobileOpen);
    } else {
      // On desktop, toggle collapsed
      state.sidebarCollapsed = !state.sidebarCollapsed;
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) sidebar.classList.toggle('collapsed', state.sidebarCollapsed);
      // Update main content margin
      const mainContent = document.querySelector('.main-content');
      if (mainContent) {
        mainContent.style.marginLeft = state.sidebarCollapsed
          ? 'var(--sidebar-collapsed)'
          : 'var(--sidebar-width)';
      }
    }
  }

  function closeMobileSidebar() {
    state.sidebarMobileOpen = false;
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (sidebar) sidebar.classList.remove('mobile-open');
    if (overlay) overlay.classList.remove('active');
  }

  // ─── Auth ──────────────────────────────────────────────────────────
  function handleLogin(e) {
    e.preventDefault();
    state.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
    Components.showToast('Welcome back, Admin!', 'success');
    setTimeout(() => navigate('#/dashboard'), 300);
  }

  function handleLogout() {
    state.isLoggedIn = false;
    localStorage.removeItem('isLoggedIn');
    Components.showToast('Logged out successfully', 'info');
    navigate('#/login');
  }

  function handleForgotPassword(e) {
    e.preventDefault();
    Components.showToast('Password reset link sent to your email!', 'success');
  }

  function handleResetPassword(e) {
    e.preventDefault();
    Components.showToast('Password reset successfully!', 'success');
    setTimeout(() => navigate('#/login'), 1000);
  }

  // ─── Search Handler ────────────────────────────────────────────────
  function handleSearch(pageId, value) {
    state.searchQueries[pageId] = value.toLowerCase();
    state.currentPages[pageId] = 1; // Reset to first page on search
    handleRoute(); // Re-render the page
  }

  // ─── Filter Handler ───────────────────────────────────────────────
  function handleFilter(filterId, value) {
    // filterId format: 'page-filterKey' e.g., 'students-department'
    const parts = filterId.split('-');
    const page = parts[0];
    const filterKey = parts.slice(1).join('-');

    if (state.filters[page]) {
      state.filters[page][filterKey] = value;
      state.currentPages[page] = 1; // Reset pagination
      handleRoute(); // Re-render
    }
  }

  // ─── Sort Handler ─────────────────────────────────────────────────
  function handleSort(tableId, column) {
    if (!state.sortConfig[tableId]) {
      state.sortConfig[tableId] = { column: '', direction: 'asc' };
    }

    const current = state.sortConfig[tableId];
    if (current.column === column) {
      // Toggle direction
      current.direction = current.direction === 'asc' ? 'desc' : 'asc';
    } else {
      current.column = column;
      current.direction = 'asc';
    }

    handleRoute(); // Re-render
  }

  // ─── Pagination Handler ───────────────────────────────────────────
  function handlePageChange(pageId, pageNum) {
    state.currentPages[pageId] = pageNum;
    handleRoute(); // Re-render
  }

  // ─── Tab Handler ──────────────────────────────────────────────────
  function handleTabChange(tabGroupId, tabId) {
    state.activeTabs[tabGroupId] = tabId;

    // Update active tab UI without full re-render
    const tabContainer = document.querySelector(`[data-tab-group="${tabGroupId}"]`);
    if (tabContainer) {
      // Update tab buttons
      tabContainer.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tabId === tabId);
      });
    }

    // Update tab panels
    document.querySelectorAll(`[data-tab-group-content="${tabGroupId}"] .tab-panel`).forEach(panel => {
      panel.classList.toggle('active', panel.id === `tab-${tabId}`);
    });

    // Run init functions for tabs that have charts
    if (tabGroupId === 'fees' && tabId === 'overview' && Pages.initFees) {
      requestAnimationFrame(() => Pages.initFees());
    }
  }

  // ─── Calendar Navigation ──────────────────────────────────────────
  function handleCalendarNav(direction) {
    if (direction === 'prev') {
      state.calendarMonth--;
      if (state.calendarMonth < 0) {
        state.calendarMonth = 11;
        state.calendarYear--;
      }
    } else {
      state.calendarMonth++;
      if (state.calendarMonth > 11) {
        state.calendarMonth = 0;
        state.calendarYear++;
      }
    }
    handleRoute(); // Re-render
  }

  // ─── Modal Handler ────────────────────────────────────────────────
  function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // ─── Notification Panel ───────────────────────────────────────────
  function toggleNotifications() {
    const panel = document.querySelector('.notification-panel');
    if (panel) {
      panel.classList.toggle('active');
    }
  }

  // ─── Export Data (dummy) ──────────────────────────────────────────
  function exportData(type) {
    Components.showToast(`Exporting ${type} data...`, 'info');
    setTimeout(() => {
      Components.showToast(`${type} data exported successfully!`, 'success');
    }, 1500);
  }

  // ─── View Mode Toggle ────────────────────────────────────────────
  function setViewMode(mode) {
    state.viewMode = mode;
    handleRoute();
  }

  // ─── Password Visibility Toggle ───────────────────────────────────
  function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
      input.type = input.type === 'password' ? 'text' : 'password';
    }
  }

  // ─── Password Strength ───────────────────────────────────────────
  function checkPasswordStrength(value) {
    const fill = document.querySelector('.password-strength-fill');
    const text = document.getElementById('password-strength-text');
    if (!fill) return;

    let strength = 'weak';
    let score = 0;

    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    if (score >= 4) strength = 'strong';
    else if (score >= 2) strength = 'medium';

    fill.className = 'password-strength-fill ' + strength;
    if (text) text.textContent = strength.charAt(0).toUpperCase() + strength.slice(1);
  }

  // ─── Toast Shorthand ─────────────────────────────────────────────
  function showToast(message, type) {
    Components.showToast(message, type || 'info');
  }

  // ─── Close Notifications on Outside Click ─────────────────────────
  function handleDocumentClick(e) {
    // Close notification panel if clicking outside
    const panel = document.querySelector('.notification-panel');
    const bell = document.querySelector('.notification-bell');
    if (panel && panel.classList.contains('active')) {
      if (!panel.contains(e.target) && !bell.contains(e.target)) {
        panel.classList.remove('active');
      }
    }
  }

  // ─── Initialize App ──────────────────────────────────────────────
  function init() {
    // Set theme
    initTheme();

    // Listen for hash changes
    window.addEventListener('hashchange', handleRoute);

    // Listen for clicks to close panels
    document.addEventListener('click', handleDocumentClick);

    // Handle window resize for sidebar
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) {
        state.sidebarMobileOpen = false;
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        if (sidebar) sidebar.classList.remove('mobile-open');
        if (overlay) overlay.classList.remove('active');
      }
    });

    // Set initial route
    if (!window.location.hash) {
      window.location.hash = state.isLoggedIn ? '#/dashboard' : '#/login';
    } else {
      handleRoute();
    }
  }

  // ─── Expose Global API ────────────────────────────────────────────
  window.App = {
    state: state,
    navigate: navigate,
    toggleTheme: toggleTheme,
    toggleSidebar: toggleSidebar,
    closeMobileSidebar: closeMobileSidebar,
    handleLogin: handleLogin,
    handleLogout: handleLogout,
    handleForgotPassword: handleForgotPassword,
    handleResetPassword: handleResetPassword,
    handleSearch: handleSearch,
    handleFilter: handleFilter,
    handleSort: handleSort,
    handlePageChange: handlePageChange,
    handleTabChange: handleTabChange,
    handleCalendarNav: handleCalendarNav,
    openModal: openModal,
    closeModal: closeModal,
    toggleNotifications: toggleNotifications,
    exportData: exportData,
    setViewMode: setViewMode,
    togglePasswordVisibility: togglePasswordVisibility,
    checkPasswordStrength: checkPasswordStrength,
    showToast: showToast,
    handleRoute: handleRoute,
    init: init
  };

  // ─── Start App When DOM is Ready ──────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
