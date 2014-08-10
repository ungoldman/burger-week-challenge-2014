L.mapbox.accessToken = 'pk.eyJ1Ijoic2F4YmFybSIsImEiOiJDUW0zOG1nIn0.dk3iwQP-fxClX6wk4Ol94g';

var center = [45.528899660111925, -122.654972076416];

var burger = L.icon({
  iconUrl: 'http://fc08.deviantart.net/fs71/f/2010/114/3/1/Floating_Burger___free_icon_by_serapixels.gif',

  iconSize: [50, 50],
  iconAnchor: [25, 25]
});

var geojsonLayer = L.geoJson.ajax("./secrets/burgers.geojson", {
  middleware: function (data) {
    var s = document.querySelector('#sidebar');
    var u = document.createElement('ul');
    var f = data.features;
    for (var i in f) {
      var props = f[i].properties;
      var l = document.createElement('li');
      l.classList.add('burger-item');
      l.innerHTML = '<h1>' + props.name + '</h1>';
      l.innerHTML += props.description;
      u.appendChild(l);
    }
    s.appendChild(u);
    return data;
  },
  pointToLayer: function (featureData, latLng) {
    return L.marker(latLng, {icon: burger}).addTo(map).on('click', function () {
      sidebar.show();
    });
  }
});

var map = L.mapbox.map('map', 'saxbarm.j6gne8mm').setView(center, 13);

var sidebar = L.control.sidebar('sidebar', {
  closeButton: true,
  position: 'left'
});

map.addControl(sidebar);
geojsonLayer.addTo(map);

setTimeout(function () {
  sidebar.show();
}, 500);
