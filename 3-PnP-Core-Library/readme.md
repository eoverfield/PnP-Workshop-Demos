#Demo 3 - Pnp Core Component - Nuget - Samples and more

#Create new console application: "CreateContentTypeDemo"

look for nuget:  – set up: https://www.youtube.com/watch?v=W-HzEnjDZwU
    Tools->NuGet Package Manager->Manage NuGet Packages for Solutions
    Search for PnP - find SharePointPnPCore"Online" - select for "project" and install - will take a few minutes
		
#Migrate over create content type code:
	https://github.com/SharePoint/PnP/tree/master/Samples/Core.CreateContentTypes - http://www.youtube.com/watch?v=w7i0gkqxzfg
    open E:\Datastore\Git Projects\GitHub\PnPWorkshop\3-PnP-Core-Library\Core.CreateContentTypes\Core.CreateContentTypes\program.cs to get code to migrate
    F5 to run - provide url and credentials
    Look at function such as "CreateContentTypeIfDoesNotExist" - F12
	

#Remote timer:

https://github.com/SharePoint/PnP/tree/master/Samples/Core.SimpleTimerJob
https://www.youtube.com/watch?v=nzL6jCv0dKQ - https://channel9.msdn.com/Blogs/Office-365-Dev/Simple-remote-timer-job-that-interacts-with-SharePoint-Online-Office-365-Developer-Patterns-and-Prac

Will be pulling code from Core.SimpleTimerJob

mkdir "TimerJobDemo"

#Create new SharePoint Add-in

In VS, create SP App in TimerJobDemo folder "TimerJobWeb"
Form app ok, all we really care about is client id and secret

Open "\Core.SimpleTimerJob\Core.SimpleTimerJob\AppManifest.xml" in code, copy <AppPermissionRequests /> to new TimerJobDemo/../AppManafest.xml"
Copy all <title /> and all in <form /> from Core.SimpleTimerJob\Core.SimpleTimerJobWeb\Pages\default.aspx to new TimerJobDemo/../pages/default.aspx
    
F5 to run. Will install App, ok through to process

verify app is found host web

Copy \Core.SimpleTimerJob\Core.SimpleTimerJob.Console" with .sln file too into TimerJobDemo folder
update url, clientid and secret in console app.config from add-in web.config (updated each time add-in loaded)
F5 to run console app

Should load RemoteOperation list in browser, new entry each time console app ran

Could schedule console app as Azure webjob, local cronjob or schedule tasks