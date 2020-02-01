import React from 'react';
import { Dropdown } from 'semantic-ui-react'

const ProjectOptions = (props) => {
    const projectOptions = props.projects.map((project,i)=>{
        return(
          {
            key: project.id,
            text: project.name,
            value: i
          }
        )
      })

    projectOptions.unshift({
    key: '000',
    text: 'none',
    value: null
    })
    return(
        <Dropdown
                  placeholder='Switch Project'
                  fluid
                  selection
                  options={projectOptions}
                  onChange={props.changeProject}
                />
    )
}

export default ProjectOptions