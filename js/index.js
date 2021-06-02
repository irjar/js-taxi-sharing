/**
 * This utility method converts a date to a string according to the format
 * @param {type} date
 * @param {type} format, e.g., "yyyy:MM:dd:HH:mm" converts the date "2017-01-26 5:15pm" to "2017:01:26:17:15"
 * @param {type} utc
 * @returns {unresolved}
 */
function formatDate(date, format, utc) {
    var MMMM = ["\x00", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var dddd = ["\x02", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    function ii(i, len) {
        var s = i + "";
        len = len || 2;
        while (s.length < len) s = "0" + s;
        return s;
    }

    var y = utc ? date.getUTCFullYear() : date.getFullYear();
    format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
    format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
    format = format.replace(/(^|[^\\])y/g, "$1" + y);

    var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
    format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
    format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
    format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
    format = format.replace(/(^|[^\\])M/g, "$1" + M);

    var d = utc ? date.getUTCDate() : date.getDate();
    format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
    format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
    format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
    format = format.replace(/(^|[^\\])d/g, "$1" + d);

    var H = utc ? date.getUTCHours() : date.getHours();
    format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
    format = format.replace(/(^|[^\\])H/g, "$1" + H);

    var h = H > 12 ? H - 12 : H == 0 ? 12 : H;
    format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
    format = format.replace(/(^|[^\\])h/g, "$1" + h);

    var m = utc ? date.getUTCMinutes() : date.getMinutes();
    format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
    format = format.replace(/(^|[^\\])m/g, "$1" + m);

    var s = utc ? date.getUTCSeconds() : date.getSeconds();
    format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
    format = format.replace(/(^|[^\\])s/g, "$1" + s);

    var f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
    format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
    f = Math.round(f / 10);
    format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
    f = Math.round(f / 10);
    format = format.replace(/(^|[^\\])f/g, "$1" + f);

    var T = H < 12 ? "AM" : "PM";
    format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
    format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));

    var t = T.toLowerCase();
    format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
    format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));

    var tz = -date.getTimezoneOffset();
    var K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
    if (!utc) {
        tz = Math.abs(tz);
        var tzHrs = Math.floor(tz / 60);
        var tzMin = tz % 60;
        K += ii(tzHrs) + ":" + ii(tzMin);
    }
    format = format.replace(/(^|[^\\])K/g, "$1" + K);

    var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
    format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
    format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);

    format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
    format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);

    format = format.replace(/\\(.)/g, "$1");

    return format;
};
/**
 * Formatting the date string
 * @param {type} d, the date argument
 * @returns formatted Date string
 */
function format(d) {
    return formatDate(d, "yyyy:MM:dd:HH:mm");
}

/**
 * Utility to get default value from the field name if it was undefined or empty
 * @param {type} fieldName
 * @param {type} defaultValue
 * @returns {jQuery}
 */
function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}
function isNumber(str) {
    return str.length === 1 && str.match(/[0-9]/);
}

function get_name_value(fieldName, defaultValue) {
    var value = $('#' + fieldName).val();
    if (value == "") {
       value = defaultValue;
       $('#' + fieldName).val(value);
    }
    if (fieldName == "name") {
        if (!(isLetter(value.charAt(0)) && isNumber(value.charAt(value.length - 1)))) {
            alert("Please enter the correct value");
            return "";
        }
    }
    return value;
}

/**
 * This is the main class
 */
var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
             document.addEventListener('deviceready', this.onDeviceReady, false); // ensures device ready before trying to show map
    },
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
		console.log(navigator.notification); 
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        function TaxiShare() {
            var address;
            //var map;

          /**
           * Updating the Map location according to an address
           * @param {type} address
           * @returns {undefined}
           */
          function updateMap(address) {
              var onSuccess = function(position) {
                  var div = document.getElementById("map_canvas");
                  div.width = window.innerWidth-20;
                  div.height = window.innerHeight*0.8-40;
                  var map = plugin.google.maps.Map.getMap(div);
//                map.setVisible(false);                            
                  map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady, false);      
                  function onMapReady() {                                                  
				  plugin.google.maps.Map.setDiv(div);                                      
				  var currentLocation = new plugin.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				  if (address != undefined) {

						/* Get details of the location of the matched taxi hiring
						* from the RESTful web service by invoking Post method on the appropriate URI 
						*/
						$.get('http://nominatim.openstreetmap.org/search/<' + address + '>?format=json&countrycode=gb', 
							callbackFuncWithData);
						// callback function to extract longitute and lattitude for the matching address
						function callbackFuncWithData(data){
						// Get all longitutes, lattitudes and names of the matching addresses
							for (var i=0; i<data.length; i++) {
								var counter = data[i];
								var taxiLat = counter.lat;
								var taxiLon = counter.lon;
								addressName = counter.display_name;
								alert("Showing matched taxi address at " + addressName);
								// Use the longitudes and lattitudes of the addresses to update the map 
								var taxiLoc = new plugin.google.maps.LatLng(taxiLat, taxiLon);
								// add a marker on the map for the address of a matched taxi address on the map 
								map.addMarker({
								'position': {lat: taxiLat, lng: taxiLon},
								'title': "Taxi"
								}, function (marker) {
								marker.showInfoWindow();
								});
								// set the map to show matched addresses
								map.setCenter(taxiLoc);
								map.setZoom(15);
								map.refreshLayout();
								map.setVisible(true);
							}
						}
					}
					map.setCenter(currentLocation);
					map.setZoom(15);
					map.refreshLayout();
					map.setVisible(true);
                  }                                                                      
            };
            var onError = function(error) {
              alert('code: ' + error.code + '\n' +'message: ' + error.message + '\n');
            };
            navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy: true});  
          }
		  
		  
          
          /**
           * Update the matching address
           * @param {type} address
           * @returns {undefined}
           */
          function updateMatchingStatus(address) {
            /* Fetch the user ID from the "name" input field */
				var oucu = get_name_value('name', 'user1'); 


				/* Invoke the RESTful API to get all the matching addresses */
				/* Get details of the matched addresses for taxi share from 
				 * the RESTful web service by invoking Post method on the appropriate URI 
				 */
				$.get('http://137.108.93.222/openstack/taxi/matches?OUCU=' + oucu,
					function (data) 
					{
						// parse the string received from the web server into a JavaScript object
						var matchingAddresses = $.parseJSON(data);

						// alert the user if the address has been successfully matched 
						if (matchingAddresses.status == "fail" || matchingAddresses.status == "error") {               
						alert('The address ' + address + ' could not be matched.');
						} else {						
						// play a beep sound after the address has been matched
						navigator.notification.beep(2);
                       // buttonIndex is the index of pressed button can be equal to 1 ('No' button) or 2 ('Yes' button)
						function dialog(buttonIndex) { 
							if(buttonIndex == 1){
							//update the Google map to show the matched address
							updateMap(address);	
							}
							//stop matching the taxis and stop the timer
							else {
								myStopFunction();
								alert('Matched taxi share has been rejected.');
							}	
						}
						navigator.notification.confirm(
						'Success! Taxi address has been matched. Do you want to continue?', // message in the dialog box
						dialog,            // invoke the function according to the button pressed 
						'Taxi Sharing Confirmation',    // title of the dialog box
						['Yes','No']     // buttons' labels
						);
					}
					});
          }
		// stop the timer 
		function myStopFunction() {
	    clearInterval(timerId);
	  };
          
          /**
           * Use a second-by-second timer to update the matching status
           * @returns {undefined}
           */ 

	  var timerId = null;
	  function timer() {
	    updateMatchingStatus(address);
	  }
	  /**
	   * Callback function to start the timer
	   */
	  this.start = function () {
	    if (timerId)
	        clearInterval(timerId);
	    timerId = setInterval(timer, 10000); // every 10 seconds
	  };
	  /**
	   * Callback function to stop the timer
	   */
	  this.stop = function () {
	    clearInterval(timerId);
	  };
        
        /**
         * callback function for registering the taxi sharing service 
         */
        this.register = function () { 
            /* Fetch the user ID from the "name" input field */
            var oucu = get_name_value('name', 'user1'); 
            // Post the user ID using the "users" API
            // 2(a) FR1.1 
            // Post the user ID using the "users" API
            $.post('http://137.108.93.222/openstack/taxi/users', {
                OUCU: oucu
            }, function (data) {
                var obj = $.parseJSON(data);
                if (obj.status == "fail" || obj.status == "error") {            
                    alert('User ' + oucu + ' is already registered.');
                } else {
                    alert('Success! User ' + oucu + ' has been registered.');
                }
            }
            );
        }; 
        
        /**
         * TODO callback function for volunteering a taxi 
         */
		 
        this.volunteer = function() { 
			var oucu = get_name_value('name', 'user1'); 
            address = get_name_value('addr', "Open University")            
            var start_time  = get_name_value('time', format(new Date()));
            var end_time = get_name_value('time2', 1);
            // compute the date of the next end_time hours
            var d = new Date();
            d.setHours(d.getHours() + end_time);
            var ends = format(d);
		
            // Post the details of start, end time, the address and the type to the orders API

			/* post details of the volunteered taxi to the RESTful web service by invoking 
			* the Post method on the appropriate URI 
			*/
			$.post('http://137.108.93.222/openstack/taxi/orders',{
				OUCU: oucu, start: start_time, end: ends, type: 0, address: address
            }, function (data) {
			// parse the string received from the web server into a JavaScript object
                var obj = $.parseJSON(data);
				// alert the user if volunteering of taxi has been recorded or failed
                if (obj.status == "fail" || obj.status == "error") {                
                    alert('Attempt failed to volunteer a taxi by a user ' + oucu + ' at ' + start_time 
					+ ' till ' + end_time + ' at the address: ' + address);
                } else {
                    alert('Success! User ' + oucu + ' volunteered a taxi at ' + start_time + ' till ' 
					+ ends + ' at the address: ' + address);
                }
            }
            );
        }; 
        
        /**
         * callback function for requesting a taxi 
         */
        this.request = function() { 
            var oucu = get_name_value('name', 'user1'); 
            address = get_name_value('addr', "Open University")            
            var start_time = get_name_value('time', format(new Date()));
            // Post the details of start time, the address and the type to the orders API

			
			/* Post details of the request to share a taxi to the RESTful web service by 
			* invoking Post method on the appropriate URI
			*/
			$.post('http://137.108.93.222/openstack/taxi/orders',{
				OUCU: oucu, start: start_time, type: 1, address: address
            }, function (data) {
				// parse the string received from the web server into a JavaScript object
                var obj = $.parseJSON(data);
				// alert the user if the request has been successful or failed
                if (obj.status == "fail" || obj.status == "error") {                
                    alert('Attempt failed to request a taxi by a user ' + oucu + ' at ' + start_time 
					+ ' at the address: ' + address);
                } else {
                    alert('Success! User ' + oucu + ' has requested a taxi at ' + start_time + ' at the address: ' + address);
                }
            }
			);
        }; 
        
        /**
         * callback function for cancelling the bookings
         */
        this.cancel = function() { 
          var oucu = get_name_value('name', 'user1'); 
          $.get('http://137.108.93.222/openstack/taxi/orders?OUCU=' + oucu,
              function (data) {
                  var obj = $.parseJSON(data);
                  if (obj.status == "fail") {
                      alert(obj.data[0].reason);
                  } else {
                      $.each(obj.data, function (index, value) {
                          var url = "http://137.108.93.222/openstack/taxi/orders/" + value.id + "?OUCU=" + oucu;
                          $.ajax({
                              url: url,
                              type: 'DELETE',
                              data: {
                                  password: 'password'
                              },
                              success: function (result) {

                                  alert("Deleted: " + result);
                              }
                          });
                      });
                  }
              });
        }; 
        // update the Google map initially

        updateMap(address);
      }
      this.taxiShare = new TaxiShare();
    }    
};
app.initialize();