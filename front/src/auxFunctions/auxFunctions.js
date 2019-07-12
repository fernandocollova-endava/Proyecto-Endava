// VARIABLES CONSTRUCTORAS DE ENCABEZADO DE TABLA:
// *ALLOWANCE
const columnsAllowance= [
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
  }
  ,
  {
    label: 'File',
    field: 'file'
  }
  
];

const rows_outline_btn = [
  {
    'id': 1,
    'first': 'hola',//<MDBBtn color="purple" outline size="sm">Button</MDBBtn>,
    'last': 'Otto',
    'handle': '@mdo'
  },
  {
    'id': 2,
    'first': 'Jacob',
    'last': 'hola',//<MDBBtn color="purple" outline size="sm">Button</MDBBtn>,
    'handle': '@fat'
  },
  {
    'id': 3,
    'first': 'Larry',
    'last': 'the Bird',
    'handle': 'hola',//<MDBBtn color="purple" outline size="sm">Button</MDBBtn>
  }
];
module.exports = {
  columnsAllowance,
  rows_outline_btn
};


// (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(values.email)