import AsyncStorageService from "./AsyncStorageService";
import axios from "./AxiosService";

const { setData, removeData } = AsyncStorageService;

// register user.
const registerUser = async (userData) => {
  const response = await axios.post(`/register`, userData);

  return response.data;
};

// login user
const loginUser = async (loginDetails) => {
  const response = await axios.post(`/login`, loginDetails);

  return response.data;
};

// activate user:
const activateUser = async ({ id, code }) => {
  const response = await axios.put(`/user/${id}/activate`, { code });

  return response?.data;
};

// logout user
const logout = () => {
  removeData("user");
};

//

const AuthService = {
  loginUser,
  registerUser,
  logout,
  activateUser,
};

export default AuthService;
