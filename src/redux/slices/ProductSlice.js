const {createSlice} = require('@reduxjs/toolkit');

const ProductsSlice = createSlice({
  name: 'products',
  initialState: {
    data: [],
  },
  reducers: {
    addProducts(state, action) {
      let tempData = state.data;
      tempData.push(action.payload);
      state.data = tempData;
    },
  },
});
export const {addProducts} = ProductsSlice.actions;
export default ProductsSlice.reducer;
