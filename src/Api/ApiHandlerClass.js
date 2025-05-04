import axios from "axios"
const BASE_URL = "http://localhost:3000"
export default class ApiHandler {
    static async request( endpoint, data = {}, method = "get"){
        const url = `${BASE_URL}/${endpoint}`

        const headers = {
            'Content-Type': 'application/json'
        };

        const params = (method === "get") ? data : {};

        try {
            const response = await axios({
                url,
                method,
                headers,
                data: method !== "get" ?  data : {},
                params
            });
            return response.data;
        } catch (error) {
            console.error("API Error:", error.response);
        }
    }

    static async SignUp(username, password, email, first_name, last_name) {
        try {
          // Ensure you're using the correct endpoint for registration
          let data = await this.request(
            "auth/register", // Correct endpoint for registration
            { username, password, email, first_name, last_name }, // Request body with all required fields
            "post"
          );
          // If the response contains a token, return it
          if (data && data.token) {
            return data.token;
          } else {
            console.error("No token found in response data:", data);
          }
        } catch (error) {
          console.error("Error during signup:", error);
        }
      }
}