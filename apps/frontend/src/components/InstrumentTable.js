import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


function InstrumentTableBodyRowCell(props) {
    return <td>{props.field}</td>
}

class InstrumentTableBodyRow extends React.Component {
    state = {open: false};

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.handleClose}
            />
        ];

        return (
            <tr className="review-table-body-row" onClick={this.handleOpen}>
                {Object.keys(this.props.instrument).map(key =>
                    <InstrumentTableBodyRowCell key={key} field={this.props.instrument[key]}/>
                )}
                <Dialog
                    title="Dialog With Actions"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    {Object.keys(this.props.instrument).map(key =>
                        key + ': ' + this.props.instrument[key] + ', '
                    )}
                </Dialog>
            </tr>
        );
    }
}

function InstrumentTableBody(props) {
    return (
        <tbody className="review-table-body">
            {Object.keys(props.instruments).map(key =>
                <InstrumentTableBodyRow key={key} instrument={props.instruments[key]}/>
            )}
        </tbody>
    )
}

function InstrumentTableHeadRowCell(props) {
    return <th>{props.heading}</th>
}

function InstrumentTableHead(props) {
    return (
        <thead className="review-table-head">
            <tr className="review-table-head-row">
                {props.headings.map(function(heading, i) {
                    return <InstrumentTableHeadRowCell key={i} heading={heading}/>
                })}
            </tr>
        </thead>
    )
}

export default class InstrumentTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalActive: false,
            activeInstrument: null,
            headings: ["Tech record ID", "Name"],
            instruments: [],
        };
    }

    loadTrades = () => {
        return fetch('/api')
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then((response) => {
                if (response.status === 'ok') {
                    this.setState({instruments: response.data});
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount() {
        this.loadTrades();
    }

    render() {
        return (
            <div>
                <table className="review-table">
                    <InstrumentTableHead headings={this.state.headings} />
                    <InstrumentTableBody instruments={this.state.instruments} />
                </table>
            </div>
        )
    }
}
