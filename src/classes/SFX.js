class SFX {
  constructor() {
    this.death = new Audio('./death.wav');
    this.gravitySwitch = new Audio('./gravitySwitch.mov');
    this.jump = new Audio('./jump.wav')
    this.land = new Audio('./land.m4a');
    this.step1 = new Audio('./step-1.m4a');
    this.step2 = new Audio('./step-2.m4a');
    this.win = new Audio('./win.wav');
    this.isStep1 = true;
  }

  playDeath = () => this.death.play();
  playGravitySwitch = () => {}; //this.gravitySwitch.play();
  playJump = () => {}; //this.jump.play();
  playLand = () => this.land.play();
  playStep = () => {
    this[this.isStep1 ? 'step1' : 'step2'].play();
    this.isStep1 = !this.isStep1;
  };
  playWin = () => {}; //this.win.play();
}

const sfx = new SFX();

export default sfx;