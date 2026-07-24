import { CheckCircle2, ShieldCheck } from "lucide-react";
function WelcomeCard() {
    const pointers = [
        "Where to apply for medical assistance (DSWD, DOH, LGU, PSWDO)",
        "Medical assistance programs offered by government agencies",
        "Requirements for Medicine Assistance",
        "Requirements for Hospital Bill Assistance",
        "Required documents and eligibility guidelines",
        "Step-by-step application process",
        "Frequently asked questions about medical assistance",
    ];
    return (
        <div className="relative overflow-hidden rounded-2xl border border-line bg-panel p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="flex items-center gap-2 text-lg font-bold text-ink text-gray-500 dark:text-slate-400">
                👋 Welcome to E-Tanong AI!
            </h2>
            <p className="mt-2 text-sm text-muted text-gray-500 dark:text-slate-400">
                Hi! I'm E-Tanong AI, your assistant for government medical assistance. I can guide you through the requirements and application process.
            </p>

            <p className="mt-4 text-sm font-semibold text-ink text-gray-500 dark:text-slate-400">I can help you with:</p>
            <ul className="mt-2 space-y-1.5">
                {pointers.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-ink dark:text-slate-200">
                    <CheckCircle2 size={16} className="shrink-0 text-emerald-500" />
                    {p}
                </li>
                ))}
            </ul>

            <div className="mt-4 flex items-start gap-2 border-t border-line pt-4 text-xs text-muted text-gray-500 dark:text-slate-400">
                <ShieldCheck size={14} className="mt-0.5 shrink-0 text-brand text-gray-500 dark:text-slate-400" />
                I provide process and requirements guidance only, and cannot diagnose conditions
                or prescribe treatment.
            </div>
        </div>
    );
}

export default WelcomeCard;