import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";

function Home() {
    return (
        <div className="flex h-screen bg-slate-100">
        <Sidebar />

        <div className="flex flex-1 flex-col">
            <Navbar />

            <ChatWindow />

            <ChatInput />
        </div>
        </div>
    );
}

export default Home;