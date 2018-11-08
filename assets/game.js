let socket = io.connect('https://ancientwarserver.herokuapp.com/',{'forceNew':false});
// let socket = io.connect();
let player1, player2, this_player, game_key, player, player_country;
let my_states_arr = [], enemy_states_arr = [];
let move = false;
let selected_state_movefrom;

let player_params = {
	first_name: 'Дмитрий',
	last_name: 'Вансович'
	// first_name: null,
	// last_name: null
};

let player_tehs = [
{
	name: "tanks",
	activated: false
},{
	name: "weapons",
	activated: false
}];

socket.on('connect', function(data){
	// VK.init(function(){
	// 	VK.api('users.get', {fields: "photo_50"}, function(data){
	// 		player_params.first_name = data.response[0].first_name;
	// 		player_params.last_name = data.response[0].last_name;

	// 		$('#game').css('display','block');
	// 		$('#menu').css('display','none');
	// 		$('#startgame').css('display','none');
	// 		$('#serverlist').css('display','none');

	// 		socket.emit('data', {
	// 			command: 'CD003',
	// 			player_params: player_params 
	// 		});
	// 	});
	// },'5.80');

	$('#game').css('display','none');
	$('#menu').css('display','block');
	$('#startgame').css('display','none');
	$('#serverlist').css('display','none');

	socket.emit('data', {
		command: 'CD003',
		player_params: player_params 
	});

	// socket.emit('server-list', {
	// 	command: 'CS003',
	// 	id: 0,
	// 	password: 12345
	// });
});

socket.on('data', function(data){
	if(data.command == 'DC001'){
		this_player = data.user_socket;
	} else if(data.command == 'DC002'){
		if(data.key == game_key){
			if(player != data.player){
				socket.emit('data',{
					command: 'CD002',
					key: game_key,
					money: money,
					pointers: pointers,
					player: player
				})
			}
		}
	} else if(data.command == 'DC003'){
		if(data.key == game_key){
			if(data.player == player){
				$('#state_money').text(data.money);
				$('#state_pointers').text(data.pointers);
			}
		}
	} else if(data.command == 'DC004'){
		$('#servers_count').text(data.count);
		$('#server-list_count').text(data.count);
	}
});

socket.on('game', function(data){
	if(data.command == 'SG001' && !game_key){
		if(data.player1 != this_player && data.player2 != this_player) return;

		$('#game').css('display','block');
		$('#menu').css('display','none');
		$('#startgame').css('display','none');
		$('#serverlist').css('display','none');

		game_key = data.key;
		if(data.player1 == this_player){
			player = 1;
			
			let my_states;
			if(player == 1){ my_states = document.getElementsByClassName('model-green'); } else { my_states = document.getElementsByClassName('model-red'); }
			for(let i = 0; i < my_states.length; i++){
				my_states[i].style.opacity = '0.3';
			}

			my_states_arr = [{
				state: GLOBAL_MAP[8].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[2].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[12].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[5].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[9].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[14].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[71].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[58].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[59].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[67].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[61].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[74].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[60].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[66].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[62].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[68].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[64].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[78].id,
				army: 35,
				divName: '1-я группа армий',
				div: 1
			},{
				state: GLOBAL_MAP[73].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[69].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[70].id,
				army: 35,
				divName: '1-я группа армий',
				div: 1
			},{
				state: GLOBAL_MAP[63].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[7].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[1].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[4].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[6].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[72].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[0].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[65].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[94].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[79].id,
				army: 35,
				divName: '1-я группа армий',
				div: 1
			},{
				state: GLOBAL_MAP[95].id,
				army: 40,
				divName: '2-я группа армий',
				div: 2
			},{
				state: GLOBAL_MAP[81].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[88].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[11].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[80].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[3].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[13].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[15].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[10].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[43].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[47].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[49].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[42].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[50].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[56].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[37].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[92].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[90].id,
				army: 40,
				divName: '2-я группа армий',
				div: 2
			},{
				state: GLOBAL_MAP[93].id,
				army: 40,
				divName: '2-я группа армий',
				div: 2
			},{
				state: GLOBAL_MAP[84].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[100].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[51].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[52].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[45].id,
				army: 50,
				divName: '3-я группа армий',
				div: 3
			},{
				state: GLOBAL_MAP[53].id,
				army: 50,
				divName: '3-я группа армий',
				div: 3
			},{
				state: GLOBAL_MAP[48].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[40].id,
				army: 50,
				divName: '3-я группа армий',
				div: 3
			},{
				state: GLOBAL_MAP[41].id,
				army: 50,
				divName: '3-я группа армий',
				div: 3
			}];

			enemy_states_arr = [{
				state: GLOBAL_MAP[29].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[87].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[77].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[85].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[86].id,
				army: 120,
				divName: '1-й белорусский фронт',
				div: 1
			},{
				state: GLOBAL_MAP[83].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[22].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[20].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[35].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[17].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[26].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[18].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[30].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[28].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[33].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[21].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[36].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[19].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[16].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[24].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[76].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[91].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[96].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[89].id,
				army: 180,
				divName: '2-й белорусский фронт',
				div: 2
			},{
				state: GLOBAL_MAP[25].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[31].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[34].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[82].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[32].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[23].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[27].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[101].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[117].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[109].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[75].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[97].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[110].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[102].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[111].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[108].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[104].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[114].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[106].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[107].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[116].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[115].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[99].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[113].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[46].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[57].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[39].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[38].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[44].id,
				army: 200,
				divName: '3-й белорусский фронт',
				div: 3
			},{
				state: GLOBAL_MAP[55].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[98].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[112].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[105].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[54].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[103].id,
				army: 0,
				divName: null,
				div: null
			}];
		}

		if(data.player2 == this_player){
			player = 2;

			let my_states;
			if(player == 1){ my_states = document.getElementsByClassName('model-green'); } else { my_states = document.getElementsByClassName('model-red'); }
			for(let i = 0; i < my_states.length; i++){
				my_states[i].style.opacity = '0.3';
			}

			enemy_states_arr = [{
				state: GLOBAL_MAP[8].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[2].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[12].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[5].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[9].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[14].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[71].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[58].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[59].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[67].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[61].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[74].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[60].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[66].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[62].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[68].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[64].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[78].id,
				army: 35,
				divName: '1-я группа армий',
				div: 1
			},{
				state: GLOBAL_MAP[73].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[69].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[70].id,
				army: 35,
				divName: '1-я группа армий',
				div: 1
			},{
				state: GLOBAL_MAP[63].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[7].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[1].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[4].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[6].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[72].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[0].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[65].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[94].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[79].id,
				army: 35,
				divName: '1-я группа армий',
				div: 1
			},{
				state: GLOBAL_MAP[95].id,
				army: 40,
				divName: '2-я группа армий',
				div: 2
			},{
				state: GLOBAL_MAP[81].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[88].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[11].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[80].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[3].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[13].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[15].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[10].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[43].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[47].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[49].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[42].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[50].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[56].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[37].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[92].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[90].id,
				army: 40,
				divName: '2-я группа армий',
				div: 2
			},{
				state: GLOBAL_MAP[93].id,
				army: 40,
				divName: '2-я группа армий',
				div: 2
			},{
				state: GLOBAL_MAP[84].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[100].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[51].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[52].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[45].id,
				army: 50,
				divName: '3-я группа армий',
				div: 3
			},{
				state: GLOBAL_MAP[53].id,
				army: 50,
				divName: '3-я группа армий',
				div: 3
			},{
				state: GLOBAL_MAP[48].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[40].id,
				army: 50,
				divName: '3-я группа армий',
				div: 3
			},{
				state: GLOBAL_MAP[41].id,
				army: 50,
				divName: '3-я группа армий',
				div: 3
			}];

			my_states_arr = [{
				state: GLOBAL_MAP[29].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[87].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[77].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[85].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[86].id,
				army: 95,
				divName: '1-й белорусский фронт',
				div: 1
			},{
				state: GLOBAL_MAP[83].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[22].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[20].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[35].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[17].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[26].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[18].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[30].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[28].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[33].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[21].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[36].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[19].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[16].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[24].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[76].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[91].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[96].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[89].id,
				army: 130,
				divName: '2-й белорусский фронт',
				div: 2
			},{
				state: GLOBAL_MAP[25].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[31].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[34].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[82].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[32].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[23].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[27].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[101].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[117].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[109].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[75].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[97].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[110].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[102].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[111].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[108].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[104].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[114].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[106].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[107].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[116].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[115].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[99].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[113].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[46].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[57].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[39].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[38].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[44].id,
				army: 250,
				divName: '3-й белорусский фронт',
				div: 3
			},{
				state: GLOBAL_MAP[55].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[98].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[112].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[105].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[54].id,
				army: 0,
				divName: null,
				div: null
			},{
				state: GLOBAL_MAP[103].id,
				army: 0,
				divName: null,
				div: null
			}];
		}

		if(player == 1){
			$('#player_country').text('Рейх');
			player_country = 'Рейх';
			$('#player_country_flag').attr('src','assets/img/germany_reich.png');
		} else if(player == 2){
			$('#player_country').text('СССР');
			player_country = 'СССР';
			$('#player_country_flag').attr('src','assets/img/ussr.png');
		}

		updateStates();
	} else if(data.command == 'SG002'){
		if(game_key == data.key){
			$('body').css('display','none');
			alert('Ваш противник вышел из игры');
		}
	} else if(data.command == 'SG003'){
		if(game_key == data.key){
			if(data.byplayer != this_player){
				enemy_states_arr = data.newstates;
				my_states_arr = data.enemynewstates;
				updateStates();
			} else {
				my_states_arr = data.newstates;
				enemy_states_arr = data.enemynewstates;
				updateStates();
			}
		}
	} else if(data.command == 'SG004'){
		if(game_key == data.key){
			updateStates();
		}
	}
});

socket.on('chat', function(data){
	if(data.command == 'SC001'){
		if(game_key == data.key){
			let message;

			if(data.player == 2){
				message = '<div class="message"><label style="color:tomato;"><b>СССР</b></label>: '+data.message+'</div>';
			} else if(data.player == 1){
				message = '<div class="message"><label style="color:#6cb361;"><b>Рейх</b></label>: '+data.message+'</div>';
			}

			let html = document.getElementById('messages').innerHTML;
			html += message;
			document.getElementById('messages').innerHTML = html;

			var el = document.getElementsByClassName('chat-messages')[0];
			el.scrollTop = el.scrollHeight;
		}
	} else if(data.command == 'SC002'){
		if(game_key == data.key){
			// let message;

			// message = '<div class="message"><label style="color:#2d68b2;">[Игра]</label> '+data.message+'</div>';

			// let html = document.getElementById('messages').innerHTML;
			// html += message;
			// document.getElementById('messages').innerHTML = html;

			// var el = document.getElementsByClassName('chat-messages')[0];
			// el.scrollTop = el.scrollHeight;
		}
	}
});

let selected_state;

// document.getElementsByClassName('getArmy_range')[0].addEventListener('change', function(){
// 	document.getElementById('armyRange_text').innerHTML = document.getElementsByClassName('getArmy_range')[0].value+' (-20 очков)';
// });

// document.getElementsByClassName('deleteArmy_range')[0].addEventListener('change', function(){
// 	document.getElementById('armyRangeD_text').innerHTML = document.getElementsByClassName('deleteArmy_range')[0].value+' (0 очков)';
// });

document.getElementsByClassName('moveBlock_range')[0].addEventListener('input', function(){
	for(let i = 0; i < my_states_arr.length; i++){
		console.log('change');
		if(my_states_arr[i].state == selected_state_movefrom){
			document.getElementById('moveBlock_text').innerHTML = document.getElementsByClassName('moveBlock_range')[0].value+'Т';		
		}
	}
});

let selected_state_move = null;
function click(state){
	if(selected_state != state){
		if(move == false){
			let states = document.getElementsByTagName('polygon');
			for(let i = 0; i < states.length; i++){
				states[i].style.opacity = '0.3';
			}

			selected_state = state;

			document.getElementById(state+'-raion').style.opacity = '1';

			$('.bottom_menu').css('display','none');
			$('.getArmy').css('display','none');
			$('.deleteArmy').css('display','none');

			$('.right-panel').css('display','block');
			$('.right-panel .buttons').css('display','none');

			for(var i = 0; i < GLOBAL_MAP.length; i++){
				if(GLOBAL_MAP[i].id == state+"-raion"){
					$('#state_terr').text(GLOBAL_MAP[i].name);
					if(GLOBAL_MAP[i].region == 'brestskaia-voblasts') $('#state_terr_vobl').text('Брестская');
					if(GLOBAL_MAP[i].region == 'vitsebskaia-voblasts') $('#state_terr_vobl').text('Витебская');
					if(GLOBAL_MAP[i].region == 'homelskaia-voblasts') $('#state_terr_vobl').text('Гомельская');
					if(GLOBAL_MAP[i].region == 'hrodnenskaia-voblasts') $('#state_terr_vobl').text('Гродненская');
					if(GLOBAL_MAP[i].region == 'minskaia-voblasts') $('#state_terr_vobl').text('Минская');
					if(GLOBAL_MAP[i].region == 'mahiliouskaia-voblasts') $('#state_terr_vobl').text('Могилёвская');
				}
			}

			if(player_country == 'СССР'){
				$('#terr_player_country').text('Рейх');
				$('#terr_player_country_flag').attr('src','assets/img/germany_reich.png');

				let terrs_text = null;
				if(enemy_states_arr.length == 1) terrs_text = 'территория';
				if(enemy_states_arr.length >= 2 && enemy_states_arr <= 4) terrs_text = 'территория';
				if(enemy_states_arr.length == 4) terrs_text = 'территории';
				if(enemy_states_arr.length >= 5) terrs_text = 'территорий'; 
				document.getElementById('terr_state_name').innerHTML = enemy_states_arr.length+' '+terrs_text;	
			} else {
				$('#terr_player_country').text('СССР');
				$('#terr_player_country_flag').attr('src','assets/img/ussr.png');

				let terrs_text = null;
				if(enemy_states_arr.length == 1) terrs_text = 'территория';
				if(enemy_states_arr.length >= 2 && enemy_states_arr <= 4) terrs_text = 'территория';
				if(enemy_states_arr.length == 4) terrs_text = 'территории';
				if(enemy_states_arr.length >= 5) terrs_text = 'территорий'; 
				document.getElementById('terr_state_name').innerHTML = enemy_states_arr.length+' '+terrs_text;
			}

			if(player_country == 'Рейх'){
				$('#terr_owner').text('Территория СССР');
			} else {
				$('#terr_owner').text('Территория Рейха');
			}

			for(let i = 0; i < my_states_arr.length; i++){
				if(my_states_arr[i].state == state+'-raion'){
					$('#state_army').text(numberWithSpaces(my_states_arr[i].army+'Т'));
					if(my_states_arr[i].div){
						$('#right-panel-body').css('display','block');
						$('#state_army_name').text(my_states_arr[i].divName);
					} else {
						$('#right-panel-body').css('display','none');
					}
				}
			}

			for(let i = 0; i < enemy_states_arr.length; i++){
				if(enemy_states_arr[i].state == state+'-raion'){
					$('#state_army').text(numberWithSpaces(enemy_states_arr[i].army+'Т'));
					if(enemy_states_arr[i].div){
						$('#right-panel-body').css('display','block');
						$('#state_army_name').text(enemy_states_arr[i].divName);
					} else {
						$('#right-panel-body').css('display','none');
					}
				}
			}

			for(let i = 0; i < my_states_arr.length; i++){
				if(my_states_arr[i].state == state+'-raion'){
					$('.right-panel .buttons').css('display','flex');

					if(player_country == 'Рейх'){
						$('#terr_owner').text('Территория Рейха');
					} else {
						$('#terr_owner').text('Территория СССР');
					}

					if(player_country == 'СССР'){
						$('#terr_player_country').text('СССР');
						$('#terr_player_country_flag').attr('src','assets/img/ussr.png');

						let terrs_text = null;
						if(my_states_arr.length == 1) terrs_text = 'территория';
						if(my_states_arr.length >= 2 && enemy_states_arr <= 4) terrs_text = 'территория';
						if(my_states_arr.length == 4) terrs_text = 'территории';
						if(my_states_arr.length >= 5) terrs_text = 'территорий'; 
						document.getElementById('terr_state_name').innerHTML = my_states_arr.length+' '+terrs_text;
					} else {
						$('#terr_player_country').text('Рейх');
						$('#terr_player_country_flag').attr('src','assets/img/germany_reich.png');

						let terrs_text = null;
						if(my_states_arr.length == 1) terrs_text = 'территория';
						if(my_states_arr.length >= 2 && enemy_states_arr <= 4) terrs_text = 'территория';
						if(my_states_arr.length == 4) terrs_text = 'территории';
						if(my_states_arr.length >= 5) terrs_text = 'территорий'; 
						document.getElementById('terr_state_name').innerHTML = my_states_arr.length+' '+terrs_text;	
					}	
				}
			}
		} else if(!selected_state_move) {
			let states = document.getElementsByTagName('polygon');
			let thisstate = document.getElementById(selected_state_movefrom);	

			if(document.getElementById(state+'-raion').style.opacity != '0.7') return;

			$('.move').css('display','block');

			selected_state_move = state;

			if(document.getElementById(state+'-raion').style.opacity == '0.7'){
				document.getElementById(state+'-raion').style.opacity = '1';
			}

			for(let i = 0; i < states.length; i++){
				if(states[i].style.opacity != '1'){
					states[i].style.opacity = '0.3';
				}
			}

			//setBorder(state+'-raion',selected_state_movefrom);

			$('.bottom_menu').css('display','none');
			$('.getArmy').css('display','none');
			$('.deleteArmy').css('display','none');

			let this_army;

			for(let i = 0; i < my_states_arr.length; i++){
				if(my_states_arr[i].state == selected_state_movefrom){
					this_army = my_states_arr[i].army;
					updateMoveRange();
				}
			}
			function updateMoveRange(){
				document.getElementsByClassName('moveBlock_range')[0].min = "0";
				document.getElementsByClassName('moveBlock_range')[0].max = ""+this_army;
				document.getElementsByClassName('moveBlock_range')[0].value = ""+this_army/2;
				document.getElementById('moveBlock_text').innerHTML = document.getElementsByClassName('moveBlock_range')[0].value+'Т';
			}

			selected_state = null;
		}
	} else {
		move_cancel();
	}
}

function show_moveArmy() {
	$('.bottom_menu').css('display','none');
	$('.getArmy').css('display','none');
	$('.deleteArmy').css('display','none');

	for(var i = 0; i < my_states_arr.length; i++){
		if(my_states_arr[i].state == selected_state+'-raion'){
			move = true;
			selected_state_movefrom = selected_state+'-raion';

			getCollision(my_states_arr[i].state);
		}
	}
}

// function show_getArmy() {
// 	$('.bottom_menu').css('display','none');
// 	$('.getArmy').css('display','block');
// 	$('.deleteArmy').css('display','none');

// 	document.getElementsByClassName('getArmy_range')[0].min = "0";
// 	if(player_tehs[1].activated == false){
// 		document.getElementsByClassName('getArmy_range')[0].max = ""+money;
// 	} else if(player_tehs[1].activated == true){
// 		document.getElementsByClassName('getArmy_range')[0].max = ""+Math.round(money*1.5);
// 	}
// 	document.getElementsByClassName('getArmy_range')[0].value = ""+money/2;
// 	document.getElementById('armyRange_text').innerHTML = document.getElementsByClassName('getArmy_range')[0].value+' (-20 очков)';
// }

// function show_deleteArmy() {
// 	$('.bottom_menu').css('display','none');
// 	$('.deleteArmy').css('display','block');

// 	for(let i = 0; i < my_states_arr.length; i++){
// 		if(my_states_arr[i].state == selected_state){
// 			document.getElementsByClassName('deleteArmy_range')[0].min = "0";
// 			document.getElementsByClassName('deleteArmy_range')[0].max = ""+my_states_arr[i].army;
// 			document.getElementsByClassName('deleteArmy_range')[0].value = ""+my_states_arr[i].army/2;
// 			document.getElementById('armyRangeD_text').innerHTML = document.getElementsByClassName('deleteArmy_range')[0].value+' (0 очков)';
// 		}
// 	}
// }

function updateStates(){
	let states = document.getElementsByTagName('polygon');
	let enemyplayer;

	if(player == 1) { enemyplayer = 2; } else { enemyplayer = 1; }

	for(let i = 0; i < my_states_arr.length; i++){
		for(let s = 0; s < states.length; s++){
			if(states[s].id == my_states_arr[i].state){
				if(player == 1){
					states[s].setAttribute("class",'model-green');
				} else {
					states[s].setAttribute("class",'model-red');
				}

				if(!selected_state_move && !selected_state_movefrom && !selected_state)
				states[s].style.opacity = '1';
			}
		}
		$('#'+my_states_arr[i].state+'-army b').text(my_states_arr[i].army+'T');
	}

	for(let i = 0; i < enemy_states_arr.length; i++){
		for(let s = 0; s < states.length; s++){
			if(states[s].id == enemy_states_arr[i].state){
				if(player == 1){
					states[s].setAttribute("class",'model-red');
				} else {
					states[s].setAttribute("class",'model-green');
				}

				if(!selected_state_move && !selected_state_movefrom && !selected_state)
				states[s].style.opacity = '0.3';
			}
		}
		$('#'+enemy_states_arr[i].state+'-army b').text(enemy_states_arr[i].army+'Т');
	}

	let terrs_text = null;
	if(my_states_arr.length == 1) terrs_text = 'территория';
	if(my_states_arr.length >= 2 && enemy_states_arr <= 4) terrs_text = 'территория';
	if(my_states_arr.length == 4) terrs_text = 'территории';
	if(my_states_arr.length >= 5) terrs_text = 'территорий'; 
	document.getElementsByClassName('state_name')[0].innerHTML = my_states_arr.length+' '+terrs_text;

	updateArmy();
}

function newArmy(){
	if(!selected_state) return;

	for(let i = 0; i < my_states_arr.length; i++){
		if(my_states_arr[i].state == selected_state){
			let value;

			if(player_tehs[1].activated == false){
				value = document.getElementsByClassName('getArmy_range')[0].value;
			} else {
				let value1 = document.getElementsByClassName('getArmy_range')[0].value;
				value = ''+Math.round(value1/1.5);
			}

			money = money - value*1;
			pointers = pointers - 20;
			document.getElementById('gov_money').innerHTML = 'Казна: '+numberWithSpaces(money);
			document.getElementById('gov_pointers').innerHTML = 'Очки: '+numberWithSpaces(pointers);
			my_states_arr[i].army = my_states_arr[i].army*1 + value*1;

			socket.emit('game',{
				command: "GS001",
				key: game_key,
				newstates: my_states_arr,
				enemynewstates: enemy_states_arr,
				byplayer: this_player
			});

			move_cancel();
		}
	}
}

function deleteArmy(){
	if(!selected_state) return;

	for(let i = 0; i < my_states_arr.length; i++){
		if(my_states_arr[i].state == selected_state){
			let value = document.getElementsByClassName('deleteArmy_range')[0].value;

			money = money + value*1;
			document.getElementById('gov_money').innerHTML = 'Казна: '+numberWithSpaces(money);
			document.getElementById('gov_pointers').innerHTML = 'Очки: '+numberWithSpaces(pointers);
			my_states_arr[i].army = my_states_arr[i].army*1 - value*1;

			move_cancel();

			socket.emit('game',{
				command: "GS001",
				key: game_key,
				newstates: my_states_arr,
				enemynewstates: enemy_states_arr,
				byplayer: this_player
			});
		}
	}
}

function move_ok(){
	document.getElementById('border').innerHTML = ` `;

	let movefrom_army = document.getElementsByClassName('moveBlock_range')[0].value, moveto_army;
	let moveto_mystate = false;
	let movefrom_divName, movefrom_div;
	let big = false;

	for(var i = 0; i < my_states_arr.length; i++){
		if(my_states_arr[i].state == selected_state_movefrom){
			if(movefrom_army == document.getElementsByClassName('moveBlock_range')[0].max){
				movefrom_div = my_states_arr[i].div;
				movefrom_divName = my_states_arr[i].divName;

				my_states_arr[i].div = null;
				my_states_arr[i].divName = null;
			} else {
				movefrom_div = my_states_arr[i].div;
				movefrom_divName = my_states_arr[i].divName;
			}
		}
	}

	for(var i = 0; i < my_states_arr.length; i++){
		if(my_states_arr[i].state == selected_state_move+'-raion'){
			moveto_mystate = true;
			moveto_army = my_states_arr[i].army;
		}
	}

	if(moveto_mystate == false){
		for(var i = 0; i < enemy_states_arr.length; i++){
			if(enemy_states_arr[i].state == selected_state_move+'-raion'){
				moveto_army = enemy_states_arr[i].army;
			}
		}
	}

	if(movefrom_army > moveto_army)
		big = true;

	if(moveto_mystate == true){
		for(var i = 0; i < my_states_arr.length; i++){
			if(my_states_arr[i].state == selected_state_move+'-raion'){
				my_states_arr[i].army = my_states_arr[i].army*1 + movefrom_army*1;
				if(movefrom_div){
					my_states_arr[i].div = movefrom_div;
					my_states_arr[i].divName = movefrom_divName;
				}

				socket.emit('game',{
					command: "GS001",
					key: game_key,
					newstates: my_states_arr,
					enemynewstates: enemy_states_arr,
					byplayer: this_player
				});
			}
			if(my_states_arr[i].state == selected_state_movefrom){
				my_states_arr[i].army = my_states_arr[i].army*1 - movefrom_army*1;
				if(movefrom_div && movefrom_army == document.getElementsByClassName('moveBlock_range')[0].max){
					my_states_arr[i].div = null;
					my_states_arr[i].divName = null;
				}

				document.getElementsByClassName('moveBlock_range')[0].min = "0";
				document.getElementsByClassName('moveBlock_range')[0].max = ""+my_states_arr[i].army;
				document.getElementsByClassName('moveBlock_range')[0].value = ""+my_states_arr[i].army/2;
				document.getElementById('moveBlock_text').innerHTML = document.getElementsByClassName('moveBlock_range')[0].value+'T';

				socket.emit('game',{
					command: "GS001",
					key: game_key,
					newstates: my_states_arr,
					enemynewstates: enemy_states_arr,
					byplayer: this_player
				});
			}
		}
	} else if(moveto_mystate == false){
		for(var i = 0; i < my_states_arr.length; i++){
			if(my_states_arr[i].state == selected_state_movefrom){
				my_states_arr[i].army = my_states_arr[i].army*1 - movefrom_army*1;
				if(movefrom_div && big == true && movefrom_army == document.getElementsByClassName('moveBlock_range')[0].max){
					my_states_arr[i].div = null;
					my_states_arr[i].divName = null;
				}

				document.getElementsByClassName('moveBlock_range')[0].min = "0";
				document.getElementsByClassName('moveBlock_range')[0].max = ""+my_states_arr[i].army;
				document.getElementsByClassName('moveBlock_range')[0].value = ""+my_states_arr[i].army/2;
				document.getElementById('moveBlock_text').innerHTML = document.getElementsByClassName('moveBlock_range')[0].value+'T';

				socket.emit('game',{
					command: "GS001",
					key: game_key,
					newstates: my_states_arr,
					enemynewstates: enemy_states_arr,
					byplayer: this_player
				});
			}
		}
		for(var i = 0; i < enemy_states_arr.length; i++){
			if(enemy_states_arr[i].state == selected_state_move+'-raion'){
				if(enemy_states_arr[i].army < movefrom_army){
					movefrom_army = movefrom_army - enemy_states_arr[i].army;
					enemy_states_arr[i].army = movefrom_army;

					if(movefrom_div){
						enemy_states_arr[i].div = movefrom_div;
						enemy_states_arr[i].divName = movefrom_divName;
					}

					my_states_arr.push(enemy_states_arr[i]);
					enemy_states_arr.splice(i, 1);

					socket.emit('game',{
						command: "GS001",
						key: game_key,
						newstates: my_states_arr,
						enemynewstates: enemy_states_arr,
						byplayer: this_player
					});

					let states = document.getElementsByTagName('polygon');
					for(var x = 0; x < states.length; x++){
						if(states[x].id == selected_state_move+'-raion'){
							socket.emit('game', {
								command: "GS002",
								key: game_key,
								state: x
							});
							if(player == 1){
								states[x].setAttribute("class","model-green");
							} else {
								states[x].setAttribute("class","model-red");
							}
						}
					}

					move_cancel();
					selected_state_move = null;
				} else {
					enemy_states_arr[i].army = enemy_states_arr[i].army - movefrom_army;

					socket.emit('game',{
						command: "GS001",
						key: game_key,
						newstates: my_states_arr,
						enemynewstates: enemy_states_arr,
						byplayer: this_player
					});
				}
			}
		}
	}

	move_cancel();
}

function move_cancel(){
	$('.bottom_menu').css('display','none');
	$('.getArmy').css('display','none');
	$('.deleteArmy').css('display','none');
	$('.move').css('display','none');
	$('.right-panel').css('display','none');
	$('.right-panel .buttons').css('display','none');

	let states = document.getElementsByTagName('polygon');

	for(let i = 0; i < states.length; i++){
		states[i].style.opacity = '0.3';
	}

	let my_states;
	if(player == 1){ my_states = document.getElementsByClassName('model-green'); } else { my_states = document.getElementsByClassName('model-red'); }
	for(let i = 0; i < my_states.length; i++){
		my_states[i].style.opacity = '1';
	}

	move = false;
	selected_state = null;
	selected_state_move = null;
	selected_state_movefrom = null;

	document.getElementById('border').innerHTML = '';
}

let chat = false;
function chat_button() {
	if(chat == false){
		$('.chat').css('bottom','0');
		$('.chat-global').css('display','inline-block');
		$('.chat-game').css('display','inline-block');
		$('#chat-button-img').attr('src','assets/img/arrow-down.png');
		$('.chat-button').css('background-color','#222');

		chat = true;
	} else if(chat == true){
		$('.chat-global').css('display','none');
		$('.chat-game').css('display','none');
		$('.chat').css('bottom','-200px');
		$('#chat-button-img').attr('src','assets/img/arrow-up.png');
		$('.chat-button').css('background-color','#222');

		chat = false;
	}
}

function sendMessage() {
	var message_text = $('.chat-input').val();

	if(message_text == ' ') return;
	if(message_text == '') return;
	if(!game_key) return;
	if(!player) return;

	if(message_text == '/server_stats') {
		socket.emit('stats', {
			game_key: game_key
		});
	} else if(message_text){
		socket.emit('chat',{
			command: "CC001",
			key: game_key,
			message: message_text,
			player: player,
			player_name: player_params.first_name
		});
	}

	$('.chat-input').val('');
}

$('#chat-input').on('keydown', function(e) {
    var that = this;

    if (e.keyCode == 13) { sendMessage(); }

    setTimeout(function() {
        var res = /[^а-яА-Яa-zA-Z!?: 1-9,.ёЁ<>=+-;()0_]/g.exec(that.value);
        that.value = that.value.replace(res, '');
    }, 0);
});

function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function changeColor(type){
	let states = document.getElementsByTagName('a');

	if(type == 'peace'){
		for(var x = 0; x < states.length; x++){
			$('#'+states[x].id+' .shape').css('fill','#6cb361');
		}
	} else if(type == 'war'){
		for(let i = 0; i < my_states_arr.length; i++){
			for(let s = 0; s < states.length; s++){
				if(states[s].id == 'state_'+my_states_arr[i].state.toLowerCase()){
					$('#'+states[s].id+' .shape').css('fill','#6cb361');
				}
			}
		}

		for(let i = 0; i < enemy_states_arr.length; i++){
			for(let s = 0; s < states.length; s++){
				if(states[s].id == 'state_'+enemy_states_arr[i].state.toLowerCase()){
					$('#'+states[s].id+' .shape').css('fill','tomato');
				}
			}
		}
	} else if(type == 'notype'){
		for(var x = 0; x < states.length; x++){
			$('#'+states[x].id+' .shape').css('fill','#518ad1');
		}
	}
}

//changeColor('notype');

// let up = false,
// 	right = false,
// 	down = false,
// 	left = false,
// 	x = window.innerWidth/2-20,
// 	y = window.innerHeight/2-210;

// document.addEventListener('keydown',press)
// function press(e){
// 	if (e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */ || e.keyCode === 90 /* z */){
// 		down = true;
// 	}
// 	if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */){
// 		left = true;
// 	}
// 	if (e.keyCode === 40 /* down */ || e.keyCode === 83 /* s */){
// 		up = true;
// 	}
// 	if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */ || e.keyCode === 81 /* q */){
// 		right = true;
// 	}
// }

// document.addEventListener('keyup',release)
// function release(e){
// 	if (e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */ || e.keyCode === 90 /* z */){
// 		down = false;
// 	}
// 	if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */){
// 		left = false;
// 	}
// 	if (e.keyCode === 40 /* down */ || e.keyCode === 83 /* s */){
// 		up = false;
// 	}
// 	if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */ || e.keyCode === 81 /* q */){
// 		right = false;
// 	}
// }

// function gameLoop(){
// 	var div = document.getElementById('map');
// 	if (up){
// 		y = y - 10;
// 	}
// 	if (right){
// 		x = x + 10;
// 	}
// 	if (down){
// 		y = y + 10;
// 	}
// 	if (left){
// 		x = x - 10;
// 	}

// 	div.style.left = x+'px'
// 	div.style.top = y+'px'
// 	window.requestAnimationFrame(gameLoop);
// }
// window.requestAnimationFrame(gameLoop);

// var antiCheatSystem_lastMoney = money;
// var antiCheatSystem_lastPointers = pointers;
// var antiCheatSystem_lastBalanceUpdate = 5;
// function antiCheatSystem(){
// 	if(money > antiCheatSystem_lastMoney+58){
// 		socket.emit('anticheat', {
// 			command: 'CA001',
// 			user: player_params,
// 			key: game_key,
// 			type: 1,
// 			last_money: antiCheatSystem_lastMoney,
// 			money: money
// 		});
// 	}

// 	if(pointers > antiCheatSystem_lastPointers+50){
// 		socket.emit('anticheat', {
// 			command: 'CA001',
// 			user: player_params,
// 			key: game_key,
// 			type: 2,
// 			last_pointers: antiCheatSystem_lastPointers,
// 			pointers: pointers
// 		});
// 	}

// 	antiCheatSystem_lastMoney = money;
// 	antiCheatSystem_lastPointers = pointers;
// }
// setInterval(antiCheatSystem, 3000);

function windows_open(w){
	if(w == 1){
		$('#tehs-window').css('display','block');
	}
}

function windows_close(w){
	if(w == 1){
		$('#tehs-window').css('display','none');
	}
}

function tehs_buy(item){
	if(item == 2){
		if(pointers < 1000) return;
		if(player_tehs[item-1].activated == true) return;

		pointers = pointers-1000;
		document.getElementById('gov_pointers').innerHTML = 'Очки: '+numberWithSpaces(pointers);
	
		player_tehs[item-1].activated = true;

		document.getElementById('teh-item-'+item).className = 'teh-item-active';
	}
}

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

// let randomY = randomInteger(1,200);
// 	randomY1 = randomInteger(-450,-100);

// document.getElementById('clouds').innerHTML = `
// 	<div class="cloud" style="top:`+randomY+`px;">
// 		<img src="assets/img/cloud_2.png">
// 	</div>
// 	<div class="cloud1" style="top:`+randomY1+`px;">
// 		<img src="assets/img/cloud_2.png">
// 	</div>`;

// setInterval(function(){
// 	let randomY = randomInteger(1,200);
// 		randomY1 = randomInteger(-450,-100);

// 	document.getElementById('clouds').innerHTML = `
// 		<div class="cloud" style="top:`+randomY+`px;">
// 			<img src="assets/img/cloud_2.png">
// 		</div>
// 		<div class="cloud1" style="top:`+randomY1+`px;">
// 			<img src="assets/img/cloud_2.png">
// 		</div>`;
// }, 120000);

function createserver(){
	document.getElementById('createserverbutton').innerHTML = '<b class="text-primary" style="font-size:26px;">Ожидание игрока</b>';

	socket.emit('data', {
		command: 'CD004'
	});
}

function to_createserver(){
	$('#game').css('display','none');
	$('#menu').css('display','none');
	$('#startgame').css('display','block');
	$('#serverlist').css('display','none');
}

function to_serverlist(){
	$('#game').css('display','none');
	$('#menu').css('display','none');
	$('#startgame').css('display','none');
	$('#serverlist').css('display','block');

	socket.emit('server-list', {
		command: 'CS002'
	});
}

function to_menu(){
	$('#game').css('display','none');
	$('#menu').css('display','block');
	$('#startgame').css('display','none');
	$('#serverlist').css('display','none');
}

function randomserver(){
	socket.emit('data', {
		command: 'CD005'
	});
}

function serverlist_connect(id){
	socket.emit('server-list', {
		command: 'CS001',
		id: id
	});
}

function serverlist_connect_closed(id){
	let password = prompt('Пожалуйста, введите пароль от закрытого сервера');

	socket.emit('server-list', {
		command: 'CS003',
		id: id,
		password: password
	});
}

socket.on('error', function(data){
	if(data.command == 'E001'){
		if(player_params.first_name+' '+player_params.last_name == data.user){
			alert(data.text);
		}
	}
});

socket.on('server-list', function(data){
	if(data.command == 'SC001' && data.games.length){
		var serverlist_div = document.getElementById('server-list');
		var html = '';
		var games = data.games;

		for(var i = 0; i < games.length; i++){
			if(games[i].closed == false){
				if(data.games[i].players == 1){
					html = html +  `<div class="block">
										<div class="block-header clearfix">
											`+data.games[i].creator.first_name+` `+data.games[i].creator.last_name+`
											<div class="block-button float-right" onclick="serverlist_connect(`+i+`);"><i class="fas fa-play"></i></div>
										</div>
										<div class="block-body">
											<p>Статус: <b class="text-success">открыт</b></p>
											<p>Сложность: <b class="text-success">лёгкая</b></p>
											<p>Игроков: <b class="text-primary">1/2</b></p>
											<p>Пароль: <b class="text-success">нету</b></p>
										</div>
									</div>`;
				} else {
					html = html +  `<div class="block">
										<div class="block-header clearfix">
											`+data.games[i].creator.first_name+` `+data.games[i].creator.last_name+`
										</div>
										<div class="block-body">
											<p>Статус: <b class="text-danger">закрыт</b></p>
											<p>Сложность: <b class="text-success">лёгкая</b></p>
											<p>Игроков: <b class="text-primary">2/2</b></p>
											<p>Пароль: <b class="text-success">нету</b></p>
										</div>
									</div>`;
				}
			} else {
				if(data.games[i].players == 1){
					html = html +  `<div class="block">
										<div class="block-header clearfix">
											`+data.games[i].creator.first_name+` `+data.games[i].creator.last_name+`
											<div class="block-button float-right" onclick="serverlist_connect_closed(`+i+`);"><i class="fas fa-play"></i></div>
										</div>
										<div class="block-body">
											<p>Статус: <b class="text-success">открыт</b></p>
											<p>Сложность: <b class="text-danger">невозможная</b></p>
											<p>Игроков: <b class="text-primary">1/2</b></p>
											<p>Пароль: <b class="text-danger">есть</b></p>
										</div>
									</div>`;
				} else {
					html = html +  `<div class="block">
										<div class="block-header clearfix">
											`+data.games[i].creator.first_name+` `+data.games[i].creator.last_name+`
										</div>
										<div class="block-body">
											<p>Статус: <b class="text-danger">закрыт</b></p>
											<p>Сложность: <b class="text-danger">невозможная</b></p>
											<p>Игроков: <b class="text-primary">2/2</b></p>
											<p>Пароль: <b class="text-danger">есть</b></p>
										</div>
									</div>`;
				}
			}
		}

		serverlist_div.innerHTML = html;
	}
});

updateArmy();

function updateArmy(){
	let states = document.getElementsByTagName('polygon');
	var my_src, enemy_src;

	if(player == 1){ 
		my_src = 'assets/img/germany_reich.png';
		enemy_src = 'assets/img/ussr.png'; 
	} else { 
		my_src = 'assets/img/ussr.png';
		enemy_src = 'assets/img/germany_reich.png'; 
	}

	for(var i = 0; i < my_states_arr.length; i++){
		$('#'+my_states_arr[i].state+'-army').children('b').text(my_states_arr[i].army+'T');
		$('#'+my_states_arr[i].state+'-army').children('img').attr('src', my_src);
	}

	for(var i = 0; i < enemy_states_arr.length; i++){
		$('#'+enemy_states_arr[i].state+'-army').children('b').text(enemy_states_arr[i].army+'T');
		$('#'+enemy_states_arr[i].state+'-army').children('img').attr('src', enemy_src);
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

let polygons = [];

for(var i = 0; i < GLOBAL_MAP.length; i++){
	let polygon = document.getElementById(GLOBAL_MAP[i].id).points;

	polygons.push({polygon: polygon, id: GLOBAL_MAP[i].id});
}

// let document_polygons = document.getElementsByTagName('polygon');
// for(var i = 0; i < document_polygons.length; i++){
// 	document_polygons[i].style.opacity = '0.3';
// }

function getCollision(element){
	for(var i = 0; i < polygons.length; i++){
		let this_points = document.getElementById(element).points;

		for(var h = 0; h < polygons[i].polygon.length; h++){
			for(var l = 0; l < this_points.length; l++){
				if(polygons[i].polygon[h].x == this_points[l].x && polygons[i].polygon[h].y == this_points[l].y){
					document.getElementById(polygons[i].id).style.opacity = '0.7';
				}
			}
		}

		document.getElementById(element).style.opacity = '1';
	}
}

function getCenterSVG(id){
	let polygon = document.getElementById(id);
	var coords = polygon.getAttribute('points');

	if (!coords) {
		return;
	}

	var coordsArray = coords.split(' '),
		center = [];

	// For rect and poly areas we need to loop through the coordinates
	var coord,
		minX = maxX = parseInt(coordsArray[0], 10),
		minY = maxY = parseInt(coordsArray[1], 10);
	for (var i = 0, l = coordsArray.length; i < l; i++) {
		coord = parseInt(coordsArray[i], 10);
		if (i%2 == 0) { // Even values are X coordinates
			if (coord < minX) {
				minX = coord;
			} else if (coord > maxX) {
				maxX = coord;
			}
		} else { // Odd values are Y coordinates
			if (coord < minY) {
				minY = coord;
			} else if (coord > maxY) {
				maxY = coord;
			}
		}
	}
	center = [parseInt((minX + maxX) / 2, 10), parseInt((minY + maxY) / 2, 10)];

	return(center);
}

function setBorder(svg1,svg2){
	let polygon1 = document.getElementById(svg1).points;
	let polygon2 = document.getElementById(svg2).points;

	if (!polygon1 || !polygon2)
		return;

	var f, s, i;
	var _polyline = [];

	for(f = 0; f < polygon1.length; f++){
		for(s = 0; s < polygon2.length; s++){
			if(polygon1[f].x == polygon2[s].x && polygon1[f].y == polygon2[s].y){
				console.log('[x] '+polygon1[f].x+' [y] '+polygon1[f].y);
				_polyline.push({x: polygon1[f].x, y: polygon1[f].y});
			}
		}
	}

	var points = '';

	for(i = 0; i < _polyline.length; i++){
		points = points + ', '+ _polyline[i].x + ' ' + _polyline[i].y;
	}

	points = points.substr(1);
	points = points.substr(1);

	document.getElementById('border').innerHTML = `<polyline fill="none" style="stroke-width:3;stroke:#28a745;" points="`+points+`"></polyline>`;
}

var audio;
$("div").mousedown(function() {
	audio = document.getElementsByTagName("audio")[0];
	audio.volume = '0.1';
	audio.play();
});

function setRandomArmy(army){
	let states = document.getElementsByTagName('polygon');
	var my_src, enemy_src;

	if(player == 1){ 
		my_src = 'assets/img/germany_reich.png';
		enemy_src = 'assets/img/ussr.png'; 
	} else { 
		my_src = 'assets/img/ussr.png';
		enemy_src = 'assets/img/germany_reich.png'; 
	}

	for(var i = 0; i < my_states_arr.length; i++){
		if(my_states_arr[i].army == 0){
			my_states_arr[i].army = army;
			my_states_arr[i].divName = 'Добровольцы';
			my_states_arr[i].div = 4;


			socket.emit('game',{
				command: "GS001",
				key: game_key,
				newstates: my_states_arr,
				enemynewstates: enemy_states_arr,
				byplayer: this_player
			});

			return true;
		}
	}
}

function setTimer(timer_time){
	$('.blocker').css('display','block');

	var start_time = timer_time;
	var time = updateTimer(timer_time);

	$('#timer-time').text(time.min+':'+time.sec);
	$('#timer-army').text(start_time+'T');

	move_cancel();

	var timer = setInterval(function(){
		var time = updateTimer(timer_time);
		timer_time = time.time - 1;

		if(timer_time > -1){
			$('#timer-time').text(time.min+':'+time.sec);
		} else {
			$('#timer-time').text(time.min+':'+time.sec);
			clearInterval(timer);

			setTimeout(function(){
				$('.blocker').css('display','none');
				setRandomArmy(start_time);
			}, 1000);
		}

	}, 1000);
}

function updateTimer(seconds){
	var _sec = seconds;
	var _min = 0;

	while(_sec >= 60){
		_min = _min + 1;
		_sec = _sec - 60;
	}

	if(_sec < 10)
		_sec = '0'+_sec

	if(_min < 10)
		_min = '0'+_min

	return {
		sec: _sec,
		min: _min,
		time: seconds
	}
}

function popup(action){
	if(action == 'open'){
		$('.popup').css('display','block');
	} else if(action == 'close'){
		$('.popup').css('display','none');
	} else if(action == 'next'){
		popup('close');
		setTimer(my_states_arr.length);
	}
}