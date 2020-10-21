import React, {useState} from "react";
import "./Search.css";

const Search = ({ searchFor }) => {
    const INITIAL_VALUE =  {search: ''}
    const [searchData, setSearchData] = useState(INITIAL_VALUE);
    const handleChange = e => {
        const {name, value} = e.target;
        setSearchData((data) => ({
            ...data,
            [name]: value
        }))
    } 

    const handleSubmit = e => {
        e.preventDefault();
        searchFor({...searchData});
        
    }

    return (
        <div className='Search'>
        <form onSubmit={handleSubmit}>
        <div className="input-group">
    <input type="text" className="form-control" placeholder="Search" name="search" value={searchData.search} onChange={handleChange} />
    <div className="input-group-btn">
        <button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
    </div>
    </div>
    </form>
    </div>

    )
}

export default Search;