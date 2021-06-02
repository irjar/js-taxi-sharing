The app can be deployed as a Cordova app on an Android device.

The app allows users travelling to a university campus to link up and share a taxi:

A user can:
1.	Register to use the taxi-sharing service using their id;
2.	Volunteer to share a ride by specifying the time slot (i.e. start time end time) and pick up address 
(e.g. Train station or the University campus);
3.	Request to share a ride by specifying the time slot (i.e. start time) and pick up address;
4.	Cancel all offers or requests associated with their id;
5.	Start or stop a timer that updates the matching orders at regular intervals.

The app lists available matching taxi locations on a Google map (The matching taxi can be found by getting it from the matches interface;
the Google map location can be found by posting a REST service request to the OpenStreetMap). 

The app notifies the user within 10 seconds by a sound and a text notification when a taxi location is available.

The app is using the Open University Restful web service that handles all the persistence and storage required for the taxi-sharing app.
