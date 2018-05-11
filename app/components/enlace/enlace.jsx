import React from 'react';

const propTypes = {
    to: React.PropTypes.string.isRequired,
    params: React
        .PropTypes
        .arrayOf(React.PropTypes.object)
}

const Enlace = (props) => {
    let {to, params} = props;
    var parametros = params.map((elemento, indice) => {
        if (indice == 0) {
            return `?${elemento.parametro}=${elemento.valor}`
        }

        return `&${elemento.parametro}=${elemento.valor}`
    });
    let url = `${to}${parametros.join('')}`;
    return <a href={url}>{props.children}</a>
}

Enlace.propTypes = propTypes;

export default Enlace;