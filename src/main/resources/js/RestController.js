var RestaurantRestController = (function (){
    var url = '';

    function getSeries(name, type) {
        return axios.get(url + "/series/"+name+"/"+type).then(function (response) {
            return response.data;
        })
    }

    
    
    
    
    return {
        getSeries: getSeries
    };
})();