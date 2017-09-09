var findcompanies = require('./findcompanies.js');

var from_lat = 51.515419,
    from_lng = -0.141099,
    max_distance_m = 100 * 1000, /* 100km * 1000m */
    url = "https://pastebin.com/raw/0PCMUy2H",
    sortby = "organization";

findcompanies.showOfficesWithinRadius(from_lat, from_lng, max_distance_m, url, sortby);