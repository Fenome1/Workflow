import TeamMenu from "./TeamMenu.tsx";
import {AppColors} from "../../../common/AppColors.ts";
import ProjectBoards from "./current-project/ProjectBoards.tsx";
import './style.scss'

const Team = () => {
    return (
        <div className='team-page' style={{background: AppColors.Primary}}>
            <TeamMenu/>
            <ProjectBoards/>
        </div>
    );
};

export default Team;