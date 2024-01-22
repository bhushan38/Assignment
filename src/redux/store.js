const {configureStore} = require('@reduxjs/toolkit');

import ProductReduer from './slices/ProductSlice';
import UserReduer from './slices/UserSlice';
export const store = configureStore({
  reducer: {
    user: UserReduer,
    product: ProductReduer,
  },
});
