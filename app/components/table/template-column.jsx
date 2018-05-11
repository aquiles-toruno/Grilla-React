import React from 'react';

class TemplateColumn extends React.Component {
    render() {
        return <td>{this.props.children}</td>
    }
}

export default TemplateColumn;