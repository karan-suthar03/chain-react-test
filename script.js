function setup(){
    var canvas = createCanvas(400, 600);
    canvas.class('canvas-class');
    canvas.elt.removeAttribute('style');
    canvas.parent("canvas-Container");
    for(i = 0;i<cols;i++){
        dBalls[i] = [];
        for(j = 0;j<rows;j++){
            dBalls[i][j] = new Gola(i,j);
        }
    }
    check();
}

function drawGrid(){
    stroke(Pcolors[player][0],Pcolors[player][1],Pcolors[player][2]);
    for(let i = 0;i<=cols;i++){
        line(margin2+(i*size),margin,margin2+(i*size),(margin+(size*rows)));
    }
    for(let i = 0;i<=rows;i++){
        line(margin2,margin+(i*size),margin2+(size*cols),margin+(i*size));
    }
}

function drawBalls(){
    stroke(0)
    for(i = 0;i<cols;i++){
        for(j = 0;j<rows;j++){
            dBalls[i][j].draw(matrix[i][j])
        }
    }
}

function draw(){
    if(player == undefined && RemPlayers == undefined){
        return;
    }
    clear();
    drawGrid();
    drawBalls();
    if(updateMove()){
        if(isRun){
            matrix = copyArray(duplicate);
            check();
        }
    }
    whoWon();
    if(!isRun && some){
        let k = 0;
        while (true && k<50) {
            if(RemPlayers[(player+1)%(nPlayers)] == 1){
                player = (player+1)%(nPlayers);
                localStorage.setItem('gameData',encodeURIComponent(JSON.stringify({players:nPlayers,played:played,player:player,grid:rows,matrix:matrix,RemPlayers:RemPlayers})));
                break;
            }else{
                player = (player+1)%(nPlayers);
            }
            k++;
        }
        some = false;
    }
}