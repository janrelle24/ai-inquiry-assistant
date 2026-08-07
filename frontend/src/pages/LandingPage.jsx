import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/E-Tanong.png";
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
    Loader2,
    Menu,
    X,
    Info,
    HelpCircle,
    ListOrdered,
    MessageCircleQuestion,
} from "lucide-react";
const conversations = [
    {
        question: "What are the requirements for Medicine Assistance?",
        answer: [
        "Medical Certificate",
        "Valid Government ID",
        "Reseta ng doktor",
        "Barangay Certificate"
        ]
    },
    {
        question: "Where should I apply?",
        answer: [
        "It depends on your situation.",
        "You may need to apply through the DSWD, DOH, LGU, or PSWDO."
        ]
    },
    {
        question: "Is the service free?",
        answer: [
        "Yes.",
        "E-Tanong AI is free to use."
        ]
    }
];

const suggestions = [
    { icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50", text: "What medical assistance programs are offered by DSWD, DOH, LGU, and PSWDO?" },
    { icon: Pill, color: "text-violet-600 bg-violet-50", text: "What are the requirements for  Medicine Assistance?" },
    { icon: Receipt, color: "text-amber-600 bg-amber-50", text: "What are the requirements for Hospital Bill Assistance?" },
    { icon: ClipboardCheck, color: "text-sky-600 bg-sky-50", text: "What documents are required to apply for assistance?" },
    { icon: ShieldCheck, color: "text-rose-600 bg-rose-50", text: "Who is eligible for government assistance?" },
];

const capabilities = [
    { icon: MapPin, color: "text-emerald-600 bg-emerald-50", title: "Where to Apply", desc: "Find out whether to apply through the DSWD, DOH, LGU, or PSWDO based on your situation." },
    { icon: Pill, color: "text-violet-600 bg-violet-50", title: "Medicine Assistance", desc: "Complete list of the documents you need before visiting the office." },
    { icon: Receipt, color: "text-amber-600 bg-amber-50", title: "Hospital Bill Assistance", desc: "Guide to the requirements for obtaining financial assistance with hospital expenses." },
    { icon: ClipboardList, color: "text-sky-600 bg-sky-50", title: "Document Checklist", desc: "A complete checklist of the documents you need to bring." },
    { icon: ShieldCheck, color: "text-rose-600 bg-rose-50", title: "Eligibility check", desc: "Find out who qualifies based on each program's eligibility guidelines." },
    { icon: MessageCircle, color: "text-teal-600 bg-teal-50", title: "Frequently Asked Questions", desc: "Quick answers to the most common questions about the application process." },
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

const navLinks = [
    { href: "#about", label: "About", icon: Info },
    { href: "#help", label: "Matutulungan", icon: HelpCircle },
    { href: "#steps", label: "Paano gamitin", icon: ListOrdered },
    { href: "#faq", label: "FAQ", icon: MessageCircleQuestion },
];

// Full-screen loading takeover shown while the app "connects" to the chat
function ChatLoadingOverlay({ visible }) {
    return (
        <div
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-50/95 backdrop-blur-sm transition-opacity duration-300 ${
                visible ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            role="status"
            aria-live="polite"
        >
            <div className="relative flex items-center justify-center">
                <span className="absolute h-20 w-20 rounded-full bg-teal-400/20 animate-ping" />
                <span className="absolute h-20 w-20 rounded-full border-2 border-teal-200" />
                <img
                    src={logo}
                    alt="E-Tanong AI Logo"
                    className="relative w-14 h-14 rounded-2xl object-contain shadow-lg shadow-teal-200"
                />
            </div>

            <div className="mt-7 flex items-center gap-2 text-slate-700 font-semibold text-[15px]">
                <Loader2 size={16} className="animate-spin text-indigo-600" />
                Kumokonekta sa E-Tanong AI...
            </div>
            <p className="mt-2 text-[13px] text-slate-400">Isang sandali lang, inihahanda na ang iyong chat.</p>
        </div>
    );
}

export default function ETanongLanding() {
    const [openFaq, setOpenFaq] = useState(0);
    const [chatStage, setChatStage] = useState("user");
    const [currentChat, setCurrentChat] = useState(0);
    //
    const [chatLoading, setChatLoading] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false); // mobile sidebar drawer
    const [scrolled, setScrolled] = useState(false);
    const [isDesktop, setIsDesktop] = useState(() =>
        typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)").matches : true
    );
    const navigate = useNavigate();

    // Drives top-nav (desktop) vs sidebar-drawer (mobile) directly off actual window width
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)");
        const onChange = (e) => setIsDesktop(e.matches);
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const user = setTimeout(() => {
            setChatStage("user");
        }, 0);
        const typing = setTimeout(() => {
            setChatStage("typing");
        }, 1800);
        const reply = setTimeout(() => {
            setChatStage("reply");
        }, 3000);
        const next = setTimeout(() => {
            setCurrentChat((prev) => (prev + 1) % conversations.length);
        }, 6500);
    
    
        return () => {
            clearTimeout(user);
            clearTimeout(typing);
            clearTimeout(reply);
            clearTimeout(next);
        };
    }, [currentChat]);
    
    // Shows a full-screen loading takeover before navigating to /chat
    const handleStartChat = () => {
        if (chatLoading) return;
        setChatLoading(true);
        setTimeout(() => {
            navigate("/chat");
        }, 1400);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            <ChatLoadingOverlay visible={chatLoading} />

            {/* MOBILE TOPBAR + SIDEBAR DRAWER */}
            {!isDesktop && (
            <>
            <div className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="E-Tanong AI Logo" className="w-8 h-8 rounded-lg object-contain" />
                    <span className="font-bold text-slate-900 text-[15px]">E-Tanong AI</span>
                </div>
                <button
                    onClick={() => setMobileOpen(true)}
                    className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
                    aria-label="Open menu"
                >
                    <Menu size={20} />
                </button>
            </div>

            <div
                onClick={() => setMobileOpen(false)}
                className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
                    mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            />
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ${
                    mobileOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="E-Tanong AI Logo" className="w-8 h-8 rounded-lg object-contain" />
                        <span className="font-bold text-slate-900 text-[15px]">E-Tanong AI</span>
                    </div>
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition"
                        aria-label="Close menu"
                    >
                        <X size={18} />
                    </button>
                </div>
                <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                        >
                            <link.icon size={18} />
                            {link.label}
                        </a>
                    ))}
                </nav>
                <div className="p-3 border-t border-slate-200">
                    <button
                        onClick={() => { setMobileOpen(false); handleStartChat(); }}
                        disabled={chatLoading}
                        className="w-full inline-flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 transition-colors text-white text-sm font-semibold px-4 py-2.5 rounded-full"
                    >
                        Simulan ang chat <ArrowRight size={14} />
                    </button>
                </div>
            </aside>
            </>
            )}

            {/* DESKTOP TOP NAV */}
            {isDesktop && (
            <nav
                className={`sticky top-0 z-30 bg-white/85 backdrop-blur border-b transition-shadow duration-300 ${
                    scrolled ? "border-slate-200 shadow-sm shadow-slate-200/60" : "border-transparent"
                }`}
            >
                <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <img src={logo} alt="E-Tanong AI Logo" className="w-8 h-8 rounded-lg object-contain shrink-0" />
                        <span className="font-bold text-slate-900 text-[15px]">E-Tanong AI</span>
                    </div>

                    <div className="flex items-center gap-7 text-sm font-medium text-slate-600">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="relative py-1 hover:text-slate-900 transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-[1.5px] after:w-0 after:bg-indigo-600 after:transition-all hover:after:w-full"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <button
                        onClick={handleStartChat}
                        disabled={chatLoading}
                        className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-90 disabled:cursor-not-allowed transition-colors text-white text-sm font-semibold px-4 py-2.5 rounded-full shadow-sm shadow-indigo-200 min-w-[152px] justify-center cursor-pointer"
                    >
                        Simulan ang chat <ArrowRight size={14} />
                    </button>
                </div>
            </nav>
            )}

            {/* PAGE CONTENT */}
            <div>

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
                        <button
                            onClick={handleStartChat}
                            disabled={chatLoading}
                            className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-90 disabled:cursor-not-allowed transition-colors text-white text-sm font-semibold px-4 py-2.5 rounded-full shadow-sm shadow-indigo-200 min-w-[152px] justify-center cursor-pointer"
                        >
                            Mag chat ngayon <ArrowRight size={14} />
                        </button>
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
                            <img
                                src={logo}
                                alt="E-Tanong AI Logo"
                                className="w-8 h-8 rounded-lg object-contain"
                            />
                            <div className="leading-tight">
                                <div className="font-bold text-slate-900 text-[13px]">E-Tanong AI</div>
                                <div className="text-[10.5px] text-slate-500">Medical Requirements Assistant</div>
                            </div>
                            <div className="ml-auto flex items-center gap-1 text-[11px] font-semibold text-indigo-600 border border-indigo-200 bg-indigo-50 px-2.5 py-1 rounded-full">
                                <Plus size={12} /> New Chat
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl border border-slate-200 p-5">
                            <div className="h-40 overflow-y-auto">
                                {/* USER */}
                                
                                {chatStage !== "hidden" && (
                                    <div className="flex justify-end">
                                        <div className="bg-indigo-600 text-white rounded-2xl rounded-br-md px-4 py-3 text-sm max-w-[80%] shadow">
                                            {conversations[currentChat].question}
                                        </div>
                                    </div>
                                )}
                                
                                {/* AI Typing */}
                                
                                {chatStage === "typing" && (
                                    <div className="flex">
                                        <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-3">
                                            <div className="flex gap-1">
                                                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></span>
                                                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:.15s]"></span>
                                                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:.3s]"></span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                {/* AI Reply */}
                                
                                {chatStage === "reply" && (
                                    <div className="flex">
                                        <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-3 text-sm max-w-[85%] space-y-1 shadow">

                                            {conversations[currentChat].answer.map((item) => (
                                            <div key={item}>✓ {item}</div>
                                            ))}

                                        </div>
                                    </div>
                                )}
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
                    <h2 className="mt-3 text-3xl font-extrabold text-slate-900">Mas malinaw na gabay. Mas mabilis na proseso. Mas Kaunting pabalik-balik opisina.</h2>
                    <p className="mt-4 text-slate-600 leading-relaxed max-w-md">
                        Maraming mamamayan ang nalilito kung saang ahensya dapat lumapit o kung anu-anong dokumento ang kailangang ihanda. 
                        Dahil dito, nauuwi sa paulit-ulit na pagpunta sa opisina at dagdag na oras, gastos, at abala.
                    </p>
                    <p className="mt-4 text-slate-600 leading-relaxed max-w-md">
                        Sa E-Tanong AI, maaari kang magtanong at makatanggap ng malinaw na gabay batay sa impormasyon mula sa DSWD, DOH, LGU, at PSWDO. 
                        Tutulungan ka nitong malaman ang tamang opisina, ang mga kinakailangang dokumento, at ang proseso ng pag-avail ng mga programang pangtulong.
                    </p>
                    <p className="mt-3 text-slate-600 leading-relaxed max-w-md">
                        Sa ngayon, ang E-Tanong AI ay nakatuon sa Lalawigan ng Agusan del Norte, upang makapagbigay ng mas tumpak at angkop na impormasyon para sa mga mamamayan ng lalawigan.
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
                <button
                    onClick={handleStartChat}
                    disabled={chatLoading}
                    className="mt-8 inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-90 disabled:cursor-not-allowed transition-colors text-white text-sm font-semibold px-4 py-2.5 rounded-full shadow-sm shadow-indigo-200 min-w-[152px] justify-center cursor-pointer"
                >
                    Buksan ang E-Tanong AI <ArrowRight size={14} />
                </button>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-slate-200">
                <div className="max-w-6xl mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <img
                            src={logo}
                            alt="E-Tanong AI Logo"
                            className="w-7 h-7 rounded-lg object-contain"
                        />
                        <span className="font-bold text-slate-900 text-sm">E-Tanong AI</span>
                    </div>
                    <span className="text-[12px] text-slate-400">Gabay lamang sa proseso — hindi kapalit ng payo mula sa opisyal na ahensya.</span>
                </div>
            </footer>

            </div>
        </div>
    );
}
