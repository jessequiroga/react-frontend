import React from 'react';
import TableBody from './TableBody.js'
import TableHeader from './TableHeader.js'
import TableDialog from './TableDialog.js'



export default class InstrumentTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            activeInstrument: {},
            headings: ["Tech record ID", "Name"],
            instruments: [],
        };
    }

    handleRowClick = (event) = (instrument) => {
        this.setState({modalOpen: true});
        this.setState({activeInstrument: instrument});
    };

    handleModalClose = () => {
        this.setState({modalOpen: false});
    };

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
                    <TableHeader headings={this.state.headings} />
                    <TableBody
                        instruments={this.state.instruments}
                        handleRowClick={this.handleRowClick}
                    />
                </table>
                <TableDialog
                    instrument={this.state.activeInstrument}
                    open={this.state.modalOpen}
                    handleClose={this.handleModalClose}
                />
            </div>
        )
    }
}
