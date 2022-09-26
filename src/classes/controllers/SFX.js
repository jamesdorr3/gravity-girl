class SFX {
  constructor() {
    this.death = new Audio('./death.wav');
    this.death.volume = 0.1;
    // this.gravitySwitch = new Audio('./gravitySwitch.mov');
    // this.jump = new Audio('./jump.wav');
    // this.jump.volume = 0.1
    this.land = new Audio('./land.m4a');
    this.step1 = new Audio('./step-1.m4a');
    this.step2 = new Audio('./step-2.m4a');
    // this.win = new Audio('./win.wav');
    // this.win.volume = 0.1;
    
    this.isStep1 = true;
  }

  play = (key) => {
    if (key ==='step') {
      key = this.isStep1 ? 'step1' : 'step2';
      this.isStep1 = !this.isStep1;
    }
    const sound = this[key];
    if (!sound) return;
    if (sound.readyState === 4) sound.play();
  };
}

const sfx = new SFX();

export default sfx;