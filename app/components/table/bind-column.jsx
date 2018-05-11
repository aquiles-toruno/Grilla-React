import React from 'react';

const propTypes = {
    dato: React
        .PropTypes
        .oneOfType([React.PropTypes.string, React.PropTypes.number])
}

class BindColumn extends React.Component {
    render() {
        return <td>{this.props.dato}</td>
    }
}

BindColumn.propTypes = propTypes;

export default BindColumn;