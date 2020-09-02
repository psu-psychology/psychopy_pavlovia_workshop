/**
 * Clock component.
 *
 * @author Alain Pitiot
 * @version 2020.5
 * @copyright (c) 2020 Ilixa Ltd. ({@link http://ilixa.com})
 * @license Distributed under the terms of the MIT License
 */
class MonotonicClock
{
	constructor(startTime = MonotonicClock.getReferenceTime())
	{
		this._timeAtLastReset = startTime;
	}
	getTime()
	{
		return MonotonicClock.getReferenceTime() - this._timeAtLastReset;
	}
	getLastResetTime()
	{
		return this._timeAtLastReset;
	}
	static getReferenceTime()
	{
		return (performance.now() / 1000.0 - MonotonicClock._referenceTime);
	}
	static getDateStr(format = 'YYYY-MM-DD_HH[h]mm.ss.SSS')
	{
		return moment().format(format);
	}
}
MonotonicClock._referenceTime = performance.now() / 1000.0;
class Clock extends MonotonicClock
{
	constructor()
	{
		super();
	}
	reset(newTime = 0)
	{
		this._timeAtLastReset = MonotonicClock.getReferenceTime() + newTime;
	}
	add(deltaTime)
	{
		this._timeAtLastReset += deltaTime;
	}
}
class CountdownTimer extends Clock
{
	constructor(startTime = 0)
	{
		super();
		this._timeAtLastReset = MonotonicClock.getReferenceTime();
		this._countdown_duration = startTime;
		if (startTime)
		{
			this.add(startTime);
		}
	}
	add(deltaTime)
	{
		this._timeAtLastReset += deltaTime;
	}
	reset(newTime = undefined)
	{
		if (typeof newTime == 'undefined')
		{
			this._timeAtLastReset = MonotonicClock.getReferenceTime() + this._countdown_duration;
		}
		else
		{
			this._countdown_duration = newTime;
			this._timeAtLastReset = MonotonicClock.getReferenceTime() + newTime;
		}
	}
	getTime()
	{
		return this._timeAtLastReset - MonotonicClock.getReferenceTime();
	}
}

/**
 * Color management.
 *
 * @author Alain Pitiot
 * @version 2020.5
 * @copyright (c) 2020 Ilixa Ltd. ({@link http://ilixa.com})
 * @license Distributed under the terms of the MIT License
 */
class Color
{
	constructor(obj = 'black', colorspace = Color.COLOR_SPACE.RGB)
	{
		const response = {
			origin: 'Color',
			context: 'when defining a color'
		};
		if (typeof obj == 'string')
		{
			if (colorspace !== Color.COLOR_SPACE.RGB)
			{
				throw Object.assign(response, {
					error: 'the colorspace must be RGB for a named color'
				});
			}
			if (obj[0] === '#')
			{
				this._hex = obj;
			}
			else
			{
				if (!(obj.toLowerCase() in Color.NAMED_COLORS))
				{
					throw Object.assign(response, {error: 'unknown named color: ' + obj});
				}
				this._hex = Color.NAMED_COLORS[obj.toLowerCase()];
			}
			this._rgb = Color.hexToRgb(this._hex);
		}
		else if (typeof obj == 'number')
		{
			if (colorspace !== Color.COLOR_SPACE.RGB)
			{
				throw Object.assign(response, {
					error: 'the colorspace must be RGB for' +
						' a' +
						' named color'
				});
			}
			this._rgb = Color._intToRgb(obj);
		}
		else if (Array.isArray(obj))
		{
			Color._checkTypeAndRange(obj);
			let [a, b, c] = obj;
			if (colorspace !== Color.COLOR_SPACE.RGB255)
			{
				Color._checkTypeAndRange(obj, [-1, 1]);
				a = (a + 1.0) / 2.0;
				b = (b + 1.0) / 2.0;
				c = (c + 1.0) / 2.0;
			}
			switch (colorspace)
			{
				case Color.COLOR_SPACE.RGB255:
					Color._checkTypeAndRange(obj, [0, 255]);
					this._rgb = [a / 255.0, b / 255.0, c / 255.0];
					break;
				case Color.COLOR_SPACE.RGB:
					this._rgb = [a, b, c];
					break;
				case Color.COLOR_SPACE.HSV:
					break;
				case Color.COLOR_SPACE.DKL:
					break;
				case Color.COLOR_SPACE.LMS:
					break;
				default:
					throw Object.assign(response, {error: 'unknown colorspace: ' + colorspace});
			}
		}
		else if (obj instanceof Color)
		{
			this._rgb = obj._rgb.slice();
		}
	}
	get rgb()
	{
		return this._rgb;
	}
	get rgb255()
	{
		return [Math.round(this._rgb[0] * 255.0), Math.round(this._rgb[1] * 255.0), Math.round(this._rgb[2] * 255.0)];
	}
	get hex()
	{
		if (typeof this._hex === 'undefined')
		{
			this._hex = Color._rgbToHex(this._rgb);
		}
		return this._hex;
	}
	get int()
	{
		if (typeof this._int === 'undefined')
		{
			this._int = Color._rgbToInt(this._rgb);
		}
		return this._int;
	}
	toString()
	{
		return this.hex;
	}
	static hexToRgb255(hex)
	{
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		if (result == null)
		{
			throw {
				origin: 'Color.hexToRgb255',
				context: 'when converting an hexadecimal color code to its 255- or [0,1]-based RGB color representation',
				error: 'unable to parse the argument: wrong type or wrong code'
			};
		}
		return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
	}
	static hexToRgb(hex)
	{
		const [r255, g255, b255] = Color.hexToRgb255(hex);
		return [r255 / 255.0, g255 / 255.0, b255 / 255.0];
	}
	static rgb255ToHex(rgb255)
	{
		const response = {
			origin: 'Color.rgb255ToHex',
			context: 'when converting an rgb triplet to its hexadecimal color representation'
		};
		try
		{
			Color._checkTypeAndRange(rgb255, [0, 255]);
			return Color._rgb255ToHex(rgb255);
		}
		catch (error)
		{
			throw Object.assign(response, {error});
		}
	}
	static rgbToHex(rgb)
	{
		const response = {
			origin: 'Color.rgbToHex',
			context: 'when converting an rgb triplet to its hexadecimal color representation'
		};
		try
		{
			Color._checkTypeAndRange(rgb, [0, 1]);
			return Color._rgbToHex(rgb);
		}
		catch (error)
		{
			throw Object.assign(response, {error});
		}
	}
	static rgbToInt(rgb)
	{
		const response = {
			origin: 'Color.rgbToInt',
			context: 'when converting an rgb triplet to its integer representation'
		};
		try
		{
			Color._checkTypeAndRange(rgb, [0, 1]);
			return Color._rgbToInt(rgb);
		}
		catch (error)
		{
			throw Object.assign(response, {error});
		}
	}
	static rgb255ToInt(rgb255)
	{
		const response = {
			origin: 'Color.rgb255ToInt',
			context: 'when converting an rgb triplet to its integer representation'
		};
		try
		{
			Color._checkTypeAndRange(rgb255, [0, 255]);
			return Color._rgb255ToInt(rgb255);
		}
		catch (error)
		{
			throw Object.assign(response, {error});
		}
	}
	static _rgb255ToHex(rgb255)
	{
		return "#" + ((1 << 24) + (rgb255[0] << 16) + (rgb255[1] << 8) + rgb255[2]).toString(16).slice(1);
	}
	static _rgbToHex(rgb)
	{
		const rgb255 = [Math.round(rgb[0] * 255), Math.round(rgb[1] * 255), Math.round(rgb[2] * 255)];
		return Color._rgb255ToHex(rgb255);
	}
	static _rgbToInt(rgb)
	{
		const rgb255 = [Math.round(rgb[0] * 255), Math.round(rgb[1] * 255), Math.round(rgb[2] * 255)];
		return Color._rgb255ToInt(rgb255);
	}
	static _rgb255ToInt(rgb255)
	{
		return rgb255[0] * 0x10000 + rgb255[1] * 0x100 + rgb255[2];
	}
	static _intToRgb255(hex)
	{
		const r255 = hex >>> 0x10;
		const g255 = (hex & 0xFF00) / 0x100;
		const b255 = hex & 0xFF;
		return [r255, g255, b255];
	}
	static _intToRgb(hex)
	{
		const [r255, g255, b255] = Color._intToRgb255(hex);
		return [r255 / 255.0, g255 / 255.0, b255 / 255.0];
	}
	static _checkTypeAndRange(arg, range = undefined)
	{
		if (!Array.isArray(arg) || arg.length !== 3 ||
			typeof arg[0] !== 'number' || typeof arg[1] !== 'number' || typeof arg[2] !== 'number')
		{
			throw 'the argument should be an array of numbers of length 3';
		}
		if (typeof range !== 'undefined' && (arg[0] < range[0] || arg[0] > range[1] || arg[1] < range[0] || arg[1] > range[1] || arg[2] < range[0] || arg[2] > range[1]))
		{
			throw 'the color components should all belong to [' + range[0] + ', ' + range[1] + ']';
		}
	}
}
Color.COLOR_SPACE = {
	RGB: Symbol.for('RGB'),
	RGB255: Symbol.for('RGB255'),
};
Color.NAMED_COLORS = {
	'aliceblue': '#F0F8FF',
	'antiquewhite': '#FAEBD7',
	'aqua': '#00FFFF',
	'aquamarine': '#7FFFD4',
	'azure': '#F0FFFF',
	'beige': '#F5F5DC',
	'bisque': '#FFE4C4',
	'black': '#000000',
	'blanchedalmond': '#FFEBCD',
	'blue': '#0000FF',
	'blueviolet': '#8A2BE2',
	'brown': '#A52A2A',
	'burlywood': '#DEB887',
	'cadetblue': '#5F9EA0',
	'chartreuse': '#7FFF00',
	'chocolate': '#D2691E',
	'coral': '#FF7F50',
	'cornflowerblue': '#6495ED',
	'cornsilk': '#FFF8DC',
	'crimson': '#DC143C',
	'cyan': '#00FFFF',
	'darkblue': '#00008B',
	'darkcyan': '#008B8B',
	'darkgoldenrod': '#B8860B',
	'darkgray': '#A9A9A9',
	'darkgrey': '#A9A9A9',
	'darkgreen': '#006400',
	'darkkhaki': '#BDB76B',
	'darkmagenta': '#8B008B',
	'darkolivegreen': '#556B2F',
	'darkorange': '#FF8C00',
	'darkorchid': '#9932CC',
	'darkred': '#8B0000',
	'darksalmon': '#E9967A',
	'darkseagreen': '#8FBC8B',
	'darkslateblue': '#483D8B',
	'darkslategray': '#2F4F4F',
	'darkslategrey': '#2F4F4F',
	'darkturquoise': '#00CED1',
	'darkviolet': '#9400D3',
	'deeppink': '#FF1493',
	'deepskyblue': '#00BFFF',
	'dimgray': '#696969',
	'dimgrey': '#696969',
	'dodgerblue': '#1E90FF',
	'firebrick': '#B22222',
	'floralwhite': '#FFFAF0',
	'forestgreen': '#228B22',
	'fuchsia': '#FF00FF',
	'gainsboro': '#DCDCDC',
	'ghostwhite': '#F8F8FF',
	'gold': '#FFD700',
	'goldenrod': '#DAA520',
	'gray': '#808080',
	'grey': '#808080',
	'green': '#008000',
	'greenyellow': '#ADFF2F',
	'honeydew': '#F0FFF0',
	'hotpink': '#FF69B4',
	'indianred': '#CD5C5C',
	'indigo': '#4B0082',
	'ivory': '#FFFFF0',
	'khaki': '#F0E68C',
	'lavender': '#E6E6FA',
	'lavenderblush': '#FFF0F5',
	'lawngreen': '#7CFC00',
	'lemonchiffon': '#FFFACD',
	'lightblue': '#ADD8E6',
	'lightcoral': '#F08080',
	'lightcyan': '#E0FFFF',
	'lightgoldenrodyellow': '#FAFAD2',
	'lightgray': '#D3D3D3',
	'lightgrey': '#D3D3D3',
	'lightgreen': '#90EE90',
	'lightpink': '#FFB6C1',
	'lightsalmon': '#FFA07A',
	'lightseagreen': '#20B2AA',
	'lightskyblue': '#87CEFA',
	'lightslategray': '#778899',
	'lightslategrey': '#778899',
	'lightsteelblue': '#B0C4DE',
	'lightyellow': '#FFFFE0',
	'lime': '#00FF00',
	'limegreen': '#32CD32',
	'linen': '#FAF0E6',
	'magenta': '#FF00FF',
	'maroon': '#800000',
	'mediumaquamarine': '#66CDAA',
	'mediumblue': '#0000CD',
	'mediumorchid': '#BA55D3',
	'mediumpurple': '#9370DB',
	'mediumseagreen': '#3CB371',
	'mediumslateblue': '#7B68EE',
	'mediumspringgreen': '#00FA9A',
	'mediumturquoise': '#48D1CC',
	'mediumvioletred': '#C71585',
	'midnightblue': '#191970',
	'mintcream': '#F5FFFA',
	'mistyrose': '#FFE4E1',
	'moccasin': '#FFE4B5',
	'navajowhite': '#FFDEAD',
	'navy': '#000080',
	'oldlace': '#FDF5E6',
	'olive': '#808000',
	'olivedrab': '#6B8E23',
	'orange': '#FFA500',
	'orangered': '#FF4500',
	'orchid': '#DA70D6',
	'palegoldenrod': '#EEE8AA',
	'palegreen': '#98FB98',
	'paleturquoise': '#AFEEEE',
	'palevioletred': '#DB7093',
	'papayawhip': '#FFEFD5',
	'peachpuff': '#FFDAB9',
	'peru': '#CD853F',
	'pink': '#FFC0CB',
	'plum': '#DDA0DD',
	'powderblue': '#B0E0E6',
	'purple': '#800080',
	'red': '#FF0000',
	'rosybrown': '#BC8F8F',
	'royalblue': '#4169E1',
	'saddlebrown': '#8B4513',
	'salmon': '#FA8072',
	'sandybrown': '#F4A460',
	'seagreen': '#2E8B57',
	'seashell': '#FFF5EE',
	'sienna': '#A0522D',
	'silver': '#C0C0C0',
	'skyblue': '#87CEEB',
	'slateblue': '#6A5ACD',
	'slategray': '#708090',
	'slategrey': '#708090',
	'snow': '#FFFAFA',
	'springgreen': '#00FF7F',
	'steelblue': '#4682B4',
	'tan': '#D2B48C',
	'teal': '#008080',
	'thistle': '#D8BFD8',
	'tomato': '#FF6347',
	'turquoise': '#40E0D0',
	'violet': '#EE82EE',
	'wheat': '#F5DEB3',
	'white': '#FFFFFF',
	'whitesmoke': '#F5F5F5',
	'yellow': '#FFFF00',
	'yellowgreen': '#9ACD32'
};

/**
 * Color Mixin.
 *
 * @author Alain Pitiot
 * @version 2020.5
 * @copyright (c) 2020 Ilixa Ltd. ({@link http://ilixa.com})
 * @license Distributed under the terms of the MIT License
 */
let ColorMixin = (superclass) => class extends superclass
{
	constructor(args)
	{
		super(args);
	}
	setColor(color, log)
	{
		this._setAttribute('color', color, log);
		this._needUpdate = true;
	}
	setContrast(contrast, log)
	{
		this._setAttribute('contrast', contrast, log);
		this._needUpdate = true;
	}
	getContrastedColor(color, contrast)
	{
		const rgb = color.rgb.map(c => (c * 2.0 - 1.0) * contrast);
		return new Color(rgb, Color.COLOR_SPACE.RGB);
	}
};

/**
 * Various utilities.
 *
 * @author Alain Pitiot
 * @version 2020.5
 * @copyright (c) 2020 Ilixa Ltd. ({@link http://ilixa.com})
 * @license Distributed under the terms of the MIT License
 */
let mix = (superclass) => new MixinBuilder(superclass);
class MixinBuilder
{
	constructor(superclass)
	{
		this.superclass = superclass;
	}
	with(...mixins)
	{
		return mixins.reduce((c, mixin) => mixin(c), this.superclass);
	}
}
function promiseToTupple(promise)
{
	return promise
		.then(data => [null, data])
		.catch(error => [error, null]);
}
function makeUuid()
{
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c)
	{
		const r = Math.random() * 16 | 0, v = (c === 'x') ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}
function getErrorStack()
{
	try
	{
		throw Error('');
	}
	catch (error)
	{
		let stack = error.stack.split("\n");
		stack.splice(1, 1);
		return JSON.stringify(stack.join('\n'));
	}
}
function isEmpty(x)
{
	if (typeof x === 'undefined')
	{
		return true;
	}
	if (!Array.isArray(x))
	{
		return false;
	}
	if (x.length === 0)
	{
		return true;
	}
	if (x.length === 1 && typeof x[0] === 'undefined')
	{
		return true;
	}
	return false;
}
function detectBrowser()
{
	const isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	if (isOpera)
	{
		return 'Opera';
	}
	const isFirefox = (typeof InstallTrigger !== 'undefined');
	if (isFirefox)
	{
		return 'Firefox';
	}
	const isSafari = /constructor/i.test(window.HTMLElement) || (function (p)
	{
		return p.toString() === "[object SafariRemoteNotification]";
	})(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
	if (isSafari)
	{
		return 'Safari';
	}
	const isIE =  !!document.documentMode;
	if (isIE)
	{
		return 'IE';
	}
	const isEdge = !isIE && !!window.StyleMedia;
	if (isEdge)
	{
		return 'Edge';
	}
	const isChrome = window.chrome;
	if (isChrome)
	{
		return 'Chrome';
	}
	const isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") !== -1);
	if (isEdgeChromium)
	{
		return 'EdgeChromium';
	}
	const isBlink = (isChrome || isOpera) && !!window.CSS;
	if (isBlink)
	{
		return 'Blink';
	}
	return 'unknown';
}
function toNumerical(obj)
{
	const response = {
		origin: 'util.toNumerical',
		context: 'when converting an object to its numerical form'
	};
	try
	{
		if (obj === null)
		{
			throw 'unable to convert null to a number';
		}
		if (typeof obj === 'undefined')
		{
			throw 'unable to convert undefined to a number';
		}
		if (typeof obj === 'number')
		{
			return obj;
		}
		if (typeof obj === 'string')
		{
			obj = [obj];
		}
		if (Array.isArray(obj))
		{
			return obj.map(e =>
			{
				let n = Number.parseFloat(e);
				if (Number.isNaN(n))
				{
					throw `unable to convert ${e} to a number`;
				}
				return n;
			});
		}
		throw 'unable to convert the object to a number';
	}
	catch (error)
	{
		this._gui.dialog({ error: Object.assign(response, { error }) });
	}
}
function IsPointInsidePolygon(point, vertices)
{
	const x = point[0];
	const y = point[1];
	let isInside = false;
	for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++)
	{
		const xi = vertices[i][0], yi = vertices[i][1];
		const xj = vertices[j][0], yj = vertices[j][1];
		const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
		if (intersect)
		{
			isInside = !isInside;
		}
	}
	return isInside;
}
function shuffle(array)
{
	for (let i = array.length - 1; i > 0; i--)
	{
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}
function getPositionFromObject(object, units)
{
	const response = {
		origin: 'util.getPositionFromObject',
		context: 'when getting the position of an object'
	};
	try
	{
		if (typeof object === 'undefined')
		{
			throw 'cannot get the position of an undefined object';
		}
		let objectWin = undefined;
		if (typeof object.getPos === 'function')
		{
			units = object.units;
			objectWin = object.win;
			object = object.getPos();
		}
		return to_px(object, units, objectWin);
	}
	catch (error)
	{
		throw Object.assign(response, {error});
	}
}
function to_px(pos, posUnit, win, integerCoordinates = false)
{
	const response = {
		origin: 'util.to_px',
		context: 'when converting a position to pixel units'
	};
	let pos_px;
	if (posUnit === 'pix')
	{
		pos_px = pos;
	}
	else if (posUnit === 'norm')
	{
		pos_px = [pos[0] * win.size[0] / 2.0, pos[1] * win.size[1] / 2.0];
	}
	else if (posUnit === 'height')
	{
		const minSize = Math.min(win.size[0], win.size[1]);
		pos_px = [pos[0] * minSize, pos[1] * minSize];
	}
	else
	{
		throw Object.assign(response, {error: `unknown position units: ${posUnit}`});
	}
	if (integerCoordinates)
	{
		return [Math.round(pos_px[0]), Math.round(pos_px[1])];
	}
	else
	{
		return pos_px;
	}
}
function to_norm(pos, posUnit, win)
{
	const response = {origin: 'util.to_norm', context: 'when converting a position to norm units'};
	if (posUnit === 'norm')
	{
		return pos;
	}
	if (posUnit === 'pix')
	{
		return [pos[0] / (win.size[0] / 2.0), pos[1] / (win.size[1] / 2.0)];
	}
	if (posUnit === 'height')
	{
		const minSize = Math.min(win.size[0], win.size[1]);
		return [pos[0] * minSize / (win.size[0] / 2.0), pos[1] * minSize / (win.size[1] / 2.0)];
	}
	throw Object.assign(response, {error: `unknown position units: ${posUnit}`});
}
function to_height(pos, posUnit, win)
{
	const response = {
		origin: 'util.to_height',
		context: 'when converting a position to height units'
	};
	if (posUnit === 'height')
	{
		return pos;
	}
	if (posUnit === 'pix')
	{
		const minSize = Math.min(win.size[0], win.size[1]);
		return [pos[0] / minSize, pos[1] / minSize];
	}
	if (posUnit === 'norm')
	{
		const minSize = Math.min(win.size[0], win.size[1]);
		return [pos[0] * win.size[0] / 2.0 / minSize, pos[1] * win.size[1] / 2.0 / minSize];
	}
	throw Object.assign(response, {error: `unknown position units: ${posUnit}`});
}
function to_win(pos, posUnit, win)
{
	const response = {origin: 'util.to_win', context: 'when converting a position to window units'};
	try
	{
		if (win._units === 'pix')
		{
			return to_px(pos, posUnit, win);
		}
		if (win._units === 'norm')
		{
			return to_norm(pos, posUnit, win);
		}
		if (win._units === 'height')
		{
			return to_height(pos, posUnit, win);
		}
		throw `unknown window units: ${win._units}`;
	}
	catch (error)
	{
		throw Object.assign(response, {response, error});
	}
}
function to_unit(pos, posUnit, win, targetUnit)
{
	const response = {origin: 'util.to_unit', context: 'when converting a position to different units'};
	try
	{
		if (targetUnit === 'pix')
		{
			return to_px(pos, posUnit, win);
		}
		if (targetUnit === 'norm')
		{
			return to_norm(pos, posUnit, win);
		}
		if (targetUnit === 'height')
		{
			return to_height(pos, posUnit, win);
		}
		throw `unknown target units: ${targetUnit}`;
	}
	catch (error)
	{
		throw Object.assign(response, {error});
	}
}
function to_pixiPoint(pos, posUnit, win, integerCoordinates = false)
{
	const pos_px = to_px(pos, posUnit, win);
	if (integerCoordinates)
	{
		return new PIXI.Point(Math.round(pos_px[0]), Math.round(pos_px[1]));
	}
	else
	{
		return new PIXI.Point(pos_px[0], pos_px[1]);
	}
}
function toString(object)
{
	if (typeof object === 'undefined')
	{
		return 'undefined';
	}
	if (!object)
	{
		return 'null';
	}
	if (typeof object === 'string')
	{
		return object;
	}
	if (object.constructor.toString().substring(0, 5) === 'class' && typeof object.toString === 'function')
	{
		return object.toString();
	}
	try
	{
		const symbolReplacer = (key, value) =>
		{
			if (typeof value === 'symbol')
			{
				value = Symbol.keyFor(value);
			}
			return value;
		};
		return JSON.stringify(object, symbolReplacer);
	}
	catch (e)
	{
		return 'Object (circular)';
	}
}
if (!String.prototype.format)
{
	String.prototype.format = function ()
	{
		var args = arguments;
		return this
			.replace(/{(\d+)}/g, function (match, number)
			{
				return typeof args[number] != 'undefined' ? args[number] : match;
			})
			.replace(/{([$_a-zA-Z][$_a-zA-Z0-9]*)}/g, function (match, name)
			{
				return args.length > 0 && args[0][name] !== undefined ? args[0][name] : match;
			});
	};
}
function getRequestError(jqXHR, textStatus, errorThrown)
{
	let errorMsg = 'unknown error';
	if (typeof jqXHR.responseJSON !== 'undefined')
	{
		errorMsg = jqXHR.responseJSON;
	}
	else if (typeof jqXHR.responseText !== 'undefined')
	{
		errorMsg = jqXHR.responseText;
	}
	else if (typeof errorThrown !== 'undefined')
	{
		errorMsg = errorThrown;
	}
	return errorMsg;
}
function isInt(obj)
{
	if (isNaN(obj))
	{
		return false;
	}
	const x = parseFloat(obj);
	return (x | 0) === x;
}
function getUrlParameters()
{
	const urlQuery = window.location.search.slice(1);
	return new URLSearchParams(urlQuery);
}
function addInfoFromUrl(info)
{
	const infoFromUrl = getUrlParameters();
	infoFromUrl.forEach((value, key) =>
	{
		if (key.indexOf('__') !== 0)
		{
			info[key] = value;
		}
	});
	return info;
}
function selectFromArray(array, selection)
{
	if (isInt(selection))
	{
		return array[parseInt(selection)];
	}
	else if (Array.isArray(selection))
	{
		return array.filter((e, i) => (selection.includes(i)));
	}
	else if (typeof selection === 'string')
	{
		if (selection.indexOf(',') > -1)
		{
			return selection.split(',').map(a => selectFromArray(array, a));
		}
		else if (selection.indexOf(':') > -1)
		{
			let sliceParams = selection.split(':').map(a => parseInt(a));
			if (sliceParams.length === 3)
			{
				return sliceArray(array, sliceParams[0], sliceParams[2], sliceParams[1]);
			}
			else
			{
				return sliceArray(array, ...sliceParams);
			}
		}
	}
	else
	{
		throw {
			origin: 'selectFromArray',
			context: 'when selecting entries from an array',
			error: 'unknown selection type: ' + (typeof selection)
		};
	}
}
function flattenArray(array)
{
	return array.reduce(
		(flat, next) =>
		{
			flat.push((Array.isArray(next) && Array.isArray(next[0])) ? flattenArray(next) : next);
			return flat;
		},
		[]
	);
}
function sliceArray(array, from = NaN, to = NaN, step = NaN)
{
	if (isNaN(from))
	{
		from = 0;
	}
	if (isNaN(to))
	{
		to = array.length;
	}
	let arraySlice = array.slice(from, to);
	if (isNaN(step))
	{
		return arraySlice;
	}
	if (step < 0)
	{
		arraySlice.reverse();
	}
	step = Math.abs(step);
	if (step === 1)
	{
		return arraySlice;
	}
	else
	{
		return arraySlice.filter((e, i) => (i % step === 0));
	}
}
function offerDataForDownload(filename, data, type)
{
	const blob = new Blob([data], {type});
	if (window.navigator.msSaveOrOpenBlob)
	{
		window.navigator.msSaveBlob(blob, filename);
	}
	else
	{
		let elem = window.document.createElement('a');
		elem.href = window.URL.createObjectURL(blob);
		elem.download = filename;
		document.body.appendChild(elem);
		elem.click();
		document.body.removeChild(elem);
	}
}
function randint(min = 0, max)
{
	let lo = min;
	let hi = max;
	if (typeof max === 'undefined')
	{
		hi = lo;
		lo = 0;
	}
	if (hi < lo)
	{
		throw {
			origin: 'util.randint',
			context: 'when generating a random integer',
			error: 'min should be <= max'
		};
	}
	return Math.floor(Math.random() * (hi - lo)) + lo;
}
function round(input, places = 0)
{
	return +(Math.round(`${input}e+${places}`) + `e-${places}`);
}
function sum(inputMaybe = [])
{
	const input = Array.isArray(inputMaybe) ? inputMaybe : [];
	const add = (a, b) => a + b;
	return input
		.map(value => Number(value))
		.filter(value => Number.isNaN(value) === false)
		.reduce(add, 0);
}

/**
 * Event Emitter.
 *
 * @author Alain Pitiot
 * @version 2020.5
 * @copyright (c) 2020 Ilixa Ltd. ({@link http://ilixa.com})
 * @license Distributed under the terms of the MIT License
 */
class EventEmitter
{
	constructor()
	{
		this._listeners = new Map();
		this._onceUuids = new Map();
	}
	on(name, listener)
	{
		if (typeof listener !== 'function')
		{
			throw new TypeError('listener must be a function');
		}
		let uuid = makeUuid();
		if (!this._listeners.has(name))
		{
			this._listeners.set(name, []);
		}
		this._listeners.get(name).push({uuid, listener});
		return uuid;
	}
	once(name, listener)
	{
		let uuid = this.on(name, listener);
		if (!this._onceUuids.has(name))
		{
			this._onceUuids.set(name, []);
		}
		this._onceUuids.get(name).push(uuid);
		return uuid;
	}
	off(name, uuid)
	{
		let relevantUuidListeners = this._listeners.get(name);
		if (relevantUuidListeners && relevantUuidListeners.length)
		{
			this._listeners.set(name, relevantUuidListeners.filter(uuidlistener => (uuidlistener.uuid != uuid)));
			return true;
		}
		return false;
	}
	emit(name, data)
	{
		let relevantUuidListeners = this._listeners.get(name);
		if (relevantUuidListeners && relevantUuidListeners.length)
		{
			let onceUuids = this._onceUuids.get(name);
			let self = this;
			relevantUuidListeners.forEach(({uuid, listener}) =>
			{
				listener(data);
				if (typeof onceUuids !== 'undefined' && onceUuids.includes(uuid))
				{
					self.off(name, uuid);
				}
			});
			return true;
		}
		return false;
	}
}

/**
 * Core Object.
 *
 * @author Alain Pitiot
 * @version 2020.5
 * @copyright (c) 2020 Ilixa Ltd. ({@link http://ilixa.com})
 * @license Distributed under the terms of the MIT License
 */
class PsychObject extends EventEmitter
{
	constructor(psychoJS, name)
	{
		super();
		this._psychoJS = psychoJS;
		this._userAttributes = new Set();
		if (typeof name === 'undefined')
		{
			name = this.constructor.name;
		}
		this._addAttribute('name', name);
	}
	get psychoJS()
	{
		return this._psychoJS;
	}
	set psychoJS(psychoJS)
	{
		this._psychoJS = psychoJS;
	}
	toString()
	{
		let representation = this.constructor.name + '( ';
		let addComma = false;
		for (const attribute of this._userAttributes)
		{
			if (addComma)
			{
				representation += ', ';
			}
			addComma = true;
			let value = toString(this['_' + attribute]);
			const l = value.length;
			if (l > 50)
			{
				if (value[l - 1] === ')')
				{
					value = value.substring(0, 50) + '~)';
				}
				else
				{
					value = value.substring(0, 50) + '~';
				}
			}
			representation += attribute + '=' + value;
		}
		representation += ' )';
		return representation;
	}
	_setAttribute(attributeName, attributeValue, log = false, operation = undefined, stealth = false)
	{
		const response = {origin: 'PsychObject.setAttribute', context: 'when setting the attribute of an object'};
		if (typeof attributeName == 'undefined')
		{
			throw Object.assign(response, {
				error: 'the attribute name cannot be' +
					' undefined'
			});
		}
		if (typeof attributeValue == 'undefined')
		{
			this._psychoJS.logger.warn('setting the value of attribute: ' + attributeName + ' in PsychObject: ' + this._name + ' as: undefined');
		}
		if (typeof operation !== 'undefined' && this.hasOwnProperty('_' + attributeName))
		{
			let oldValue = this['_' + attributeName];
			if (typeof attributeValue == 'number' || (Array.isArray(attributeValue) && (attributeValue.length === 0 || typeof attributeValue[0] == 'number')))
			{
				if (Array.isArray(attributeValue))
				{
					if (Array.isArray(oldValue))
					{
						if (attributeValue.length !== oldValue.length)
						{
							throw Object.assign(response, {
								error: 'old and new' +
									' value should have' +
									' the same size when they are both arrays'
							});
						}
						switch (operation)
						{
							case '':
								break;
							case '+':
								attributeValue = attributeValue.map((v, i) => oldValue[i] + v);
								break;
							case '*':
								attributeValue = attributeValue.map((v, i) => oldValue[i] * v);
								break;
							case '-':
								attributeValue = attributeValue.map((v, i) => oldValue[i] - v);
								break;
							case '/':
								attributeValue = attributeValue.map((v, i) => oldValue[i] / v);
								break;
							case '**':
								attributeValue = attributeValue.map((v, i) => oldValue[i] ** v);
								break;
							case '%':
								attributeValue = attributeValue.map((v, i) => oldValue[i] % v);
								break;
							default:
								throw Object.assign(response, {
									error: 'unsupported' +
										' operation: ' + operation + ' when setting: ' + attributeName + ' in: ' + this.name
								});
						}
					}
					else
					{
						switch (operation)
						{
							case '':
								break;
							case '+':
								attributeValue = attributeValue.map(v => oldValue + v);
								break;
							case '*':
								attributeValue = attributeValue.map(v => oldValue * v);
								break;
							case '-':
								attributeValue = attributeValue.map(v => oldValue - v);
								break;
							case '/':
								attributeValue = attributeValue.map(v => oldValue / v);
								break;
							case '**':
								attributeValue = attributeValue.map(v => oldValue ** v);
								break;
							case '%':
								attributeValue = attributeValue.map(v => oldValue % v);
								break;
							default:
								throw Object.assign(response, {
									error: 'unsupported' +
										' value: ' + JSON.stringify(attributeValue) + ' for' +
										' operation: ' + operation + ' when setting: ' + attributeName + ' in: ' + this.name
								});
						}
					}
				}
				else
				{
					if (Array.isArray(oldValue))
					{
						switch (operation)
						{
							case '':
								attributeValue = oldValue.map(v => attributeValue);
								break;
							case '+':
								attributeValue = oldValue.map(v => v + attributeValue);
								break;
							case '*':
								attributeValue = oldValue.map(v => v * attributeValue);
								break;
							case '-':
								attributeValue = oldValue.map(v => v - attributeValue);
								break;
							case '/':
								attributeValue = oldValue.map(v => v / attributeValue);
								break;
							case '**':
								attributeValue = oldValue.map(v => v ** attributeValue);
								break;
							case '%':
								attributeValue = oldValue.map(v => v % attributeValue);
								break;
							default:
								throw Object.assign(response, {
									error: 'unsupported' +
										' operation: ' + operation + ' when setting: ' + attributeName + ' in: ' + this.name
								});
						}
					}
					else
					{
						switch (operation)
						{
							case '':
								break;
							case '+':
								attributeValue = oldValue + attributeValue;
								break;
							case '*':
								attributeValue = oldValue * attributeValue;
								break;
							case '-':
								attributeValue = oldValue - attributeValue;
								break;
							case '/':
								attributeValue = oldValue / attributeValue;
								break;
							case '**':
								attributeValue = oldValue ** attributeValue;
								break;
							case '%':
								attributeValue = oldValue % attributeValue;
								break;
							default:
								throw Object.assign(response, {
									error: 'unsupported' +
										' value: ' + JSON.stringify(attributeValue) + ' for operation: ' + operation + ' when setting: ' + attributeName + ' in: ' + this.name
								});
						}
					}
				}
			}
			else
			{
				throw Object.assign(response, {error: 'operation: ' + operation + ' is invalid for old value: ' + JSON.stringify(oldValue) + ' and new value: ' + JSON.stringify(attributeValue)});
			}
		}
		if (!stealth && (log || this._autoLog) && (typeof this.win !== 'undefined'))
		{
			const msg = this.name + ": " + attributeName + " = " + toString(attributeValue);
			this.win.logOnFlip({
				msg,
			});
		}
		const previousAttributeValue = this['_' + attributeName];
		this['_' + attributeName] = attributeValue;
		return (typeof previousAttributeValue !== 'undefined' && attributeValue !== previousAttributeValue);
	}
	_addAttributes(cls, ...args)
	{
		const callLine = cls.toString().match(/this.*\._addAttributes\(.*\;/)[0];
		const startIndex = callLine.indexOf('._addAttributes(') + 16;
		const endIndex = callLine.indexOf(');');
		const callArgs = callLine.substr(startIndex, endIndex - startIndex).split(',').map((s) => s.trim());
		const attributeMap = new Map();
		for (let i = 1; i < callArgs.length; ++i)
		{
			attributeMap.set(callArgs[i], args[i - 1]);
		}
		for (let [name, value] of attributeMap.entries())
		{
			this._addAttribute(name, value);
		}
	}
	_addAttribute(name, value, defaultValue, onChange = () => {})
	{
		const getPropertyName = 'get' + name[0].toUpperCase() + name.substr(1);
		if (typeof this[getPropertyName] === 'undefined')
		{
			this[getPropertyName] = () => this['_' + name];
		}
		const setPropertyName = 'set' + name[0].toUpperCase() + name.substr(1);
		if (typeof this[setPropertyName] === 'undefined')
		{
			this[setPropertyName] = (value, log = false) =>
			{
				if (typeof value === 'undefined' || value === null)
				{
					value = defaultValue;
				}
				const hasChanged = this._setAttribute(name, value, log);
				if (hasChanged)
				{
					onChange();
				}
			};
		}
		else
		{
			if (typeof value === 'undefined' || value === null)
			{
				value = defaultValue;
			}
		}
		Object.defineProperty(this, name, {
			configurable: true,
			get()
			{
				return this[getPropertyName]();
			},
			set(value)
			{
				this[setPropertyName](value);
			}
		});
		this[name] = value;
		this._userAttributes.add(name);
	}
}

/**
 * Scheduler.
 *
 * @author Alain Pitiot
 * @version 2020.5
 * @copyright (c) 2020 Ilixa Ltd. ({@link http://ilixa.com})
 * @license Distributed under the terms of the MIT License
 */
class Scheduler
{
	constructor(psychoJS)
	{
		this._psychoJS = psychoJS;
		this._taskList = [];
		this._currentTask = undefined;
		this._argsList = [];
		this._currentArgs = undefined;
		this._stopAtNextUpdate = false;
		this._stopAtNextTask = false;
		this._status = Scheduler.Status.STOPPED;
	}
	get status()
	{
		return this._status;
	}
	add(task, ...args)
	{
		this._taskList.push(task);
		this._argsList.push(args);
	}
	addConditional(condition, thenScheduler, elseScheduler)
	{
		const self = this;
		let task = function ()
		{
			if (condition())
			{
				self.add(thenScheduler);
			}
			else
			{
				self.add(elseScheduler);
			}
			return Scheduler.Event.NEXT;
		};
		this.add(task);
	}
	start()
	{
		const self = this;
		let update = () =>
		{
			if (self._stopAtNextUpdate)
			{
				self._status = Scheduler.Status.STOPPED;
				return;
			}
			const state = self._runNextTasks();
			if (state === Scheduler.Event.QUIT)
			{
				self._status = Scheduler.Status.STOPPED;
				return;
			}
			self._psychoJS.window.render();
			requestAnimationFrame(update);
		};
		requestAnimationFrame(update);
	}
	stop()
	{
		this._status = Scheduler.Status.STOPPED;
		this._stopAtNextTask = true;
		this._stopAtNextUpdate = true;
	}
	_runNextTasks()
	{
		this._status = Scheduler.Status.RUNNING;
		let state = Scheduler.Event.NEXT;
		while (state === Scheduler.Event.NEXT)
		{
			if (this._stopAtNextTask)
			{
				return Scheduler.Event.QUIT;
			}
			if (typeof this._currentTask == 'undefined')
			{
				if (this._taskList.length > 0)
				{
					this._currentTask = this._taskList.shift();
					this._currentArgs = this._argsList.shift();
				}
				else
				{
					this._currentTask = undefined;
					this._currentArgs = undefined;
					return Scheduler.Event.QUIT;
				}
			}
			if (this._currentTask instanceof Function)
			{
				state = this._currentTask(...this._currentArgs);
			}
			else
			{
				state = this._currentTask._runNextTasks();
				if (state === Scheduler.Event.QUIT)
				{
					if (!this._psychoJS.experiment.experimentEnded)
					{
						state = Scheduler.Event.NEXT;
					}
				}
			}
			if (state !== Scheduler.Event.FLIP_REPEAT)
			{
				this._currentTask = undefined;
				this._currentArgs = undefined;
			}
		}
		return state;
	}
}
Scheduler.Event = {
	NEXT: Symbol.for('NEXT'),
	FLIP_REPEAT: Symbol.for('FLIP_REPEAT'),
	FLIP_NEXT: Symbol.for('FLIP_NEXT'),
	QUIT: Symbol.for('QUIT')
};
Scheduler.Status = {
	RUNNING: Symbol.for('RUNNING'),
	STOPPED: Symbol.for('STOPPED')
};

export { Clock, Color, ColorMixin, CountdownTimer, EventEmitter, IsPointInsidePolygon, MonotonicClock, PsychObject, Scheduler, addInfoFromUrl, detectBrowser, flattenArray, getErrorStack, getPositionFromObject, getRequestError, getUrlParameters, isEmpty, isInt, makeUuid, mix, offerDataForDownload, promiseToTupple, randint, round, selectFromArray, shuffle, sliceArray, sum, toNumerical, toString, to_height, to_norm, to_pixiPoint, to_px, to_unit, to_win };
