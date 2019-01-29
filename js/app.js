
const users = ["freecodecamp", "bobross", "annemunition", "AustenMarie", "highdistortion", "noopkat", "smashstudios", "tooshi", "ninja"];

const baseurl = "https://api.twitch.tv/kraken/";

const twitch_url = "https://www.twitch.tv/";

const client_id = "fodj684do5v5hrk5j51nhkg6exdoph";

let userLogo, userProfile, userFollowers, userStatus, userActivity, userUrl;

let html = " ";

users.forEach(user => {

  //calling api
  //getting stream status by user
  let apiurl = "https://api.twitch.tv/kraken/" + "streams/" + user + "?client_id=" + client_id;
  //console.log(apiurl);

  //getting user info

  fetch(apiurl).then(response => {
    return response.json();
  }).then(data => {
    //console.log(data.stream.channel.display_name);
    //if user is streaming live
    if (data.stream != null) {

      console.log(user + " online");

      userLogo = data.stream.channel.logo;
      userProfile = data.stream.channel.display_name;
      userFollowers = data.stream.channel.followers;
      userStatus = 1;
      userActivity = data.stream.channel.status;
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

      let channelurl = baseurl + "channels/" + user + "?client_id=" + client_id;

      console.log(channelurl);

      fetch(channelurl).then(response => {
        return response.json();
      }).then(data => {
        //console.log(data);

        userLogo = data.logo;
        userProfile = data.display_name;
        userFollowers = data.followers;
        userStatus = 0;
        userActivity = data.status;
        userUrl = twitch_url + userProfile;

        html += "'<tr><th scope='row'>"

        html += "<img src='" + userLogo + "'></th>";

        html += "<td><a href='" + userUrl + "' target='_blank'>" + userProfile + "</a></td>";

        html += "<td><span class='offline'>Offline</span></td>";

        html += "<td>" + userActivity + "</td>";

        html += "<td>" + userFollowers + "</td></tr>";

        $("table tbody").html(html);
      }).catch(err => {
        console.log(err);
      });

    }

  }).catch(err => {
    console.log(err);
  });

});
