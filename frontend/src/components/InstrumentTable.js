import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

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
},{
    "status": "acpt",
    "fields": [
        {
            "id": "tec_id",
            "label": "Tech record ID",
            "description": "",
            "value": "123-123",
        },
        {
            "id": "name",
            "label": "Name",
            "description": "123 name",
            "value": "Second",
        },
    ],
    "errors": [
        {"id": "AAA-10", "desc": "Whoops"},
        {"id": "ZZZ-10", "desc": "Another oops"},
    ],
}]

function InstrumentTableBodyRowCell(props) {
  return <td>{props.field.value}</td>
}

function InstrumentTableBodyRowStatusCell(props) {
  return <td className={"review-table-body-row-field-status-" + props.status}></td>
}

function InstrumentTableBodyRow(props) {
  return (
    <tr className="review-table-body-row" onClick={(i) => props.trHandler(props.index)}>
      <InstrumentTableBodyRowStatusCell status={props.instrument.status} />
      {props.instrument.fields.map(function(field, i) {
        return <InstrumentTableBodyRowCell key={i} field={field}/>
      })}
    </tr>
  )
}

function InstrumentTableBody(props) {
  return (
    <tbody className="review-table-body">
      {props.instruments.map(function(instrument, i) {
        return <InstrumentTableBodyRow key={i} index={i} instrument={instrument} trHandler={props.trHandler}/>
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
      activeInstrument: null,
      report: {
        headings: ["Tech record ID", "Name"],
        instruments: instruments_json,
      },
    };

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(index) {
    // Sets the active insturment for the modal, and triggers modal
    const instrument = this.state.report.instruments[index];
    this.state.activeInstrument = instrument;
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
            acitve_instrument={this.state.acitve_instrument}
            trHandler={this.handleClick}
          />
        </table>
      </div>
    )
  }
}
