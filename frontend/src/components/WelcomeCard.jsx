import { CheckCircle2, ShieldCheck } from "lucide-react";
function WelcomeCard() {
    const pointers = [
        "Requirements & documents needed",
        "Step-by-step application processes",
        "Where and how to submit forms",
        "General FAQs about availing medical services",
    ];
    return (
        <div className="relative overflow-hidden rounded-2xl border border-line bg-panel p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="flex items-center gap-2 text-lg font-bold text-ink dark:text-white">
                👋 Welcome to MedCare AI!
            </h2>
            <p className="mt-2 text-sm text-muted">
                Hi, I'm your Medical Requirements Assistant.
            </p>

            <p className="mt-4 text-sm font-semibold text-ink dark:text-white">I can help you with:</p>
            <ul className="mt-2 space-y-1.5">
                {pointers.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-ink dark:text-slate-200">
                    <CheckCircle2 size={16} className="shrink-0 text-emerald-500" />
                    {p}
                </li>
                ))}
            </ul>

            <div className="mt-4 flex items-start gap-2 border-t border-line pt-4 text-xs text-muted dark:border-slate-800">
                <ShieldCheck size={14} className="mt-0.5 shrink-0 text-brand" />
                I provide process and requirements guidance only, and cannot diagnose conditions
                or prescribe treatment.
            </div>
        </div>
    );
}

export default WelcomeCard;