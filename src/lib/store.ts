import { writable, type Writable } from 'svelte/store';






function setGameFocus() {
  const {subscribe,  set} = writable(true)

  return {
    subscribe,
    toggleFocus: () => set(false),
    reset: () => set(true)
  }
}

export const gameFocus = setGameFocus()


function setInputFocus() {
  const {subscribe, set} = writable(true)

  return {
    subscribe,
    isFocus: () => set(false),
    reset: () => set(true)

  }
}

export const inputFocus = setInputFocus()
