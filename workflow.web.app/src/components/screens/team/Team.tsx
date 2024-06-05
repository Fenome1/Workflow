import TeamMenu from "./TeamMenu.tsx";
import './style.scss'
import {useTypedSelector} from "../../../store/hooks/hooks.ts";
import {TeamMenuItem} from "../../../common/TeamMenuItem.ts";
import ProjectBoards from "./current-project/ProjectBoards.tsx";
import Profile from "./profile/Profile.tsx";
import Objectives from "./objectives/Objectives.tsx";
import {AppColors} from "../../../common/Colors.ts";
import React from "react";

const Team = () => {
    const {selectedMenuItem} = useTypedSelector(state => state.menu);

    const getRenderComponent = (): React.ReactNode => {
        switch (selectedMenuItem) {
            case TeamMenuItem.Profile:
                return (
                    <Profile/>
                )
            case TeamMenuItem.Objectives:
                return (
                    <Objectives/>
                )
            case TeamMenuItem.Projects:
                return (
                    <ProjectBoards/>
                )
            default:
                return null
        }
    }

    return (
        <div className='team-page' style={{background: AppColors.Primary}}>
            <TeamMenu/>
            {getRenderComponent()}
        </div>
    );
};

export default Team;