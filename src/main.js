//require('exports-loader?file!./bootstrap/js/dist/.js')
import $ from 'jquery';
import { team } from './team';
import { Game } from './game';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
$(document).ready(function() {
  $(".second").hide();
  $(".third").hide();
let game = new Game();
console.log(game);

  $("#createTeam").on("submit", function(event){
    game.teams.push(new team($("#player1").val()));
    game.teams.push(new team($("#player2").val()));
    console.log(game);
    //console.log(game.teams[game.turn % 2]);
    event.preventDefault();
    $(".second").toggle();
    $(".teamname").text(game.teams[game.turn%2].name);
    $(".first").hide();

  })
  $(".p1").on("click", function(event){
    //game.teams.push(new team($("#player1").val()));
    //console.log($(this).attr("name"));
    $(".third").show();
    game.draft($(this).attr("name"));
    event.preventDefault();

  })
  $("#teamBuilder").on("submit", function(event){
    $(".third").hide();
    $(".teamname").text(game.teams[(game.turn+1)%2].name);
    $(".team1name").text(game.teams[0].name);
    $(".team2name").text(game.teams[1].name);
    //game.teams.players.push($("#QB").text());
    game.teams[game.turn % 2].playerIds[game.pos] = $("#QB :selected").text();
    game.turn++;
    $(".team1.QB").text(`QB: ${game.teams[0].playerIds.QB}`);
    $(".team1.RB").text(`RB: ${game.teams[0].playerIds.RB}`);
    $(".team1.WR").text(`WR: ${game.teams[0].playerIds.WR}`);
    $(".team1.TE").text(`TE: ${game.teams[0].playerIds.TE}`);
    $(".team1.K").text(`K: ${game.teams[0].playerIds.K}`);

    $(".team2.QB").text(`QB: ${game.teams[1].playerIds.QB}`);
    $(".team2.RB").text(`RB: ${game.teams[1].playerIds.RB}`);
    $(".team2.WR").text(`WR: ${game.teams[1].playerIds.WR}`);
    $(".team2.TE").text(`TE: ${game.teams[1].playerIds.TE}`);
    $(".team2.K").text(`K: ${game.teams[1].playerIds.K}`);
    if (game.turn == 10){
      $(".second").hide();
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
