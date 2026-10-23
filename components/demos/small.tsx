"use client";
// The shorter demos: phone transfer, copy text from the screen, paste an image, recipes.
import { motion } from "motion/react";
import { Cursor, FileIcon, Frame, Keycap, Toast, Win, usePhases } from ".";
import { WheelSvg } from "./wheel";

type P = { captions: string[]; replayLabel: string; label: string };

function Qr() {
  // a fixed QR-looking pattern (decorative): three finder squares plus pseudo-random modules
  const cells = Array.from({ length: 21 * 21 }, (_, i) => {
    const [x, y] = [i % 21, Math.floor(i / 21)];
    const finder = (fx: number, fy: number) => {
      const [dx, dy] = [x - fx, y - fy];
      if (dx < 0 || dy < 0 || dx > 6 || dy > 6) return null;
      return dx === 0 || dy === 0 || dx === 6 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4);
    };
    const f = finder(0, 0) ?? finder(14, 0) ?? finder(0, 14);
    return f ?? ((x * 7 + y * 13 + x * y) % 5 < 2);
  });
  return (
    <svg viewBox="-2 -2 25 25" className="size-full rounded-md bg-white">
      {cells.map((on, i) => on && <rect key={i} x={i % 21} y={Math.floor(i / 21)} width="1.02" height="1.02" fill="#111" />)}
    </svg>
  );
}

export function PhoneDemo({ captions, replayLabel, label }: P) {
  const { ref, phase, replay } = usePhases([1400, 2000, 2400]);
  return (
    <Frame frameRef={ref} captions={captions} step={phase} replay={replay} replayLabel={replayLabel} label={label}>
      <Win title="PomeloO · Send to Phone" className="top-[12%] left-[6%] h-[70%] w-[48%]">
        <div className="flex gap-4 p-4">
          <motion.div className="w-[45%]" initial={false} animate={{ opacity: phase >= 1 ? 1 : 0.15 }}>
            <Qr />
          </motion.div>
          <div className="flex-1 text-[11px] text-zinc-300">
            <p className="font-semibold text-zinc-100">Sending 1 file</p>
            <p className="mt-2 text-zinc-400">Scan with the phone camera (same Wi-Fi).</p>
          </div>
        </div>
      </Win>
      <div className="absolute top-[8%] right-[10%] h-[84%] w-[25%] rounded-[22px] border-4 border-zinc-700 bg-zinc-950 p-2">
        <div className="relative size-full overflow-hidden rounded-[14px] bg-zinc-900">
          {phase === 1 && (
            <>
              <div className="absolute inset-[18%] opacity-70">
                <Qr />
              </div>
              <motion.div
                className="absolute inset-x-[12%] h-0.5 bg-orange shadow-[0_0_12px_#ff8a1e]"
                initial={{ top: "18%" }}
                animate={{ top: "78%" }}
                transition={{ duration: 1.2, repeat: 1, repeatType: "reverse" }}
              />
            </>
          )}
          {phase === 2 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-3 text-[11px] text-zinc-100">
              <p className="font-semibold">PomeloO</p>
              <div className="mt-3 flex items-center justify-between rounded-lg bg-zinc-800 px-2 py-2">
                photo.jpg <span className="text-orange">↓</span>
              </div>
              <div className="mt-3 rounded-lg border border-white/10 px-2 py-2 text-center text-zinc-400">Send to PC</div>
            </motion.div>
          )}
          {phase === 0 && <p className="mt-[60%] text-center text-[10px] text-zinc-500">Camera</p>}
        </div>
      </div>
    </Frame>
  );
}

export function OcrDemo({ captions, replayLabel, label }: P) {
  const { ref, phase, replay } = usePhases([1300, 1700, 2200]);
  return (
    <Frame frameRef={ref} captions={captions} step={phase} replay={replay} replayLabel={replayLabel} label={label}>
      <Win title="Slides.pdf" className="top-[8%] left-[8%] h-[78%] w-[84%]">
        <div className="space-y-3 p-[5%]">
          <div className="h-3 w-1/3 rounded bg-zinc-700" />
          <p className="font-display text-[15px] font-semibold text-zinc-100 sm:text-xl">Meeting moved to Thursday 10:00</p>
          <p className="text-[12px] text-zinc-400 sm:text-sm">Room 4B · bring the Q3 numbers</p>
          <div className="h-16 w-1/2 rounded-lg bg-gradient-to-br from-sky-700 to-indigo-800" />
        </div>
      </Win>
      <motion.div className="absolute inset-0 bg-black" initial={false} animate={{ opacity: phase === 1 ? 0.45 : 0 }} />
      {phase === 1 && (
        <motion.div
          className="absolute rounded-sm border-2 border-orange bg-white/5"
          style={{ left: "12%", top: "26%", height: "19%" }}
          initial={{ width: "0%" }}
          animate={{ width: "70%" }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        />
      )}
      <Cursor x={phase === 1 ? 82 : 12} y={phase === 1 ? 45 : 26} grab={phase === 1} />
      <div className="absolute bottom-[4%] left-1/2 flex -translate-x-1/2 gap-1.5" style={{ opacity: phase === 0 ? 1 : 0.25 }}>
        <Keycap down={phase === 0}>Win</Keycap>
        <Keycap down={phase === 0}>Ctrl</Keycap>
        <Keycap down={phase === 0}>T</Keycap>
      </div>
      <Toast show={phase === 2}>Copied · 9 words</Toast>
    </Frame>
  );
}

export function PasteDemo({ captions, replayLabel, label }: P) {
  const { ref, phase, replay } = usePhases([1500, 1300, 2400]);
  return (
    <Frame frameRef={ref} captions={captions} step={phase} replay={replay} replayLabel={replayLabel} label={label}>
      <Win title="Browser" className="top-[8%] left-[5%] h-[58%] w-[42%]">
        <div className="relative p-4">
          <div className="h-24 rounded-lg bg-gradient-to-br from-amber-500 to-pink-600" />
          {phase === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-12 left-24 w-32 rounded-lg border border-white/10 bg-zinc-800 py-1 text-[11px] text-zinc-200 shadow-xl"
            >
              <p className="px-3 py-1 text-zinc-400">Save image as…</p>
              <p className="bg-orange/90 px-3 py-1 font-semibold text-ink">Copy image</p>
            </motion.div>
          )}
        </div>
      </Win>
      <Win title="Documents" className="top-[24%] right-[5%] h-[56%] w-[44%]">
        <div className="flex gap-3 p-4">
          <FileIcon name="notes.docx" />
          <motion.div initial={false} animate={{ opacity: phase === 2 ? 1 : 0, scale: phase === 2 ? 1 : 0.6 }}>
            <FileIcon name="Pasted image.png" />
          </motion.div>
        </div>
      </Win>
      <Cursor x={phase === 0 ? 30 : 70} y={phase === 0 ? 38 : 60} />
      <div className="absolute bottom-[5%] left-1/2 flex -translate-x-1/2 gap-1.5" style={{ opacity: phase === 1 ? 1 : 0.25 }}>
        <Keycap down={phase === 1}>Ctrl</Keycap>
        <Keycap down={phase === 1}>V</Keycap>
      </div>
      <Toast show={phase === 2}>Saved Pasted image 2026-10-23 14.05.09.png</Toast>
    </Frame>
  );
}

const STEPS = ["Compress 60%", "Resize 50%", "→ WEBP"];

export function RecipeDemo({ captions, replayLabel, label }: P) {
  const { ref, phase, replay } = usePhases([2000, 1500, 2400]);
  return (
    <Frame frameRef={ref} captions={captions} step={phase} replay={replay} replayLabel={replayLabel} label={label}>
      <div className="absolute inset-x-[6%] top-[16%] flex flex-wrap items-center justify-center gap-3">
        {STEPS.map((s, i) => (
          <motion.span
            key={s}
            initial={false}
            animate={{
              opacity: phase === 0 ? 1 : 0,
              x: phase === 0 ? 0 : (1 - i) * 90,
              scale: phase === 0 ? 1 : 0.6,
            }}
            transition={{ delay: phase === 0 ? i * 0.35 : 0 }}
            className="rounded-xl border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-zinc-100"
          >
            <span className="mr-2 text-orange">{i + 1}</span>
            {s}
          </motion.span>
        ))}
      </div>
      <motion.div
        className="bg-gradient absolute top-[18%] left-1/2 -translate-x-1/2 rounded-xl px-5 py-2 text-sm font-semibold text-ink"
        initial={false}
        animate={{ opacity: phase === 1 ? 1 : 0, scale: phase === 1 ? 1 : 0.7 }}
      >
        ★ Web photo
      </motion.div>
      <motion.div
        className="absolute top-[30%] left-1/2 w-[30%] -translate-x-1/2"
        style={{ aspectRatio: "1" }}
        initial={false}
        animate={{ opacity: phase === 2 ? 1 : 0, scale: phase === 2 ? 1 : 0.4 }}
        transition={{ type: "spring", stiffness: 240, damping: 22 }}
      >
        <WheelSvg hot={0} labels={["★ WEB", "COMPRESS", "EDIT", "CROP", "REDACT", "ANNOTATE", "ADD BG"]} title="Tools" />
      </motion.div>
    </Frame>
  );
}
