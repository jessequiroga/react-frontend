import React from 'react';
import {Card, CardContent} from 'material-ui/Card';




export default class PaginationControls extends React.Component {
    state = {
        pageId: 1
    }
    handlePageChange = (event, index, value) => {
        console.log(event, index, value);
        // this.setState({fooBar: value})
        // this.props.handlePageChange(pageId);
    }

    render() {
        return (
            <Card>
                <Button className="graph-card-action-previous" onClick={this.handlePreviousClick} variant="raised" color="primary" size="small">
                    Previous
                </Button>
                <Button className="graph-card-action-next" onClick={this.handleNextClick} variant="raised" color="primary" size="small">
                    Next
                </Button>
            </Card>
        )
    }

}
