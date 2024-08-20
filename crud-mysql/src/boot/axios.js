import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3001/api' });

export default ({ Vue }) => {
  Vue.prototype.$axios = api;
};

export { api };
