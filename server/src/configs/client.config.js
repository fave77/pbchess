const prodClientURL = process.env.PROD_CLIENT_URL || '';
const devClientURL = process.env.DEV_CLIENT_URL || '';

const configClient = _ => {
  const clientURL = (process.env.NODE_ENV === 'production')
  ? prodClientURL
  : devClientURL
  return clientURL;
}

module.exports = {
  configClient
};