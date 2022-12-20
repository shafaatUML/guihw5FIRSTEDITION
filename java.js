// The dictionary lookup object
var dict = {};
 
// Do a jQuery Ajax request for the text dictionary
$.get( "graphics_data/dictionary.txt", function( txt ) {
    // Get an array of all the words
    var words = txt.split( "\n" );
 
    // And add them as properties to the dictionary lookup
    // This will allow for fast lookups later
    for ( var i = 0; i < words.length; i++ ) {
        dict[ words[i] ] = true;
    }

});
 
// Takes in an array of letters and finds the longest
// possible word at the front of the letters
function findWord( word ) {
    // Clone the array for manipulation
    //var curLetters = letters.slice( 0 ), word = "";
     
    // Make sure the word is at least 3 letters long
    //while ( curLetters.length > 2 ) {
        // Get a word out of the existing letters
        //word = curLetters.join("");
     
        // And see if it's in the dictionary
        if ( dict[ word ] ) {
            // If it is, return that word
            return "true";
        }
 
        // Otherwise remove another letter from the end
        //curLetters.pop();
        return "false"; 
   // }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*  Author: Shafaat Osmani
    Contact: Shafaat_Osmani@student.uml.edu

    About this file: Main Javascript file which is responsible for the functionality
    of the scrabble game. Description of each section/function is described. 

    * There are various console log statements dispersed throughout the 
    file, there are solely for debugging purposes and do not affect the functionality of the game. *
*/


// Board array to store board information, keeps track of which spaces are 
// empty and which spaces are used as well as what letters are placed on the board
let board_arr = []; 
board_arr[0] = ' '; 
board_arr[1] = ' ';
board_arr[2] = ' ';
board_arr[3] = ' ';
board_arr[4] = ' ';
board_arr[5] = ' ';
board_arr[6] = ' ';
board_arr[7] = ' ';
board_arr[8] = ' ';
board_arr[9] = ' ';
board_arr[10] = ' ';
board_arr[11] = ' ';
board_arr[12] = ' ';
board_arr[13] = ' ';
board_arr[14] = ' ';

// useful variables
var word_string = ""; 
var score = 0; 
var total_score = 0; 
var tiles_on_rack = 0;
var tiles_on_board = 0; 
var random_index; 
var firstTile; 
var boarderror; 
var validation_string = "";
let blanktileletter; 
var doubleScore = "false"; 
var isWord = "false"; 
var amount = 0; 
// Modified associative array, taken from Jesse M. Heines. Added letter value and 
// edited indexing to numbers rather than letters
// His copyright:
/*  File:  /~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Pieces_AssociativeArray_Jesse.js
 *  Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
 *  Copyright (c) 2015 by Jesse M. Heines.  All rights reserved.  May be freely 
 *    copied or excerpted for educational purposes with credit to the author.
 *  updated by JMH on November 21, 2015 at 10:27 AM
 *  updated by JMH on November 25, 2015 at 10:58 AM to add the blank tile
 *  updated by JMH on November 27, 2015 at 10:22 AM to add original-distribution
 */
var ScrabbleTiles = [] ;
ScrabbleTiles[0] =  { "letter" : "A", "value" : 1,  "original-distribution" : 9,  "remaining" : 9  } ;
ScrabbleTiles[1] =  { "letter" : "B", "value" : 3,  "original-distribution" : 2,  "remaining" : 2  } ;
ScrabbleTiles[2] =  { "letter" : "C", "value" : 3,  "original-distribution" : 2,  "remaining" : 2  } ;
ScrabbleTiles[3] =  { "letter" : "D", "value" : 2,  "original-distribution" : 4,  "remaining" : 4  } ;
ScrabbleTiles[4] =  { "letter" : "E", "value" : 1,  "original-distribution" : 12, "remaining" : 12 } ;
ScrabbleTiles[5] =  { "letter" : "F", "value" : 4,  "original-distribution" : 2,  "remaining" : 2  } ;
ScrabbleTiles[6] =  { "letter" : "G", "value" : 2,  "original-distribution" : 3,  "remaining" : 3  } ;
ScrabbleTiles[7] =  { "letter" : "H", "value" : 4,  "original-distribution" : 2,  "remaining" : 2  } ;
ScrabbleTiles[8] =  { "letter" : "I", "value" : 1,  "original-distribution" : 9,  "remaining" : 9  } ;
ScrabbleTiles[9] =  { "letter" : "J", "value" : 8,  "original-distribution" : 1,  "remaining" : 1  } ;
ScrabbleTiles[10] = { "letter" : "K", "value" : 5,  "original-distribution" : 1,  "remaining" : 1  } ;
ScrabbleTiles[11] = { "letter" : "L", "value" : 1,  "original-distribution" : 4,  "remaining" : 4  } ;
ScrabbleTiles[12] = { "letter" : "M", "value" : 3,  "original-distribution" : 2,  "remaining" : 2  } ;
ScrabbleTiles[13] = { "letter" : "N", "value" : 1,  "original-distribution" : 6,  "remaining" : 6  } ;
ScrabbleTiles[14] = { "letter" : "O", "value" : 1,  "original-distribution" : 8,  "remaining" : 8  } ;
ScrabbleTiles[15] = { "letter" : "P", "value" : 3,  "original-distribution" : 2,  "remaining" : 2  } ;
ScrabbleTiles[16] = { "letter" : "Q", "value" : 10, "original-distribution" : 1,  "remaining" : 1  } ;
ScrabbleTiles[17] = { "letter" : "R", "value" : 1,  "original-distribution" : 6,  "remaining" : 6  } ;
ScrabbleTiles[18] = { "letter" : "S", "value" : 1,  "original-distribution" : 4,  "remaining" : 4  } ;
ScrabbleTiles[19] = { "letter" : "T", "value" : 1,  "original-distribution" : 6,  "remaining" : 6  } ;
ScrabbleTiles[20] = { "letter" : "U", "value" : 1,  "original-distribution" : 4,  "remaining" : 4  } ;
ScrabbleTiles[21] = { "letter" : "V", "value" : 4,  "original-distribution" : 2,  "remaining" : 2  } ;
ScrabbleTiles[22] = { "letter" : "W", "value" : 4,  "original-distribution" : 2,  "remaining" : 2  } ;
ScrabbleTiles[23] = { "letter" : "X", "value" : 8,  "original-distribution" : 1,  "remaining" : 1  } ;
ScrabbleTiles[24] = { "letter" : "Y", "value" : 4,  "original-distribution" : 2,  "remaining" : 2  } ;
ScrabbleTiles[25] = { "letter" : "Z", "value" : 10, "original-distribution" : 1,  "remaining" : 1  } ;
ScrabbleTiles[26] = { "letter" : "_", "value" : 0,  "original-distribution" : 2,  "remaining" : 2  } ;

//console.log("initial tiles on board" + tiles_on_board); 

// jQuery to manipulate the board and the rack by grabbing id
var $rack = $("#rack");
var $board = $("#board"); 

// make the rack draggable as well as giving it some attributes, make the board droppable and only accept draggables from the rack
$('li', $rack).draggable({
    cancel: "a.ui-icon", 
    revert: "invalid", 
    containment: "document",
    cursor: "move"
});
$('li', $board).droppable({
    accept: "#rack li",
    drop: function( event, ui ) { // on drop functionality, source: 

        if (document.getElementById($(ui.draggable).attr("id")).dataset.letter == "_") {
            let btile = window.prompt("enter a number corresponding to the letter for your blank tile (ONLY NUMBERS)\n 0-A     1-B     2-C     3-D\n 4-E     5-F     6-G     7-H\n 8-I     9-J     10-K     11-L\n 12-M     13-N     14-O     15-P\n 16-Q     17-R     18-S     19-T\n 20-U     21-V     22-W     23-X     24-Y     25-Z");
            document.getElementById($(ui.draggable).attr("id")).dataset.letter = ScrabbleTiles[btile].letter;
            document.getElementById($(ui.draggable).attr("id")).dataset.letval = ScrabbleTiles[btile].value;
            document.getElementById($(ui.draggable).attr("id")).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/"+btile+".jpg')";

        }

            tiles_on_board++; 
            //****** add dropped letter to word_string *****//
            //****** check word *****//

            if (firstTile == "true") {
                ui.draggable.addClass('first_tile');
            }

            document.getElementById($(ui.draggable).attr("id")).dataset.index = $(this).attr("value");
            board_arr[document.getElementById($(ui.draggable).attr("id")).dataset.index] = document.getElementById($(ui.draggable).attr("id")).dataset.letter; 
            console.log(board_arr); 
            
            word_string = ""; 
            for (var z = 0; z < board_arr.length; z++) { 
                if (board_arr[z] != ' ') {
                    word_string += board_arr[z]; 
                }
            }
 

            ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
            ui.draggable.addClass('on_board');
    
            tiles_on_rack--; 


            console.log(board_arr);


    //////////////////////////////////////////////////// CHECK IF THERE ARE NO SPACES BETWEEN LETTERS /////////////////////////////////////
    //console.log("letter at board i just put down: " + board_arr[document.getElementById($(ui.draggable).attr("id")).dataset.index]);   // letter at board arr index that i jsut put down

    if (!(document.getElementById($(ui.draggable).attr("id")).classList.contains("first_tile"))) {
    var next = Number(document.getElementById($(ui.draggable).attr("id")).dataset.index) + 1; 
    var prev = Number(document.getElementById($(ui.draggable).attr("id")).dataset.index) - 1; 


    var hi = next.toString(); 
    var hello = prev.toString(); 

    console.log("next"+ board_arr[hi]);
    console.log("prev"+ board_arr[hello]);

        if (board_arr[hi] == ' ' && board_arr[hello] == ' ') {
            console.log("ERROR HAS BEEN DETECTED!!!!!");

        console.log(word_string);
            board_arr[document.getElementById($(ui.draggable).attr("id")).dataset.index] = ' ';

            word_string = ""; 
        for (var z = 0; z < board_arr.length; z++) { 
            if (board_arr[z] != ' ') {
                word_string += board_arr[z]; 
            }
        } 
        document.getElementById('wordbeingbuilt').innerHTML = "<h3>Word: "+word_string+"</h3><p>&nbsp</p>";  
        console.log("look here");
        console.log(board_arr);
        console.log(word_string); 

            document.getElementById($(ui.draggable).attr("id")).classList.add('offending');  // add offending class   

                if (document.getElementById($(ui.draggable).attr("id")).classList.contains('offending')) {   // IF OFFENDING
                    $(document.getElementById($(ui.draggable).attr("id"))).css({"top":"", "left":""});   

                    document.getElementById($(ui.draggable).attr("id")).classList.remove('on_board'); 
                    document.getElementById($(ui.draggable).attr("id")).classList.add('on_rack'); 
                    document.getElementById($(ui.draggable).attr("id")).dataset.index = ""; 

                    $(document.getElementById($(ui.draggable).attr("id"))).draggable("destroy");
                    $(document.getElementById($(ui.draggable).attr("id"))).draggable({
                        cancel: "a.ui-icon", 
                        revert: "invalid", 
                        containment: "document",
                        cursor: "move"
                    });
                    
                    tiles_on_rack++; 
                    tiles_on_board--; 

                    return; 
                    //score -= document.getElementById($(ui.draggable).attr("id")).dataset.letval; 
                        
                }
        }
    }
    //////////////////////////////////////////////////// CHECK IF THERE ARE NO SPACES BETWEEN LETTERS /////////////////////////////////////
    document.getElementById('wordbeingbuilt').innerHTML = "<h3>Word: "+word_string+"</h3><p>&nbsp</p>";  

    score = score + Number(document.getElementById($(ui.draggable).attr("id")).dataset.letval);

            firstTile = "false"; 

            if (tiles_on_board >= 2) {
                if (findWord(word) == "true")
                    document.getElementById('submit').style.visibility = "visible";
            }
        }
 

    }); 


//****************************************************************************************** FROM BOARD TO RACK *****//
// submit button must be hidden when tile count is under 2
// tiles that are broken off / not connected must be re-drawn at the rack  OR only make tiles on either end draggable again?
$($rack).droppable({
    accept: "#rack li",
    drop: function( event, ui ) {
        tiles_on_board--;
        //console.log("drag back to rack works"); 
        score -= Number(document.getElementById($(ui.draggable).attr("id")).dataset.letval);

        //UPDATE WORD STRING USING BOARD_ARR
         
        board_arr[document.getElementById($(ui.draggable).attr("id")).dataset.index] = ' '; 
        word_string = ""; 
        for (var z = 0; z < board_arr.length; z++) { 
            if (board_arr[z] != ' ') {
                word_string += board_arr[z]; 
            }
        }
        document.getElementById('wordbeingbuilt').innerHTML = "<h3>Word: "+word_string+"</h3><p>&nbsp</p>";  

        
        //console.log(word_string); 

                $(document.getElementById($(ui.draggable).attr("id"))).css({"top":"", "left":""});   

                document.getElementById($(ui.draggable).attr("id")).classList.remove('on_board'); 
                document.getElementById($(ui.draggable).attr("id")).classList.add('on_rack'); 
                document.getElementById($(ui.draggable).attr("id")).dataset.index = ""; 

                $(document.getElementById($(ui.draggable).attr("id"))).draggable("destroy");
                $(document.getElementById($(ui.draggable).attr("id"))).draggable({
                    cancel: "a.ui-icon", 
                    revert: "invalid", 
                    containment: "document",
                    cursor: "move"
                });

        document.getElementById($(ui.draggable).attr("id")).classList.remove('on_board');

        if (document.getElementById($(ui.draggable).attr("id")).classList.contains('first_tile')) { 
            document.getElementById($(ui.draggable).attr("id")).classList.remove('first_tile'); 
            firstTile = "true"
        }

        if (tiles_on_board < 2) {
            document.getElementById('submit').style.visibility = "hidden";
        }
        
        // WHEN DRAGGING BACK AFTER USING BONUS SQUARE, POINTS ARE NOT ACCUMULATED PROPERLY, MAKE DOUBLESCORE FALSE?
        //  check if board indexes are being used?

        console.log(tiles_on_board); 
        //console.log(board_arr); 
    }
});


//****************************************************************************************** SUBMIT BUTTON *****//
$("#submit").click(function () {
    
    for (var x = 0; x < 7; x++) {             
        const calcscore = document.getElementById("rindex_"+x);
        if (calcscore.dataset.index == 2 || calcscore.dataset.index == 6 || calcscore.dataset.index == 8 || calcscore.dataset.index == 12) {
            doubleScore = "true"; 
            amount += 1; 
        }

    }

    //***** commit points *****//
    if (doubleScore == "true") {
        score = score * (amount * 2); 
    }
    total_score += score;
    doubleScore = "false"; 
    amount = 0; 

    document.getElementById('score').innerHTML = "<h3>Score: "+total_score+"</h3><p>&nbsp</p>"; 
    //***** empty word string *****//
    word_string = "";
    document.getElementById('wordbeingbuilt').innerHTML = "<h3>Word: "+word_string+"</h3><p>&nbsp</p>";  

    // create new tiles if used to refill hand
    for (var x = 0; x < 7; x++) {            
        random_index = getRandomInt(27); 
        const setImageValue = document.getElementById("rindex_"+x);
        $("#rindex_"+x).css({"top":"", "left":""});
        if (setImageValue.classList.contains('on_board')) {             // if it has class DROPPED
            if (ScrabbleTiles[random_index].remaining != 0) {
                setImageValue.dataset.letter = ScrabbleTiles[random_index].letter; 
                ScrabbleTiles[random_index].remaining = ScrabbleTiles[random_index].remaining - 1; 
                setImageValue.dataset.letval = ScrabbleTiles[random_index].value;
                setImageValue.classList.remove('on_board'); 
                setImageValue.classList.add('on_rack'); 
            } 
            else {
                do {
                    random_index = getRandomInt(27); 
                } while (ScrabbleTiles[random_index].remaining == 0);
                setImageValue.dataset.letter = ScrabbleTiles[random_index].letter; 
                ScrabbleTiles[random_index].remaining = ScrabbleTiles[random_index].remaining - 1; 
                setImageValue.dataset.letval = ScrabbleTiles[random_index].value;
                setImageValue.classList.remove('on_board'); 
                setImageValue.classList.add('on_rack');  
            }
            switch (document.getElementById("rindex_"+x).dataset.letter) {
                case "A":
                    document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/0.jpg')"; 
                    break;
                case "B":
                    document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/1.jpg')"; 
                    break; 
                case "C":
                    document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/2.jpg')"; 
                    break; 
                case "D":
                    document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/3.jpg')"; 
                    break; 
                case "E":
                    document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/4.jpg')"; 
                    break; 
                case "F":
                    document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/5.jpg')"; 
                    break; 
                case "G":
                    document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/6.jpg')"; 
                    break; 
                case "H":
                    document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/7.jpg')"; 
                    break; 
                case "I":
                    document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/8.jpg')"; 
                    break; 
                case "J":
                    document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/9.jpg')"; 
                    break; 
                case "K":
                    document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/10.jpg')"; 
                    break; 
                case "L":
                    document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/11.jpg')"; 
                    break; 
                case "M":
                    document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/12.jpg')"; 
                    break; 
                case "N":
                    document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/13.jpg')"; 
                    break; 
                case "O":
                    document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/14.jpg')"; 
                    break; 
                case "P":
                    document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/15.jpg')"; 
                    break; 
                case "Q":
                    document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/16.jpg')"; 
                    break;
                case "R":
                    document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/17.jpg')"; 
                    break; 
                case "S":
                    document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/18.jpg')"; 
                    break; 
                case "T":
                    document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/19.jpg')"; 
                    break; 
                case "U":
                    document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/20.jpg')"; 
                    break; 
                case "V":
                    document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/21.jpg')"; 
                    break; 
                case "W":
                    document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/22.jpg')"; 
                    break; 
                case "X":
                    document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/23.jpg')"; 
                    break; 
                case "Y":
                    document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/24.jpg')"; 
                    break; 
                case "Z":
                    document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/25.jpg')"; 
                    break; 
                case "_":
                    document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/26.jpg')"; 
                    break;  
            }

            if (setImageValue.classList.contains('first_tile')) {
                setImageValue.classList.remove('first_tile');
                firstTile = "false"; 
            }

            $("#rindex_"+x).draggable("destroy");
            $("#rindex_"+x).draggable({
                cancel: "a.ui-icon", 
                revert: "invalid", 
                containment: "document",
                cursor: "move"
            });
            
            tiles_on_rack++; 
            score = 0; 
            tiles_on_board = 0;
            firstTile = "true";  
            //(tiles_on_board); 
        }
    } 
    
    for (var i = 0; i < board_arr.length; i++) {
        board_arr[i] = ' '; 
    }

    document.getElementById('submit').style.visibility = "hidden";
});

//****************************************************************************************** INITIALIZE GAME *****//
$(function start() {
    // hide submit button until word is valid//
    document.getElementById('submit').style.visibility = "hidden";

    firstTile = "true"; 
/*
    for (var i = 0; i < 7; i++) {
        board_arr[i] = ''; 
    }
*/
    // give each rack tile an initial value
    for (var x = 0; x < 7; x++) {


        random_index = getRandomInt(27); 
        const setImageValue = document.getElementById("rindex_"+x); 
        if (ScrabbleTiles[random_index].remaining != 0) {
            setImageValue.dataset.letter = ScrabbleTiles[random_index].letter; 
            ScrabbleTiles[random_index].remaining = ScrabbleTiles[random_index].remaining - 1; 

            setImageValue.dataset.letval = ScrabbleTiles[random_index].value; 

        }
        else  {
            do {
                random_index = getRandomInt(27); 
            } while (ScrabbleTiles[random_index].remaining == 0);
            setImageValue.dataset.letter = ScrabbleTiles[random_index].letter; 
            ScrabbleTiles[random_index].remaining = ScrabbleTiles[random_index].remaining - 1; 

            setImageValue.dataset.letval = ScrabbleTiles[random_index].value; 
        }
        switch (document.getElementById("rindex_"+x).dataset.letter) {
            case "A":
                document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/0.jpg')"; 
                break;
            case "B":
                document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/1.jpg')"; 
                break; 
            case "C":
                document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/2.jpg')"; 
                break; 
            case "D":
                document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/3.jpg')"; 
                break; 
            case "E":
                document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/4.jpg')"; 
                break; 
            case "F":
                document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/5.jpg')"; 
                break; 
            case "G":
                document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/6.jpg')"; 
                break; 
            case "H":
                document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/7.jpg')"; 
                break; 
            case "I":
                document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/8.jpg')"; 
                break; 
            case "J":
                document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/9.jpg')"; 
                break; 
            case "K":
                document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/10.jpg')"; 
                break; 
            case "L":
                document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/11.jpg')"; 
                break; 
            case "M":
                document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/12.jpg')"; 
                break; 
            case "N":
                document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/13.jpg')"; 
                break; 
            case "O":
                document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/14.jpg')"; 
                break; 
            case "P":
                document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/15.jpg')"; 
                break; 
            case "Q":
                document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/16.jpg')"; 
                break;
            case "R":
                document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/17.jpg')"; 
                break; 
            case "S":
                document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/18.jpg')"; 
                break; 
            case "T":
                document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/19.jpg')"; 
                break; 
            case "U":
                document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/20.jpg')"; 
                break; 
            case "V":
                document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/21.jpg')"; 
                break; 
            case "W":
                document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/22.jpg')"; 
                break; 
            case "X":
                document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/23.jpg')"; 
                break; 
            case "Y":
                document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/24.jpg')"; 
                break; 
            case "Z":
                document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/25.jpg')"; 
                break; 
            case "_":
                document.getElementById("rindex_"+x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/26.jpg')"; 
                break;  
        }
        tiles_on_rack++; 
    }

//console.log(tiles_on_rack);
});


function getRandomInt(max) { return Math.floor(Math.random() * max); }


function handle_drop(event, ui) {
    tiles_on_rack--; 
    
    ui.draggable.addClass('dropped'); 
} 





// NOTES FOR MY REFERENCE: //
/*
(board_arr[hold - 1] != "A" && board_arr[hold + 1] != "A" &&
                    board_arr[hold - 1] != "B" && board_arr[hold + 1] != "B" &&
                    board_arr[hold - 1] != "C" && board_arr[hold + 1] != "C" &&
                    board_arr[hold - 1] != "D" && board_arr[hold + 1] != "D" &&
                    board_arr[hold - 1] != "E" && board_arr[hold + 1] != "E" &&
                    board_arr[hold - 1] != "F" && board_arr[hold + 1] != "F" &&
                    board_arr[hold - 1] != "G" && board_arr[hold + 1] != "G" &&
                    board_arr[hold - 1] != "H" && board_arr[hold + 1] != "H" &&
                    board_arr[hold - 1] != "I" && board_arr[hold + 1] != "I" &&
                    board_arr[hold - 1] != "J" && board_arr[hold + 1] != "J" &&
                    board_arr[hold - 1] != "K" && board_arr[hold + 1] != "K" &&
                    board_arr[hold - 1] != "L" && board_arr[hold + 1] != "L" &&
                    board_arr[hold - 1] != "M" && board_arr[hold + 1] != "M" &&
                    board_arr[hold - 1] != "N" && board_arr[hold + 1] != "N" &&
                    board_arr[hold - 1] != "O" && board_arr[hold + 1] != "O" &&
                    board_arr[hold - 1] != "P" && board_arr[hold + 1] != "P" &&
                    board_arr[hold - 1] != "Q" && board_arr[hold + 1] != "Q" &&
                    board_arr[hold - 1] != "R" && board_arr[hold + 1] != "R" &&
                    board_arr[hold - 1] != "S" && board_arr[hold + 1] != "S" &&
                    board_arr[hold - 1] != "T" && board_arr[hold + 1] != "T" &&
                    board_arr[hold - 1] != "U" && board_arr[hold + 1] != "U" &&
                    board_arr[hold - 1] != "V" && board_arr[hold + 1] != "V" &&
                    board_arr[hold - 1] != "W" && board_arr[hold + 1] != "W" &&
                    board_arr[hold - 1] != "X" && board_arr[hold + 1] != "X" &&
                    board_arr[hold - 1] != "Y" && board_arr[hold + 1] != "Y" &&
                    board_arr[hold - 1] != "Z" && board_arr[hold + 1] != "Z" &&
                    board_arr[hold - 1] != "_" && board_arr[hold + 1] != "_" ) 
*/

//1) make a for loop, check board arr indexes and if +1 and -1 = ' ', do destroy
/*
        if (firstTile == "false") {

            //if (document.getElementById($(ui.draggable).attr("id")).dataset.index != Number(0) && document.getElementById($(ui.draggable).attr("id")).dataset.index - 1 != Number(14)) { 

                var hold = board_arr[Number(document.getElementById($(ui.draggable).attr("id"))).dataset.index];

            console.log("LOOK HERE -> "+ board_arr[2]); 

                for (var i = 0; i < board_arr.length; i++) {
                    i-=1;  
                    if (board_arr[i] == ' ') {
                        console.log("please only place tiles next to one another: remove wrongly placed tile and try again");
                        boarderror = "true";
                       // return;
                    }
                    i+=1; 
                }

/*
                if (board_arr[hold - Number(1)] == ' ') {
                    console.log("please only place tiles next to one another: remove wrongly placed tile and try again");
                    boarderror = "true";  
                }
*              
           // }
        }
        
        //console.log("v"); 
        console.log(board_arr[hold-1]); 
        console.log("next index of just dropped"+hold + 1);
        console.log("prev index of just dropped"+board_arr[Number(document.getElementById($(ui.draggable).attr("id")).dataset.index) - 1]);
*/
//alternatively, whenever submit is being visible, check board_arr and see if there are any gaps between words (substring method)

//****************************************************************************************** FROM RACK TO BOARD *****//
//***** make not droppable anymore when dropped? *****// *****// *****// *****// *****// *****// *****// *****// *****//
//if holding tile, and another tile is placed on top of it, swap values for both tiles.
// validation that only tiles can be placed next to each other, or else destroy and re-create same tile on rack?
//****************************************************************************************** FROM RACK TO BOARD *****//

    /*
            SCORING

            switch ($(this).attr("value")) {

                case 2:
                    doubleScore = "true";
                    score = score + Number(document.getElementById($(ui.draggable).attr("id")).dataset.letval);
                    break;
                case 6:
                    doubleScore = "true";
                    score = score + Number(document.getElementById($(ui.draggable).attr("id")).dataset.letval);
                    break;
                default: 
                    score += Number(document.getElementById($(ui.draggable).attr("id")).dataset.letval);
                    break;

            } 
    */  


