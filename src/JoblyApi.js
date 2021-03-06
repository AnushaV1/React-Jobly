import axios from "axios";
const BASE_URL = process.env.REACT_APP_BACKEND_URL ||  'https://anusha-jobly.herokuapp.com';
//"http://localhost:3001";
class JoblyApi {

      static async request(endpoint, paramsOrData = {}, verb = "get") {
      paramsOrData._token = localStorage.getItem('jobly-token');
  
      console.debug("API Call:", endpoint, paramsOrData, verb);
  
      try {
        return (await axios({
          method: verb,
          url: `${BASE_URL}/${endpoint}`,
          [verb === "get" ? "params" : "data"]: paramsOrData})).data;
        }
      catch(err) {
        console.error("API Error:", err.response);
        let message = err.response.data.message;
        throw Array.isArray(message) ? message : [message];
    }
    }
    
    static async getCompanies(search={}) {
        let res = await this.request(`companies/`, search);
        return res.companies;
    }

    static async getCompany(handle) {
      let res = await this.request(`companies/${handle}`);
      return res.company;
    }
    
    static async getJobs(search={}) {
        let res = await this.request(`jobs/`, search);
        return res.jobs;
      }
    static async getJob(title) {
        let res = await this.request(`jobs/${title}`);
        return res.job;
      }
    
      static async register(data) {
        let res = await this.request(`users`, data, 'post');
        return res.token;
      }
    static async login(data){
      let res = await this.request('login',data, 'post');
      return res.token;
    }

    static async getUser(username) {
      let res = await this.request(`users/${username}`);
      return res.user;
    }

    static async updateUser(username, data) {
      let res = await this.request(`users/${username}`, data, 'patch');
      return res.user;
    }

    static async applyToJob(id) {
      let res = await this.request(`jobs/${id}/apply`, {}, 'post');
      return res.message;
    }
    
  }

  export default JoblyApi;