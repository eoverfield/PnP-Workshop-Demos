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