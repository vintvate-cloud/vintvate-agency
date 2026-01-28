"use client";

import { motion } from "framer-motion";

export default function WorksPage() {
    return (
        <main className="w-full min-h-screen bg-[#F4F4F4] pt-32 px-6 md:px-12">
            <h1 className="font-anton text-6xl md:text-9xl uppercase text-black mb-20">
                All Projects
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                {/* Placeholders for full project list */}
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="h-[50vh] bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="font-inter text-gray-400">Project {item}</span>
                    </div>
                ))}
            </div>
        </main>
    );
}
