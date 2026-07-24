import { CheckCircleIcon } from "@heroicons/react/24/solid";

function SuccessModal({ open, selectedSlots = [], onClose }) {
  if (!open) return null;

  const sortedSlots = [...selectedSlots].sort((a, b) => a - b);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="flex h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-[32px] border border-white/20 bg-white/10 backdrop-blur-3xl shadow-2xl">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 text-center">
          <CheckCircleIcon className="mx-auto h-20 w-20 text-green-400" />

          <h2 className="mt-5 text-3xl font-black text-white">ምዝገባ ቀሪቡ!</h2>

          <p className="mt-3 text-white/70">
            ዕድለኛ ቁጽርኻ
            {sortedSlots.length > 1 ? "s have" : " has"} ተሓዚኡ ኣሎ።
          </p>

          <div className="mt-8 rounded-3xl bg-white/10 p-6">
            <p className="text-white/60">
              ዕድለኛ ቁጽር{sortedSlots.length > 1 && "ታት"}
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {sortedSlots.map((slot) => (
                <span
                  key={slot}
                  className="rounded-xl bg-cyan-500 px-4 py-3 text-xl font-bold text-white shadow-lg"
                >
                  #{slot}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <span className="rounded-full bg-yellow-500/20 px-4 py-2 font-semibold text-yellow-300">
              ኣብ ምጽባይ ምጽዳቕ
            </span>
          </div>

          <p className="mt-8 text-white/70">ስለ ዝመረጽኩም የቐንየልና</p>

          <h3 className="text-2xl font-bold text-white">🎟 ኣውቸ ሎተሪ</h3>

          <p className="mt-3 font-semibold text-green-300">🍀 ፅቡቕ ዕድል!</p>
        </div>

        {/* Fixed Bottom Button */}
        <div className="border-t border-white/10 bg-white/10 p-5 backdrop-blur-xl">
          <button
            onClick={onClose}
            className="w-full rounded-2xl bg-cyan-500 py-4 font-bold text-white transition hover:bg-cyan-600"
          >
            ወድእ።
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;
