import api from "../../services/api";


export const fetchGigs = (search = "") => {
  api.get(`/gigs?search=${search}`);
}

export const fetchGigById = (id) =>
  api.get(`/gigs/${id}`);

export const createGig = (data) =>
  api.post("/gigs", data);

export const fetchMyGigs = () =>
  api.get("/gigs/my-gigs");
