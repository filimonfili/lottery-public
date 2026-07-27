import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import HeroCard from "../components/HeroCard";
import SlotGrid from "../components/SlotGrid";
import BookingModal from "../components/BookingModal";
import SuccessModal from "../components/SuccessModal";
import SelectionBar from "../components/SelectionBar";

import drawService from "../services/drawService";
import bookingService from "../services/bookingService";

function Home() {
  const [draw, setDraw] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previousDraw, setPreviousDraw] = useState(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [reservedSlots, setReservedSlots] = useState([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [selectedSlots, setSelectedSlots] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    loadDraw();
  }, []);

  const loadDraw = async () => {
    try {
      const data = await drawService.getCurrentDraw();

      setDraw(data.draw);
      setPreviousDraw(data.previousDraw);
      setSlots(data.slots);
    } catch (error) {
      if (error.response?.status === 404) {
        setDraw(null);
        setSlots([]);
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSlot = (slot) => {
    if (slot.status !== "available") return;

    const exists = selectedSlots.includes(slot.slotNumber);

    if (exists) {
      setSelectedSlots((prev) => prev.filter((n) => n !== slot.slotNumber));
    } else {
      setSelectedSlots((prev) => [...prev, slot.slotNumber]);
    }
  };

  const handleContinue = () => {
    if (selectedSlots.length === 0) return;

    setModalOpen(true);
  };

  const handleBooking = async (booking) => {
    try {
      setBookingLoading(true);

      const bookingData = {
        ...booking,
        selectedSlots: [...selectedSlots],
      };

      await bookingService.createBooking(bookingData);

      setModalOpen(false);

      setReservedSlots([...selectedSlots]);

      setSuccessOpen(true);

      setSelectedSlots([]);

      await loadDraw();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit booking.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-950 via-indigo-900 to-purple-900 text-white">
        Loading...
      </div>
    );
  }
  if (!draw) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-950 via-indigo-900 to-purple-900 flex items-center justify-center px-4">
        <div className="max-w-xl w-full rounded-[32px] border border-white/20 bg-white/10 backdrop-blur-3xl p-10 text-center">
          <h1 className="text-4xl font-black text-white">🎉 ዕጫ ተዛዚሙ</h1>

          <p className="mt-4 text-white/70">ስለ ዝተሳተፍኩም የቐንየልና።</p>

          {previousDraw?.winner?.slotNumber ? (
            <>
              <div className="mt-8 rounded-3xl bg-yellow-500/10 border border-yellow-400/20 p-6">
                <p className="text-yellow-300 text-sm uppercase">ቁጽሪ ተዓዋቲ</p>

                <h2 className="mt-3 text-6xl font-black text-white">
                  #{previousDraw.winner.slotNumber}
                </h2>

                <p className="mt-4 text-white/70">እንኳዕ ሓጎሰካ/ኪ</p>

                <h3 className="mt-2 text-2xl font-bold text-cyan-300">
                  {previousDraw.winner.name}
                </h3>
              </div>
            </>
          ) : (
            <div className="mt-8 rounded-3xl border border-white/20 bg-white/5 p-6">
              <p className="text-white/70">🏆 ተዓዋቲ ኣብ ቀረባ እዋን ክግለጽ እዩ።</p>
            </div>
          )}

          <p className="mt-8 text-white/50">ንዝቕጽል ዕድለኛ ዕጫ ተጸበዩ።</p>
        </div>
      </div>
    );
  }
  const filteredSlots = slots.filter((slot) => {
    const matchesSearch = slot.slotNumber
      .toString()
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesFilter = filter === "all" || slot.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-indigo-900 to-purple-900">
      <div
        className={`mx-auto max-w-7xl px-4 pt-4 md:px-5 md:pt-8 transition-all duration-300 ${
          selectedSlots.length > 0 ? "pb-72" : "pb-8"
        }`}
      >
        <HeroCard
          draw={draw}
          slots={slots}
          filter={filter}
          setFilter={setFilter}
        />

        {/* Scroll Hint */}
        <div className="mt-6 mb-6 flex flex-col items-center animate-bounce">
          <p className="text-sm text-white/70">
            👇 ዕድለኛ ቁጽርኻ ንምምራጽ ንታሕቲ ስክሮል ግበሩ
          </p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mt-2 h-6 w-6 text-cyan-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        <SlotGrid
          slots={filteredSlots}
          search={search}
          setSearch={setSearch}
          onSelectSlot={handleSelectSlot}
          selectedSlots={selectedSlots}
        />
      </div>

      <BookingModal
        open={modalOpen}
        selectedSlots={selectedSlots}
        ticketPrice={draw?.ticketPrice || 0}
        onClose={() => setModalOpen(false)}
        onSubmit={handleBooking}
        loading={bookingLoading}
      />

      <SuccessModal
        open={successOpen}
        selectedSlots={reservedSlots}
        onClose={() => setSuccessOpen(false)}
      />

      <SelectionBar
        selectedSlots={selectedSlots}
        ticketPrice={draw?.ticketPrice || 0}
        onContinue={handleContinue}
        onClear={() => setSelectedSlots([])}
      />
    </div>
  );
}

export default Home;
