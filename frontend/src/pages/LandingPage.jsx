import { useState } from "react";
import { Link } from "react-router-dom";
import {
    MessageCircle,
    Send,
    Paperclip,
    Smile,
    ShieldCheck,
    MapPin,
    Pill,
    Receipt,
    ClipboardCheck,
    ClipboardList,
    CheckCircle2,
    Lock,
    ChevronDown,
    Plus,
    ArrowRight,
} from "lucide-react";

export default function ETanongLanding() {
    const [openFaq, setOpenFaq] = useState(0);
    //const [typedStep, setTypedStep] = useState(0);

    const suggestions = [
        { icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50", text: "Ano ang mga programang inaalok ng DSWD, DOH, LGU, at PSWDO?" },
        { icon: Pill, color: "text-violet-600 bg-violet-50", text: "Ano ang requirements para sa Medicine Assistance?" },
        { icon: Receipt, color: "text-amber-600 bg-amber-50", text: "Ano ang requirements para sa Hospital Bill Assistance?" },
        { icon: ClipboardCheck, color: "text-sky-600 bg-sky-50", text: "Anong mga dokumento ang kailangan para mag-apply?" },
        { icon: ShieldCheck, color: "text-rose-600 bg-rose-50", text: "Sino ang kwalipikado sa tulong medikal ng gobyerno?" },
    ];

    const capabilities = [
        { icon: MapPin, color: "text-emerald-600 bg-emerald-50", title: "Saan mag-apply", desc: "Alamin kung DSWD, DOH, LGU, o PSWDO ang tamang lapitan para sa iyong sitwasyon." },
        { icon: Pill, color: "text-violet-600 bg-violet-50", title: "Medicine Assistance", desc: "Buong listahan ng dokumentong kailangan bago ka pumunta sa opisina." },
        { icon: Receipt, color: "text-amber-600 bg-amber-50", title: "Hospital Bill Assistance", desc: "Gabay sa requirements para sa tulong-pinansyal sa gastusing pang-ospital." },
        { icon: ClipboardList, color: "text-sky-600 bg-sky-50", title: "Listahan ng dokumento", desc: "Kumpletong checklist ng papeles na kailangan mong dalhin." },
        { icon: ShieldCheck, color: "text-rose-600 bg-rose-50", title: "Eligibility check", desc: "Malaman kung sino ang kwalipikado batay sa alituntunin ng bawat programa." },
        { icon: MessageCircle, color: "text-teal-600 bg-teal-50", title: "Mga madalas itanong", desc: "Mabilis na sagot sa pinaka-karaniwang tanong tungkol sa proseso." },
    ];

    const steps = [
        { n: "01", title: "Itanong", desc: "I-type ang tanong mo tungkol sa tulong medikal, kasing simple ng 'saan ako mag-a-apply'." },
        { n: "02", title: "Alamin", desc: "Tatanggapin mo ang gabay: kung saang ahensya lalapit at anong dokumento ang dadalhin." },
        { n: "03", title: "Pumunta", desc: "Dala mo na ang kompletong requirements — mas mabilis, walang balik-balik." },
    ];

    const faqs = [
        { q: "Bayad ba gamitin ang E-Tanong AI?", a: "Libre ang paggamit nito. Layunin lang nitong gawing mas madali ang paghahanap ng impormasyon tungkol sa tulong medikal ng gobyerno." },
        { q: "Naka-imbak ba ang mga usapan ko?", a: "Hindi. Pansamantala at pribado ang bawat chat session — nawawala ito pagkatapos mong umalis." },
        { q: "Pwede ba akong ma-refer sa maling ahensya?", a: "Sinusunod ng mga sagot ang alam na proseso ng DSWD, DOH, LGU, at PSWDO, pero laging mabuting kumpirmahin sa opisina bago pumunta." },
        { q: "Nagbibigay ba ito ng medical advice?", a: "Hindi. Gabay lamang ito sa proseso at requirements — hindi ito nagde-diagnose ng kondisyon o nagrereseta ng gamot." },
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            {/* NAV */}
            <nav className="sticky top-0 z-30 bg-white/85 backdrop-blur border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center text-white shadow-sm shadow-teal-200">
                            <MessageCircle className="w-4.5 h-4.5" size={18} />
                        </div>
                        <div className="leading-tight">
                            <div className="font-bold text-slate-900 text-[15px]">E-Tanong AI</div>
                            <div className="text-[11px] text-slate-500 -mt-0.5">Medical Requirements Assistant</div>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                        <a href="#about" className="hover:text-slate-900">About</a>
                        <a href="#help" className="hover:text-slate-900">Matutulungan</a>
                        <a href="#steps" className="hover:text-slate-900">Paano gamitin</a>
                        <a href="#faq" className="hover:text-slate-900">FAQ</a>
                    </div>
                    <Link
                        to="/chat"
                        className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 transition-colors text-white text-sm font-semibold px-4 py-2.5 rounded-full shadow-sm shadow-indigo-200"
                    >
                        Simulan ang chat <ArrowRight size={14} />
                    </Link>
                </div>
            </nav>

            {/* HERO */}
            <header className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid lg:grid-cols-2 gap-14 items-center">
                <div>
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-wide uppercase text-teal-700 bg-teal-50 border border-teal-100 px-3 py-1 rounded-full">
                        Gabay sa tulong medikal ng gobyerno
                    </span>
                    <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.08] text-slate-900">
                        Malaman ang tamang <span className="text-indigo-600">hakbang</span> bago ka pumunta sa opisina.
                    </h1>
                    <p className="mt-5 text-[17px] text-slate-600 max-w-md leading-relaxed">
                        Itanong lang sa E-Tanong AI kung saan mag-apply, anong dokumento ang kailangan, at ano ang proseso — para sa DSWD, DOH, LGU, at PSWDO.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <Link
                            to="/chat"
                            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-semibold px-6 py-3.5 rounded-full shadow-md shadow-indigo-200"
                        >
                            Mag-chat ngayon <ArrowRight size={16} />
                        </Link>
                        <a
                            href="#about"
                            className="inline-flex items-center gap-2 border border-slate-300 hover:border-slate-400 transition-colors text-slate-700 font-semibold px-6 py-3.5 rounded-full"
                        >
                            Alamin kung paano gumagana
                        </a>
                    </div>
                    <div className="mt-7 flex flex-wrap gap-2">
                        {["DSWD", "DOH", "LGU", "PSWDO"].map((tag) => (
                        <span
                            key={tag}
                            className="text-[11px] font-semibold tracking-wide text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-full"
                        >
                            {tag}
                        </span>
                        ))}
                    </div>
                </div>

                {/* App preview mockup — mirrors the real product UI */}
                <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-teal-100 via-indigo-50 to-transparent rounded-[32px] blur-2xl opacity-70" />
                    <div className="relative bg-[#EEF0F6] border border-slate-200 rounded-[24px] shadow-xl shadow-slate-200/70 overflow-hidden">
                        <div className="bg-white px-5 py-3.5 border-b border-slate-200 flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white">
                                <MessageCircle size={15} />
                            </div>
                            <div className="leading-tight">
                                <div className="font-bold text-slate-900 text-[13px]">E-Tanong AI</div>
                                <div className="text-[10.5px] text-slate-500">Medical Requirements Assistant</div>
                            </div>
                            <div className="ml-auto flex items-center gap-1 text-[11px] font-semibold text-indigo-600 border border-indigo-200 bg-indigo-50 px-2.5 py-1 rounded-full">
                                <Plus size={12} /> New Chat
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="bg-white rounded-2xl border border-slate-200 p-5">
                                <p className="font-bold text-slate-900 text-[14px] mb-2">👋 Welcome to E-Tanong AI!</p>
                                <p className="text-[12.5px] text-slate-600 mb-3 leading-relaxed">
                                Hi! I'm your assistant for government medical assistance. I can guide you through the requirements and application process.
                                </p>
                                <ul className="space-y-1.5 mb-3">
                                {[
                                    "Saan mag-apply para sa medical assistance",
                                    "Requirements para sa Medicine Assistance",
                                    "Requirements para sa Hospital Bill Assistance",
                                    "Step-by-step application process",
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-1.5 text-[12px] text-slate-700">
                                    <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 shrink-0" />
                                    {item}
                                    </li>
                                ))}
                                </ul>
                                <div className="pt-3 border-t border-slate-100 flex items-start gap-1.5 text-[11px] text-slate-400 italic">
                                    <ShieldCheck size={13} className="mt-0.5 shrink-0" />
                                    I provide process and requirements guidance only, and cannot diagnose conditions or prescribe treatment.
                                </div>
                            </div>

                            <div className="mt-4 bg-white rounded-full border border-slate-200 px-4 py-2.5 flex items-center gap-3">
                                <Paperclip size={15} className="text-slate-400" />
                                <Smile size={15} className="text-slate-400" />
                                <span className="text-[12.5px] text-slate-400 flex-1">Ask a medical question…</span>
                                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0">
                                    <Send size={13} />
                                </div>
                            </div>
                            <div className="mt-2.5 flex items-center gap-1.5 text-[10.5px] text-slate-400">
                                <Lock size={10} />
                                Your conversations are not stored. Each chat is temporary and private.
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* TRUST BAR */}
            <div className="border-y border-slate-200 bg-white">
                <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-slate-500">
                    <span className="font-semibold text-slate-700">Nakahanay sa proseso ng —</span>
                    <span>Dept. of Social Welfare and Development</span>
                    <span className="text-slate-300">·</span>
                    <span>Department of Health</span>
                    <span className="text-slate-300">·</span>
                    <span>Local Government Units</span>
                    <span className="text-slate-300">·</span>
                    <span>Provincial Social Welfare and Development Office</span>
                </div>
            </div>

            {/* ABOUT */}
            <section id="about" className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-start">
                <div>
                    <span className="text-[12px] font-semibold tracking-wide uppercase text-indigo-600">Ano ang E-Tanong AI</span>
                    <h2 className="mt-3 text-3xl font-extrabold text-slate-900">Isang gabay, hindi isang pila.</h2>
                    <p className="mt-4 text-slate-600 leading-relaxed max-w-md">
                        Maraming Pilipino ang nahihirapang malaman kung saang ahensya sila dapat lumapit, o kung ano talaga ang kailangang dalhin — kaya paulit-ulit silang bumabalik sa opisina nang kulang sa requirements.
                    </p>
                    <p className="mt-3 text-slate-600 leading-relaxed max-w-md">
                        Sinasagot ng E-Tanong AI ang mga tanong na iyon bago ka pa umalis ng bahay, batay sa gabay ng DSWD, DOH, LGU, at PSWDO.
                    </p>
                </div>
                <div className="divide-y divide-slate-200 border-t border-slate-200">
                    {[
                        ["Sinasagot", "Saan mag-apply, anong requirements, at ano ang proseso"],
                        ["Hindi ginagawa", "Hindi nagde-diagnose o nagre-reseta ng gamot"],
                        ["Pribasiya", "Pansamantala at pribado ang bawat chat — walang naka-imbak"],
                        ["Access", "Bukas 24/7, direkta sa iyong browser"],
                    ].map(([label, val]) => (
                        <div key={label} className="flex justify-between items-baseline gap-6 py-5">
                        <span className="text-slate-500 text-sm">{label}</span>
                        <span className="text-slate-900 font-semibold text-sm text-right max-w-[280px]">{val}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* CAPABILITIES */}
            <section id="help" className="bg-white border-y border-slate-200">
                <div className="max-w-6xl mx-auto px-6 py-20">
                    <div className="max-w-xl mb-12">
                        <span className="text-[12px] font-semibold tracking-wide uppercase text-indigo-600">Ano ang matutulungan</span>
                        <h2 className="mt-3 text-3xl font-extrabold text-slate-900">Anumang tanong tungkol sa tulong medikal ng gobyerno.</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {capabilities.map(({ icon: Icon, color, title, desc }) => (
                        <div key={title} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                            <Icon size={18} />
                            </div>
                            <h3 className="font-bold text-slate-900 text-[15px] mb-1.5">{title}</h3>
                            <p className="text-[13.5px] text-slate-500 leading-relaxed">{desc}</p>
                        </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SUGGESTED QUESTIONS PREVIEW */}
            <section className="max-w-6xl mx-auto px-6 py-20">
                <div className="max-w-xl mb-10">
                    <span className="text-[12px] font-semibold tracking-wide uppercase text-indigo-600">Halimbawang tanong</span>
                    <h2 className="mt-3 text-3xl font-extrabold text-slate-900">Hindi mo kailangang alamin kung paano magtanong.</h2>
                    <p className="mt-3 text-slate-600">I-tap lang ang isa sa mga ito sa loob ng chat para makapagsimula.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                    {suggestions.map(({ icon: Icon, color, text }) => (
                        <a
                            href="#chat"
                            key={text}
                            className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-4 hover:border-indigo-300 hover:shadow-sm transition-all"
                            >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
                                <Icon size={16} />
                            </div>
                            <span className="text-[13.5px] text-slate-700 font-medium">{text}</span>
                        </a>
                    ))}
                </div>
            </section>

            {/* STEPS */}
            <section id="steps" className="max-w-6xl mx-auto px-6 pb-20">
                <div className="bg-slate-900 rounded-[28px] px-8 sm:px-14 py-16">
                    <div className="max-w-xl mb-12">
                        <span className="text-[12px] font-semibold tracking-wide uppercase text-teal-300">Paano ito gumagana</span>
                        <h2 className="mt-3 text-3xl font-extrabold text-white">Tatlong hakbang bago ka pumunta sa opisina.</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-10">
                        {steps.map((s) => (
                        <div key={s.n} className="border-t border-white/15 pt-6">
                            <span className="text-[12.5px] font-mono text-teal-300 tracking-wide">{s.n}</span>
                            <h3 className="mt-3 text-lg font-bold text-white">{s.title}</h3>
                            <p className="mt-2 text-[13.5px] text-slate-300 leading-relaxed">{s.desc}</p>
                        </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="bg-white border-y border-slate-200">
                <div className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16">
                    <div>
                        <span className="text-[12px] font-semibold tracking-wide uppercase text-indigo-600">FAQ</span>
                        <h2 className="mt-3 text-3xl font-extrabold text-slate-900">Mga karaniwang tanong</h2>
                        <p className="mt-3 text-slate-600 max-w-sm">Kung hindi mo makita ang sagot dito, i-type na lang ito diretso sa chat.</p>
                        <div className="mt-6 flex items-start gap-2.5 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3.5 text-[13px] text-indigo-800">
                            <ShieldCheck size={16} className="mt-0.5 shrink-0" />
                            Nagbibigay ang E-Tanong AI ng gabay sa proseso at requirements lamang. Hindi ito nagde-diagnose ng kondisyon o nagrereseta ng gamot.
                        </div>
                    </div>
                    <div>
                        {faqs.map((f, i) => (
                        <div key={f.q} className="border-b border-slate-200 py-5">
                            <button
                            onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                            className="w-full flex items-center justify-between gap-4 text-left"
                            >
                            <span className="font-semibold text-slate-900 text-[15px]">{f.q}</span>
                            <ChevronDown
                                size={18}
                                className={`shrink-0 text-indigo-500 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                            />
                            </button>
                            {openFaq === i && (
                            <p className="mt-3 text-[13.5px] text-slate-600 leading-relaxed max-w-lg">{f.a}</p>
                            )}
                        </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section id="chat" className="max-w-4xl mx-auto px-6 py-24 text-center">
                <span className="text-[12px] font-semibold tracking-wide uppercase text-indigo-600">Handa ka na ba?</span>
                <h2 className="mt-3 text-4xl font-extrabold text-slate-900">Itanong ang unang tanong mo ngayon.</h2>
                <p className="mt-4 text-slate-600">Ilang segundo lang bago mo malaman kung saan pupunta at ano ang dadalhin.</p>
                
                <Link
                    to="/chat"
                    className="mt-8 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-semibold px-7 py-4 rounded-full shadow-md shadow-indigo-200"
                >
                    Buksan ang E-Tanong AI <ArrowRight size={16} />
                </Link>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-slate-200">
                <div className="max-w-6xl mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-teal-500 flex items-center justify-center text-white">
                            <MessageCircle size={13} />
                        </div>
                        <span className="font-bold text-slate-900 text-sm">E-Tanong AI</span>
                    </div>
                    <span className="text-[12px] text-slate-400">Gabay lamang sa proseso — hindi kapalit ng payo mula sa opisyal na ahensya.</span>
                </div>
            </footer>
        </div>
    );
}
