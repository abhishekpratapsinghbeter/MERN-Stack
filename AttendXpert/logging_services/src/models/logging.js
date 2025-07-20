const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
    timestamp: { type: Date, default: Date.now },
    level: String,
    message: String,
    metadata: Schema.Types.Mixed 
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
