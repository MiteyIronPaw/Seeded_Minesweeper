function Polygon(X, Y, W, H, ID, x, y){
    this.x = x
    this.y = y
    
	this.X1 = X;
	this.Y1 = Y;
	
	this.X2 = X+W;
	this.Y2 = Y+H;
	
	this.hover = false;
	this.mouse_down = false;
	//-1 mine, 0-8 the number of mines
	this.ID = ID;
	//0 coverd, 1 Showen, 2 Flaged
	this.state = 0;
}


function renderBoard(){
	for (var i = 0; i < Board.length; i++) {
		if(Board[i] != null){
			draw_square(Board[i], 2, "#555555");
		}
 	}
	
	
	for (var i = 0; i < Board.length; i++) {
		if(Board[i] != null){
			switch(Board[i].state){
				case 0:
					if(Board[i].hover){draw_square(Board[i], 0, "#707570");
					}else{draw_square(Board[i], 0, "#909590");}
					break;
					
				case 1:
					if(Board[i].hover){draw_square(Board[i], 0, "#666677");
					}else{draw_square(Board[i], 0, "#777788");}
					break;
					
				case 2:
					if(Board[i].hover){draw_square(Board[i], 0, "#CC7500");
					}else{draw_square(Board[i], 0, "#FFA500");}
					break;
			}

			colours = ["#0020f0","#241dda","#4818b6","#6d1391","#910e6d","#b60948","#da0424","#f00000"];
			colours_shade = ["#0010d0","#140dba","#380896","#5d0371","#710e4d","#960938","#ba0414","#c00000"];
			
			colours_shade_alpha = ["rgba(0, 16, 208, 0.1)","rgba(20, 13, 186, 0.1)",
			                       "rgba(56, 8, 150, 0.1)","rgba(93, 3, 113, 0.1)",
			                       "rgba(113, 14, 77, 0.1)","rgba(150, 9, 56, 0.1)",
			                       "rgba(186, 4, 24, 0.1)","rgba(192, 0, 0, 0.1)"];
			
			
			context.font="bold 22px Arial";
			if(Board[i].state == 1){
				if(Board[i].ID > 0){
			        draw_square(Board[i], 0, colours_shade_alpha[Board[i].ID-1]);
			        
			        context.fillStyle = colours[Board[i].ID-1];
				    context.fillText(Board[i].ID, (Board[i].X1+Board[i].X2)/2-5, (Board[i].Y1+Board[i].Y2)/2+5);  
				}
			}
		}
 	}
}


function renderMines(){
	for (var i = 0; i < Board.length; i++) {
		if(Board[i] != null){
			if(Board[i].ID == -1){
				draw_square(Board[i], 0, "rgba(255, 0, 0, 0.5)");
			}
		}
 	}
}


function draw_square(square, d, colour){
	context.fillStyle = colour;
	context.beginPath();
	context.moveTo(square.X1 + d, square.Y1 + d);
	context.lineTo(square.X2 + d, square.Y1 + d);
	context.lineTo(square.X2 + d, square.Y2 + d);
	context.lineTo(square.X1 + d, square.Y2 + d);
	context.closePath();
	context.fill();
}
/*
    Colours

#02f
#241dda
#4818b6
#6d1391
#910e6d
#b60948
#da0424
#f00

*/



