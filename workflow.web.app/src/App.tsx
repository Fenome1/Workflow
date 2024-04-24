import {Provider} from "react-redux";
import {persistor, store} from "./store/store.ts";
import {RouterProvider} from "react-router-dom";
import {router} from "./Router.tsx";
import {PersistGate} from "redux-persist/integration/react";
import {ConfigProvider} from "antd";
import ruRU from "antd/lib/locale/ru_RU";

function App() {
    return (
        <ConfigProvider locale={ruRU}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <RouterProvider router={router}/>
                </PersistGate>
            </Provider>
        </ConfigProvider>

    )
}

export default App
