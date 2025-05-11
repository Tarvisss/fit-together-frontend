import axios from "axios"
import { jwtDecode } from "jwt-decode";
const BASE_URL = "http://localhost:3000"

export default class ApiHandler {
  static async request(endpoint, data = {}, method = "get", headers = {}) {
      const url = `${BASE_URL}/${endpoint}`;

      const params = method === "get" ? data : {};

      try {
          const response = await axios({
              url,
              method,
              headers,  // Pass headers here
              data: method !== "get" ? data : {},
              params
          });
          return response.data;
      } catch (error) {
          // Check if the server sent back a structured error response.
          if (error.response && error.response.data && error.response.data.error) {
              throw error;
          }
          throw new Error("API request failed");
      }
  }


    /**API Handler Methods */
    
    static async SignUp(username, password, email, first_name, last_name) {
      try {
          let data = await this.request(
              "auth/register",
              { username, password, email, first_name, last_name },
              "post"
          );
  
          // If backend returns an error in the response body. used to display errors to the user
          if (data?.error) {
              throw new Error(data.error.message || "Signup failed.");
          }
  
          // If a token is returned, proceed
          if (data && data.token) {
              return data.token;
          } else {
              throw new Error("No token returned.");
          }
      } catch (error) {
          console.error("Error during signup:", error);
          const errorMessage =
              error.response?.data?.error?.message || error.message || "Signup failed.";
          throw new Error(errorMessage);
      }
  }
  
  static async Login(username, password) {
    try {
        let data = await this.request(
            "auth/login",
            { username, password },
            "post"
        );

        // If backend returns an error in the response body. used to display errors to the user
        if (data?.error) {
            throw new Error(data.error.message || "Login failed.");
        }

        // If a token is returned, store in localStorage
        if (data && data.token) {
          localStorage.setItem("token", data.token)
          return data.token;
          
        } else {
            throw new Error("No token returned.");
        }
    } catch (error) {
        console.error("Error during login:", error);
        const errorMessage =
            error.response?.data?.error?.message || error.message || "Login failed.";
        throw new Error(errorMessage);
    }
  }
  
  static async AddChallenge(title, description, start_date, end_date, created_at){
    try {

      const token = localStorage.getItem("token");
      console.log("Token:", token);

      // const user = JSON.parse(localStorage.getItem("user"));
      // const creator_id = user.userId
      const headers = {
        Authorization: `Bearer ${token}`
      };
      
      const data = { title, description, start_date, end_date, created_at }

      const response = await this.request("challenges", data, "post", headers)
      return response;
    } catch (error) {
        console.error("Error during login:", error);
        const errorMessage =
            error.response?.data?.error?.message || error.message || "Login failed.";
        throw new Error(errorMessage);
    }
  }

  static async EditChallenge(id, title, description, start_date, end_date){
    try {

      const token = localStorage.getItem("token");
      console.log("Token:", token);

      // const user = JSON.parse(localStorage.getItem("user"));
      // const creator_id = user.userId
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      };
      
      
      const data = {id, title, description, start_date, end_date }

      const response = await this.request(`challenges/${id}`, data, "patch", headers)
      return response;
    } catch (error) {
        console.error("Error during login:", error);
        const errorMessage =
            error.response?.data?.error?.message || error.message || "Login failed.";
        throw new Error(errorMessage);
    }
  }
}