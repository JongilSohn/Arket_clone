const LOGGED_IN = 'login/LOGGED_IN';
const LOGGED_OUT = 'login/LOG_OUT';

export const logIn = () => ({
  type: LOGGED_IN,
});

export const logOut = () => ({
  type: LOGGED_OUT,
});

const initialState = true;

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return true;
    case LOGGED_OUT:
      return false;
    default:
      return state;
  }
};

export default login;
