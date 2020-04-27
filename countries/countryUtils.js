
function fetch_data(res){
    const axios = require('axios');

    // Optionally the request above could also be done as
    return axios.get('http://covid19api.xapix.io/v2/locations', {
        params: {}
    })
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        console.log(error);
    })

}


module.exports = {
    fetch_data,
}