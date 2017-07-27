var SiteData = SiteData ? SiteData : {};

//As is, this will not work in IE because of promises
//polyfill options available at: https://github.com/SharePoint/PnP-JS-Core/wiki/Getting-Started:-Install-&-Use


SiteData.init = function() {
	$pnp.sp.web.select("Title").get()
		.then(function(data){
			console.log("Used PnP Core JS to get site title: " + data.Title);
		})   
		.catch(function(err){  
			console.log("An error occured while using PnP Core JS to get site title:" + err);
		});


	//batching demo - https://github.com/SharePoint/PnP-JS-Core/wiki/Batching

	var batch = $pnp.sp.createBatch();

	$pnp.sp.web.lists.inBatch(batch).get().then(function(data) {
			console.log("Lists retrieved from batch");
    		console.log(data);
		})
		.catch(function(err){  
			console.log("An error occured while using PnP Core JS to get lists:" + err);
		});

	// GET /_api/web/lists/getByTitle('Tasks')
	$pnp.sp.web.lists.getByTitle("Site Pages").inBatch(batch).get().then(function(data) {
			console.log("Site Pages library from batch");
    		console.log(data);
		})
		.catch(function(err){  
			console.log("An error occured while using PnP Core JS to get a list:" + err);
		});

	// GET /_api/web/lists/getByTitle('Tasks')/items
	$pnp.sp.web.lists.getByTitle("Site Pages").items.inBatch(batch).get().then(function(data) {
			console.log("Site Pages library items from batch");
    		console.log(data);
		})
		.catch(function(err){  
			console.log("An error occured while using PnP Core JS to get a list items:" + err);
		});
		
	batch.execute().then(function() {
		console.log("All done!")
	});
}