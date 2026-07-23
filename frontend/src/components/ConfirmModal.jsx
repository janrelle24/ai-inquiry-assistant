function ConfirmModal({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl transition-colors dark:bg-slate-900 sm:p-6">

                <h2 className="mb-2 text-xl font-bold text-slate-900 dark:text-white sm:text-xl">
                    {title}
                </h2>

                <p className="mb-6 text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base">
                    {message}
                </p>

                <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
                    <button
                        onClick={onCancel}
                        className="w-full rounded-xl border border-slate-300 px-5 py-2 transition hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800 sm:w-auto cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="w-full rounded-xl bg-red-600 px-5 py-2 text-white transition hover:bg-red-700 sm:w-auto cursor-pointer"
                    >
                        New Chat
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ConfirmModal;