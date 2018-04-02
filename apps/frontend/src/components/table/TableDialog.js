import React from 'react';
import Dialog from 'material-ui/Dialog';
import Button from 'material-ui/Button';


export default class TableDialog extends React.Component {
    render() {
        const actions = [
            <Button variant="raised" color="primary" onClick={this.props.handleClose}>
                Close
            </Button>
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
