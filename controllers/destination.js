const Destination = require('../models/Destination')


module.exports = {
    // create a new destination
    createDestination: async (req, res) => {
        try{
          await Destination.create({title: req.body.titleDestination, userId: req.user.id})
          console.log('Destination added!')
          res.redirect('/todos')
        } catch (err){
          console.log(err);
        }
      },
}
