// THIS IS MODERN JAVASCRIPT; THINGS WILL LOOK DIFFERENT FROM THE USUAL JS
import "./styles.css"; // import your css to the webpack
import "mapbox-gl/dist/mapbox-gl.css";
import * as mapboxgl from "mapbox-gl"; // imports the actual library to instantiate our map
import settings from "./settings.json"; // this is for convenience to breakout the stuff from actual logic

let map; // the new "var" variable; declaring variable

// Function to run the code after the map has been rendered/initialized
// async = to use await for loading
async function init() {
    const custom = await import("./custom-style.json"); // import custom-style

    const wildFire = await import("../data/wildfire-points.json");
    const calCounties = await import("../data/output.json");

    const style = map.getStyle(); // get's the style from the map; this won't run until custom-style has been downloaded and fully loaded

    // adding custom sources
    // "..." -- breaking the arguments to spread them out
    style.sources = {
        ...style.sources,
        ...custom.sources
    }
    style.layers.push(...custom.layers); // push the layers
    map.setStyle(style);

    map.getSource("wildfire-points").setData(wildFire);
    map.getSource("us-states").setData(calCounties);
}

mapboxgl.accessToken = settings.accessToken; // accessing the token to authenticate

settings.customAttribution = document.querySelector('#attribution').innerHTML;

map = new mapboxgl.Map(settings);  // instantiate
map.on("load", init); // event handlers
