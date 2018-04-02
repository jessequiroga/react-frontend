import React from 'react';
import Card from 'material-ui/Card';
import Table, {
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from 'material-ui/Table';

import PaginationControls from './PaginationControls.js'
import Filters from './Filters.js'
import TableDialog from './TableDialog.js'


class TableBodyRow extends React.Component {
    handleClick = () => {
        this.props.handleRowClick(this.props.instrument);
    }

    render() {
        return (
            <TableRow className="review-table-body-row" onClick={this.handleClick}>
                {Object.keys(this.props.instrument).map(key =>
                    <TableCell key={key} >{this.props.instrument[key]}</TableCell>
                )}
            </TableRow>
        );
    }
}


export default class InstrumentTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            pageId: 1,
            activeInstrument: {},
            headings: ["Tech record ID", "Name", "foo/bar"],
            instruments: {},
            filteredInstruments: {},
            paginatedInstruments: {},
        };
    }

    handleRowClick = (event) = (instrument) => {
        this.setState({modalOpen: true});
        this.setState({activeInstrument: instrument});
    };

    handleModalClose = () => {
        this.setState({modalOpen: false});
    };

    handleFilterChange = (event) = (filter, value) => {
        let instruments = this.state.instruments;
        let filteredInstruments = {}
        if (filter === 'fooBar') {
            if (value === 'all') {
                filteredInstruments = instruments;
            } else {
                Object.keys(instruments).forEach(function(key) {
                    if (instruments[key].field_3 === value) {
                        filteredInstruments[key] = instruments[key];
                    }
                });
            }
        }
        this.setState({filteredInstruments: filteredInstruments}, () => {
            this.handlePageChange(1);
        });
    };

    handlePageChange = (event) = (pageId) => {
        let limit = 10;
        let bottomIndex = (pageId - 1) * limit;
        let topIndex = bottomIndex + limit;
        let instruments = this.state.filteredInstruments;

        let subKeys = Object.keys(instruments).slice(bottomIndex, topIndex);

        let paginatedInstruments = {};
        subKeys.forEach(function(key) {
            paginatedInstruments[key] = instruments[key];
        });

        this.setState({paginatedInstruments: paginatedInstruments});
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
                    this.setState({filteredInstruments: response.data}, () => {
                        this.handlePageChange(1);
                    });
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
                <Card>
                    <Table className="review-table">
                        <TableHead className="review-table-head">
                            <TableRow className="review-table-head-row">
                                {this.state.headings.map(function(heading, i) {
                                    return <TableCell key={i} >{heading}</TableCell>
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody className="review-table-body">
                            {Object.keys(this.state.paginatedInstruments).map(key =>
                                <TableBodyRow
                                    key={key}
                                    instrument={this.state.instruments[key]}
                                    handleRowClick={this.handleRowClick}
                                />
                            )}
                        </TableBody>
                    </Table>
                </Card>

                <Filters handleFilterChange={this.handleFilterChange}/>

                <TableDialog
                    instrument={this.state.activeInstrument}
                    open={this.state.modalOpen}
                    handleClose={this.handleModalClose}
                />
            </div>
        )
    }
}
