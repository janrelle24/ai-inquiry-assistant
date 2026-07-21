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
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl transition-colors dark:bg-slate-900">

                <h2 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                    {title}
                </h2>

                <p className="mb-6 text-gray-600 dark:text-slate-300">
                    {message}
                </p>

                <div className="flex mt-5 justify-center gap-3">
                    <button
                        onClick={onCancel}
                        className="rounded-xl border border-slate-300 px-5 py-2 transition hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800 cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="rounded-xl bg-red-600 px-5 py-2 text-white transition hover:bg-red-700 cursor-pointer"
                    >
                        New Chat
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ConfirmModal;