import {FC, useEffect, useState} from 'react';
import {Menu, MenuProps} from "antd";
import {GlobalOutlined, SolutionOutlined} from "@ant-design/icons";
import {useAppDispatch} from "../../../store/hooks/hooks.ts";
import AgencySelector from "./AgencySelector.tsx";
import {selectProject} from "../../../store/slices/projectSlice.ts";
import {AppColors} from "../../../common/AppColors.ts";
import './style.scss'
import {useGetProjectsByAgencyQuery} from "../../../store/apis/projectApi.ts";
import {selectMenuItem} from "../../../store/slices/menuSlice.ts";
import {TeamMenuItem} from "../../../common/TeamMenuItem.ts";
import AvatarItem from "../../ui/AvatarItem.tsx";
import {IUser} from "../../../features/models/IUser.ts";

interface TeamMenuProps {
    selectedAgencyId: number | null
    selectedProjectId: number | null
    currentUser: IUser | null
}

const TeamMenu: FC<TeamMenuProps> = ({selectedAgencyId, selectedProjectId, currentUser}) => {
    const dispatch = useAppDispatch();
    const [selectedKey, setSelectedKey] = useState<string>("projects");

    const {data: projects} = useGetProjectsByAgencyQuery(selectedAgencyId || 0,
        {skip: selectedAgencyId === null});

    useEffect(() => {
        const setSelectedProjectAsync = async () => {
            if (selectedProjectId === null && projects && projects.length > 0) {
                await dispatch(selectProject(projects[0]?.projectId));
                setSelectedKey(projects[0]?.projectId.toString())
            } else {
                setSelectedKey(selectedProjectId!.toString())
            }
            dispatch(selectMenuItem(TeamMenuItem.Projects))
        };
        setSelectedProjectAsync();
    }, [dispatch, projects, selectedAgencyId]);

    const onSelect: MenuProps['onSelect'] = (selectInfo) => {
        if (selectInfo.keyPath[1] === 'projects') {
            dispatch(selectProject(Number(selectInfo.key)))
            dispatch(selectMenuItem(TeamMenuItem.Projects))
        }
        if (selectInfo.key === 'profile') {
            dispatch(selectMenuItem(TeamMenuItem.Profile))
        }
        if (selectInfo.key === 'objectives') {
            dispatch(selectMenuItem(TeamMenuItem.Objectives))
        }
        setSelectedKey(selectInfo.key)
    };

    return (
        <div className='team-menu'>
            <b className='team-menu-header'>Workflow</b>
            <Menu
                selectedKeys={[selectedKey]}
                id='teamMenu'
                className='team-menu-tabs'
                style={{background: AppColors.Primary}}
                mode="inline"
                defaultOpenKeys={['projects']}
                theme='light'
                onSelect={onSelect}>
                <Menu.Item className='team-menu-profile'
                           key="profile"
                           icon={<AvatarItem user={currentUser} className='team-menu-profile-img'/>}>
                    <span>Мой профиль</span>
                </Menu.Item>
                <Menu.Item key="objectives" className='team-menu-objectives'
                           icon={<SolutionOutlined className='menu-icon'/>}>
                    Мои задачи
                </Menu.Item>
                <Menu.SubMenu key="projects" className='team-menu-projects'
                              icon={<GlobalOutlined className='menu-icon'/>} title="Проекты">
                    {projects && projects?.map((project) => (
                        <Menu.Item key={project.projectId}>
                            <span>{project.name}</span>
                        </Menu.Item>
                    ))}
                </Menu.SubMenu>
            </Menu>
            <div className='agency-selector'>
                <span className='agency-selector-header'>Выбранное агентство</span>
                <AgencySelector currentUser={currentUser}/>
            </div>
        </div>
    );
};

export default TeamMenu;