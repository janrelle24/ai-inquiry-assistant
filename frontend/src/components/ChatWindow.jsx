import WelcomeCard from "./WelcomeCard";
import ChatMessage from "./ChatMesage"; 
function ChatWindow({ messages }) {
    return (
        <main className="flex-1 overflow-y-auto bg-slate-100 p-8">
            {messages.length === 0 ? (
                <WelcomeCard />
            ) : (
                messages.map((message) =>(
                    <ChatMessage
                        key={message.id}
                        message={message}
                    />
                ))
            )}
        </main>
    );
}

export default ChatWindow;