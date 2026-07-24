import { CheckCircleIcon } from "@heroicons/react/24/solid";

function SuccessModal({ open, selectedSlots = [], onClose }) {
  if (!open) return null;

  const sortedSlots = [...selectedSlots].sort((a, b) => a - b);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-[32px] border border-white/20 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-3xl">
        <CheckCircleIcon className="mx-auto h-24 w-24 text-green-400" />

        <h2 className="mt-6 text-3xl font-black text-white">
          Booking Submitted!
        </h2>

        <p className="mt-3 text-white/70">
          Your lucky number
          {sortedSlots.length > 1 ? "s have" : " has"} been reserved.
        </p>

        {/* Selected Numbers */}

        <div className="mt-8 rounded-3xl bg-white/10 p-6">
          <p className="text-white/60">
            Lucky Number{sortedSlots.length > 1 && "s"}
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {sortedSlots.map((slot) => (
              <span
                key={slot}
                className="
                  rounded-xl
                  bg-cyan-500
                  px-4
                  py-3
                  text-xl
                  font-bold
                  text-white
                  shadow-lg
                "
              >
                #{slot}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <span className="rounded-full bg-yellow-500/20 px-4 py-2 font-semibold text-yellow-300">
            Pending Approval
          </span>
        </div>

        <p className="mt-8 text-white/70">Thank you for choosing</p>

        <h3 className="text-2xl font-bold text-white">🎟 Awche Lottery</h3>

        <p className="mt-3 font-semibold text-green-300">🍀 Good Luck!</p>

        <button
          onClick={onClose}
          className="mt-10 w-full rounded-2xl bg-cyan-500 py-4 font-bold text-white transition hover:bg-cyan-600"
        >
          Done
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;
