import {Button} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";
import CreateBoardModal from "./modals/CreateBoardModal.tsx";
import {useDialog} from "../../../../../hok/useDialog.ts";
import {FC} from "react";

interface CreateBoardButtonProps {
    projectId: number
}

const CreateBoardButton: FC<CreateBoardButtonProps> = ({projectId}) => {
    const createBoardDialog = useDialog()

    return (
        <div className="create-board-button-container">
            <Button type='link' icon={<PlusCircleOutlined/>}
                    className="create-board-button" onClick={createBoardDialog.show}>Создать доску</Button>
            <CreateBoardModal dialog={createBoardDialog} projectId={projectId}/>
        </div>
    );
};

export default CreateBoardButton;