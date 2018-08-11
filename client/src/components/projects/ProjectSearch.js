import React from 'react';

const ProjectSearch = (props) => (
  <div className="card shadow">
    <h5 className="card-header text-blue">Search Results for '{props.searchField}'</h5>
    <div className="card-body">
      <form className="input-group">
        <input type="text" placeholder="Search for projects" className="form-control" value={props.searchField} onChange={props.onSearchFieldChange} />
        <div className="input-group-append">
          <button className="btn btn-outline-primary text-blue" type="button" onClick={props.onSearch}>
            <i className="fas fa-search"></i> Search</button>
        </div>
      </form>
      <div className="btn-toolbar" role="toolbar">
        <div className="btn-group ml-auto mt-4" role="group">
          {props.projectPaginate}
        </div>
      </div>
    </div>

  </div>
)

export default ProjectSearch;