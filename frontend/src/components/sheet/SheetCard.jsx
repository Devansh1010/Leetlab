import { BookOpen, FileText, ArrowRight } from "lucide-react";

const SheetCard = ({ image, title, description, btnTitle = "Explore Now", id }) => {
    return (
        <div className="group relative w-96 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/60 backdrop-blur-md shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-500">

            {/* Image Section */}
            <figure className="relative h-52 overflow-hidden">
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Floating Icon */}
                <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20">
                    <BookOpen className="w-6 h-6 text-white" />
                </div>
            </figure>

            {/* Content Section */}
            <div className="relative z-10 p-5 space-y-4">
                {/* Title */}
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 tracking-tight flex items-center gap-2">
                    {title}
                </h2>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2 flex items-start gap-2">
                    <FileText className="w-4 h-4 mt-0.5 text-primary/70" />
                    {description}
                </p>

                {/* Button */}
                <div className="pt-2">
                    <button className="relative w-full inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary/90 to-secondary/90 px-5 py-2.5 font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-lg focus:outline-none">
                        <span className="relative z-10 flex items-center gap-2">
                            {btnTitle}
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>

                        {/* Soft Glow */}
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    </button>
                </div>
            </div>
        </div>


    )
}

export default SheetCard