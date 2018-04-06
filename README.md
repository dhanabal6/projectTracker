# Project Tracker

This project based on Project Management Systems

# Project Install

```
git clone https://github.com/dhanabal6/projectTracker.git

cd <projectTracker>

npm install

```

# Project Run

```
npm run startDev

npm run server

```

- npm run startDev -> run client side React-Redux code
- npm run server -> run server side nodeJs code
- Both are run different ports (http://localhost:3000,http://localhost:3001)
- Authentication Logic using passportJs middleware for NodeJs
- In this project-tracker project using material-ui styles and icons
- Fornt End Development using ReactJs-Redux

# Project Document 

## Tasks

### Milestone 1:

1. Design Pages: Home, Projects, People, TimeSheet, Report
2. Add/Edit Project : (Project Name, Description, Add/Remove People)
3. Add/Edit Tasks : (Task Name, Description, Estimation Pts)
4. Add/Edit/Delete People: (Name, Designation, Profile Image, Skillset)
5. Add/Edit Timesheet: (Project Name, Task Name, Hours Spent, Task Completion in %)
6. View Reports: (Project Name, Task Count, Completed Task Count, Points Count, Completed Points Count, Project status in %)

### /projects

Table should have following fields: Name, Points, Completed Points, Edit, Manage Tasks

Create/Edit popup should have: Name, Description, Pick Team (List of users with a 'x' button to remove, A text email input and 'add' button to add new member)


### /:projectID


Table should have following fields: Name, Points, status (backlog, active, inprogress, complete, approved, reopen), Assigned To,  Edit/View, Comments

Create/Edit popup should have: Name, Description, Points, status, Assigned To, 

Comments (List comments, Add comments)


### api


### Redux flow notes for API calls.

1. Add a routine.
2. Add an endpoint at api.js
3. Write a saga to get data from api and also to dispatch updates.
4. Write reduces to update data, errors, fetching/posting state.
5. Trigger the request.

