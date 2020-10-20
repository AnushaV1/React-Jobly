import React, { useState, useEffect, useContext } from "react";
import {useParams} from "react-router-dom";
import UserContext from "./UserContext";
import JoblyApi from "./JoblyApi";
import CardList from "./CardList";

const Company = () => {
    const  {handle} = useParams();
    const { user } = useContext(UserContext);
    const [company, setCompany] = useState(null);

    useEffect(() => {
        async function getCompanyAndJobs() {
            const { jobs } = user;
            const c = await JoblyApi.getCompany(handle);

            const jobsIDsAppliedTo = new Set(jobs.map(job => job.id));

         c.jobs = c.jobs.map(job => ({
        ...job,
        state: jobsIDsAppliedTo.has(job.id) ? "applied" : null
      }));

      setCompany(c);
    }

    getCompanyAndJobs();
  }, [handle, user]);
  async function apply(idx) {
    if (company && Array.isArray(company.jobs) && idx < company.jobs.length) {
      let jobId = company.jobs[idx].id;
      let message = await JoblyApi.applyToJob(jobId);
      setCompany(c => {
        let newCompany = { ...c };
        newCompany.jobs = newCompany.jobs.map(job =>
          job.id === jobId ? { ...job, state: message } : job
        );
        return newCompany;
      });
    }
  }

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div className="col-md-8 offset-md-2">
    <h5 className="text-capitalize">{company.name}</h5>
    <p>{company.description}</p>
    <CardList cards={company.jobs} apply={apply} />
    </div>
  );
}

export default Company;
