import {PlusCircleOutlined} from "@ant-design/icons";
import { Button } from "antd";
import './style.scss'
const CreateColumn = () => {
    return (
        <div className='create-column-container'>
            <Button type='link' icon={<PlusCircleOutlined/>} className="create-column-button">Создать колонку</Button>
        </div>
    );
};

export default CreateColumn;