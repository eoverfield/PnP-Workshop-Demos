#Demo 9 - PnP Responsive UI

review documentation

https://github.com/SharePoint/PnP-Tools/tree/master/Solutions/SharePoint.UI.Responsive

Or search for "SharePoint Responsive UI"

#Files pulled from:

https://github.com/SharePoint/PnP-Tools/archive/master.zip


Run the following in PowerShell where Enable-SPResponsiveUI.ps1 found
PnP PowerShell commandlets must have been installed

> $cred = Get-Credential
> .\Enable-SPResponsiveUI.ps1 -TargetSiteurl "https://"yourtenant".sharepoint.com/sites/pnp-provisioning-demo" -Credentials $cred

#Disable Repsonsive UI

connect to site (not needed if you just ran the enable script)...

> Connect-PnPOnline -url https://"yourtenant".sharepoint.com/sites/pnp-provisioning-demo –Credentials $cred

> Disable-PnPResponsiveUI  