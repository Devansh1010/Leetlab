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
        <section className="min-h-screen bg-white dark:bg-[#161616] py-16 transition-colors">
            <div className="max-w-6xl mx-auto px-6">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-extrabold text-[#0f172a] dark:text-gray-100">
                        Your Study Collections
                    </h2>
                </div>

                {/* SHEETS GRID */}
                {sheets && sheets.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sheets.map((s, index) => (
                            <Link
                                key={s.id || index}
                                to={`/sheet/${s.id}`}
                                className="block group"
                            >
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
                        <h3 className="text-xl font-semibold text-[#0f172a] dark:text-gray-200">
                            No Sheets Available Yet
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Start by exploring problems and create your first sheet.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Sheets;
