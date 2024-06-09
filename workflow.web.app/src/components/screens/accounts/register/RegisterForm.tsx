import {Button, Form, FormProps, Input, message, Spin} from "antd";
import {useNavigate} from "react-router-dom";
import {IRegisterUserCommand} from "../../../../features/commands/user/IRegisterUserCommand.ts";
import {Card} from "react-bootstrap";
import {useRegiserUserMutation} from "../../../../store/apis/user/userApi.ts";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import '../style.scss'
import {useLoginMutation} from "../../../../store/apis";
import useAuth from "../../../../hok/useAuth.ts";
import {ILoginUserCommand} from "../../../../features/commands/user/ILoginUserCommand.ts";

type Fields = {
    email: string
    password: string
    confirmPassword: string
}

const RegisterForm = () => {
    const navigate = useNavigate();
    const navigateToLoginPage = () => navigate('/login');

    const [registerUser, {isLoading: isRegisterLoading}] = useRegiserUserMutation();
    const [login, {isLoading: isLoginLoading}] = useLoginMutation();
    const {navigateToTeamPage} = useAuth();


    const [form] = Form.useForm();

    const onFinish: FormProps<Fields>['onFinish'] = async (values) => {
        if (values.password !== values.confirmPassword) {
            message.error("Пароли не совпадают", 5);
            return;
        }

        const authUserCommand: IRegisterUserCommand | ILoginUserCommand = {
            email: values.email,
            password: values.password
        }

        try {
            const result = await registerUser(authUserCommand);

            if ("data" in result && result.data) {

                const result = await login(authUserCommand);

                if ("data" in result && result.data) {
                    navigateToTeamPage();
                }

                form.resetFields();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Card className="auth-card">
                <Card.Body className="auth-card-body">
                    <b className='auth-header mb-4'>Регистрация</b>
                    <Spin spinning={isRegisterLoading || isLoginLoading}>
                        <Form
                            name="registerForm"
                            form={form}
                            onFinish={onFinish}
                            className="login-form">
                            <Form.Item
                                name="email"
                                rules={[
                                    {required: true, message: 'Пожалуйста, введите ваш email!'},
                                    {type: 'email', message: 'Некорректный формат email адреса'}
                                ]}>
                                <Input style={{fontSize: '1rem'}}
                                       disabled={isRegisterLoading || isLoginLoading}
                                       placeholder="E-mail.."
                                       prefix={<UserOutlined/>}/>
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    {required: true, message: 'Пожалуйста, введите ваш пароль!'},
                                    {min: 6, message: 'Пароль должен содержать минимум 6 символов'},
                                    {max: 20, message: 'Пароль должен содержать максимум 20 символов'}
                                ]}>
                                <Input.Password style={{fontSize: '1rem'}}
                                                disabled={isRegisterLoading || isLoginLoading}
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
                                                disabled={isRegisterLoading || isLoginLoading}
                                                style={{fontSize: '1rem'}}
                                                placeholder="Подтвердите пароль"/>
                            </Form.Item>

                            <Button type="primary" htmlType="submit" disabled={isRegisterLoading || isLoginLoading}
                                    className="login-button">
                                Зарегистрироваться
                            </Button>

                            <Button onClick={navigateToLoginPage} type="link"
                                    disabled={isRegisterLoading || isLoginLoading} className="register-button">
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
