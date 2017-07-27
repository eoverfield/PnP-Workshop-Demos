#Demo 4 - Even More PnP PowerShell

#Run in powershell as local admin

Review what, if anything, is installed

>Get-Module SharePointPnPPowerShell* -ListAvailable | Select-Object Name,Version | Sort-Object Version –Descending

Install PnP Powershell commendlets for SPO

> Install-Module SharePointPnPPowerShellOnline -AllowClobber

Update all latest PnP PS commandlets
> Update-Module SharePointPnPPowerShell*

Remove a specific version if needed

> Get-InstalledModule -Name "SharePointPnPPowerShell2016" -RequiredVersion 2.11.1701.1 | Uninstall-Module

#Connect to a site

> Connect-PnPOnline -url https://"yourtenant".sharepoint.com/sites/pnp-demo –Credentials (Get-Credential)

or
> $cred = Get-Credential
> Connect-PnPOnline -url https://pixelmilldev1.sharepoint.com/sites/pnp-demo –Credentials $cred
	
# get all lists

> Get-PnPList

#get all pnp commands currently available

> Get-Command -Module *PnP*

# get help on a specific command

> Get-Help Connect-PnPOnline –Detailed


#create a test list / library, get a reference to it, update it, remove it

#Create a list

listemplatetypes:  https://msdn.microsoft.com/en-us/library/microsoft.sharepoint.client.listtemplatetype.aspx

> New-PnPList -Title "Test List" -Template "DocumentLibrary"

#get the list

> $list = Get-PnPList -Identity "Test List"

#view all methods and properties of list

> $list | get-member

#display a property
> $list.Title

#now update a property

> Set-PnPList -Identity "Test List" -Title "Test List Updated"

#finally remove list

> Remove-PnPList -Identity "Test List"

or

> Remove-PnPList $list
