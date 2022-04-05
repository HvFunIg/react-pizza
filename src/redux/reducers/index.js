import { combineReducers } from "redux";
import filters from "./filters";
import pizzas from "./pizzas";
import cart from "./cart";

const rootReducer = combineReducers({
  /*благодаря JS6, можно не писать filters:filters*/
  filters,
  pizzas,
  cart,
});
export default rootReducer;
