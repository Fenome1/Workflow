import "../style.scss";
import {useNavigate} from "react-router-dom";
import {useLoginUserMutation} from "../../../../store/apis/userApi.ts";
import {useCallback} from "react";
import {connection} from "../../../../store/signalRClient.ts";
import {Button, Form, Input, Spin} from "antd";
import {Card} from "react-bootstrap";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {ILoginUserCommand} from "../../../../features/commands/user/ILoginUserCommand.ts";

const LoginForm = () => {
    const navigate = useNavigate();
    const toRegisterPage = () => navigate("/reg");
    const toTeamPage = () => navigate("/team");

    const [login, {isLoading}] = useLoginUserMutation();
    const [form] = Form.useForm();

    const onFinish = async (values: ILoginUserCommand) => {
        try {
            const result = await login(values);
            if ("data" in result && result.data) {
                form.resetFields();
                startConnection();
                toTeamPage();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const startConnection = useCallback(() => {
        connection
            .start()
            .then(() => console.log("Connection started"))
            .catch((err) => console.error(err.toString()));
    }, []);

    return (
        <div>
            <Card className="auth-card">
                <Card.Body className="auth-card-body">
                    <b className="auth-header mb-4">Авторизация</b>
                    <Spin spinning={isLoading}>
                        <Form
                            name="loginForm"
                            form={form}
                            onFinish={onFinish}
                            className="login-form"
                        >
                            <Form.Item
                                name="email"
                                rules={[
                                    {required: true, message: "Пожалуйста, введите ваш email!"},
                                ]}
                            >
                                <Input
                                    style={{fontSize: "1rem"}}
                                    type="email"
                                    prefix={<UserOutlined/>}
                                    placeholder="E-mail.."
                                    disabled={isLoading}
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    {required: true, message: "Пожалуйста, введите ваш пароль!"},
                                ]}
                            >
                                <Input.Password
                                    style={{fontSize: "1rem"}}
                                    prefix={<LockOutlined/>}
                                    placeholder="Пароль"
                                    disabled={isLoading}
                                />
                            </Form.Item>
                            <Button type="primary" htmlType="submit" className="login-button"
                                    disabled={isLoading}>
                                Войти
                            </Button>
                            <Button
                                onClick={toRegisterPage}
                                type="link"
                                className="register-button"
                                disabled={isLoading}>
                                Зарегистрируйтесь сейчас!
                            </Button>
                        </Form>
                    </Spin>
                </Card.Body>
            </Card>
        </div>
    );
};

export default LoginForm;
