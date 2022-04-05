import axios from "axios";
export const setLoaded = (payload) => ({
  type: "SET_LOADED",
  payload,
});
export const setPizzas = (items) => ({
  type: "SET_PIZZAS",
  payload: items,
});

export const fetchPizzas = (sortBy, category) => (dispatch) => {
  dispatch(setLoaded(false)); //dispatch работает с redux, иначе функция просто вернет объект
  //асинхронное действие в redux возможно бладгодаря библиотеке thunk
  axios
    .get(
      `/pizzas?${category !== null ? `category=${category}` : ""}&_sort=${
        sortBy.type
      }&_order=${sortBy.order}`
    )
    .then(({ data }) => {
      dispatch(setPizzas(data)); //сохранение пицц
    });
};
