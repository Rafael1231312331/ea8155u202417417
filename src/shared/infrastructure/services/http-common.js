
/**

 * Centralized HTTP Client

 * @summary Axios instance configured with local json-server base URL

 * @author Rafael André Barrenechea Bustamante

 */

import axios from 'axios';



const http = axios.create({

 baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',

 headers: {

  'Content-Type': 'application/json'

 }

});



export default http;

