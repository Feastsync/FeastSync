import { Children } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "./component/Sidebar"
import AdminLayoutHeader from "./component/Header"

const AdminLayout = ()=>{
    return(
        <div style={{display:'flex'}}>
            <Sidebar />
            <div style={{marginLeft:280}}>
                <AdminLayoutHeader />
                <Outlet/>
            </div>
        </div>
    )
}

export default AdminLayout