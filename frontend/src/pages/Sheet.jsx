
import { Link, useNavigate } from "react-router-dom";
import useSheetStore from "../store/sheetStore.js";
import { useEffect } from "react";
import AdminSheet from "../../../admin/src/components/sheet/AdminSheet.js";



const Sheet = () => {
    const { sheets, isGettingSheet, getSheets } = useSheetStore()
    useEffect(() => {
        getSheets()
    }, [])

    const navigate = useNavigate();

    //  Check for data and render cleanly
    return (
        <div className="p-6 min-h-screen flex justify-center items-center">

            <div>
                <div className="pt-20 px-6 pb-10 min-h-screen">
                    {/* Sheets Grid */}
                    {sheets && sheets.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sheets.map((s, index) => (
                                <Link key={s.id || index} to={`/admin/sheet/${s.id}`}>
                                    <AdminSheet
                                        title={s.title}
                                        description={s.description}
                                        id={s.id}
                                    />
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center items-center gap-4 text-gray-500 dark:text-gray-400 mt-20">
                            <h3 className="text-lg font-medium">No Sheets Created</h3>
                            <div>
                                <Link to={`/admin/add-sheet`} >
                                    <button className="btn btn-outline">Create Sheet</button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

export default Sheet;
