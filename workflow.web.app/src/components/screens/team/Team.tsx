import TeamMenu from "./TeamMenu.tsx";
import './style.scss'
import {useTypedSelector} from "../../../store/hooks/hooks.ts";
import {TeamMenuItem} from "../../../common/TeamMenuItem.ts";
import ProjectBoards from "./current-project/ProjectBoards.tsx";
import Profile from "./profile/Profile.tsx";
import Objectives from "./objectives/Objectives.tsx";
import {AppColors} from "../../../common/Colors.ts";

const Team = () => {
    const selectedMenuItem = useTypedSelector(state => state.menu?.selectedMenuItem);
    const selectedAgencyId = useTypedSelector((state) => state.agency?.selectedAgencyId);
    const selectedProjectId = useTypedSelector((state) => state.project?.selectedProjectId);
    const userState = useTypedSelector(state => state.user);

    return (
        <div className='team-page' style={{background: AppColors.Primary}}>
            <TeamMenu selectedAgencyId={selectedAgencyId}
                      selectedProjectId={selectedProjectId}
                      currentUser={userState.user}/>
            {selectedMenuItem && selectedMenuItem === TeamMenuItem.Profile &&
                <Profile userState={userState}/>}
            {selectedMenuItem && selectedMenuItem === TeamMenuItem.Objectives &&
                <Objectives currentUser={userState.user}/>}
            {selectedMenuItem && selectedMenuItem === TeamMenuItem.Projects &&
                <ProjectBoards selectedProjectId={selectedProjectId}/>}
        </div>
    );
};

export default Team;