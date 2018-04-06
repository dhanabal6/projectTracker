import { fetchProjects, addProject, editProject, fetchProjectData } from '../routines';
import { takeEvery, delay } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import api from '../api';
 
function* fetchProjectsSaga() {
  try {
    yield put(fetchProjects.request());
    const response = yield call(api.fetchProjects);
    yield call(delay, 2000);
    yield put(fetchProjects.success(response));
  } catch (error) {
    yield put(fetchProjects.failure(error.message));
  } finally {
    yield put(fetchProjects.fulfill());
  }
}

function* fetchProjectDataSaga(data) {
  try {
    yield put(fetchProjectData.request());
    const response = yield call(api.fetchProjectData.bind(null,data.payload));
    yield put(fetchProjectData.success(response));
  } catch (error) {
    yield put(fetchProjectData.failure(error.message));
  } finally {
    yield put(fetchProjectData.fulfill());
  }
}


function* addProjectSaga(data) {
  try {
    yield put(addProject.request());
    const response = yield call(api.addProject.bind(null, data));
    yield put(addProject.success(response));
    yield put(fetchProjects.trigger());
  } catch (error) {
    yield put(addProject.failure(error.message));
  } finally {
    yield put(addProject.fulfill());
  }
}

function* editProjectSaga(data) {
  try {
    yield put(editProject.request());
    const response = yield call(api.editProject.bind(null, data.payload.id, data.payload.data));
    yield put(editProject.success(response));
    yield put(fetchProjects.trigger());
  } catch (error) {
    yield put(editProject.failure(error.message));
  } finally {
    yield put(editProject.fulfill());
  }
}


export default [
  fork(takeEvery,fetchProjects.TRIGGER, fetchProjectsSaga),
  fork(takeEvery,fetchProjectData.TRIGGER, fetchProjectDataSaga),
  fork(takeEvery,addProject.TRIGGER, addProjectSaga),
  fork(takeEvery,editProject.TRIGGER, editProjectSaga),
]