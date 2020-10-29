const ADD_TO_CART = 'cart/ADD_TO_CART';
const REMOVE_ITEM = 'cart/REMOVE_ITEM';
const RESET_CART_LIST = 'cart/RESET_CART_LIST';
const INCREASE_COUNT = 'cart/INCREASE_COUNT';
const DECREASE_COUNT = 'cart/DECREASE_COUNT';
const SET_TOTAL = 'cart/SET_TOTAL';
const GET_ITEMS = 'cart/GET_ITEMS';

export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const removeItem = (items) => ({
  type: REMOVE_ITEM,
  payload: items,
});

export const resetCartList = () => ({
  type: RESET_CART_LIST,
});

export const increaseCount = (items) => ({
  type: INCREASE_COUNT,
  payload: items,
});

export const decreaseCount = (items) => ({
  type: DECREASE_COUNT,
  payload: items,
});

export const setTotal = () => ({
  type: SET_TOTAL,
});

export const getItems = (items) => ({
  type: GET_ITEMS,
  payload: items,
});

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  items: [],
};

const cart = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART:
      return updateItems(state, payload)
    case REMOVE_ITEM:
      return updateItems(state, payload)
    case RESET_CART_LIST:
      return {
        ...state,
        totalPrice: 0,
        totalCount: 0,
        items: [],
      };
    case INCREASE_COUNT:
      return updateItems(state, payload)
    case DECREASE_COUNT:
      return updateItems(state, payload)
    case GET_ITEMS:
      return updateItems(state, payload)
    default:
      return state;
  }
};

const updateItems = (state, payload) => {
  const { items } = state;
  const isArray = Array.isArray(payload)

  return isArray ? {
      ...state,
      items: [...payload],
      totalCount: payload.reduce((acc, { count }) => acc + count, 0),
      totalPrice: payload.reduce(
        (acc, { count, price }) => acc + count * price,
        0
      ),
    }
    : {
      ...state,
      items: checkCartItems(items, payload),
      totalCount: state.totalCount + 1    
    } 
}

const checkCartItems = (items, payload) => {
  const isAddedToCart = items.find((item) => item.id === payload.id);
  const AddedItem = (item) =>
    item.id === payload.id ? { ...item, count: item.count + 1 } : item;

  return isAddedToCart ? items.map(AddedItem) : [...items, payload];
};

export default cart;
