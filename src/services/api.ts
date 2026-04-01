//axios is a library for making HTTP requests
//fetch data from APIs
//send data to servers
import axios from "axios";

//creates a custom axios instance
export const api = axios.create({
    baseURL: "https://dummyjson.com",
});