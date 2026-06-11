import api from "../utils/axios";

/**
 * Get FAQ data from the API.
 * @returns {Promise<Array<{q, a}>>}
 */
export async function getFAQs() {
  const response = await api.get("/faq");
  return response.data;
}