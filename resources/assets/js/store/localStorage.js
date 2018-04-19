export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("saelosState");

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const token = localStorage.getItem("access_token");

    if (token) {
      const serializedState = JSON.stringify(state);

      localStorage.setItem("saelosState", serializedState);
    }
  } catch (err) {
    // ignore
  }
};

export const deleteState = () => {
  try {
    localStorage.removeItem("saelosState");
    localStorage.removeItem("access_token");
  } catch (err) {
    // ignore
  }
};
