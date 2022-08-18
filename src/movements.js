class KeyMovements {
  constructor() {
    this.movements = {};
    window.addEventListener("keydown", this.down.bind(this));
    window.addEventListener("keyup", this.up.bind(this));
  }

  isPressed(keyCode) {
    return this.movements[keyCode] ? this.movements[keyCode] : false;
  }

  down(e) {
    if (this.movements[e.keyCode]) return;
    this.movements[e.keyCode] = true;
    console.log("keyDown", e.key, "keyCode", e.keyCode);
  }
  up(e) {
    this.movements[e.keyCode] = false;
    console.log("keyUp", e.key, "keyCode", e.keyCode);
  }
}

const Movements = new KeyMovements();
export default Movements;
