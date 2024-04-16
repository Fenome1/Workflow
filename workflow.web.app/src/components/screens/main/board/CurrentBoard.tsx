import {useTypedSelector} from "../../../../store/hooks/hooks.ts";

const CurrentBoard = () => {
    const selectedBoardId = useTypedSelector((state) => state.board?.selectedBoardId);
    return (
        <div>
            Selected board id: {selectedBoardId}
        </div>
    );
};

export default CurrentBoard;