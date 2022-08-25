// bow  side 09 - 11
// bow  nor  12 - 23
// jump side 24 - 53
// jump norm 54 - 83

import character from '../classes/Character';
import { spriteStates } from './enums';
const { jump, rest, run } = spriteStates;

export default {
  ns: {
    [jump]: {
      start: 54,
      finish: 83,
      when: (controller) => {
        return new Date () - controller.frameStart > 66
      },
      update: (controller) => {
        controller.frameStart = new Date()
      },
    },
    [rest]: {
      start: 100,
      finish: 113,
      when: (controller) => {
        return new Date () - controller.frameStart > 66
      },
      update: (controller) => {
        controller.frameStart = new Date()
      },
    },
    [run]: {
      start: 137,
      finish: 143,
      when: (controller) => {
        return Math.abs(controller.frameStart - character.x) > 10
      },
      update: (controller) => {
        controller.frameStart = character.x
      },
    },
  },
  ew: {
    [rest]: {
      start: 85,
      finish: 98,
      when: (controller) => {
        return new Date () - controller.frameStart > 66
      },
      update: (controller) => {
        controller.frameStart = new Date()
      },
    },
    [run]: {
      start: 122,
      finish: 128,
      when: (controller) => {
        return Math.abs(controller.frameStart - character.y) > 10
      },
      update: (controller) => {
        controller.frameStart = character.y
      },
    },
  },
}