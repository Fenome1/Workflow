import {FC} from 'react';
import {IAgency} from "../../../../../../../../features/models/IAgency.ts";
import {useGetProjectsByAgencyQuery} from "../../../../../../../../store/apis/project/projectApi.ts";
import {Button, Skeleton} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import ProjectItem from "./ProjectItem.tsx";
import {useDialog} from "../../../../../../../../hok/useDialog.ts";
import './style.scss'
import ProjectCreate from "./ProjectCreate.tsx";


interface ProjectsProps {
    agency: IAgency
}

const Projects: FC<ProjectsProps> = ({agency}) => {
    const {data: projects, isLoading} = useGetProjectsByAgencyQuery(agency.agencyId);
    const createProjectDialog = useDialog()

    return (
        <div className="projects-tab-container">
            <div className='projects-tab-content'>
                {isLoading ? (<Skeleton active paragraph={{rows: 1}} round style={{padding: '10px'}}/>)
                    :
                    projects && projects.length > 0 && projects.map((project) =>
                        <ProjectItem key={project.projectId} project={project}/>)
                }
                {createProjectDialog.open && <ProjectCreate dialog={createProjectDialog} agencyId={agency.agencyId}/>}
            </div>

            {isLoading ? (<Skeleton.Button active shape={'round'} className='project-create-button'/>)
                : <Button type='link'
                          icon={<PlusOutlined/>}
                          className='project-create-button'
                          onClick={createProjectDialog.show}>Создать проект</Button>
            }
        </div>
    );
};

export default Projects;