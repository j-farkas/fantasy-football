export class Game {
  constructor(){
    this.teams = [];
    this.turn = 0;
    this.pos = "";
    this.score = 0;


  }

  draft(position){
    let pop = this;
    //console.log(pop);
    let body;
    this.pos = position;
    let year = 2018;
    let week = 1;
    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      //let url = `https://api.cfl.ca/v1/games/${year}?key=rhy39KfCUcrQSUAXvTbzEntaX4X5Uapv&include=boxscore`;
      //let url = `http://dinoipsum.herokuapp.com/api?words=1&paragraphs=1&format=json`
      let url = `https://api.fantasy.nfl.com/v1/players/stats?statType=weekStats&season=2018&format=json&position=${position}`

      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
          //console.log(request);
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
      //console.log(Object.keys(body.players));
      Object.keys(body.players).forEach(function(i){
        //console.log(pop.pos);
        //console.log(pop.teams[(pop.turn + 1) % 2].playerIds[pop.pos]);
        if(pop.teams[(pop.turn + 1) % 2].playerIds[pop.pos]!== body.players[i].name){
          $("#QB").append(`<option value = "${body.players[i].id}">${body.players[i].name}</option>`);
        }
      })
    }, function(error) {
      console.log("NO");
    });
  }

  startSeason(){
    let positions = Object.keys(this.teams[(this.turn+1)%2].playerIds);
    let game = this;
    let week1 = {};
    let increase = 1;
    let week2 = {};
    //positions.push("TE");
    positions.forEach(function(pos){
      let count;
      console.log(pos);
      if (pos == "RB" || pos == "WR" || pos == "TE"){
        count = 100;
      }else{
        count = 35;
      }
      let promise = new Promise(function(resolve, reject) {
        let request = new XMLHttpRequest();

        if(Math.floor(increase) > 0){
          game.turn++;
          increase--;
        }else{
          increase+=.2;
        }
        let url = `https://api.fantasy.nfl.com/v1/players/scoringleaders?season=2018&week=${game.turn}&count=${count}&position=${pos}&format=json`
        console.log(url);
        request.onload = function() {
          if (this.status === 200) {
            resolve(request.response);
            //console.log(request);
          } else {
            reject(Error(request.statusText));
          }
        }
        request.open("GET", url, true);
        request.send();
      });
      promise.then(function(response) {
        let body = JSON.parse(response);
        //console.log(body.positions[pos]);
        // week1.push(body.positions[pos].filter(function(v){
        //   return v.firstName + " " + v.lastName === game.teams[0].playerIds[pos]
        // })[0])
        week1[pos] = body.positions[pos].filter(v => (v.firstName + " " + v.lastName === game.teams[0].playerIds[pos]))[0];
        week2[pos] = body.positions[pos].filter(v => (v.firstName + " " + v.lastName === game.teams[1].playerIds[pos]))[0];



        // //console.log(body);
        // $("#QB").empty();
        // //console.log(Object.keys(body.players));
        // Object.keys(body.players).forEach(function(i){
        //   //console.log(pop.pos);
        //   //console.log(pop.teams[(pop.turn + 1) % 2].playerIds[pop.pos]);
        //   if(pop.teams[(pop.turn + 1) % 2].playerIds[pop.pos]!== body.players[i].name){
        //     $("#QB").append(`<option value = "${body.players[i].id}">${body.players[i].name}</option>`);
        //}
      //})
    }, function(error) {
      console.log("NO");
    });



  })
  setTimeout(function(){
  game.teams[0].weeks.push(week1);
  let score1 = 0;
  let totalscore1 = 0;
  let score2 = 0;
  let totalscore2 = 0;

  game.teams[1].weeks.push(week2);
  let scores1 = game.teams[0].weeks[game.turn-1];
  let scores2 = game.teams[1].weeks[game.turn-1];
  console.log(scores2);
  // $(".team1.QB").append(`${game.teams[0].playerIds.QB}</li>`);
  // $(".team1.RB").append(`${game.teams[0].playerIds.RB}</li>`);
  // $(".team1.WR").append(`${game.teams[0].playerIds.WR}</li>`);
  // $(".team1.TE").append(`${game.teams[0].playerIds.TE}</li>`);
  // $(".team1.K").append(`${game.teams[0].playerIds.K}</li>`);
  //
  // $(".team2.QB").append(`${game.teams[1].playerIds.QB}</li>`);
  // $(".team2.RB").append(`${game.teams[1].playerIds.RB}</li>`);
  // $(".team2.WR").append(`${game.teams[1].playerIds.WR}</li>`);
  // $(".team2.TE").append(`${game.teams[1].playerIds.TE}</li>`);
  // $(".team2.K").append(`${game.teams[1].playerIds.K}</li>`);
  //$(".team2,.QB").append(`Week ${game.turn}</li>`);
  positions.forEach(function(pos){
    console.log("position" + pos)
    console.log("In here")
    console.log(pos);
    if(scores1[pos] != scores1["un"]){
      score1 = scores1[pos].pts;
      if(score1 === false)
      {
        score1 = 0;
      }
      $(".team1."+pos).append(` / ${game.turn} - ${score1}`);
      //score2 = scores2[pos].pts;
      totalscore1 += parseInt(score1);
    }
    if(scores2[pos] != scores2["un"]){
      score2 = scores2[pos].pts;
      if(score2 === false)
      {
        score2 = 0;
      }
      $(".team2." + pos).append(` / ${game.turn} - ${score2}`);
      totalscore2 += parseInt(score2);
    }

    // score2 += game.teams[0].weeks[pos].pts;
    //$("#team2").append(`<li>${pos}: ${scores2[pos].firstName} ${scores2[pos].lastName} - ${parseFloat(scores2[pos].pts)}</li>`);
    // $("#team2").append(`<li>${pos}: ${game.teams[1].weeks[pos].firstName} ${game.teams[1].weeks[pos].lastName} - ${game.teams[1].weeks[pos].pts}</li>`);
  })
  $(".team1.total").append(` / ${totalscore1}`);
  $(".team2.total").append(` / ${totalscore2}`);
  game.teams[0].score.push(totalscore1);
  game.teams[1].score.push(totalscore2);
  if(game.turn === 17){
    $(".team1.total").append(` / ${game.teams[0].score.reduce((accumulator, currentValue) => accumulator + currentValue)}`);
    $(".team2.total").append(` / ${game.teams[1].score.reduce((accumulator, currentValue) => accumulator + currentValue)}`);
  }
}, 1000);

   //Object.values(scores1).forEach(function(pos){

  console.log(game);

  console.log(positions);
}
}
