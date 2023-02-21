import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';


const DashboardLayout = () => {
    return (
        <div className="w-[90%] mx-auto grid grid-cols-12 md:gap-8 pt-14">
            <div className="col-span-12 lg:col-span-3">
                <ul className='space-y-4 p-4 md:py-4 border border-slate-600'>
                    <li><NavLink to='/dashboard' end className={({ isActive }) => `flex items-center py-1 px-4 text-lg font-semibold ${isActive && 'bg-[#45C6B1] '}`}><span>Employee</span></NavLink></li>
                    <li><NavLink to='dashboard/addEmployee' className={({ isActive }) => `flex items-center py-1 px-4 text-lg font-semibold ${isActive && 'bg-[#45C6B1] '}`}> <span>Add Employee</span></NavLink></li>
                </ul>
            </div>
            <div className="col-span-12 lg:col-span-9 mt-10 md:mt-0"><Outlet /></div>
        </div>
    );
};

export default DashboardLayout;