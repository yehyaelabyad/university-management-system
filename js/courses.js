// ══════════════════════════════════════════════════════════════
// js/courses.js — Curriculum Module
// ──────────────────────────────────────────────────────────────
// Implements:
//   US-06: Course Catalog (Admin) — add/edit/delete core & elective courses
//   US-07: Browse & Register (Student) — filter, register, prevent double-registration
//
// Owner: Omar Tamer (23P0096) — Scrum Master, Sprint 1
// Depends on globals from app.js / index.html:
//   getStore, setStore, openModal, closeModal, currentUser
// ══════════════════════════════════════════════════════════════


// ══════════════════════════════════════
// US-06: COURSE CATALOG (Admin)
// ══════════════════════════════════════
function renderCoursesAdmin(el) {
  const courses = getStore('courses', []);
  const core = courses.filter(c => c.type === 'Core');
  const elective = courses.filter(c => c.type === 'Elective');

  el.innerHTML = `
    <div class="page-header">
      <h1>Course Catalog</h1>
      <p>Define and organize the university's courses</p>
    </div>
    <div class="card">
      <div class="card-header">
        <h3>Core Courses (${core.length})</h3>
        <button class="btn btn-success btn-sm" onclick="openCourseModal()">+ Add Course</button>
      </div>
      <table>
        <tr><th>Code</th><th>Name</th><th>Credits</th><th>Dept</th><th>Actions</th></tr>
        ${core.map(c => `
          <tr>
            <td><strong>${c.code}</strong></td>
            <td>${c.name}</td>
            <td>${c.credits}</td>
            <td>${c.department}</td>
            <td class="actions">
              <button class="btn btn-secondary btn-sm" onclick="openCourseModal(${c.id})">Edit</button>
              <button class="btn btn-danger btn-sm" onclick="deleteCourse(${c.id})">Delete</button>
            </td>
          </tr>
        `).join('')}
      </table>
    </div>
    <div class="card">
      <div class="card-header"><h3>Elective Courses (${elective.length})</h3></div>
      <table>
        <tr><th>Code</th><th>Name</th><th>Credits</th><th>Dept</th><th>Actions</th></tr>
        ${elective.map(c => `
          <tr>
            <td><strong>${c.code}</strong></td>
            <td>${c.name}</td>
            <td>${c.credits}</td>
            <td>${c.department}</td>
            <td class="actions">
              <button class="btn btn-secondary btn-sm" onclick="openCourseModal(${c.id})">Edit</button>
              <button class="btn btn-danger btn-sm" onclick="deleteCourse(${c.id})">Delete</button>
            </td>
          </tr>
        `).join('')}
      </table>
    </div>
  `;
}

function openCourseModal(id) {
  const courses = getStore('courses', []);
  const c = id ? courses.find(x => x.id === id) : null;
  openModal(`
    <h2>${c ? 'Edit Course' : 'Add New Course'}</h2>
    <div class="form-group">
      <label>Course Code</label>
      <input id="cCode" value="${c ? c.code : ''}" placeholder="e.g. CS401">
    </div>
    <div class="form-group">
      <label>Course Name</label>
      <input id="cName" value="${c ? c.name : ''}" placeholder="e.g. Machine Learning">
    </div>
    <div class="form-group">
      <label>Type</label>
      <select id="cType">
        <option value="Core" ${c && c.type === 'Core' ? 'selected' : ''}>Core</option>
        <option value="Elective" ${c && c.type === 'Elective' ? 'selected' : ''}>Elective</option>
      </select>
    </div>
    <div class="form-group">
      <label>Credit Hours</label>
      <input type="number" id="cCredits" value="${c ? c.credits : ''}" placeholder="e.g. 3">
    </div>
    <div class="form-group">
      <label>Department</label>
      <input id="cDept" value="${c ? c.department : ''}" placeholder="e.g. CS">
    </div>
    <div class="modal-actions">
      <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
      <button class="btn btn-success" onclick="saveCourse(${id || 0})">Save</button>
    </div>
  `);
}

function saveCourse(id) {
  const courses = getStore('courses', []);
  const data = {
    code: document.getElementById('cCode').value.trim(),
    name: document.getElementById('cName').value.trim(),
    type: document.getElementById('cType').value,
    credits: parseInt(document.getElementById('cCredits').value),
    department: document.getElementById('cDept').value.trim()
  };

  if (!data.code || !data.name) return alert('Please fill in all fields.');

  if (id) {
    const idx = courses.findIndex(c => c.id === id);
    courses[idx] = { ...courses[idx], ...data };
  } else {
    courses.push({ id: Date.now(), ...data });
  }

  setStore('courses', courses);
  closeModal();
  renderCoursesAdmin(document.getElementById('mainContent'));
}

function deleteCourse(id) {
  if (!confirm('Remove this course from the catalog?')) return;
  setStore('courses', getStore('courses', []).filter(c => c.id !== id));
  renderCoursesAdmin(document.getElementById('mainContent'));
}

// ══════════════════════════════════════
// US-07: BROWSE & REGISTER (Student)
// ══════════════════════════════════════
function renderBrowseCourses(el) {
  const courses = getStore('courses', []);
  const regs = getStore('registrations', []);
  const myRegs = regs.filter(r => r.studentEmail === currentUser.email).map(r => r.courseId);

  el.innerHTML = `
    <div class="page-header">
      <h1>Browse Courses</h1>
      <p>View available courses and register for electives</p>
    </div>
    <div class="filter-bar">
      <select id="courseFilter" onchange="filterCourses()">
        <option value="all">All Courses</option>
        <option value="Core">Core Only</option>
        <option value="Elective">Elective Only</option>
      </select>
      <select id="deptFilter" onchange="filterCourses()">
        <option value="all">All Departments</option>
        ${[...new Set(courses.map(c => c.department))].map(d => `<option value="${d}">${d}</option>`).join('')}
      </select>
    </div>
    <div class="card">
      <table id="courseTable">
        <tr><th>Code</th><th>Name</th><th>Type</th><th>Credits</th><th>Dept</th><th>Status</th></tr>
        ${courses.map(c => `
          <tr>
            <td><strong>${c.code}</strong></td>
            <td>${c.name}</td>
            <td><span class="badge ${c.type === 'Core' ? 'badge-green' : 'badge-blue'}">${c.type}</span></td>
            <td>${c.credits}</td>
            <td>${c.department}</td>
            <td>
              ${myRegs.includes(c.id)
                ? '<span class="badge badge-green">✓ Registered</span>'
                : c.type === 'Elective'
                  ? `<button class="btn btn-success btn-sm" onclick="registerCourse(${c.id})">Register</button>`
                  : '<span class="badge badge-yellow">Core</span>'
              }
            </td>
          </tr>
        `).join('')}
      </table>
    </div>
  `;
}

function filterCourses() {
  const type = document.getElementById('courseFilter').value;
  const dept = document.getElementById('deptFilter').value;
  let courses = getStore('courses', []);
  if (type !== 'all') courses = courses.filter(c => c.type === type);
  if (dept !== 'all') courses = courses.filter(c => c.department === dept);
  const regs = getStore('registrations', []).filter(r => r.studentEmail === currentUser.email).map(r => r.courseId);

  document.getElementById('courseTable').innerHTML = `
    <tr><th>Code</th><th>Name</th><th>Type</th><th>Credits</th><th>Dept</th><th>Status</th></tr>
    ${courses.map(c => `
      <tr>
        <td><strong>${c.code}</strong></td>
        <td>${c.name}</td>
        <td><span class="badge ${c.type === 'Core' ? 'badge-green' : 'badge-blue'}">${c.type}</span></td>
        <td>${c.credits}</td>
        <td>${c.department}</td>
        <td>
          ${regs.includes(c.id)
            ? '<span class="badge badge-green">✓ Registered</span>'
            : c.type === 'Elective'
              ? `<button class="btn btn-success btn-sm" onclick="registerCourse(${c.id})">Register</button>`
              : '<span class="badge badge-yellow">Core</span>'
          }
        </td>
      </tr>
    `).join('')}
  `;
}

function registerCourse(courseId) {
  const regs = getStore('registrations', []);
  if (regs.find(r => r.studentEmail === currentUser.email && r.courseId === courseId)) {
    return alert('You are already registered for this course. Double registration is not allowed.');
  }
  regs.push({ studentEmail: currentUser.email, courseId });
  setStore('registrations', regs);
  alert('Successfully registered for the course!');
  renderBrowseCourses(document.getElementById('mainContent'));
}

