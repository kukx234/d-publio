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
    })

    //post request
    /*ipcMain.handle('postrequest', async () => {
        
    })*/
}

module.exports = {
    publioApiHandlers
}

