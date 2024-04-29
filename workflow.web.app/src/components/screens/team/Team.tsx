import TeamMenu from "./TeamMenu.tsx";
import {AppColors} from "../../../common/AppColors.ts";
import './style.scss'
import {useTypedSelector} from "../../../store/hooks/hooks.ts";
import {TeamMenuItem} from "../../../common/TeamMenuItem.ts";
import ProjectBoards from "./current-project/ProjectBoards.tsx";
import Profile from "./profile/Profile.tsx";

const Team = () => {
    const selectedMenuItem = useTypedSelector(state => state.menu?.selectedMenuItem);

    return (
        <div className='team-page' style={{background: AppColors.Primary}}>
            <TeamMenu/>
            {selectedMenuItem && selectedMenuItem === TeamMenuItem.Profile &&
            <Profile/>}
            {selectedMenuItem && selectedMenuItem === TeamMenuItem.Objectives &&
                <div>Задачи</div>}
            {selectedMenuItem && selectedMenuItem === TeamMenuItem.Projects &&
                <ProjectBoards/>}
        </div>
    );
};

export default Team;