import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


function TableBodyRowCell(props) {
    return <td>{props.field}</td>
}

class TableBodyRow extends React.Component {
    handleClick = () => {
        this.props.handleRowClick(this.props.instrument);
    }

    render() {
        return (
            <tr className="review-table-body-row" onClick={this.handleClick}>
                {Object.keys(this.props.instrument).map(key =>
                    <TableBodyRowCell key={key} field={this.props.instrument[key]}/>
                )}
            </tr>
        );
    }
}

export default function TableBody(props) {
    return (
        <tbody className="review-table-body">
            {Object.keys(props.instruments).map(key =>
                <TableBodyRow
                    key={key}
                    instrument={props.instruments[key]}
                    handleRowClick={props.handleRowClick}
                />
            )}
        </tbody>
    )
}
