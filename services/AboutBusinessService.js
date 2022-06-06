import axios, {setAuthToken} from './AxiosService';

// fetch business categories
const fetchBusinessCategories = async () => {
  await setAuthToken(axios);

  const response = await axios.get(`/busines-categories`);

  return response.data;
};

const setBusinessCategoryDetails = async formData => {
  await setAuthToken(axios);

  await axios({
    url: `/business`,
    method: 'POST',
    data: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
  // .then(function (response) {
  //   console.log('response :', response);
  // })
  // .catch(function (error) {
  //   console.log('error : ', error.response.data);
  // });
};

const AboutBusinessService = {
  fetchBusinessCategories,
  setBusinessCategoryDetails,
};

export default AboutBusinessService;
