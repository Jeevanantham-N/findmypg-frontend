import axios from 'axios';
import ProviderDetailsSession from './ProviderDetailsSession';

const SERVER_URL = `http://localhost:8080/provider`
export const jwtToken = `Bearer ${localStorage.getItem("jwtToken")}`;
axios.interceptors.request.use(
  function(config) {
    if (jwtToken !== "Bearer null") {
      if(ProviderDetailsSession.isJwtExpired()){
        config.headers["authorization"] = jwtToken;
      }
      else{
        ProviderDetailsSession.removeProviderdetails()
        window.location.replace("/provider/account/login")
      }
    }
    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
)

class Service{
    updateProfile = (file) => {
        return axios.put(`${SERVER_URL}/api/profile`,file)
    }
    addProvider = (provider) => {
        return axios.post(`${SERVER_URL}/register`,provider)
    }
    verifyProvider = (provider) => {
        return axios.post(`${SERVER_URL}/authenticate`,provider)
    }
    updateProviderDetails = (provider) => {
        return axios.put(`${SERVER_URL}/api/details`,provider)
    }
    deleteProvider = () => {
      return axios.delete(`${SERVER_URL}/api/details`)
    }
    addPG = (pg) => {
      return axios.post(`${SERVER_URL}/api/pg`,pg)
    }
    addPGimages = (files,id) => {
      return axios.put(`${SERVER_URL}/api/pgimages/${id}`,files)
    }
    getPGs = () => {
      return axios.get(`${SERVER_URL}/api/pgs`)
    }
    getPG = (id) => {
      return axios.get(`${SERVER_URL}/api/pg/${id}`)
    }
    updatePG = (pg,id) => {
      return axios.put(`${SERVER_URL}/api/pg/${id}`,pg)
    }
}

export default new Service()