import axios, {setAuthToken} from './AxiosService';

// fetch business categories
const fetchBusinessCategories = async () => {
  await setAuthToken(axios);

  const response = await axios.get(`/busines-categories`);

  return response.data;
};

const fetchBusinessCategoriesNoAuth = async () => {
  const response = await axios.get(`/busines-categories`);
  return response.data;
};

// fetch mtaani agents
const fetchAgents = async () => {
  const response = await axios.get(`/shelf_locations`);

  return response.data;
};

const setBusinessCategoryDetails = async formData => {
  // await setAuthToken(axios);

  const response = await axios({
    url: `/business`,
    method: 'POST',
    data: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

const addBusinessDetails = async (id, data) => {
  const response = await axios.post(`/business/${id}/details`, data);

  return response.data;
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

const fetchProducts = async id => {
  await setAuthToken(axios);

  const res = await axios.get(`/products/${id}`);

  console.log(res?.data);
  return res.data?.products;
};

const AboutBusinessService = {
  fetchBusinessCategories,
  fetchBusinessCategoriesNoAuth,
  setBusinessCategoryDetails,
  createBusinessProduct,
  fetchProducts,
  updateBusinessProduct,
  addBusinessDetails,
  fetchAgents,
};

export default AboutBusinessService;
