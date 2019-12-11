export function setInitialState(data) {
  return {
    type: 'SET_INITIAL_STATE',
    data,
  };
}

export function checkSingleUser(id) {
  return {
    type: 'CHECK_SINGLE_USER',
    id,
  };
}

export function checkAllUsers(e) {
  return {
    type: 'CHECK_ALL_USERS',
    isChecked: e.target.checked,
  };
}

export function deleteSingleUser(id) {
  return {
    type: 'DELETE_SINGLE_USER',
    id,
  };
}

export function deleteUsers() {
  return {
    type: 'DELETE_USERS',
  };
}

export function saveChanges(id, firstName, lastName) {
  return {
    type: 'SAVE_USER_CHANGES',
    id,
    firstName,
    lastName,
  };
}
