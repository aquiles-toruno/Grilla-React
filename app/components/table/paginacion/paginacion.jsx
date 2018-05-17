/* Pagination Component
-------------------------------------------------*/
import React from 'react';
// import './paginacion.css';

const propTypes = {
    items: React.PropTypes.array.isRequired,
    onChangePage: React.PropTypes.func.isRequired,
    initialPage: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    firstOptionText: React.PropTypes.string,
    prevOptionText: React.PropTypes.string,
    lastOptionText: React.PropTypes.string,
    nextOptionText: React.PropTypes.string
}

const defaultProps = {
    initialPage: 1,
    pageSize: 10,
    firstOptionText: 'Primero',
    prevOptionText: 'Anterior',
    lastOptionText: 'Último',
    nextOptionText: 'Siguiente'
}

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pager: {}
        };
    }

    componentWillMount() {
        // set page if items array isn't empty
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // reset page if items array has changed
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }

    setPage(page) {
        var items = this.props.items;
        var pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        // get new pager object for specified page
        pager = this.getPager(items.length, page);

        // get new page of items from items array
        var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // update state
        this.setState({pager: pager});

        // call change page function in parent component
        this
            .props
            .onChangePage(pageOfItems);
    }

    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || this.props.pageSize;

        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);

        var startPage,
            endPage;
        if (totalPages <= this.props.pageSize) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = this.props.pageSize;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() {
        var pager = this.state.pager;
        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }

        return (
            <ul className='pagination'>
                <li
                    className={pager.currentPage === 1
                    ? 'disabled'
                    : ''}>
                    <a
                        style={{
                        cursor: 'pointer'
                    }}
                        onClick={() => this.setPage(1)}>{this.props.firstOptionText}</a>
                </li>
                <li
                    className={pager.currentPage === 1
                    ? 'disabled'
                    : ''}>
                    <a
                        style={{
                        cursor: 'pointer'
                    }}
                        onClick={() => this.setPage(pager.currentPage - 1)}>{this.props.prevOptionText}</a>
                </li>
                {pager
                    .pages
                    .map((page, index) => <li
                        key={index}
                        className={pager.currentPage === page
                        ? 'active'
                        : ''}>
                        <a
                            style={{
                            cursor: 'pointer'
                        }}
                            onClick={() => this.setPage(page)}>{page}</a>
                    </li>)}
                <li
                    className={pager.currentPage === pager.totalPages
                    ? 'disabled'
                    : ''}>
                    <a
                        style={{
                        cursor: 'pointer'
                    }}
                        onClick={() => this.setPage(pager.currentPage + 1)}>{this.props.nextOptionText}</a>
                </li>
                <li
                    className={pager.currentPage === pager.totalPages
                    ? 'disabled'
                    : ''}>
                    <a
                        style={{
                        cursor: 'pointer'
                    }}
                        onClick={() => this.setPage(pager.totalPages)}>{this.props.lastOptionText}</a>
                </li>
            </ul>
        );
    }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default Pagination;