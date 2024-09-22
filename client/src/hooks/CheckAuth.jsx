import instance from "./AxiosInstance";

let isAuthenticated = false;

const CheckAuth = async () => {
    try {
        const response = await instance.get('/check-auth');
        if (response.data.message === 'Authorized') {
          isAuthenticated = true;
          return true;
        } else {
          isAuthenticated = false;
          return false
        }
      } catch (error) {
        isAuthenticated = false;
        return false;
      }
}

export const getAuthStatus = () => isAuthenticated;

export default CheckAuth;