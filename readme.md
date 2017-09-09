A very simple module for a demonstration purposes.
- Load commpanies data from URL in JSON format 
- Sort results by company name (organization) ascending
- Find offices within radius
- Display company name with office address

Run Code Example
================
```
npm update
node index.js
```

Output
======
```
Company Name: Blue Square 360
Company Address: St Saviours Wharf, London SE1 2BE
Distance: 5.07(km)
+----------------------+
Company Name: Gallus Consulting
Company Address: Newton House, Northampton Science Park, Moulton Park, Kings Park Road, Northampton, NN3 6LG
Distance: 98.78(km)
+----------------------+
Company Name: Gallus Consulting
Company Address: No1 Royal Exchange, London, EC3V 3DG
Distance: 3.71(km)
+----------------------+
```

Usage
=====
```
var findcompanies = require('./findcompanies.js');
	
var from_lat = 51.515419,
    from_lng = -0.141099,
    max_distance_m = 100 * 1000, /* 100km * 1000m */
    url = "https://pastebin.com/raw/0PCMUy2H",
    sortby = "organization";

findcompanies.showOfficesWithinRadius(from_lat, from_lng, max_distance_m, url, sortby);
```


Testing
========
```
npm test
```