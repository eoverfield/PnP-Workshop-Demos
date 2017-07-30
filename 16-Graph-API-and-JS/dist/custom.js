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
var Pxlml = Pxlml || {};

//the office graph helper
//based on work by Julie Turner: http://julieturner.net/2017/01/extending-sharepoint-with-adal-and-the-microsoft-graph-api-part-2-the-authorization/
Pxlml.officeGraphUtility = (function ($) {
     
     Pxlml.officeGraphUtility = function (config) {
        /**
         * Enum for request type
         * @enum {string}
         */
        this.REQUEST_TYPE = {
            LOGIN: 'LOGIN',
            RENEW_TOKEN: 'RENEW_TOKEN',
            UNKNOWN: 'UNKNOWN'
        };

        // preset vars
        this.clientId = "";
        this.tenant = "";

        //grab values from configuration
        if (config.clientId)
            this.clientId = config.clientId;
        if (config.tenant)
            this.tenant = config.tenant;

        //now set up the graph configuration
        this.config = {
            tenant: this.tenant,
            clientId: this.clientId,
            endpoints: {
                graphUri: 'https://graph.microsoft.com'
            },
            cacheLocation: "localStorage"
        };

        //has a token been verified? useful if want to preload token
        this.verifiedToken = false;

        //Create the autentication context
        this.authContext =  new AuthenticationContext(this.config);
    };

  
    //get an authorzation token, and once has been retrieved, resolve promise with token
    Pxlml.officeGraphUtility.prototype.getAuthToken = function(endpoint) {
        var d = jQuery.Deferred();
        
        //Read the token from the cache
        var tokenCache = this.authContext.getCachedToken(endpoint);

        if(tokenCache == undefined) {
            //If token is undefined, then call AAD to get a new token
            this.authContext.acquireToken(endpoint, function (error, token) {
                if (error || !token) {
                    d.reject(error);
                }
                else {
                    d.resolve(token);
                }
            });
        }else{
            d.resolve(tokenCache);
        }
        //Return a promise for acquiring token
        return d.promise();
    };
 
    //ginve a graph endpoint, ensure we have a valid token, then send request to graph endpoint, resolving promise with graph response
    Pxlml.officeGraphUtility.prototype.getGraphData = function(graphEndpoint) {
        var d = jQuery.Deferred();
        var me = this;

        //Get the token, either from the cache or from the server
        var tokenPromise = this.getAuthToken(this.config.endpoints.graphUri);
        
        //once we have the auth token resolved, we have address it
        tokenPromise.then(function(token) {
            //Promise for token resolved
            if(token != undefined) {
                //ensure that we know a token is available
                me.verifiedToken = true;

                //Valid token, make a REST call to the MSGraphAPI
                if (!graphEndpoint) {
                    graphEndpoint = "https://graph.microsoft.com/v1.0/me";
                }

                $.ajax
                ({
                    type: "GET",
                    url: graphEndpoint,
                    headers: {
                        //Include the token
                        "Authorization": "Bearer " + token
                    }
                }).done(function (response) {
                    //// console.log("getGraphData: resolving with data");
                    //// console.log(response);

                    d.resolve(response);
                }).fail(function () {
                    // console.log("getGraphData: failed to get graph data");
                    d.reject("failed to get graph data");
                });
            }
        }, function(error){
            // console.log("getGraphData: failed to get token");
            // console.log(JSON.stringify(error));
            d.reject("failed to get graph data: " + JSON.stringify(error));
        });

        //Return a promise for getting graph data
        return d.promise();
    };

    //starting point, given a graph endpoint, set up authorization to ensure we can get graph data, then execute getGraphData
    Pxlml.officeGraphUtility.prototype.getDataFromGraph = function(graphEndpoint) {
        var d = $.Deferred();
        
        //// console.log("getting data from graph...");

        // Check For & Handle Redirect From AAD After Login or Acquiring Token
        var isCallback = this.authContext.isCallback(window.location.hash);
 
        if (isCallback && !this.authContext.getLoginError()) {        
            //this.authContext.handleWindowCallback(window.location.hash);
            this.authContext.handleWindowCallback();
            var user = this.authContext.getCachedUser() 
            d.reject("callback to be handled");
        }
        else {
            var user = this.authContext.getCachedUser();
            if (!user) {
                //Log in user
                this.authContext.login();
                d.reject("getDataFromGraph: redirecting to login");
            }
            else {
                this.verifiedToken = true;

                //must have a valid token, so get graph data now based on endpoint
                var graphResponsePromise = this.getGraphData(graphEndpoint);

                $.when(graphResponsePromise)
                .done(function(data) {
                    //// console.log("getDataFromGraph: Graph data obtained");
                    //// console.log(data);

                    d.resolve(data);
                })
                .fail(function(msg1) {
                    // console.log(msg1);

                    d.reject("getDataFromGraph: error getting data: " + msg1);
                });
            }
        }
        
        return d.promise();
    };

    Pxlml.officeGraphUtility.prototype.getMeFromGraph = function() {
        var d = $.Deferred();

        //// console.log("getting me ...");

        // Check For & Handle Redirect From AAD After Login or Acquiring Token
        var isCallback = this.authContext.isCallback(window.location.hash);

        if (isCallback && !this.authContext.getLoginError()) {        
            this.authContext.handleWindowCallback(window.location.hash);
            d.reject("getMeFromGraph: callback to be handled");
        }
        else {
            var user = this.authContext.getCachedUser();
            if (!user) {
                //Log in user
                this.authContext.login();
                d.reject("getMeFromGraph: redirecting to login");
            }
            else{
                this.verifiedToken = true;

                //must have a valid token, so get graph data now based on endpoint
                var graphResponsePromise = this.getGraphData();

                $.when(graphResponsePromise)
                .done(function(data) {
                    //// console.log("getMeFromGraph: Graph data obtained");
                    //// console.log(data);

                    d.resolve(data);
                })
                .fail(function(msg1) {
                    // console.log(msg1);

                    d.reject("getMeFromGraph: error getting data: " + msg1);
                });
            }
        }
    };

    //a non-promised based method that allows us to know that by the end of the redirects, a token is avialable for graph
    Pxlml.officeGraphUtility.prototype.verifyTokenFromGraph = function() {
        // console.log("verifying token");

        // Check For & Handle Redirect From AAD After Login or Acquiring Token
        var isCallback = this.authContext.isCallback(window.location.hash);
 
        if (isCallback && !this.authContext.getLoginError()) {        
            this.authContext.handleWindowCallback(window.location.hash);
        }
        else {
            var user = this.authContext.getCachedUser();
            if (!user) {
                //Log in user
                this.authContext.login();
            }
            else {
                //specify that valid token is available
                this.verifiedToken = true;
            }
        }
    };

    return Pxlml.officeGraphUtility;
})(jQuery);
$(document).ready(function() {
    //the tenant id from graph: https://support.office.com/en-us/article/Find-your-Office-365-tenant-ID-6891b561-a52d-4ade-9f39-b492285e2c9b  
    var graphHelper = new Pxlml.officeGraphUtility({
        tenant: "f4b1bc56-e989-4c61-9a5e-d43fb4913500",
        clientId: "8296d610-45f0-4196-a9e9-0af2767c9f2a"
    });

    // console.log("Starting up: " + frame);
    $("#statusPlaceholder").text("Retreiving data");


    //the following code will make a test graph request to get my groups. could also just get "me"
    
    //var graphPromise = graphHelper.getDataFromGraph("https://graph.microsoft.com/v1.0/groups");
    var graphPromise = graphHelper.getDataFromGraph("https://graph.microsoft.com/v1.0/me");
    
    $("#statusPlaceholder").text("About to wait for graph response");
    $.when(graphPromise)
        .done(function(data) {
            $("#statusPlaceholder").text("root: groups obtained");

            $("#statusPlaceholder").text("groups returned: " + JSON.stringify(data));
            console.log(data);
        })
        .fail(function(msg1) {
            $("#statusPlaceholder").text("root: error - " + msg1);
        });
});