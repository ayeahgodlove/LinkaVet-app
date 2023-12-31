import { AppConstant } from "config/constant";
import axios, {  AxiosResponse } from "axios";

var user = JSON.parse(localStorage.getItem("user")!);
const apiHeaders = {
  baseURL: `${AppConstant.API_URI}`,
  headers: {
      Accept: 'application/json',
      Authorization: '',
  },
} 

const apiConfig = () => {
  console.log("token: ", user.token);
  apiHeaders.headers['Authorization'] = `Bearer ${user.token}`
  return apiHeaders
}

const responseBody = (response: AxiosResponse) => response.data

export const requestType = {
  get: (url: string) => axios.get(url, apiConfig()).then(responseBody),
  post: (url: string, body: {}) =>
      axios.post(url, body, apiConfig()).then(responseBody),
  put: (url: string, body: {}) =>
      axios.put(url, body, apiConfig()).then(responseBody),
  del: (url: string, body: {}) =>
      axios
          .delete(apiConfig().baseURL + url, {
              headers: apiConfig().headers,
              data: body,
          })
          .then(responseBody),
}