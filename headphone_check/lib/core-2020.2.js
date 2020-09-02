import { MonotonicClock, Clock } from './util-2020.2.js';
import { Scheduler } from './util-2020.2.js';
import { PsychObject } from './util-2020.2.js';
import { getRequestError, toString, getUrlParameters, detectBrowser, to_win } from './util-2020.2.js';
import { ExperimentHandler } from './data-2020.2.js';
import { Color } from './util-2020.2.js';

/**
 * Manager responsible for the communication between the experiment running in the participant's browser and the remote PsychoJS manager running on the remote https://pavlovia.org server.
 *
 * @author Alain Pitiot
 * @version 2020.5
 * @copyright (c) 2020 Ilixa Ltd. ({@link http://ilixa.com})
 * @license Distributed under the terms of the MIT License
 */
class ServerManager extends PsychObject
{
	constructor({
								psychoJS,
								autoLog = false
							} = {})
	{
		super(psychoJS);
		this._session = {};
		this._resources = new Map();
		this._nbResources = -1;
		this._addAttributes(ServerManager, autoLog);
		this._addAttribute('status', ServerManager.Status.READY);
	}
	getConfiguration(configURL)
	{
		const response = {
			origin: 'ServerManager.getConfiguration',
			context: 'when reading the configuration file: ' + configURL
		};
		this._psychoJS.logger.debug('reading the configuration file: ' + configURL);
		const self = this;
		return new Promise((resolve, reject) =>
		{
			$.get(configURL, 'json')
				.done((config, textStatus) =>
				{
					resolve(Object.assign(response, {config}));
				})
				.fail((jqXHR, textStatus, errorThrown) =>
				{
					self.setStatus(ServerManager.Status.ERROR);
					const errorMsg = getRequestError(jqXHR, textStatus, errorThrown);
					console.error('error:', errorMsg);
					reject(Object.assign(response, {error: errorMsg}));
				});
		});
	}
	openSession()
	{
		const response = {
			origin: 'ServerManager.openSession',
			context: 'when opening a session for experiment: ' + this._psychoJS.config.experiment.fullpath
		};
		this._psychoJS.logger.debug('opening a session for experiment: ' + this._psychoJS.config.experiment.fullpath);
		this.setStatus(ServerManager.Status.BUSY);
		let data = {};
		if (this._psychoJS._serverMsg.has('__pilotToken'))
		{
			data.pilotToken = this._psychoJS._serverMsg.get('__pilotToken');
		}
		const self = this;
		return new Promise((resolve, reject) =>
		{
			const url = this._psychoJS.config.pavlovia.URL + '/api/v2/experiments/' + encodeURIComponent(self._psychoJS.config.experiment.fullpath) + '/sessions';
			$.post(url, data, null, 'json')
				.done((data, textStatus) =>
				{
					if (!('token' in data))
					{
						self.setStatus(ServerManager.Status.ERROR);
						reject(Object.assign(response, {error: 'unexpected answer from server: no token'}));
					}
					if (!('experiment' in data))
					{
						self.setStatus(ServerManager.Status.ERROR);
						reject(Object.assign(response, {error: 'unexpected answer from server: no experiment'}));
					}
					self._psychoJS.config.session = {
						token: data.token,
						status: 'OPEN'
					};
					self._psychoJS.config.experiment.status = data.experiment.status2;
					self._psychoJS.config.experiment.saveFormat = Symbol.for(data.experiment.saveFormat);
					self._psychoJS.config.experiment.saveIncompleteResults = data.experiment.saveIncompleteResults;
					self._psychoJS.config.experiment.license = data.experiment.license;
					self._psychoJS.config.experiment.runMode = data.experiment.runMode;
					self.setStatus(ServerManager.Status.READY);
					resolve(Object.assign(response, {token: data.token, status: data.status}));
				})
				.fail((jqXHR, textStatus, errorThrown) =>
				{
					self.setStatus(ServerManager.Status.ERROR);
					const errorMsg = getRequestError(jqXHR, textStatus, errorThrown);
					console.error('error:', errorMsg);
					reject(Object.assign(response, {error: errorMsg}));
				});
		});
	}
	async closeSession(isCompleted = false, sync = false)
	{
		const response = {
			origin: 'ServerManager.closeSession',
			context: 'when closing the session for experiment: ' + this._psychoJS.config.experiment.fullpath
		};
		this._psychoJS.logger.debug('closing the session for experiment: ' + this._psychoJS.config.experiment.name);
		this.setStatus(ServerManager.Status.BUSY);
		const url = this._psychoJS.config.pavlovia.URL + '/api/v2/experiments/' + encodeURIComponent(this._psychoJS.config.experiment.fullpath) + '/sessions/' + this._psychoJS.config.session.token;
		if (sync)
		{
			const formData = new FormData();
			formData.append('isCompleted', isCompleted);
			navigator.sendBeacon(url + '/delete', formData);
			this._psychoJS.config.session.status = 'CLOSED';
		}
		else
		{
			const self = this;
			return new Promise((resolve, reject) =>
			{
				$.ajax({
					url,
					type: 'delete',
					data: {isCompleted},
					dataType: 'json'
				})
					.done((data, textStatus) =>
					{
						self.setStatus(ServerManager.Status.READY);
						self._psychoJS.config.session.status = 'CLOSED';
						resolve(Object.assign(response, {data}));
					})
					.fail((jqXHR, textStatus, errorThrown) =>
					{
						self.setStatus(ServerManager.Status.ERROR);
						const errorMsg = getRequestError(jqXHR, textStatus, errorThrown);
						console.error('error:', errorMsg);
						reject(Object.assign(response, {error: errorMsg}));
					});
			});
		}
	}
	getResource(name)
	{
		const response = {
			origin: 'ServerManager.getResource',
			context: 'when getting the value of resource: ' + name
		};
		const path_data = this._resources.get(name);
		if (typeof path_data === 'undefined')
		{
			throw Object.assign(response, {error: 'unknown resource'});
		}
		return path_data.data;
	}
	setStatus(status)
	{
		const response = {
			origin: 'ServerManager.setStatus',
			context: 'when changing the status of the server manager to: ' + toString(status)
		};
		const statusKey = (typeof status === 'symbol') ? Symbol.keyFor(status) : null;
		if (!statusKey)
		{
			throw Object.assign(response, {error: 'status must be a symbol'});
		}
		if (!ServerManager.Status.hasOwnProperty(statusKey))
		{
			throw Object.assign(response, {error: 'unknown status'});
		}
		this._status = status;
		this.emit(ServerManager.Event.STATUS, this._status);
		return this._status;
	}
	resetStatus()
	{
		return this.setStatus(ServerManager.Status.READY);
	}
	downloadResources(resources = [])
	{
		const response = {
			origin: 'ServerManager.downloadResources',
			context: 'when downloading the resources for experiment: ' + this._psychoJS.config.experiment.name
		};
		this._psychoJS.logger.debug('downloading resources for experiment: ' + this._psychoJS.config.experiment.name);
		const self = this;
		const newResources = new Map();
		let download = async () =>
		{
			try
			{
				if (self._psychoJS.config.environment === ExperimentHandler.Environment.SERVER)
				{
					if (resources.length === 0)
					{
						const serverResponse = await self._listResources();
						for (const name of serverResponse.resources)
						{
							self._resources.set(name, {path: serverResponse.resourceDirectory + '/' + name});
						}
					}
					else
					{
						for (const {name, path} of resources)
						{
							self._resources.set(name, {path});
							newResources.set(name, {path});
						}
					}
				}
				else
				{
					for (const {name, path} of resources)
					{
						self._resources.set(name, {path});
						newResources.set(name, {path});
					}
				}
				self._nbResources = self._resources.size;
				for (const name of self._resources.keys())
				{
					this._psychoJS.logger.debug('resource:', name, self._resources.get(name).path);
				}
				self.emit(ServerManager.Event.RESOURCE, {
					message: ServerManager.Event.RESOURCES_REGISTERED,
					count: self._nbResources
				});
				await self._downloadRegisteredResources(newResources);
			}
			catch (error)
			{
				console.log('error', error);
				throw Object.assign(response, {error});
			}
		};
		download();
	}
	uploadData(key, value, sync = false)
	{
		const response = {
			origin: 'ServerManager.uploadData',
			context: 'when uploading participant\'s results for experiment: ' + this._psychoJS.config.experiment.fullpath
		};
		this._psychoJS.logger.debug('uploading data for experiment: ' + this._psychoJS.config.experiment.fullpath);
		this.setStatus(ServerManager.Status.BUSY);
		const url = this._psychoJS.config.pavlovia.URL +
			'/api/v2/experiments/' + encodeURIComponent(this._psychoJS.config.experiment.fullpath) +
			'/sessions/' + this._psychoJS.config.session.token +
			'/results';
		if (sync)
		{
			const formData = new FormData();
			formData.append('key', key);
			formData.append('value', value);
			navigator.sendBeacon(url, formData);
		}
		else
		{
			const self = this;
			return new Promise((resolve, reject) =>
			{
				const data = {
					key,
					value
				};
				$.post(url, data, null, 'json')
					.done((serverData, textStatus) =>
					{
						self.setStatus(ServerManager.Status.READY);
						resolve(Object.assign(response, {serverData}));
					})
					.fail((jqXHR, textStatus, errorThrown) =>
					{
						self.setStatus(ServerManager.Status.ERROR);
						const errorMsg = getRequestError(jqXHR, textStatus, errorThrown);
						console.error('error:', errorMsg);
						reject(Object.assign(response, {error: errorMsg}));
					});
			});
		}
	}
	uploadLog(logs, compressed = false)
	{
		const response = {
			origin: 'ServerManager.uploadLog',
			context: 'when uploading participant\'s log for experiment: ' + this._psychoJS.config.experiment.fullpath
		};
		this._psychoJS.logger.debug('uploading server log for experiment: ' + this._psychoJS.config.experiment.fullpath);
		this.setStatus(ServerManager.Status.BUSY);
		const info = this.psychoJS.experiment.extraInfo;
		const participant = ((typeof info.participant === 'string' && info.participant.length > 0) ? info.participant : 'PARTICIPANT');
		const experimentName = (typeof info.expName !== 'undefined') ? info.expName : this.psychoJS.config.experiment.name;
		const datetime = ((typeof info.date !== 'undefined') ? info.date : MonotonicClock.getDateStr());
		const filename = participant + '_' + experimentName + '_' + datetime + '.log';
		const data = {
			filename,
			logs,
			compressed
		};
		const self = this;
		return new Promise((resolve, reject) =>
		{
			const url = self._psychoJS.config.pavlovia.URL +
				'/api/v2/experiments/' + encodeURIComponent(self._psychoJS.config.experiment.fullpath) +
				'/sessions/' + self._psychoJS.config.session.token +
				'/logs';
			$.post(url, data, null, 'json')
				.done((serverData, textStatus) =>
				{
					self.setStatus(ServerManager.Status.READY);
					resolve(Object.assign(response, {serverData}));
				})
				.fail((jqXHR, textStatus, errorThrown) =>
				{
					self.setStatus(ServerManager.Status.ERROR);
					const errorMsg = getRequestError(jqXHR, textStatus, errorThrown);
					console.error('error:', errorMsg);
					reject(Object.assign(response, {error: errorMsg}));
				});
		});
	}
	_listResources()
	{
		const response = {
			origin: 'ServerManager._listResourcesSession',
			context: 'when listing the resources for experiment: ' + this._psychoJS.config.experiment.fullpath
		};
		this._psychoJS.logger.debug('listing the resources for experiment: ' +
			this._psychoJS.config.experiment.fullpath);
		this.setStatus(ServerManager.Status.BUSY);
		const data = {
			'token': this._psychoJS.config.session.token
		};
		const self = this;
		return new Promise((resolve, reject) =>
		{
			const url = this._psychoJS.config.pavlovia.URL +
				'/api/v2/experiments/' + encodeURIComponent(this._psychoJS.config.experiment.fullpath) +
				'/resources';
			$.get(url, data, null, 'json')
				.done((data, textStatus) =>
				{
					if (!('resources' in data))
					{
						self.setStatus(ServerManager.Status.ERROR);
						reject(Object.assign(response, {error: 'unexpected answer from server: no resources'}));
					}
					if (!('resourceDirectory' in data))
					{
						self.setStatus(ServerManager.Status.ERROR);
						reject(Object.assign(response, {error: 'unexpected answer from server: no resourceDirectory'}));
					}
					self.setStatus(ServerManager.Status.READY);
					resolve(Object.assign(response, {
						resources: data.resources,
						resourceDirectory: data.resourceDirectory
					}));
				})
				.fail((jqXHR, textStatus, errorThrown) =>
				{
					self.setStatus(ServerManager.Status.ERROR);
					const errorMsg = getRequestError(jqXHR, textStatus, errorThrown);
					console.error('error:', errorMsg);
					reject(Object.assign(response, {error: errorMsg}));
				});
		});
	}
	_downloadRegisteredResources(resources = new Map())
	{
		const response = {
			origin: 'ServerManager._downloadResources',
			context: 'when downloading the resources for experiment: ' + this._psychoJS.config.experiment.name
		};
		this._psychoJS.logger.debug('downloading the registered resources for experiment: ' + this._psychoJS.config.experiment.name);
		this.setStatus(ServerManager.Status.BUSY);
		this._nbLoadedResources = 0;
		this._resourceQueue = new createjs.LoadQueue(true);
		const self = this;
		const filesToDownload = resources.size ? resources : this._resources;
		this._resourceQueue.addEventListener("filestart", event =>
		{
			self.emit(ServerManager.Event.RESOURCE, {
				message: ServerManager.Event.DOWNLOADING_RESOURCE,
				resource: event.item.id
			});
		});
		this._resourceQueue.addEventListener("fileload", event =>
		{
			++self._nbLoadedResources;
			let path_data = self._resources.get(event.item.id);
			path_data.data = event.result;
			self.emit(ServerManager.Event.RESOURCE, {
				message: ServerManager.Event.RESOURCE_DOWNLOADED,
				resource: event.item.id
			});
		});
		this._resourceQueue.addEventListener("complete", event =>
		{
			self._resourceQueue.close();
			if (self._nbLoadedResources === filesToDownload.size)
			{
				self.setStatus(ServerManager.Status.READY);
				self.emit(ServerManager.Event.RESOURCE, {message: ServerManager.Event.DOWNLOAD_COMPLETED});
			}
		});
		this._resourceQueue.addEventListener("error", event =>
		{
			self.setStatus(ServerManager.Status.ERROR);
			const resourceId = (typeof event.data !== 'undefined') ? event.data.id : 'UNKNOWN RESOURCE';
			throw Object.assign(response, {error: 'unable to download resource: ' + resourceId + ' (' + event.title + ')'});
		});
		let manifest = [];
		let soundResources = [];
		for (const [name, path_data] of filesToDownload)
		{
			const nameParts = name.toLowerCase().split('.');
			const extension = (nameParts.length > 1) ? nameParts.pop() : undefined;
			if (typeof extension === 'undefined')
			{
				this.psychoJS.logger.warn(`"${name}" does not appear to have an extension, which may negatively impact its loading. We highly recommend you add an extension.`);
			}
			if (['csv', 'odp', 'xls', 'xlsx'].indexOf(extension) > -1)
			{
				manifest.push({id: name, src: path_data.path, type: createjs.Types.BINARY});
			}
			else if (['mp3', 'mpeg', 'opus', 'ogg', 'oga', 'wav', 'aac', 'caf', 'm4a', 'weba', 'dolby', 'flac'].indexOf(extension) > -1)
			{
				soundResources.push(name);
				if (extension === 'wav')
				{
					this.psychoJS.logger.warn(`wav files are not supported by all browsers. We recommend you convert "${name}" to another format, e.g. mp3`);
				}
			}
			else
			{
				manifest.push({id: name, src: path_data.path});
			}
		}
		if (manifest.length > 0)
		{
			this._resourceQueue.loadManifest(manifest);
		}
		else
		{
			if (this._nbLoadedResources === filesToDownload.size)
			{
				this.setStatus(ServerManager.Status.READY);
				this.emit(ServerManager.Event.RESOURCE, {message: ServerManager.Event.DOWNLOAD_COMPLETED});
			}
		}
		for (const name of soundResources)
		{
			self.emit(ServerManager.Event.RESOURCE, {
				message: ServerManager.Event.DOWNLOADING_RESOURCE,
				resource: name
			});
			const path_data = self._resources.get(name);
			const howl = new Howl({
				src: path_data.path,
				preload: false,
				autoplay: false
			});
			howl.on('load', (event) =>
			{
				++self._nbLoadedResources;
				path_data.data = howl;
				self.emit(ServerManager.Event.RESOURCE, {
					message: ServerManager.Event.RESOURCE_DOWNLOADED,
					resource: name
				});
				if (self._nbLoadedResources === filesToDownload.size)
				{
					self.setStatus(ServerManager.Status.READY);
					self.emit(ServerManager.Event.RESOURCE, {message: ServerManager.Event.DOWNLOAD_COMPLETED});
				}
			});
			howl.on('loaderror', (id, error) =>
			{
				throw Object.assign(response, {error: 'unable to download resource: ' + name + ' (' + toString(error) + ')'});
			});
			howl.load();
		}
	}
}
ServerManager.Event = {
	RESOURCE: Symbol.for('RESOURCE'),
	RESOURCES_REGISTERED: Symbol.for('RESOURCES_REGISTERED'),
	DOWNLOADING_RESOURCE: Symbol.for('DOWNLOADING_RESOURCE'),
	RESOURCE_DOWNLOADED: Symbol.for('RESOURCE_DOWNLOADED'),
	DOWNLOAD_COMPLETED: Symbol.for('DOWNLOAD_COMPLETED'),
	STATUS: Symbol.for('STATUS')
};
ServerManager.Status = {
	READY: Symbol.for('READY'),
	BUSY: Symbol.for('BUSY'),
	ERROR: Symbol.for('ERROR')
};

/**
 * Logger
 *
 * @author Alain Pitiot
 * @version 2020.5
 * @copyright (c) 2020 Ilixa Ltd. ({@link http://ilixa.com})
 * @license Distributed under the terms of the MIT License
 */
class Logger
{
	constructor(psychoJS, threshold)
	{
		this._psychoJS = psychoJS;
		this.consoleLogger = log4javascript.getLogger('psychojs');
		const appender = new log4javascript.BrowserConsoleAppender();
		appender.setLayout(this._customConsoleLayout());
		appender.setThreshold(threshold);
		this.consoleLogger.addAppender(appender);
		this.consoleLogger.setLevel(threshold);
		this._serverLogs = [];
	}
	exp(msg, time, obj)
	{
		this.log(msg, Logger.ServerLevel.EXP, time, obj);
	}
	data(msg, time, obj)
	{
		this.log(msg, Logger.ServerLevel.DATA, time, obj);
	}
	log(msg, level, time, obj)
	{
		if (typeof time === 'undefined')
		{
			time = MonotonicClock.getReferenceTime();
		}
		this._serverLogs.push({
			msg,
			level,
			time,
			obj: toString(obj)
		});
	}
	async flush()
	{
		const response = {
			origin: 'Logger.flush',
			context: 'when flushing participant\'s logs for experiment: ' + this._psychoJS.config.experiment.fullpath
		};
		this._psychoJS.logger.info('[PsychoJS] Flush server logs.');
		let formattedLogs = '';
		for (const log of this._serverLogs)
		{
			let formattedLog = toString(log.time) +
				'\t' + Symbol.keyFor(log.level) +
				'\t' + log.msg;
			if (log.obj !== 'undefined')
			{
				formattedLog += '\t' + log.obj;
			}
			formattedLog += '\n';
			formattedLogs += formattedLog;
		}
		if (this._psychoJS.getEnvironment() === ExperimentHandler.Environment.SERVER &&
			this._psychoJS.config.experiment.status === 'RUNNING' &&
			!this._psychoJS._serverMsg.has('__pilotToken'))
		{
			if (typeof pako !== 'undefined')
			{
				try
				{
					const utf16DeflatedLogs = pako.deflate(formattedLogs, {to: 'string'});
					const base64DeflatedLogs = btoa(utf16DeflatedLogs);
					return await this._psychoJS.serverManager.uploadLog(base64DeflatedLogs, true);
				}
				catch (error)
				{
					console.error('log compression error:', error);
					throw Object.assign(response, {error: error});
				}
			}
			else
			{
				return await this._psychoJS.serverManager.uploadLog(formattedLogs, false);
			}
		}
		else
		{
			this._psychoJS.logger.debug('\n' + formattedLogs);
		}
	}
	_customConsoleLayout()
	{
		const detectedBrowser = this._psychoJS.browser;
		const customLayout = new log4javascript.PatternLayout("%p %f{1} | %m");
		customLayout.setCustomField('location', function (layout, loggingReference)
		{
			try
			{
				throw Error('fake exception');
			}
			catch (e)
			{
				const stackEntries = e.stack.replace(/^.*?\n/, '').replace(/(?:\n@:0)?\s+$/m, '').replace(/^\(/gm, '{anon}(').split("\n");
				let relevantEntry;
				if (detectedBrowser === 'Firefox')
				{
					for (let entry of stackEntries)
					{
						if (entry.indexOf('log4javascript.min.js') <= 0)
						{
							relevantEntry = entry;
							break;
						}
					}
					const buf = relevantEntry.split(':');
					const line = buf[buf.length - 2];
					const file = buf[buf.length - 3].split('/').pop();
					const method = relevantEntry.split('@')[0];
					return method + ' ' + file + ' ' + line;
				}
				else if (detectedBrowser === 'Safari')
				{
					return 'unknown';
				}
				else if (detectedBrowser === 'Chrome')
				{
					relevantEntry = stackEntries.pop();
					let buf = relevantEntry.split(' ');
					let fileLine = buf.pop();
					const method = buf.pop();
					buf = fileLine.split(':');
					buf.pop();
					const line = buf.pop();
					const file = buf.pop().split('/').pop();
					return method + ' ' + file + ' ' + line;
				}
				else
				{
					return 'unknown';
				}
			}
		});
		return customLayout;
	}
}
Logger.ServerLevel = {
	CRITICAL: Symbol.for('CRITICAL'),
	ERROR: Symbol.for('ERROR'),
	WARNING: Symbol.for('WARNING'),
	DATA: Symbol.for('DATA'),
	EXP: Symbol.for('EXP'),
	INFO: Symbol.for('INFO'),
	DEBUG: Symbol.for('DEBUG'),
	NOTSET: Symbol.for('NOTSET')
};

/**
 * Window responsible for displaying the experiment stimuli
 *
 * @author Alain Pitiot
 * @version 2020.5
 * @copyright (c) 2020 Ilixa Ltd. ({@link http://ilixa.com})
 * @license Distributed under the terms of the MIT License
 */
class Window extends PsychObject
{
	get monitorFramePeriod()
	{
		return this._monitorFramePeriod;
	}
	constructor({
								psychoJS,
								name,
								fullscr = false,
								color = new Color('black'),
								units = 'pix',
								waitBlanking = false,
								autoLog = true
							} = {})
	{
		super(psychoJS, name);
		this._msgToBeLogged = [];
		this._drawList = [];
		this._addAttributes(Window, fullscr, color, units, waitBlanking, autoLog);
		this._addAttribute('size', []);
		this._setupPixi();
		this._monitorFramePeriod = 1.0 / this.getActualFrameRate();
		this._frameCount = 0;
		this._flipCallbacks = [];
		this._windowAlreadyInFullScreen = false;
		const self = this;
		document.addEventListener('fullscreenchange', (event) =>
		{
			self._windowAlreadyInFullScreen = !!document.fullscreenElement;
			console.log('windowAlreadyInFullScreen:', self._windowAlreadyInFullScreen);
			self._needUpdate = true;
			for (const stimulus of self._drawList)
			{
				stimulus._needUpdate = true;
			}
		});
		if (this._autoLog)
		{
			this._psychoJS.experimentLogger.exp(`Created ${this.name} = ${this.toString()}`);
		}
	}
	close()
	{
		if (!this._renderer)
		{
			return;
		}
		if (document.body.contains(this._renderer.view))
		{
			document.body.removeChild(this._renderer.view);
		}
		if (typeof this._renderer.gl !== 'undefined')
		{
			const extension = this._renderer.gl.getExtension('WEBGL_lose_context');
			this._renderer.destroy();
			extension.loseContext();
		}
		else
		{
			this._renderer.destroy();
		}
		window.removeEventListener('resize', this._resizeCallback);
		window.removeEventListener('orientationchange', this._resizeCallback);
		this._renderer = null;
	}
	getActualFrameRate()
	{
		return 60.0;
	}
	adjustScreenSize()
	{
		if (this.fullscr)
		{
			this._psychoJS.logger.debug('Resizing Window: ', this._name, 'to full screen.');
			if (typeof document.documentElement.requestFullscreen === 'function')
			{
				document.documentElement.requestFullscreen()
					.catch(() =>
					{
						this.psychoJS.logger.warn('Unable to go fullscreen.');
					});
			}
			else if (typeof document.documentElement.mozRequestFullScreen === 'function')
			{
				document.documentElement.mozRequestFullScreen();
			}
			else if (typeof document.documentElement.webkitRequestFullscreen === 'function')
			{
				document.documentElement.webkitRequestFullscreen();
			}
			else if (typeof document.documentElement.msRequestFullscreen === 'function')
			{
				document.documentElement.msRequestFullscreen();
			}
			else
			{
				this.psychoJS.logger.warn('Unable to go fullscreen.');
			}
		}
	}
	closeFullScreen()
	{
		if (this.fullscr)
		{
			this._psychoJS.logger.debug('Resizing Window: ', this._name, 'back from full screen.');
			if (typeof document.exitFullscreen === 'function')
			{
				document.exitFullscreen()
					.catch(() =>
					{
						this.psychoJS.logger.warn('Unable to close fullscreen.');
					});
			}
			else if (typeof document.mozCancelFullScreen === 'function')
			{
				document.mozCancelFullScreen();
			}
			else if (typeof document.webkitExitFullscreen === 'function')
			{
				document.webkitExitFullscreen();
			}
			else if (typeof document.msExitFullscreen === 'function')
			{
				document.msExitFullscreen();
			}
			else
			{
				this.psychoJS.logger.warn('Unable to close fullscreen.');
			}
		}
	}
	logOnFlip({
							msg,
							level = Logger.ServerLevel.EXP,
							obj
						} = {})
	{
		this._msgToBeLogged.push({msg, level, obj});
	}
	callOnFlip(flipCallback, ...flipCallbackArgs)
	{
		this._flipCallbacks.push({function: flipCallback, arguments: flipCallbackArgs});
	}
	render()
	{
		if (!this._renderer)
		{
			return;
		}
		this._frameCount++;
		this._renderer.render(this._rootContainer);
		if (typeof this._renderer.gl !== 'undefined')
		{
			this._renderer.gl.readPixels(0, 0, 1, 1, this._renderer.gl.RGBA, this._renderer.gl.UNSIGNED_BYTE, new Uint8Array(4));
			if (this._waitBlanking)
			{
				this._renderer.gl.finish();
			}
		}
		for (let callback of this._flipCallbacks)
		{
			callback['function'](...callback['arguments']);
		}
		this._flipCallbacks = [];
		this._writeLogOnFlip();
		this._refresh();
	}
	_updateIfNeeded()
	{
		if (this._needUpdate)
		{
			if (this._renderer)
			{
				this._renderer.backgroundColor = this._color.int;
			}
			document.body.style.backgroundColor = this._color.hex;
			this._needUpdate = false;
		}
	}
	_refresh()
	{
		this._updateIfNeeded();
		for (const stimulus of this._drawList)
		{
			if (stimulus._needUpdate && typeof stimulus._pixi !== 'undefined')
			{
				this._rootContainer.removeChild(stimulus._pixi);
				stimulus._updateIfNeeded();
				this._rootContainer.addChild(stimulus._pixi);
			}
		}
	}
	_fullRefresh()
	{
		this._needUpdate = true;
		for (const stimulus of this._drawList)
		{
			stimulus.refresh();
		}
		this._refresh();
	}
	_setupPixi()
	{
		this._size[0] = window.innerWidth;
		this._size[1] = window.innerHeight;
		this._renderer = PIXI.autoDetectRenderer(this._size[0], this._size[1], {
			backgroundColor: this.color.int,
			resolution: window.devicePixelRatio
		});
		this._renderer.view.style.transform = 'translatez(0)';
		this._renderer.view.style.position = 'absolute';
		document.body.appendChild(this._renderer.view);
		document.body.style.backgroundColor = this._color.hex;
		this._rootContainer = new PIXI.Container();
		this._rootContainer.interactive = true;
		Window._resizePixiRenderer(this);
		this.psychoJS.eventManager.addMouseListeners(this._renderer);
		this._resizeCallback = (e) =>
		{
			Window._resizePixiRenderer(this, e);
			this._fullRefresh();
		};
		window.addEventListener('resize', this._resizeCallback);
		window.addEventListener('orientationchange', this._resizeCallback);
	}
	static _resizePixiRenderer(pjsWindow, event)
	{
		pjsWindow._psychoJS.logger.debug('resizing Window: ', pjsWindow._name, 'event:', JSON.stringify(event));
		pjsWindow._size[0] = window.innerWidth;
		pjsWindow._size[1] = window.innerHeight;
		pjsWindow._renderer.view.style.width = pjsWindow._size[0] + 'px';
		pjsWindow._renderer.view.style.height = pjsWindow._size[1] + 'px';
		pjsWindow._renderer.view.style.left = '0px';
		pjsWindow._renderer.view.style.top = '0px';
		pjsWindow._renderer.resize(pjsWindow._size[0], pjsWindow._size[1]);
		pjsWindow._rootContainer.position.x = pjsWindow._size[0] / 2.0;
		pjsWindow._rootContainer.position.y = pjsWindow._size[1] / 2.0;
		pjsWindow._rootContainer.scale.y = -1;
	}
	_writeLogOnFlip()
	{
		const logTime = MonotonicClock.getReferenceTime();
		for (const entry of this._msgToBeLogged)
		{
			this._psychoJS.experimentLogger.log(entry.msg, entry.level, logTime, entry.obj);
		}
		this._msgToBeLogged = [];
	}
}

/**
 * Graphic User Interface
 *
 * @author Alain Pitiot
 * @version 2020.5
 * @copyright (c) 2020 Ilixa Ltd. ({@link http://ilixa.com})
 * @license Distributed under the terms of the MIT License
 */
class GUI
{
	get dialogComponent()
	{
		return this._dialogComponent;
	}
	constructor(psychoJS)
	{
		this._psychoJS = psychoJS;
		psychoJS.serverManager.on(ServerManager.Event.RESOURCE, (signal) =>
		{
			this._onResourceEvents(signal);
		});
		this._dialogScalingFactor = 0;
	}
	DlgFromDict({
								logoUrl,
								text,
								dictionary,
								title
							})
	{
		const infoFromUrl = getUrlParameters();
		this._progressMsg = '&nbsp;';
		this._progressBarMax = 0;
		this._allResourcesDownloaded = false;
		this._requiredKeys = [];
		this._setRequiredKeys = new Map();
		this._dialogComponent = {};
		this._dialogComponent.status = PsychoJS.Status.NOT_STARTED;
		const dialogClock = new Clock();
		const self = this;
		return () =>
		{
			const t = dialogClock.getTime();
			if (t >= 0.0 && self._dialogComponent.status === PsychoJS.Status.NOT_STARTED)
			{
				self._dialogComponent.tStart = t;
				self._dialogComponent.status = PsychoJS.Status.STARTED;
				if (self._psychoJS.getEnvironment() === ExperimentHandler.Environment.SERVER &&
					typeof self._psychoJS.config.experiment.license !== 'undefined' &&
					self._psychoJS.config.experiment.runMode === 'LICENSE' &&
					typeof self._psychoJS.config.experiment.license.institutionLogo !== 'undefined')
				{
					logoUrl = self._psychoJS.config.experiment.license.institutionLogo;
				}
				let htmlCode = '<div id="expDialog" title="' + title + '">';
				if (typeof logoUrl === 'string')
				{
					htmlCode += '<img id="dialog-logo" class="logo" alt="logo" src="' + logoUrl + '">';
				}
				if (typeof text === 'string' && text.length > 0)
				{
					htmlCode += '<p>' + text + '</p>';
				}
				htmlCode += '<form>';
				for (const key in dictionary)
				{
					const value = dictionary[key];
					const keyId = CSS.escape(key) + '_id';
					let inUrl = false;
					const cleanedDictKey = key.trim().toLowerCase();
					infoFromUrl.forEach((urlValue, urlKey) =>
					{
						const cleanedUrlKey = urlKey.trim().toLowerCase();
						if (cleanedUrlKey === cleanedDictKey)
						{
							inUrl = true;
						}
					});
					if (!inUrl)
					{
						htmlCode += '<label for="' + keyId + '">' + key + '</label>';
						if (key.slice(-1) === '*')
						{
							self._requiredKeys.push(key);
						}
						if (Array.isArray(value))
						{
							htmlCode += '<select name="' + key + '" id="' + keyId + '" class="text ui-widget-content' +
								' ui-corner-all">';
							if (key.slice(-1) === '*')
							{
								htmlCode += '<option disabled selected>...</option>';
							}
							for (const option of value)
							{
								htmlCode += '<option>' + option + '</option>';
							}
							htmlCode += '</select>';
							$('#' + keyId).selectmenu({classes: {}});
						}
						else
						{
							htmlCode += '<input type="text" name="' + key + '" id="' + keyId;
							htmlCode += '" value="' + value + '" class="text ui-widget-content ui-corner-all">';
						}
					}
				}
				htmlCode += '</form>';
				htmlCode += '<hr><div id="progressMsg" class="progress">' + self._progressMsg + '</div>';
				htmlCode += '<div id="progressbar"></div></div>';
				const dialogElement = document.getElementById('root');
				dialogElement.innerHTML = htmlCode;
				if (typeof logoUrl === 'string')
				{
					$("#dialog-logo").on('load', () =>
					{
						self._onDialogOpen('#expDialog')();
					});
				}
				for (const key of this._requiredKeys)
				{
					const keyId = CSS.escape(key) + '_id';
					const input = document.getElementById(keyId);
					if (input)
					{
						input.oninput = (event) => GUI._onKeyChange(self, event);
					}
				}
				self._dialogComponent.button = 'Cancel';
				self._estimateDialogScalingFactor();
				const dialogSize = self._getDialogSize();
				$("#expDialog").dialog({
					width: dialogSize[0],
					maxHeight: dialogSize[1],
					autoOpen: true,
					modal: true,
					closeOnEscape: false,
					resizable: false,
					buttons: [
						{
							id: "buttonCancel",
							text: "Cancel",
							click: function ()
							{
								self._dialogComponent.button = 'Cancel';
								$("#expDialog").dialog('close');
							}
						},
						{
							id: "buttonOk",
							text: "Ok",
							click: function ()
							{
								for (const key in dictionary)
								{
									const input = document.getElementById(CSS.escape(key) + "_id");
									if (input)
									{
										dictionary[key] = input.value;
									}
								}
								self._dialogComponent.button = 'OK';
								$("#expDialog").dialog('close');
								self._psychoJS.window.adjustScreenSize();
							}
						}
					],
					open: self._onDialogOpen('#expDialog'),
					close: function ()
					{
						$(this).dialog('destroy').remove();
						self._dialogComponent.status = PsychoJS.Status.FINISHED;
					}
				})
					.prev(".ui-dialog-titlebar").css("background", "green");
				self._updateOkButtonStatus();
				self._dialogResize('#expDialog');
				$("#progressbar").progressbar({value: self._progressBarCurrentIncrement});
				$("#progressbar").progressbar("option", "max", self._progressBarMax);
			}
			if (self._dialogComponent.status === PsychoJS.Status.FINISHED)
			{
				return Scheduler.Event.NEXT;
			}
			else
			{
				return Scheduler.Event.FLIP_REPEAT;
			}
		};
	}
	dialog({
					 message,
					 warning,
					 error,
					 showOK = true,
					 onOK
				 } = {})
	{
		const expDialog = $("#expDialog");
		if (expDialog.length)
		{
			expDialog.dialog("destroy").remove();
		}
		const msgDialog = $("#msgDialog");
		if (msgDialog.length)
		{
			msgDialog.dialog("destroy").remove();
		}
		let htmlCode;
		let titleColour;
		if (typeof error !== 'undefined')
		{
			this._psychoJS.logger.fatal(toString(error));
			if (!error)
			{
				error = 'Unspecified JavaScript error';
			}
			let errorCode = null;
			let stackCode = '<ul>';
			while (true)
			{
				if (typeof error === 'object' && 'errorCode' in error)
				{
					errorCode = error.errorCode;
				}
				if (typeof error === 'object' && 'context' in error)
				{
					stackCode += '<li>' + error.context + '</li>';
					error = error.error;
				}
				else
				{
					stackCode += '<li><b>' + error + '</b></li>';
					break;
				}
			}
			stackCode += '</ul>';
			if (errorCode)
			{
				const error = this._userFriendlyError(errorCode);
				htmlCode = error.htmlCode;
				titleColour = error.titleColour;
			}
			else
			{
				htmlCode = '<div id="msgDialog" title="Error">';
				htmlCode += '<p class="validateTips">Unfortunately we encountered the following error:</p>';
				htmlCode += stackCode;
				htmlCode += '<p>Try to run the experiment again. If the error persists, contact the experiment designer.</p>';
				htmlCode += '</div>';
				titleColour = 'red';
			}
		}
		else if (typeof message !== 'undefined')
		{
			htmlCode = '<div id="msgDialog" title="Message">' +
				'<p class="validateTips">' + message + '</p>' +
				'</div>';
			titleColour = 'green';
		}
		else if (typeof warning !== 'undefined')
		{
			htmlCode = '<div id="msgDialog" title="Warning">' +
				'<p class="validateTips">' + warning + '</p>' +
				'</div>';
			titleColour = 'orange';
		}
		const dialogElement = document.getElementById('root');
		dialogElement.innerHTML = htmlCode;
		this._estimateDialogScalingFactor();
		const dialogSize = this._getDialogSize();
		const self = this;
		$("#msgDialog").dialog({
			dialogClass: 'no-close',
			width: dialogSize[0],
			maxHeight: dialogSize[1],
			autoOpen: true,
			modal: true,
			closeOnEscape: false,
			buttons: (!showOK) ? [] : [{
				id: "buttonOk",
				text: "Ok",
				click: function ()
				{
					$(this).dialog("destroy").remove();
					if (typeof onOK !== 'undefined')
					{
						onOK();
					}
				}
			}],
			open: self._onDialogOpen('#msgDialog'),
		})
			.prev(".ui-dialog-titlebar").css("background", titleColour);
		self._dialogResize('#msgDialog');
	}
	_onDialogOpen(dialogId)
	{
		const self = this;
		return () =>
		{
			const windowSize = [$(window).width(), $(window).height()];
			const parent = $(dialogId).parent();
			parent.css({
				position: 'absolute',
				left: Math.max(0, (windowSize[0] - parent.outerWidth()) / 2.0),
				top: Math.max(0, (windowSize[1] - parent.outerHeight()) / 2.0)
			});
			self._contentDelta = [
				parent.css('width').slice(0, -2) - $(dialogId).css('width').slice(0, -2),
				parent.css('height').slice(0, -2) - $(dialogId).css('height').slice(0, -2)];
		};
	}
	_dialogResize(dialogId)
	{
		const self = this;
		$(window).resize(function ()
		{
			const parent = $(dialogId).parent();
			const windowSize = [$(window).width(), $(window).height()];
			const dialogSize = self._getDialogSize();
			parent.css({
				width: dialogSize[0],
				maxHeight: dialogSize[1]
			});
			const isDifferent = self._estimateDialogScalingFactor();
			if (!isDifferent)
			{
				$(dialogId).css({
					width: dialogSize[0] - self._contentDelta[0],
					maxHeight: dialogSize[1] - self._contentDelta[1]
				});
			}
			parent.css({
				position: 'absolute',
				left: Math.max(0, (windowSize[0] - parent.outerWidth()) / 2.0),
				top: Math.max(0, (windowSize[1] - parent.outerHeight()) / 2.0),
			});
		});
	}
	_onResourceEvents(signal)
	{
		this._psychoJS.logger.debug('signal: ' + toString(signal));
		if (signal.message === ServerManager.Event.RESOURCES_REGISTERED)
		{
			this._progressBarMax = signal.count * 2;
			$("#progressbar").progressbar("option", "max", this._progressBarMax);
			this._progressBarCurrentIncrement = 0;
			$("#progressMsg").text('all resources registered.');
		}
		else if (signal.message === ServerManager.Event.DOWNLOAD_COMPLETED)
		{
			this._allResourcesDownloaded = true;
			$("#progressMsg").text('all resources downloaded.');
			this._updateOkButtonStatus();
		}
		else if (signal.message === ServerManager.Event.DOWNLOADING_RESOURCE || signal.message === ServerManager.Event.RESOURCE_DOWNLOADED)
		{
			if (typeof this._progressBarCurrentIncrement === 'undefined')
			{
				this._progressBarCurrentIncrement = 0;
			}
			++this._progressBarCurrentIncrement;
			if (signal.message === ServerManager.Event.RESOURCE_DOWNLOADED)
			{
				$("#progressMsg").text('downloaded ' + this._progressBarCurrentIncrement / 2 + ' / ' + this._progressBarMax / 2);
			}
			$("#progressbar").progressbar("option", "value", this._progressBarCurrentIncrement);
		}
		else
		{
			$("#progressMsg").text(signal.message);
		}
	}
	_updateOkButtonStatus()
	{
		if (this._psychoJS.getEnvironment() === ExperimentHandler.Environment.LOCAL || (this._allResourcesDownloaded && this._setRequiredKeys.size >= this._requiredKeys.length))
		{
			$("#buttonOk").button("option", "disabled", false);
		}
		else
		{
			$("#buttonOk").button("option", "disabled", true);
		}
		$("#buttonOk").hide(0, () =>
		{
			$("#buttonOk").show();
		});
	}
	_estimateDialogScalingFactor()
	{
		const windowSize = [$(window).width(), $(window).height()];
		let dialogScalingFactor = 1.0;
		if (windowSize[0] < 1080)
		{
			if (windowSize[0] > windowSize[1])
			{
				dialogScalingFactor = 1.5;
			}
			else
			{
				dialogScalingFactor = 2.0;
			}
		}
		const isDifferent = (dialogScalingFactor !== this._dialogScalingFactor);
		this._dialogScalingFactor = dialogScalingFactor;
		return isDifferent;
	}
	_getDialogSize()
	{
		const windowSize = [$(window).width(), $(window).height()];
		this._estimateDialogScalingFactor();
		return [
			Math.min(GUI.dialogMaxSize[0], (windowSize[0] - GUI.dialogMargin[0]) / this._dialogScalingFactor),
			Math.min(GUI.dialogMaxSize[1], (windowSize[1] - GUI.dialogMargin[1]) / this._dialogScalingFactor)];
	}
	static _onKeyChange(gui, event)
	{
		const element = event.target;
		const value = element.value;
		if (typeof value !== 'undefined' && value.length > 0)
		{
			gui._setRequiredKeys.set(event.target, true);
		}
		else
		{
			gui._setRequiredKeys.delete(event.target);
		}
		gui._updateOkButtonStatus();
	}
	_userFriendlyError(errorCode)
	{
		switch (errorCode)
		{
			case 1:
				return {
					htmlCode: '<div id="msgDialog" title="Error"><p>Oops we encountered an internal server error.</p><p>Try to run the experiment again. If the error persists, contact the experiment designer.</p></div>',
					titleColour: 'red'
				};
			case 2:
				return {
					htmlCode: '<div id="msgDialog" title="Error"><p>Oops we encountered a database error.</p><p>Try to run the experiment again. If the error persists, contact the experiment designer.</p></div>',
					titleColour: 'red'
				};
			case 20:
				return {
					htmlCode: `<div id="msgDialog" title="Warning"><p><strong>${this._psychoJS.config.experiment.fullpath}</strong> does not have any status and cannot be run.</p><p>If you are the experiment designer, go to your <a href="https://pavlovia.org/${this._psychoJS.config.experiment.fullpath}">experiment page</a> and change the experiment status to either PILOTING or RUNNING.</p><p>Otherwise please contact the experiment designer to let him or her know that the status must be changed to RUNNING for participants to be able to run it.</p></div>`,
					titleColour: 'orange'
				};
			case 21:
				return {
					htmlCode: `<div id="msgDialog" title="Warning"><p><strong>${this._psychoJS.config.experiment.fullpath}</strong> is currently inactive and cannot be run.</p><p>If you are the experiment designer, go to your <a href="https://pavlovia.org/${this._psychoJS.config.experiment.fullpath}">experiment page</a> and change the experiment status to either PILOTING or RUNNING.</p><p>Otherwise please contact the experiment designer to let him or her know that the status must be changed to RUNNING for participants to be able to run it.</p></div>`,
					titleColour: 'orange'
				};
			case 22:
				return {
					htmlCode: `<div id="msgDialog" title="Warning"><p><strong>${this._psychoJS.config.experiment.fullpath}</strong> has been deleted and cannot be run.</p><p>If you are the experiment designer, either go to your <a href="https://pavlovia.org/${this._psychoJS.config.experiment.fullpath}">experiment page</a> and change the experiment status to either PILOTING or RUNNING, or generate a new experiment.</p><p>Otherwise please contact the experiment designer to let him or her know that the experiment has been deleted and cannot be run any longer.</p></div>`,
					titleColour: 'orange'
				};
			case 23:
				return {
					htmlCode: `<div id="msgDialog" title="Warning"><p><strong>${this._psychoJS.config.experiment.fullpath}</strong> has been archived and cannot be run.</p><p>If you are the experiment designer, go to your <a href="https://pavlovia.org/${this._psychoJS.config.experiment.fullpath}">experiment page</a> and change the experiment status to either PILOTING or RUNNING.</p><p>Otherwise please contact the experiment designer to let him or her know that the experiment has been archived and cannot be run at the moment.</p></div>`,
					titleColour: 'orange'
				};
			case 30:
				return {
					htmlCode: `<div id="msgDialog" title="Warning"><p><strong>${this._psychoJS.config.experiment.fullpath}</strong> is currently in PILOTING mode but the pilot token is missing from the URL.</p><p>If you are the experiment designer, you can pilot it by pressing the pilot button on your <a href="https://pavlovia.org/${this._psychoJS.config.experiment.fullpath}">experiment page</a>.</p><p>Otherwise please contact the experiment designer to let him or her know that the experiment status must be changed to RUNNING for participants to be able to run it.</p></div>`,
					titleColour: 'orange'
				};
			case 31:
				return {
					htmlCode: `<div id="msgDialog" title="Warning"><p><strong>${this._psychoJS.config.experiment.fullpath}</strong> cannot be run because the pilot token in the URL is invalid, possibly because it has expired.</p><p>If you are the experiment designer, you can generate a new token by pressing the pilot button on your <a href="https://pavlovia.org/${this._psychoJS.config.experiment.fullpath}">experiment page</a>.</p><p>Otherwise please contact the experiment designer to let him or her know that the experiment status must be changed to RUNNING for participants to be able to run it.</p></div>`,
					titleColour: 'orange'
				};
			case 50:
				return {
					htmlCode: `<div id="msgDialog" title="Warning"><p><strong>${this._psychoJS.config.experiment.fullpath}</strong> is covered by a license that has expired. </p><p>If you are the experiment designer, you can either contact the license manager to inquire about the expiration, or you can run your experiments using credits. You will find all relevant details about the license on your <a href="https://pavlovia.org/${this._psychoJS.config.experiment.fullpath}">experiment page</a>, where you will also be able to change its running mode to CREDIT.</p><p>Otherwise please contact the experiment designer to let him or her know that there is an issue with the experiment's license having expired.</p></div>`,
					titleColour: 'orange'
				};
			case 51:
				return {
					htmlCode: `<div id="msgDialog" title="Warning"><p><strong>${this._psychoJS.config.experiment.fullpath}</strong> is covered by a license that requires one or more documents to be approved before the experiment can be run. </p><p>If you are the experiment designer, please contact the license manager and ask him or her which documents must be approved. You will find all relevant details about the license on your <a href="https://pavlovia.org/${this._psychoJS.config.experiment.fullpath}">experiment page</a>.</p><p>Otherwise please contact the experiment designer to let him or her know that there is an issue with the experiment's license requiring documents to be approved.</p></div>`,
					titleColour: 'orange'
				};
			case 60:
				return {
					htmlCode: `<div id="msgDialog" title="Warning"><p><strong>${this._psychoJS.config.experiment.fullpath}</strong> does not have any assigned credit left and cannot be run.</p><p>If you are the experiment designer, you can assign more credits to it on your <a href="https://pavlovia.org/${this._psychoJS.config.experiment.fullpath}">experiment page</a>.</p><p>Otherwise please contact the experiment designer to let him or her know that the experiment requires more assigned credits to run.</p></div>`,
					titleColour: 'orange'
				};
			default:
				return {
					htmlCode: `<div id="msgDialog" title="Error"><p>Unfortunately we encountered an unspecified error (error code: ${errorCode}.</p><p>Try to run the experiment again. If the error persists, contact the experiment designer.</p></div>`,
					titleColour: 'red'
				};
		}
	}
}
GUI.dialogMaxSize = [500, 600];
GUI.dialogMargin = [50, 50];

/**
 * Main component of the PsychoJS library.
 *
 * @author Alain Pitiot
 * @version 2020.5
 * @copyright (c) 2020 Ilixa Ltd. ({@link http://ilixa.com})
 * @license Distributed under the terms of the MIT License
 */
class PsychoJS
{
	get status()
	{
		return this._status;
	}
	set status(status)
	{
		this._status = status;
	}
	get config()
	{
		return this._config;
	}
	get window()
	{
		return this._window;
	}
	get serverManager()
	{
		return this._serverManager;
	}
	get experiment()
	{
		return this._experiment;
	}
	get scheduler()
	{
		return this._scheduler;
	}
	get monotonicClock()
	{
		return this._monotonicClock;
	}
	get logger()
	{
		return this._logger.consoleLogger;
	}
	get experimentLogger()
	{
		return this._logger;
	}
	get eventManager()
	{
		return this._eventManager;
	}
	get gui()
	{
		return this._gui;
	}
	get IP()
	{
		return this._IP;
	}
	get serverMsg()
	{
		return this._serverMsg;
	}
	get browser()
	{
		return this._browser;
	}
	constructor({
								debug = true,
								collectIP = false,
								topLevelStatus = true
							} = {})
	{
		this._logger = new Logger(this, (debug) ? log4javascript.Level.DEBUG : log4javascript.Level.INFO);
		this._captureErrors();
		this._browser = detectBrowser();
		this.logger.info('[PsychoJS] Detected browser:', this._browser);
		this._monotonicClock = new MonotonicClock();
		this._eventManager = new EventManager(this);
		this._serverManager = new ServerManager({
			psychoJS: this
		});
		this._gui = new GUI(this);
		this._collectIP = collectIP;
		this._scheduler = new Scheduler(this);
		this._window = undefined;
		this._cancellationUrl = undefined;
		this._completionUrl = undefined;
		this._status = PsychoJS.Status.NOT_CONFIGURED;
		if (topLevelStatus)
		{
			this._makeStatusTopLevel();
		}
		this.logger.info('[PsychoJS] Initialised.');
		this.logger.info('[PsychoJS] @version 2020.2');
	}
	getEnvironment()
	{
		if (typeof this._config === 'undefined')
		{
			return undefined;
		}
		return this._config.environment;
	}
	openWindow({
							 name,
							 fullscr,
							 color,
							 units,
							 waitBlanking,
							 autoLog
						 } = {})
	{
		this.logger.info('[PsychoJS] Open Window.');
		if (typeof this._window !== 'undefined')
		{
			throw {
				origin: 'PsychoJS.openWindow',
				context: 'when opening a Window',
				error: 'A Window has already been opened.'
			};
		}
		this._window = new Window({
			psychoJS: this,
			name,
			fullscr,
			color,
			units,
			waitBlanking,
			autoLog
		});
	}
	setRedirectUrls(completionUrl, cancellationUrl)
	{
		this._completionUrl = completionUrl;
		this._cancellationUrl = cancellationUrl;
	}
	schedule(task, args)
	{
		this.logger.debug('schedule task: ', task.toString().substring(0, 50), '...');
		this._scheduler.add(task, args);
	}
	scheduleCondition(condition, thenScheduler, elseScheduler)
	{
		this.logger.debug('schedule condition: ', condition.toString().substring(0, 50), '...');
		this._scheduler.addConditional(condition, thenScheduler, elseScheduler);
	}
	async start({configURL = 'config.json', expName = 'UNKNOWN', expInfo, resources = []} = {})
	{
		this.logger.debug();
		const response = {origin: 'PsychoJS.start', context: 'when starting the experiment'};
		try
		{
			await this._configure(configURL, expName);
			if (this._collectIP)
			{
				this._getParticipantIPInfo();
			}
			else
			{
				this._IP = {
					IP: 'X',
					hostname: 'X',
					city: 'X',
					region: 'X',
					country: 'X',
					location: 'X'
				};
			}
			this._experiment = new ExperimentHandler({
				psychoJS: this,
				extraInfo: expInfo
			});
			if (this.getEnvironment() === ExperimentHandler.Environment.SERVER)
			{
				await this._serverManager.openSession();
				this.beforeunloadCallback = (event) =>
				{
					event.preventDefault();
					event.returnValue = '';
				};
				window.addEventListener('beforeunload', this.beforeunloadCallback);
				const self = this;
				window.addEventListener('unload', (event) =>
				{
					if (self._config.session.status === 'OPEN')
					{
						if (self._config.experiment.saveIncompleteResults)
						{
							self._experiment.save({sync: true});
						}
						self._serverManager.closeSession(false, true);
					}
					if (typeof self._window !== 'undefined')
					{
						self._window.close();
					}
				});
			}
			this._serverManager.downloadResources(resources);
			this.logger.info('[PsychoJS] Start Experiment.');
			this._scheduler.start();
		}
		catch (error)
		{
			this._gui.dialog({error: Object.assign(response, {error})});
		}
	}
	async downloadResources(resources = [])
	{
		try
		{
			await this.serverManager.downloadResources(resources);
		}
		catch (error)
		{
			this._gui.dialog({error: Object.assign(response, {error})});
		}
	}
	importAttributes(obj)
	{
		this.logger.debug('import attributes from: ', toString(obj));
		if (typeof obj === 'undefined')
		{
			return;
		}
		for (const attribute in obj)
		{
			window[attribute] = obj[attribute];
		}
	}
	async quit({message, isCompleted = false} = {})
	{
		this.logger.info('[PsychoJS] Quit.');
		this._experiment.experimentEnded = true;
		this._status = PsychoJS.Status.FINISHED;
		try
		{
			this._scheduler.stop();
			if (this.getEnvironment() === ExperimentHandler.Environment.SERVER)
			{
				window.removeEventListener('beforeunload', this.beforeunloadCallback);
			}
			this.gui.dialog({
				warning: 'Closing the session. Please wait a few moments.',
				showOK: false
			});
			if (isCompleted || this._config.experiment.saveIncompleteResults)
			{
				await this._experiment.save();
				await this._logger.flush();
			}
			if (this.getEnvironment() === ExperimentHandler.Environment.SERVER)
			{
				await this._serverManager.closeSession(isCompleted);
			}
			let text = 'Thank you for your patience.<br/><br/>';
			text += (typeof message !== 'undefined') ? message : 'Goodbye!';
			const self = this;
			this._gui.dialog({
				message: text,
				onOK: () =>
				{
					self._window.close();
					while (document.body.hasChildNodes())
					{
						document.body.removeChild(document.body.lastChild);
					}
					this._window.closeFullScreen();
					if (isCompleted && typeof self._completionUrl !== 'undefined')
					{
						window.location = self._completionUrl;
					}
					else if (!isCompleted && typeof self._cancellationUrl !== 'undefined')
					{
						window.location = self._cancellationUrl;
					}
				}
			});
		}
		catch (error)
		{
			console.error(error);
			this._gui.dialog({error});
		}
	}
	async _configure(configURL, name)
	{
		const response = {origin: 'PsychoJS.configure', context: 'when configuring PsychoJS for the experiment'};
		try
		{
			this.status = PsychoJS.Status.CONFIGURING;
			const experimentUrl = window.location.href;
			if (experimentUrl.indexOf('https://run.pavlovia.org/') === 0 || experimentUrl.indexOf('https://pavlovia.org/run/') === 0)
			{
				const serverResponse = await this._serverManager.getConfiguration(configURL);
				this._config = serverResponse.config;
				if ('psychoJsManager' in this._config)
				{
					delete this._config.psychoJsManager;
					this._config.pavlovia = {
						URL: 'https://pavlovia.org'
					};
				}
				if (!('experiment' in this._config))
				{
					throw 'missing experiment block in configuration';
				}
				if (!('name' in this._config.experiment))
				{
					throw 'missing name in experiment block in configuration';
				}
				if (!('fullpath' in this._config.experiment))
				{
					throw 'missing fullpath in experiment block in configuration';
				}
				if (!('pavlovia' in this._config))
				{
					throw 'missing pavlovia block in configuration';
				}
				if (!('URL' in this._config.pavlovia))
				{
					throw 'missing URL in pavlovia block in configuration';
				}
				this._config.environment = ExperimentHandler.Environment.SERVER;
			}
			else
			{
				this._config = {
					environment: ExperimentHandler.Environment.LOCAL,
					experiment: {name, saveFormat: ExperimentHandler.SaveFormat.CSV}
				};
			}
			this._serverMsg = new Map();
			getUrlParameters().forEach((value, key) =>
			{
				if (key.indexOf('__') === 0)
				{
					this._serverMsg.set(key, value);
				}
			});
			this.status = PsychoJS.Status.CONFIGURED;
			this.logger.debug('configuration:', toString(this._config));
		}
		catch (error)
		{
			throw Object.assign(response, {error});
		}
	}
	async _getParticipantIPInfo()
	{
		const response = {
			origin: 'PsychoJS._getParticipantIPInfo',
			context: 'when getting the IP information of the participant'
		};
		this.logger.debug('getting the IP information of the participant');
		this._IP = {};
		try
		{
			const geoResponse = await $.get('http://www.geoplugin.net/json.gp');
			const geoData = JSON.parse(geoResponse);
			this._IP = {
				IP: geoData.geoplugin_request,
				country: geoData.geoplugin_countryName,
				latitude: geoData.geoplugin_latitude,
				longitude: geoData.geoplugin_longitude
			};
			this.logger.debug('IP information of the participant: ' + toString(this._IP));
		}
		catch (error)
		{
			throw Object.assign(response, {error});
		}
	}
	_captureErrors()
	{
		this.logger.debug('capturing all errors using window.onerror');
		const self = this;
		window.onerror = function (message, source, lineno, colno, error)
		{
			console.error(error);
			self._gui.dialog({"error": error});
			return true;
		};
	}
	_makeStatusTopLevel()
	{
		for (const status in PsychoJS.Status)
		{
			window[status] = PsychoJS.Status[status];
		}
	}
}
PsychoJS.Status = {
	NOT_CONFIGURED: Symbol.for('NOT_CONFIGURED'),
	CONFIGURING: Symbol.for('CONFIGURING'),
	CONFIGURED: Symbol.for('CONFIGURED'),
	NOT_STARTED: Symbol.for('NOT_STARTED'),
	STARTED: Symbol.for('STARTED'),
	FINISHED: Symbol.for('FINISHED'),
	STOPPED: Symbol.for('FINISHED')
};

/**
 * Manager handling the keyboard and mouse/touch events.
 *
 * @author Alain Pitiot
 * @version 2020.5
 * @copyright (c) 2020 Ilixa Ltd. ({@link http://ilixa.com})
 * @license Distributed under the terms of the MIT License
 */
class EventManager
{
	constructor(psychoJS)
	{
		this._psychoJS = psychoJS;
		for (const keyName in EventManager._pygletMap)
		{
			EventManager._reversePygletMap[EventManager._pygletMap[keyName]] = keyName;
		}
		this._keyBuffer = [];
		this._addKeyListeners();
		this._mouseInfo = {
			pos: [0, 0],
			wheelRel: [0.0, 0.0],
			buttons: {
				pressed: [0, 0, 0],
				clocks: [new Clock(), new Clock(), new Clock()],
				times: [0.0, 0.0, 0.0]
			},
			moveClock: new Clock()
		};
	}
	getKeys({
						keyList = null,
						timeStamped = false
					} = {})
	{
		if (keyList != null)
		{
			keyList = EventManager.pyglet2w3c(keyList);
		}
		let newBuffer = [];
		let keys = [];
		for (let i = 0; i < this._keyBuffer.length; ++i)
		{
			const key = this._keyBuffer[i];
			let keyId = null;
			if (keyList != null)
			{
				let index = keyList.indexOf(key.code);
				if (index < 0)
				{
					index = keyList.indexOf(EventManager._keycodeMap[key.keyCode]);
				}
				if (index >= 0)
				{
					keyId = EventManager._reversePygletMap[keyList[index]];
				}
			}
			else
			{
				keyId = EventManager._reversePygletMap[key.code];
			}
			if (keyId != null)
			{
				if (timeStamped)
				{
					keys.push([keyId, key.timestamp]);
				}
				else
				{
					keys.push(keyId);
				}
			}
			else
			{
				newBuffer.push(key);
			}
		}
		this._keyBuffer = newBuffer;
		return keys;
	}
	getMouseInfo()
	{
		return this._mouseInfo;
	}
	clearEvents(attribs)
	{
		this.clearKeys();
	}
	clearKeys()
	{
		this._keyBuffer = [];
	}
	startMoveClock()
	{
	}
	stopMoveClock()
	{
	}
	resetMoveClock()
	{
	}
	addMouseListeners(renderer)
	{
		const self = this;
		renderer.view.addEventListener("pointerdown", (event) =>
		{
			event.preventDefault();
			self._mouseInfo.buttons.pressed[event.button] = 1;
			self._mouseInfo.buttons.times[event.button] = self._psychoJS._monotonicClock.getTime() - self._mouseInfo.buttons.clocks[event.button].getLastResetTime();
			self._mouseInfo.pos = [event.offsetX, event.offsetY];
			this._psychoJS.experimentLogger.data("Mouse: " + event.button + " button down, pos=(" + self._mouseInfo.pos[0] + "," + self._mouseInfo.pos[1] + ")");
		}, false);
		renderer.view.addEventListener("touchstart", (event) =>
		{
			event.preventDefault();
			self._mouseInfo.buttons.pressed[0] = 1;
			self._mouseInfo.buttons.times[0] = self._psychoJS._monotonicClock.getTime() - self._mouseInfo.buttons.clocks[0].getLastResetTime();
			const touches = event.changedTouches;
			self._mouseInfo.pos = [touches[0].pageX, touches[0].pageY];
			this._psychoJS.experimentLogger.data("Mouse: " + event.button + " button down, pos=(" + self._mouseInfo.pos[0] + "," + self._mouseInfo.pos[1] + ")");
		}, false);
		renderer.view.addEventListener("pointerup", (event) =>
		{
			event.preventDefault();
			self._mouseInfo.buttons.pressed[event.button] = 0;
			self._mouseInfo.buttons.times[event.button] = self._psychoJS._monotonicClock.getTime() - self._mouseInfo.buttons.clocks[event.button].getLastResetTime();
			self._mouseInfo.pos = [event.offsetX, event.offsetY];
			this._psychoJS.experimentLogger.data("Mouse: " + event.button + " button down, pos=(" + self._mouseInfo.pos[0] + "," + self._mouseInfo.pos[1] + ")");
		}, false);
		renderer.view.addEventListener("touchend", (event) =>
		{
			event.preventDefault();
			self._mouseInfo.buttons.pressed[0] = 0;
			self._mouseInfo.buttons.times[0] = self._psychoJS._monotonicClock.getTime() - self._mouseInfo.buttons.clocks[0].getLastResetTime();
			const touches = event.changedTouches;
			self._mouseInfo.pos = [touches[0].pageX, touches[0].pageY];
			this._psychoJS.experimentLogger.data("Mouse: " + event.button + " button down, pos=(" + self._mouseInfo.pos[0] + "," + self._mouseInfo.pos[1] + ")");
		}, false);
		renderer.view.addEventListener("pointermove", (event) =>
		{
			event.preventDefault();
			self._mouseInfo.moveClock.reset();
			self._mouseInfo.pos = [event.offsetX, event.offsetY];
		}, false);
		renderer.view.addEventListener("touchmove", (event) =>
		{
			event.preventDefault();
			self._mouseInfo.moveClock.reset();
			const touches = event.changedTouches;
			self._mouseInfo.pos = [touches[0].pageX, touches[0].pageY];
		}, false);
		renderer.view.addEventListener("wheel", event =>
		{
			self._mouseInfo.wheelRel[0] += event.deltaX;
			self._mouseInfo.wheelRel[1] += event.deltaY;
			this._psychoJS.experimentLogger.data("Mouse: wheel shift=(" + event.deltaX + "," + event.deltaY + "), pos=(" + self._mouseInfo.pos[0] + "," + self._mouseInfo.pos[1] + ")");
		}, false);
	}
	_addKeyListeners()
	{
		const self = this;
		window.addEventListener("keydown", (event) =>
		{
			const timestamp = MonotonicClock.getReferenceTime();
			let code = event.code;
			if (typeof code === 'undefined')
			{
				code = EventManager.keycode2w3c(event.keyCode);
			}
			self._keyBuffer.push({
				code,
				key: event.key,
				keyCode: event.keyCode,
				timestamp
			});
			self._psychoJS.logger.trace('keydown: ', event.key);
			self._psychoJS.experimentLogger.data('Keydown: ' + event.key);
			event.stopPropagation();
		});
	}
	static pyglet2w3c(pygletKeyList)
	{
		let w3cKeyList = [];
		for (let i = 0; i < pygletKeyList.length; i++)
		{
			if (typeof EventManager._pygletMap[pygletKeyList[i]] === 'undefined')
			{
				w3cKeyList.push(pygletKeyList[i]);
			}
			else
			{
				w3cKeyList.push(EventManager._pygletMap[pygletKeyList[i]]);
			}
		}
		return w3cKeyList;
	}
	static w3c2pyglet(code)
	{
		if (code in EventManager._reversePygletMap)
		{
			return EventManager._reversePygletMap[code];
		}
		else
		{
			return 'N/A';
		}
	}
	static keycode2w3c(keycode)
	{
		return EventManager._keycodeMap[keycode];
	}
}
EventManager._keycodeMap = {
	49: "Digit1",
	50: "Digit2",
	51: "Digit3",
	52: "Digit4",
	53: "Digit5",
	54: "Digit6",
	55: "Digit7",
	56: "Digit8",
	57: "Digit9",
	48: "Digit0",
	65: "KeyA",
	66: "KeyB",
	67: "KeyC",
	68: "KeyD",
	69: "KeyE",
	70: "KeyF",
	71: "KeyG",
	72: "KeyH",
	73: "KeyI",
	74: "KeyJ",
	75: "KeyK",
	76: "KeyL",
	77: "KeyM",
	78: "KeyN",
	79: "KeyO",
	80: "KeyP",
	81: "KeyQ",
	82: "KeyR",
	83: "KeyS",
	84: "KeyT",
	85: "KeyU",
	86: "KeyV",
	87: "KeyW",
	88: "KeyX",
	89: "KeyY",
	90: "KeyZ",
	188: "Comma",
	190: "Period",
	186: "Semicolon",
	222: "Quote",
	219: "BracketLeft",
	221: "BracketRight",
	192: "Backquote",
	220: "Backslash",
	189: "Minus",
	187: "Equal",
	144: "NumLock",
	96: "Numpad0",
	97: "Numpad1",
	98: "Numpad2",
	99: "Numpad3",
	100: "Numpad4",
	101: "Numpad5",
	102: "Numpad6",
	103: "Numpad7",
	104: "Numpad8",
	105: "Numpad9",
	107: "NumpadAdd",
	194: "NumpadComma",
	110: "NumpadDecimal",
	111: "NumpadDivide",
	12: "NumpadEqual",
	106: "NumpadMultiply",
	109: "NumpadSubtract",
	13: "Enter",
	16: "ShiftLeft",
	17: "ControlLeft",
	18: "AltLeft",
	37: "ArrowLeft",
	38: "ArrowUp",
	39: "ArrowRight",
	40: "ArrowDown",
	27: "Escape",
	32: "Space"
};
EventManager._pygletMap = {
	"grave": "Backquote",
	"backslash": "Backslash",
	"backspace": "Backspace",
	"bracketleft": "BracketLeft",
	"bracketright": "BracketRight",
	"comma": "Comma",
	"0": "Digit0",
	"1": "Digit1",
	"2": "Digit2",
	"3": "Digit3",
	"4": "Digit4",
	"5": "Digit5",
	"6": "Digit6",
	"7": "Digit7",
	"8": "Digit8",
	"9": "Digit9",
	"equal": "Equal",
	"a": "KeyA",
	"b": "KeyB",
	"c": "KeyC",
	"d": "KeyD",
	"e": "KeyE",
	"f": "KeyF",
	"g": "KeyG",
	"h": "KeyH",
	"i": "KeyI",
	"j": "KeyJ",
	"k": "KeyK",
	"l": "KeyL",
	"m": "KeyM",
	"n": "KeyN",
	"o": "KeyO",
	"p": "KeyP",
	"q": "KeyQ",
	"r": "KeyR",
	"s": "KeyS",
	"t": "KeyT",
	"u": "KeyU",
	"v": "KeyV",
	"w": "KeyW",
	"x": "KeyX",
	"y": "KeyY",
	"z": "KeyZ",
	"minus": "Minus",
	"period": "Period",
	"apostrophe": "Quote",
	"semicolon": "Semicolon",
	"slash": "Slash",
	"escape": "Escape",
	"loption": "AltLeft",
	"roption": "AltRight",
	"capslock": "CapsLock",
	"lcontrol": "ControlLeft",
	"rcontrol": "ControlRight",
	"return": "Enter",
	"lcommand": "MetaLeft",
	"rcommand": "MetaRight",
	"lshift": "ShiftLeft",
	"rshift": "ShiftRight",
	"space": "Space",
	"tab": "Tab",
	"down": "ArrowDown",
	"left": "ArrowLeft",
	"right": "ArrowRight",
	"up": "ArrowUp",
	"num_0": "Numpad0",
	"num_1": "Numpad1",
	"num_2": "Numpad2",
	"num_3": "Numpad3",
	"num_4": "Numpad4",
	"num_5": "Numpad5",
	"num_6": "Numpad6",
	"num_7": "Numpad7",
	"num_8": "Numpad8",
	"num_9": "Numpad9",
	"num_decimal": "NumpadDecimal",
	"num_enter": "NumpadEnter",
	"num_add": "NumpadAdd",
	"num_subtract": "NumpadSubtract",
	"num_multiply": "NumpadMultiply",
	"num_divide": "NumpadDivide",
	"num_equal": "NumpadEqual",
	"num_numlock": "NumpadNumlock"
};
EventManager._reversePygletMap = {};
class BuilderKeyResponse
{
	constructor(psychoJS)
	{
		this._psychoJS = psychoJS;
		this.status = PsychoJS.Status.NOT_STARTED;
		this.keys = [];
		this.corr = 0;
		this.rt = [];
		this.clock = new Clock();
	}
}

/**
 * Manager handling the keyboard events.
 *
 * @author Alain Pitiot
 * @version 2020.5
 * @copyright (c) 2020 Ilixa Ltd. ({@link http://ilixa.com})
 * @license Distributed under the terms of the MIT License
 */
class KeyPress
{
	constructor(code, tDown, name)
	{
		this.code = code;
		this.tDown = tDown;
		this.name = (typeof name !== 'undefined') ? name : EventManager.w3c2pyglet(code);
		this.duration = undefined;
		this.rt = undefined;
	}
}
class Keyboard extends PsychObject
{
	constructor({
								psychoJS,
								bufferSize = 10000,
								waitForStart = false,
								clock,
								autoLog = false,
							} = {})
	{
		super(psychoJS);
		if (typeof clock === 'undefined')
		{
			clock = new Clock();
		}
		this._addAttributes(Keyboard, bufferSize, waitForStart, clock, autoLog);
		this._addAttribute('status', (waitForStart) ? PsychoJS.Status.NOT_STARTED : PsychoJS.Status.STARTED);
		this.clearEvents();
		this._addKeyListeners();
	}
	start()
	{
		this._status = PsychoJS.Status.STARTED;
	}
	stop()
	{
		this._status = PsychoJS.Status.STOPPED;
	}
	getEvents()
	{
		if (this._bufferLength === 0)
		{
			return [];
		}
		let filteredEvents = [];
		const bufferWrap = (this._bufferLength === this._bufferSize);
		let i = bufferWrap ? this._bufferIndex : -1;
		do
		{
			i = (i + 1) % this._bufferSize;
			const keyEvent = this._circularBuffer[i];
			if (keyEvent)
			{
				filteredEvents.push(keyEvent);
			}
		} while (i !== this._bufferIndex);
		return filteredEvents;
	}
	getKeys({
						keyList = [],
						waitRelease = true,
						clear = true
					} = {})
	{
		if (this._bufferLength === 0)
		{
			return [];
		}
		let keyPresses = [];
		const bufferWrap = (this._bufferLength === this._bufferSize);
		let i = bufferWrap ? this._bufferIndex : -1;
		do
		{
			i = (i + 1) % this._bufferSize;
			const keyEvent = this._circularBuffer[i];
			if (keyEvent && keyEvent.status === Keyboard.KeyStatus.KEY_UP)
			{
				if (keyList.length === 0 || keyList.includes(keyEvent.pigletKey))
				{
					const precedingKeydownIndex = keyEvent.keydownIndex;
					if (typeof precedingKeydownIndex !== 'undefined')
					{
						const precedingKeydownEvent = this._circularBuffer[precedingKeydownIndex];
						if (precedingKeydownEvent)
						{
							const tDown = precedingKeydownEvent.timestamp;
							const keyPress = new KeyPress(keyEvent.code, tDown, keyEvent.pigletKey);
							keyPress.rt = tDown - this._clock.getLastResetTime();
							keyPress.duration = keyEvent.timestamp - precedingKeydownEvent.timestamp;
							keyPresses.push(keyPress);
							if (clear)
							{
								this._circularBuffer[precedingKeydownIndex] = null;
							}
						}
					}
					if (clear)
					{
						this._circularBuffer[i] = null;
					}
				}
			}
		} while (i !== this._bufferIndex);
		if (!waitRelease)
		{
			for (const unmatchedKeyDownIndex of this._unmatchedKeydownMap.values())
			{
				const keyEvent = this._circularBuffer[unmatchedKeyDownIndex];
				if (keyEvent)
				{
					if (keyList.length === 0 || keyList.includes(keyEvent.pigletKey))
					{
						const tDown = keyEvent.timestamp;
						const keyPress = new KeyPress(keyEvent.code, tDown, keyEvent.pigletKey);
						keyPress.rt = tDown - this._clock.getLastResetTime();
						keyPresses.push(keyPress);
						if (clear)
						{
							this._unmatchedKeydownMap.delete(keyEvent.code);
							this._circularBuffer[unmatchedKeyDownIndex] = null;
						}
					}
				}
			}
		}
		if (clear && keyList.length === 0)
		{
			this.clearEvents();
		}
		return keyPresses;
	}
	clearEvents()
	{
		this._circularBuffer = new Array(this._bufferSize);
		this._bufferLength = 0;
		this._bufferIndex = -1;
		this._previousKeydownKey = undefined;
		this._unmatchedKeydownMap = new Map();
	}
	static includes(keypressList, keyName)
	{
		if (!Array.isArray(keypressList))
		{
			return false;
		}
		const value = keypressList.find((keypress) => keypress.name === keyName);
		return (typeof value !== 'undefined');
	}
	_addKeyListeners()
	{
		this._previousKeydownKey = undefined;
		const self = this;
		window.addEventListener("keydown", (event) =>
		{
			if (event.repeat)
			{
				return;
			}
			const timestamp = MonotonicClock.getReferenceTime();
			if (this._status !== PsychoJS.Status.STARTED)
			{
				return;
			}
			self._previousKeydownKey = event.key;
			let code = event.code;
			if (typeof code === 'undefined')
			{
				code = EventManager.keycode2w3c(event.keyCode);
			}
			let pigletKey = EventManager.w3c2pyglet(code);
			self._bufferIndex = (self._bufferIndex + 1) % self._bufferSize;
			self._bufferLength = Math.min(self._bufferLength + 1, self._bufferSize);
			self._circularBuffer[self._bufferIndex] = {
				code,
				key: event.key,
				pigletKey,
				status: Keyboard.KeyStatus.KEY_DOWN,
				timestamp
			};
			self._unmatchedKeydownMap.set(event.code, self._bufferIndex);
			self._psychoJS.logger.trace('keydown: ', event.key);
			event.stopPropagation();
		});
		window.addEventListener("keyup", (event) =>
		{
			const timestamp = MonotonicClock.getReferenceTime();
			if (this._status !== PsychoJS.Status.STARTED)
			{
				return;
			}
			self._previousKeydownKey = undefined;
			let code = event.code;
			if (typeof code === 'undefined')
			{
				code = EventManager.keycode2w3c(event.keyCode);
			}
			let pigletKey = EventManager.w3c2pyglet(code);
			self._bufferIndex = (self._bufferIndex + 1) % self._bufferSize;
			self._bufferLength = Math.min(self._bufferLength + 1, self._bufferSize);
			self._circularBuffer[self._bufferIndex] = {
				code,
				key: event.key,
				pigletKey,
				status: Keyboard.KeyStatus.KEY_UP,
				timestamp
			};
			const correspondingKeydownIndex = self._unmatchedKeydownMap.get(event.code);
			if (typeof correspondingKeydownIndex !== 'undefined')
			{
				self._circularBuffer[self._bufferIndex].keydownIndex = correspondingKeydownIndex;
				self._unmatchedKeydownMap.delete(event.code);
			}
			self._psychoJS.logger.trace('keyup: ', event.key);
			event.stopPropagation();
		});
	}
}
Keyboard.KeyStatus = {
	KEY_DOWN: Symbol.for('KEY_DOWN'),
	KEY_UP: Symbol.for('KEY_UP')
};

/**
 * Base class for all stimuli.
 *
 * @author Alain Pitiot
 * @version 2020.5
 * @copyright (c) 2020 Ilixa Ltd. ({@link http://ilixa.com})
 * @license Distributed under the terms of the MIT License
 */
class MinimalStim extends PsychObject
{
	constructor({name, win, autoDraw, autoLog} = {})
	{
		super(win._psychoJS, name);
		this._pixi = undefined;
		this._addAttribute(
			'win',
			win,
			undefined
		);
		this._addAttribute(
			'autoDraw',
			autoDraw,
			false
		);
		this._addAttribute(
			'autoLog',
			autoLog,
			(typeof win !== 'undefined' && win !== null) ? win.autoLog : false
		);
		this._needUpdate = false;
		this.status = PsychoJS.Status.NOT_STARTED;
	}
	setAutoDraw(autoDraw, log = false)
	{
		this._setAttribute('autoDraw', autoDraw, log);
		if (this._autoDraw)
		{
			this.draw();
		}
		else
		{
			this.hide();
		}
	}
	draw()
	{
		if (this.win)
		{
			const index = this._win._drawList.indexOf(this);
			if (index < 0)
			{
				this._updateIfNeeded();
				if (typeof this._pixi === 'undefined')
				{
					this.psychoJS.logger.warn('the Pixi.js representation of this stimulus is undefined.');
				}
				else
				{
					this.win._rootContainer.addChild(this._pixi);
					this.win._drawList.push(this);
				}
			}
			else
			{
				if (this._needUpdate && typeof this._pixi !== 'undefined')
				{
					this.win._rootContainer.removeChild(this._pixi);
					this._updateIfNeeded();
					this.win._rootContainer.addChild(this._pixi);
				}
			}
		}
		this.status = PsychoJS.Status.STARTED;
	}
	hide()
	{
		if (this._win)
		{
			const index = this._win._drawList.indexOf(this);
			if (index >= 0)
			{
				this._win._drawList.splice(index, 1);
				if (typeof this._pixi !== 'undefined')
				{
					this._win._rootContainer.removeChild(this._pixi);
				}
			}
			this.status = PsychoJS.Status.STOPPED;
		}
	}
	contains(object, units)
	{
		throw {
			origin: 'MinimalStim.contains',
			context: `when determining whether stimulus: ${this._name} contains object: ${toString(object)}`,
			error: 'this method is abstract and should not be called.'
		};
	}
	release(log = false)
	{
		this._setAttribute('autoDraw', false, log);
		this.status = PsychoJS.Status.STOPPED;
		if (typeof this._pixi !== 'undefined')
		{
			this._pixi.destroy(true);
			this._pixi = undefined;
		}
	}
	_updateIfNeeded()
	{
		throw {
			origin: 'MinimalStim._updateIfNeeded',
			context: 'when updating stimulus: ' + this._name,
			error: 'this method is abstract and should not be called.'
		};
	}
}

/**
 * Manager responsible for the interactions between the experiment's stimuli and the mouse.
 *
 * @author Alain Pitiot
 * @version 2020.5
 * @copyright (c) 2020 Ilixa Ltd. ({@link http://ilixa.com})
 * @license Distributed under the terms of the MIT License
 */
class Mouse extends PsychObject
{
	constructor({
								name,
								win,
								autoLog = true
							} = {})
	{
		super(win._psychoJS, name);
		this._lastPos = undefined;
		this._prevPos = undefined;
		this._movedistance = 0.0;
		const units = win.units;
		const visible = 1;
		this._addAttributes(Mouse, win, units, visible, autoLog);
		this.status = PsychoJS.Status.NOT_STARTED;
	}
	getPos()
	{
		const mouseInfo = this.psychoJS.eventManager.getMouseInfo();
		let pos_px = mouseInfo.pos.slice();
		pos_px[0] = pos_px[0] - this.win.size[0] / 2;
		pos_px[1] = this.win.size[1] / 2 - pos_px[1];
		this._lastPos = to_win(pos_px, 'pix', this._win);
		return this._lastPos;
	}
	getRel()
	{
		if (typeof this._lastPos === 'undefined')
		{
			return this.getPos();
		}
		else
		{
			const lastPos = this._lastPos;
			const pos = this.getPos();
			return [-lastPos[0] + pos[0], -lastPos[1] + pos[1]];
		}
	}
	getWheelRel()
	{
		const mouseInfo = this.psychoJS.eventManager.getMouseInfo();
		const wheelRel_px = mouseInfo.wheelRel.slice();
		const wheelRel = to_win(wheelRel_px, 'pix', this._win);
		mouseInfo.wheelRel = [0, 0];
		return wheelRel;
	}
	getPressed(getTime = false)
	{
		const buttonPressed = this.psychoJS.eventManager.getMouseInfo().buttons.pressed.slice();
		if (!getTime)
		{
			return buttonPressed;
		}
		else
		{
			const buttonTimes = this.psychoJS.eventManager.getMouseInfo().buttons.times.slice();
			return [buttonPressed, buttonTimes];
		}
	}
	isPressedIn(...args)
	{
		const [{ shape: shapeMaybe, buttons: buttonsMaybe } = {}] = args.filter(v => !!v);
		const hasKey = key => object => !!(object && object[key]);
		const isShape = hasKey('contains');
		const shapeFound = isShape(shapeMaybe) ? shapeMaybe : args.find(isShape);
		const shape = shapeFound || shapeMaybe;
		const hasButtons = hasKey('buttons');
		const { isInteger } = Number;
		const buttonsFound = isInteger(buttonsMaybe) ? buttonsMaybe : args.find(o => hasButtons(o) || isInteger(o));
		const { buttons: wanted = buttonsFound || buttonsMaybe } = buttonsFound || {};
		if (typeof shape.contains === 'function')
		{
			const mouseInfo = this.psychoJS.eventManager.getMouseInfo();
			const { pressed } = mouseInfo.buttons;
			const hasButtonPressed = isInteger(wanted) ? pressed[wanted] > 0 : pressed.some(v => v > 0);
			return hasButtonPressed && shape.contains(this);
		}
		return false;
	}
	mouseMoved(distance, reset = false)
	{
		if (typeof this._lastPos === 'undefined')
		{
			this.getPos();
		}
		this._prevPos = this._lastPos.slice();
		this.getPos();
		if (typeof reset === 'boolean' && reset == false)
		{
			if (typeof distance === 'undefined')
			{
				return (this._prevPos[0] != this._lastPos[0]) || (this._prevPos[1] != this._lastPos[1]);
			}
			else
			{
				if (typeof distance === 'number')
				{
					this._movedistance = Math.sqrt((this._prevPos[0] - this._lastPos[0]) * (this._prevPos[0] - this._lastPos[0]) + (this._prevPos[1] - this._lastPos[1]) * (this._prevPos[1] - this._lastPos[1]));
					return (this._movedistance > distance);
				}
				if (this._prevPos[0] + distance[0] - this._lastPos[0] > 0.0)
				{
					return true;
				}
				if (this._prevPos[1] + distance[1] - this._lastPos[0] > 0.0)
				{
					return true;
				}
				return false;
			}
		}
		else if (typeof reset === 'boolean' && reset == true)
		{
			this.psychoJS.eventManager.getMouseInfo().moveClock.reset();
			return false;
		}
		else if (reset === 'here')
		{
			this._prevPos = this._lastPos.clone();
			return false;
		}
		else if (reset instanceof Array)
		{
			this._prevPos = reset.slice();
			if (!distance)
			{
				return false;
			}
			else
			{
				if (typeof distance === 'number')
				{
					this._movedistance = Math.sqrt((this._prevPos[0] - this._lastPos[0]) * (this._prevPos[0] - this._lastPos[0]) + (this._prevPos[1] - this._lastPos[1]) * (this._prevPos[1] - this._lastPos[1]));
					return (this._movedistance > distance);
				}
				if (Math.abs(this._lastPos[0] - this._prevPos[0]) > distance[0])
				{
					return true;
				}
				if (Math.abs(this._lastPos[1] - this._prevPos[1]) > distance[1])
				{
					return true;
				}
				return false;
			}
		}
		else
		{
			return false;
		}
	}
	mouseMoveTime()
	{
		return this.psychoJS.eventManager.getMouseInfo().moveClock.getTime();
	}
	clickReset(buttons = [0, 1, 2])
	{
		const mouseInfo = this.psychoJS.eventManager.getMouseInfo();
		for (const b of buttons)
		{
			mouseInfo.buttons.clocks[b].reset();
			mouseInfo.buttons.times[b] = 0.0;
		}
	}
}

/**
 * Mixin implementing various unit-handling measurement methods.
 *
 * @author Alain Pitiot
 * @version 2020.5
 * @copyright (c) 2020 Ilixa Ltd. ({@link http://ilixa.com})
 * @license Distributed under the terms of the MIT License
 */
let WindowMixin = (superclass) => class extends superclass
{
	constructor(args)
	{
		super(args);
	}
	_getLengthPix(length, integerCoordinates = false)
	{
		let response = {
			origin: 'WindowMixin._getLengthPix',
			context: 'when converting a length from stimulus unit to pixel units'
		};
		let length_px;
		if (this._units === 'pix')
		{
			length_px = length;
		}
		else if (typeof this._units === 'undefined' || this._units === 'norm')
		{
			var winSize = this.win.size;
			length_px = length * winSize[1] / 2;
		}
		else if (this._units === 'height')
		{
			const minSize = Math.min(this.win.size[0], this.win.size[1]);
			length_px = length * minSize;
		}
		else
		{
			throw Object.assign(response, {error: 'unable to deal with unit: ' + this._units});
		}
		if (integerCoordinates)
		{
			return Math.round(length_px);
		}
		else
		{
			return length_px;
		}
	}
	_getLengthUnits(length_px)
	{
		let response = {
			origin: 'WindowMixin._getLengthUnits',
			context: 'when converting a length from pixel unit to stimulus units'
		};
		if (this._units === 'pix')
		{
			return length_px;
		}
		else if (typeof this._units === 'undefined' || this._units === 'norm')
		{
			const winSize = this.win.size;
			return length_px / (winSize[1] / 2);
		}
		else if (this._units === 'height')
		{
			const minSize = Math.min(this.win.size[0], this.win.size[1]);
			return length_px / minSize;
		}
		else
		{
			throw Object.assign(response, {error: 'unable to deal with unit: ' + this._units});
		}
	}
	_getHorLengthPix(length)
	{
		let response = {
			origin: 'WindowMixin._getHorLengthPix',
			context: 'when converting a length from stimulus units to pixel units'
		};
		if (this._units === 'pix')
		{
			return length;
		}
		else if (typeof this._units === 'undefined' || this._units === 'norm')
		{
			var winSize = this.win.size;
			return length * winSize[0] / 2;
		}
		else if (this._units === 'height')
		{
			const minSize = Math.min(this.win.size[0], this.win.size[1]);
			return length * minSize;
		}
		else
		{
			throw Object.assign(response, {error: 'unable to deal with unit: ' + this._units});
		}
	}
	_getVerLengthPix(length)
	{
		let response = {
			origin: 'WindowMixin._getVerLengthPix',
			context: 'when converting a length from pixel unit to stimulus units'
		};
		if (this._units === 'pix')
		{
			return length;
		}
		else if (typeof this._units === 'undefined' || this._units === 'norm')
		{
			var winSize = this.win.size;
			return length * winSize[1] / 2;
		}
		else if (this._units === 'height')
		{
			const minSize = Math.min(this.win.size[0], this.win.size[1]);
			return length * minSize;
		}
		else
		{
			throw Object.assign(response, {error: 'unable to deal with unit: ' + this._units});
		}
	}
};

export { BuilderKeyResponse, EventManager, GUI, KeyPress, Keyboard, Logger, MinimalStim, Mouse, PsychoJS, ServerManager, Window, WindowMixin };
