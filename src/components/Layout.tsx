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
                <p>Footer</p>
            </footer>
        </>
    )
}

export default Layout