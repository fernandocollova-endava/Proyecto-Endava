import React from "react";
import { Link } from "react-router-dom";
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdbreact";


export default function allowanceList({
  allowanceList,
  adminAllowances,
  handleClick
}) {
  return (
    <div>
     
      <MDBDropdown>
        <MDBDropdownToggle caret color="primary">
          Allowances
        </MDBDropdownToggle>
        <MDBDropdownMenu basic>
          <button
            onClick={() => {
              handleClick();
            }}
          >
            <MDBDropdownItem> All </MDBDropdownItem>
          </button>
          {adminAllowances &&
            adminAllowances.map(item => (
              <button
                onClick={() => {
                  handleClick(item.id);
                }}
              >
                <MDBDropdownItem> {item.name}</MDBDropdownItem>
              </button>
            ))}
        </MDBDropdownMenu>
      </MDBDropdown>
      {/* <div>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle text-white" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Allowance
                </Link>
                    {
                        adminAllowance && adminAllowance.map(AdmAllowance => {
                            return (
                              
                                <Link className="dropdown-item"  to={`/allowance/search/${AdmAllowance.id}/${AdmAllowance.name}`}>{AdmAllowance.name}</Link>
                                
                            )
                        })
                    }
            </li>
                </div>
        </div> */}
      <hr />
      <hr />
      {allowanceList &&
        allowanceList.map(Allowance => {
          return (
            <div>
              <ul>
                <li>{`Name: ${Allowance.allowance.name}`}</li>
                <li>{`Amount: ${Allowance.amount}`}</li>
                <li>{`Creation Date: ${Allowance.createdAt}`}</li>
              </ul>
              <hr />
            </div>
          );
        })}
    </div>
  );
}
