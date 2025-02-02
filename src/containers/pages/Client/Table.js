import { useState } from "react";
import { Box, Button, IconButton, TablePagination } from "@mui/material";
// import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import theme from "#config/theme.js";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.neutral.medium,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.primary.normal,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function ClientsContainer({
  valueButton,
  iconButton,
  columns,
  rows,
  handleClick,
  handleClickEdit,
  handleClickDelete,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  console.log(window.innerHeight);

  return (
    <Box style={{}}>
      <Box style={styles.buttonContainer}>
        <Button
          style={styles.button}
          variant="contained"
          startIcon={iconButton}
          onClick={handleClick}
        >
          {valueButton}
        </Button>
      </Box>
      <Box>
        <Paper style={{}}>
          <TableContainer sx={{ maxHeight: window.innerHeight - 300 }}>
            <Table
              sx={{ minWidth: 650 }}
              stickyHeader
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  {columns.map((col, indx) => (
                    <StyledTableCell
                      key={`${col.field}-${indx}`}
                      align={
                        `${col.field}` === "name" ||
                        `${col.field}` === "lastName"
                          ? "left"
                          : "center"
                      }
                    >
                      {col.headerName}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0
                  ? rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, indx) => (
                        <StyledTableRow
                          tabIndex={-1}
                          hover
                          key={`${row.id}-${indx}`}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <StyledTableCell align="center">
                            {row.id}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.lastName}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.telephone}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.email}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.points}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <IconButton
                              onClick={() => {
                                handleClickEdit(row);
                              }}
                            >
                              <EditIcon style={styles.icon} />
                            </IconButton>
                            <IconButton
                              onClick={() => {
                                handleClickDelete(row.id);
                              }}
                            >
                              <DeleteForeverIcon style={{ color: "red" }} />
                            </IconButton>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
}

/** @type {import("@mui/material").SxProps} */
const styles = {
  pageTitle: {
    mb: 5,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  button: { backgroundColor: theme.palette.neutral.medium },
  icon: { color: theme.palette.neutral.medium },
  columnContainer: {
    height: window.innerHeight,
    // columns: "280px 3",
    // maxWidth: 1400,
    // height: "100%",
  },
};

export default ClientsContainer;
