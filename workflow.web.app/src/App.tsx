import {ITest} from "../features/models/ITest.ts";
import {useCreateUserOrderMutation, useGetTestsQuery} from "../store/apis/testApi.ts";
import {useState} from "react";
import {ICreateTestCommand} from "../features/commands/test/ICreateTestCommand.ts";

function App() {

    const {data: tests} = useGetTestsQuery()
    const [title, setTitle] = useState("")
    const [createTest] = useCreateUserOrderMutation();

    const create = () => {
        const data: ICreateTestCommand = {
            title: title,
        };
        createTest(data)
        setTitle("")
    }

    return (
        <>
            Все тесты
            <button onClick={create}>Добавить</button>
            <input
                value={title}
                onChange={e => setTitle(e.target.value)}/>
            <ul>
                {tests?.map((test: ITest) => (
                    <li key={test.testId}>{test.title}</li>
                ))}
            </ul>
        </>
    )
}

export default App
