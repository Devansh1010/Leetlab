import { Navigate, Outlet } from "react-router-dom";
import useStore from "../store/store";
import { Loader2 } from "lucide-react";

const AdminAuthentication = () => {
    const { authUser, isCheckingAuth } = useStore();

    if (isCheckingAuth) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="size-10 animate-spin" />
            </div>
        );
    }

    if (!authUser) return <Navigate to="/login" />;

    if (authUser.role !== "ADMIN") return <Navigate to="/login" />;

    return <Outlet />;
};

export default AdminAuthentication;
