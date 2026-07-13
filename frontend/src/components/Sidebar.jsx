import {
    FaRobot,
    FaRegClock,
    FaCalendarAlt,
    FaHospital,
    FaHeartbeat,
    FaMapMarkerAlt,
} from "react-icons/fa";

import { MdOutlineHealthAndSafety } from "react-icons/md";
import { Plus } from "lucide-react";
function Sidebar() {

    const suggestedQuestions = [
        {
            icon: <FaRegClock />,
            question: "What are your clinic hours?",
        },
        {
            icon: <FaCalendarAlt />,
            question: "How do I book an appointment?",
        },
        {
            icon: <FaHospital />,
            question: "What departments do you have?",
        },
        {
            icon: <FaHeartbeat />,
            question: "What is hypertension?",
        },
        {
            icon: <FaMapMarkerAlt />,
            question: "Where is the laboratory?",
        },
    ];
    return (
        <aside className="flex w-80 flex-col border-r bg-white">
            {/* Logo */}
            {/*}
            <div className="border-b p-6">
                <h1 className="text-2xl font-bold text-blue-600">
                    MediGuide AI
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                Medical Inquiry Assistant
                </p>
            </div>*/}
            <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-600 p-3 text-white">
                    <FaRobot size={22} />
                </div>

                <div>
                    <h1 className="text-xl font-bold">
                    MediGuide AI
                    </h1>

                    <p className="text-sm text-gray-500">
                    Medical Inquiry Assistant
                    </p>
                </div>
            </div>

            {/* New Chat Button */}
            <div className="p-6">
            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700">
                <Plus size={18} />
                New Chat
            </button> 
            </div>

            {/* Suggested Questions */}
            <div className="flex-1 overflow-y-auto px-6">
                <h2 className="mb-4 font-semibold">
                Suggested Questions
                </h2>

                <div className="space-y-3">
                {suggestedQuestions.map((item, index) => (
                    <button
                        key={index}
                        className="w-full rounded-xl border p-4 text-left transition hover:border-blue-500 hover:bg-blue-50"
                        >
                        <span className="text-blue-600">
                            {item.icon}
                        </span>

                        <span className="text-sm">
                            {item.question}
                        </span>
                    </button>
                ))}
                </div>
            </div>

            {/* Disclaimer */}
            
            <div className="m-6 rounded-2xl bg-slate-100 p-5">
                <div className="mb-3 flex items-center gap-2">
                    <MdOutlineHealthAndSafety
                    className="text-blue-600"
                    size={20}
                    />

                    <h3 className="font-semibold">
                    Disclaimer
                    </h3>
                </div>

                <p className="text-sm leading-6 text-gray-600">
                    I provide general health information only and
                    cannot diagnose illnesses or prescribe
                    medication. Always consult a licensed
                    healthcare professional.
                </p>
            </div>
        </aside>
    );
}

export default Sidebar;