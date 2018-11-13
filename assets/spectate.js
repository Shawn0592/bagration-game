let spectating = false;
let spectating_key = null;
let spec_player1_arr = [];
let spec_player2_arr = [];
let spectating_id;

function serverlist_watch(server){
	socket.emit('spectate', {
		command: 'SPEC01',
		id: server
	});

	spectating = true;
	spectating_id = server;
}

function spectator_click(id){
	return true;
}

socket.on('spectate', function(data){
	if(data.command == 'SPEC02' && data.user == this_player){
		$('#game').css('display','none');
		$('#menu').css('display','none');
		$('#startgame').css('display','none');
		$('#serverlist').css('display','none');

		$('#spectator_game').css('display','block');
		spectating_key = data.key;

		socket.emit('game', {
			command: 'GS004',
			game_key: spectating_key
		});
	} else if(data.command == 'SPECDATA1' && spectating == true){
		spec_player1_arr = data.player1_states;
		spec_player2_arr = data.player2_states;

		spec_updateStates();
	} else if(data.command == 'SPECDATA0'){
		socket.emit('game', {
			command: 'GS004',
			game_key: spectating_key
		});
	} if(data.command == 'SPECDATA2'){
		if(game_key == data.key){
			if(data.spectators == 0){
				$('.spectators').css('display','none');
			} else {
				$('.spectators').css('display','block');
				$('#spectators-count').text(data.spectators);
			}
		}
	}
});

function spec_updateStates(){
	let states = document.getElementsByTagName('polygon');

	for(let i = 0; i < spec_player1_arr.length; i++){
		for(let s = 0; s < states.length; s++){
			if(states[s].id == 'spectator_'+spec_player1_arr[i].state){
				states[s].setAttribute("class",'model-red');
			}
		}
		$('#spectator_'+spec_player1_arr[i].state+'-army b').text(spec_player1_arr[i].army+'T');
	}

	for(let i = 0; i < spec_player2_arr.length; i++){
		for(let s = 0; s < states.length; s++){
			if(states[s].id == 'spectator_'+spec_player2_arr[i].state){
				states[s].setAttribute("class",'model-green');
			}
		}
		$('#spectator_'+spec_player2_arr[i].state+'-army b').text(spec_player2_arr[i].army+'Т');
	}

	let terrs_text = null;
	if(spec_player1_arr.length == 1) terrs_text = 'территория';
	if(spec_player1_arr.length >= 2 && enemy_states_arr <= 4) terrs_text = 'территория';
	if(spec_player1_arr.length == 4) terrs_text = 'территории';
	if(spec_player1_arr.length >= 5) terrs_text = 'территорий'; 
	document.getElementById('spec_states2').innerHTML = spec_player1_arr.length+' '+terrs_text;

	terrs_text = null;
	if(spec_player2_arr.length == 1) terrs_text = 'территория';
	if(spec_player2_arr.length >= 2 && enemy_states_arr <= 4) terrs_text = 'территория';
	if(spec_player2_arr.length == 4) terrs_text = 'территории';
	if(spec_player2_arr.length >= 5) terrs_text = 'территорий'; 
	document.getElementById('spec_states1').innerHTML = spec_player2_arr.length+' '+terrs_text;

	spec_updateArmy();
}

function spec_updateArmy(){
	let states = document.getElementsByTagName('polygon');

	for(var i = 0; i < spec_player1_arr.length; i++){
		$('#spectator_'+spec_player1_arr[i].state+'-army').children('b').text(spec_player1_arr[i].army+'T');
		$('#spectator_'+spec_player1_arr[i].state+'-army').children('img').attr('src', 'assets/img/germany_reich.png');
	}

	for(var i = 0; i < spec_player2_arr.length; i++){
		$('#spectator_'+spec_player2_arr[i].state+'-army').children('b').text(spec_player2_arr[i].army+'T');
		$('#spectator_'+spec_player2_arr[i].state+'-army').children('img').attr('src', 'assets/img/ussr.png');
	}

	for(var i = 0; i < states.length; i++){
		if(states[i].className.animVal == 'model-green' || states[i].className.animVal == 'model-red'){
			let state_army = $('#'+states[i].id+'-army').children('b').text();
			// var center = getCenterSVG(states[i].id);
			// console.log(center);
			//txt.setAttribute('y', '30');
			if(state_army == '0T' || state_army == '0Т'){
				document.getElementById(states[i].id+'-army').style.opacity = '0';
			} else {
				document.getElementById(states[i].id+'-army').style.opacity = '1';
			}
		}
	}
}

function spec_hover(country){
	let states = document.getElementsByTagName('polygon');

	if(country == 1){
		for(let i = 0; i < spec_player1_arr.length; i++){
			for(let s = 0; s < states.length; s++){
				if(states[s].id == 'spectator_'+spec_player1_arr[i].state){
					if(spectating == true)
					states[s].style.opacity = '1';
				}
			}
		}

		for(let i = 0; i < spec_player2_arr.length; i++){
			for(let s = 0; s < states.length; s++){
				if(states[s].id == 'spectator_'+spec_player2_arr[i].state){
					if(spectating == true)
					states[s].style.opacity = '0.3';
				}
			}
		}
	} else if(country == 2){
		for(let i = 0; i < spec_player2_arr.length; i++){
			for(let s = 0; s < states.length; s++){
				if(states[s].id == 'spectator_'+spec_player2_arr[i].state){
					if(spectating == true)
					states[s].style.opacity = '1';
				}
			}
		}

		for(let i = 0; i < spec_player1_arr.length; i++){
			for(let s = 0; s < states.length; s++){
				if(states[s].id == 'spectator_'+spec_player1_arr[i].state){
					if(spectating == true)
					states[s].style.opacity = '0.3';
				}
			}
		}
	}
}

function spec_unhover(){
	let states = document.getElementsByTagName('polygon');
	
	for(let i = 0; i < spec_player2_arr.length; i++){
		for(let s = 0; s < states.length; s++){
			if(states[s].id == 'spectator_'+spec_player2_arr[i].state){
				if(spectating == true)
				states[s].style.opacity = '1';
			}
		}
	}

	for(let i = 0; i < spec_player1_arr.length; i++){
		for(let s = 0; s < states.length; s++){
			if(states[s].id == 'spectator_'+spec_player1_arr[i].state){
				if(spectating == true)
				states[s].style.opacity = '1';
			}
		}
	}
}