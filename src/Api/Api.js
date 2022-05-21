import Axios from "axios";
export const imagePath = "/uploads/";
//config
 const URL = "http://localhost:8080/api";

const axios = Axios.create({
    baseURL: URL,
    timeout: 10000,
});

 export const imdbApi = 'k_sblaz5wr'
// export const imdbApi = 'k_991b4g8l'
// export const imdbApi = 'k_lq5ooe6o'
//export const imdbApi = 'k_eg7j2x0t'
// export const imdbApi = 'k_8n7qle6r'

export const Cinema = {
    //cinema
    Add: async (data) => await axios.post("/cinema/add", data),
    getAll: async (data) => await axios.get("/cinema/getall", data),
    Delete: async (data) => await axios.post("/cinema/delete", data),
    getOne: async (data) => await axios.post("/cinema/getone", data),
    //cinema movies
    AddMovie: async (data) => await axios.post("/cinema/Movie/add", data),
    getoneMovies: async (data) => await axios.post("/cinema/Movie/getone", data),
    DeleteMovies: async (data) => await axios.post("/cinema/Movie/delete", data),
    getMovieByGenre: async (data) => await axios.post("/cinema/Movie/getByGenre", data),
    

};
export const Scraping = {
    //cinema
    ScrapingHandler: async (data) => await axios.post("/scraping", data),
};
export const User = {
    //cinema
    SuggestedMovies: async (data) => await axios.post("/user/UserSuggestedMovies", data),
};
