import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk"; //для корректной обработки анонимной функции/объекта в dispatch
import rootReducer from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // либо есть спец расширение, либо использовать встроенную функцию
const store = createStore(
  //объявляется middleware
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
//window.store = store;
export default store;
