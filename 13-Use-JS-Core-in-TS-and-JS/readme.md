#Demo 13 - Using JS Core Library in TypeScript and JavaScript

#Include PnP JS in TypeScript project

Thanks from https://vsamodelkin.wordpress.com/2017/05/27/visual-studio-pnp-js-core-gulp-webpack-starter-project/ for TypeScript bundling assistance

#Start with typescript solution using webpack for bundling

> cd typescript
> npm install
    
#install pnp js core

> npm install sp-pnp-js --save-dev

#review source app\typescript\sitedata.ts

> gulp serve

#use code

There is a script found in solution/templates/SiteAssets\sewp-ts-example.txt, copy the contents of this file into a script editor webpart on a page in a sp web page

#provision to sp

> cd solution

> $cred = Get-Credential
    
#provision

> .\PnP-Provision.ps1 -TargetSiteUrl "https://"yourtenant".sharepoint.com/sites/pnp-provisioning-demo" -Credentials $cred -ServeLocal $true
    
You should be able to load the page you added the SEWP now in a browser and look at the console log. If nothing appears, then ensure that bundle.js was loaded and debug if your SEWP was actually included.

#remove provisioning

> .\PnP-Provision-Disable.ps1 -TargetSiteUrl "https://"yourtenant".sharepoint.com/sites/pnp-provisioning-demo" -Credentials $cred



#Include PnP JS in JavaScript project

#Start with javascript solution, bundling not used for this demo

> cd javascript
> npm install
    
#install pnp js core

> npm install sp-pnp-js --save-dev

#review source app\javascript\sitedata.js

> gulp serve

#use code

There is a script found in solution/templates/SiteAssets\sewp-js-example.txt, copy the contents of this file into a script editor webpart on a page in a sp web page

#provision to sp

> cd solution

> $cred = Get-Credential
    
#provision

> .\PnP-Provision.ps1 -TargetSiteUrl "https://"yourtenant".sharepoint.com/sites/pnp-provisioning-demo" -Credentials $cred -ServeLocal $true
    
You should be able to load the page you added the SEWP now in a browser and look at the console log. If nothing appears, then ensure that custom.js was loaded and debug if your SEWP was actually included.

#remove provisioning

> .\PnP-Provision-Disable.ps1 -TargetSiteUrl "https://"yourtenant".sharepoint.com/sites/pnp-provisioning-demo" -Credentials $cred
