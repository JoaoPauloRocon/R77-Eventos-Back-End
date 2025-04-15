const Event = require('./Events');
const Image = require('./Image');
const User = require('./User');

Event.hasMany(Image, { foreignKey: 'event_id', as: 'images' });
Image.belongsTo(Event, { foreignKey: 'event_id', as: 'event' });

