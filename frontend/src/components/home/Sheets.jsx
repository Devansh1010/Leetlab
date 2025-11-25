import React, { useEffect } from 'react'
import useSheetStore from '../../store/sheetStore';
import SheetCard from '../../../../admin/src/components/sheet/SheetCard';
import { Link } from 'react-router-dom';

const Sheets = () => {
    const { sheets, getSheets } = useSheetStore();

    useEffect(() => {
        getSheets();
    }, [getSheets]);

    return (
        <div>
            <section className="relative flex flex-col justify-center min-h-screen ">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-extrabold">
                            Your Study Collections
                        </h2>
                    </div>

                    {sheets && sheets.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {sheets.map((s, index) => (
                                <Link key={s.id || index} to={`/sheet/${s.id}`}>
                                    <SheetCard
                                        title={s.title}
                                        description={s.description}
                                        id={s.id}
                                    />
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
                            <h3 className="text-xl font-medium">No Sheets Available Yet</h3>
                            <p className="mt-2">Start by exploring problems below.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}

export default Sheets