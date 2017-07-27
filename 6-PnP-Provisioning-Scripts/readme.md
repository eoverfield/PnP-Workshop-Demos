#Demo 6 - PnP Provisioning with scripts
    
>$cred = Get-Credential

run the following two commands from the folder that holds PnP-Provision.ps1 and PnP-Provision-Disable.ps1
    
#provision

> .\PnP-Provision.ps1 -TargetWebUrl "https://"yourtenant".sharepoint.com/sites/pnp-provisioning-demo" -Credentials $cred
    
#remove provisioning

> .\PnP-Provision-Disable.ps1 -TargetWebUrl "https://"yourtenant".sharepoint.com/sites/pnp-provisioning-demo" -Credentials $cred