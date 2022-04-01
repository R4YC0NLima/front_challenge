import axios from 'axios';

axios.defaults.baseURL                          = 'https://randomuser.me/api/1.3';
axios.defaults.headers.common['Content-Type']   = 'application/json';
axios.defaults.headers.common['Accept']         = 'application/json';

export default axios