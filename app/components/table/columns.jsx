import React from 'react';
import BindColumn from './bind-column';
import TemplateColumn from './template-column';

const propTypes = {
    children: function (props, propName, componentName) {
        var prop = props[propName];
        var types = ['BindColumn', 'TemplateColumn'];

        if (React.Children.count(prop) > 1) {
            var boolArr = React
                .Children
                .map(prop, child => {
                    return child.type === BindColumn || child.type === TemplateColumn
                });

            var existenComponentesExtranios = boolArr.some((valor, indice) => {
                return !valor;
            });

            if (existenComponentesExtranios) 
                return new Error('`' + componentName + '` should have children of the following types:  `' + types.join('`, `') + '`.');
            }
        else {
            // Only accept children of the appropriate type
            if (prop.type !== BindColumn && prop.type !== TemplateColumn) {
                debugger;
                return new Error('`' + componentName + '` should have children of the following types:  `' + types.join('`, `') + '`.');
            }
        }
    }
}

class Columns extends React.Component {
    render() {
        return null;
    }
}

Columns.propTypes = propTypes;

export default Columns;