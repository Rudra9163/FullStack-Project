import axios from "axios";
 import { url } from "../Custom/api.url";
 
class ApiService {
    instance;
    constructor() {
        this.instance = axios.create({
            baseURL: `${url}`,
        });
    }
 
    getTableData = async () => {
        const headers = {
            'create': 'password',
        }
        try {
            const response = await this.instance.get(`/get-data`,
            {headers}
            );
            return response;
        } catch (error) {
            throw error;
        }
    };
 
    userdetailsform = async (data) => {
      const headers = {
            'authorization': 'your_access_token',
        }
        try {
            const response = await this.instance.post(
                `/submit-form`,
                data,
                {headers}
            );
            return response;
        } catch (error) {
            throw error;
        }
    };
 
  
 
   
}
 
export default ApiService;
 