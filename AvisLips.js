;(function($){

	$.fn.avisLips = function(){

		/*
			METHODS CONTROLLERS	CLASSES
			Insert a div with the following classes into an al-item to create controls
			-------------------------------------------------------------------------
			playButton
			loop
			timeline
			volume
			mute

		*/

		var elements = [
				'duration',
				'currentTime',
				'currentSrc',
				'timeline',
				'volume',
				'mute'
			]

		var wrapper = $(this);

		$(wrapper).on('click','.al-item .playButton',function(e){
			var alItem = $(e.currentTarget).closest('.al-item'),
				audio = alItem.find('audio')[0],
				loop = alItem.find('.loop');



			if(audio.paused){

				$('audio').each((i,el) => {
					el.pause()
				})

				audio.play();
			}else audio.pause();
		})

		$(wrapper).on('click','.al-item .loop',function(e){
			var alItem = $(e.currentTarget).closest('.al-item'),
				audio = alItem.find('audio')[0],
				loop = alItem.find('.loop');

				if(audio.loop){
					loop.removeClass('active');
					audio.loop = false;
				}else {
					loop.addClass('active');
					audio.loop = true;
				}
		})

		$(wrapper).on('click','.al-item .mute',function(e){
			var alItem = $(e.currentTarget).closest('.al-item'),
				audio = alItem.find('audio')[0],
				mute = alItem.find('.mute');

				if(audio.muted){
					mute.removeClass('active');
					audio.muted = false;
				}else {
					mute.addClass('active');
					audio.muted = true;
				}
		})

		$(wrapper).on('mousedown','.al-item .current',function(e){
			var value = e.offsetX / $(this).width();
			if(value > 0.99){
				value = 1;
			}else if(value < 0.01){
				value = 0;
			}

			this.value = value;

			var alItem = $(this).closest('.al-item'),
				audio = alItem.find('audio')[0];

			if($(this).parent().hasClass('timeline')){
				audio.currentTime = audio.duration * value;
			}else if($(this).parent().hasClass('volume')){
				audio.volume = value;
			}
		})

		$(wrapper)
		.children('.al-item')
		.each((i,el) => {
			var alItem = $(el),
				audio = alItem.find('audio')[0],
				playButton = alItem.find('.playButton'),
				timeline = alItem.find('.timeline'),
				currentTime = alItem.find('.currentTime');


			$.each(elements,
				(i,el) => {
					var element = alItem.find('.'+el);

					if(element.length > 0){

						if(element.hasClass('duration')){
							element.html(audio.duration)
						}

						if(element.hasClass('currentTime')){
							element.html(audio.currentTime)
						}

						if(element.hasClass('currentSrc')){
							element.html(audio.currentSrc)
						}

						if(element.hasClass('timeline')){
							element.html('<progress value="0" max="1" class="current"></progress>')
						}

						if(element.hasClass('volume')){
							element.html('<progress value="0.5" max="1" class="current"></progress>')
						}

					}
				}
			)

			var timelineCurrent = timeline.find('.current');

			if(playButton.length > 0){
			
				audio.onpause = function(){
					playButton.removeClass('pause');
					playButton.removeClass('active');
					playButton.addClass('play');
				}

				audio.onplay = function(){
					playButton.removeClass('play');
					playButton.addClass('active');
					playButton.addClass('pause');
				}

			}

			audio.ontimeupdate = function(){
				if(currentTime.length > 0){
					currentTime.html(audio.currentTime)
				}

				if (timeline.length > 0) {
					timelineCurrent.attr('value',audio.currentTime/audio.duration)
				}
			}

			if (timeline.length > 0) {

				audio.onended = function(){
					setTimeout(function(){
						timelineCurrent.attr('value',0)
					},500);
				}

			}

			
			
		})

	}

})(jQuery);
