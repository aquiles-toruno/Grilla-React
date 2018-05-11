import React from 'react';
import TableRow from './table-row';

const propTypes = {
    columnas: React
        .PropTypes
        .arrayOf(React.PropTypes.object)
        .isRequired
}

class TableHeader extends React.Component {
    render() {
        return (
            <thead>
                <TableRow type='header' columnas={this.props.columnas}/>
            </thead>
        );
    }
}

TableHeader.propTypes = propTypes;

export default TableHeader;