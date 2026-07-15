const EMOJIS = ["😊", "🙏", "👍", "👎", "❤️", "🩺", "💊", "📋", "🏥", "✅", "❓", "😀", "😅", "🤔", "👋", "🙌"];

export default function EmojiPicker({ onSelect, onClose }) {
    return (
        <>
        {/* backdrop to close the picker when clicking outside */}
        <div className="fixed inset-0 z-10" onClick={onClose} />
        <div className="absolute bottom-12 left-0 z-20 grid w-56 grid-cols-6 gap-1 rounded-xl border border-line bg-panel p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900">
            {EMOJIS.map((e) => (
            <button
                key={e}
                onClick={() => onSelect(e)}
                className="rounded-lg p-1.5 text-lg transition hover:bg-slate-100 dark:hover:bg-slate-800"
            >
                {e}
            </button>
            ))}
        </div>
        </>
    );
}
