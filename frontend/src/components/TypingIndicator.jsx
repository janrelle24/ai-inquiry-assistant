function TypingIndicator() {
    return (
        <div className="mb-4 flex justify-start">
            <div className="rounded-2xl bg-white px-4 py-3 shadow">
                <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500"></span>
                    <span
                        className="h-2 w-2 animate-bounce rounded-full bg-gray-500"
                        style={{ animationDelay: "0.2s" }}
                    ></span>
                    <span
                        className="h-2 w-2 animate-bounce rounded-full bg-gray-500"
                        style={{ animationDelay: "0.4s" }}
                    ></span>
                </div>
            </div>
        </div>
    );
}

export default TypingIndicator;