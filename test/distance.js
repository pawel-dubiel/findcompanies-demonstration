var chai = require('chai');
var assert = chai.assert;

var accepted_error_range = 0.005;

var findcompanies = require('../findcompanies.js');

//Google maps were used for distance reference
describe('Checking distance calculation: must stay within error range ' + accepted_error_range * 100 + '%', function () {

    it('test long distance 800km: should return true when distance calculation is within error range', function () {
        var exptected_distance_m = 812.62 * 1000;
        assert.approximately(findcompanies._private_calculate_distance(52.482780222078226, 18.984375000000004, 50.401515322782366, 7.734375000000001), exptected_distance_m, exptected_distance_m * accepted_error_range, 'numbers are close enough');
    });


    it('test medium distance 250km: should return true when distance calculation is within error range', function () {
        var exptected_distance_m = 251.05 * 1000;
        assert.approximately(findcompanies._private_calculate_distance(51.781435604431195, -1.0546875000000002, 54.00776876193478, -1.6699218750000002), exptected_distance_m, exptected_distance_m * accepted_error_range, 'numbers are close enough');
    });


    it('test short distance below 20km: should return true when distance calculation is within error range', function () {
        var exptected_distance_m = 19.03 * 1000;
        assert.approximately(findcompanies._private_calculate_distance(51.813709018585094, -0.8116149902343751, 51.70065098247789, -0.6042480468750001), exptected_distance_m, exptected_distance_m * accepted_error_range, 'numbers are close enough');
    });

    it('test distance below 0.5km: should return true when distance calculation is within error range', function () {
        var exptected_distance_m = 0.49 * 1000;
        assert.approximately(findcompanies._private_calculate_distance(51.75338994968636, -0.7783126831054689, 51.74998929227007, -0.7738494873046876), exptected_distance_m, exptected_distance_m * accepted_error_range, 'numbers are close enough');
    });

});

