// VARIABLES CONSTRUCTORAS DE ENCABEZADO DE TABLA:
// *ALLOWANCE
const columnsAllowance = [
  {
    label: 'Type',
    field: 'type'
  },
  {
    label: 'Name',
    field: 'name'
  },
  {
    label: 'Amount',
    field: 'amount'
  },
  {
    label: 'Limit',
    field: 'limitAmount'
  },
  {
    label: 'Emp. Amount',
    field: 'employeeAmount'
  },
  {
    label: 'Date',
    field: 'paymentDate',
    sort: 'asc'
  },
  {
    label: 'Status',
    field: 'status'
  },
  {
    label: 'Info',
    field: 'file'
  },
  {
    label: 'Option',
    field: 'delete'
  }

];
const columnsAllowanceDetail = [
  {
    label: 'Date',
    field: 'paymentDate',
    sort: 'asc'
  },
  {
    label: 'Amount',
    field: 'amount'
  },
  {
    label: 'Limit',
    field: 'limitAmount'
  },
  {
    label: 'Emp. Amount',
    field: 'employeeAmount'
  },
  {
    label: 'Status',
    field: 'status'
  }

];

module.exports = {
  columnsAllowance,
  columnsAllowanceDetail
};


// (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(values.email)