import axios from "axios"
const BASE_URL = "http://localhost:3000"

export default class ApiHandler {
    static async request(endpoint, data = {}, method = "get") {
        const url = `${BASE_URL}/${endpoint}`;

        const headers = {
            'Content-Type': 'application/json'
        };

        const params = (method === "get") ? data : {};

        try {
            const response = await axios({
                url,
                method,
                headers,
                data: method !== "get" ? data : {},
                params
            });
            return response.data;
        } catch (error) {
            // Check if the server sent back a structured error response.
            // If it exists, throw it so the calling function (e.g. SignUp) can read and handle it.
            if (error.response && error.response.data && error.response.data.error) {
                throw error;
            }

            // If no detailed error info is available (network issue, server down, etc),
            // throw a generic error to avoid breaking the app with an undefined reference.
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

        // If a token is returned, proceed
        if (data && data.token) {
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
  
}