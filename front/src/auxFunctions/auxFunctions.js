// VARIABLES CONSTRUCTORAS DE ENCABEZADO DE TABLA:
// *ALLOWANCE
const moment = require("moment");

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

function dateSetter(value) {
  if (value) {
    var date = {
      start: moment()
        .startOf("month")
        .subtract(value, "months")
        .format("YYYY-MM-DD"),
      end: moment()
        .endOf("month")
        .add(1, "months")
        .format("YYYY-MM-DD")
    };
  } else {
    var date = {
      start: moment()
        .startOf("month")
        .add(1, "M")
        .format("YYYY-MM-DD"),
      end: moment()
        .endOf("month")
        .add(1, "M")
        .format("YYYY-MM-DD")
    };
  }

  return date;
}

module.exports = {
  columnsAllowance,
  columnsEvents,
  columnsBook,
  dateSetter
};

// (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(values.email)
