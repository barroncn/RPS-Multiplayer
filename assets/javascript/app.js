$(document).ready(function(){
    
    //GLOBAL VARIABLES
    //=============================================================================================================================================
    
    //This array will be saved on Firebase, so players can retrieve their stats
    var theGameStats = [
                           {
                               name: "CAITLIN",
                               wins: 5,
                               losses: 2,
                               ties: 0,
                           },
                           
                           {
                               name: "JUSTIN",
                               wins: 2,
                               losses: 8,
                               ties:0
                           }
                       ];
    
    var theConversation = [
                            "<p>Start the Conversation here!<p>",
                
                          ];
                       
    var playerOne = false;
    var playerTwo = false;
    var playerOnePick = false;
    
    //FUNCTIONS
    //=============================================================================================================================================
    
    
    
    //MAIN PROCESS
    //=============================================================================================================================================
    
    
    
})



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