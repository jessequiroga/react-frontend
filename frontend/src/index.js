import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// eslint-disable-next-line
var instruments_json = [{
    "status": "acpt",
    "fields": [
        {
            "id": "tec_id",
            "label": "Tech record ID",
            "description": "",
            "value": "AS124124E32-ASDFASDFA",
        },
        {
            "id": "name",
            "label": "Name",
            "description": "Instrument name",
            "value": "First",
        },
    ],
    "errors": [
        {"id": "AAA-10", "desc": "Whoops"},
        {"id": "ZZZ-10", "desc": "Another oops"},
    ],
}]

function InstrumentTableBodyRowCell(props) {
  return (
      <td
        className="review-table-body-row-field review-table-body-row-field-{props.field.field_type}"
      >
        {props.field.value}
      </td>
    )
}

function InstrumentTableBodyRowStatusCell(props) {
  return <td className="review-table-body-row-field-status-{props.status}"></td>
}

function InstrumentTableBodyRow(props) {
  return (
    <tr className="review-table-body-row">
      <InstrumentTableBodyRowStatusCell status={props.instrument.status} />
      {props.instrument.fields.map(function(field, key) {
        return <InstrumentTableBodyRowCell field={field}/>
      })}
    </tr>
  )
}

function InstrumentTableBody(props) {
  return (
    <tbody className="review-table-body">
      {props.instruments.map(function(instrument, key) {
        return <InstrumentTableBodyRow instrument={instrument} />
      })}
    </tbody>
  )
}

function InstrumentTableHeadRowCell(props) {
  return (
    <th className="review-table-head-row-column review-table-head-row-heading-{{props.field_type}}">
      <span>{props.heading}</span>
    </th>
  )
}

function InstrumentTableHead(props) {
  return (
    <thead className="review-table-head">
      <tr className="review-table-head-row">
        <th></th>
        {props.headings.map(function(heading, key) {
          return <InstrumentTableHeadRowCell heading={heading}/>
        })}
      </tr>
    </thead>
  )
}

class InstrumentTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      report: {
        headings: ["Tech record ID", "Name"],
        instruments: instruments_json,
      },
    };
  }

  handleClick(i) {
    // Sets the active insturment for the modal, and triggers modal
    const instruments = this.state.report.instruments.slice();
    this.setState({activeInstrument: instruments[i]})
  }

  render() {
    return (
      <table className="review-table">
        <InstrumentTableHead
            headings={this.state.report.headings}
        />
        <InstrumentTableBody
          instruments={this.state.report.instruments}
          onClick={(i) => this.handleClick(i)}
        />
      </table>
    )
  }
}

ReactDOM.render(
  <InstrumentTable />,
  document.getElementById('root')
);
