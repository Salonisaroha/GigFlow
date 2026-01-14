import api from "../../services/api";

const BASE_URL = import.meta.env.VITE_API_URL

export const fetchGigs = (search = "") =>
  api.get(`${BASE_URL}/gigs?search=${search}`);

export const fetchGigById = (id) =>
  api.get(`${BASE_URL}/gigs/${id}`);

export const createGig = (data) =>
  api.post("${BASE_URL}/gigs", data);

export const fetchMyGigs = () =>
  api.get("${BASE_URL}/gigs/my-gigs");
