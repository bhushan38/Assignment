const {configureStore} = require('@reduxjs/toolkit');

import UserReduer from './slices/UserSlice';
export const store = configureStore({
  reducer: {
    user: UserReduer,
  },
});
