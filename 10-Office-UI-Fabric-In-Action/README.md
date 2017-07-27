#Demo 10 - Fabric in Action demos

Starter Fabric App based on: https://github.com/guzmonne/office-ui-layout

This is the sample used to showcase some of the components of [Office UI Fabric](https://dev.office.com/fabric) Frontend framework by Microsoft.

It is a very simple React application built with [create-react-app](https://github.com/facebookincubator/create-react-app).

Can test with:
npm start

Can build for deployment with:
npm run build


Test two, a SharePoint ready test for general test of Fabric UI:

Run:
gulp serve

Serves up a local webserver. Can then use within SharePoint:

solution/Provision-Branding.ps1

#Provision

> $cred = Get-Credential
    
#provision assets to tenant, such as sample content
.\Provision-Branding.ps1 -TargetSiteurl "https://"yourtenant".sharepoint.com/sites/pnp-provisioning-demo" -Credentials $cred

#ensure that gulp serve has been run

> .\Provision-Branding.ps1 -TargetSiteurl "https://"yourtenant".sharepoint.com/sites/pnp-provisioning-demo" -Credentials $cred -ServeLocal $true

#review: https://"yourtenant".sharepoint.com/sites/pnp-provisioning-demo/SitePages/Demo%20Fabric%20Grid%20Page.aspx

#disable before moving forward

> .\Disable-Branding.ps1 -TargetSiteurl "https://"yourtenant".sharepoint.com/sites/pnp-provisioning-demo" -Credentials $cred