const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }
  next();
};
exports.checkBody = (req, res, next) => {
  const body = req.body;
  const expectedProperties = ['name', 'duration', 'price'];

  for (property of expectedProperties) {
    if (!body.hasOwnProperty(`${property}`)) {
      return res.status(400).json({
        status: 'Fail',
        message: `Invalid property. Need ${property} instead`,
      });
    }
  }

  next();
};
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestAccessTime: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};
exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  //   console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'Success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  const id = req.params.id * 1;

  res.status(200).json({
    status: 'Success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;

  res.status(204).json({
    status: 'Success',
    data: null,
  });
};