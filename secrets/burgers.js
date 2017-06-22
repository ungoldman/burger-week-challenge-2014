/* global L */

var burgerIcon = L.icon({
  iconUrl: './secrets/burger.gif',
  iconSize: [32, 40],
  iconAnchor: [16, 20],
  popupAnchor: [0, -16]
})

var burgerLayer = L.geoJson.ajax('./secrets/burgers.geojson', {
  middleware: function (data) {
    var s = document.querySelector('.burger-list')
    var f = data.features
    for (var i in f) {
      var props = f[i].properties
      var l = document.createElement('li')
      l.classList.add('burger-item')
      l.innerHTML = '<h1>' + props.name + ' @ ' + '<a href="' + props.url + '">' + props.provider + '</a>' + '</h1>'
      l.innerHTML += '<p><small>' + props.address + ', ' + props.hours + '</small></p>'
      l.innerHTML += '<img src="' + props.image + '">'
      l.innerHTML += '<p class="burger-desc">' + props.description + '</p>'
      s.appendChild(l)
    }
    return data
  },
  pointToLayer: function (featureData, latLng) {
    var props = featureData.properties
    var c = document.createElement('div')
    c.classList.add('burger-popup')
    c.innerHTML = '<h1>' + props.name + ' @ ' + '<a href="' + props.url + '">' + props.provider + '</a>' + '</h1>'
    c.innerHTML += '<img src="' + props.image + '">'
    c.innerHTML += '<p><small>' + props.address + ', ' + props.hours + '</small></p>'

    var layer = L.marker(latLng, { icon: burgerIcon })
    layer.addTo(map).bindPopup(c, {
      maxWidth: 170,
      minWidth: 170
    })

    return layer
  }
})

var basemap = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png', {
  attribution: '&copy <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy <a href="http://cartodb.com/attributions">CartoDB</a>',
  subdomains: 'abcd',
  maxZoom: 19
})

var map = L.map('map', {
  center: [45.528899660111925, -122.654972076416],
  zoom: 13,
  maxZoom: 18,
  layers: [basemap, burgerLayer]
})

var sidebar = L.control.sidebar('sidebar', {
  closeButton: true,
  position: 'left'
})

map.addControl(sidebar)

setTimeout(function () {
  document.querySelector('#sidebar').classList.remove('loading')
  sidebar.show()
}, 500)
