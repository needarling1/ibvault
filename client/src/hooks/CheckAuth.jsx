import instance from "./AxiosInstance";

const CheckAuth = async () => {
    try {
        const response = await instance.get('/api/check-auth');
        if (response.data.message === 'Authorized') {
          return true;
        } else {
          return false
        }
      } catch (error) {
        return false;
      }
}

export default CheckAuth;