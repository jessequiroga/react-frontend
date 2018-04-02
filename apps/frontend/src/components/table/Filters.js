import React from 'react';
import Card from 'material-ui/Card';
import {FormControl} from 'material-ui/Form';
import {InputLabel} from 'material-ui/Input';
import {MenuItem} from 'material-ui/Menu';
import Select from 'material-ui/Select';
import {withStyles} from 'material-ui/styles';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});


export default withStyles(styles)(class Filters extends React.Component {
    state = {
        fooBar: ''
    }
    handleFooBarChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.props.handleFilterChange('fooBar', event.target.value);
    };


    render() {
        const { classes } = this.props;

        return (
            <Card>
                <form autoComplete="off">
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="fooBar">FooBar</InputLabel>
                        <Select
                            value={this.state.fooBar}
                            onChange={this.handleFooBarChange}
                            inputProps={{
                                name: 'fooBar',
                                id: 'fooBar',
                            }}

                        >
                            <MenuItem value="all">FooBar</MenuItem>
                            <MenuItem value="foo">Foo</MenuItem>
                            <MenuItem value="bar">Bar</MenuItem>
                        </Select>
                    </FormControl>
                </form>
            </Card>
        )
    }

})
