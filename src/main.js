//require('exports-loader?file!./bootstrap/js/dist/.js')
import $ from 'jquery';
import { team } from './team';
import { Game } from './game';
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './css/styles.css';
$(document).ready(function() {
let game = new Game();
console.log(game);

  $("#createTeam").on("submit", function(event){
    game.teams.push(new team($("#player1").val()));
    game.teams.push(new team($("#player2").val()));
    console.log(game);
    console.log(game.teams[game.turn % 2]);
    event.preventDefault();
  })
  $(".p1").on("click", function(event){
    //game.teams.push(new team($("#player1").val()));
    //console.log($(this).attr("name"));
    game.draft($(this).attr("name"));
    event.preventDefault();
  })
  $("#teamBuilder").on("submit", function(event){
    //game.teams.players.push($("#QB").text());
    game.teams[game.turn % 2].playerIds[game.pos] = $("#QB :selected").text();
    game.turn++;
    console.log(game.turn);
    if (game.turn == 10){
      game.turn = 0;
      //hide above ui
      //setInterval()
      let timer = setInterval(function(){
        game.startSeason();
          if(game.turn === 17){
            clearInterval(timer);
          }
          }, 3000);
    }
    console.log(game);
    event.preventDefault();
  })
})
