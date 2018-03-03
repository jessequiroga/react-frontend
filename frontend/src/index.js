import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

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

class InstrumentDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          The actions in this window were passed in as an array of React objects.
        </Dialog>
      </div>
    );
  }
}

class InstrumentTableBodyRow extends React.Component {
  handleClick() {
    this.props.modal_open=true
    this.props.acitve_instrument=this.props.instrument
  }
  render() {
    return (
      <tr className="review-table-body-row" onClick={() => this.handleClick()}>
        <InstrumentTableBodyRowStatusCell status={this.props.instrument.status} />
        {this.props.instrument.fields.map(function(field, i) {
          return <InstrumentTableBodyRowCell key={i} field={field}/>
        })}
      </tr>
    )
  }
}

function InstrumentTableBody(props) {
  return (
    <tbody className="review-table-body">
      {props.instruments.map(function(instrument, i) {
        return <InstrumentTableBodyRow
          key={i}
          instrument={instrument}
          modal_open={props.modal_open}
          acitve_instrument={props.acitve_instrument}
        />
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
        {props.headings.map(function(heading, i) {
          return <InstrumentTableHeadRowCell key={i} heading={heading}/>
        })}
      </tr>
    </thead>
  )
}

class InstrumentTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      acitve_instrument: false,
      modal_open: false,
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
      <div>
        <table className="review-table">
          <InstrumentTableHead
              headings={this.state.report.headings}
          />
          <InstrumentTableBody
            instruments={this.state.report.instruments}
            modal_open={this.state.modal_open}
            acitve_instrument={this.state.acitve_instrument}
            onClick={(i) => this.handleClick(i)}
          />
        </table>
        <InstrumentDialog
          modal_open={this.state.modal_open}
          acitve_instrument={this.state.acitve_instrument}
        />
      </div>
    )
  }
}

ReactDOM.render(
  <InstrumentTable />,
  document.getElementById('root')
);
