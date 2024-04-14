import "../style.scss"
import {Button, Card, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {IRegisterData} from "./interfaces/IRegisterData.ts";
import {useRegiserUserMutation} from "../../../../store/apis/userApi.ts";
import {message} from "antd";
import {IRegisterUserCommand} from "../../../../features/commands/user/IRegisterUserCommand.ts";

const RegisterForm = () => {
    const navigate = useNavigate()
    const toLoginPage = () => navigate('/login')

    const {register, reset, resetField, handleSubmit} = useForm<IRegisterData>();

    const [registerUser] = useRegiserUserMutation()

    const onSubmit = async (data: IRegisterData) => {

        if (data.password !== data.confirmPassword) {
            message.error("Пароли не совпадают", 5)
            return
        }
        const registerCommand = {
            email: data.email,
            password: data.password
        } as IRegisterUserCommand;

        const result = await registerUser(registerCommand)

        if ("data" in result && result.data) {
            reset()
        }

        resetField("password")
        resetField("confirmPassword")
    }

    return (
        <div>
            {/*<span>Workflow</span>*/}
            <Card className="auth-card" onSubmit={handleSubmit(onSubmit)}>
                <Card.Body className="auth-card-body">
                    <b className='auth-header mb-4'>Регистрация</b>
                    <Form className="d-grid gap-1">
                        <Form.Group className='mb-2'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control {...register("email")} required type="email" placeholder="E-mail.."/>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control {...register("password")} required type="password" placeholder="Пароль"/>
                        </Form.Group>

                        <Form.Group className='mb-4'>
                            <Form.Label>Подтверждение</Form.Label>
                            <Form.Control {...register("confirmPassword")} required type="password"
                                          placeholder="Подтверить"/>
                        </Form.Group>

                        <Button type="submit" className="login-button">
                            Зарегистрироваться
                        </Button>

                        <Button variant="link" className="register-button" onClick={toLoginPage}>
                            Уже есть аккаунт?
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default RegisterForm;