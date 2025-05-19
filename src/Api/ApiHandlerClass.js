import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BASE_URL = "http://localhost:3000";

export default class ApiHandler {
  /** Generic request wrapper */
  static async request(endpoint, data = {}, method = "get", headers = {}) {
    const url = `${BASE_URL}/${endpoint}`;
    const params = method === "get" ? data : {};

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
      if (error.response?.data?.error) {
        throw error;
      }
      throw new Error("API request failed");
    }
  }

  // ─────────────────────────────
  // AUTH
  // ─────────────────────────────

  static async SignUp(formData) {
    try {
      const data = await this.request("auth/register", formData, "post");
  
      if (data?.error) {
        throw new Error(data.error);
      }
  
      if (data?.token) {
        return data;
      }
  
      throw new Error("No token returned.");
    } catch (error) {
      console.error("Error during signup:", error);
  
      // Try to get detailed server-side error
      const serverMessage = error.response?.data?.error || error.message || "Signup failed.";
      throw new Error(serverMessage);
    }
  }
  
  

  static async Login(username, password) {
    try {
      const data = await this.request(
        "auth/login",
        { username, password },
        "post"
      );

      if (data?.error) {
        throw new Error(data.error.message || "Login failed.");
      }

      if (data?.token) {
        localStorage.setItem("token", data.token);
        return data.token;
      }

      throw new Error("No token returned.");
    } catch (error) {
      console.error("Error during login:", error);
      const errorMessage =
        error.response?.data?.error?.message || error.message || "Login failed.";
      throw new Error(errorMessage);
    }
  }

  // ─────────────────────────────
  // CHALLENGES
  // ─────────────────────────────

  static async FetchChallenges() {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`
    };

    return await this.request("challenges", null, "get", headers);
  }

  static async FetchChallenge(id) {
    const token = localStorage.getItem("token");

    const headers = {
        Authorization: `Bearer ${token}`
    }

    return await this.request(`challenges/${id}`, null, "get", headers)
  }
  static async AddChallenge(title, description, start_date, end_date, created_at) {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`
      };

      const data = { title, description, start_date, end_date, created_at };

      return await this.request("challenges", data, "post", headers);
    } catch (error) {
      console.error("Error during add challenge:", error);
      const errorMessage =
        error.response?.data?.error?.message || error.message || "Add challenge failed.";
      throw new Error(errorMessage);
    }
  }

  static async EditChallenge(id, title, description, start_date, end_date) {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      };

      const data = { id, title, description, start_date, end_date };

      return await this.request(`challenges/${id}`, data, "patch", headers);
    } catch (error) {
      console.error("Error during edit challenge:", error);
      const errorMessage =
        error.response?.data?.error?.message || error.message || "Edit challenge failed.";
      throw new Error(errorMessage);
    }
  }

  static async joinChallenge(challengeId, user_id) {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    };

    return await this.request(`challenges/${challengeId}/join`, { user_id }, "post", headers);
  }

  static async leaveChallenge(challengeId, user_id) {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    };

    return await this.request(`challenges/${challengeId}/leave`, { user_id }, "delete", headers);
  }


  // ─────────────────────────────
  // USER COMMENTS
  // ─────────────────────────────

  static async createComment(challengeId, content){
    const token = localStorage.getItem("token")
    if(!token){
        throw new Error("No token found! Login first.")
    }
    const decoded = jwtDecode(token);
    const userId = decoded.userId
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    }
    const data = {userId, content}

    const response = await this.request(`challenges/${challengeId}`, data, "post", headers);
    return response;

  }

  static async fetchComments(challengeId){
    const token = localStorage.getItem("token")
    if(!token){
        throw new Error("Must be logged in!")
    }
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    }
    const response = await this. request(`challenges/${challengeId}/comments`, null, "get", headers)
    return response;
  }

  // ─────────────────────────────
  // USER CHALLENGES
  // ─────────────────────────────

  static async getJoinedChallengeIds(user_id) {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    };

    const response = await this.request(`users/${user_id}/joined_challenges`, null, "get", headers);
    return response.map(c => c.id);
  }

  static async getUserJoinedChallenges(user_id) {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    };

    return await this.request(`users/${user_id}/full_joined_challenges`, null, "get", headers);
  }

  // ─────────────────────────────
  // ZENQUOTES
  // ─────────────────────────────

  static async getQuote(url) {
    const response = await axios.get(url);
    return response.data;
  }

  // ─────────────────────────────
  // LIKES 
  // ─────────────────────────────

  static async addLike(challengeId, userId) {
    const token = localStorage.getItem("token");

    return await this.request(`pins/challenges/${challengeId}`, {userId}, "post", {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });
  }
  
  static async removeLike(challengeId) {
    const token = localStorage.getItem("token");

    return await this.request(`pins/challenges/${challengeId}`, {}, "delete", {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });
  }
  
  static async getLikedChallenges(userId) {
    const token = localStorage.getItem("token");

    return await this.request(`users/${userId}/pins`, null, "get", {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });
  }
  
  
}
