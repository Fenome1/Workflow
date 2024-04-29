import './style.scss'
import {Avatar, Button, Input} from "antd";
import {LogoutOutlined} from "@ant-design/icons";

const Profile = () => {
    return (
        <div className="profile-container">
            <div className="profile-dashboard-container">
                <div className='profile-dashboard-header'>
                    <span className='profile-dashboard-title'>Профиль</span>
                    <Button type='link' icon={<LogoutOutlined/>} className='profile-dashboard-logout'>Выход</Button>
                </div>
                <div className='profile-dashboard-avatar-container'>
                    <Avatar className="profile-dashboard-avatar"/>
                    <div className='profile-dashboard-avatar-buttons'>
                        <Button type='link'>Загрузить фото</Button>
                        <Button type='link'>Удалить фото</Button>
                    </div>
                </div>
                <div className='profile-dashboard-login'>
                    <Input  className='profile-dashboard-login-input'/>
                    <div className='profile-dashboard-login-buttons'>
                        <Button type='link'>Отмена</Button>
                        <Button type='link'>Сохранить</Button>
                    </div>
                </div>
            </div>
            <div className="agencies-dashboard-container">
                Работа с агентством
            </div>
        </div>
    );
};

export default Profile;