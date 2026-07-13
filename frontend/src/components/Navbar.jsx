import {
    Bell,
    Moon,
    UserCircle2,
} from "lucide-react";


function Navbar() {
    return (
        <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-8 py-5">
            {/* Left Side */}
            <div>
            <h1 className="text-2xl font-bold text-slate-800">
                Medical Inquiry Assistant
            </h1>
    
            <p className="mt-1 text-sm text-slate-500">
                Ask questions about medical services and general health information.
            </p>
            </div>
    
            {/* Right Side */}
            <div className="flex items-center gap-5">
            <button className="rounded-full p-2 transition hover:bg-slate-100">
                <Bell size={20} />
            </button>
    
            <button className="rounded-full p-2 transition hover:bg-slate-100">
                <Moon size={20} />
            </button>
    
            <button className="rounded-full p-2 transition hover:bg-slate-100">
                <UserCircle2 size={30} />
            </button>
            </div>
        </header>
    );
}

export default Navbar;