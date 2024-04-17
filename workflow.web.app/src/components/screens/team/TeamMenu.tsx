import {FC, useEffect} from 'react';
import {Menu} from "antd";
import {GlobalOutlined, SolutionOutlined, UserOutlined} from "@ant-design/icons";
import {useAppDispatch, useTypedSelector} from "../../../store/hooks/hooks.ts";
import AgencySelector from "./AgencySelector.tsx";
import {selectProject} from "../../../store/slices/projectSlice.ts";
import {Colors} from "../../../common/Colors.ts";
import './style.scss'
import {useGetProjectsByAgencyQuery} from "../../../store/apis/projectApi.ts";

const TeamMenu: FC = () => {
    const dispatch = useAppDispatch();
    const selectedAgencyId = useTypedSelector((state) => state.agency?.selectedAgencyId);
    const selectedProjectId = useTypedSelector((state) => state.project?.selectedProjectId);

    const {data: projects} = useGetProjectsByAgencyQuery(selectedAgencyId || 0,
        {skip: selectedAgencyId === null});

    useEffect(() => {
        const setSelectedProjectAsync = async () => {
            if (selectedProjectId === null && projects && projects.length > 0) {
                await dispatch(selectProject(projects[0]?.projectId));
            }
        };
        setSelectedProjectAsync();
    }, [dispatch, projects, selectedAgencyId]);

    return (
        <div className='team-menu'>
            <b className='team-menu-header'>Workflow</b>
            <Menu
                className='team-menu-tabs'
                style={{background: Colors.Primary}}
                mode="inline"
                defaultOpenKeys={['projects']}
                theme='light'>
                <Menu.Item className='team-menu-profile'
                           key="profile"
                           icon={<UserOutlined/>}>
                    Профиль
                </Menu.Item>
                <Menu.Item key="objectives" className='team-menu-objectives' icon={<SolutionOutlined/>}>
                    Задачи
                </Menu.Item>
                <Menu.SubMenu key="projects" className='team-menu-projects' icon={<GlobalOutlined/>} title="Проекты">
                    {projects && projects?.map((project) => (
                        <Menu.Item key={project.projectId}
                                   onClick={() => dispatch(selectProject(project.projectId))}>{project.name}</Menu.Item>
                    ))}
                </Menu.SubMenu>
            </Menu>
            <div className='agency-selector'>
                <span className='agency-selector-header'>Выбранное агентство</span>
                <AgencySelector/>
            </div>
        </div>
    );
};

export default TeamMenu;