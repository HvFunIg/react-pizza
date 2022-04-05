const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};
/*сумма стоимостей всех пицц*/
const getTotalPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0);
const _get = (obj, path) => {
  /*разбиение на первое слово и все остальные*/
  const [firstKey, ...keys] = path.split(".");

  return keys.reduce((val, key) => {
    return val[key];
  }, obj[firstKey]);
};
const getTotalSum = (obj, path) => {
  return Object.values(obj).reduce((sum, obj) => {
    const value = _get(obj, path);
    return sum + value;
  }, 0);
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PIZZA_CART": {
      const currentPizzaItems = !state.items[action.payload.id] //если ничего нет, создай
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];
      const newItems = {
        ...state.items,
        /*[] для передачи динамического значения ключа*/
        /*зайди в старый state по ключу [] и впихни его в новый масссив, где будет новый state*/
        [action.payload.id]: {
          items: currentPizzaItems,
          totalPrice: getTotalPrice(currentPizzaItems),
        },
      };

      const totalCount = getTotalSum(newItems, "items.length");
      const totalPrice = getTotalSum(newItems, "totalPrice");
      return {
        ...state,
        items: newItems,
        /*Это один из способов создать пустой массив и впихнуть в него значения*/
        totalCount,
        totalPrice,
      };
    }

    case "REMOVE_CART_ITEM": {
      const newItems = {
        ...state.items,
      };
      const currentTotalPrice = newItems[action.payload].totalPrice;
      const currentTotalCount = newItems[action.payload].items.length;
      /*Тут delete сработает корректно, но если в скопированном объекте будут
       * другие объекты, то удалив их в копии, мы удалим их
       * и в оригинале */
      delete newItems[action.payload];
      return {
        ...state,
        items: newItems,
        totalPrice: state.totalPrice - currentTotalPrice,
        totalCount: state.totalCount - currentTotalCount,
      };
    }

    case "CLEAR_CART": {
      return {
        totalPrice: 0,
        totalCount: 0,
        items: {},
      };
    }

    case "PLUS_CART_ITEM": {
      const newObjItems = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0],
      ];
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };
      const totalCount = getTotalSum(newItems, "items.length");
      const totalPrice = getTotalSum(newItems, "totalPrice");
      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case "MINUS_CART_ITEM": {
      console.log(state.items[action.payload].items);
      const oldItems = state.items[action.payload].items;
      const newObjItems =
        oldItems.length > 1
          ? state.items[action.payload].items.slice(1)
          : oldItems;
      console.log(newObjItems);

      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };
      console.log(newItems);

      const totalCount = getTotalSum(newItems, "items.length");
      const totalPrice = getTotalSum(newItems, "totalPrice");
      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }
    default:
      return state;
  }
};
export default cart;
