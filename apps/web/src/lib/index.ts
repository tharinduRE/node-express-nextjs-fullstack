/* eslint-disable turbo/no-undeclared-env-vars */
import Axios from "axios";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1'

const Client = Axios.create({
    baseURL : API_BASE_URL,
    withCredentials : true
})

export default Client