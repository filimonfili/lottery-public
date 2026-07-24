import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import Slot from "./Slot";

function SlotGrid({ slots, search, setSearch, onSelectSlot, selectedSlots }) {
  return (
    <div className="mt-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold text-white">ዕድለኛ ቁጽርኻ ምረጽ</h2>

        <div className="relative w-full md:w-80">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ናይ መድለዪ ቦታ"
            className="
              w-full
              rounded-2xl
              border
              border-white/20
              bg-white/10
              py-3
              pl-11
              pr-4
              text-white
              placeholder:text-white/50
              backdrop-blur-xl
              outline-none
              focus:border-cyan-400
            "
          />
        </div>
      </div>

      <p className="mt-3 text-sm text-white/60">
        {slots.length} ዕጻ{slots.length !== 1 && ""}
      </p>

      <div
        className="
          mt-6
          grid
          grid-cols-4
          gap-3
          sm:grid-cols-5
          md:grid-cols-6
          lg:grid-cols-8
          xl:grid-cols-10
        "
      >
        {slots.length > 0 ? (
          slots.map((slot) => (
            <Slot
              key={slot._id}
              slot={slot}
              onClick={onSelectSlot}
              selected={selectedSlots.includes(slot.slotNumber)}
            />
          ))
        ) : (
          <div className="col-span-full rounded-3xl border border-white/20 bg-white/10 p-8 text-center backdrop-blur-xl">
            <p className="text-lg font-semibold text-white">No slot found</p>

            <p className="mt-2 text-white/60">Try another slot number.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SlotGrid;
