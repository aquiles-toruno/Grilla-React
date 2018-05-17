import React from 'react';
import BindColumn from './bind-column';

const propTypes = {
    type: React
        .PropTypes
        .oneOf(['data', 'header']),
    columnas: React
        .PropTypes
        .arrayOf(React.PropTypes.object)
        .isRequired,
    registro: React.PropTypes.object
}

class TableRow extends React.Component {
    prepararChildren() {
        return React
            .Children
            .map(this.props.columnas, columna => {
                switch (columna.type.name) {
                    case 'BindColumn':
                        return React.cloneElement(columna, {
                            dato: this.props.registro[columna.props.dataField]
                        });
                    case 'TemplateColumn':
                        return columna;
                }
            });
    }
    render() {
        let {type, columnas} = this.props;
        let fila = type == 'data'
            ? this.prepararChildren()
            : columnas.map((columna, indice) => {
                return <th key={indice}>{columna.props.headerText}</th>
            })
        return <tr>
            {fila}
        </tr>
    }
}

TableRow.propTypes = propTypes;

export default TableRow;