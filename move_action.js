(function () {
	var positionNow = 55;
	if (document.getElementsByTagName) {
		var input = document.getElementsByTagName("input")[0];
		var submit = document.getElementsByTagName("input")[1];
		var maps = document.getElementsByTagName("td");
		var buttonGroup = document.getElementsByTagName("button");
		var go = buttonGroup[0];
		var left = buttonGroup[1];
		var right = buttonGroup[2];
		var back = buttonGroup[3];
	}
	var active = maps[positionNow];
	var face = getFace (active);
	go.onclick = function() {
		maps = document.getElementsByTagName("td");
		active = maps[positionNow];
		face = getFace (active);
		positionNow = moveGo(maps, face, positionNow);
	};
	left.onclick = function() {
		maps = document.getElementsByTagName("td");
		active = maps[positionNow];
		face = getFace (active);
		turn(maps, face, positionNow, -1);
	};
	right.onclick = function() {
		maps = document.getElementsByTagName("td");
		active = maps[positionNow];
		face = getFace (active);
		turn(maps, face, positionNow, 1);
	};
	back.onclick = function() {
		maps = document.getElementsByTagName("td");
		active = maps[positionNow];
		face = getFace (active);
		turn(maps, face, positionNow, -2);
	};
	submit.onclick = function() {
		var event = event || window.event;
		var targetDirection = input.value.toUpperCase().trim();
		maps = document.getElementsByTagName("td");
		active = maps[positionNow];
		face = getFace (active);
		switch(targetDirection) {
			case "GO":
				positionNow = moveGo (maps, face, positionNow);
				break;
			case "TUN LEF":
				turn(maps, face, positionNow, -1);
				break;
			case "TUN RIG":
				turn(maps, face, positionNow, 1);
				break;
			case "TUN BAC":
				turn(maps, face, positionNow, -2);
				break;
		}
		if (event.preventDefault) {
			event.preventDefault();
		}
		if (event.returnValue) {
			event.returnValue = false;
		}
		return false;
	};
}());
function turn (chessboard, face, positionNow, turnDirection) {
	var directionArray = ["top","right","bottom","left"];
	switch(face) {
		case "top":
			chessboard[positionNow].setAttribute("class","active "+directionArray[(4+turnDirection)%4]);
			break;
		case "right":
			chessboard[positionNow].setAttribute("class","active "+directionArray[(5+turnDirection)%4]);
			break;
		case "bottom":
			chessboard[positionNow].setAttribute("class","active "+directionArray[(6+turnDirection)%4]);
			break;
		case "left":
			chessboard[positionNow].setAttribute("class","active "+directionArray[(3+turnDirection)%4]);
	}
};
function moveGo (chessboard, face, positionNow) {
	switch(face) {
		case "top":
			if (positionNow<10) {
				alert("撞墙了，重新输入");
				return positionNow;
			} else {
				return move(chessboard, positionNow, -10, face);
			}
			break;
		case "bottom":
			if (positionNow >= 90) {
				alert("撞墙了，重新输入");
				return positionNow;
			} else {
				return move(chessboard, positionNow, 10, face);
			}
		case "left":
			if (positionNow % 10 === 0) {
				alert("撞墙了，重新输入");
				return positionNow;
			} else {
				return move(chessboard, positionNow, -1, face);
			}
		case "right":
			if (positionNow % 10 === 9) {
				alert("撞墙了，重新输入");
				return positionNow;
			} else {
				return move(chessboard, positionNow, 1, face);
			}				
		default :
			break;
	}
};
function move (chessboard, positionNow, positionChange, face) {
	chessboard[positionNow].setAttribute("class","");
	positionNow = positionNow + positionChange;
	chessboard[positionNow].setAttribute("class","active "+face);
	return positionNow;
};
function getFace (element) {
	if (element.getAttribute) {
		var className = element.getAttribute("class");
	}
	return className.split(" ")[1];
};