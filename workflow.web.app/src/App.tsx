import {Provider} from "react-redux";
import {persistor, store} from "./store/store.ts";
import {RouterProvider} from "react-router-dom";
import {router} from "./Router.tsx";
import {PersistGate} from "redux-persist/integration/react";

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <RouterProvider router={router}/>
            </PersistGate>
        </Provider>
    )
}

export default App
