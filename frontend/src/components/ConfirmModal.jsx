function ConfirmModal({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-2xl bg-black p-6 shadow-xl">

                <h2 className="mb-2 text-xl font-bold">
                    {title}
                </h2>

                <p className="mb-6 text-gray-600">
                    {message}
                </p>

                <div className="flex mt-5 justify-center gap-3">
                    <button
                        onClick={onCancel}
                        className="rounded-xl border px-5 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="rounded-xl bg-red-600 px-5 py-2 text-white hover:bg-red-700 cursor-pointer"
                    >
                        New Chat
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ConfirmModal;