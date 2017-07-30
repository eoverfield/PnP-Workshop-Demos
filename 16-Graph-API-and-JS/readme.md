#Demo 16 - ADAL - Graph API and JS

Great demo by Julie Turner:
http://julieturner.net/2017/01/extending-sharepoint-with-adal-and-the-microsoft-graph-api-part-2-the-authorization/

#set up demo

Install node modules for this project:

> npm install

#need to update tenant and clientid (Application ID) in loader.js

After creating an Azure Application in AAD, we need to get the Application (Client ID) and Tenant Id for this application.

These two guids need to be updated in loader.js

#spin up gulp

> gulp serve

  
There is a script found in solution/templates/SiteAssets/sewp-js-example.txt, copy the contents of this file into a script editor webpart on a page in a sp web page

No provisioning id needed. Load page you added SEWP in browser and watch console log