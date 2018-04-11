import axios from "axios";

const register = data =>
  axios.post(`/api/register`, data.payload).then(res => res.data);

const login = data =>
  axios.post(`/api/login`, data.payload).then(res => res.data);

const forgotPassword = data =>
  axios.post(`/api/forgotPassword`, data.payload).then(res => res.data);

const resetPassword = (token, data) =>
  axios.post(`/api/resetPassword/${token}`, data).then(res => res.data);

const userInfo = () => 
  axios.get(`/api`).then(res => res.data);

const fetchUser = () => 
  axios.get(`/api/users`).then(res => res.data);
  
const logout = () => 
  axios.get(`/api/logout`).then(res => res.data);

const fetchProjects = () => 
  axios.get(`/api/projects`).then(res => res.data);

const addProject = data =>
  axios.post(`/api/projects`, data.payload).then(res => res.data);

const editProject = (projectId, data) =>
  axios.post(`/api/projects/${projectId}`, data).then(res => res.data);

const fetchTasks = projectId =>
  axios.get(`/api/${projectId}`).then(res => res.data);

const addTask = (projectId, data) =>
  axios.post(`/api/${projectId}`, data).then(res => res.data);

const editTask = (projectId, taskId, data) =>
  axios.post(`/api/${projectId}/${taskId}`, data).then(res => res.data);

const updateTimelog = (taskname, data) =>
  axios.post(`/api/task/${taskname}`, data).then(res => res.data);

const fetchPeople = () => 
  axios.get(`/api/people`).then(res => res.data);

const addPeople = data =>
  axios.post(`/api/people`, data.payload).then(res => res.data);

const editPeople = (peopleId, data) =>
  axios.post(`/api/people/${peopleId}`, data).then(res => res.data);

const fetchProjectData = timesheetId =>
  axios.get(`/api/projectData`).then(res => res.data);

const fetchTimesheets = date =>
  axios.get(`/api/timesheet?date=${date}`).then(res => res.data);

const addTimesheet = data =>
  axios.post(`/api/timesheet`, data.payload).then(res => res.data);

const editTimesheet = (timesheetIndex, timesheetId, data) =>
  axios.post(`/api/timesheet/${timesheetIndex}/${timesheetId}`, data).then(res => res.data);

const fetchReports = () => 
  axios.get(`/api/reports`).then(res => res.data);

export default {
  fetchProjects,
  addProject,
  editProject,
  fetchTasks,
  addTask,
  editTask,
  updateTimelog,
  fetchPeople,
  addPeople,
  editPeople,
  fetchTimesheets,
  fetchProjectData,
  addTimesheet,
  editTimesheet,
  register,
  login,
  userInfo,
  fetchUser,
  forgotPassword,
  resetPassword,
  logout,
  fetchReports
};
