import React, { Component } from 'react';
import ProjectItems from './ProjectItemList';
import RequestItems from './RequestItemList';
import ArchiveItems from './ArchiveItemList';

class DashboardItems extends Component {
    render(){
        if (this.props.projects) {
            if (this.props.isRequest === 1) {
                return(
                    <ul className="list-group list-group-flush">
                        {this.props.projects.map((item, index) => {
                            return <RequestItems key={index} item={item} />
                        })}
                    </ul>
                );
            } else if (this.props.isArchived === 1) {
                return(
                    <ul className="list-group list-group-flush">
                        {this.props.projects.map((item, index) => {
                            return <ArchiveItems key={index} item={item} />
                        })}
                    </ul>
                );
            } else {
                return(
                    <ul className="list-group list-group-flush">
                        {this.props.projects.map((item, index) => {
                            return <ProjectItems key={index} item={item} />
                        })}
                    </ul>
                );
            }
        } else {
            return null;
        }     
    }
}

export default DashboardItems;