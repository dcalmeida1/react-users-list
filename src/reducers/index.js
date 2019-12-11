const INITIAL_STATE = [];

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_INITIAL_STATE':
      return [...state, ...action.data].map(user => ({
        ...user,
        isChecked: false,
      }));
    case 'CHECK_SINGLE_USER':
      return state.map(user => {
        if (user.id === action.id) {
          return {
            ...user,
            isChecked: !user.isChecked,
          };
        }
        return user;
      });
    case 'CHECK_ALL_USERS':
      return state.map(user => ({ ...user, isChecked: action.isChecked }));
    case 'DELETE_USERS':
      return state.filter(user => user.isChecked === false);
    case 'DELETE_SINGLE_USER':
      return state.filter(user => user.id !== action.id);
    case 'SAVE_USER_CHANGES':
      return state.map(user => {
        if (user.id === action.id) {
          return {
            ...user,
            firstName: action.firstName,
            lastName: action.lastName,
          };
        }
        return { ...user };
      });
    default:
      return state;
  }
}
