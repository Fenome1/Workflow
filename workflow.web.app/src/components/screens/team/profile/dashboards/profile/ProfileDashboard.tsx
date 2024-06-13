import React, {useRef, useState} from 'react';
import {Button, Input, InputRef, message, Upload, UploadProps} from "antd";
import {LogoutOutlined} from "@ant-design/icons";
import {useUpdateUserMutation} from "../../../../../../store/apis/user/userApi.ts";
import {ILogoutUserCommand} from "../../../../../../features/commands/user/ILogoutUserCommand.ts";
import {IUpdateUserCommand} from "../../../../../../features/commands/user/IUpdateUserCommand.ts";
import AvatarItem from "../../../../../ui/AvatarItem.tsx";
import SkeletonAvatar from "antd/es/skeleton/Avatar";
import SkeletonInput from "antd/es/skeleton/Input";
import SkeletonButton from "antd/es/skeleton/Button";
import {useLogoutMutation} from "../../../../../../store/apis";
import {useTypedSelector} from "../../../../../../store/hooks/hooks.ts";
import ImgCrop from "antd-img-crop";
import {RcFile} from "antd/es/upload";

const ProfileDashboard = () => {
    const nameInputRef = useRef<InputRef>(null)

    const {user, accessToken, refreshToken} = useTypedSelector(state => state.user)

    const [userName, setUserName] = useState(user?.name);
    const [avatarLoading, setAvatarLoading] = useState<boolean>(false);

    const [logout] = useLogoutMutation();
    const [updateUser] = useUpdateUserMutation();

    const handleLogout = async () => {
        if (!refreshToken || !accessToken) return;

        const command: ILogoutUserCommand = {
            refreshToken: refreshToken,
            accessToken: accessToken
        };
        await logout(command);
    };

    const handleFileLoad = async (file: RcFile) => {
        if (!user) return

        const arrayBuffer = await file.arrayBuffer();
        const base64String = btoa(new Uint8Array(arrayBuffer)
            .reduce((data, byte) => data + String.fromCharCode(byte), ''));

        const command: IUpdateUserCommand = {
            userId: user.userId,
            avatarImage: base64String
        };

        updateUser(command).finally(() => setAvatarLoading(false));
    };

    const handleImageChange: UploadProps['beforeUpload'] = async (file: RcFile) => {
        if (!user) return;

        if (file) {
            setAvatarLoading(true);
            await handleFileLoad(file);
        } else {
            message.error('Ошибка загрузки файла');
        }
    };

    const handleImageDelete = async () => {
        if (!user) return;
        setAvatarLoading(true);
        const command: IUpdateUserCommand = {
            userId: user.userId,
            isAvatarImageReset: true,
        };
        await updateUser(command).finally(() => setAvatarLoading(false));
    };

    const handleEnterKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            await handleSaveNameClick()
            if (nameInputRef.current)
                nameInputRef.current.blur()
        }
    }

    const handleSaveNameClick = async () => {
        if (!user || !userName || userName === user?.name) return;

        setAvatarLoading(true)

        const command: IUpdateUserCommand = {
            userId: user.userId,
            name: userName
        };

        await updateUser(command).finally(() => setAvatarLoading(false));
    };

    return (
        <div className="profile-dashboard-container">
            <div className='dashboard-header'>
                <span className='dashboard-title'>Профиль</span>
                {avatarLoading ? (<SkeletonButton active style={{marginLeft: '10px', width: '100px'}} size='small'/>) :
                    <Button type='link' onClick={handleLogout} icon={<LogoutOutlined/>}
                            className='profile-dashboard-logout'>Выход</Button>
                }
            </div>
            <div className='profile-dashboard-avatar-container'>
                {avatarLoading ?
                    <SkeletonAvatar active style={{height: '75px', width: '75px'}}/> :
                    <>
                        <ImgCrop cropShape='round' modalTitle='Добавление изображения'>
                            <Upload showUploadList={false} beforeUpload={handleImageChange}>
                                <AvatarItem user={user} className='profile-dashboard-avatar'/>
                            </Upload>
                        </ImgCrop>
                    </>
                }
                <div className='profile-dashboard-avatar-buttons'>
                    {avatarLoading ? (<SkeletonButton block active style={{marginLeft: '10px'}} size='large'/>)
                        : <>
                            <ImgCrop cropShape='round' modalTitle='Добавление изображения'>
                                <Upload showUploadList={false} beforeUpload={handleImageChange}>
                                    <Button type='link' className='profile-dashboard-avatar-upload'>Загрузить
                                        фото</Button>
                                </Upload>
                            </ImgCrop>
                            {user?.avatarImage &&
                                <Button type='link' className='profile-dashboard-avatar-delete'
                                        onClick={handleImageDelete}>Удалить
                                    фото</Button>
                            }
                        </>
                    }
                </div>
            </div>
            <div className='profile-dashboard-login'>
                {avatarLoading ?
                    <SkeletonInput active/> :
                    <Input className='profile-dashboard-login-input'
                           value={userName}
                           ref={nameInputRef}
                           onKeyDown={handleEnterKeyPress}
                           onChange={(event) => setUserName(event.target.value)}
                    />
                }
                {user?.name !== userName &&
                    <div className='profile-dashboard-login-buttons'>
                        {avatarLoading ? (<SkeletonButton block active style={{marginLeft: '10px'}}/>) :
                            <>
                                <Button type='link' onClick={() => setUserName(user?.name)}>Отмена</Button>
                                <Button type='link' onClick={handleSaveNameClick}>Сохранить</Button>
                            </>
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default ProfileDashboard;
