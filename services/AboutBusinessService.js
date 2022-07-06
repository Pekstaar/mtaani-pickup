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
};

const createBusinessProduct = async formData => {
  await setAuthToken(axios);

  await axios({
    url: `/product`,
    method: 'POST',
    data: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
};

const updateBusinessProduct = async (pData, id) => {
  await setAuthToken(axios);

  const r = await axios.put(`/product/${id}`, pData);

  console.log(r);
};

const fetchProducts = async () => {
  await setAuthToken(axios);

  const res = await axios.get('/products');

  return res.data.products;
};

const AboutBusinessService = {
  fetchBusinessCategories,
  setBusinessCategoryDetails,
  createBusinessProduct,
  fetchProducts,
  updateBusinessProduct,
};

export default AboutBusinessService;
