import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import rootSaga from './sagas';
import formActionSaga from 'redux-form-saga';

const sagaMiddleware = createSagaMiddleware();

if (!window.browserHistory) {
  window.browserHistory = createHistory();
}

const finalCreateStore = compose(
  applyMiddleware(sagaMiddleware, routerMiddleware(window.browserHistory)),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const store = finalCreateStore(reducer);

const sagas = [formActionSaga, rootSaga];
sagas.forEach(saga => sagaMiddleware.run(saga));

export default store;
