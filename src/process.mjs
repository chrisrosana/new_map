import fs from "fs";
import turf from "@turf/turf";
import usStates from "../data/us-states.json";
import wildfirePoints from "../data/wildfire-points.json";

let output = turf.collect(usStates, wildfirePoints, 'acres', 'acres');

output.features = output.features.filter(function(feature, i) {
  feature.id = i;
  feature.properties.acres = feature.properties.acres.reduce(function(value, total) {
    return total + value;
  }, 0);
  return feature.properties.acres > 0;
});

output = JSON.stringify(output, null, "\t");

fs.writeFile("../data/output.json", output, function(err) {
  if (err) throw err;

  console.log("success. 👍");
});
