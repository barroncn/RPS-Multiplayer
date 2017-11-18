$(document).ready(function(){
    
    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCY1JwJ5a4MV-GB9rejHDMOEaIIPtTB8Pc",
    authDomain: "rps-9bc69.firebaseapp.com",
    databaseURL: "https://rps-9bc69.firebaseio.com",
    projectId: "rps-9bc69",
    storageBucket: "rps-9bc69.appspot.com",
    messagingSenderId: "702360107729"
  };
  firebase.initializeApp(config);
  
  const database = firebase.database();
//   const pOne = firebase.database().ref().child("playerOneInfo");
//   const pTwo = firebase.database().ref().child("playerTwoInfo");
//   const gameVars = firebase.database().ref().child("gameVars");
  
  var nameInit = "";
  var winsInit = 0;
  var lossesInit = 0;
  var tiesInit = 0;
  var playerOneInit = false;
  var playerTwoInit = false;
  var playerOnePickInit = false;
  var pickInit = "";
  var name = nameInit;
  var wins = winsInit;
  var losses = lossesInit;
  var ties = tiesInit;
  var playerOne = playerOneInit;
  var playerTwo = playerTwoInit;
  var playerOnePick = playerOnePickInit;
  var pick = "";
  var newInput;
  
  //Watch the player one data and if there are changes or a page reloads, update!
  database.ref().on("value", function(snapshot){
      
      //If player one already exists, load the data from firebase
      if(snapshot.child("playerOne").exists()){
          $("#playerOne").html("<p id=firstPlayer>"+snapshot.val().playerOne.name+"</p>" +
                    "<p class='choice'>ROCK</p>" +
                    "<p class='choice'>PAPER</p>" +
                    "<p class='choice'>SCISSORS</p>" +
                    "<p class='stats'>Wins: <span id='winsOne'>"+snapshot.val().playerOne.wins+"</span> Losses: <span id='lossesOne'>"+snapshot.val().playerOne.losses+"</span> Ties: <span id='tiesOne'>"+snapshot.val().playerOne.ties+"</span></p>");
          
        //   //Since player one exists, we need to check for player two and watch the data
        //   database.ref("playerTwo").on("value", function(snapshot){
              
              //If player two exists, load the data from firebase
              if(snapshot.child("playerTwo").exists()){
                  $("#playerTwo").html("<p id=firstPlayer>"+snapshot.val().playerTwo.name+"</p>" +
                            "<p class='choice'>ROCK</p>" +
                            "<p class='choice'>PAPER</p>" +
                            "<p class='choice'>SCISSORS</p>" +
                            "<p class='stats'>Wins: <span id='winsOne'>"+snapshot.val().playerTwo.wins+"</span> Losses: <span id='lossesOne'>"+snapshot.val().playerTwo.losses+"</span> Ties: <span id='tiesOne'>"+snapshot.val().playerTwo.ties+"</span></p>");
              }
              
              //if player two does not exist, load waiting for player two (this is if player one is already there!)
              //without player one, the playerTwo div says nothing
              else{
                  $("#playerTwo").html("<p>Waiting for Player Two</p>");
              }
        //   });
      }
      
      //If there is not a player one, the player one div reads waiting for player one.
      else{
          $("#playerOne").html("<p>Waiting for Player One</p>");
      }
  });
  
  //Watch the gameVars data
  database.ref("gameVars").on("value", function(snaps){
      
      //If gamVars exists (the game has been played)...get the data already available on firebase
      if(snaps.val()){
          playerOne = snaps.val().playerOne;
          playerTwo = snaps.val().playerTwo;
          pick = snaps.val().pick;
      }
      
      //If the game has not been played...initialize the three variables and store them in firebase
      else{
          database.ref("gameVars").set({
              playerOne: playerOneInit,
              playerTwo: playerTwoInit,
              pick: pickInit
          });
      }
     
  });
});
  
  
  //get the value from the input box and initialize a player
  $("#start").on("click", function(event){
      
     //if player one is false (there is no player one present)
     if (!playerOne){
          event.preventDefault();
          database.ref("gameVars/playerOne").set({
              true
          });
          
          
          
          //CAN YOU DO THE ABOVE? JUST WANT TO CHANGE ONE OF GAMEVARS CHILDREN. IF I JUST SAY "GAMEVARS").SET({ PLAYERONE: TRUE}) IT DELETES THE OTHERS!!
          
          
          
          name = $("#playerName").val().trim();
          database.ref("playerOne").set({
              name: name,
              wins: winsInit,
              losses: lossesInit,
              ties: tiesInit
          });
          
          database.ref("playerOne").once("value", function(snapshot){
            $("#playerOne").empty().append( "<p id=firstPlayer>"+database.ref("playerOne").name.val()+"</p>" +
                    "<p class='choice'>ROCK</p>" +
                    "<p class='choice'>PAPER</p>" +
                    "<p class='choice'>SCISSORS</p>" +
                    "<p class='stats'>Wins: <span id='winsOne'>"+winsInit+"</span> Losses: <span id='lossesOne'>"+lossesInit+"</span> Ties: <span id='tiesOne'>"+tiesInit+"</span></p>"
            );
          });
     }
     else{
         event.preventDefault();
         $("#beginGame").empty();
         database.ref("gameVars/playerTwo").set({
              true
          });
          name = $("#playerName").val().trim();
          database.ref("playerTwo").set({
              name: name,
              wins: winsInit,
              losses: lossesInit,
              ties: tiesInit
          });
          
          database.ref("playerTwo").once("value", function(snapshot){
          $("#playerTwo").empty()
            .append( "<p id=secondPlayer>"+database.ref("playerTwo").name.val() +"</p>" +
                     "<p class='choice'>ROCK</p>" +
                     "<p class='choice'>PAPER</p>" +
                     "<p class='choice'>SCISSORS</p>" +
                     "<p class='stats'>Wins: <span id='winsTwo'>"+winsInit+"</span> Losses: <span id='lossesTwo'>"+lossesInit+"</span> Ties: <span id='tiesTwo'>"+tiesInit+"</span></p>"
             );
          });
     }
  });
     
  
  //When a name is submitted
  
  
//   database.ref("playerTwo").set({
//       name: name,
//       wins: wins,
//       losses: losses,
//       ties: ties,
//       pick: pick
//   });
  
//   database.ref("gameVars").set({
//       playerOne: playerOne,
//       playerTwo: playerTwo,
//       playerOnePick: playerOnePick
//   });
  
//   database.ref("convo").set({
//      caitlin: "hi there yall"
//   });

// $("#submit").on("click", function(){
//     event.preventDefault();
//     var comment = $("#comment").val().trim();
//     console.log(comment);
//     $("#comment").val("");
    
//     // newInput = name + ": " + comment;
//     database.ref("convo").push({
//         name: comment
//     });
// });

// database.ref("convo").on("value", function(snapshot){
//     console.log(snapshot.val());
//     $("#conversation").text(snapshot.val());
    
// });
  
//   pOne.ref().set({
//       name: "",
//       wins: 0,
//       ties: 0,
//       losses: 0
//   });
  
//   pTwo.ref().set({
//       name: "",
//       wins: 0,
//       ties: 0,
//       losses: 0
//   });
  
//   gameVars.ref().set({
//       playerOne: false,
//       playerTwo: false,
//       playerOnePick: false
//   });
  
//   db.ref().on("value", function(onesnapshot){
//       console.log(onesnapshot);
//   });
  
//   pTwo.on("value", function(twosnapshot){
//       console.log(twosnapshot);
//   });
  
//   gameVars.on("value", function(varsnapshot){
//       console.log(varsnapshot);
//   });
  
//   $("#start").on("click", function(event){
//       event.preventDefault();
//       if(!playerOne){
//           playerOne = true;
//           name = $("#playerName").val().trim();
//           $("#playerOne").empty()
//           .append( "<p id=firstPlayer>"+name+"</p>" +
//                     "<p class='choice'>ROCK</p>" +
//                     "<p class='choice'>PAPER</p>" +
//                     "<p class='choice'>SCISSORS</p>" +
//                     "<p class='stats'>Wins: <span id='winsOne'>"+wins+"</span> Losses: <span id='lossesOne'>"+losses+"</span> Ties: <span id='tiesOne'>"+ties+"</span></p>"
//             );
//           $("#playerTwo").append("Waiting for Player Two");
          
//           db.ref("playerOne").set({
//               name: name,
//               wins: wins,
//               losses: losses,
//               ties: ties
//           });
      
//           db.ref("gameVars").set({
//               playerOne: true
//           });
//       } 
      
//       
  
  
  
  
  
  
  
  
  
  

    // //GLOBAL VARIABLES
    // //=============================================================================================================================================
    
    // //This array will be saved on Firebase, so players can retrieve their stats
    // var theGameStats = [
    //                       {
    //                           name: "CAITLIN",
    //                           wins: 5,
    //                           losses: 2,
    //                           ties: 0,
    //                       },
                           
    //                       {
    //                           name: "JUSTIN",
    //                           wins: 2,
    //                           losses: 8,
    //                           ties:0
    //                       }
    //                   ];
    
    // var theConversation = [
    //                         "<p>Start the Conversation here!<p>",
                
    //                       ];
                       
    // var playerOne = false;
    // var playerTwo = false;
    // var playerOnePick = false;
    
    // //FUNCTIONS
    // //=============================================================================================================================================
    
    
    
    // //MAIN PROCESS
    // //=============================================================================================================================================
    
    
    




// Have playerOnePick=false;
//if player one pick is false...the first player can choose rock, paper, or scissors and playerOnePick will be TRUE
//if player one pick is true....the second player can choose rock, paper, or scissors (also add a condition that results is empty?)
//once they choose the results will display and playerOnePick will be false again


//Saving to FireBase: 
//We need to save player stats (name, wins, losses, ties);
            //Pass to an array saved in FireBase(do all upperCase name. Whatever they pass in will be made to upperCase)
//We need to save playerOnePick;
//We need to save theConversation;
            //Whatever a player adds to the input box will be passed to FireBase with "<p>[Name]: " + input.val().trim() + "</p>"
            //This can be pushed to theConversation array and the whole array will get .html-ed to the page.
            //
//isName = false;.....if you click start button now, everything goes to player one and then isName = true;
//click start button with is name = true everything goes to player two and the div empties
//When one player leaves you bring div back and isName = true;




//ORRR playerOne is false && playerTwo is false
//click submit goes to player one and playerOne = true;
//click submit goes to player two and playerTwo = true;
//if both players are true, div empties and game can start..
//if one player leaves, playerOne/playerTwo is set to false and name div comes back, message is sent saying that the player has disconnected


            
                // <p id="twoName">Player Two</p>
                // <p id="secondPlayer"></p>
                // <p class="choice">ROCK</p>
                // <p class="choice">PAPER</p>
                // <p class="choice">SCISSORS</p>
                // <p class="stats">Wins: <span id="winsTwo">0</span> Losses: <span id="lossesTwo">0</span> Ties: <span id="tiesTwo">0</span></p>