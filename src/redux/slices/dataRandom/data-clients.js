export const columns = [
  { field: "id", headerName: "ID", width: 90, sortable: false },
  {
    field: "name",
    headerName: "Nombre",
    width: 150,
    // editable: true,
  },
  {
    field: "last_name",
    headerName: "Apellido",
    width: 150,
    // editable: true,
  },
  {
    field: "telephone",
    headerName: "Teléfono",
    type: "number",
    headerAlign: "center",
    align: "center",
    width: 150,
    // editable: false,
    sortable: false,
  },
  {
    field: "email",
    headerName: "Correo electrónico",
    width: 200,
    // editable: false,
    sortable: false,
  },
  {
    field: "points",
    headerName: "Puntos",
    width: 200,
    headerAlign: "center",
    align: "center",
    editable: false,
  },

  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (value, row) => `${row.firstName || ""} ${row.last_name || ""}`,
  // },
];
