/**
 * Tiny singleton that ensures only ONE <video> element plays
 * unmuted audio at a time. Subscribers register a callback that gets
 * called with `false` when another card claims audio focus.
 */

type Subscriber = (isActive: boolean) => void;

let activeId: string | null = null;
const subs = new Map<string, Subscriber>();

export function registerAudio(id: string, cb: Subscriber) {
  subs.set(id, cb);
  return () => {
    subs.delete(id);
    if (activeId === id) activeId = null;
  };
}

export function claimAudio(id: string) {
  if (activeId === id) return;
  const prev = activeId;
  activeId = id;
  if (prev && subs.has(prev)) subs.get(prev)?.(false);
}

export function releaseAudio(id: string) {
  if (activeId === id) activeId = null;
}
