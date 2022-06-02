import axios, {setAuthToken} from './AxiosService';

// fetch business categories
const fetchBusinessCategories = async () => {
  await setAuthToken(axios);

  const response = await axios.get(`/busines-categories`);

  return response.data;
};

const setBusinessCategoryDetails = async formData => {
  // await setAuthToken(axios);

  axios({
    url: `http://178.62.228.130:4000/api/business`,
    method: 'POST',
    data: formData,
    // headers: {
    //   Accept: 'application/json',
    //   'Content-Type': 'multipart/form-data',
    // },
  })
    .then(function (response) {
      console.log('response :', response);
    })
    .catch(function (error) {
      console.log('error : ', error);
    });
};

const AboutBusinessService = {
  fetchBusinessCategories,
  setBusinessCategoryDetails,
};

export default AboutBusinessService;
