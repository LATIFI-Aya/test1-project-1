import { createSlice } from '@reduxjs/toolkit';

// Try to load initial state from localStorage
const getInitialState = () => {
  try {
    // Check localStorage for existing admin token
    const adminToken = localStorage.getItem('adminToken');
    const adminUserStr = localStorage.getItem('adminUser');
    
    if (adminToken && adminUserStr) {
      try {
        const adminUser = JSON.parse(adminUserStr);
        return {
          user: adminUser,
          token: adminToken,
          isAdmin: adminUser.role === 'admin'
        };
      } catch (e) {
        console.error("Failed to parse adminUser from localStorage:", e);
      }
    }
  } catch (e) {
    console.error("Error accessing localStorage:", e);
  }
  
  // Default initial state if nothing in localStorage
  return {
    user: null,
    token: null,
    isAdmin: false
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    setLogin: (state, action) => {
      console.log("Setting login state:", action.payload);
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAdmin = action.payload.isAdmin || false;
      
      // Sync to localStorage
      try {
        localStorage.setItem('adminToken', action.payload.token);
        localStorage.setItem('adminUser', JSON.stringify(action.payload.user));
      } catch (e) {
        console.error("Failed to save auth state to localStorage:", e);
      }
    },
    setLogout: (state) => {
      console.log("Logging out, clearing auth state");
      state.user = null;
      state.token = null;
      state.isAdmin = false;
      
      // Clear localStorage
      try {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
      } catch (e) {
        console.error("Failed to clear localStorage:", e);
      }
    }
  }
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;