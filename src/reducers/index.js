import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import projects from './projects';
import tasks from './tasks';
import people from './people';
import timesheets from './timesheets';
import user from './user';
import reports from './reports';


export default combineReducers({
  router: routerReducer,
  projects,
  tasks,
  people,
  timesheets,
  user,
  reports,
  form: formReducer,
});