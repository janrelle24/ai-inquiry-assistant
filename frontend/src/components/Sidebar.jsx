import { Plus, HeartPulse, Clock, ClipboardList, Landmark, FileText, MapPin, Wallet, Info } from "lucide-react";
function Sidebar() {

    const suggestedQuestions = [
        { icon: Clock, tint: "text-blue-600 bg-blue-50", text: "What are the steps for a PhilHealth claim?" },
        { icon: ClipboardList, tint: "text-emerald-600 bg-emerald-50", text: "What documents do I need for hospital admission?" },
        { icon: Landmark, tint: "text-purple-600 bg-purple-50", text: "How do I avail of a government health program?" },
        { icon: Wallet, tint: "text-amber-600 bg-amber-50", text: "How do I file an insurance reimbursement?" },
        { icon: FileText, tint: "text-blue-600 bg-blue-50", text: "How do I request a medical certificate?" },
        { icon: MapPin, tint: "text-red-600 bg-red-50", text: "Where do I submit my requirements?" },
    ];
    return (
        <aside className="hidden w-80 shrink-0 flex-col border-r border-line bg-panel dark:border-slate-800 dark:bg-slate-900 md:flex">
            
            <div className="flex items-center gap-3 px-6 py-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-emerald-400 text-white">
                <HeartPulse size={20} />
                </div>
                <div>
                <h1 className="text-base font-bold leading-tight text-ink dark:text-white">MedCare AI</h1>
                <p className="text-xs text-muted">Medical Requirements Assistant</p>
                </div>
            </div>

            {/* New Chat Button */}
            <div className="px-4">
                <button
                //onClick={onNewChat} later
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-medium text-white transition hover:bg-brand-dark cursor-pointer"
                >
                <Plus size={16} /> New Chat
                </button>
            </div>

            {/* Suggested Questions */}
            <div className="mt-4 flex-1 overflow-y-auto px-4">
                <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-muted">
                    Suggested Questions
                </p>

                <div className="space-y-2 mt-4">
                    {suggestedQuestions.map((item, index) => (
                        <button
                            key={index}
                            //onClick={() => onSuggestion(s.text)} later
                            className="flex w-full items-start gap-3 rounded-xl border border-line bg-panel px-3 py-2.5 text-left text-sm text-ink transition hover:border-brand/40 hover:bg-blue-50/50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                            >
                            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${item.tint} dark:bg-slate-800`}>
                                <item.icon size={14} />
                            </span>

                            <span className="text-sm cursor-pointer">
                                {item.text}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Disclaimer */}
            
            <div className="m-4 rounded-xl border border-blue-100 bg-blue-50/70 p-4 text-xs text-blue-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                <div className="mb-1 flex items-center gap-2 font-semibold">
                    <Info size={14} /> Disclaimer
                </div>

                <p className="leading-relaxed">
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