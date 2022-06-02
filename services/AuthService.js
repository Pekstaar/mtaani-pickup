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

  await AsyncStorageService.setData(
    'user',
    JSON.stringify({
      token: data?.accessToken,
      signInMethod: 'facebook',
    }),
  );
};

const googleLogin = async () => {
  // Get the users ID token
  const response = await GoogleSignin.signIn();
  const {accessToken} = await GoogleSignin.getTokens();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(accessToken);

  // // Sign-in the user with the credential
  await auth().signInWithCredential(googleCredential);

  await AsyncStorageService.setData(
    'user',
    JSON.stringify({
      token: accessToken,
      signInMethod: 'google',
      email: response?.user?.email,
      name: response?.user?.name,
    }),
  );
};

// activate user:
const activateUser = async ({id, code}) => {
  const response = await axios.put(`/user/${id}/activate`, {code});

  return response?.data;
};

// fetch facebook user details
const fetchFacebookUserDetails = async () => {
  let token;
  const user = await JSON.parse(await AsyncStorageService.getData('user'));

  if (user?.signInMethod === 'facebook') {
    token = user?.token;
    fetch(
      'https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' +
        token,
    )
      .then(response => response.json())
      .then(json => {
        // Some user object has been set up somewhere, build that user here
        console.log(json);
        // user.name = json.name;
        // user.id = json.id;
        // user.user_friends = json.friends;
        // user.email = json.email;
        // user.username = json.name;
        // user.loading = false;
        // user.loggedIn = true;
        // user.avatar = setAvatar(json.id);
      })
      .catch(err => {
        throw err;
      });
  } else {
    console.log('Fetch Error');
    return;
  }
};

// logout user
const logout = async () => {
  await removeData('user');
};

//

const AuthService = {
  loginUser,
  registerUser,
  logout,
  activateUser,
  facebookLogin,
  googleLogin,
  fetchFacebookUserDetails,
};

export default AuthService;
