const prodAPI = process.env.REACT_APP_PROD_API_URL || '';
const devAPI = process.env.REACT_APP_DEV_API_URL || '';

const configAPI = _ => {
  const API_URL = (process.env.NODE_ENV === 'production')
  ? prodAPI
  : devAPI
  return API_URL;
}

export default configAPI;
