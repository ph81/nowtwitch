$(document).ready(function() {
  
  var users = ["freecodecamp", "bobross", "annemunition", "AustenMarie", "highdistortion", "noopkat", "smashstudios", "tooshi", "ninja"];

  var baseurl = "https://wind-bow.gomix.me/twitch-api/";

  var twitch_url = "https://www.twitch.tv/";

  var userLogo, userProfile, userFollowers, userStatus, userActivity, userUrl;

  var html = " ";

  users.forEach(function(user) {

    //calling api
    //getting stream status by user
    var apiurl = "https://wind-bow.gomix.me/twitch-api/" + "streams/" + user + "?callback=?";

    //getting user info
    $.getJSON(apiurl, function(json) {

        //if user is streaming live
        if (json.stream != null) { 

          //console.log(user + " online");

          userLogo = json.stream.channel.logo;
          userProfile = json.stream.channel.display_name;
          userFollowers = json.stream.channel.followers;
          userStatus = 1;
          userActivity = json.stream.channel.status;
          userUrl = twitch_url + userProfile;

          //console.log(userLogo + " " + userProfile + " " +userFollowers+ " " +userStatus + " " + userActivity);

          html += "'<tr><th scope='row'>"

          html += "<img src='" + userLogo + "'></th>";
            
          html += "<td><a href='" + userUrl + "' target='_blank'>" + userProfile + "</a></td>";

          html += "<td><span class='online'>Live!</span></td>";

          html += "<td>" + userActivity + "</td>";

          html += "<td>" + userFollowers + "</td></tr>";
            

          $("table tbody").html(html);

          
        }
        else {
           //if the user isn't streaming right now, getting the info from the channel

          var channelurl = baseurl + "channels/" + user + "?callback=?";

          //console.log(channelurl);

          $.getJSON(channelurl, function(json) {

            userLogo = json.logo;
            userProfile = json.display_name;
            userFollowers = json.followers;
            userStatus = 0;
            userActivity = json.status;


            html += "'<tr><th scope='row'>"

            html += "<img src='" + userLogo + "'></th>";
              
            html += "<td><a href='" + userUrl + "' target='_blank'>" + userProfile + "</a></td>";
  
            html += "<td><span class='offline'>Offline</span></td>";
  
            html += "<td>" + userActivity + "</td>";
  
            html += "<td>" + userFollowers + "</td></tr>";

            $("table tbody").html(html);
 

          });

          
        }

     });

     

  });

});
