// VARIABLES CONSTRUCTORAS DE ENCABEZADO DE TABLA:
// *ALLOWANCE
const columnsAllowance = [
  {
    label: "Type",
    field: "type"
  },
  {
    label: "Name",
    field: "name"
  },
  {
    label: "Amount",
    field: "amount"
  },
  {
    label: "Limit",
    field: "limitAmount"
  },
  {
    label: "Emp. Amount",
    field: "employeeAmount"
  },
  {
    label: "Date",
    field: "paymentDate",
    sort: "asc"
  },
  {
    label: "Status",
    field: "status"
  },
  {
    label: "Info",
    field: "file"
  },
  {
    label: "Option",
    field: "delete"
  }
];

const columnsBook = [
  {
    label: "Emp Name",
    field: "employeeDetail.name"
  },
  {
    label: "Amount",
    field: "amount"
  },
  {
    label: "Limit",
    field: "limitAmount"
  },
  {
    label: "Emp. Amount",
    field: "employeeAmount"
  },
  {
    label: "remainingAmount",
    field: "remainingBookAmount"
  },
  {
    label: "installments:",
    field: "installments",
    sort: "asc"
  },
  {
    label: "Status",
    field: "status"
  },
  {
    label: "Info",
    field: "file"
  },
  {
    label: "Option",
    field: "delete"
  }
];
const columnsEvents = [
  {
    label: "Topic",
    field: "topic"
  },
  {
    label: "Status",
    field: "status"
  },
  {
    label: "Date",
    field: "date"
  },
  {
    label: "Time",
    field: "time"
  }
];

module.exports = {
  columnsAllowance,
  columnsEvents,
  columnsBook
};

// (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(values.email)
