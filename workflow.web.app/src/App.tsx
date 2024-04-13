import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import {RouterProvider} from "react-router-dom";
import {router} from "./Router.tsx";

function App() {
    return (
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    )
}

export default App
