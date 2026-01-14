import api from "../../services/api";

console.log('Hitting API: ' + import.meta.env.VITE_API_URL)

export const fetchGigs = (search = "") =>
  api.get(`/gigs?search=${search}`);

export const fetchGigById = (id) =>
  api.get(`/gigs/${id}`);

export const createGig = (data) =>
  api.post("/gigs", data);

export const fetchMyGigs = () =>
  api.get("/gigs/my-gigs");
