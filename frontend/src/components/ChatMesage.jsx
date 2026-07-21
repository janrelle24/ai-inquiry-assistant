import { FaRobot, FaUser } from "react-icons/fa";
import CopyButton from "./CopyButton";
import { motion } from "framer-motion";
function ChatMessage({ message }) {
    const isUser = message.role === "user";

    const time = new Date(message.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.3,
            }}
            className={`mb-6 flex ${
                isUser ? "justify-end" : "justify-start"
            }`}
        >
            <div className="flex max-w-2xl gap-3">

                {/* AI Avatar */}
                {!isUser && (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                        <FaRobot />
                    </div>
                )}

                <div className="group">

                    {/* Sender */}
                    <p className="mb-1 text-sm font-semibold text-gray-600">
                        {isUser ? "You" : "MedCare AI"}
                    </p>

                    {/* Bubble */}
                    <div
                        className={`rounded-2xl px-5 py-3 ${
                            isUser
                                ? "bg-blue-600 text-white"
                                : "bg-white text-slate-900 shadow dark:bg-slate-800 dark:text-white"
                        }`}
                    >
                        {message.content}
                    </div>

                    {/* Timestamp */}
                    <p className="mt-1 text-xs text-gray-400">
                        {time}
                    </p>
                    {!isUser && (
                        <CopyButton text={message.content} />
                    )}
                </div>

                {/* User Avatar */}
                {isUser && (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-white">
                        <FaUser />
                    </div>
                )}

            </div>
        </motion.div>
    );
}

export default ChatMessage;