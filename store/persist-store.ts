// "use client";
export const STORAGE_KEY = "redux_state";

export const saveState = (store) => {
  try {
    const serializedState = JSON.stringify(store.getState());
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (e) {
    console.log("error saving redux", e);
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.log("error loading redux", e);
    return undefined;
  }
};
