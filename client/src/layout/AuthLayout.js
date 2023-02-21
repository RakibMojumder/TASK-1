import React from "react";
import { Outlet } from "react-router-dom";
import AuthNavbar from "../components/AuthNavbar";

const AuthLayout = () => {
    return (
        <div className="min-h-screen md:flex justify-center pt-24">
            <div className="md:w-1/2 lg:w-1/3">
                <div className="border border-slate-400 rounded-md">
                    <AuthNavbar />
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
