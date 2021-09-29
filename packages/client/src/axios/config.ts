import axiosBase from 'axios';
import { makeUseAxios } from 'axios-hooks';

export const useAxios = makeUseAxios({
    axios: axiosBase.create({ baseURL: 'http://localhost:5000/' }),
});

export const axios = axiosBase.create({
    baseURL: `http://localhost:5000/`,
});
