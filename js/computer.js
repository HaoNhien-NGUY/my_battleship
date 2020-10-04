/*jslint browser this */
/*global _, shipFactory, player, utils */

(function (global) {
    "use strict";

    var computer = _.assign({}, player, {
        grid: [],
        tries: [],
        fleet: [],
        game: null,
        play: function () {
            var self = this;
            let column;
            let line;

            //refaire ca, en prenant les tries et en cherchant les cells 0, et random l'array retourne

            do {
                column = Math.floor(Math.random() * utils.GRID_COLUMNS);
                line = Math.floor(Math.random() * utils.GRID_LINE);

            } while (self.tries[line][column] !== 0);

            setTimeout(function () {
                self.game.fire(this, column, line, function (hasSucced) {
                    // console.log(self.tries[line][column]);
                    // console.log(line);
                    // console.log(column);
                    self.tries[line][column] = hasSucced;
                });
            }, 2000);
        },
        areShipsOk: function (callback) {
            var i = 0;
            var j;

            this.fleet.forEach(function (ship, i) {
                let isHorizontal;
                let column;
                let line;
                do {
                    isHorizontal = Math.floor(Math.random() * 2);
                    column = Math.floor(Math.random() * utils.GRID_COLUMNS);
                    line = Math.floor(Math.random() * utils.GRID_LINE);

                } while (!this.setActiveShipPosition(column, line, ship, isHorizontal))
            }, this);

            console.log('computer grid');
            console.log(this.grid);

            setTimeout(function () {
                callback();
            }, 500);
        },
        setActiveShipPosition: function (x, y, ship, isHorizontal) {
            let i = 0;

            if (isHorizontal) {
                if (ship.getLife() == 3) x++;

                while (i < ship.getLife()) {
                    if (this.grid[y][x + i] > 0) {
                        return false;
                    }
                    i += 1;
                }

                if (x < 0 || (x + ship.getLife() > 10)) {
                    return false;
                }

                i = 0;
                while (i < ship.getLife()) {
                    this.grid[y][x + i] = ship.getId();
                    i += 1;
                }
            } else {
                if (ship.getLife() == 3) y++;

                while (i < ship.getLife()) {
                    if (!this.grid[y + i - 2] || this.grid[y + i - 2][x] > 0) {
                        return false;
                    }
                    i += 1;
                }

                if (y < 2 || (y + ship.getLife() > 12)) {
                    return false;
                }

                i = 0;
                while (i < ship.getLife()) {
                    this.grid[y + i - 2][x] = ship.getId();
                    i += 1;
                }
            }
            return true;
        },
        renderShips: function () {
            return;
        }
    });

    global.computer = computer;

}(this));