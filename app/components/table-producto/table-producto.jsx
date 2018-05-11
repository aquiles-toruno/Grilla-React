import React from 'react';
import Table from '../table/table';
import Columns from '../table/columns';
import BindColumn from '../table/bind-column';
import TemplateColumn from '../table/template-column';
import Enlace from '../enlace/enlace';

const TableProducto = (props) => {
    return <Table data={props.data}>
        <Columns>
            <BindColumn dataField='Nombre' headerText='Nombre'/>
            <BindColumn dataField='Edad' headerText='Edad'/>
            <BindColumn dataField='Titulo' headerText='Titulo'/>
            <TemplateColumn headerText='Opciones'>
                <Enlace to='/persona/editar' paramsField={['Id']}>
                    Editar
                </Enlace>
                <span>{' '}</span>
                <Enlace to='/persona/eliminar' paramsField={['Id']}>
                    Eliminar
                </Enlace>
            </TemplateColumn>
        </Columns>
    </Table>
}

export default TableProducto;