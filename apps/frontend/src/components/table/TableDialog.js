import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


export default class TableDialog extends React.Component {
    render() {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.props.handleClose}
            />
        ];

        return (
            <Dialog
                title="Dialog With Actions"
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.handleClose}
            >
                {Object.keys(this.props.instrument).map(key =>
                    key + ': ' + this.props.instrument[key] + ', '
                )}
            </Dialog>
        )
    }
}
