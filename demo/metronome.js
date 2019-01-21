/* Web-based metronome.
 * Uses Javascript and CSS / HTML, not Flash, to create an adjustable metronome.
 *
 */

var Metronome = Metronome || {};

Metronome = function (element) {
	var self = this;

	this.running = false;
	//Default config options go in here
	this.config = {
		tempo : 150,
		clickSound : 'beep.mp3'
	};



	this.bpmToMs = function (tempo) {
		var ms;
		if (parseInt(tempo, 10) >= 0) {
			ms = parseInt((60000 / tempo), 10);
		} else {
			ms = 90;
		}
		return ms;
	};

	this.msToBpm = function (ms) {
		var bpm;
		if (parseInt(bpm, 10) >= 0) {
			bpm = parseInt(ms * 6000)
		}
	};

	this.init = function () {
		this.bar =  document.getElementById('swinger');
		this.tempo = this.config.tempo;
		this.tempoMS = this.bpmToMs(this.config.tempo);
		//Click sound - <audio> element - can we just dynamically change the src in the DOM?
		this.sound = this.config.clickSound;
		//Create the <audio> element to play the beep
		this.beeper = document.createElement('div');
		this.beeper.innerHTML = '<audio style="display: none;" controls preload="auto" ><source src="' + this.sound + '" /><source src="beep.wav"></source></audio>'

		//Create the 'flasher'
		this.flasher = document.createElement('div');
		this.flasher.id = 'flasher';


		this.addControls();
		document.body.appendChild(this.beeper);
		document.body.appendChild(this.flasher);
		this.beeper = this.beeper.getElementsByTagName('audio')[0];

	};

	//Start 'ticking'
	this.start = function () {
		//this.soundTick();
		this.swingRight = true;
		this.ticking = window.setInterval(function () {
			self.soundTick();
		}, self.tempoMS);
	};

	//Stop 'ticking'
	this.stop = function (restart) {
		startStop.innerHTML = 'Start';
		window.clearInterval(this.ticking);
		if(!restart) {
			this.bar.style.webkitTransform = 'rotate(0deg)';
		}
		this.swingRight = true;
	};

	//'Play' the 'tick'
	this.soundTick = function () {
		this.flash();
		this.moveBar();
		this.beeper.play();
	};

	//Flash the 'light'
	this.flash = function() {
		this.flasher.style.display = 'block';
		setTimeout(function() {
			self.flasher.style.display = 'none';
			}, 100);
	};

	//Change the tempo
	this.setTempo = function (newTempo) {
		this.tempo = newTempo;
		this.tempoMS = this.bpmToMs(newTempo);
		console.info('Tempo set at ' + this.tempo + 'bpm' + ' (' + this.tempoMS + 'ms interval)');
		//Set transition speed
		this.bar.style.webkitTransition = 'all '+ (this.tempoMS / 1000)  + 's ease-in-out';
		console.info(this.bar.style.webkitTransition);
		this.stop(true);
		this.start();
	};


	//Create / add controls to the page
	this.addControls = function () {
		var controls = document.createElement('div'),
			plus = document.createElement('BUTTON'),
            startStop = document.createElement('BUTTON');
			minus = document.createElement('BUTTON');
			controls.innerHTML = "<br><br>";
		controls.setAttribute('align','center');
		controls.setAttribute('id','controls');
		plus.setAttribute('id','plus');
		plus.setAttribute('color','#FFFFF');
		//plus.innerHTML = '+';
        startStop.setAttribute('id','startStop');
        startStop.innerHTML = 'Start';
		minus.setAttribute('id','minus');
		//minus.innerHTML = '-';


		plus.addEventListener('click', this.upTempo, false);
		minus.addEventListener('click', this.downTempo, false);
		startStop.addEventListener('click', this.toggleStart, false);
        controls.appendChild(minus);
        controls.appendChild(startStop);
        controls.appendChild(plus);
		document.body.appendChild(controls);
	};

	this.upTempo = function (e) {
		self.setTempo(self.tempo + 10);
		e.preventDefault();
	};

	this.downTempo = function (e) {
		var newTempo = self.tempo - 10;
		if(newTempo <= 0) {
			newTempo = 1;
		}

		self.setTempo(newTempo);
		e.preventDefault();
	};


	this.toggleStart = function(e) {
		startStop.innerHTML = 'Stop';
		if (self.running) {
			self.stop();
		} else {
		self.bar.style.webkitTransform = 'rotate(-45deg)';
			self.start();
		}

		self.running = !self.running;
	};


	this.moveBar = function () {
		var tf = this.bar.style.webkitTransform,
			angle;
        console.log("test");
		console.log(tf);
		if (this.swingBar) {
			angle = '-45';
		} else {
			angle = '45';
		}
		this.bar.style.webkitTransform = 'rotate('+ angle + 'deg)';
		this.swingBar = !this.swingBar;
	};

	this.init();

};
	/*
	Reqs

	Have start / stop button(s?)
	Adjustable tempo (+/- buttons as well as a free text input)
		Graphically slide the weight up and down
	- bpm to ms function
	OPTIONAL: Change the click sound



	*/
