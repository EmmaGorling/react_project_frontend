import Header from "./Header"
import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <footer>
                <p>PageTurner | Projektuppgift DT210G | Emma Ådahl Görling</p>
            </footer>
        </>
    )
}

export default Layout