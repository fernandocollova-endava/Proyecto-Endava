import React from 'react'

export default function rowAllowance({ deleteAllowance, viewDetails, allUser,
    allowanceList, urlName}) {
    let Month = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return (
        <>
        {/* {console.log("soy los books del roow", allowanceList)} */}

            <tbody>
                {   
                    allowanceList && allowanceList.map(row => (
                        
                        row.topic?
                        <tr>   
                            <td className="upperCaseFonts">{row.topic}</td>
                            {/* <td className="upperCaseFonts">{row.employeeDetail.topic}</td> */}
                            <td>{row.date}</td>
                            <td>{row.time}</td>
                            <td><label className={row.status}>{row.status}</label></td>
                            <td>
                            {row.allowanceDetail?
                                <button type="button" onClick={() => viewDetails(row.id, row.allowanceDetail.id, row.receiptPath)} className="btn btn-default btn-sm btn-rounded Ripple-parent mb-3 btnEv-red rounded mb-0 border-0"><i className="far fa-file-pdf" aria-hidden="true"></i> Details <div className="Ripple "></div></button>
                                :
                                
                                <button type="button" onClick={() => viewDetails(row.employeeId)} className="btn btn-default btn-sm btn-rounded Ripple-parent mb-3 btnEv-red rounded mb-0 border-0"><i className="far fa-file-pdf" aria-hidden="true"></i> Details <div className="Ripple "></div></button>
                            }       
                                    </td>
                            <td>
                                {
                                    (row.status === 'pending' && !allUser)?
                                    <span onClick={() => deleteAllowance(row.id)} className="greyColor cursorPointer"><i className="far fa-trash-alt iconAllowance " ></i> Delete </span>:''
                                }
                            </td>
                        </tr>:
                         <tr>    
                         <td className="upperCaseFonts">{row.allowanceDetail.name}</td>
                         <td className="upperCaseFonts">{row.employeeDetail.name}</td>
                         <td>{row.amount}</td>
                         <td>{row.limitAmount}</td>
                         <td>{row.employeeAmount}</td><th>Date</th>
                         {urlName =="book"?null:<td>{(row.paymentDate)}</td>}
                         <td><label className={row.status}>{row.status}</label></td>
                         <td>
                             <button type="button" onClick={() => viewDetails(row.id, row.allowanceDetail.id, row.receiptPath)} className="btn btn-default btn-sm btn-rounded Ripple-parent mb-3 btnEv-red rounded mb-0 border-0"><i className="far fa-file-pdf" aria-hidden="true"></i> Details <div className="Ripple "></div></button></td>
                         <td>
                             {
                                 (row.status === 'pending' && !allUser)?
                                 <span onClick={() => deleteAllowance(row.id)} className="greyColor cursorPointer"><i className="far fa-trash-alt iconAllowance " ></i> Delete </span>:''
                             }
                         </td>
                     </tr>
                    ))
                }

            </tbody>
        </>
    )
}
