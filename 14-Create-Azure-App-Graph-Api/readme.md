#Demo 14 - Create an Azure Application for Graph API access

 
 https://portal.azure.com/
    
Azure Active Directory
-> App Registrations
-> New Application Registration

#creating sample app:

Name: GraphAPI_Testing
App Type: Web app / API
sign-on url: https://"yourtenant".sharepoint.com/

sign-on url used to allow people to sign into app, but for graph access, we really don't need this.

#Required Permissions - customize to fit:

#keys - secret

Name: GraphKey
duration: whatever
    
#reply urls possibly
    
found best to include primary tenant url:
https://"yourtenant".sharepoint.com/

otherwise might get an invalid reply url error

#add new API - Microsoft Graph 

confirm permissions - https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/group_list_memberof
Review Prerequisites

#Enable Implicit Flow

find "Manifest" under main app card:
oauth2AllowImplicitFlow to true
Save

#grant permissions on required permissions panel

#consider

update permissions as needed by endpoints you intend to work with

#Graph - Delegate - "Read all groups", "Sign in and read user profile"