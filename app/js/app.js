
/*************************************************
    			START NEW GAME
*************************************************/

$('.play').click((event)=>{
	// LOADING BOARD
	$('.wrapper').load('board.html');

	// FETCHING DATA
	$.ajax({
	type: "GET",   
    url: "pictures.json",
    dataType : 'json',
    success: function(data) {

    	// SET AND START TIMER

		let minutes = document.querySelector('.minutes');
		let seconds = document.querySelector('.seconds');

		let start_point = 180000; 
		let id_timer = 0;

		const set_timer = (date) => {
			minutes.textContent = Math.floor((start_point / 60000)) + 'm';
			seconds.textContent = Math.floor((start_point % 60000)/1000) + 's';
		};

		const start_timer = () => {
			id_timer = setInterval(function(){
				if(start_point<1000){
					stop_timer();
					stop_game();

					// DISPLAYING FINAL SCORES (MODAL)

					const $scores_modal = $('.submit-scores');
					let player_info = document.querySelector('.player-info');
					$scores_modal.addClass('modal-show');
					if(scores > 0){
						player_info.innerHTML = `Congratulations! You achieved ${scores} points. Would you like to submit your score?`;
						$('.submit-scores .yes').click((event)=>{
							event.preventDefault();
							$('.send-score').css({'display':'block'});
							$('.submit-scores input[type="submit"]').click(()=>{
								$('.submit-scores').addClass('modal-hide');
								window.location.href ='index.html';
							});
						});
					} else {
						player_info.innerHTML = `You achieved ${scores} points. Would you like to try again?`;

						$('.submit-scores .yes').click((event)=>{
							event.preventDefault();
							window.location.href ='index.html';
						});
					};

					$('.submit-scores .no').click((event)=>{
						event.preventDefault();
						$scores_modal.removeClass('modal-show');
						$scores_modal.addClass('modal-hide');
						window.location.href ='index.html';
					});
				} else {
					start_point = start_point - 1000;
					set_timer(start_point);
				};	
			},1000);
		};

		start_timer();
	
		function stop_timer () {
			clearInterval(id_timer);
		};


		// DRAWING RANDOM PICTURE

    	let pictures = [];
    	for(let i=0;i<data.pictures.length;i++){
    		pictures.push(data.pictures[i].name);	
    	}
    	let index = 0;
    	let el;
    	const scores_place = document.querySelector('.scores');
    	let scores = 0;

    		// PICKING RANDOM ICON

			el = Math.floor(Math.random()*pictures.length);
			let picture_choosed = pictures[el];

			// ADDING THIS ICON TO CTX

			for(let x=0;x<data.pictures.length;x++){
				if(data.pictures[x].name == picture_choosed){
					document.querySelector('.pict').innerHTML = data.pictures[x].code;
					pictures.splice(el,1);
				};
			};

			// DRAWING ICON

			let paths = document.querySelectorAll('path');
			let paths_length = paths.length;
			let current_path;
			let draw_line = () => {
				paths = document.querySelectorAll('path[data="unused"]');
				if(paths.length == 0){
					stop_game();
				} else {
					current_path = paths[Math.floor(Math.random()*paths.length)];
					current_path.classList.add('animate');
					current_path.setAttribute('data','used');
				};
			};
			draw_line();
	
			let idinterval = window.setInterval(draw_line,3000);

			let stop_game = () => {
				clearInterval(idinterval);
			};	

			// GOING TO NEXT PICTURE AFTER CORRECT ANSWEAR

			const answear_btn = document.querySelector('.answear>button');
			const input = document.querySelector('.answear>input');
			const answear_ctx = document.querySelector('.answear');
			let star = document.querySelector('.flaticon-favorites');
			answear_btn.addEventListener('click', (event)=>{
				event.preventDefault();
				if(input.value.toLowerCase() == picture_choosed){
					
					// ADDING POINT
					
					scores++;
					star.classList.add('star_animate');
					window.setTimeout(()=>{star.classList.remove('star_animate')},3000);
					scores_place.innerText = scores;
					
					// FEEDBACK

					answear_ctx.classList.add('correct');
					window.setTimeout(()=>{answear_ctx.classList.remove('correct')},2000); 
					
					// CLEARING INPUT 
					
					stop_game();
					input.value = "";
					document.querySelector('.pict').innerHTML = "";
					
					// PICKING NEW PICTURE

					el = Math.floor(Math.random()*pictures.length);
					picture_choosed = pictures[el];
					
					//dodaje obrazek do kodu html i zapobiega ponownemu wylosowaniu
					for(let x=0;x<data.pictures.length;x++){
						if(data.pictures[x].name == picture_choosed){
						document.querySelector('.pict').innerHTML = data.pictures[x].code;
							pictures.splice(el,1);
						};
					};

					// DRAWING
					draw_line();
					idinterval = window.setInterval(draw_line,3000);
				} else {

					// FEEDBACK

					answear_ctx.classList.add('wrong');
					window.setTimeout(()=>{
						answear_ctx.classList.remove('wrong')},2000);
					input.value = ""; 
				};
			});

			// GOING TO NEXT PICTURE WITHOUT GUESSING

			const next_btn = document.querySelector('.next');
			next_btn.addEventListener('click', (event)=>{

					// CLEARING INPUT, RESET CTX
					stop_game();
					input.value = "";
					document.querySelector('.pict').innerHTML = "";
					// PICKING NEW RANDOM PICTURE
					el = Math.floor(Math.random()*pictures.length);
					picture_choosed = pictures[el];
					// ADDING THIS PICTURE TO HTML CTX
					for(let x=0;x<data.pictures.length;x++){
						if(data.pictures[x].name == picture_choosed){
						document.querySelector('.pict').innerHTML = data.pictures[x].code;
						pictures.splice(el,1);
						};
					};
					current_path = "";
					draw_line();
					idinterval = window.setInterval(draw_line,3000);
			});

			// GOING BACK TO MAIN MENU

			const $modal = $('.modal');

			$('.flaticon-list').click(()=>{
				$modal.removeClass('modal-hide');
				$modal.addClass('modal-show');
				$('.modal .no').click(()=>{
					$modal.removeClass('modal-show');
					$modal.addClass('modal-hide');
				});
				$('.modal .yes').click(()=>{
					window.location.href ='index.html';
				});
			});
		}, //end of success
    	error: function() {
        	console.log("Wystąpił błąd");
    	} 
	}); //end of ajax

}); //end of ajax-loading board	


/*************************************************
				RULES
*************************************************/

// LOADING PAGE WITH RULES

$('.rules').click((event)=>{
	$('.wrapper').load('rules.html');

	//GOING BACK BACK TO MAIN MENU

	window.setTimeout(
		()=>{
			$('.previous-page').click((event)=>{
			event.preventDefault();
			window.location.href ='index.html';	
			});
		},
	500);

	// SLIDER

	window.setTimeout(
		()=>{
			const $slider = $('.slider');
			const $slides = $('.slide');
			const $buttons = $('.slider-nav div');
			let current_index = 0;
			let timeout;

		function move(new_index) {
			advance();
	
			$buttons.eq(current_index).removeClass('show-button');
			$buttons.eq(new_index).addClass('show-button');

			if(current_index === new_index){
				return;
			}
			else {
				$slides.eq(current_index).fadeOut();
				$slides.eq(new_index).fadeIn();
			}
	
			current_index = new_index;
		};

		function advance() {
			clearTimeout(timeout);
			timeout = setTimeout(function(){
				if(current_index<($slides.length-1)){
					move(current_index+1);
				} else {
					move(0)
				}
			}, 5000);
		}

		$.each($buttons, function(index){
			if(index==current_index){
				$buttons.eq(index).addClass('show-button');
			}
			$(this).on('click', function(){
				move(index);
			});
		});	

		advance(); 
	}, 500); // end of set timeout function with slider
			
}); //end of load function with rules
	