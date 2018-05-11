import React from 'react';
import TableRow from './table-row';

const propTypes = {
    data: React
        .PropTypes
        .arrayOf(React.PropTypes.object)
        .isRequired,
    columnas: React
        .PropTypes
        .arrayOf(React.PropTypes.object)
        .isRequired
}

class TableBody extends React.Component {
    render() {
        return <tbody>
            {this
                .props
                .data
                .map((registro, indice) => {
                    return <TableRow
                        type='data'
                        registro={registro}
                        key={indice}
                        columnas={this.props.columnas}/>
                })
}
        </tbody>
    }
}

TableBody.propTypes = propTypes;

export default TableBody;