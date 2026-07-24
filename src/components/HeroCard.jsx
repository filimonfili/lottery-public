import { TrophyIcon } from "@heroicons/react/24/solid";

function HeroCard({ draw, slots = [], filter, setFilter }) {
  if (!draw) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-950 via-indigo-900 to-purple-900">
        <div className="rounded-3xl border border-white/20 bg-white/10 p-10 text-center backdrop-blur-3xl">
          <h1 className="text-4xl font-black text-white">
            🎉 Current Draw Finished
          </h1>

          <p className="mt-4 text-white/70">
            All lucky numbers have been confirmed.
          </p>

          <p className="mt-2 text-white/50">
            Please wait while the administrator creates the next draw.
          </p>
        </div>
      </div>
    );
  }

  const available = slots.filter((slot) => slot.status === "available").length;
  const pending = slots.filter((slot) => slot.status === "pending").length;
  const booked = slots.filter((slot) => slot.status === "booked").length;

  const progress = ((booked + pending) / draw.totalSlots) * 100;

  const toggleFilter = (value) => {
    setFilter(filter === value ? "all" : value);
  };

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/20 bg-white/10 shadow-2xl backdrop-blur-3xl">
      {/* Background Glow */}
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative z-10 px-4 py-4 md:px-8 md:py-8">
        {" "}
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-yellow-400 p-3 shadow-lg">
            <TrophyIcon className="h-8 w-8 text-yellow-900" />
          </div>

          <div>
            <p className="text-sm text-white/70">ህሉው ዕድለኛ ዕጫ</p>

            <h1 className="mt-1 text-3xl font-black text-white md:text-5xl">
              {draw.title}
            </h1>
          </div>
        </div>
        {/* Prize + Ticket */}
        <div className="mt-6 flex gap-4">
          <div className="flex-1 rounded-3xl border border-yellow-400/20 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-5">
            <p className="text-xs md:text-sm font-medium text-yellow-300">
              🏆 ዓቢ ሽልማት
            </p>

            <h2 className="mt-2 text-2xl font-black text-white md:text-4xl">
              ETB {draw.prize.toLocaleString()}
            </h2>
          </div>

          <div className="flex-1 rounded-3xl border border-white/10 bg-white/10 p-5">
            <p className="text-xs md:text-sm text-white/60">🎟 ዋጋ ትኬት</p>

            <h3 className="mt-2 text-2xl font-bold text-white md:text-3xl">
              ETB {draw.ticketPrice}
            </h3>
          </div>
        </div>
        {/* Filter Cards */}
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard
            title="ጠቅላላ"
            value={draw.totalSlots}
            active={filter === "all"}
            onClick={() => setFilter("all")}
          />

          <StatCard
            title="ዘይተቆረጹ"
            value={available}
            active={filter === "available"}
            onClick={() => toggleFilter("available")}
          />

          <StatCard
            title="ኣብ ከይዲ"
            value={pending}
            active={filter === "pending"}
            onClick={() => toggleFilter("pending")}
          />

          <StatCard
            title="ተታሓዚኡ"
            value={booked}
            active={filter === "booked"}
            onClick={() => toggleFilter("booked")}
          />
        </div>
        {/* Progress */}
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-sm text-white/70">
            <span>ምዕባለ ስኣል</span>

            <span>
              {booked + pending} / {draw.totalSlots}
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ title, value, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-3xl border p-5 text-left backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
        active
          ? "border-cyan-400 bg-cyan-500 shadow-xl"
          : "border-white/10 bg-white/10 hover:bg-white/20"
      }`}
    >
      <p className="text-sm text-white/70">{title}</p>

      <h2 className="mt-2 text-2xl font-bold text-white">{value}</h2>
    </button>
  );
}

export default HeroCard;
