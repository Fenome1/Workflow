import React, {useRef, useState} from 'react';
import {Button, Input, InputRef} from "antd";
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

const ProfileDashboard = () => {
    const {user, accessToken, refreshToken} = useTypedSelector(state => state.user)

    const [userName, setUserName] = useState(user?.name);

    const fileInputRef = useRef<HTMLInputElement>(null)
    const nameInputRef = useRef<InputRef>(null)

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

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!user) return;
        const file = event.target.files?.[0];
        if (!file) return;
        setAvatarLoading(true);

        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = handleFileLoad;
        reader.onerror = handleFileError;
    };

    const handleFileLoad = (event: ProgressEvent<FileReader>) => {
        if (!user) return

        const arrayBuffer = event.target?.result as ArrayBuffer;
        const base64String = btoa(new Uint8Array(arrayBuffer)
            .reduce((data, byte) => data + String.fromCharCode(byte), ''));

        const command: IUpdateUserCommand = {
            userId: user.userId,
            avatarImage: base64String
        };

        updateUser(command).finally(() => setAvatarLoading(false));
    };

    const handleFileError = (event: ProgressEvent<FileReader>) => {
        console.error('Error reading file:', event.target?.error);
        setAvatarLoading(false);
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

    const handleUploadButtonClick = () => {
        fileInputRef.current?.click();
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
                    <AvatarItem user={user} className='profile-dashboard-avatar'/>
                }
                <div className='profile-dashboard-avatar-buttons'>
                    {avatarLoading ? (<SkeletonButton block active style={{marginLeft: '10px'}} size='large'/>)
                        : <>
                            <Button type='link' className='profile-dashboard-avatar-upload'
                                    onClick={handleUploadButtonClick}>Загрузить
                                фото</Button>
                                <input type="file" onChange={handleImageChange} style={{display: 'none'}}
                                       ref={fileInputRef} accept=".png, .jpg, .jpeg"/>
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
