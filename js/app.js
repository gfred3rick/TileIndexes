
          $(document).ready(function() {
          //  $('[rel=tooltip]').tooltip();

          //OPEN ABOUT DIALOG
              $('#aboutModal').modal();
          });

          var map;
          var MY_MAPTYPE_ID = 'Basemap';
          var streeViewService = new google.maps.StreetViewService();

          var region = new google.maps.LatLng(39.950143, -75.170669);


          // $('input[name="my-checkbox"]').bootstrapSwitch();

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
                  var dataLabel = window[$(this).attr('data-label')];
                  var item = $(this);
                
                  if (state === true) {
                      dataLayer.setMap(map);
                      dataLabel.open(map);
                  } else {
                      dataLayer.setMap(null);
                      dataLabel.hide();
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

          
              paLatLng = new google.maps.LatLng()

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
              
              center59 = new google.maps.Data();
              center59.loadGeoJson('data/DVRPC_1959_center.js');
//              center59.setMap(map);
              
              center59.addListener('addfeature', function(e) {
                  if (e.feature.getGeometry().getType() == "Point") {
                      
                        var center = e.feature.getGeometry().get();
                        var centerProp = e.feature.getProperty('SHEET_ID');
                        var centerDiv = document.createElement('div');
                        centerDiv.innerHTML = centerProp;
                        centerDiv.setAttribute("class", "index-text-59");


                        myOptions = {
                            content: centerDiv,
                            boxStyle: {
                                border: "none",
                                textAlign: "center",
                                fontSize: "16px",
                                width: "150px"
                            },
                            disableAutoPan: true,
                            pixelOffset: new google.maps.Size(-70,0),
                            position: center,
                            closeBoxURL: "",
                            isHidden: true,
                            pane: "mapPane",
                            enableEventPropagation: true,
                        };

                        var centerLabel = new InfoBox(myOptions);
                        centerLabel.setVisible({visible:false});
//                        centerLabel.open(map)

                        map.addListener('zoom_changed', function(){
                            if (map.getZoom() >= 14) {
                                centerLabel.open(map);
                            }
                            if (map.getZoom() < 14) {
                                centerLabel.close();
                            }
                        })
                    }
              }) // CENTER 1959 //
              
              center65 = new google.maps.Data();
              center65.loadGeoJson('data/DVRPC_1965_1995_center.js');
//              center59.setMap(map);
              
              center65.addListener('addfeature', function(e) {
                  if (e.feature.getGeometry().getType() == "Point") {
                      
                        var center = e.feature.getGeometry().get();
                        var centerProp = e.feature.getProperty('SHEET_ID');
                        var centerDiv = document.createElement('div');
                        centerDiv.innerHTML = centerProp;
                        centerDiv.setAttribute("class", "index-text-65");


                        myOptions = {
                            content: centerDiv,
                            boxStyle: {
                                border: "none",
                                textAlign: "center",
                                fontSize: "16px",
                                width: "150px"
                            },
                            disableAutoPan: true,
                            pixelOffset: new google.maps.Size(-70,0),
                            position: center,
                            closeBoxURL: "",
                            isHidden: false,
                            pane: "mapPane",
                            enableEventPropagation: true,
                        };

                        var centerLabel = new InfoBox(myOptions);
                        centerLabel.setVisible({visible:true});
//                        centerLabel.open(map)

                        map.addListener('zoom_changed', function(){
                            if (map.getZoom() >= 14) {
                                centerLabel.open(map);
                            }
                            if (map.getZoom() < 14) {
                                centerLabel.close();
                            }
                        })
                    }
              }) // CENTER 1965-1995 //
              
              centerPA = new google.maps.Data();
              centerPA.loadGeoJson('data/DVRPC_PA_center.js');
//                            
              centerPA.addListener('addfeature', function(e) {
                  if (e.feature.getGeometry().getType() == "Point") {
                      
                        var center = e.feature.getGeometry().get();
                        var centerProp = e.feature.getProperty('TILE_NUM');
                        var centerDiv = document.createElement('div');
                        centerDiv.innerHTML = centerProp;
                        centerDiv.setAttribute("class", "index-text-PA");


                        myOptions = {
                            content: centerDiv,
                            boxStyle: {
                                border: "none",
                                textAlign: "center",
                                fontSize: "16px",
                                width: "150px"
                            },
                            disableAutoPan: true,
                            pixelOffset: new google.maps.Size(-70,0),
                            position: center,
                            closeBoxURL: "",
                            isHidden: false,
                            pane: "mapPane",
                            enableEventPropagation: true,
                        };

                        var centerLabel = new InfoBox(myOptions);
                        centerLabel.setVisible({visible:true});
//                        centerLabel.open(map)

                        map.addListener('zoom_changed', function(){
                            if (map.getZoom() >= 14) {
                                centerLabel.open(map);
                            }
                            if (map.getZoom() < 14) {
                                centerLabel.close();
                            }
                        })
                    }
              }) // CENTER PENNYSLVANIA INDEX // 
              
              
              centerNJ = new google.maps.Data();
              centerNJ.loadGeoJson('data/DVRPC_NJ_center.js');
//                            
              centerNJ.addListener('addfeature', function(e) {
                  if (e.feature.getGeometry().getType() == "Point") {
                      
                        var center = e.feature.getGeometry().get();
                        var centerProp = e.feature.getProperty('TILE_NUM');
                        var centerDiv = document.createElement('div');
                        centerDiv.innerHTML = centerProp;
                        centerDiv.setAttribute("class", "index-text-NJ");


                        myOptions = {
                            content: centerDiv,
                            boxStyle: {
                                border: "none",
                                textAlign: "center",
                                fontSize: "16px",
                                width: "150px"
                            },
                            disableAutoPan: true,
                            pixelOffset: new google.maps.Size(-70,0),
                            position: center,
                            closeBoxURL: "",
                            isHidden: false,
                            pane: "mapPane",
                            enableEventPropagation: true,
                        };

                        var centerLabel = new InfoBox(myOptions);
                        centerLabel.setVisible({visible:true});
//                        centerLabel.open(map)

                        map.addListener('zoom_changed', function(){
                            if (map.getZoom() >= 14) {
                                centerLabel.open(map);
                            }
                            if (map.getZoom() < 14) {
                                centerLabel.close();
                            }
                        })
                    }
              })
              
              
              
          } //END OF INITIALIZE


          google.maps.event.addDomListener(window, 'load', initialize);