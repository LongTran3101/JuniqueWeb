// src/utils/fakeAuth.ts

export const fakeAuthProvider = {
    isAuthenticated: false,
  
    login(callback: () => void) {
      // Giả lập delay giống API
      setTimeout(() => {
        fakeAuthProvider.isAuthenticated = true;
        callback();
      }, 500); // 0.5 giây delay
    },
  
    logout(callback: () => void) {
      setTimeout(() => {
        fakeAuthProvider.isAuthenticated = false;
        callback();
      }, 300); // 0.3 giây delay
    }
  };
  