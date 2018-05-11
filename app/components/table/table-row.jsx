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
    prepararChildren(columnas) {
        return React
            .Children
            .map(columnas, columna => {
                switch (columna.type.name) {
                    case 'BindColumn':
                        return React.cloneElement(columna, {
                            dato: this.props.registro[columna.props.dataField]
                        });
                    case 'TemplateColumn':
                        return React
                            .Children
                            .map(columna, templateColumna => {
                                return React.cloneElement(templateColumna, templateColumna.props, React.Children.map(templateColumna.props.children, itemTemplate => {
                                    if (itemTemplate.type.name === 'Enlace') {
                                        let {paramsField} = itemTemplate.props;
                                        var parametros = [];
                                        if (paramsField) {
                                            parametros = paramsField.map(parametro => {
                                                return {parametro, valor: this.props.registro[parametro]}
                                            });
                                        }
                                        return React.cloneElement(itemTemplate, {params: parametros})
                                    } else 
                                        return itemTemplate;
                                    }
                                ));
                            });
                }
            });
    }
    render() {
        let {type, columnas} = this.props;
        let fila = type == 'data'
            ? this.prepararChildren(columnas)
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