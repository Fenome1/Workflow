import {FC} from 'react';

interface BoardDescriptionCountProps {
    title: string
    count: number
}

const BoardDescriptionCount: FC<BoardDescriptionCountProps> = ({title, count}) => {
    return (
        <div className='board-description-count'>
            <span className='description-count-title'>{title}</span>
            <span className='description-count-value'>{count}</span>
        </div>
    );
};

export default BoardDescriptionCount;