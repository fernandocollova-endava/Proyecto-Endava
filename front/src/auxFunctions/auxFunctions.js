
function validate(values) {
 
  const errors = {};

  if (!values.email || (values.email.search("@endava.com") ==-1)) 
  errors.email = 'Campo email erroneo o vacio'
  
  if (!values.password) errors.password =  'Campo password vacio';

  return errors;
}
module.exports = validate;


// (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(values.email)