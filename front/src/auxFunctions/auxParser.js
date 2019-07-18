import React from "react";
import { MDBBtn } from "mdbreact";

export const parserRow = (arr, deleteAllowance, viewDetails, allUser)=>{
    let Month = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return arr.map(a => {
      let split = (a.paymentDate).split('-')
      return {
        type: (a.allowanceDetail.name).toUpperCase(),
        name: (a.employeeDetail.name).toUpperCase(),
        amount: a.amount,
        limitAmount: a.limitAmount,
        employeeAmount: a.employeeAmount,
        paymentDate: `${Month[Number(split[1])]}-${split[0]}`,
        status: <label className={a.status}>{a.status}</label>,
        file: <MDBBtn
          className="mb-3 btnEv-red rounded mb-0 border-0"
          onClick={() => viewDetails(a.id, a.allowanceDetail.id)}
          color="default" rounded size="sm"><i key="cell3" className="far fa-file-pdf" size="2x" aria-hidden="true"></i> Details </MDBBtn>,
        
          delete: <>{(a.status === 'pending' && !allUser) ?
          <span onClick={() => deleteAllowance(a.id)}
            className="greyColor cursorPointer" ><i key="cell1" className="far fa-trash-alt iconAllowance " style={({ fontSize: 20 })}></i> Delete </span>
          : "-"}
        </>
      }
    })
}