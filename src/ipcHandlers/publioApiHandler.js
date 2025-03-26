const axios = require('axios');
const { ipcMain } = require('electron');
const BASE_URL = "http://127.0.0.1:4000/"

const publioApiHandlers = () => {

    //get request
    ipcMain.handle('fetchData', async (event, api_url) => {
        try {
            const response = await axios.get(BASE_URL + api_url);
            return response.data;
        } catch (error) {
            console.error('Error in fetchData handler:', error.message);
            throw error;
        }
    }),

    //post request
    ipcMain.handle('postData', async (event, api_url, data) => {
        try {
            const response = await axios.post(BASE_URL + api_url, data);
            return response.data;
        } catch (error) {
            console.error('Error in postData handler:', error.message);
            throw error;
        }
    }),

    //put request
    ipcMain.handle('putData', async (event, api_url, data) => {
        try {
            const response = await axios.put(BASE_URL + api_url, data);
            return response.data;
        } catch (error) {
            console.error('Error in putData handler:', error.message);
            throw error;
        }
    })

    //delete request
    ipcMain.handle('deleteData', async (event, api_url, data) => {
        try {
            const response = await axios.delete(BASE_URL + api_url, data);
            return response.data;
        } catch (error) {
            console.error('Error in deleteData handler:', error.message);
            throw error;
        }
    })
}

module.exports = {
    publioApiHandlers
}

