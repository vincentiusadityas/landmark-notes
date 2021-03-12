import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import LastPageIcon from '@material-ui/icons/LastPage';
import { MenuItem, Menu } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SearchBar from 'material-ui-search-bar';

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
    root: {
        width: '100%',
    },
    table: {
        minWidth: 500,
    },
    container: {
        maxHeight: 300,
    },
    searchBar: {
        marginBottom: 10,
    },
});

export default function CustomTable({ data }) {
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rows, setRows] = React.useState(data);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [filter, setFilter] = React.useState("username")

    React.useEffect(() => {
        setRows(data)
    }, [data])

    const [searched, setSearched] = React.useState("");

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const requestSearch = (searchedVal) => {
        const filteredRows = data.filter((row) => {
            if (filter === "username") {
                return row.user.toLowerCase().includes(searchedVal.toLowerCase());
            } else if (filter === "notes") {
                return row.notes.toLowerCase().includes(searchedVal.toLowerCase());
            } else {
                return row
            }
        });
        setRows(filteredRows);
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleFilter = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // const handleFilter2 = () => {
    //     const el = document.getElementById('filterIcon')
    //     console.log(el)
    //     setAnchorEl(el);
    // }
    
    const handleSelectFilter = (e) => {
        setAnchorEl(null);
        const { myValue } = e.currentTarget.dataset;
        if (myValue === "username") {
            setFilter("username")
        } else if (myValue === "notes") {
            setFilter("notes")
        }
    };

    return (
        <>
            <SearchBar
                className={classes.searchBar}
                value={searched}
                onChange={(searchVal) => requestSearch(searchVal)}
                onCancelSearch={() => cancelSearch()}
                placeholder={`Search by ${filter}`}
                // onRequestSearch={handleFilter2}
                searchIcon={
                    <>
                        <FilterListIcon 
                            aria-label="filter"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            id="filterIcon"
                            onClick={handleFilter}
                            color="primary" 
                            size="large"/>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleSelectFilter}
                        >
                            <MenuItem onClick={handleSelectFilter} data-my-value={"username"}>Username</MenuItem>
                            <MenuItem onClick={handleSelectFilter} data-my-value={"notes"}>Notes</MenuItem>
                        </Menu>
                    </>
                }
            />
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table className={classes.table} stickyHeader aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Username</TableCell>
                                <TableCell>Latitude</TableCell>
                                <TableCell>Longitude</TableCell>
                                <TableCell>Notes</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                            ).map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.user}
                                    </TableCell>
                                    <TableCell>
                                        {row.coords.lat}
                                    </TableCell>
                                    <TableCell>
                                        {row.coords.lng}
                                    </TableCell>
                                    <TableCell>
                                        {row.notes}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: rows.length }]}
                    component="div"
                    colSpan={4}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                />
            </Paper>
        </>
    );
}
