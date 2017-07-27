#Demo 5 - PnP Provisioning Template

https://github.com/SharePoint/PnP-Provisioning-Schema

$cred = Get-Credential

> Connect-PnPOnline -url https://"yourtenant".sharepoint.com/sites/pnp-provisioning-demo –Credentials $cred

#apply Infrastructure and IA

> Apply-PnPProvisioningTemplate -Path .\templates\Provision.Infrastructure.xml

#add data, one handler at a time, lists then files (Assets)

> Apply-PnPProvisioningTemplate -Path .\templates\Provision.Data.xml -Handlers Lists

> Apply-PnPProvisioningTemplate -Path .\templates\Provision.Data.xml -Handlers Files

> Apply-PnPProvisioningTemplate -Path .\templates\Provision.CustomActions.xml -Parameters @{"InfrastructureSiteUrl"="https://"yourtenant".sharepoint.com/sites/pnp-provisioning-demo"}

> $alternateCssPath = "/sites/pnp-provisioning-demo/SiteAssets/pnp.provision.demo.css"
> $logoPath = "/sites/pnp-provisioning-demo/SiteAssets/ContosoNavLogo.png"

https://github.com/OfficeDev/PnP-PowerShell/blob/master/Documentation/SetSPOWeb.md

> Set-PnPWeb -AlternateCssUrl $alternateCssPath -SiteLogoUrl $logoPath

or

> $web = Get-PnPWeb
> $web.AlternateCssUrl = $alternateCssPath
> $web.SiteLogoUrl = $logoPath

- reset alt css and logo

> Set-PnPWeb -AlternateCssUrl "" -SiteLogoUrl ""

export provisioning template - https://github.com/SharePoint/PnP-PowerShell/blob/master/Documentation/GetPnPProvisioningTemplate.md
Cannot export files though

> Get-PnPProvisioningTemplate -Out template.xml -Handlers Lists, Files, CustomActions