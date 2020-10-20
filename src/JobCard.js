import React from "react";

function JobCard({ item = {}, handleApply }) {
  const { title, salary, equity } = item;

  return (
    <div className="card text-white bg-info mb-3" style={{marginTop: "10px"}}>
      <div className="card-body">
      <h4 className="card-title">{title}</h4>
        <p className="card-text">Salary: {salary}</p>
        <p className="card-text">Equity: {equity}</p>
        <button className="btn btn-primary font-weight-bold text-uppercase float-right"
          onClick={handleApply}
          disabled={item.state}
        >
          {item.state ? "Applied" : "Apply"}
        </button>
      </div>
    </div>
  );
}

export default JobCard;
