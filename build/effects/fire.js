"use strict";
var Utils = require('../utils');
var Fire = (function () {
    function Fire(canvas, amount) {
        if (amount === void 0) { amount = 90; }
        this.arr = [];
        this.$ = canvas.$;
        this.w = canvas.w;
        this.h = canvas.h;
        this.amount = amount;
        this.generate();
        this.init();
    }
    Fire.prototype.config = function (_) {
        return {
            id: _,
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            alpha: 0.1,
            angle: 0
        };
    };
    Fire.prototype.generate = function () {
        for (var i = 0; i < this.amount; ++i) {
            var spark = this.config(i);
            this.arr.push(spark);
        }
    };
    Fire.prototype.reset = function (_) {
        _ = this.arr[_];
        _.init = false;
        _.x = Utils.randomNumber(0, this.w);
        _.y = Utils.randomNumber(this.h / 2, this.h);
        _.vy = Utils.randomNumber(0.5, 1.5);
        _.vx = Utils.randomNumber(0.1, 0.5);
        _.alpha = Utils.randomNumber(0.1, 0.5);
    };
    Fire.prototype.tick = function (_) {
        var index = _;
        _ = this.arr[_];
        this.$.fillStyle = "rgba(255,170,100, " + _.alpha + ")";
        if (_.id % 2 === 0) {
            this.$.fillRect(_.x, _.y, 3, 3);
        }
        else {
            this.spark(_);
        }
        _.y -= _.vy;
        if (_.id % 2 === 0) {
            _.x = Utils.Sin(_.x, _.angle, 1, true);
        }
        else {
            _.x = Utils.Cos(_.x, _.angle, 0.5, true);
        }
        _.angle += 0.01;
        if (_.init) {
            _.alpha -= 0.01;
        }
        else {
            _.alpha += 0.01;
        }
        if (_.alpha <= 0) {
            this.reset(index);
        }
        else if (_.alpha >= 1) {
            _.init = true;
        }
    };
    Fire.prototype.spark = function (_) {
        var size = 3;
        this.$.save();
        this.$.translate(_.x, _.y);
        for (var row = 0; row < 3; row++) {
            for (var column = 0; column < 3; column++) {
                var x = column * size;
                var y = row * size;
                if (row % 2 == 0) {
                    if (column % 2 == 0) {
                        this.$.fillStyle = "transparent";
                    }
                    else {
                        this.$.fillStyle = "rgba(255,100,100, " + _.alpha + ")";
                    }
                }
                else {
                    if (column % 2 == 0) {
                        this.$.fillStyle = "rgba(255,100,100, " + _.alpha + ")";
                    }
                    else {
                        this.$.fillStyle = "transparent";
                    }
                }
                this.$.fillRect(x, y, size, size);
            }
        }
        this.$.fill();
        this.$.restore();
    };
    Fire.prototype.render = function () {
        this.$.clearRect(0, 0, this.w, this.h);
        for (var i = 0; i < this.arr.length; ++i) {
            this.tick(i);
        }
        window.requestAnimationFrame(this.render.bind(this));
    };
    Fire.prototype.init = function () {
        for (var i = 0; i < this.arr.length; ++i) {
            this.reset(i);
        }
        this.render();
    };
    return Fire;
}());
exports.Fire = Fire;
