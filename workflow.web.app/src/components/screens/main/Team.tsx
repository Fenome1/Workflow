import TeamMenu from "./menu/TeamMenu.tsx";
import {Colors} from "../../../common/Colors.ts";
import ProjectBoards from "./menu/board/ProjectBoards.tsx";

const Team = () => {
    return (
        <div className='team-page' style={{background: Colors.Primary}}>
            <TeamMenu/>
            <ProjectBoards/>
        </div>
    );
};

export default Team;