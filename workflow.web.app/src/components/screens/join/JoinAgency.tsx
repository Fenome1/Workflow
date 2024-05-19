import {Button, Modal, Result, Spin, Typography} from "antd";
import {FC, useEffect} from "react";
import {useMatch, useNavigate} from "react-router-dom";
import {useGetAgencyByTokenQuery, useJoinToAgencyMutation} from "../../../store/apis/agency/agencyApi.ts";
import {useDialog} from "../../../hok/useDialog.ts";
import {IJoinToAgencyCommand} from "../../../features/commands/agency/IJoinToAgencyCommand.ts";
import {useTypedSelector} from "../../../store/hooks/hooks.ts";
import './style.scss'

const JoinAgency: FC = () => {
    const match = useMatch("join/:token");
    const token = match?.params.token;

    const {user} = useTypedSelector((store) => store.user);

    const {
        data: agency, isLoading: isAgencyLoading, error
    } = useGetAgencyByTokenQuery(token ?? "", {skip: token === undefined});

    const [joinToAgency] = useJoinToAgencyMutation();
    const joinDialog = useDialog();
    const navigate = useNavigate();
    const toTeamPage = () => navigate('/team')

    useEffect(() => {
        if (!error && agency) {
            joinDialog.show();
        }
    }, [error, agency]);

    const handleJoin = async () => {
        if (!agency || !user) return;

        const command: IJoinToAgencyCommand = {
            agencyId: agency.agencyId,
            userId: user.userId
        };

        await joinToAgency(command);
        joinDialog.close();
        toTeamPage()
    };

    const handleCancel = () => {
        joinDialog.close();
        toTeamPage()
    };

    return (
        <Spin spinning={isAgencyLoading}>
            <Modal
                centered
                title="Присоединиться к агентству"
                open={joinDialog.open}
                onOk={handleJoin}
                onCancel={handleCancel}
                okText="Присоединиться"
                cancelText="Отмена">
                {agency && (
                    <Typography>
                        Вы хотите присоединиться к агентству "{agency.name}" ?
                    </Typography>
                )}
            </Modal>
            {error && (
                <div className='agency-not-found'>
                    <Result
                        status="404"
                        title="Агентство не найдено"
                        subTitle="Агентство не найдено или ссылка недействительна. Пожалуйста, проверьте правильность ссылки."
                        extra={
                            <Button type="primary" onClick={toTeamPage}>
                                На главную
                            </Button>
                        }
                    />
                </div>
            )}
        </Spin>
    );
};

export default JoinAgency;
