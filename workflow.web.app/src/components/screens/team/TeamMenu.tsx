import {useEffect, useState} from 'react';
import {Menu, MenuProps, Skeleton} from "antd";
import {FolderOutlined, GlobalOutlined, SolutionOutlined} from "@ant-design/icons";
import {useAppDispatch, useTypedSelector} from "../../../store/hooks/hooks.ts";
import AgencySelector from "./AgencySelector.tsx";
import {selectProject} from "../../../store/slices/projectSlice.ts";
import './style.scss'
import {useGetProjectsByAgencyQuery} from "../../../store/apis/project/projectApi.ts";
import {selectMenuItem} from "../../../store/slices/menuSlice.ts";
import {TeamMenuItem} from "../../../common/TeamMenuItem.ts";
import AvatarItem from "../../ui/AvatarItem.tsx";
import {AppColors} from "../../../common/Colors.ts";

const TeamMenu = () => {
    const { user } = useTypedSelector(state => state.user)
    const { selectedAgencyId } = useTypedSelector((state) => state.agency);
    const { selectedProjectId } = useTypedSelector((state) => state.project);
    const dispatch = useAppDispatch();

    const [selectedKey, setSelectedKey] = useState<string>("projects");

    const {data: projects, isLoading} = useGetProjectsByAgencyQuery(selectedAgencyId || 0, {
        skip: selectedAgencyId === null
    });

    const onSelect: MenuProps['onSelect'] = async (selectInfo) => {
        if (selectInfo.keyPath[1] === 'projects') {
            await dispatch(selectProject(Number(selectInfo.key)))
            dispatch(selectMenuItem(TeamMenuItem.Projects))
        }
        if (selectInfo.key === 'profile') {
            await dispatch(selectMenuItem(TeamMenuItem.Profile))
        }
        if (selectInfo.key === 'objectives') {
            await dispatch(selectMenuItem(TeamMenuItem.Objectives))
        }

        setSelectedKey(selectInfo.key)
    };

    useEffect(() => {
        const setSelectedProjectAsync = async () => {
            if (!selectedProjectId && projects && projects.length > 0) {
                await dispatch(selectProject(projects[0]?.projectId));
                setSelectedKey(projects[0]?.projectId.toString())
            } else {
                setSelectedKey(selectedProjectId?.toString() ?? 'null')
            }
            await dispatch(selectMenuItem(TeamMenuItem.Projects))
        };

        setSelectedProjectAsync()
    }, [projects]);

    return (
        <div className='team-menu'>
            <b className='team-menu-header'>Workflow</b>
            <Skeleton loading={isLoading} className='team-menu-tabs' active style={{padding: '20px'}}>
                <Menu
                    selectedKeys={[selectedKey]}
                    id='teamMenu'
                    className='team-menu-tabs'
                    style={{background: AppColors.Primary}}
                    mode="inline"
                    defaultOpenKeys={['projects']}
                    theme='light'
                    onSelect={onSelect}
                >
                    <Menu.Item
                        className='team-menu-profile'
                        key="profile"
                        icon={<AvatarItem user={user}className='team-menu-profile-img'/>}
                    >
                        <span>Мой профиль</span>
                    </Menu.Item>
                    <Menu.Item
                        key="objectives"
                        className='team-menu-objectives'
                        icon={<SolutionOutlined className='menu-icon'/>}
                    >
                        Мои задачи
                    </Menu.Item>
                    <Menu.SubMenu
                        key="projects"
                        className='team-menu-projects'
                        icon={<GlobalOutlined className='menu-icon'/>}
                        title='Проекты'
                    >
                        {projects && projects.length > 0 ? (
                            projects.map((project) => (
                                <Menu.Item key={project.projectId}>
                                    <FolderOutlined/>
                                    <span>{project.name}</span>
                                </Menu.Item>
                            ))
                        ) : (
                            <Menu.Item disabled>
                                <span>Нет доступных проектов</span>
                            </Menu.Item>
                        )}
                    </Menu.SubMenu>
                </Menu>
            </Skeleton>
            <div className='agency-selector'>
                <span className='agency-selector-header'>
                    Выбранное агентство
                </span>
                <AgencySelector/>
            </div>
        </div>
    );
};

export default TeamMenu;