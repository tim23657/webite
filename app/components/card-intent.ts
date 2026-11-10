import type { PointerEvent } from 'react';

/*
 * Hover intent for the animated icon cards ("Zo werkt het", "Waarom Trivare").
 *
 * The icon animation is only started once the pointer has actually rested on
 * a card for a moment, so sweeping the mouse across the grid does not fire a
 * row of half-played animations. When the pointer leaves, the state is kept
 * until the one-shot animation has had time to finish, so it never snaps back
 * mid-way, and re-entering a card that is still settling does not restart it.
 * Touch pointers are ignored on purpose: touch uses the scroll-based variant.
 */

const INTENT_MS = 110;
const MIN_ACTIVE_MS = 950;

type IntentState = { timer?: number; since: number };
const states = new WeakMap<HTMLElement, IntentState>();

function stateFor(card: HTMLElement): IntentState {
  let state = states.get(card);
  if (!state) { state = { since: 0 }; states.set(card, state); }
  return state;
}

export function onCardPointerEnter(event: PointerEvent<HTMLElement>) {
  if (event.pointerType === 'touch') return;
  const card = event.currentTarget;
  const state = stateFor(card);
  window.clearTimeout(state.timer);
  state.timer = undefined;
  if (card.classList.contains('is-hover')) return;
  state.timer = window.setTimeout(() => {
    card.classList.add('is-hover');
    state.since = performance.now();
    state.timer = undefined;
  }, INTENT_MS);
}

export function onCardPointerLeave(event: PointerEvent<HTMLElement>) {
  if (event.pointerType === 'touch') return;
  const card = event.currentTarget;
  const state = stateFor(card);
  window.clearTimeout(state.timer);
  state.timer = undefined;
  if (!card.classList.contains('is-hover')) return;
  const remaining = Math.max(0, MIN_ACTIVE_MS - (performance.now() - state.since));
  state.timer = window.setTimeout(() => {
    card.classList.remove('is-hover');
    state.timer = undefined;
  }, remaining);
}
