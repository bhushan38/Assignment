const {configureStore} = require('@reduxjs/toolkit');

import UserReduer from './slices/userSlice';
export const store = configureStore({
  reducer: {
    user: UserReduer,
  },
});