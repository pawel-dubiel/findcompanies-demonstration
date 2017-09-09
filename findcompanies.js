var request = require("request");

/**
 * Sort by JSON attribute in ascending order
 * @param {JSON}
 * @param {string} - key - sort by attribute
 */
var sortJSONbyAttr = function (data, attr) {
    return data.sort(function (a, b) {
        var x = a[attr];
        var y = b[attr];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}


/**
 * Converts degrees to radians
 * @param {number} degrees
 * @returns {number} radians
 */
var degrees_to_rad = function (degrees) {
    return degrees * Math.PI / 180;
};

/**
 * Calculate distance between two points on the earth
 * @param {number} p1_lat - degrees: latitude from point
 * @param {number} p1_lng - degrees: longitude from point
 * @param {number} p2_lat - degrees: latitude to point
 * @param {number} p2_lng - degrees: longitude to point
 * @returns {number} distance in meters
 */
var calculate_distance = function (p1_lat, p1_lng, p2_lat, p2_lng) {

    var earth_radius_m = 6378137;

    var diff_lat = degrees_to_rad(p2_lat - p1_lat);
    var diff_long = degrees_to_rad(p2_lng - p1_lng);

    var f = Math.sin(diff_lat / 2) * Math.sin(diff_lat / 2) +
        Math.cos(degrees_to_rad(p1_lat)) * Math.cos(degrees_to_rad(p2_lat)) *
        Math.sin(diff_long / 2) * Math.sin(diff_long / 2);

    return earth_radius_m * (2 * Math.atan2(Math.sqrt(f), Math.sqrt(1 - f)));

};

/**
 * Load commpanies data from url in JSON format
 * Sort in ascending order results by JSON attribute
 * Finds offices withing radius
 * Displays company name with office address ( or many address )
 * JSON file structure
 * [
 *    {
 *     "id": 1,
 *     "urlName": "",
 *     "organization": "",
 *     "customerLocations": "",
 *     "willWorkRemotely": true/false
 *     "website": "",
 *     "services": "",
 *     "offices": [
 *        {
 *          "location": "",
 *          "address": "",
 *          "coordinates": "lat,lng"
 *        }
 *     ]
 *    },
 *    { id: 2, ... },
 *    { ... }
 * ]
 *
 * @param {number} from_lat - degrees: from - latitude
 * @param {number} p1_lng - degrees: from - longitude
 * @param {number} max_distance - in meteres
 * @param {url} url - link to json file with offices data
 */
var showOfficesWithinRadius = function (from_lat, from_lng, max_distance_m, url, sortby) {
    request({
        url: url,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            var coordinates, meters;

            body = sortJSONbyAttr(body, sortby);

            for (var company_index in body) {

                for (var office_index in body[company_index]['offices']) {

                    coordinates = body[company_index]['offices'][office_index]['coordinates'].split(',');
                    meters = calculate_distance(from_lat, from_lng, coordinates[0], coordinates[1]);

                    if (meters <= max_distance_m) {
                        console.log('Company Name: ' + body[company_index]['organization']);
                        console.log('Company Address: ' + body[company_index]['offices'][office_index]['address']);
                        console.log('Distance: ' + parseFloat(Math.round(meters / 1000 * 100) / 100).toFixed(2) + '(km)');
                        console.log('+----------------------+');
                    }

                }

            }

        } else {
            console.error(error + response.statusCode);
        }

    });
}


module.exports = {
    showOfficesWithinRadius: showOfficesWithinRadius,
    _private_calculate_distance: calculate_distance, //expose function for testing
    _private_degrees_to_rad: degrees_to_rad, //expose function for testing
    _private_sortJSONbyAttr: sortJSONbyAttr //expose function for testing
};



 

