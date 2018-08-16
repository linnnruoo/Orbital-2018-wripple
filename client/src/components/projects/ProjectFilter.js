import React, { Component } from 'react';
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';

class ProjectFilter extends Component {

  constructor(props) {
    super(props)
    this.state = {
      expandFilter: false
    }
  }

  toggleFilter = () => {
    this.setState({ expandFilter: !this.state.expandFilter }, () => console.log(this.state.expandFilter))
  }

  render() {
    return (
      <div className="card shadow fixed">
        <h5 className="card-header text-blue" onClick={this.toggleFilter}>
          Filter Results
          <span className="float-right">
            <i className={`fas fa-caret-${this.state.expandFilter ? 'up' : 'down'}`}></i>
          </span>
        </h5>

        <div className={`card-body ${this.state.expandFilter ? '' : "d-none d-xl-block"}`} >
          <h6 className="filter-titles">Projects looking for...</h6>
          <CheckboxGroup
            checkboxDepth={2}
            name="seach_field"
            value={this.props.role_search}
            onChange={this.props.onCheckboxChange1}
          >

            <label><Checkbox value="Entrepreneur" /> Entrepreneur</label><br />
            <label><Checkbox value="Programmer" /> Programmer</label><br />
            <label><Checkbox value="Engineer" /> Engineer</label><br />
            <label><Checkbox value="Photographer" /> Photographer</label><br />
            <label><Checkbox value="Graphic_Designer" /> Graphic Designer</label><br />
            <label><Checkbox value="Videographer" /> Videographer</label><br />
            <br />
          </CheckboxGroup>

          <CheckboxGroup
            checkboxDepth={2}
            name="seach_field"
            value={this.props.size_search}
            onChange={this.props.onCheckboxChange2}
          >
            <h6 className="filter-titles">Size of team</h6>
            <label><Checkbox value="1-5" /> 1 - 5</label><br />
            <label><Checkbox value="6-10" /> 6 - 10</label><br />
            <label><Checkbox value=">10" /> > 10</label><br />
            <br />
          </CheckboxGroup>

          <CheckboxGroup
            checkboxDepth={2}
            name="seach_field"
            value={this.props.com_lvl_search}
            onChange={this.props.onCheckboxChange3}
          >
            <h6 className="filter-titles">Commitment level</h6>
            <label><Checkbox value="Short-term" /> Short-term</label><br />
            <label><Checkbox value="Medium-term" /> Medium-term</label><br />
            <label><Checkbox value="Long-term" /> Long-term</label><br />
          </CheckboxGroup>
        </div>
      </div>
    );
  }
}

export default ProjectFilter;