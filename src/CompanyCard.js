import React from "react";
import { Link } from "react-router-dom";
import defaultLogo from "./default-logo.jpg";


function CompanyCard({ item = {} }) {
  const { name, description, logo_url, handle } = item;
  return (
    <div className="card text-white bg-info mb-3" style={{marginTop: "10px"}}>
      <div className="card-body">
        <h4 className="card-title">
        <Link to={`/companies/${handle}`}><span className="text-capitalize">{name}</span> </Link>
        </h4>
        <p className="card-text">{description}<img style={{width: "50px", height:"50px"}} src={logo_url || defaultLogo} alt={`${name} Logo`} /></p>
      </div>
      </div>
  );
}

export default CompanyCard;