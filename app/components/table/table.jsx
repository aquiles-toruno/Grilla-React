import React from 'react';
import TableBody from './table-body';
import TableHeader from './table-header';
import Columns from './columns';
import Pagination from './paginacion/paginacion';

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
    },
    clases: React.PropTypes.string,
    paginar: React.PropTypes.bool,
    pageSize: React.PropTypes.number
}

const defaultProps = {
    paginar: false,
    pageSize: 10
}

class Table extends React.Component {
    constructor(props) {
        super();
        this.state = {
            pageOfItems: []
        };
        this.columnas = this.getColumns(props.children);
        this.paginacion = props.paginar
            ? <Pagination
                    items={props.data}
                    pageSize={props.pageSize}
                    onChangePage={this
                    .onChangePage
                    .bind(this)}/>
            : null;
    }
    getColumns(children) {
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
    onChangePage(pageOfItems) {
        this.setState({pageOfItems: pageOfItems});
    }
    render() {
        return (
            <div>
                <table className={this.props.clases}>
                    <TableHeader columnas={this.columnas}/>
                    <TableBody
                        data={this.props.paginar
                        ? this.state.pageOfItems
                        : this.props.data}
                        columnas={this.columnas}
                        onRowDataBound={this.props.onRowDataBound}/>
                </table>
                {this.paginacion}
            </div>
        );
    }
}

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export default Table;