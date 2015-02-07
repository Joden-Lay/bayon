'use strict';

let device = require('express-device');
let multer = require('multer');

// Enable detect mobile using express-device
Component.app.use(device.capture());
// Enable multipart/form-data middleware handler
Component.app.use(multer());
