import { fetchTasks, addTask, editTask, updateTimelog } from '../routines';
import { takeEvery, delay } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import api from '../api';
 
function* fetchTasksSaga(data) {
  try {
    yield put(fetchTasks.request());
    const response = yield call(api.fetchTasks.bind(null,data.payload));
    yield call(delay, 2000);
    yield put(fetchTasks.success(response));
  } catch (error) {
    yield put(fetchTasks.failure(error.message));
  } finally {
    yield put(fetchTasks.fulfill());
  }
}

function* addTaskSaga(data) {
  try {
    yield put(addTask.request());
    const response = yield call(api.addTask.bind(null, data.payload.projectId, data.payload.data));
    yield put(addTask.success(response));
    yield put(fetchTasks.trigger(data.payload.projectId));
  } catch (error) {
    yield put(addTask.failure(error.message));
  } finally {
    yield put(addTask.fulfill());
  }
}

function* editTaskSaga(data) {
  try {
    yield put(editTask.request());
    const response = yield call(api.editTask.bind(null, data.payload.projectId, data.payload.id, data.payload.data));
    yield put(editTask.success(response));
    yield put(fetchTasks.trigger(data.payload.projectId));
  } catch (error) {
    yield put(editTask.failure(error.message));
  } finally {
    yield put(editTask.fulfill());
  }
}

function* updateTimelogSaga(data) {
  try {
    yield put(updateTimelog.request());
    const response = yield call(api.updateTimelog.bind(null, data.payload.taskname, data.payload.logData));
    yield put(updateTimelog.success(response));
  } catch (error) {
    yield put(updateTimelog.failure(error.message));
  } finally {
    yield put(updateTimelog.fulfill());
  }
}

export default [
  fork(takeEvery,fetchTasks.TRIGGER, fetchTasksSaga),
  fork(takeEvery,addTask.TRIGGER, addTaskSaga),
  fork(takeEvery,editTask.TRIGGER, editTaskSaga),
  fork(takeEvery,updateTimelog.TRIGGER, updateTimelogSaga),
]