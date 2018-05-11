import React from 'react';
import TableBody from './table-body';
import TableHeader from './table-header';
import Columns from './columns';

const propTypes = {
    data: React
        .PropTypes
        .arrayOf(React.PropTypes.object)
        .isRequired,
    children: function (props, propName, componentName) {
        var prop = props[propName];
        var types = ['Columns'];

        // Only accept a single child, of the appropriate type
        if (React.Children.count(prop) !== 1 || prop.type !== Columns) {
            return new Error('`' + componentName + '` should have a single child of the following types:  `' + types.join('`, `') + '`.');
        }
    }
}

class Table extends React.Component {
    constructor(props) {
        super();
        this.columnas = this.getColumns(props.children);
    }
    getColumns = (children) => {
        var columnas = [];

        if (children.type.name === 'Columns') {
            React
                .Children
                .map(children.props.children, (child, index) => {
                    columnas.push(child);
                });
        }

        return columnas;
    }
    render() {
        return (
            <table>
                <TableHeader columnas={this.columnas}/>
                <TableBody data={this.props.data} columnas={this.columnas}/>
            </table>
        );
    }
}

Table.propTypes = propTypes;

export default Table;