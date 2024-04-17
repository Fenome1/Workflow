import TeamMenu from "./TeamMenu.tsx";
import {Colors} from "../../../common/Colors.ts";
import ProjectBoards from "./ProjectBoards.tsx";
import './style.scss'

const Team = () => {
    return (
        <div className='team-page' style={{background: Colors.Primary}}>
            <TeamMenu/>
            <ProjectBoards/>
        </div>
    );
};

export default Team;