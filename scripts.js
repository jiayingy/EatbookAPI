function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 1.311841, lng: 103.856338},
      zoom: 14,
      mapTypeControl: false,
      styles: [
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      { 
        featureType: "landscape",
        elementType: "labels.icon",
        stylers: [{"visibility": "off"}]
      },
      { 
        featureType: "poi",
        elementType: "labels.icon",
        stylers: [{"visibility": "off"}]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{color: "#38414e"}]
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{color: "#212a37"}]
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{color: "#9ca5b3"}]
      },
      {
        featureType: "road",
        elementType: "labels.icon",
        stylers: [{"visibility": "off"}]
      },
      {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [{color: "#746855", "weight": "50"}]
      },
    ]
  });

  var iconBasePath = "./assets/svg/";

  // icon images
  var icons = {
    iceCreamsIcon: {
      url: iconBasePath + 'ice-cream.svg',
      scaledSize: new google.maps.Size(30, 30)
    },
    dessertsIcon: {
      url: iconBasePath + 'dessert.svg',
      scaledSize: new google.maps.Size(30, 30)
    },
    fullMealsIcon: {
      url: iconBasePath + 'full-meal.svg',
      scaledSize: new google.maps.Size(30, 30)
    }
  };

 $.getJSON("./eatbook-api.json", function(data) {
   for (var i in data) {
     createMarker(map,data[i], icons); 
   }
 });
}

function createMarker(map, obj, icons) {
  var marker = new google.maps.Marker({
    position: {lat: obj.Latitude, lng: obj.Longitude},
    map: map,
    title: obj.EntryName,
    icon: icons[toCamelCase(obj.Category) + "Icon"],
  });

  var infoWindowContent = 
    "<div id=content>" +
      "<h1>" + obj.EntryName + "</h1>" +
      "<p><i>" + obj.EntryAddress + "</i></p>" +
      "<p>" + obj.OpeningHours + "</p>" +
      ((obj.Instagram !== "-") ? "<a target='_blank' href='"+ obj.Instagram +"'><img class='linkLogos' src='./assets/svg/facebook.svg'></a>" : "") +
    "</div>"
    ;

    var infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    marker.addListener('click',function() {
      infoWindow.open(map,marker);
    });
}

function toCamelCase(str) {
  return str.replace(/^([A-Z])|[\s-_](\w)/g, function(match, p1, p2, offset) {
      if (p2) return p2.toUpperCase();
      return p1.toLowerCase();        
  });
}