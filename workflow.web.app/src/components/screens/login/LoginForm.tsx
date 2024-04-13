import "./style.scss"
import {Button, Card, Form} from "react-bootstrap";

const LoginForm = () => {
    return (
        <div>
            {/*<span>Workflow</span>*/}
            <Card className="login-card">
                <Card.Body className="login-card-body">
                    <b className='login-header mb-4'>Авторизация</b>
                    <Form className="login-form">
                        <Form.Group className='mb-3'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="E-mail.."/>
                        </Form.Group>

                        <Form.Group className='mb-4'>
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password" placeholder="Пароль"/>
                        </Form.Group>

                        <Button type="submit" className="login-button">
                            Войти
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default LoginForm;