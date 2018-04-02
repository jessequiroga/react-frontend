import React from 'react';
import TableBody from './TableBody.js'
import TableHeader from './TableHeader.js'
import TableDialog from './TableDialog.js'



export default class InstrumentTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            pageId: 1,
            activeInstrument: {},
            headings: ["Tech record ID", "Name", "foo/bar"],
            instruments: [],
            paginatedInstruments: [],
        };
    }

    handleRowClick = (event) = (instrument) => {
        this.setState({modalOpen: true});
        this.setState({activeInstrument: instrument});
    };

    handleModalClose = () => {
        this.setState({modalOpen: false});
    };

    handlePageChange = (event) = (pageId) => {
        let limit = 20;
        let bottomIndex = (pageId - 1) * limit;
        let topIndex = bottomIndex + limit;
        let instruments = this.state.instruments

        let subKeys = Object.keys(instruments).slice(bottomIndex, topIndex);

        let paginatedInstruments = {};
        subKeys.forEach(function(key) {
            console.log(key);
            paginatedInstruments[key] = instruments[key];
        });

        this.setState({paginatedInstruments: paginatedInstruments});
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
                    this.handlePageChange(1);
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
                        instruments={this.state.paginatedInstruments}
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
