const { configureStore } = require("@reduxjs/toolkit");
const { userSlice } = require("./userSlice");


const loadState = () => {
    try {
      const serializedState = localStorage.getItem("reduxState");
      if (serializedState === null) return undefined;
      return JSON.parse(serializedState);
    } catch (e) {
      return undefined;
    }
  };

  const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("reduxState", serializedState);
    } catch (e) {
      // Ignore write errors
    }
  };

const store=configureStore({
    reducer:{
        user:userSlice.reducer
    },
    preloadedState: loadState(),
})

store.subscribe(() => {
    saveState(store.getState());
  });
  

export  {store}