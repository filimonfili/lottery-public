import { ArrowRightIcon } from "@heroicons/react/24/outline";

function SelectionBar({ selectedSlots, ticketPrice, onContinue }) {
  if (selectedSlots.length === 0) return null;

  const sortedSlots = [...selectedSlots].sort((a, b) => a - b);

  return (
    <div
      className="
        fixed
        bottom-5
        left-1/2
        -translate-x-1/2
        w-[95%]
        max-w-2xl
        z-50
        animate-[slideUp_.35s_ease]
        rounded-3xl
        border
        border-white/20
        bg-white/10
        backdrop-blur-3xl
        shadow-2xl
        p-5
      "
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        {/* Left Side */}
        <div className="flex-1">
          <p className="text-sm text-white/60">
            {selectedSlots.length} Selected Number
            {selectedSlots.length > 1 && "s"}
          </p>

          {/* Selected Numbers */}
          <div className="mt-3 flex flex-wrap gap-2">
            {sortedSlots.map((slot) => (
              <span
                key={slot}
                className="
                  rounded-xl
                  bg-cyan-500
                  px-3
                  py-2
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                "
              >
                #{slot}
              </span>
            ))}
          </div>

          {/* Total */}
          <div className="mt-4">
            <p className="text-xs uppercase tracking-wide text-white/50">
              Total Price
            </p>

            <p className="text-2xl font-bold text-cyan-300">
              ETB {(selectedSlots.length * ticketPrice).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={onContinue}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-cyan-500
            px-6
            py-4
            font-bold
            text-white
            transition-all
            duration-300
            hover:bg-cyan-600
            hover:scale-105
            active:scale-95
            md:min-w-[180px]
          "
        >
          Continue
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default SelectionBar;
