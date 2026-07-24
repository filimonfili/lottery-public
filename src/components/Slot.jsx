function Slot({ slot, onClick, selected }) {
  const styles = {
    available:
      "bg-emerald-500/20 border-emerald-400/30 text-emerald-300 hover:bg-emerald-500/30",

    pending:
      "bg-yellow-500/20 border-yellow-400/30 text-yellow-300 cursor-not-allowed",

    booked: "bg-red-500/20 border-red-400/30 text-red-300 cursor-not-allowed",
  };

  return (
    <button
      disabled={slot.status !== "available"}
      onClick={() => onClick(slot)}
      className={`
        aspect-square
        rounded-2xl
        border
        backdrop-blur-xl
        transition-all
        duration-300
        active:scale-95
        font-bold
        text-lg
        relative

        ${
          selected
            ? "bg-cyan-500 border-cyan-300 text-white scale-105 shadow-2xl ring-4 ring-cyan-300/40"
            : styles[slot.status]
        }
      `}
    >
      {selected && <div className="absolute top-1 right-1 text-xs">✓</div>}

      {slot.slotNumber}
    </button>
  );
}

export default Slot;
