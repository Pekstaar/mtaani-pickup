import AsyncStorageService from "./AsyncStorageService";
import axios from "./AxiosService";

const { setData, removeData } = AsyncStorageService;

// register user.
const registerUser = async (userData) => {
  const response = await axios.post(`/register`, userData);

  //   if (response.data) {
  //     AsyncStorageService.setData("user", JSON.stringify(response?.data));
  //   }

  return response.data;

  //   console.log(userData);
};

// login user
const loginUser = async (loginDetails) => {
  const response = await axios.post(`/login`, loginDetails);

  if (response.data) {
    setData("user", JSON.stringify(response?.data));
  }

  return response.data;
};

// logout user
const logout = () => {
  removeData("user");
};

const AuthService = {
  loginUser,
  registerUser,
  logout,
};

export default AuthService;
