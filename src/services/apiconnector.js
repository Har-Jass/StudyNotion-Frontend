// importing axios library
import axios from "axios";

// creating and exporting instance of axios library
// and using this instance we make call to our server
export const axiosInstance = axios.create({});

// this apiConnector() function will connect our Frontend with Backend
// data, headers and params all are optional parameters
export const apiConnector = (method, url, bodyData, headers, params) => {
    console.log("Inside API Connector Function....");
    return axiosInstance({
        method: `${method}`,
        url: `${url}`,
        data: bodyData ? bodyData: null,
        headers: headers ? headers: null,
        params: params ? params: null
    });
}