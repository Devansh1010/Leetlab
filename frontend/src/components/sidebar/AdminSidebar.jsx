import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import useStore from '../../store/store.js'
import {
    Sun,
    Moon,
} from "lucide-react";

const AdminSidebar = () => {
    const { authUser } = useStore()

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <div>
            <div className="drawer drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                </div>

                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="is-drawer-close:w-14 is-drawer-open:w-64 bg-base-200 flex flex-col items-start min-h-full">
                        {/* Sidebar content here */}
                        <ul className="menu w-full grow space-y-1">
                            <li className="w-full">
                                <div className="flex w-full ">
                                    <span className="is-drawer-close:hidden w-full">
                                        <div className="flex w-full justify-between items-center">
                                            <h2 className="text-xl font-bold text-primary">{authUser.name}
                                            </h2>

                                            <button
                                                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                                                className="p-2 rounded-lg hover:bg-base-200"
                                            >
                                                {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </span>
                                </div>
                            </li>
                            <div className="divider divider-neutral mb-10 is-drawer-close:hidden"></div>
                            <li>
                                <Link to="/admin" className="flex items-center gap-3 hover:text-primary">
                                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-2" data-tip="Homepage">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-grid-icon lucide-layout-grid"><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></svg>
                                        <span className="is-drawer-close:hidden">Dashboard</span>
                                    </button>
                                </Link>
                            </li>

                            {/* list item */}
                            <li>
                                <Link to="/admin/add-problems" className="flex items-center gap-3 hover:text-primary">
                                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-braces-icon lucide-file-braces"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" /><path d="M14 2v5a1 1 0 0 0 1 1h5" /><path d="M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1" /><path d="M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1" /></svg>
                                        <span className="is-drawer-close:hidden">Problems</span>
                                    </button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/add-sheet" className="flex items-center gap-3 hover:text-primary">
                                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-2" data-tip="Settings">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layers-icon lucide-layers"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" /><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" /><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" /></svg>
                                        <span className="is-drawer-close:hidden">Sheets</span>
                                    </button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/payment" className="flex items-center gap-3 hover:text-accent">
                                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-2" data-tip="Settings">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-credit-card-icon lucide-credit-card"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
                                        <span className="is-drawer-close:hidden">Paymetns</span>
                                    </button>
                                </Link>
                            </li>
                        </ul>

                        {/* button to open/close drawer */}
                        <div className="m-2 is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Open">
                            <label htmlFor="my-drawer-4" className="btn btn-ghost btn-circle drawer-button is-drawer-open:rotate-y-180">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="inline-block size-4 my-1.5"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                            </label>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminSidebar