import {createSlice} from '@reduxjs/toolkit';

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    isLoading: false,
  },
  reducers: {
    addUserDetails(state, action) {
      console.log("action.payload::"+action.payload);
      state.data = action.payload;
    },
  },
});
export const {addUserDetails} = UserSlice.actions;
export default UserSlice.reducer;
