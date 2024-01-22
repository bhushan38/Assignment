const {createSlice} = require('@reduxjs/toolkit');

const ProductsSlice = createSlice({
  name: 'products',
  initialState: {
    data: [],
    loaded: false,
    pageNumber: 0,
    lastLodedPageNumber: -1,
  },
  reducers: {
    addProducts(state, action) {
      let tempData = state.data;
      tempData.push(...action.payload);
      state.data = tempData;
    },
    setLoaded(state, action) {
      state.loaded = action.payload;
    },
    setPagenumber(state, action) {
      state.pageNumber = action.payload;
    },
    setLastPageLoaded(state, action) {
      state.lastLodedPageNumber = action.payload;
    },
  },
});
export const {addProducts, setLoaded,setPagenumber,setLastPageLoaded} = ProductsSlice.actions;
export default ProductsSlice.reducer;
