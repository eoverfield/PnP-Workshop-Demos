#Demo 7 - Provisioning resources and tokens

tokens: https://github.com/SharePoint/PnP-Sites-Core/blob/master/Core/ProvisioningEngineTokens.md

#Create a .resx Resource file in VS

Review TemplateResource-en.resx found in ProvisionTemplate/templates folder

#Token replacement

review \7-PnP-Provisioning-Tokens\ProvisionTemplate\templates\Provision.Data.xml

review <pnp:DataRows> found in <pnp:Lists> to see token replacement - could be used say to store settings about how/when this was all set up
      
> $cred = Get-Credential
    
#provision

> .\PnP-Provision.ps1 -TargetWebUrl "https://"yourtenant".sharepoint.com/sites/pnp-provisioning-demo" -Credentials $cred
    
#remove provisioning

> .\PnP-Provision-Disable.ps1 -TargetWebUrl "https://"yourtenant".sharepoint.com/sites/pnp-provisioning-demo" -Credentials $cred