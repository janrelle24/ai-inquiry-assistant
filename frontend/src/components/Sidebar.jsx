import { Plus, ClipboardList, Landmark, FileText, MapPin, Info, CheckCircle2,
    ShieldCheck, MessageCircleQuestion, } from "lucide-react";
import logo from "../assets/E-Tanong.png";
function Sidebar({ isOpen, onClose, onNewChat }) {

    const suggestedQuestions = [
        {
            icon: MessageCircleQuestion,
            tint: "text-indigo-600 bg-indigo-50",
            text: "What is E-Tanong AI?",
        },
        {
            icon: MapPin,
            tint: "text-blue-600 bg-blue-50",
            text: "Where can I apply for medical assistance?",
        },
        {
            icon: Landmark,
            tint: "text-emerald-600 bg-emerald-50",
            text: "What medical assistance programs are offered by DSWD, DOH, LGU, and PSWDO?",
        },
        {
            icon: ClipboardList,
            tint: "text-purple-600 bg-purple-50",
            text: "What are the requirements for Medicine Assistance?",
        },
        {
            icon: FileText,
            tint: "text-amber-600 bg-amber-50",
            text: "What are the requirements for Hospital Bill Assistance?",
        },
        {
            icon: CheckCircle2,
            tint: "text-blue-600 bg-blue-50",
            text: "What documents are required to apply for medical assistance?",
        },
        {
            icon: ShieldCheck,
            tint: "text-red-600 bg-red-50",
            text: "Who is eligible for government medical assistance?",
        },
    ];
    return (
        <aside className=
            {`
                fixed left-0 top-0 z-40
                flex h-full w-72 flex-col
                border-r border-slate-200
                bg-white
                transition-transform duration-300
                dark:border-slate-700
                dark:bg-slate-900

                ${isOpen ? "translate-x-0" : "-translate-x-full"}

                lg:relative
                lg:w-80
                lg:translate-x-0`}
            
        >
            
            <div className="flex items-center gap-3 px-6 py-6">
                <img
                    src={logo}
                    alt="E-Tanong AI Logo"
                    className="h-20 w-20 object-contain"
                />
                <div>
                    <h1 className="text-base font-bold leading-tight text-ink dark:text-white">E-Tanong AI</h1>
                    <p className="text-sm text-gray-500 dark:text-slate-400">Medical Requirements Assistant</p>
                </div>
            </div>

            {/* New Chat Button */}
            <div className="px-4">
                <button
                    onClick={() => {
                        onNewChat();
                        onClose();
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-medium text-white transition hover:bg-brand-dark cursor-pointer"
                >
                <Plus size={16} /> New Chat
                </button>
            </div>

            {/* Suggested Questions */}
            <div className="mt-4 flex-1 overflow-y-auto px-4">
                <p className="mb-4 font-semibold text-slate-900 dark:text-white">
                    Suggested Questions
                </p>

                <div className="space-y-2 mt-4">
                    {suggestedQuestions.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => onClose()}
                            className="w-full rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-blue-500 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 cursor-pointer"
                        >
                            <div className="flex items-start gap-3">
                                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${item.tint} dark:bg-slate-800`}>
                                    <item.icon size={14} />
                                </span>

                                <span className="text-sm cursor-pointer">
                                    {item.text}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Disclaimer */}
            
            <div className="m-4 rounded-xl border border-blue-100 bg-blue-50/70 p-4 text-xs text-blue-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                <div className="mb-1 flex items-center gap-2 font-semibold">
                    <Info size={14} /> Disclaimer
                </div>

                <p className="text-sm leading-6 text-gray-600 dark:text-slate-300">
                    I provide process and requirements guidance only, and cannot diagnose conditions
                    or prescribe treatment.
                </p>
            </div>
        </aside>
    );
}

export default Sidebar;