#Demo 11 - Including Fabric UI in Toolchain

https://dev.office.com/fabric

change to this demo folder in PowerShell

> npm install

#serve up app and other local host assets for SP demo

> gulp serve

#look at Live demo

> cd solution

> $cred = Get-Credential

#ensure that gulp serve has been run
> .\Provision-Branding.ps1 -TargetSiteurl "https://"yourtenant".sharepoint.com/sites/pnp-provisioning-demo" -Credentials $cred -ServeLocal $true

#look at source app/css/styles.scss

#disable before moving forward
> .\Disable-Branding.ps1 -TargetSiteurl "https://"yourtenant".sharepoint.com/sites/pnp-provisioning-demo" -Credentials $cred