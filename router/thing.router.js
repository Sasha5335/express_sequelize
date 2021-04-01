const thingRouter = require('express').Router();
const ThingController = require('../controllers/thing.controlles');

/* http://localhost:3000/thing/ */

thingRouter.post('/', ThingController.createThing);
thingRouter.get('/', ThingController.getAllThings);

/* http://localhost:3000/thing/5 */

thingRouter
  .route('/:id')
  .get(ThingController.getThingById)
  .patch(ThingController.updateById)
  .delete(ThingController.deleteById);

module.exports = thingRouter;
