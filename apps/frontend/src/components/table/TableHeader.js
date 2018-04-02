import React from 'react';


function TableHeadRowCell(props) {
    return <th>{props.heading}</th>
}

export default function TableHeader(props) {
    return (
        <thead className="review-table-head">
            <tr className="review-table-head-row">
                {props.headings.map(function(heading, i) {
                    return <TableHeadRowCell key={i} heading={heading}/>
                })}
            </tr>
        </thead>
    )
}
