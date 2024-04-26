import {FC} from 'react';
import {Empty} from "antd";
import './style.scss'
import {IoSadOutline} from "react-icons/io5";

interface NotFoundProps {
    description: string;
}

const NotFound: FC<NotFoundProps> = ({description}) => {
    return (
        <Empty className='not-found-container' image={<IoSadOutline size={'fil-maxsize'}/>} description={description}/>
    );
};

export default NotFound;