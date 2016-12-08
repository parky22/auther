'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');

var rootPath = path.join(__dirname, '..', '..');
var publicPath = path.join(rootPath, 'public');
var nodeModulesPath = path.join(rootPath, 'node_modules');

router.use(express.static(rootPath));
router.use(express.static(publicPath));
router.use(express.static(nodeModulesPath));

module.exports = router;
