export class Game {
    constructor(){
        this.teams = [];
        this.turn = 0;
        this.pos = "";

    }

    draft(position){
      let pop = this;
      console.log(pop);
        let body;
        this.pos = position;
        let year = 2018;
        let week = 1;
    let promise = new Promise(function(resolve, reject) {
  let request = new XMLHttpRequest();
    //let url = `https://api.cfl.ca/v1/games/${year}?key=rhy39KfCUcrQSUAXvTbzEntaX4X5Uapv&include=boxscore`;
     //let url = `http://dinoipsum.herokuapp.com/api?words=1&paragraphs=1&format=json`
    let url = `https://api.fantasy.nfl.com/v1/players/stats?statType=weekStats&season=2018&week=${week}&format=json&position=${position}`
     request.onload = function() {
      if (this.status === 200) {
        resolve(request.response);
        console.log(request);
      } else {
        reject(Error(request.statusText));
      }
    }
    request.open("GET", url, true);
    request.send();
  });
  
  promise.then(function(response) {
   body = JSON.parse(response);
  
    console.log(body);
    $("#QB").empty();
    console.log(Object.keys(body.players));
    Object.keys(body.players).forEach(function(i){
      console.log(pop.pos);
      console.log(pop.teams[(pop.turn + 1) % 2].playerIds[pop.pos]);
      if(pop.teams[(pop.turn + 1) % 2].playerIds[pop.pos]!== body.players[i].name){
        $("#QB").append(`<option value = "${body.players[i].id}">${body.players[i].name}</option>`);
      }
    })
  }, function(error) {
    console.log("NO");
  });
    }
}
