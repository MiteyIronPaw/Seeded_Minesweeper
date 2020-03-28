function loadBoard(canvas, Board, Seed){
	//Square 15, 8 is always going to be the starting square
	
	
	var Y_off_set = 100;
	var X_off_set = 10;
	var Size = height / 16;
	var Gap = Size / 10;
	//(7/30)*Y // Trust me ;)
	
	//
	// Generate squares
	//
	for(x = 0; x < 30; ++x){
		for(y = 0; y < 16; ++y){
            let old_square = null;

            if(Board[y*30+x]) {
                old_square = Board[y*30+x];
            }
            Board[y*30+x] = new Polygon(x*Size+X_off_set, y*Size+Y_off_set, Size-Gap, Size-Gap, 0, x, y);
            
            if(old_square) {
                Board[y*30+x].state = old_square.state;
            }
		}
	}
	
	
	//
	//  Place Mines
    //
    Math.seedrandom(Seed);
	for(n = 0; n < 99;){
		x = Math.round(Math.random()*29)
		y = Math.round(Math.random()*15)
		I = y*30+x
		
		if(Board[I].ID != -1){
		    if( I != 226 && I != 225 && I != 224 &&
		        I != 256 && I != 255 && I != 254 &&
		        I != 286 && I != 285 && I != 284 ){
		        
			    Board[I].ID = -1
			    ++n;
			}
		}
	}
	
	
	//
	//  Number sqaures
	//
	for(x = 0; x < 30; ++x){
		for(y = 0; y < 16; ++y){
			if(Board[y*30+x].ID != -1){
				count = 0;
				surrounding = get_surrounding(x, y);
				for(i = 0; i < surrounding.length; ++i){
                    if(surrounding[i].ID == -1){count++;}
                }
				Board[y*30+x].ID = count;
			}
		}
	}
	
	//
	//  Click the center square
	//
	uncover(Board[255]);
}


function get_square(x, y){
    if(x >= 0 && x < 30 && y >= 0 && y < 16){
        return Board[y*30+x];
    }
    return Board[255];//This square is already clicked
}


function uncover(square){
    if(square.ID == -1){
        stop_time();
        GameOver = true;
    }
    
    if(square.ID >  0){square.state = 1;}
    
    if(square.ID == 0){
        square.state = 1;
        var surrounding = get_surrounding(square.x, square.y);
        
        for(var i = 0; i < surrounding.length; ++i){
            if(surrounding[i].state == 0){
                uncover(surrounding[i]);
            }
        }
    }
}


function flag(square){
    switch(square.state){
        case 0:
            square.state = 2;
            flags_left--;
            if(square.ID == -1){mines_left--;}
			break;
        case 2:
            square.state = 0;
            flags_left++;
            if(square.ID == -1){mines_left++;}
			break;
	}
}


function click_around(square){
    surrounding = get_surrounding(square.x, square.y);
    
    flag_count = 0;
    
    for(var i = 0; i < surrounding.length; ++i){
        if(surrounding[i].state == 2){
            flag_count++;
        }
    }
    
    if(square.ID > 0 && square.ID <= flag_count){
        for(var i = 0; i < surrounding.length; ++i){
            if(surrounding[i].state == 0){
                uncover(surrounding[i]);
            }
        }
    } 
}


function check_win(){
    for(i = 0; i < Board.length; i++){
        // It's coverd/flagged and it's not a mine
        if(Board[i].state != 1 && Board[i].ID != -1){return;}
    }
    stop_time();
    GameOver = true;
    win = true;
}


function resize_canvas(){
	
    height =  document.body.clientHeight-100;
    width =  document.body.clientWidth - 20;
		
    //Work out which is smaller a set the canvas to fit the 30:16 ratio
    if(width*(8/15) > height){
        width = height*(15/8);
    }else{
        height = width*(8/15);
    }
		    
		    
    canvas.height = height+100;
    canvas.width = width+20;

    shadow_canvas.height = canvas.height;
    shadow_canvas.width = canvas.width;

    loadBoard(canvas, Board, Seed);
    renderShadows(shadow_context);
}



function get_surrounding(x, y){
    var surrounding = [];
    surrounding.push(get_square(x+1, y+0));
    surrounding.push(get_square(x-1, y+0));
    surrounding.push(get_square(x+0, y+1));
    surrounding.push(get_square(x+0, y-1));
    surrounding.push(get_square(x+1, y+1));
    surrounding.push(get_square(x+1, y-1));
    surrounding.push(get_square(x-1, y+1));
    surrounding.push(get_square(x-1, y-1));
    return surrounding;
}
/*
Center squares
8*30+15 = 255
8*30+14 = 254
8*30+16 = 256
7*30+15 = 225
9*30+15 = 285
9*30+16 = 286
9*30+14 = 284
7*30+16 = 226
7*30+14 = 224
*/
