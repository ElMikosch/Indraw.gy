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
- Player presses Ready button 
- When all players are ready game starts
- Free draw before game starts
- Player Canvas is cleared
- Player gets the prompt to draw and the time left
- Player has controls for line thickness and eraser, clear all
- If AI guesses correct canvas of this player is locked
- If time runs out without correct guess canvas is locked
- Player get points according to placement 
    - 1st Place = 5 Points 
    - 2nd Place = 3 Points 
    - 3rd Place = 2 Points 
    - Correct Guess inside time frame = 1 Point
- Next round starts automatically 
- Best and Worst picture between rounds
- After X Rounds stats are displayed on main screen
- Gallery of all drawn pictures is shown
- Button to start a new round with same players
- Button to start a new round with new players

# Workflow Player draws - AI guesses - Battle Royal
- Same as before 
- Last Player to get the AI to guess right or all players who did not get the AI to guess right are removed
- Last Player in game wins


# Workflow AI draws - Player guesses 
- Player scans QR Code
- Player sees Login form
- Player logs in with username
- Player is routed to guessing screen
- Player presses Start Game Button on Main Client
- Game Starts 
- Player sees AI drawing on Main Screen
- Player has textbox to input their guess
- Player sees placeholder for image name on main screen and player screen
- Chat is displayed on main screen with all the guesses
- Correct guesses are not displayed 
- Own guesses are displayed on player screen
- If AI guesses correct input of this player is locked
- If time runs out without correct guess input is locked
- Player get points according to placement 
    - 1st Place = 5 Points 
    - 2nd Place = 3 Points 
    - 3rd Place = 2 Points 
    - Correct Guess inside time frame = 1 Point
- Next round starts automatically 
- After X Rounds stats are displayed on main screen
- Button to start a new round with same players
- Button to start a new round with new players