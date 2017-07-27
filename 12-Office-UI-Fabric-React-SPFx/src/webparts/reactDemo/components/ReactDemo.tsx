import * as React from 'react';
import { Dialog,
  DialogType,
  DialogFooter,
  Button, 
  ButtonType,
  ChoiceGroup } from 'office-ui-fabric-react';
import styles from './ReactDemo.module.scss';
import { IReactDemoProps } from './IReactDemoProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class ReactDemo extends React.Component<IReactDemoProps, any> {

  constructor() {
    super();

    
    this.state = {
      showDialog: false
    };
  }

  public render(): React.ReactElement<IReactDemoProps> {
    return (
      <div className="ms-Grid">
        <Button description='Opens the Sample Dialog' onClick={ this._showDialog.bind(this) }>Open Dialog</Button>

        <Dialog
          isOpen={ this.state.showDialog }
          type={ DialogType.normal }
          onDismiss={ this._closeDialog.bind(this) }
          title='All emails together'
          subText='Your Inbox has changed. No longer does it include favorites, it is a singular destination for your emails.'
          isBlocking={ false }
          containerClassName='ms-dialogMainOverride'
        >
          <ChoiceGroup
            options={ [
              {
                key: 'A',
                text: 'Option A'
              },
              {
                key: 'B',
                text: 'Option B',
                checked: true
              },
              {
                key: 'C',
                text: 'Option C',
                disabled: true
              }
            ] }
            onChanged={ this._onChoiceChanged }
          />
          { null /** You can also include null values as the result of conditionals */ }
          <DialogFooter>
            <Button buttonType={ ButtonType.primary } onClick={ this._closeDialog.bind(this) }>Save</Button>
            <Button onClick={ this._closeDialog.bind(this) }>Cancel</Button>
          </DialogFooter>
        </Dialog>

        <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-u-md12 ms-u-lg6 ms-u-xl3">
                <h1>Lorem ipsum dolor sit amet</h1> consectetur adipiscing elit. Quisque commodo justo a nisl hendrerit, nec auctor augue consequat. Morbi tincidunt aliquam mi. Donec luctus ex vel ipsum ornare ultricies. Donec laoreet quam eu velit tristique eleifend. Etiam quis velit eu nulla sodales lobortis a ut ex. Nulla facilisi. Vestibulum ipsum diam, egestas sed urna vitae, auctor molestie turpis. Sed blandit, diam a eleifend vestibulum, elit sem condimentum dui, a imperdiet dui nibh sit amet ligula.
            </div>
            <div className="ms-Grid-col ms-u-md12 ms-u-lg6 ms-u-xl3">
                <h1>Lorem ipsum dolor sit amet</h1> consectetur adipiscing elit. Proin id odio lacus. Mauris et ornare sem, in commodo felis. Maecenas commodo nisl ex, a ultricies nisl suscipit eu. Nulla mollis pulvinar nulla, vel cursus nisl suscipit sit amet. Sed leo lacus, facilisis eget mattis vitae, ornare nec massa. Duis enim dui, luctus vitae risus ac, tempus mattis nibh. Vestibulum ac augue sem. Nam scelerisque a ante nec mollis. Donec nibh neque, viverra vitae risus vehicula, rhoncus iaculis neque. Vivamus commodo consectetur lacus, quis elementum magna facilisis vel.
            </div>
            <div className="ms-Grid-col ms-u-md12 ms-u-lg6 ms-u-xl3">
                <h1>Lorem ipsum dolor sit amet</h1> consectetur adipiscing elit. Vivamus feugiat, magna eu mattis feugiat, justo purus faucibus diam, in cursus turpis turpis id eros. Nullam eget volutpat orci, at pulvinar arcu. In et velit pellentesque ante auctor sagittis eu sit amet tortor. Donec tellus lorem, ornare a quam nec, tempor molestie nibh. Donec venenatis nibh in mattis auctor. Praesent nec enim ultrices felis mollis euismod. Maecenas et felis sit amet massa dignissim gravida. Nullam nulla est, auctor sollicitudin turpis sed, consectetur imperdiet dolor. Morbi eget lobortis ligula. Nam facilisis tortor nec ipsum porttitor fringilla eu eu ex. Cras pharetra, leo non imperdiet convallis, magna leo suscipit orci, id finibus mauris nulla a nisl.
            </div>
            <div className="ms-Grid-col ms-u-md12 ms-u-lg6 ms-u-xl3">
                <h1>Lorem ipsum dolor sit amet</h1> consectetur adipiscing elit. Nullam consequat efficitur luctus. Aliquam erat volutpat. Sed cursus at purus et facilisis. Morbi volutpat dictum enim eget mattis. Vivamus orci velit, interdum eget dolor in, viverra cursus metus. Integer euismod, neque eu volutpat semper, sem nisl bibendum ipsum, quis laoreet urna dolor ut orci. In cursus fringilla sem nec ornare. Suspendisse ut lacinia lacus. Maecenas maximus a leo ac iaculis. Sed auctor interdum fermentum.
            </div>
        </div>
    </div>
    );
  }

  private _showDialog() {
    this.setState({ showDialog: true });
  }

  private _closeDialog() {
    this.setState({ showDialog: false });
  }

  private _onChoiceChanged() {
    console.log('Choice option change');
  }
}
