# Workflow Player draws - AI guesses
- Player scans QR Code
    - [Backend] Generate QR code for Player Login
    - [Backend] Controller for QR code 
    - [Frontend - MainScreen] Create Main Menu for Main Screen
        - Menu Options for the different game modes
        - Setting for number of rounds 
    - [Frontend - MainScreen] Create Game Screen
        - Display QR Code when game hasnt started or game is full
        - Show Usernames, ready status and free draw canvas

- Player sees Login form
    - [Frontend - PlayerScreen] Create Login Screen
        - Input for Username
        - Submit Button
    - [Backend] Create LoginController
        - Add player to player list (username, sessionid, signalrid, dict<round,picture>)
        - Limit Players to 8

- Player is routed to drawing screen
    - [Frontend - PlayerScreen] Create Canvas Component
        - Display Drawing Canvas scaled to device screen
        - Show toolbar at the bottom to change line thickness, toggle eraser/draw mode, clear all button
    - [Backend] Create DrawHub
        - ReceivePicture Mobile -> Server
        - SendPicutre Server -> Main Client
        - ClearCanvas
        - CanvasEnabled

- Drawing board is only enabled depending on game state
    - [Frontend - PlayerScreen] Implement blocked state
        - Place a cute placeholder

- Player presses Ready button
    - [Backend] Implement PlayerHub
        - UserReady
        - AllUserReady
    - [Frontend - MainScreen] Update Main screen
        -  Show which user is ready
        -  Show that the game is starting when all user are ready 

- Player Canvas is cleared
    - [Frontend - PlayerScreen] Subscribe to ClearCanvas
        - Clear user canvas

- Player gets the prompt to draw and the time left
    - [Backend] Update DrawHub
        - Publish random word to Player and Main Client
    - [Backend] Implement GameHub
        - Set a timer and update every second
    - [Frontend - MainScreen] Update Main Screen 
        - Display each player canvas in realtime 
        - Display remaining time 
        - Display current word to draw 

- Player has controls for line thickness and eraser, clear all
    - Nothing to implement, see above

- If AI guesses correct canvas of this player is locked
    - [Frontent - PlayerScreen] Implement AI
        - AI needs to guess the word of the drawn picture
        - Player Client needs to send a success message to the backend when the AI guessed it right
        - Lock the canvas when AI guessed it right
    - [Backend] Implement Success logic
        - Update GameHub with another method
        - Save TimeStamp and picture of the player
        - Give player points according to his place
    - [Frontend - MainScreen] 
        - Show which player is finished or is still playing

- If time runs out without correct guess canvas is locked
    - [Frontend - PlayerScreen] 
        - Lock the canvas 
        - Send a failed message to Server
    - [Backend] Implement a failed logic
        - Update GameHub or generalize the success logic
        - Save picture only 
        - Give player 0 points
        - If more than one player fails, rank them all on the last place 
    - [Frontend - MainScreen]
        - Show that the time is up

- Player get points according to placement 
    - 1st Place = 5 Points 
    - 2nd Place = 3 Points 
    - 3rd Place = 2 Points 
    - Correct Guess inside time frame = 1 Point

- Best and Worst picture between rounds
    - [Backend] Implement Controller to send end of round stats
        - Send the 1st Place picture to the Main Client
        - Send thee last place picture to the Main Client 
        - When there are more than one last place: Randomly decide which picture is the worst. 
    - [Frontend - MainScreen] Get and display data from end of round controller
        - Display two picture given from the backend. 

- Next round starts automatically 
    - [Backend] Implement next round to GameHub
        - Start the next round after 10 seconds

- After X Rounds stats are displayed on main screen
    - [Backend] Implement End of game stats contoller
        - Rank the players according to his points
        - Method to get the stats for all players
        - Method to get own stats 
    - [Frontend - MainScreen] Get and display end of game stats for all
        - Display the rank
    - [Frontend - PlayerScreen] Get and display end of game stats for self
        - Display players rank 

- Gallery of all drawn pictures is shown (optional)
    - [Backend] Implement PictureHub to send picture data of all rounds 
        - Send all picture of each round 
        - Send them in a 10 seconds interval
    - [Frontend - MainScreen] Get and display data from PictureHub
        - Display pictures given from the backend

- Button to start a new round with same players
    - [Frontend - MainScreen] Display restart button
        - Display restart button
    - [Backend] Update GameHub to restart the game with same players
        - Restart whole game with same players 
        - Don't generate new QR code

- Button to start a new round with new players
    - [Frontend - MainScreen] Display new game button
        - Display new game button
    - [Backend] Update GameHub to restart the game with new players
        - Clear everything 
        - Generate new QR Code

# Workflow Player draws - AI guesses - Battle Royal
- Same as before 

- Last Player to get the AI to guess right or all players who did not get the AI to guess right are removed
    - [Backend] Remove player after loosing
    - [Frontend - MainScreen] Remove player from main screen
    - [Frontend - PlayerScreen] Display Game Over

- Last Player in game wins
    - [Backend] Update GameHub to send winning player
    - [Frontend - MainScreen] Display Winner
    - [Frontend - PlayerScreen] Display Winner Winner Chicken Dinner 


# Workflow AI draws - Player guesses 
- Player scans QR Code
- Player sees Login form
- Player logs in with username
- Player is routed to guessing screen
- Player presses Start Game Button on Main Client
- Game Starts 

- Player sees AI drawing on Main Screen
    - [Backend] Update GameHub to send random word to drawing AI
    - [Frontend - MainScreen] Implement Drawing AI
        - Display Canvas and strokes of AI

- Player has textbox to input their guess
    - [Backend] Implement GuessHub to receive Player guess
    - [Frontent - PlayerScreen] Display Textbox and Guess History

- Player sees placeholder for image name on main screen and player screen
    - [Backend] Update GuessHub to send the chosen word 
    - [Frontend - PlayerScreen] Display placeholder for chosen word
    - [Frontend - MainScreen] Display placeholder for chosen word

- Correct guesses are not displayed 
- Own guesses are displayed on player screen
- Chat is displayed on main screen with all the guesses
    - [Backend] Update GuessHub to send all incorrect guesses 
    - [Frontend - MainScreen] Display Guess history 

- If Player guesses correct input of this player is locked
- If time runs out without correct guess input is locked
    - [Backend] Update GameHub to send if player is correct
    - [Frontend - PlayerScreen] Disable input if correct or round end

- Player get points according to placement 
    - 1st Place = 5 Points 
    - 2nd Place = 3 Points 
    - 3rd Place = 2 Points 
    - Correct Guess inside time frame = 1 Point

- Next round starts automatically 
- After X Rounds stats are displayed on main screen
- Button to start a new round with same players
- Button to start a new round with new players

### Made with ❤ by Nico and Matze