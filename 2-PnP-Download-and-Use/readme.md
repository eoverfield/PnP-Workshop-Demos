#Demo 2 - SP PnP Core components - Obtain the source and use

load site in browser: https://github.com/SharePoint/PnP - going to fork via browser

#Review Core components

Already reviewed documentation

Download all pnp code – use git to pre load
    Preferred method to fork at github https://github.com/SharePoint/PnP then clone that to local host
    
#Run in powershell direct - git clone will take a few minutes
cd "your path"
git clone https://github.com/"your account"/PnP PnPLocal

#Complete steps for https://github.com/SharePoint/PnP/tree/master/Samples/SharePoint.RESTAPI
	
#create development site

https://dev.office.com/sharepoint/docs/sp-add-ins/create-a-developer-site-on-an-existing-office-365-subscription
https://dev.office.com/sharepoint/docs/sp-add-ins/set-up-a-development-environment-for-sharepoint-add-ins-on-office-365
    
#load dev site in browser

Open demo: SharePoint.RESTAPI in Visual Studio

Change app site url to the sample and view
	Properties window (view->Properties Window or F4) - bottom property: set url
F5 - Shift F5 to stop - Allow access to Style Library

Review Pages and Scripts folder. Make update to REST-APIs-Examples.aspx