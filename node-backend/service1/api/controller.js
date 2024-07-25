
const globalSaveLocations = {
    locations: []
};
var controller = {
    about: function (req, res) {
        res.json("This is response from about controller.")
    },
    fetchLocation: function (req, res, next) {
        try {
            const locationId = +req.query.id;
            if (locationId !== null || locationId !== 0) {
                const arrayList = globalSaveLocations.locations;
                const result = arrayList.find((obj) => {
                    return obj.id === locationId;
                });
                if (result) {
                    res.status(200).json({
                        message: "Location found",
                        status: 200,
                        locId: locationId,
                        coords: result.coords,
                        timestamp: new Date().toISOString()
                    })
                }else {
                    res.status(400).json({
                        message: "Location id is not found",
                        status: 400,
                        locId: locationId,
                        coords: result,
                        timestamp: new Date().toISOString()
                    })
                }
            } else {
                res.status(400)
                    .json({
                        error: "Location id cannot be zero or empty"
                    });
            }
        } catch (error) {
            console.error('Error processing request:', error);
            res.status(500)
                .json({
                    error: "Internal server error"
                });
        }
    },
    addLocation: function (req, res, next) {
        try {
            const requestBody = req.body;

            // Simply return the request body
            // res.status(200).json({
            //     message: 'Location received',
            //     data: req.body
            // });
            // return;

            const _id = Math.random();
            if (req.body != null && req.body.lat != null && req.body.lng != null && req.body.address != null) {
                globalSaveLocations.locations.push({
                    id: _id,
                    address: req.body.address,
                    coords: { lat: req.body.lat, lng: req.body.lng }
                })
            } else {
                res.json({
                    message: "Please check the request",
                    status: 400,
                    timestamp: new Date().toISOString()
                })
                return;
            }

            res.json({
                message: "Location saved successfully",
                status: 200,
                locId: _id,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error processing request:', error);
            res.status(500)
                .json({
                    error: "Internal server error"
                });
        }
    }
}

module.exports = {
    addLocation: controller.addLocation,
    about: controller.about,
    fetchLocation: controller.fetchLocation
};

// exports.addLocation = (req, res) => {
//     const userData = req.body;
//     console.log('Received user data:', userData);
//     // Here you would typically save the user to a database
//     res.status(201).json({
//       message: 'User created successfully',
//       user: userData
//     });
//   };