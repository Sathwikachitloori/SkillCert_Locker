// src/api/certs.js
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000";
const API = `${API_BASE}/certs`;

/**
 * GET /certs
 */
export async function fetchCerts() {
  return axios.get(API);
}

/**
 * POST /certs
 */
export async function createCert(data) {
  return axios.post(API, data);
}

/**
 * PATCH /certs/:id
 */
export async function updateCert(id, data) {
  return axios.patch(`${API}/${id}`, data);
}

/**
 * DELETE /certs/:id
 */
export async function deleteCert(id) {
  return axios.delete(`${API}/${id}`);
}
