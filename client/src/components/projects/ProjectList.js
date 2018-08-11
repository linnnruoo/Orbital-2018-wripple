import React, {Component} from 'react';
import ProjectListItem from './ProjectListItem';

class ProjectList extends Component {
  render() { 
    if (this.props.projects) {
      if (this.props.projects.length > 0) {
        return (
          <div>
            {this.props.projects.map((item, index) => {
              return <ProjectListItem key={index} item={item} id={index}/>
            })}
          </div>
        )
      } else {
        return (
          <div className="card mb-2 shadow-sm">
            <div className="card-body text-muted">No Search Results.</div>
          </div>
        )
      }
    } else {
      return null;
    } 
      
    
  }
}

export default ProjectList;