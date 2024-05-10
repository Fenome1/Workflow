import {Button, Form, FormProps, Input, message, Spin} from "antd";
import {useNavigate} from "react-router-dom";
import {useCallback} from "react";
import {connection} from "../../../../store/signalRClient.ts";
import {IRegisterUserCommand} from "../../../../features/commands/user/IRegisterUserCommand.ts";
import {Card} from "react-bootstrap";
import {useRegiserUserMutation} from "../../../../store/apis/user/userApi.ts";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import '../style.scss'

type Fields = {
    email: string
    password: string
    confirmPassword: string
}

const RegisterForm = () => {
    const navigate = useNavigate();
    const toLoginPage = () => navigate('/login');

    const [registerUser, {isLoading}] = useRegiserUserMutation();
    const [form] = Form.useForm();

    const onFinish: FormProps<Fields>['onFinish'] = async (values) => {
        if (values.password !== values.confirmPassword) {
            message.error("Пароли не совпадают", 5);
            return;
        }

        const registerUserCommand: IRegisterUserCommand = {
            email: values.email,
            password: values.password
        }

        try {
            const result = await registerUser(registerUserCommand);
            if ("data" in result && result.data) {
                form.resetFields();
                startConnection();
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
                    <b className='auth-header mb-4'>Регистрация</b>
                    <Spin spinning={isLoading}>
                        <Form
                            name="registerForm"
                            form={form}
                            onFinish={onFinish}
                            className="login-form">
                            <Form.Item
                                name="email"
                                rules={[{required: true, message: 'Пожалуйста, введите ваш email!'}]}>
                                <Input style={{fontSize: '1rem'}}
                                       disabled={isLoading}
                                       type='email'
                                       placeholder="E-mail.."
                                       prefix={<UserOutlined/>}/>
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{required: true, message: 'Пожалуйста, введите ваш пароль!'}]}>
                                <Input.Password style={{fontSize: '1rem'}}
                                                disabled={isLoading}
                                                placeholder="Пароль"
                                                prefix={<LockOutlined/>}/>
                            </Form.Item>

                            <Form.Item
                                name="confirmPassword"
                                dependencies={['password']}
                                rules={[
                                    {required: true, message: 'Пожалуйста, подтвердите ваш пароль!'},
                                    ({getFieldValue}) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Пароли не совпадают!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password prefix={<LockOutlined/>}
                                                disabled={isLoading}
                                                style={{fontSize: '1rem'}}
                                                placeholder="Подтвердите пароль"/>
                            </Form.Item>

                            <Button type="primary" htmlType="submit" disabled={isLoading} className="login-button">
                                Зарегистрироваться
                            </Button>

                            <Button onClick={toLoginPage} type="link" disabled={isLoading} className="register-button">
                                Уже есть аккаунт? Войдите сейчас!
                            </Button>
                        </Form>
                    </Spin>

                </Card.Body>
            </Card>
        </div>
    );
};

export default RegisterForm;
