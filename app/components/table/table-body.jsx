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
        .isRequired,
    onRowDataBound: React.PropTypes.func
}

class TableBody extends React.Component {
    constructor(props) {
        super();
        this.registro = null;
    }
    getColumns() {
        let columnas = this.props.columnas;
        if (this.props.onRowDataBound) {
            columnas = this
                .props
                .onRowDataBound(this.registro, this.props.columnas);
        }

        return columnas;
    }
    renderTableRow() {
        return this
            .props
            .data
            .map((registro, indice) => {
                {
                    this.registro = {
                        ...registro
                    };
                    return <TableRow
                            type='data'
                            registro={registro}
                            key={indice}
                            columnas={this.getColumns()}/>
                }
            });
    }
    render() {
        return <tbody>
            {this.renderTableRow()}
        </tbody>
    }
}

TableBody.propTypes = propTypes;

export default TableBody;