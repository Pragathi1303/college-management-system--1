import api from "../utils/axios";

/**
 * Submit a contact form message.
 * @param {Object} contactData - { name, email, phone, subject, message }
 * @returns {Promise<Object>}
 */
export async function submitContact(contactData) {
  const response = await api.post("/contact", contactData);
  return response.data;
}