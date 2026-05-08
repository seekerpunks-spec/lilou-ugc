/**
 * Tiny singleton coordinating audio focus across video cards.
 *
 * - `claimAudio(id)`  — declare this card is now playing with sound;
 *                        any previously-active card is told to mute.
 * - `releaseAudio(id)` — clear active id when this card mutes/unmounts.
 * - `unlockAudio()`   — call after a user gesture so future center
 *                        cards may attempt unmuted autoplay.
 * - `isAudioUnlocked()` — true once any user gesture occurred.
 */

type Subscriber = (isActive: boolean) => void;

let activeId: string | null = null;
let unlocked = false;
const subs = new Map<string, Subscriber>();

if (typeof window !== "undefined") {
  // Any pointer/key gesture counts as user intent → unlock audio for the session
  const onGesture = () => {
    unlocked = true;
    window.removeEventListener("pointerdown", onGesture);
    window.removeEventListener("keydown", onGesture);
  };
  window.addEventListener("pointerdown", onGesture, { once: true });
  window.addEventListener("keydown", onGesture, { once: true });
}

export function registerAudio(id: string, cb: Subscriber) {
  subs.set(id, cb);
  return () => {
    subs.delete(id);
    if (activeId === id) activeId = null;
  };
}

export function claimAudio(id: string) {
  unlocked = true;
  if (activeId === id) return;
  const prev = activeId;
  activeId = id;
  if (prev && subs.has(prev)) subs.get(prev)?.(false);
}

export function releaseAudio(id: string) {
  if (activeId === id) activeId = null;
}

export function unlockAudio() {
  unlocked = true;
}

export function isAudioUnlocked() {
  return unlocked;
}
