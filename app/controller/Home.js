'use strict';

let Home = module.exports = {};

Home.index = function () {
    this.render('home/index');
};

Home.construction = function () {
    this.render('home/construction');
};
