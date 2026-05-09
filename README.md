# University Management System (UMS)

A web-based University Management System built as part of CSE342 — Agile Software Engineering course project.

## Team Members

- **Yehia Mohamed** (23P0067) — Product Owner (Sprint 1)
- **Omar Tamer** (23P0096) — Scrum Master (Sprint 1)
- **Saeed Mohamed** (23P0255) — Developer (Sprint 1)

Roles rotate every sprint per course instructions.

## About

The UMS brings together the university's main processes — managing facilities, courses, staff, and communication — into one platform. This project follows the Scrum framework and is developed across multiple sprints.

## Sprint 1 Features (MVP)

- **User Authentication** (US-18) — Login with role-based access for Admin, Professor, Student
- **Room Management** (US-01) — Admin can add, edit, delete classroom and lab records
- **Room Booking** (US-02) — Professors can view availability and book rooms by date/time
- **Student Records** (US-04) — Admin can manage student data (CRUD)
- **Course Catalog** (US-06) — Admin defines core and elective courses
- **Course Registration** (US-07) — Students can browse and register for electives
- **Material Upload** (US-08) — Professors can upload course materials
- **Grade Viewing** (US-10) — Students can view grades and feedback per assessment
- **Staff Directory** (US-11) — Centralized directory of professors and TAs
- **Announcements** (US-17) — Admin posts university-wide announcements

## Tech Stack

- HTML5, CSS3, JavaScript (Vanilla)
- LocalStorage for data persistence
- No external frameworks or backend required

## How to Run

1. Clone the repository:
   ```
   git clone https://github.com/yehyaelabyad/university-management-system.git
   ```
2. Open `index.html` in any modern web browser.

That's it — no build step, no server, no installation.

## Demo Accounts

| Role      | Email                     | Password    |
|-----------|---------------------------|-------------|
| Admin     | admin@university.edu      | admin123    |
| Professor | prof@university.edu       | prof123     |
| Student   | student@university.edu    | student123  |

## Project Structure

```
university-management-system/
├── index.html                       # Main application shell + 8 user stories
├── js/
│   └── courses.js                   # Curriculum module (US-06 + US-07)
├── README.md                        # This file
├── CONTRIBUTING.md                  # Team workflow and DoD
└── docs/
    ├── Phase1_Submission.pdf        # Phase 1 documentation
    ├── Phase2_Submission.docx       # Phase 2 documentation
    └── Sprint1_Retrospective.md     # Sprint 1 retrospective notes
```

## Jira Board

[UMS Jira Board](https://yehyaelabyad.atlassian.net/jira/software/projects/UMS/boards/34)

## Documentation

- [Phase 1 Submission (Sprint Planning + Backlog)](docs/Phase1_Submission.pdf)
- [Phase 2 Submission (MVP + Meeting Minutes + Retrospective)](docs/Phase2_Submission.docx)
- [Sprint 1 Retrospective Notes](docs/Sprint1_Retrospective.md)
- [Contributing Guide / Team Workflow](CONTRIBUTING.md)

## Course

CSE342 — Agile Software Engineering
Instructor: Dr. Mohamed H. ElGazzar
Date: May 2026
