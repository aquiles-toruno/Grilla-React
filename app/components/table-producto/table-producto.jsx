import React from 'react';
import Table from '../table/table';
import Columns from '../table/columns';
import BindColumn from '../table/bind-column';
import TemplateColumn from '../table/template-column';
import Enlace from '../enlace/enlace';

import './table-producto.css';

class TableProducto extends React.Component {
    constructor(props) {
        super(props);
        this.onRowDataBound = this
            .onRowDataBound
            .bind(this);
    }
    onRowDataBound(registro, columnas) {
        var nuevasColumnas = [];
        //Recorro las columnas
        React
            .Children
            .map(columnas, child => {
                if (child.type === TemplateColumn) {
                    var {children} = child.props;
                    //Recorro los items dentro de la columna
                    var nuevosTemplateColumnItems = React
                        .Children
                        .map(children, (elemento, index) => {
                            var nuevosItems = [];
                            if (elemento.type === 'a') {
                                switch (elemento.ref) {
                                    case 'link_editar':
                                        //Clono elemento para agregarle nuevas propiedades
                                        nuevosItems.push(React.cloneElement(elemento, {href: `editar/${registro.Id}`}));
                                        break;
                                    case 'link_eliminar':
                                        //Clono elemento para agregarle nuevas propiedades
                                        nuevosItems.push(React.cloneElement(elemento, {href: `eliminar/${registro.Id}`}));
                                        break;
                                }
                            } else {
                                nuevosItems.push(elemento);
                            }

                            return nuevosItems;
                        });
                    //Clono la columna para agregarle los nuevos items
                    nuevasColumnas.push(React.cloneElement(child, child.props, nuevosTemplateColumnItems));
                } else {
                    nuevasColumnas.push(child);
                }
            });

        //Retorno nuevas columnas a renderizar
        return nuevasColumnas;
    }
    render() {
        return <Table
            data={this.props.data}
            clases='table border'
            onRowDataBound={this.onRowDataBound}>
            <Columns>
                <BindColumn dataField='Nombre' headerText='Nombre'/>
                <BindColumn dataField='Edad' headerText='Edad'/>
                <BindColumn dataField='Titulo' headerText='Titulo'/>
                <TemplateColumn headerText='Opciones'>
                    <a ref='link_editar' href="">Editar</a>
                    <span>{' '}</span>
                    <a ref='link_eliminar' href="">Eliminar</a>
                </TemplateColumn>
            </Columns>
        </Table>
    }
}

export default TableProducto;