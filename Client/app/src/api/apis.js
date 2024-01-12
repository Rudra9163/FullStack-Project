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
        try {
            const response = await this.instance.get(`/get-data`);
            return response;
        } catch (error) {
            throw error;
        }
    };
 
    userdetailsform = async (data) => {
      const headers = {
            'create': 'password',
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
 