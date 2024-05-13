import {PlusCircleOutlined} from "@ant-design/icons";
import {Button} from "antd";
import './style.scss'
import {FC} from "react";
import {useDialog} from "../../../../../hok/useDialog.ts";
import CreateColumnCard from "./CreateColumnCard.tsx";

interface CreateColumnProps {
    boardId: number
    className?: string
}

const CreateColumnButton: FC<CreateColumnProps> = ({boardId, className}) => {
    const createColumnDialog = useDialog()

    return (
        <>
            {!createColumnDialog.open ?
                <div className={className}>
                    <Button type='link' icon={<PlusCircleOutlined/>}
                            className="create-column-button" onClick={createColumnDialog.show}>Создать
                        колонку</Button>
                </div> :
                <CreateColumnCard boardId={boardId} dialog={createColumnDialog}/>
            }
        </>
    );
};

export default CreateColumnButton;