mapboxgl.accessToken = 'pk.eyJ1IjoiYWJsdWVnaXJvdXgiLCJhIjoiY2s5bXlqYTB6MDl1OTNmcGQ3N3k5YmJqMyJ9.vsSyn6EXQ3_xGwWYNMKg8A';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-104.9728, 39.7278], // starting position [lng, lat]
    zoom: 11 // starting zoom
});

map.on('load', () => {
    map.addSource("brewery_info", {
        type: "vector",
        url: 'mapbox://abluegiroux.ckuxdelzi9tf921nznffggkif-6f00o'
    });

    map.addLayer({
        id: "brewery_layer",
        source: "brewery_info",
        "source-layer": "Denver_Breweries",
        type: "circle",
        paint: {
          "circle-color": "blue",
          "circle-radius": 4,
          "circle-stroke-width": 1,
          "circle-stroke-color": "white",
        },
      });
    });

    const buttonEls = document.querySelectorAll(".filter-button");

    buttonEls.forEach(button => {
      button.addEventListener("click", e => buttonClicked(e));
    });
    
    const buttonClicked = (e) => {
      const buttonIsSelected = e.target.classList.contains("selected");
      if (buttonIsSelected) {
        e.target.classList.remove("selected");
        map.setFilter("brewery_layer", null);
      } else {
        buttonEls.forEach((button) => button.classList.remove("selected"));
        e.target.classList.add("selected");
        map.setFilter("brewery_layer", ["==", "Route", e.target.dataset.route]);
      }
    };

const popup = new mapboxgl.Popup({closeButton: false});

map.on("click","brewery_layer",(e) => {
    const coordinates = e.lngLat; 
    let breweryName = e.features[0].properties["Brewery"];
    breweryName = breweryName?`<strong>Brewery</strong>: ${breweryName}`: 'No Name Provided';

    popup.setLngLat(coordinates).setHTML(breweryName).addTo(map);
});

map.on("mouseenter", "brewery_layer", () => {
    map.getCanvas().style.cursor = "pointer";
  });
  
  map.on("mouseleave", "brewery_layer", () => {
    map.getCanvas().style.cursor = "";
  });
