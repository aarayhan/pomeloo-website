"use client";
// Hover the notch → the panel; drag a file to the top → drop zones → Fit WhatsApp → the "done" notice.
import { AnimatePresence, motion } from "motion/react";
import { Cursor, FileIcon, Frame, Win, usePhases } from ".";

const MS = [1300, 2200, 1300, 1700, 2200];
const CAPTION = [0, 1, 2, 3, 3];
// notch size per phase, in percent of the frame
const SIZE = [
  [18, 6],
  [66, 46],
  [18, 6],
  [72, 24],
  [46, 8],
];
const CURSOR = [
  [50, 4],
  [52, 30],
  [14, 76],
  [51, 16],
  [51, 16],
];
const ZONES = [
  ["JPG", "GIF", "MOV", "MP3", "Tools…"],
  ["Shelf", "Phone", "Fit WhatsApp", "Fit Email", "Fit Web"],
];

export default function NotchDemo({ captions, replayLabel, label }: { captions: string[]; replayLabel: string; label: string }) {
  const { ref, phase, replay } = usePhases(MS);
  const [w, h] = SIZE[phase];
  const [cx, cy] = CURSOR[phase];
  return (
    <Frame frameRef={ref} captions={captions} step={CAPTION[phase]} replay={replay} replayLabel={replayLabel} label={label}>
      <Win title="Videos" className="bottom-[8%] left-[4%] h-[34%] w-[30%]">
        <div className="p-4">
          <FileIcon name="clip.mp4" className={phase === 3 ? "opacity-40" : ""} />
        </div>
      </Win>
      <motion.div
        className="absolute top-0 left-1/2 z-10 -translate-x-1/2 overflow-hidden rounded-b-[18px] border border-t-0 border-white/10 bg-black"
        initial={false}
        animate={{ width: `${w}%`, height: `${h}%` }}
        transition={{ type: "spring", stiffness: 220, damping: 26 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.15 } }}
            exit={{ opacity: 0, transition: { duration: 0.08 } }}
            className="flex size-full flex-col justify-center px-[3%] text-zinc-100"
          >
            {(phase === 0 || phase === 2) && <p className="text-center text-[10px] text-zinc-400">3 on shelf</p>}
            {phase === 1 && (
              <div className="flex size-full flex-col py-[3%]">
                <div className="flex gap-4 text-[11px] text-zinc-400">
                  {["Jobs", "Shelf", "Clipboard", "Recent", "Phone"].map((t) => (
                    <span key={t} className={t === "Shelf" ? "border-b-2 border-orange pb-1 font-semibold text-zinc-100" : "pb-1"}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-[5%] flex gap-4">
                  <FileIcon name="photo.heic" onDark />
                  <FileIcon name="report.pdf" onDark />
                  <FileIcon name="notes.docx" onDark />
                </div>
                <p className="mt-auto text-[10px] text-zinc-500">Drop files here to keep them handy · Shift+drag converts</p>
              </div>
            )}
            {phase === 3 && (
              <div className="grid gap-[6%]">
                {ZONES.map((row, r) => (
                  <div key={r} className="grid grid-cols-5 gap-1.5">
                    {row.map((z) => (
                      <span
                        key={z}
                        className={`truncate rounded-lg border px-1 py-1.5 text-center text-[10px] sm:text-[11px] ${z === "Fit WhatsApp" ? "border-orange bg-orange font-semibold text-ink" : "border-white/10 bg-zinc-900"}`}
                      >
                        {z}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            )}
            {phase === 4 && <p className="text-center text-[11px] font-semibold">Fit WhatsApp: Done · −71% · 38 MB → 11 MB</p>}
          </motion.div>
        </AnimatePresence>
      </motion.div>
      {phase === 3 && (
        <motion.div
          className="absolute z-20 opacity-80"
          initial={{ left: "15%", top: "78%" }}
          animate={{ left: `${cx + 1}%`, top: `${cy + 3}%` }}
          transition={{ type: "spring", stiffness: 140, damping: 20 }}
        >
          <FileIcon name="clip.mp4" className="scale-75" />
        </motion.div>
      )}
      <Cursor x={cx} y={cy} grab={phase === 3} />
    </Frame>
  );
}
