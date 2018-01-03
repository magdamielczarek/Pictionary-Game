//const pictures = [];

// NAWIGACJA Z MENU

$('.play').click((event)=>{
	$('.wrapper').load('board.html');
});

setTimeout(function(){
	$.ajax({
    type: "GET",   
    url: "pictures.json",
    dataType : 'json',
    success: function(data) {
    	let pictures = [];
    	for(let i=0;i<data.pictures.length;i++){
    		pictures.push(data.pictures[i].name);	
    	}
    	let el;
    	for(let index=pictures.length;pictures.length>0;index--){
    		/////////////////////losuje obrazek
			el = Math.floor(Math.random()*pictures.length)
			if (pictures[el] == ""){el = Math.floor(Math.random()*pictures.length)} ;
			console.log(el);
			/////////////////////dodaje obrazek do kodu html
			document.querySelector('.pict').innerHTML = data.pictures[el].code;
			pictures[el]="";
			
			//console.log(pictures);

			////////////////////blok, ktory losuje sciezke z danego obrazka
			let paths = document.querySelectorAll('path');
			let paths_length = paths.length;
			let current_path;
			let draw_line = () => {
				paths = document.querySelectorAll('path[data="unused"]');
				if(paths.length == 0){
					stop_game();
					input.value = "";
					document.querySelector('.pict').innerHTML = "";
					el = Math.floor(Math.random()*data.pictures.length);
					document.querySelector('.pict').innerHTML = data.pictures[el].code;
					let idinterval = window.setInterval(draw_line,3000);
				} else {
					current_path = paths[Math.floor(Math.random()*paths.length)];
					current_path.setAttribute('fill','#383838');
					current_path.setAttribute('data','used');
				};
			};
		
			let idinterval = window.setInterval(draw_line,4000);

			let stop_game = () => {
				clearInterval(idinterval);
			};	

			// przejdz do nastepnego, jesli zgadnie
			const answear_btn = document.querySelector('.answear>button');
			const input = document.querySelector('.answear>input');
			answear_btn.addEventListener('click', (event)=>{
				if(input.value == data.pictures[el].name){
					event.preventDefault();
					//dodaj punkt  - scores++
					stop_game();
					input.value = "";
					document.querySelector('.pict').innerHTML = "";
					el = Math.floor(Math.random()*data.pictures.length);
					document.querySelector('.pict').innerHTML = data.pictures[el].code;
					let idinterval = window.setInterval(draw_line,3000);
				}
			});
    	};
	},
    error: function() {
        console.log("Wystąpił błąd");
    	} //
	}); //enf of ajax
},4000);


		/*-------------------------*
	 			TIMER
		---------------------------*/

		/*let days = document.querySelector('.days');
		let hours = document.querySelector('.hours');
		let minutes = document.querySelector('.minutes');
		let seconds = document.querySelector('.seconds');

		let current_date = new Date();
		const final_date =  new Date(2017,11,28,17,30,0);
		let start_point = (final_date - current_date)/1000; //difference in seconds

		let id_timer = 0;

		const set_timer = (date) => {
			days.textContent = Math.floor(start_point/86400) + 'd';
			hours.textContent = Math.floor((start_point % 86400) / 3600) + 'h';
			minutes.textContent = Math.floor((start_point % 3600) / 60) + 'm';
			seconds.textContent = Math.floor(start_point % 60) + 's';
		};


		(function start_timer () {
			id_timer = setInterval(function(){
				start_point = start_point - 1;
				set_timer(start_point);
		},1000);
		
		if(start_point<1){
			stop_timer();
		};
	})();

	
	function stop_timer () {
		clearInterval(id_timer);
	};*/

	
    	

// URUCHOMIENIE GRY


//

//if(paths.length>0){
//	paths["bulb.svg"]
//}



// ODLICZANIE

// LICZNIK POZOSTAŁEGO CZASU

// DODAWANIE PUNKTÓW

// RYSOWANIE OBRAZKA