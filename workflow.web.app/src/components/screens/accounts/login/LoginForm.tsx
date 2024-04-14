import "../style.scss"
import {Button, Card, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {ILoginUserCommand} from "../../../../features/commands/user/ILoginUserCommand.ts";
import {useLoginUserMutation} from "../../../../store/apis/userApi.ts";

const LoginForm = () => {
    const navigate = useNavigate()
    const toRegisterPage = () => navigate('/reg')

    const {register, reset, resetField, handleSubmit} = useForm<ILoginUserCommand>()
    const [login] = useLoginUserMutation();

    const onSubmit = async (data: ILoginUserCommand) => {
        const result = await login(data)

        if ("data" in result && result.data) {
            reset()
        }

        resetField("password")
    }

    return (
        <div>
            <span>Workflow</span>
            <Card className="auth-card" onSubmit={handleSubmit(onSubmit)}>
                <Card.Body className="auth-card-body">
                    <b className='auth-header mb-4'>Авторизация</b>
                    <Form className="login-form d-grid gap-1">
                        <Form.Group className='mb-3'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control {...register("email")} required type="email" placeholder="E-mail.."/>
                        </Form.Group>

                        <Form.Group className='mb-4'>
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control {...register("password")} required type="password" placeholder="Пароль"/>
                        </Form.Group>
                        <Button type="submit" className="login-button">
                            Войти
                        </Button>

                        <Button onClick={toRegisterPage} variant="link" className="register-button">
                            Регистрация
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default LoginForm;