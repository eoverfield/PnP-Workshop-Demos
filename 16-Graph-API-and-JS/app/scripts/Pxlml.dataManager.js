var Pxlml = Pxlml || {};

//data manager for working with local storage. Not used in general example
Pxlml.dataManager = (function() {
    // data storage options
    var options = {
        session: false,
        json: true
    }

    // how long would we consider the data as "fresh"
    var minToKeep = 30;

    // store timestamp + data in a object
    var saveData = function(key, data) {
        var value = {
            "timestamp": new Date().getTime(),
            "data": data
        }
        localStorage.setItem(key, JSON.stringify(value));
    }

    // get data and timestamp
    var getData = function(key) {
        var data, delay, timestamp;
        // read from local storage
        var value = localStorage.getItem(key);
        if(!value)
        {
            return null;
        }

        // check if the data is valid for immediate display
        data = JSON.parse(value).data;
        timestamp = JSON.parse(value).timestamp;
        delay = minToKeep * 60 * 1000; // delay is im ms

        if(timestamp + delay >= new Date().getTime()) {
            return data;
        }

        return null;
    }


    return {
        saveData: saveData,
        getData: getData
    };
})();