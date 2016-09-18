import * as Utils from '../utils';
import {Effect} from './effect';

export class Rain implements Effect {
  public $: CanvasRenderingContext2D;
  public w: number;
  public h: number;
  private amount: number;
  private arr: any[];

  constructor(canvas, amount = 100) {
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
    var i, snowflake;
    this.arr = [];

    for (i = 0; i < this.amount; ++i) {
      snowflake = this.config(i);
      this.arr.push(snowflake);
    }
  }

  reset(_) {
    _ = this.arr[_];
    _.init = false;
    _.x = Utils.randomNumber(0, this.w);
    _.y = Utils.randomNumber(-200, this.h / 3);

    if (_ % 2 === 0) {
      _.vy = Utils.randomNumber(5.5, 8.5);
      _.vx = Utils.randomNumber(0.1, 2.5);
    } else {
      _.vy = Utils.randomNumber(2.5, 5.5);
      _.vx = Utils.randomNumber(2.1, 3.5);
    }

    _.alpha = Utils.randomNumber(0.1, 0.5);
  }

  tick(_) {
    var index = _;
    _ = this.arr[_];
    this.$.fillStyle = "rgba(155,155,255, " + _.alpha + ")";

    _.y += _.vy;

    if (_.id % 2 === 0) {
      this.$.fillRect(_.x, _.y, 1, 5);
      _.x = Utils.Sin(_.x, _.angle, 0.5, true);
    } else {
      this.$.fillRect(_.x, _.y, 2, 5);
      _.x = Utils.Cos(_.x, _.angle, 0.5, true);
    }

    if (_.init) {
      _.alpha -= 0.01;
    } else {
      _.alpha += 0.01;
    }

    _.angle += 0.01;

    if (_.alpha <= 0) {
      this.reset(index);
    } else if (_.alpha >= 1) {
      _.init = true;
    }
  }

  render() {
    var _this = this,
      i;

    this.$.clearRect(0, 0, this.w, this.h);

    for (i = 0; i < this.arr.length; ++i) {
      this.tick(i);
    }

    window.requestAnimationFrame(this.render.bind(this));
  }

  init() {
    var i;
    for (i = 0; i < this.arr.length; ++i) {
      this.reset(i);
    }

    this.render();
  }
}
