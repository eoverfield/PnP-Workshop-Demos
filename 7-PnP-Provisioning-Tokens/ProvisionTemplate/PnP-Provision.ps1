<#
.REQUIREMENTS
Requires PnP-PowerShell version 2.12.1702.0 or later
https://github.com/OfficeDev/PnP-PowerShell/releasess

.SYNOPSIS
Upload Assets, set Alternative CSS and a custom logo

.EXAMPLE
PS C:\> .\PnP-Provision.ps1 -TargetWebUrl "https://intranet.mydomain.com/sites/targetSite" 

.EXAMPLE
PS C:\> $creds = Get-Credential
PS C:\> .\PnP-Provision.ps1 -TargetWebUrl "https://intranet.mydomain.com/sites/targetSite" -Credentials $creds
#>

[CmdletBinding()]
param
(
    [Parameter(Mandatory = $true, HelpMessage="Enter the URL of the target web, e.g. 'https://intranet.mydomain.com/sites/targetWeb'")]
    [String]
    $targetWebUrl,

	[Parameter(Mandatory = $false, HelpMessage="Enter the URL of the target asset location, i.e. site collection root web, e.g. 'https://intranet.mydomain.com/sites/targetWeb'")]
    [String]
    $targetSiteUrl,

    [Parameter(Mandatory = $false, HelpMessage="Optional administration credentials")]
    [PSCredential]
    $Credentials
)

if($Credentials -eq $null)
{
	$Credentials = Get-Credential -Message "Enter Admin Credentials"
}
if ($targetSiteUrl -eq "")
{
    $targetSiteUrl = $targetWebUrl
}

Write-Host -ForegroundColor White "--------------------------------------------------------"
Write-Host -ForegroundColor White "|                  PnP Provision Demo                  |"
Write-Host -ForegroundColor White "--------------------------------------------------------"
Write-Host ""
Write-Host -ForegroundColor Green "Target web: $($targetWebUrl)"
Write-Host -ForegroundColor Green "Target asset location : $($targetSiteUrl)"
Write-Host ""

try
{
	#Set default variables values
	$rootPath = $targetSiteUrl.Substring($targetSiteUrl.IndexOf('/',8))
	$alternateCssPath = "/SiteAssets/pnp.provision.demo.css"
	$logoPath = "/SiteAssets/ContosoNavLogo.png"

	#connent to site
	Connect-PnPOnline $targetSiteUrl -Credentials $Credentials

	Write-Host -ForegroundColor White "Provisioning asset files to $($targetSiteUrl)"

	#split out into many files and many calls for demo purposes
	#Valid Handlers - https://github.com/SharePoint/PnP-Sites-Core/blob/master/Core/OfficeDevPnP.Core/Framework/Provisioning/Model/Handlers.cs
	Apply-PnPProvisioningTemplate -Path .\templates\Provision.Infrastructure.xml -Handlers Files
	Write-Host ""
	Write-Host -ForegroundColor Green "Infrastructure Provisioned"

	Apply-PnPProvisioningTemplate -Path .\templates\Provision.Data.xml -Handlers Lists
	Write-Host ""
	Write-Host -ForegroundColor Green "Data Provisioned"

	Apply-PnPProvisioningTemplate -Path .\templates\Provision.Data.xml -Handlers Files
	Write-Host ""
	Write-Host -ForegroundColor Green "Assets Provisioned"

	#If the asset and target locations are different, then open up the target web now
	if($targetSiteUrl -ne $targetWebUrl)
	{	
		Disconnect-PnPOnline
		Connect-PnPOnline $targetWebUrl -Credentials $Credentials
	}

	#now set the alternative css and logo urls
	$altCssUrl = "$($rootPath)$($alternateCssPath)"
	$logoUrl = "$($rootPath)$($logoPath)"

	Write-Host -ForegroundColor White "Setting alternative css to $($altCssUrl)"

    #https://github.com/OfficeDev/PnP-PowerShell/blob/master/Documentation/SetSPOWeb.md
	Set-PnPWeb -AlternateCssUrl $altCssUrl -SiteLogoUrl $logoUrl


	#Embed JavaScript using custom action
	Write-Host ""
	Write-Host -ForegroundColor White "Setting Custom Action to Embed JavaScript"

	Apply-PnPProvisioningTemplate -Path .\templates\Provision.CustomActions.xml -Handlers CustomActions,Features -Parameters @{"InfrastructureSiteUrl"=$rootPath}

	Write-Host ""
	Write-Host -ForegroundColor Green "PnP Provision Demo Completed"
}
catch
{
    Write-Host -ForegroundColor Red "Exception occurred!" 
    Write-Host -ForegroundColor Red "Exception Type: $($_.Exception.GetType().FullName)"
    Write-Host -ForegroundColor Red "Exception Message: $($_.Exception.Message)"
}