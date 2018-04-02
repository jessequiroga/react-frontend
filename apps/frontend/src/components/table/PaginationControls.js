import React from 'react';
import {Card, CardContent} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';



export default class PaginationControls extends React.Component {
    state = {
        fooBar: ''
    }
    handleFooBarChange = (event, index, value) => {
        this.setState({fooBar: value})
        this.props.handlePaginationChange('fooBar', value);
    }

    render() {
        return (
            <Card>
                <SelectField
                    floatingLabelText="Foo/Bar"
                    value={this.state.fooBar}
                    onChange={this.handleFooBarChange}
                >
                    <MenuItem value="foo" primaryText="Foo" />
                    <MenuItem value="bar" primaryText="Bar" />
                </SelectField>
            </Card>
        )
    }

}
