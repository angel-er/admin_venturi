import createPdf from "./createPdf.js";
import { formatDate, formatTime } from "../helpers/formatDate.js";
import { numbersToLetters } from "#helpers/numbersToLetters.js";

const generateTicket = async (output, data) => {
  const totalPay = data?.data
    .map((item) => +item.price * +item.quantity)
    .reduce((sum, item) => sum + item, 0);
  const totalCanceled =
    +data.payments.cash + +data.payments.qr + +data.payments.card;
  const change = totalCanceled - totalPay;
  const ticketDetails = {
    ...data,
    date: formatDate(),
    time: formatTime(),
    totalCanceled,
  };

  const tableBodyContent = () => {
    let acumdata = [];
    data.data.forEach((item) => {
      acumdata.push(
        [
          {
            text: `${item.quantity} Unid. x ${item.price}`,
            style: "tProductsBody",
            alignment: "left",
          },
          {},
          {},
          {},
        ],
        [
          {
            text: `${item.name} - ${item.description}`,
            style: "tProductsBody",
            colSpan: 3,
            // alignment: "center",
          },
          {},
          {},
          {
            text: +item.quantity * +item.price,
            style: "tProductsBody",
            alignment: "right",
          },
        ]
      );
    });
    return acumdata;
  };
  const content = [
    //DATOS EMPRESA
    {
      // image:"", //Logo
      // fit: [141.73, 56.692],
      // alignment: "center",
    },
    { text: "VENTURI", style: "titleHeader", margin: [0, 10, 0, 0] },
    { text: "HELADERIA", style: "header" },
    {
      text: "C/ Obispo Santi Esteban, Mairana, Santa Cruz de la Sierra",
      style: "header",
    },
    { text: "NIT 6258103014", style: "header" },

    //TIPO Y NUMERO DOCUMENTO
    { text: "TICKET ELECTRÓNICO", style: "header", margin: [0, 10, 0, 2.25] },
    { text: "T001-000001", style: "header", margin: [0, 2.25, 0, 0] },

    //DATOS CEBECERA FACTURAR
    {
      margin: [0, 10, 0, 0],
      table: {
        widths: ["25%", "35%", "15%", "25%"],
        body: [
          [
            { text: "FECHA:", style: "tHeaderLabel" },
            { text: ticketDetails.date, style: "tHeaderValue" },
            { text: "HORA:", style: "tHeaderLabel" },
            { text: ticketDetails.time, style: "tHeaderValue" },
          ],
          [
            { text: "PEDIDO:", style: "tHeaderLabel" },
            { text: "V001-000001", style: "tHeaderValue", colSpan: 3 },
            {},
            {},
          ],
          [
            { text: "PROYECTO:", style: "tHeaderLabel" },
            { text: "P001-000001", style: "tHeaderValue", colSpan: 3 },
            {},
            {},
          ],
          [
            { text: "CAJERO:", style: "tHeaderLabel" },
            {
              text: `${ticketDetails?.cashier ?? "ANGEL"}`,
              style: "tHeaderValue",
              colSpan: 3,
            },
            {},
            {},
          ],
          [
            { text: "VENDEDOR:", style: "tHeaderLabel" },
            {
              text: `${ticketDetails?.seller ?? "VENTURI"}`,
              style: "tHeaderValue",
              colSpan: 3,
            },
            {},
            {},
          ],
        ],
      },
      layout: "noBorders",
    },
    //TABLA PRODUCTOS
    {
      margin: [0, 10, 0, 0],
      table: {
        widths: ["30%", "0%", "40%", "30%"],
        headerRows: 2,
        body: [
          [
            {
              text: "_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ ",
              colSpan: 4,
              style: "tProductsHeader",
              alignment: "center",
            },
            {},
            {},
            {},
          ],
          [
            { text: "CANT.  P.UNIT.", style: "tProductsHeader" },
            {},
            {
              text: "DETALLE",
              style: "tProductsHeader",
              alignment: "center",
            },
            {
              text: "SUBTOTAL",
              style: "tProductsHeader",
              alignment: "right",
            },
          ],
        ].concat(tableBodyContent()),
      },
      layout: {
        hLineWidth: function (i, node) {
          return i === 2 ? 0.5 : 0;
        },
        vLineWidth: function (i, node) {
          return 0;
        },
        hLineColor: function () {
          return "#f2f0f0";
        },
        paddingTop: function (i, node) {
          console.log(i);
          return i % 2 === 0 ? 10 : 1;
        },
      },
    },
    {
      margin: [0, 10, 0, 0],
      table: {
        widths: ["25%", "35%", "15%", "25%"],
        body: [
          //TOTALES
          [
            { text: "SUBTOTAL: Bs.", style: "tTotals", colSpan: 2 },
            {},
            { text: totalPay, style: "tTotals", colSpan: 2 },
            {},
          ],
          [
            { text: "DESCUENTO: BS.", style: "tTotals", colSpan: 2 },
            {},
            { text: "00.00", style: "tTotals", colSpan: 2 },
            {},
          ],
          [
            { text: "TOTAL: BS.", style: "tTotals", colSpan: 2 },
            {},
            { text: totalPay, style: "tTotals", colSpan: 2 },
            {},
          ],
          //TOTAL IMPORTE EN LETRAS
          [
            {
              text: "IMPORTE EN LETRAS:",
              style: "tTotals",
              alignment: "left",
              colSpan: 4,
              margin: [0, 4, 0, 0],
            },
            {},
            {},
            {},
          ],
          [
            {
              text: numbersToLetters(totalPay),
              style: "tProductsBody",
              colSpan: 4,
            },
            {},
            {},
            {},
          ],
          //FORMAS PAGO
          [
            {
              text: "FORMA DE PAGO:",
              style: "tTotals",
              alignment: "left",
              colSpan: 4,
              margin: [0, 4, 0, 0],
            },
            {},
            {},
            {},
          ],
          [{ text: "CONTADO", style: "tProductsBody", colSpan: 4 }, {}, {}, {}],
          [
            { text: "EFECTIVO: BS.", style: "tTotals", colSpan: 2 },
            {},
            { text: ticketDetails.payments.cash, style: "tTotals", colSpan: 2 },
            {},
          ],
          [
            { text: "QR: BS.", style: "tTotals", colSpan: 2 },
            {},
            { text: ticketDetails.payments.qr, style: "tTotals", colSpan: 2 },
            {},
          ],
          [
            { text: "TARJETA: BS.", style: "tTotals", colSpan: 2 },
            {},
            { text: ticketDetails.payments.card, style: "tTotals", colSpan: 2 },
            {},
          ],
          [
            { text: "TOTAL CANCELADO: BS.", style: "tTotals", colSpan: 2 },
            {},
            { text: totalCanceled, style: "tTotals", colSpan: 2 },
            {},
          ],
          [
            { text: "CAMBIO: BS.", style: "tTotals", colSpan: 2 },
            {},
            { text: Math.abs(change), style: "tTotals", colSpan: 2 },
            {},
          ],
          //DATOS CLIENTE
          [
            {
              text: "CLIENTE: ",
              style: "tTotals",
              alignment: "left",
              colSpan: 4,
              margin: [0, 6, 0, 0],
            },
            {},
            {},
            {},
          ],
          [
            { text: "NOMBRES: ", style: "tClientLabel" },
            {
              text: "xxxxxxxxxxxxxxxx",
              style: "tClientValue",
              colSpan: 3,
            },
            {},
            {},
          ],
          [
            { text: "DOC.ID: ", style: "tClientLabel" },
            { text: "0000000", style: "tClientValue", colSpan: 3 },
            {},
            {},
          ],
          [
            { text: "DIRECC.: ", style: "tClientLabel" },
            {
              text: "xxxxxxxxxxxxxxxx",
              style: "tClientValue",
              colSpan: 3,
            },
            {},
            {},
          ],
        ],
      },
      layout: "noBorders",
    },
    //NOTA DE PIE
    {
      text: "ESTIMADO CLIENTE, TIENE COMO PLAZO MAXIMO DE 5 DIAS HABILES EN RECOGER SU MERCADERÍA, DICHO ESTO SE LE COBRARÍA PENALIDAD DE ALMACEN POR EL MONTO DE BS/20.00 POR DIA, GRACIAS.",
      style: "text",
      alignment: "justify",
      margin: [0, 5],
    },
    //QR FACTURA
    // {
    //   stack: [
    //     {
    //       qr: "20603831404|03|B002|000131|724.94|4,752.30|30/09/2023|1|70477554|v2Ez4sKStje4NiqcXiuTcmTtPwgbrqgnXpWPltJKEhk=|",
    //       fit: 115,
    //       alignment: "center",
    //       eccLevel: "Q",
    //       margin: [0, 10, 0, 3],
    //     },
    //     {
    //       text: "Representación impresa del comprobante original. Consulta tu comprobante aquí:",
    //       style: "text",
    //     },
    //     {
    //       text: "https://x.microsoft.pse.pe/cpe/ace72300-0dfb-42d2-9ed7-0ba6e3cee01f",
    //       link: "https://x.microsoft.pse.pe/cpe/ace72300-0dfb-42d2-9ed7-0ba6e3cee01f",
    //       style: "link",
    //     },
    //   ],
    // },
    //QR PROYECTO
    // {
    //   stack: [
    //     {
    //       qr: "20603831404|03|B002|000131|724.94|4,752.30|30/09/2023|1|70477554|v2Ez4sKStje4NiqcXiuTcmTtPwgbrqgnXpWPltJKEhk=|",
    //       fit: 115,
    //       alignment: "center",
    //       eccLevel: "Q",
    //       margin: [0, 10, 0, 3],
    //     },
    //     {
    //       text: "Consulta el estado de tu proyecto, escanea el QR o ingrese al siguiente link:",
    //       style: "text",
    //     },
    //     {
    //       text: "https://x.microsoft/ace72300-0dfb-42d2-9ed7-0ba6e3cee01f",
    //       link: "https://x.microsoft/cpe/ace72300-0dfb-42d2-9ed7-0ba6e3cee01f",
    //       style: "link",
    //     },
    //   ],
    // },
  ];

  const response = await createPdf({ content }, output);
  return response;
};

export default generateTicket;
