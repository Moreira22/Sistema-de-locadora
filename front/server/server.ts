import axios from 'axios';

const url = process.env.BASE_URL + "/Api";

const Api = axios.create({
    baseURL: url,
});

export default Api;
