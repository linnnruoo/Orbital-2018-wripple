import React, { Component } from 'react';
import ProjectSearch from './ProjectSearch';
import ProjectFilter from './ProjectFilter';
import ProjectList from './ProjectList';
import '../css/project.css';
import ReactPaginate from 'react-paginate';

import { connect } from 'react-redux';
import { searchProjects } from '../../actions/projectActions';
import PropTypes from 'prop-types';

class Search extends Component {
  constructor() {
    super();
    this.state = {
			searchField: '',
			searchString: '',
      pageIndex: 0
    }

    this.onSearchFieldChange = this.onSearchFieldChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    this.props.searchProjects(1, "");
  }

  // change the search keywords on the search bar
  onSearchFieldChange = event => {
    this.setState({
      searchField: event.target.value
    })
  }

  // change the page number
  onPageChange = event => {
    this.setState({
      pageIndex: event.selected
    }, () => {
      this.props.searchProjects(event.selected + 1, this.state.searchString);
    });

    console.log(this.state.pageIndex);
  }

  // submit search results
  onSearch = event => {
		const tempString = this.state.searchField;
		const	newSearchString = tempString.replace(/\s+/g, "+");

		this.setState({
			searchString: newSearchString
		})

		console.log(newSearchString);

    this.props.searchProjects(1, newSearchString);
  }

  render() {
    const { all_projects, loading } = this.props.project;

    let projectFilter, projectSearch, projectList, projectPaginate, spinner;

    if (all_projects) {
      projectPaginate = <ReactPaginate
        previousLabel={<span>&laquo;</span>}
        nextLabel={<span>&raquo;</span>}
        breakLabel={<a href="">...</a>}
        breakClassName={"page-item page-link"}
        pageCount={all_projects.total}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        forcePage={this.state.pageIndex}
        onPageChange={this.onPageChange}
        containerClassName={"pagination"}

        pageClassName={"page-item"}
        pageLinkClassName={"page-link btn btn-light"}

        previousClassName={"page-item"}
        previousLinkClassName={"page-link btn btn-light"}
        
        nextClassName={"page-item"}
        nextLinkClassName={"page-link btn btn-light"}

        activeClassName={"active"}
        disabledClassName={"disabled"}
      />
    }

    projectFilter = <ProjectFilter />
    projectSearch = <ProjectSearch
      searchField={this.state.searchField}
      onSearchFieldChange={this.onSearchFieldChange}
      projectPaginate={projectPaginate} 
      onSearch={this.onSearch}
      />
    projectList = <ProjectList projects={all_projects.projects} />
    spinner = <div className="project-container"><div className="mx-auto text-center"><h4>Loading...</h4><div className="lds-ripple"><div></div><div></div></div></div></div>

    

    return (
      <div className="container project-container">
        <div className="grid">
          <div className="row">
            <div className="col-3">
              {projectFilter}
            </div>
            <div className="col-9">
              <div className="mb-2">
                {projectSearch}
              </div>
              {all_projects === null || loading ? spinner : projectList}
              
              <div className="card shadow project-card">
                <div className="card-body">
                  <div className="btn-toolbar" role="toolbar">
                    <div className="ml-auto" role="group">
                      {projectPaginate}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )   
  }
}

Search.propTypes = {
  searchProjects: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  project: state.project,
  auth: state.auth
})

export default connect(mapStateToProps, { searchProjects })(Search);