import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import InstrumentTable from './components/InstrumentTable';

import './index.css';

const App = () => (
  <MuiThemeProvider>
    <InstrumentTable />
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
