import { PsychoJS } from './core-2020.2.js';
import { PsychObject } from './util-2020.2.js';

/**
 * Sound player interface
 *
 * @author Alain Pitiot
 * @version 2020.5
 * @copyright (c) 2020 Ilixa Ltd. ({@link http://ilixa.com})
 * @license Distributed under the terms of the MIT License
 */
class SoundPlayer extends PsychObject
{
	constructor(psychoJS)
	{
		super(psychoJS);
	}
	static accept(sound)
	{
		throw {
			origin: 'SoundPlayer.accept',
			context: 'when evaluating whether this player can play a given sound',
			error: 'this method is abstract and should not be called.'
		};
	}
	play(loops)
	{
		throw {
			origin: 'SoundPlayer.play',
			context: 'when starting the playback of a sound',
			error: 'this method is abstract and should not be called.'
		};
	}
	stop()
	{
		throw {
			origin: 'SoundPlayer.stop',
			context: 'when stopping the playback of a sound',
			error: 'this method is abstract and should not be called.'
		};
	}
	getDuration()
	{
		throw {
			origin: 'SoundPlayer.getDuration',
			context: 'when getting the duration of the sound',
			error: 'this method is abstract and should not be called.'
		};
	}
	setDuration(duration_s)
	{
		throw {
			origin: 'SoundPlayer.setDuration',
			context: 'when setting the duration of the sound',
			error: 'this method is abstract and should not be called.'
		};
	}
	setLoops(loops)
	{
		throw {
			origin: 'SoundPlayer.setLoops',
			context: 'when setting the number of loops',
			error: 'this method is abstract and should not be called.'
		};
	}
	setVolume(volume, mute = false)
	{
		throw {
			origin: 'SoundPlayer.setVolume',
			context: 'when setting the volume of the sound',
			error: 'this method is abstract and should not be called.'
		};
	}
}

/**
 * Tone Player.
 *
 * @author Alain Pitiot
 * @version 2020.5
 * @copyright (c) 2020 Ilixa Ltd. ({@link http://ilixa.com})
 * @license Distributed under the terms of the MIT License
 */
class TonePlayer extends SoundPlayer
{
	constructor({
								psychoJS,
								note = 'C4',
								duration_s = 0.5,
								volume = 1.0,
								loops = 0,
								soundLibrary = TonePlayer.SoundLibrary.TONE_JS,
								autoLog = true
							} = {})
	{
		super(psychoJS);
		this._addAttributes(TonePlayer, note, duration_s, volume, loops, soundLibrary, autoLog);
		this._initSoundLibrary();
		this._toneLoop = null;
		if (this._autoLog)
		{
			this._psychoJS.experimentLogger.exp(`Created ${this.name} = ${this.toString()}`);
		}
	}
	static accept(sound)
	{
		if ($.isNumeric(sound.value))
		{
			return new TonePlayer({
				psychoJS: sound.psychoJS,
				note: sound.value,
				duration_s: sound.secs,
				volume: sound.volume,
				loops: sound.loops
			});
		}
		if (typeof sound.value === 'string')
		{
			let psychopyToToneMap = new Map();
			for (const note of ['A', 'B', 'C', 'D', 'E', 'F', 'G'])
			{
				psychopyToToneMap.set(note, note);
				psychopyToToneMap.set(note + 'fl', note + 'b');
				psychopyToToneMap.set(note + 'sh', note + '#');
			}
			const note = psychopyToToneMap.get(sound.value);
			if (typeof note !== 'undefined')
			{
				return new TonePlayer({
					psychoJS: sound.psychoJS,
					note: note + sound.octave,
					duration_s: sound.secs,
					volume: sound.volume,
					loops: sound.loops
				});
			}
		}
		return undefined;
	}
	getDuration()
	{
		return this.duration_s;
	}
	setDuration(duration_s)
	{
		this.duration_s = duration_s;
	}
	setLoops(loops)
	{
		this._loops = loops;
	}
	setVolume(volume, mute = false)
	{
		this._volume = volume;
		if (this._soundLibrary === TonePlayer.SoundLibrary.TONE_JS)
		{
			if (typeof this._volumeNode !== 'undefined')
			{
				this._volumeNode.mute = mute;
				this._volumeNode.volume.value = -60 + volume * 66;
			}
		}
	}
	play(loops)
	{
		if (typeof loops !== 'undefined')
		{
			this._loops = loops;
		}
		const actualDuration_s = (this._duration_s === -1) ? 1000000 : this._duration_s;
		const self = this;
		let playToneCallback;
		if (this._soundLibrary === TonePlayer.SoundLibrary.TONE_JS)
		{
			playToneCallback = () =>
			{
				self._synth.triggerAttackRelease(self._note, actualDuration_s, Tone.context.currentTime);
			};
		}
		else
		{
			playToneCallback = () =>
			{
				self._webAudioOscillator = self._audioContext.createOscillator();
				self._webAudioOscillator.type = 'sine';
				self._webAudioOscillator.frequency.value = 440;
				self._webAudioOscillator.connect(self._audioContext.destination);
				const contextCurrentTime = self._audioContext.currentTime;
				self._webAudioOscillator.start(contextCurrentTime);
				self._webAudioOscillator.stop(contextCurrentTime + actualDuration_s);
			};
		}
		if (this.loops === 0)
		{
			playToneCallback();
		}
		else if (this.loops === -1)
		{
			this._toneId = Tone.Transport.scheduleRepeat(
				playToneCallback,
				this.duration_s,
				Tone.now(),
				Tone.Infinity
			);
		}
		else
		{
			this._toneId = Tone.Transport.scheduleRepeat(
				playToneCallback,
				this.duration_s,
				Tone.now(),
				this.duration_s * (this._loops + 1)
			);
		}
	}
	stop()
	{
		if (this._soundLibrary === TonePlayer.SoundLibrary.TONE_JS)
		{
			this._synth.triggerRelease();
			if (this._toneId)
			{
				Tone.Transport.clear(this._toneId);
			}
		}
		else
		{
			const contextCurrentTime = this._audioContext.currentTime;
			this._webAudioOscillator.stop(contextCurrentTime);
		}
	}
	_initSoundLibrary()
	{
		const response = {
			origin: 'TonePlayer._initSoundLibrary',
			context: 'when initialising the sound library'
		};
		if (this._soundLibrary === TonePlayer.SoundLibrary.TONE_JS)
		{
			if (typeof Tone === 'undefined')
			{
				throw Object.assign(response, {
					error: "Tone.js is not available. A different sound library must be selected. Please contact the experiment designer."
				});
			}
			if (typeof Tone !== 'undefined' && Tone.Transport.state !== 'started')
			{
				this.psychoJS.logger.info('[PsychoJS] start Tone Transport');
				Tone.Transport.start(Tone.now());
				Tone.context.lookAhead = 0;
			}
			this._synthOtions = {
				oscillator: {
					type: 'square'
				},
				envelope: {
					attack: 0.001,
					decay: 0.001,
					sustain: 1,
					release: 0.001
				}
			};
			this._synth = new Tone.Synth(this._synthOtions);
			this._volumeNode = new Tone.Volume(-60 + this._volume * 66);
			this._synth.connect(this._volumeNode);
			this._volumeNode.toMaster();
		}
		else
		{
			if (typeof this._audioContext === 'undefined')
			{
				const AudioContext = window.AudioContext || window.webkitAudioContext;
				if (typeof AudioContext === 'undefined')
				{
					throw Object.assign(response, {
						error: `AudioContext is not available on your browser, ${this._psychoJS.browser}, please contact the experiment designer.`
					});
				}
				this._audioContext = new AudioContext();
			}
		}
	}
}
TonePlayer.SoundLibrary = {
	AUDIO_CONTEXT: Symbol.for('AUDIO_CONTEXT'),
	TONE_JS: Symbol.for('TONE_JS')
};

/**
 * Track Player.
 *
 * @author Alain Pitiot
 * @version 2020.5
 * @copyright (c) 2020 Ilixa Ltd. ({@link http://ilixa.com})
 * @license Distributed under the terms of the MIT License
 */
class TrackPlayer extends SoundPlayer
{
	constructor({
								psychoJS,
								howl,
								startTime = 0,
								stopTime = -1,
								stereo = true,
								volume = 0,
								loops = 0
							} = {})
	{
		super(psychoJS);
		this._addAttributes(TrackPlayer, howl, startTime, stopTime, stereo, loops, volume);
		this._currentLoopIndex = -1;
	}
	static accept(sound)
	{
		if (typeof sound.value === 'string')
		{
			const howl = sound.psychoJS.serverManager.getResource(sound.value);
			if (typeof howl !== 'undefined')
			{
				const player = new TrackPlayer({
					psychoJS: sound.psychoJS,
					howl: howl,
					startTime: sound.startTime,
					stopTime: sound.stopTime,
					stereo: sound.stereo,
					loops: sound.loops,
					volume: sound.volume
				});
				return player;
			}
		}
		return undefined;
	}
	getDuration()
	{
		return this._howl.duration();
	}
	setVolume(volume, mute = false)
	{
		this._volume = volume;
		this._howl.volume(volume);
		this._howl.mute(mute);
	}
	setLoops(loops)
	{
		this._loops = loops;
		this._currentLoopIndex = -1;
		if (loops === 0)
		{
			this._howl.loop(false);
		}
		else
		{
			this._howl.loop(true);
		}
	}
	play(loops)
	{
		if (typeof loops !== 'undefined')
		{
			this.setLoops(loops);
		}
		if (loops > 0)
		{
			const self = this;
			this._howl.on('end', (event) =>
			{
				++this._currentLoopIndex;
				if (self._currentLoopIndex > self._loops)
				{
					self.stop();
				}
				else
				{
					self._howl.seek(self._startTime);
					self._howl.play();
				}
			});
		}
		this._howl.seek(this._startTime);
		this._howl.play();
	}
	stop()
	{
		this._howl.stop();
		this._howl.off('end');
	}
}

/**
 * Sound stimulus.
 *
 * @author Alain Pitiot
 * @version 2020.5
 * @copyright (c) 2020 Ilixa Ltd. ({@link http://ilixa.com})
 * @license Distributed under the terms of the MIT License
 */
class Sound extends PsychObject
{
	constructor({
								name,
								win,
								value = 'C',
								octave = 4,
								secs = 0.5,
								startTime = 0,
								stopTime = -1,
								stereo = true,
								volume = 1.0,
								loops = 0,
								autoLog = true
							} = {})
	{
		super(win._psychoJS, name);
		this._player = undefined;
		this._addAttributes(Sound, win, value, octave, secs, startTime, stopTime, stereo, volume, loops,  autoLog);
		this._getPlayer();
		this.status = PsychoJS.Status.NOT_STARTED;
	}
	play(loops, log = true)
	{
		this.status = PsychoJS.Status.STARTED;
		this._player.play(loops);
	}
	stop({
				 log = true
			 } = {})
	{
		this._player.stop();
		this.status = PsychoJS.Status.STOPPED;
	}
	getDuration()
	{
		return this._player.getDuration();
	}
	setVolume(volume, mute = false, log = true)
	{
		this._setAttribute('volume', volume, log);
		if (typeof this._player !== 'undefined')
		{
			this._player.setVolume(volume, mute);
		}
	}
	setLoops(loops = 0, log = true)
	{
		this._setAttribute('loops', loops, log);
		if (typeof this._player !== 'undefined')
		{
			this._player.setLoops(loops);
		}
	}
	setSecs(secs = 0.5, log = true)
	{
		this._setAttribute('secs', secs, log);
		if (typeof this._player !== 'undefined')
		{
			this._player.setDuration(secs);
		}
	}
	_getPlayer()
	{
		const acceptFns = [
			sound => TonePlayer.accept(sound),
			sound => TrackPlayer.accept(sound)
		];
		for (const acceptFn of acceptFns)
		{
			this._player = acceptFn(this);
			if (typeof this._player !== 'undefined')
			{
				return this._player;
			}
		}
		throw {
			origin: 'SoundPlayer._getPlayer',
			context: 'when finding a player for the sound',
			error: 'could not find an appropriate player.'
		};
	}
}

export { Sound, SoundPlayer, TonePlayer, TrackPlayer };
