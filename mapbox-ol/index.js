mapboxgl.accessToken = "pk.eyJ1Ijoicm9tYW56b2xsZXIiLCJhIjoiY2pkand5dzJkMG1jdTMzbzJqMmZ5cDUycSJ9.djXLa0ZfFbls1yUu35I80Q";

var map = new mapboxgl.Map({
    container: "map", // container id
    style: "mapbox://styles/mapbox/streets-v9", // stylesheet location
    center: [6.5124174, 46.5284586], // starting position
    maxZoom: 17,
    zoom: 10 // starting zoom
});

var swisstopoBauzonenSource = new ol.source.TileJSON({
  tileJSON: {
      "attribution": "&copy; swisstopo",
      "bounds": [
          5.140242,
          45.398181,
          11.47757,
          48.230651
      ],
      "id": "bauzonen",
      "maxzoom": 18,
      "minzoom": 0,
      "type": "raster",
      "tileSize": 256,
      "tiles": [
          "https://wmts.geo.admin.ch/1.0.0/ch.are.bauzonen/default/current/3857/{z}/{x}/{y}.png"
      ],
  }
});

var olMap = new ol.Map({
    layers: [
        new ol.layer.Tile({
            opacity: 0.3,
            source: swisstopoBauzonenSource
        })
    ],
    target: "olmap",
    view: new ol.View({
        center: ol.proj.transform([6.5124174, 46.5284586], "EPSG:4326", "EPSG:3857"),
        maxZoom: 18,
        zoom: 11
    })
});

map.on("move", () => {
    var olMapView = olMap.getView();
    olMapView.setCenter(ol.proj.transform(map.getCenter().toArray(), "EPSG:4326", "EPSG:3857"));
    olMapView.setZoom(map.getZoom() + 1);
});
