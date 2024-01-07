let Pcolors = [[255,0,0],[0,0,255],[0,255,0],[255,255,255],[255, 125, 125]];
let nPlayers;
let rows,cols;
let margin = 10;
let size;
let margin2;
let matrix,dBalls = [],duplicate = [],moves = [];
let isPressed = false;
let player;
let isok = false;
let isRun = false;
let played;
let some = false;
let RemPlayers;
var start = false;

var myID = 1;
var mat = false;


game.once("value").then((snapshot)=>{
    let data = snapshot.val();
    nPlayers = parseInt(data.players);
    rows = parseInt(data.grid),cols = parseInt(rows*0.6);
    size = (600-(margin*2))/rows;
    margin2 = (400-(size*cols))/2;
    matrix = data.matrix;
    player = parseInt(data.player);
    played = parseInt(data.played);
    RemPlayers = data.RemPlayers
    for(i = 0;i<cols;i++){
        dBalls[i] = [];
        for(j = 0;j<rows;j++){
            dBalls[i][j] = new Gola(i,j);
        }
    }
    check();
    start = true;
})

function setup(){
    var canvas = createCanvas(400, 600);
    canvas.class('canvas-class');
    canvas.elt.removeAttribute('style');
    canvas.parent("canvas-Container");
}
game.child('RemPlayers').on('value',(snapshot)=>{
    if(player != myID){
        RemPlayers = snapshot.val();
    }
})
game.child('matrix').on('value',(snapshot)=>{
    if(player != myID){
        matrix = snapshot.val();
        check();
    }
});