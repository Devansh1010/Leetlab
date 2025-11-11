import React, { useEffect, useState } from 'react'
import { selectQuote } from "../../utils/quotes.js";
import useStore from '../../store/store.js';
import { Link } from 'react-router-dom';

const Hero = () => {

    const [quote, setQuote] = useState("");
    const { authUser } = useStore();

    useEffect(() => {
        setQuote(selectQuote(authUser))
    }, []);

    return (
        <div>
            <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
                {/* Gradient Glows */}
                <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 via-transparent to-cyan-500/10 blur-3xl" />
                <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000" />

                {/* Quote + CTA */}
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
                        Every line you write{" "}
                        <br />
                        <span className="bg-linear-to-r from-indigo-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                            shapes your legacy.
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        {quote}
                    </p>

                    <div className="mt-10 flex justify-center">
                        <Link
                            to="/sheet"
                            className="btn bg-linear-to-r from-indigo-500 to-cyan-500 border-none text-white font-semibold text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-cyan-500/30 hover:scale-105 transition-transform"
                        >
                            🚀 Start Solving
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero