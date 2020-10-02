/*jslint browser this */
/*global _, shipFactory, player, utils */

(function (global) {
    "use strict";

    var computer = _.assign({}, player, {
        grid: [],
        tries: [],
        fleet: [],
        game: null,
        init: function () {
            // créé la flotte
            this.fleet.push(shipFactory.build(shipFactory.TYPE_BATTLESHIP));
            this.fleet.push(shipFactory.build(shipFactory.TYPE_DESTROYER));
            this.fleet.push(shipFactory.build(shipFactory.TYPE_SUBMARINE));
            this.fleet.push(shipFactory.build(shipFactory.TYPE_SMALL_SHIP));

            // créé les grilles
            this.grid = utils.createGrid(utils.GRID_LINE, utils.GRID_COLUMNS);
            this.tries = utils.createGrid(utils.GRID_LINE, utils.GRID_COLUMNS);
        },
        play: function () {
            var self = this;
            setTimeout(function () {
                self.game.fire(this, 0, 0, function (hasSucced) {
                    self.tries[0][0] = hasSucced;
                });
            }, 2000);
        },
        areShipsOk: function (callback) {
            var i = 0;
            var j;

            this.fleet.forEach(function (ship, i) {
                // j = 0;
                // while (j < ship.life) {
                //     console.log(ship.getId());
                //     this.grid[i][j] = ship.getId();
                //     j += 1;
                // }
                let isHorizontal;
                let column;
                let line;
                do {
                    isHorizontal = Math.floor(Math.random() * 2);
                    console.log(`is Horizontal: ${isHorizontal}`);
                    column = Math.floor(Math.random() * utils.GRID_COLUMNS);
                    console.log(`column: ${column}`);
                    line = Math.floor(Math.random() * utils.GRID_LINE);
                    console.log(`line: ${line}`);
                    console.log(this.grid);

                } while (!this.setActiveShipPosition(column, line, ship, isHorizontal))
            }, this);

            console.log(this.grid);

            setTimeout(function () {
                callback();
            }, 500);
        },
        setGame: function (game) {
            this.game = game;
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
                    if (!this.grid[y + i - 2] || this.grid[y + i - 2][x + 2] > 0) {
                        return false;
                    }
                    i += 1;
                }

                if (y < 2 || (y + ship.getLife() > 12)) {
                    return false;
                }

                i = 0;
                while (i < ship.getLife()) {
                    this.grid[y + i - 2][x + 2] = ship.getId();
                    i += 1;
                }
            }
            return true;
        },
    });

    global.computer = computer;

}(this));