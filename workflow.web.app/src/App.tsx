import {ITest} from "../features/models/ITest.ts";
import {useCreateUserOrderMutation, useGetTestsQuery} from "../store/apis/testApi.ts";
import {useEffect, useState} from "react";
import {ICreateTestCommand} from "../features/commands/test/ICreateTestCommand.ts";
import {HubConnectionBuilder} from "@microsoft/signalr";
import {BASE_HUB_URL} from "../config.ts";

function App() {

    const {data: tests, refetch} = useGetTestsQuery()
    const [title, setTitle] = useState("")
    const [createTest] = useCreateUserOrderMutation();

    const create = () => {
        const data: ICreateTestCommand = {
            title: title,
        };
        createTest(data)
        setTitle("")
    }

    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl(`${BASE_HUB_URL}/testHub`)
            .build();

        connection.start().then(() => {
            console.log('Connected to SignalR hub!');
        }).catch(error => {
            console.error('Failed to connect to SignalR hub:', error);
        });

        connection.on('TestCreated', (test: ITest) => {
            refetch()
        });
    }, []);

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
