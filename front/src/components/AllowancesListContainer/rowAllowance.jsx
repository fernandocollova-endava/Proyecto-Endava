import React from "react";

export default function rowAllowance({
  deleteAllowance,
  viewDetails,
  allUser,
  allowanceList,
  urlName
}) {
  let Month = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  return (
    <>
      <tbody>
        {allowanceList &&
          allowanceList.map((row, i) =>          
            row.topic ? (                
              <tr key={i}>              
                <td key={`idClass_${i}`} className="upperCaseFonts">{row.topic}</td>
                <td key={`idClassName_${i}`} className="upperCaseFonts">{row.employee.name}</td> 
                <td>{row.date}</td>
                <td>{row.time}</td>
                {/* <td>{row.status}</td>
                <td key={`id_${i}`} className="upperCaseFonts">
                </td> */}
                <td>
                  <label className={row.status}>{row.status}</label>
                </td>
                <td>
                  {row.allowanceDetail ? (
                    <button
                      type="button"
                      onClick={() =>
                        viewDetails(
                          row.id,
                          row.allowanceDetail.id,
                          row.receiptPath
                        )
                      }
                      className="btn btn-default btn-sm btn-rounded Ripple-parent mb-3 btnEv-red rounded mb-0 border-0"
                    >
                      <i className="far fa-file-pdf" aria-hidden="true" />{" "}
                      Details <div className="Ripple " />
                    </button>
                  ) : (
                    
                    <button
                   
                      type="button"
                      onClick={() => viewDetails(row.id)}
                      className="btn btn-default btn-sm btn-rounded Ripple-parent mb-3 btnEv-red rounded mb-0 border-0"
                    >
                      <i className="far fa-file-pdf" aria-hidden="true" />{" "}
                      Details <div className="Ripple " />
                    </button>
                  )}
                </td>
                <td>
                  {row.status === "pending" && !allUser ? (
                    
                    row.topic? 
                      null :<span
                      onClick={() => deleteAllowance(row.id)}
                      className="greyColor cursorPointer"
                      >
                      <i className="far fa-trash-alt iconAllowance " /> Delete{" "}
                      </span>

                    
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ) : (
              <tr key={`${i}`} >
                <td  key={`idClass_${i}`} className="upperCaseFonts">{row.allowanceDetail.name}</td>
                <td key={`idClassName_${i}`}  className="upperCaseFonts">{row.employeeDetail.name}</td>
                <td>{row.amount}</td>
                <td>{row.limitAmount}</td>
                <td>{row.employeeAmount}</td>
                
                {urlName == "book" ? null : <td>{row.paymentDate}</td>}
                <td>
                  <label className={row.status}>{row.status}</label>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() =>
                      viewDetails(
                        row.id,
                        row.allowanceDetail.id,
                        row.receiptPath
                      )
                    }
                    className="btn btn-default btn-sm btn-rounded Ripple-parent mb-3 btnEv-red rounded mb-0 border-0"
                  >
                    <i className="far fa-file-pdf" aria-hidden="true" /> Details{" "}
                    <div className="Ripple " />
                  </button>
                </td>
                <td>
                  {row.status === "pending" && !allUser ? (
                    <span
                      onClick={() => deleteAllowance(row.id)}
                      className="greyColor cursorPointer"
                    >
                      <i className="far fa-trash-alt iconAllowance " /> Delete{" "}
                    </span>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            )
          )}
      </tbody>
    </>
  );
}
