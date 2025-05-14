import axios from "axios";

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

  static async SignUp(username, password, email, first_name, last_name) {
    try {
      const data = await this.request(
        "auth/register",
        { username, password, email, first_name, last_name },
        "post"
      );

      if (data?.error) {
        throw new Error(data.error.message || "Signup failed.");
      }

      if (data?.token) {
        return data.token;
      }

      throw new Error("No token returned.");
    } catch (error) {
      console.error("Error during signup:", error);
      const errorMessage =
        error.response?.data?.error?.message || error.message || "Signup failed.";
      throw new Error(errorMessage);
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

    return await this.request("challenges", {}, "get", headers);
  }

  static async FetchChallenge(id) {
    const token = localStorage.getItem("token");

    const headers = {
        Authorization: `Bearer ${token}`
    }

    return await this.request(`challenges/${id}`, {}, "get", headers)
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
  // USER CHALLENGES
  // ─────────────────────────────

  static async getJoinedChallengeIds(user_id) {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    };

    const response = await this.request(`users/${user_id}/joined_challenges`, {}, "get", headers);
    return response.map(c => c.id);
  }

  static async getUserJoinedChallenges(user_id) {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    };

    return await this.request(`users/${user_id}/full_joined_challenges`, {}, "get", headers);
  }

  // ─────────────────────────────
  // ZENQUOTES
  // ─────────────────────────────

  static async getQuote(url) {
    const response = await axios.get(url);
    return response.data;
  }
}
