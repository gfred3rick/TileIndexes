$(document).ready(function() {
          //OPEN ABOUT DIALOG
              $('#aboutModal').modal();
          });

          var map;
          var MY_MAPTYPE_ID = 'Basemap';
          var streeViewService = new google.maps.StreetViewService();
          var infowindow = new google.maps.InfoWindow();
       
          var region = new google.maps.LatLng(40.08, -75.170669);

          $("[name='my-checkbox']").bootstrapSwitch({
               onColor: 'warning',
               offColor: 'default',
               size: 'normal',
               onText: 'On',
               offText: 'Off',
               handleWidth: 50,
               labelWidth: 25,
               onSwitchChange: function(event,state){
                  var dataLayer = window[$(this).attr('data-layer')];
                  var item = $(this);
                
                  if (state === true) {
                      dataLayer.setMap(map);
                      map.infowindow.close();

                  } else {
                      dataLayer.setMap(null);
                      map.infowindow.close();
                  }
              }
          });
    
////////////////////////////////////////////////
////////////Initialize map on load//////////////
////////////////////////////////////////////////
          function initialize() {
            
              // Create a simple google map //
              map = new google.maps.Map(document.getElementById('map'), {
                  center: { lat: 39.950143, lng: -75.170669},
                  zoom: 9,
                  mapTypeId: google.maps.MapTypeId.HYBRID
              });
              //enable KeyDragzoom function
              map.enableKeyDragZoom();  
              
              var infowindow = new google.maps.InfoWindow();
              map.infowindow = infowindow;
              // 1959 INDEX DATA //
              index1959 = new google.maps.Data();
              index1959.loadGeoJson('data/DVRPC_1959_index.js');
              // index1959.setMap(map);
              index1959.setStyle(function(feature){
                  return {
                      clickable: true,
                      strokeColor: '#fff',
                      strokeWeight: 1.0,
                      fillColor: '#ffa500',
                      fillOpacity: 0.35
                  } 
              });

              index1959.addListener('click', function(e){
                  index65_95.revertStyle();
                  indexNJ.revertStyle();
                  indexPA.revertStyle();
                  index1959.revertStyle();
                  index1959.overrideStyle(e.feature, {
                      fillColor: '#ff0000',
                      strokeColor: '#fff',
                      strokeWeight: 5,
                  });

                  infowindow.setContent("<div id='index-window'><b><font color='orange'>1959 SHEET ID</font></b><br>" + e.feature.getProperty("SHEET_ID") + "</div>");

                  // Popup Anchor //
                  var anchor = new google.maps.MVCObject();
                  anchor.set("position", e.latLng);
                  
                  infowindow.open(map, anchor);
              });

              // 1965-1995 INDEX DATA //
              index65_95 = new google.maps.Data();
              index65_95.loadGeoJson('data/DVRPC_1965_1995_index.js');
              // index65_95.setMap(map);
              index65_95.setStyle(function(feature){
                  return {
                      clickable:true,
                      strokeColor: '#fff',
                      strokeWeight: 1.0,
                      strokeOpacity: 1.0,
                      fillColor: '#730073',
                      fillOpacity: 0.35
                  }
              });

              index65_95.addListener('click', function(e){
                  index1959.revertStyle();
                  indexNJ.revertStyle();
                  indexPA.revertStyle();
                  index65_95.revertStyle();
                  index65_95.overrideStyle(e.feature, {
                      fillColor: '#390039',
                      strokeColor: '#e3cce3',
                      strokeWeight: 5,
                      strokeOpacity: 1
                  });

                  infowindow.setContent("<div id='index-window'><b><font color='purple'>1965 - 1995 SHEET ID</font></b><br>" + e.feature.getProperty("SHEET_ID") + "</div>");
                  
                  // Popup Anchor //
                  var anchor = new google.maps.MVCObject();
                  anchor.set("position", e.latLng);
                  
                  infowindow.open(map,anchor);
              });

              indexPA = new google.maps.Data();
              indexPA.loadGeoJson('data/DVRPC_PA_SP_index_.js');
              indexPA.setMap(map);
              indexPA.setStyle(function(feature){
                  return {
                      clickable:true,
                      strokeColor: '#fff',
                      strokeWeight: 1.0,
                      strokeOpacity: 1.0,
                      fillColor: '#008000',
                      fillOpacity: 0.35
                  }
              });
        
              indexPA.addListener('click', function(e){
                  index1959.revertStyle();
                  index65_95.revertStyle();
                  indexNJ.revertStyle();
                  indexPA.revertStyle();
                  indexPA.overrideStyle(e.feature, {
                      fillColor: '#b2d8b2',
                      strokeColor: '#28a428',
                      strokeWeight: 5,
                      strokeOpacity: 1
                  });

                  infowindow.setContent("<div id='index-window'><b><font color='green'>2000-2015 PA INDEX TILE NUMBER</font></b><br>" + e.feature.getProperty("TILE_NUM") + "</div>");
                  
                  // Popup Anchor //
                  var anchor = new google.maps.MVCObject();
                  anchor.set("position", e.latLng);
                  
                  infowindow.open(map,anchor);

              });

              indexNJ = new google.maps.Data();
              indexNJ.loadGeoJson('data/DVRPC_NJ_SP_index.js');
              indexNJ.setMap(map);
              indexNJ.setStyle(function(feature){
                  return {
                      strokeColor: '#fff',
                      strokeWeight:1,
                      strokeOpacity: 1,
                      fillColor: '#b20000',
                      fillOpacity: 0.35,
                      clickable:true
                  }
              });

              indexNJ.addListener('click', function(e) {
                  index1959.revertStyle();
                  index65_95.revertStyle();
                  indexPA.revertStyle();
                  indexNJ.revertStyle();
                  indexNJ.overrideStyle(e.feature, {
                      strokeColor: '#ff0000',
                      strokeWeight:5,
                      strokeOpacity: 1,
                      fillColor: '#b20000',
                      fillOpacity: 0.35
                  });
                  infowindow.setContent("<div id='index-window'><b><font color='red'>2000-2015 NJ INDEX TILE NUMBER</font></b><br>" + e.feature.getProperty("TILE_NUM") + "</div>");

                  // Popup Anchor //
                  var anchor = new google.maps.MVCObject();
                  anchor.set("position", e.latLng);

                  infowindow.open(map, anchor);

              });

        $("#zoomToRegion").click(function(){
            map.setCenter(new google.maps.LatLng(40.08, -75.170669));
            map.setZoom(9);
        });

              //Geocoding / Search Bar
              var options = {
                  map: map
              };

              $("#pac-input").geocomplete(options);

              google.maps.event.addListener(map, 'click', function() {
                  infowindow.close();
                  index1959.revertStyle();
                  index65_95.revertStyle();
                  indexNJ.revertStyle();
                  indexPA.revertStyle();
              });  
              
          } //END OF INITIALIZE

          google.maps.event.addDomListener(window, 'load', initialize);