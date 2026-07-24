import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

function BookingModal({
  open,
  onClose,
  selectedSlots,
  ticketPrice,
  onSubmit,
  loading,
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);

  const sortedSlots = [...selectedSlots].sort((a, b) => a - b);

  useEffect(() => {
    if (!open) {
      setName("");
      setPhone("");
      setImage(null);
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !phone || !image) {
      return alert("Please fill all fields.");
    }

    onSubmit({
      name,
      phone,
      image,
      selectedSlots: sortedSlots,
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-[32px] border border-white/20 bg-white/10 backdrop-blur-3xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <div>
            <h2 className="text-2xl font-bold text-white">ምዝገባ ኣረጋግጽ</h2>

            <p className="mt-1 text-white/60">
              {sortedSlots.length} ዕድለኛ ቁጽሪ
              {sortedSlots.length > 1 && "s"}
            </p>
          </div>

          <button onClick={onClose}>
            <XMarkIcon className="h-7 w-7 text-white" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Selected Numbers */}
          <div className="px-6 pt-6">
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4">
              <p className="text-sm font-medium text-cyan-200">ዝተመርጹ ቁጽርታት</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {sortedSlots.map((slot) => (
                  <span
                    key={slot}
                    className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-bold text-white shadow-md"
                  >
                    #{slot}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-white/70">ጠቕላላ ዋጋ</span>

                <span className="text-xl font-bold text-cyan-300">
                  ETB {(sortedSlots.length * ticketPrice).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            id="booking-form"
            onSubmit={handleSubmit}
            className="space-y-5 p-6"
          >
            <div>
              <label className="text-sm text-white/80">ምሉእ ስም</label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ስምካ ኣእቱ"
                className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-sm text-white/80">ቁጽሪ ተሌፎን።</label>

              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="09xxxxxxxx"
                className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-cyan-400"
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="text-sm text-white/80 block mb-2">
                ክፍሊት ስክሪን ሾት
              </label>

              <label className="flex cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-cyan-400/40 bg-white/5 px-4 py-5 text-center transition hover:border-cyan-400 hover:bg-cyan-500/10">
                <div>
                  <p className="font-semibold text-cyan-300">
                    📷 ስክሪን ሾት ስእሊ ምረጽ
                  </p>

                  <p className="mt-1 text-sm text-white/50">JPG, PNG or JPEG</p>

                  {image && (
                    <p className="mt-2 text-xs text-green-300">{image.name}</p>
                  )}
                </div>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>

              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="mt-4 h-44 w-full rounded-2xl object-cover"
                />
              )}
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 bg-black/10 p-6">
          <button
            form="booking-form"
            disabled={loading}
            className="w-full rounded-2xl bg-cyan-500 py-4 font-bold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "ምቕራብ..." : "ምዝገባ ኣረጋግጽ"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingModal;
