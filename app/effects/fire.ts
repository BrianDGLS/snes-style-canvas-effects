import * as Utils from '../utils';

export class Fire {
  public $: CanvasRenderingContext2D;
  public w: number;
  public h: number;

  private amount: number;
  private arr: any[] = [];

  constructor(canvas, amount = 90) {
    this.$ = canvas.$;
    this.w = canvas.w;
    this.h = canvas.h;

    this.amount = amount;

    this.generate();
    this.init();
  }

  config(_) {
    return {
      id: _,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      alpha: 0.1,
      angle: 0
    };
  }

  generate() {
    for (let i = 0; i < this.amount; ++i) {
      let spark = this.config(i);
      this.arr.push(spark);
    }
  }

  reset(_) {
    _ = this.arr[_];
    _.init = false;
    _.x = Utils.randomNumber(0, this.w);
    _.y = Utils.randomNumber(this.h / 2, this.h);
    _.vy = Utils.randomNumber(0.5, 1.5);
    _.vx = Utils.randomNumber(0.1, 0.5);
    _.alpha = Utils.randomNumber(0.1, 0.5);
  }

  tick(_) {
    let index = _;
    _ = this.arr[_];
    this.$.fillStyle = "rgba(255,170,100, " + _.alpha + ")";

    if (_.id % 2 === 0) {
      this.$.fillRect(_.x, _.y, 3, 3);
    } else {
      this.spark(_);
    }

    _.y -= _.vy;

    if (_.id % 2 === 0) {
      _.x = Utils.Sin(_.x, _.angle, 1, true);
    } else {
      _.x = Utils.Cos(_.x, _.angle, 0.5, true);
    }

    _.angle += 0.01;

    if (_.init) {
      _.alpha -= 0.01;
    } else {
      _.alpha += 0.01;
    }

    if (_.alpha <= 0) {
      this.reset(index);
    } else if (_.alpha >= 1) {
      _.init = true;
    }
  }

  spark(_) {
    let size = 3;

    this.$.save();
    this.$.translate(_.x, _.y);

    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        let x = column * size;
        let y = row * size;

        if (row % 2 == 0) {
          if (column % 2 == 0) {
            this.$.fillStyle = "transparent";
          } else {
            this.$.fillStyle = "rgba(255,100,100, " + _.alpha + ")";
          }
        } else {
          if (column % 2 == 0) {
            this.$.fillStyle = "rgba(255,100,100, " + _.alpha + ")";
          } else {
            this.$.fillStyle = "transparent";
          }
        }

        this.$.fillRect(x, y, size, size);
      }
    }

    this.$.fill();
    this.$.restore();
  }

  render() {
    this.$.clearRect(0, 0, this.w, this.h);

    for (let i = 0; i < this.arr.length; ++i) {
      this.tick(i);
    }

    window.requestAnimationFrame(this.render.bind(this));
  }

  init() {
    for (let i = 0; i < this.arr.length; ++i) {
      this.reset(i);
    }

    this.render();
  }
}