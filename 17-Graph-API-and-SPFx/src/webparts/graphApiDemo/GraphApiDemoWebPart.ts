import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

//added next two lines
import { GraphHttpClient, GraphClientResponse, IGraphHttpClientOptions } from '@microsoft/sp-http';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';

import * as strings from 'graphApiDemoStrings';
import GraphApiDemo from './components/GraphApiDemo';
import { IGraphApiDemoProps } from './components/IGraphApiDemoProps';
import { IGraphApiDemoWebPartProps } from './IGraphApiDemoWebPartProps';

export default class GraphApiDemoWebPart extends BaseClientSideWebPart<IGraphApiDemoWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IGraphApiDemoProps > = React.createElement(
      GraphApiDemo,
      {
        description: this.properties.description
      }
    );

    //access Graph API native in SPFx, but currenlty only in dev preview, using a preview and beta endpoints for group readwrite and report read
    /*
    Group operations: https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/resources/group
    Add favorite
    Add member
    Add owner
    Check member groups
    Create group
    Delete group
    Get group
    Get member groups
    Get member objects
    List groups
    List member of
    List members
    List owners
    Update group
    Remove favorite
    Remove member
    Remove owner
    Reset unseen count
    Subscribe by mail
    Unsubscribe by mail
    */
    
    //look to see about using graph api
    if (!DEBUG || (Environment.type !== EnvironmentType.Local)) {
      console.log("try to get graph data");

      this.context.graphHttpClient.get("v1.0/groups?$select=displayName", GraphHttpClient.configurations.v1)
        .then((response: GraphClientResponse): Promise<any> => {
          return response.json();
        })
        .then((data: any): void => {
          console.log("group data returned:");
          console.log(data);
        });
      
      //create the body we want to send to create a group
      //this could just be a json var, stringified
      const graphOptions: IGraphHttpClientOptions = {
        body: `{
          "displayName": "Demo Group 1",
          "description": "A demo group",
          "groupTypes": [
            "Unified"
            ],
            "mailEnabled": true,
            "mailNickname": "DemoGroup1",
            "securityEnabled": false
          }`
      };
      
      //post the request to groups endpoint to create a group
      this.context.graphHttpClient.post("v1.0/groups", GraphHttpClient.configurations.v1, graphOptions)
        .then((response: GraphClientResponse): Promise<any> => {
          return response.json();
        })
        .then((data: any): void => {
          console.log("data returned:");
          console.log(data);
        });


      
      /*
      reports
      Report operations: https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/resources/report
      Get EmailAppUsage report
      Get EmailActivity report
      Get MailboxUsage report
      Get Office365ActiveUsers report
      Get Office365GroupsActivity report
      Get Office365Activations report
      Get OneDriveUsage report
      Get OneDriveActivity report
      Get SfbDeviceUsage report
      Get SfbOrganizerActivity report
      Get SfbP2PActivity report
      Get SfbParticipantActivity report
      Get SfbActivity report
      Get SharePointSiteUsage report
      Get SharePointActivity report
      Get YammerDeviceUsage report
      Get YammerActivity report
      */

      this.context.graphHttpClient.get("beta/reports/Office365ActiveUsers(view='Detail', period='d7')/content", GraphHttpClient.configurations.v1)
        .then((response: GraphClientResponse): void => {
          if (response.status == 200 && response.url) {
            console.log("Report generated");
            console.log(response.url);
          }
          else {
            console.log("error generating report: " + response.status);
          }
        });

    }
    //end graph api demo


    //want more grpah access? use Adal, not overly easy.
    //https://dev.office.com/sharepoint/docs/spfx/web-parts/guidance/call-microsoft-graph-from-your-web-part


    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
