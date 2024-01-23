import {createSlice} from '@reduxjs/toolkit';

/* 
This reducer is use for storing user profile data. 
*/
const UserSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    isLoading: false,
  },
  reducers: {
    addUserDetails(state, action) {
      state.data = action.payload;
    },
  },
});
export const {addUserDetails} = UserSlice.actions;
export default UserSlice.reducer;
