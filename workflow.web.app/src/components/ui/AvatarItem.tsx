import {FC} from 'react';
import {Avatar} from "antd";
import {base64ToImage} from "../../hok/base64ToImage.ts";
import {IUser} from "../../features/models/IUser.ts";

interface AvatarProps {
    user: IUser | null
    className?: string
}

const AvatarItem: FC<AvatarProps> = ({user, className}) => {
    return (
        user?.avatarImage ?
            <Avatar className={className} style={{background: "gray"}} src={base64ToImage(user.avatarImage)}/>
            : <Avatar className={className} style={{background: "gray"}} children={user?.name?.toString()?.substring(0, 4)}/>
    );
};

export default AvatarItem;