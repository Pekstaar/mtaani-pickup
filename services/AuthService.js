import AsyncStorageService from './AsyncStorageService';
import axios from './AxiosService';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';

const {setData, removeData} = AsyncStorageService;

// register user.
const registerUser = async userData => {
  const response = await axios.post(`/register`, userData);

  return response.data;
};

// login user
const loginUser = async loginDetails => {
  const response = await axios.post(`/login`, loginDetails);

  await setData('user', JSON.stringify(response?.data));

  return response.data;
};

// social login
const authenticateUserSocially = async loginDetails => {
  const response = await axios.post(`/social-login`, loginDetails);

  // await setData('user', JSON.stringify(response?.data));

  return response;
};

// update user
const updateUser = async loginDetails => {
  const response = await axios.put(`/update-user`, loginDetails);

  // await setData('user', JSON.stringify(response?.data));

  return response;
};

// facebook login
const facebookLogin = async () => {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data?.accessToken,
  );

  // Sign-in the user with the credential
  await auth().signInWithCredential(facebookCredential);

  return data;

  // await AsyncStorageService.setData(
  //   'user',
  //   JSON.stringify({
  //     token: data?.accessToken,
  //     signInMethod: 'facebook',
  //   }),
  // );
};

const googleLogin = async () => {
  // Get the users ID token
  // const response = await GoogleSignin.signIn();
  const response = await GoogleSignin.signIn();

  // Create a Google credential with the token
  // const googleCredential = auth.GoogleAuthProvider.credential(accessToken);

  // // Sign-in the user with the credential
  // await auth().signInWithCredential(googleCredential);

  // await AsyncStorageService.setData(
  //   'user',
  //   JSON.stringify({
  //     token: accessToken,
  //     signInMethod: 'google',
  //     email: response?.user?.email,
  //     name: response?.user?.name,
  //   }),
  // );

  // console.log(accessToken);
  return response?.user;
};

// activate user:
const activateUser = async ({id, code}) => {
  const response = await axios.put(`/user/${id}/activate`, {code});
  // console.log(id, code);
  return response?.data;
};

const resendVerificationCode = async id => {
  const response = await axios.post(`/${id}/resend_token`);

  return response.data;
};

// *************Password recovery************
// send verification code to recover account
const recoveryVerification = async data => {
  const response = await axios.post(`/recover_account`, data);

  return response.data;
};
// *************Password recovery************

// fetch facebook user details
const fetchFacebookUserDetails = async token => {
  const response = await fetch(
    'https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' +
      token,
  );

  return response.json();
};

// logout user
const logout = async () => {
  await removeData('user');
};

const isExisting = async email => {
  const {data} = await axios.post('/get-user', {email});

  if (data.Exists) {
    return true;
  } else {
    return false;
  }
};

//fetch user roles:
const fetchUserRoles = async () => {
  const {data} = await axios.get('/roles');

  return data?.roles;
};

const AuthService = {
  loginUser,
  registerUser,
  logout,
  activateUser,
  facebookLogin,
  googleLogin,
  fetchFacebookUserDetails,
  isExisting,
  authenticateUserSocially,
  updateUser,
  fetchUserRoles,
  resendVerificationCode,
  recoveryVerification,
};

export default AuthService;
