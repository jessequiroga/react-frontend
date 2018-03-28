import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


var instruments_json = [];

function InstrumentTableBodyRowCell(props) {
    return <td>{props.field.value}</td>
}

function InstrumentTableBodyRowStatusCell(props) {
    return <td className={"review-table-body-row-field-status-" + props.status}></td>
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
                    <InstrumentTableBodyRowStatusCell status={this.props.instrument.status} />
                    {this.props.instrument.fields.map(function(field, i) {
                        return <InstrumentTableBodyRowCell key={i} field={field}/>
                    })}
                    <Dialog
                        title="Dialog With Actions"
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                    >
                        The actions in this window were passed in as an array of React objects.
                    </Dialog>
                </tr>
        );
    }
}

function InstrumentTableBody(props) {
    return (
        <tbody className="review-table-body">
            {props.instruments.map(function(instrument, i) {
                return <InstrumentTableBodyRow key={i} instrument={instrument}/>
            })}
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
                <th></th>
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
            report: {
                headings: ["Tech record ID", "Name"],
                instruments: instruments_json,
            },
        };
    }

    loadTrades = () => {
        return fetch('http://localhost:8080')
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then((response) => {
                console.log(response);
                // let chartData = {};
                // response.trades.map(function(field) {
                //     chartData[field.file_time] = {
                //         file_time: field.file_time,
                //         trades: field.count,
                //     }
                //     if (field.count) {
                //         chartData[field.file_time]['no_messages'] = 0;
                //     } else {
                //         chartData[field.file_time]['no_messages'] = 1;
                //     }
                // })
                // this.setState({chartData: chartData});
                // this.setState({reportingStart: response.reporting_start});
                // this.setState({reportingEnd: response.reporting_end});
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
                    <InstrumentTableHead
                            headings={this.state.report.headings}
                    />
                    <InstrumentTableBody
                        instruments={this.state.report.instruments}
                    />
                </table>
            </div>
        )
    }
}
