import character from '../classes/Character';
import sfx from '../classes/controllers/SFX';
import { spriteStates } from './enums';
const { bow, jump, rest, run } = spriteStates;

export default {
  ns: {
    [bow]: {
      start: 12,
      finish: 23,
      onFinish: () => character.scaleDirectionX *= -1,
      when: (controller) => {
        return new Date () - controller.frameStart > 100
      },
      then: (controller) => {
        controller.frameStart = new Date()
      },
    },
    [jump]: {
      start: 54,
      finish: 83,
      when: (controller) => {
        return new Date () - controller.frameStart > 66
      },
      then: (controller) => {
        controller.frameStart = new Date()
      },
    },
    [rest]: {
      start: 100,
      finish: 113,
      when: (controller) => {
        return new Date () - controller.frameStart > 66
      },
      then: (controller) => {
        controller.frameStart = new Date()
      },
    },
    [run]: {
      start: 137,
      finish: 143,
      when: (controller) => {
        return Math.abs(controller.frameStart - character.x) > 10
      },
      then: (controller) => {
        controller.frameStart = character.x;
        // sfx.play('step');
      },
    },
  },
  ew: {
    [bow]: {
      start: 0,
      finish: 11,
      onFinish: () => character.scaleDirectionY *= -1,
      when: (controller) => {
        return new Date () - controller.frameStart > 100
      },
      then: (controller) => {
        controller.frameStart = new Date()
      },
    },
    [jump]: {
      start: 24,
      finish: 53,
      when: (controller) => {
        return new Date () - controller.frameStart > 66
      },
      then: (controller) => {
        controller.frameStart = new Date()
      },
    },
    [rest]: {
      start: 85,
      finish: 98,
      when: (controller) => {
        return new Date () - controller.frameStart > 66
      },
      then: (controller) => {
        controller.frameStart = new Date()
      },
    },
    [run]: {
      start: 122,
      finish: 128,
      when: (controller) => {
        return Math.abs(controller.frameStart - character.y) > 10
      },
      then: (controller) => {
        controller.frameStart = character.y;
        // sfx.play('step');
      },
    },
  },
}