function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

function runMouseDown(mousePos){
	for (var i = 0; i < Board.length; i++) {
	    Board[i].mouse_down = contains_mouse(Board[i], mousePos.x, mousePos.y);
	    if(Board[i].mouse_down){
	        if(Board[i].state == 1){
	            click_around(Board[i]);
	        }
	        if(Board[i].state == 0){
	            uncover(Board[i]);
	        }
	    }
	}
	check_win();
}

function runMouseRight(mousePos){
	for (var i = 0; i < Board.length; i++) {
	    Board[i].mouse_down = contains_mouse(Board[i], mousePos.x, mousePos.y);
	    if(Board[i].mouse_down){
	        flag(Board[i]);
	    }
	}
}

function runMouseMove(mousePos){
	for (var i = 0; i < Board.length; i++) {
	    Board[i].hover = contains_mouse(Board[i], mousePos.x, mousePos.y);
	}
}

function contains_mouse(square, mx, my){
    return (square.X1 < mx && square.X2 > mx && square.Y1 < my && square.Y2 > my);
}
