var async = require('async');
module.exports = function(app) {
  //data sources
  var mongoDs = app.dataSources.mydb; // 'name' of your mongo connector, you can find it in datasource.json
  //var mongoDs2 = app.dataSources.mydb2;
  //create all models
  async.waterfall([
    createReviewers,
    createCoffeeShops,
    createReviews
    // reviewers: async.apply(createReviewers),
    // coffeeShops: async.apply(createCoffeeShops),
    // reviews: async.apply(createReviews)

  ], function(err, results) {
    if (err) {
        console.log(err)
        throw err
    };
    console.log('> models created sucessfully ' + results );
    // createReviews(results.reviewers, results.coffeeShops, function(err) {
        
    //     console.log('> models created sucessfully');
    // });
  });
  //create reviewers
  function createReviewers(cb) {
    var x = [{
        email: 'ttttestfoo@bar.com',
        password: 'foobar'
      }, {
        email: 'tttestjohn@doe.com',
        password: 'johndoe'
      }, {
        email: 'tttestjane@doe.com',
        password: 'janedoe'
      }, {
        email: 'tttestrakeshk.r@gmail.com',
        password: 'pass@123'
      }];
    mongoDs.automigrate('Reviewer', function(err) {
      if (err) return cb(err);
      var Reviewer = app.models.Reviewer;

      Reviewer.create(x);
    });
    cb(null,x)
  }
  //create coffee shops
  function createCoffeeShops(x,cb) {
    var y = [{
        name: 'Bel Cafe new1',
        city: 'Vancouver'
      }, {
        name: 'Three Bees Coffee House New1',
        city: 'San Mateo'
      }, {
        name: 'Caffe Artigiano New1',
        city: 'Vancouver'
      }, ]
    mongoDs.automigrate('CoffeeShop', function(err) {
      if (err) return cb(err);
      var CoffeeShop = app.models.CoffeeShop;
      
      CoffeeShop.create(y);
    });
    cb(null,x,y)
  }
  //create reviews
  function createReviews(reviewers, coffeeShops, cb) {
    var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
    var z =[{
        date: Date.now() - (DAY_IN_MILLISECONDS * 4),
        rating: 5,
        comments: 'A very good coffee shop.',
        publisherId: reviewers[0].id,
        coffeeShopId: coffeeShops[0].id,
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS * 3),
        rating: 5,
        comments: 'Quite pleasant.',
        publisherId: reviewers[1].id,
        coffeeShopId: coffeeShops[0].id,
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS * 2),
        rating: 4,
        comments: 'It was ok.',
        publisherId: reviewers[1].id,
        coffeeShopId: coffeeShops[1].id,
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS),
        rating: 4,
        comments: 'I go here everyday.',
        publisherId: reviewers[2].id,
        coffeeShopId: coffeeShops[2].id,
      }]
    mongoDs.automigrate('Review', function(err) {
      if (err) return cb(err);
      var Review = app.models.Review;
     
     
      Review.create(z);

    });
    cb(null,z)
  }
};