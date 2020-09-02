import { Color } from './util-2020.2.js';
import { ColorMixin } from './util-2020.2.js';
import { mix, toNumerical, getPositionFromObject, toString, to_unit, to_pixiPoint, to_px, shuffle, IsPointInsidePolygon } from './util-2020.2.js';
import { TrialHandler } from './data-2020.2.js';
import { MinimalStim } from './core-2020.2.js';
import { WindowMixin } from './core-2020.2.js';
import { Clock } from './util-2020.2.js';
import { PsychoJS } from './core-2020.2.js';

/**
 * Base class for all visual stimuli.
 *
 * @author Alain Pitiot
 * @version 2020.5
 * @copyright (c) 2020 Ilixa Ltd. ({@link http://ilixa.com})
 * @license Distributed under the terms of the MIT License
 */
class VisualStim extends mix(MinimalStim).with(WindowMixin)
{
	constructor({name, win, units, ori, opacity, depth, pos, size, clipMask, autoDraw, autoLog} = {})
	{
		super({win, name, autoDraw, autoLog});
		this._addAttribute(
			'units',
			units,
			(typeof win !== 'undefined' && win !== null) ? win.units : 'height',
			this._onChange(true, true)
		);
		this._addAttribute(
			'pos',
			pos,
			[0, 0]
		);
		this._addAttribute(
			'size',
			size,
			undefined
		);
		this._addAttribute(
			'ori',
			ori,
			0.0
		);
		this._addAttribute(
			'opacity',
			opacity,
			1.0,
			this._onChange(false, false)
		);
		this._addAttribute(
			'depth',
			depth,
			0,
			this._onChange(false, false)
		);
		this._addAttribute(
			'clipMask',
			clipMask,
			null,
			this._onChange(true, false)
		);
		this._addAttribute('boundingBox', PIXI.Rectangle.EMPTY);
		this._needUpdate = true;
		this._needPixiUpdate = true;
	}
	refresh()
	{
		this._onChange(true, true)();
	}
	setSize(size, log = false)
	{
		if (typeof size !== 'undefined' && size !== null)
		{
			size = toNumerical(size);
			if (!Array.isArray(size))
			{
				size = [size, size];
			}
		}
		const hasChanged = this._setAttribute('size', size, log);
		if (hasChanged)
		{
			this._onChange(true, true)();
		}
	}
	setOri(ori, log = false)
	{
		const hasChanged = this._setAttribute('ori', ori, log);
		if (hasChanged)
		{
			let radians = -ori * 0.017453292519943295;
			this._rotationMatrix = [[Math.cos(radians), -Math.sin(radians)],
				[Math.sin(radians), Math.cos(radians)]];
			this._onChange(true, true)();
		}
	}
	setPos(pos, log = false)
	{
		const prevPos = this._pos;
		const hasChanged = this._setAttribute('pos', toNumerical(pos), log);
		if (hasChanged)
		{
			this._needUpdate = true;
			this._boundingBox.x += this._pos[0] - prevPos[0];
			this._boundingBox.y += this._pos[1] - prevPos[1];
		}
	}
	contains(object, units)
	{
		const objectPos_px = getPositionFromObject(object, units);
		if (typeof objectPos_px === 'undefined')
		{
			throw {
				origin: 'VisualStim.contains',
				context: 'when determining whether VisualStim: ' + this._name + ' contains object: ' + toString(object),
				error: 'unable to determine the position of the object'
			};
		}
		return this._getBoundingBox_px().contains(objectPos_px[0], objectPos_px[1]);
	}
	_estimateBoundingBox()
	{
		throw {
			origin: 'VisualStim._estimateBoundingBox',
			context: `when estimating the bounding box of visual stimulus: ${this._name}`,
			error: 'this method is abstract and should not be called.'
		};
	}
	_getBoundingBox_px()
	{
		if (this._units === 'pix')
		{
			return this._boundingBox.clone();
		}
		else if (this._units === 'norm')
		{
			return new PIXI.Rectangle(
				this._boundingBox.x * this._win.size[0] / 2,
				this._boundingBox.y * this._win.size[1] / 2,
				this._boundingBox.width * this._win.size[0] / 2,
				this._boundingBox.height * this._win.size[1] / 2
			);
		}
		else if (this._units === 'height')
		{
			const minSize = Math.min(this._win.size[0], this._win.size[1]);
			return new PIXI.Rectangle(
				this._boundingBox.x * minSize,
				this._boundingBox.y * minSize,
				this._boundingBox.width * minSize,
				this._boundingBox.height * minSize
			);
		}
		else
		{
			throw Object.assign(response, {error: `unknown units: ${this._units}`});
		}
	}
	_onChange(withPixi = false, withBoundingBox = false)
	{
		return () =>
		{
			this._needUpdate = true;
			if (withPixi)
			{
				this._needPixiUpdate = true;
			}
			if (withBoundingBox)
			{
				this._estimateBoundingBox();
			}
		};
	}
}

/**
 * Text Stimulus.
 *
 * @author Alain Pitiot
 * @version 2020.5
 * @copyright (c) 2020 Ilixa Ltd. ({@link http://ilixa.com})
 * @license Distributed under the terms of the MIT License
 */
class TextStim extends mix(VisualStim).with(ColorMixin)
{
	constructor({name, win, text, font, pos, color, opacity, depth, contrast, units, ori, height, bold, italic, alignHoriz, alignVert, wrapWidth, flipHoriz, flipVert, clipMask, autoDraw, autoLog} = {})
	{
		super({name, win, units, ori, opacity, depth, pos, clipMask, autoDraw, autoLog});
		const onChange = (withPixi = false, withBoundingBox = false, withMetrics = false) =>
		{
			const visualOnChange = this._onChange(withPixi, withBoundingBox);
			return () =>
			{
				visualOnChange();
				if (withMetrics)
				{
					this._textMetrics = undefined;
				}
			};
		};
		this._addAttribute(
			'text',
			text,
			'Hello World',
			onChange(true, true, true)
		);
		this._addAttribute(
			'alignHoriz',
			alignHoriz,
			'center',
			onChange(true, true, true)
		);
		this._addAttribute(
			'alignVert',
			alignVert,
			'center',
			onChange(true, true, true)
		);
		this._addAttribute(
			'flipHoriz',
			flipHoriz,
			false,
			onChange(true, true, true)
		);
		this._addAttribute(
			'flipVert',
			flipVert,
			false,
			onChange(true, true, true)
		);
		this._addAttribute(
			'font',
			font,
			'Arial',
			this._onChange(true, true)
		);
		this._addAttribute(
			'height',
			height,
			this._getDefaultLetterHeight(),
			onChange(true, true, true)
		);
		this._addAttribute(
			'wrapWidth',
			wrapWidth,
			this._getDefaultWrapWidth(),
			onChange(true, true, true)
		);
		this._addAttribute(
			'bold',
			bold,
			false,
			onChange(true, true, true)
		);
		this._addAttribute(
			'italic',
			italic,
			false,
			onChange(true, true, true)
		);
		this._addAttribute(
			'color',
			color,
			'white',
			this._onChange(true, false)
		);
		this._addAttribute(
			'contrast',
			contrast,
			1.0,
			this._onChange(true, false)
		);
		this._estimateBoundingBox();
		if (this._autoLog)
		{
			this._psychoJS.experimentLogger.exp(`Created ${this.name} = ${this.toString()}`);
		}
	}
	getTextMetrics()
	{
		if (typeof this._textMetrics === 'undefined')
		{
			this._textMetrics = PIXI.TextMetrics.measureText(this._text, this._getTextStyle());
		}
		return this._textMetrics;
	}
	_getDefaultLetterHeight()
	{
		const height = TextStim._defaultLetterHeightMap.get(this._units);
		if (typeof height === 'undefined')
		{
			throw {
				origin: 'TextStim._getDefaultLetterHeight',
				context: 'when getting the default height of TextStim: ' + this._name,
				error: 'no default letter height for unit: ' + this._units
			};
		}
		return height;
	}
	_getDefaultWrapWidth()
	{
		const wrapWidth = TextStim._defaultWrapWidthMap.get(this._units);
		if (typeof wrapWidth === 'undefined')
		{
			throw {
				origin: 'TextStim._getDefaultWrapWidth',
				context: 'when getting the default wrap width of TextStim: ' + this._name,
				error: 'no default wrap width for unit: ' + this._units
			};
		}
		return wrapWidth;
	}
	_estimateBoundingBox()
	{
		const textMetrics = this.getTextMetrics();
		const textSize =  to_unit(
			[textMetrics.width, textMetrics.height],
			'pix',
			this._win,
			this._units
		);
		const anchor = this._getAnchor();
		this._boundingBox = new PIXI.Rectangle(
			this._pos[0] - anchor[0] * textSize[0],
			this._pos[1] - anchor[1] * textSize[1],
			textSize[0],
			textSize[1]
		);
	}
	_getTextStyle()
	{
		return new PIXI.TextStyle({
			fontFamily: this._font,
			fontSize: Math.round(this._getLengthPix(this._height)),
			fontWeight: (this._bold) ? 'bold' : 'normal',
			fontStyle: (this._italic) ? 'italic' : 'normal',
			fill: this.getContrastedColor(new Color(this._color), this._contrast).hex,
			align: this._alignHoriz,
			wordWrap: (typeof this._wrapWidth !== 'undefined'),
			wordWrapWidth: (typeof this._wrapWidth !== 'undefined') ? this._getHorLengthPix(this._wrapWidth) : 0
		});
	}
	_updateIfNeeded()
	{
		if (!this._needUpdate)
		{
			return;
		}
		this._needUpdate = false;
		if (this._needPixiUpdate)
		{
			this._needPixiUpdate = false;
			if (typeof this._pixi !== 'undefined')
			{
				this._pixi.destroy(true);
			}
			this._pixi = new PIXI.Text(this._text, this._getTextStyle());
		}
		const anchor = this._getAnchor();
		[this._pixi.anchor.x, this._pixi.anchor.y] = anchor;
		this._pixi.scale.x = this._flipHoriz ? -1 : 1;
		this._pixi.scale.y = this._flipVert ? 1 : -1;
		this._pixi.rotation = this._ori * Math.PI / 180;
		this._pixi.position = to_pixiPoint(this.pos, this.units, this.win);
		this._pixi.alpha = this._opacity;
		this._pixi.zIndex = this._depth;
		this._pixi.mask = this._clipMask;
		this._size = [
			this._getLengthUnits(Math.abs(this._pixi.width)),
			this._getLengthUnits(Math.abs(this._pixi.height))
		];
		this._boundingBox = new PIXI.Rectangle(
			this._pos[0] - anchor[0] * this._size[0],
			this._pos[1] - anchor[1] * this._size[1],
			this._size[0],
			this._size[1]
		);
	}
	_getAnchor()
	{
		let anchor = [];
		switch (this._alignHoriz)
		{
			case 'left':
				anchor.push(0);
				break;
			case 'right':
				anchor.push(1);
				break;
			default:
			case 'center':
				anchor.push(0.5);
		}
		switch (this._alignVert)
		{
			case 'top':
				anchor.push(0);
				break;
			case 'bottom':
				anchor.push(1);
				break;
			default:
			case 'center':
				anchor.push(0.5);
		}
		return anchor;
	}
}
TextStim._defaultLetterHeightMap = new Map([
	['cm', 1.0],
	['deg', 1.0],
	['degs', 1.0],
	['degFlatPos', 1.0],
	['degFlat', 1.0],
	['norm', 0.1],
	['height', 0.2],
	['pix', 20],
	['pixels', 20]
]);
TextStim._defaultWrapWidthMap = new Map([
	['cm', 15.0],
	['deg', 15.0],
	['degs', 15.0],
	['degFlatPos', 15.0],
	['degFlat', 15.0],
	['norm', 1],
	['height', 1],
	['pix', 500],
	['pixels', 500]
]);

/**
 * TextInput encapsulates an html <input> element into a PIXI Container.
 *
 * @author 'Mwni' (https://github.com/Mwni)
 * @copyright (c) 2018 Mwni
 * @license Distributed under the terms of the MIT License
 *
 * @note TextInput was initially developed by 'Mwni' and is available under the MTI License.
 * We are currently using it almost as is but will be making modification in the near future.
 */
class TextInput extends PIXI.Container
{
	constructor(styles)
	{
		super();
		this._input_style = Object.assign(
			{
				position: 'absolute',
				background: 'none',
				border: 'none',
				outline: 'none',
				transformOrigin: '0 0',
				lineHeight: '1'
			},
			styles.input
		);
		if (styles.box)
		{
			this._box_generator = typeof styles.box === 'function' ? styles.box : new DefaultBoxGenerator(styles.box);
		}
		else
		{
			this._box_generator = null;
		}
		if (this._input_style.hasOwnProperty('multiline'))
		{
			this._multiline = !!this._input_style.multiline;
			delete this._input_style.multiline;
		}
		else
		{
			this._multiline = false;
		}
		this._box_cache = {};
		this._previous = {};
		this._dom_added = false;
		this._dom_visible = true;
		this._placeholder = '';
		this._placeholderColor = 0xa9a9a9;
		this._selection = [0, 0];
		this._restrict_value = '';
		this._createDOMInput();
		this.substituteText = true;
		this._setState('DEFAULT');
		this._addListeners();
	}
	get substituteText()
	{
		return this._substituted;
	}
	set substituteText(substitute)
	{
		if (this._substituted == substitute)
		{
			return;
		}
		this._substituted = substitute;
		if (substitute)
		{
			this._createSurrogate();
			this._dom_visible = false;
		}
		else
		{
			this._destroySurrogate();
			this._dom_visible = true;
		}
		this.placeholder = this._placeholder;
		this._update();
	}
	get placeholder()
	{
		return this._placeholder;
	}
	set placeholder(text)
	{
		this._placeholder = text;
		if (this._substituted)
		{
			this._updateSurrogate();
			this._dom_input.placeholder = '';
		}
		else
		{
			this._dom_input.placeholder = text;
		}
	}
	get disabled()
	{
		return this._disabled;
	}
	set disabled(disabled)
	{
		this._disabled = disabled;
		this._dom_input.disabled = disabled;
		this._setState(disabled ? 'DISABLED' : 'DEFAULT');
	}
	get maxLength()
	{
		return this._max_length;
	}
	set maxLength(length)
	{
		this._max_length = length;
		this._dom_input.setAttribute('maxlength', length);
	}
	get restrict()
	{
		return this._restrict_regex;
	}
	set restrict(regex)
	{
		if (regex instanceof RegExp)
		{
			regex = regex.toString().slice(1, -1);
			if (regex.charAt(0) !== '^')
			{
				regex = '^' + regex;
			}
			if (regex.charAt(regex.length - 1) !== '$')
			{
				regex = regex + '$';
			}
			regex = new RegExp(regex);
		}
		else
		{
			regex = new RegExp('^[' + regex + ']*$');
		}
		this._restrict_regex = regex;
	}
	get text()
	{
		return this._dom_input.value;
	}
	set text(text)
	{
		this._dom_input.value = text;
		if (this._substituted)
		{
			this._updateSurrogate();
		}
	}
	get htmlInput()
	{
		return this._dom_input;
	}
	focus()
	{
		if (this._substituted && !this.dom_visible)
		{
			this._setDOMInputVisible(true);
		}
		this._dom_input.focus();
	}
	blur()
	{
		this._dom_input.blur();
	}
	select()
	{
		this.focus();
		this._dom_input.select();
	}
	setInputStyle(key, value)
	{
		this._input_style[key] = value;
		this._dom_input.style[key] = value;
		if (this._substituted && (key === 'fontFamily' || key === 'fontSize'))
		{
			this._updateFontMetrics();
		}
		if (this._last_renderer)
		{
			this._update();
		}
	}
	destroy(options)
	{
		this._destroyBoxCache();
		super.destroy(options);
	}
	_createDOMInput()
	{
		if (this._multiline)
		{
			this._dom_input = document.createElement('textarea');
			this._dom_input.style.resize = 'none';
		}
		else
		{
			this._dom_input = document.createElement('input');
			this._dom_input.type = 'text';
		}
		for (let key in this._input_style)
		{
			this._dom_input.style[key] = this._input_style[key];
		}
	}
	_addListeners()
	{
		this.on('added', this._onAdded.bind(this));
		this.on('removed', this._onRemoved.bind(this));
		this._dom_input.addEventListener('keydown', this._onInputKeyDown.bind(this));
		this._dom_input.addEventListener('input', this._onInputInput.bind(this));
		this._dom_input.addEventListener('keyup', this._onInputKeyUp.bind(this));
		this._dom_input.addEventListener('focus', this._onFocused.bind(this));
		this._dom_input.addEventListener('blur', this._onBlurred.bind(this));
	}
	_onInputKeyDown(e)
	{
		this._selection = [
			this._dom_input.selectionStart,
			this._dom_input.selectionEnd
		];
		this.emit('keydown', e.keyCode);
	}
	_onInputInput(e)
	{
		if (this._restrict_regex)
		{
			this._applyRestriction();
		}
		if (this._substituted)
		{
			this._updateSubstitution();
		}
		this.emit('input', this.text);
	}
	_onInputKeyUp(e)
	{
		this.emit('keyup', e.keyCode);
	}
	_onFocused()
	{
		this._setState('FOCUSED');
		this.emit('focus');
	}
	_onBlurred()
	{
		this._setState('DEFAULT');
		this.emit('blur');
	}
	_onAdded()
	{
		document.body.appendChild(this._dom_input);
		this._dom_input.style.display = 'none';
		this._dom_added = true;
	}
	_onRemoved()
	{
		document.body.removeChild(this._dom_input);
		this._dom_added = false;
	}
	_setState(state)
	{
		this.state = state;
		this._updateBox();
		if (this._substituted)
		{
			this._updateSubstitution();
		}
	}
	renderWebGL(renderer)
	{
		super.renderWebGL(renderer);
		this._renderInternal(renderer);
	}
	renderCanvas(renderer)
	{
		super.renderCanvas(renderer);
		this._renderInternal(renderer);
	}
	render(renderer)
	{
		super.render(renderer);
		this._renderInternal(renderer);
	}
	_renderInternal(renderer)
	{
		this._resolution = renderer.resolution;
		this._last_renderer = renderer;
		this._canvas_bounds = this._getCanvasBounds();
		if (this._needsUpdate())
		{
			this._update();
		}
	}
	_update()
	{
		this._updateDOMInput();
		if (this._substituted)
		{
			this._updateSurrogate();
		}
		this._updateBox();
	}
	_updateBox()
	{
		if (!this._box_generator)
		{
			return;
		}
		if (this._needsNewBoxCache())
		{
			this._buildBoxCache();
		}
		if (this.state == this._previous.state && this._box == this._box_cache[this.state])
		{
			return;
		}
		if (this._box)
		{
			this.removeChild(this._box);
		}
		this._box = this._box_cache[this.state];
		this.addChildAt(this._box, 0);
		this._previous.state = this.state;
	}
	_updateSubstitution()
	{
		if (this.state === 'FOCUSED')
		{
			this._dom_visible = true;
			this._surrogate.visible = this.text.length === 0;
		}
		else
		{
			this._dom_visible = false;
			this._surrogate.visible = true;
		}
		this._updateDOMInput();
		this._updateSurrogate();
	}
	_updateDOMInput()
	{
		if (!this._canvas_bounds)
		{
			return;
		}
		this._dom_input.style.top = (this._canvas_bounds.top || 0) + 'px';
		this._dom_input.style.left = (this._canvas_bounds.left || 0) + 'px';
		this._dom_input.style.transform = this._pixiMatrixToCSS(this._getDOMRelativeWorldTransform());
		this._dom_input.style.opacity = this.worldAlpha;
		this._setDOMInputVisible(this.worldVisible && this._dom_visible);
		this._previous.canvas_bounds = this._canvas_bounds;
		this._previous.world_transform = this.worldTransform.clone();
		this._previous.world_alpha = this.worldAlpha;
		this._previous.world_visible = this.worldVisible;
	}
	_applyRestriction()
	{
		if (this._restrict_regex.test(this.text))
		{
			this._restrict_value = this.text;
		}
		else
		{
			this.text = this._restrict_value;
			this._dom_input.setSelectionRange(
				this._selection[0],
				this._selection[1]
			);
		}
	}
	_needsUpdate()
	{
		return (
			!this._comparePixiMatrices(this.worldTransform, this._previous.world_transform) ||
			!this._compareClientRects(this._canvas_bounds, this._previous.canvas_bounds) ||
			this.worldAlpha != this._previous.world_alpha ||
			this.worldVisible != this._previous.world_visible
		);
	}
	_needsNewBoxCache()
	{
		let input_bounds = this._getDOMInputBounds();
		return (
			!this._previous.input_bounds ||
			input_bounds.width != this._previous.input_bounds.width ||
			input_bounds.height != this._previous.input_bounds.height
		);
	}
	_createSurrogate()
	{
		this._surrogate_hitbox = new PIXI.Graphics();
		this._surrogate_hitbox.alpha = 0;
		this._surrogate_hitbox.interactive = true;
		this._surrogate_hitbox.cursor = 'text';
		this._surrogate_hitbox.on('pointerdown', this._onSurrogateFocus.bind(this));
		this.addChild(this._surrogate_hitbox);
		this._surrogate_mask = new PIXI.Graphics();
		this.addChild(this._surrogate_mask);
		this._surrogate = new PIXI.Text('', {});
		this.addChild(this._surrogate);
		this._surrogate.mask = this._surrogate_mask;
		this._updateFontMetrics();
		this._updateSurrogate();
	}
	_updateSurrogate()
	{
		let padding = this._deriveSurrogatePadding();
		let input_bounds = this._getDOMInputBounds();
		this._surrogate.style = this._deriveSurrogateStyle();
		this._surrogate.style.padding = Math.max.apply(Math, padding);
		this._surrogate.y = this._multiline ? padding[0] : (input_bounds.height - this._surrogate.height) / 2;
		this._surrogate.x = padding[3];
		this._surrogate.text = this._deriveSurrogateText();
		switch (this._surrogate.style.align)
		{
			case 'left':
				this._surrogate.x = padding[3];
				break;
			case 'center':
				this._surrogate.x = input_bounds.width * 0.5 - this._surrogate.width * 0.5;
				break;
			case 'right':
				this._surrogate.x = input_bounds.width - padding[1] - this._surrogate.width;
				break;
		}
		this._updateSurrogateHitbox(input_bounds);
		this._updateSurrogateMask(input_bounds, padding);
	}
	_updateSurrogateHitbox(bounds)
	{
		this._surrogate_hitbox.clear();
		this._surrogate_hitbox.beginFill(0);
		this._surrogate_hitbox.drawRect(0, 0, bounds.width, bounds.height);
		this._surrogate_hitbox.endFill();
		this._surrogate_hitbox.interactive = !this._disabled;
	}
	_updateSurrogateMask(bounds, padding)
	{
		this._surrogate_mask.clear();
		this._surrogate_mask.beginFill(0);
		this._surrogate_mask.drawRect(padding[3], 0, bounds.width - padding[3] - padding[1], bounds.height);
		this._surrogate_mask.endFill();
	}
	_destroySurrogate()
	{
		if (!this._surrogate)
		{
			return;
		}
		this.removeChild(this._surrogate);
		this.removeChild(this._surrogate_hitbox);
		this._surrogate.destroy();
		this._surrogate_hitbox.destroy();
		this._surrogate = null;
		this._surrogate_hitbox = null;
	}
	_onSurrogateFocus()
	{
		this._setDOMInputVisible(true);
		setTimeout(this._ensureFocus.bind(this), 10);
	}
	_ensureFocus()
	{
		if (!this._hasFocus())
		{
			this.focus();
		}
	}
	_deriveSurrogateStyle()
	{
		let style = new PIXI.TextStyle();
		for (const key in this._input_style)
		{
			switch (key)
			{
				case 'color':
					style.fill = this._input_style.color;
					break;
				case 'fontFamily':
				case 'fontSize':
				case 'fontWeight':
				case 'fontVariant':
				case 'fontStyle':
					style[key] = this._input_style[key];
					break;
				case 'letterSpacing':
					style.letterSpacing = parseFloat(this._input_style.letterSpacing);
					break;
				case 'textAlign':
					style.align = this._input_style.textAlign;
					break;
			}
		}
		if (this._multiline)
		{
			style.lineHeight = parseFloat(style.fontSize);
			style.wordWrap = true;
			style.wordWrapWidth = this._getDOMInputBounds().width;
		}
		if (this._dom_input.value.length === 0)
		{
			style.fill = this._placeholderColor;
		}
		return style;
	}
	_deriveSurrogatePadding()
	{
		let indent = this._input_style.textIndent ? parseFloat(this._input_style.textIndent) : 0;
		if (this._input_style.padding && this._input_style.padding.length > 0)
		{
			let components = this._input_style.padding.trim().split(' ');
			if (components.length == 1)
			{
				let padding = parseFloat(components[0]);
				return [padding, padding, padding, padding + indent];
			}
			else if (components.length == 2)
			{
				let paddingV = parseFloat(components[0]);
				let paddingH = parseFloat(components[1]);
				return [paddingV, paddingH, paddingV, paddingH + indent];
			}
			else if (components.length == 4)
			{
				let padding = components.map(component =>
				{
					return parseFloat(component);
				});
				padding[3] += indent;
				return padding;
			}
		}
		return [0, 0, 0, indent];
	}
	_deriveSurrogateText()
	{
		return this._dom_input.value.length === 0 ? this._placeholder : this._dom_input.value;
	}
	_updateFontMetrics()
	{
		const style = this._deriveSurrogateStyle();
		const font = style.toFontString();
		this._font_metrics = PIXI.TextMetrics.measureFont(font);
	}
	_buildBoxCache()
	{
		this._destroyBoxCache();
		let states = ['DEFAULT', 'FOCUSED', 'DISABLED'];
		let input_bounds = this._getDOMInputBounds();
		for (let i in states)
		{
			this._box_cache[states[i]] = this._box_generator(
				input_bounds.width,
				input_bounds.height,
				states[i]
			);
		}
		this._previous.input_bounds = input_bounds;
	}
	_destroyBoxCache()
	{
		if (this._box)
		{
			this.removeChild(this._box);
			this._box = null;
		}
		for (let i in this._box_cache)
		{
			this._box_cache[i].destroy();
			this._box_cache[i] = null;
			delete this._box_cache[i];
		}
	}
	_hasFocus()
	{
		return document.activeElement === this._dom_input;
	}
	_setDOMInputVisible(visible)
	{
		this._dom_input.style.display = visible ? 'block' : 'none';
	}
	_getCanvasBounds()
	{
		let rect = this._last_renderer.view.getBoundingClientRect();
		let bounds = {top: rect.top, left: rect.left, width: rect.width, height: rect.height};
		bounds.left += window.scrollX;
		bounds.top += window.scrollY;
		return bounds;
	}
	_getDOMInputBounds()
	{
		let remove_after = false;
		if (!this._dom_added)
		{
			document.body.appendChild(this._dom_input);
			remove_after = true;
		}
		let org_transform = this._dom_input.style.transform;
		let org_display = this._dom_input.style.display;
		this._dom_input.style.transform = '';
		this._dom_input.style.display = 'block';
		let bounds = this._dom_input.getBoundingClientRect();
		this._dom_input.style.transform = org_transform;
		this._dom_input.style.display = org_display;
		if (remove_after)
		{
			document.body.removeChild(this._dom_input);
		}
		return bounds;
	}
	_getDOMRelativeWorldTransform()
	{
		let canvas_bounds = this._last_renderer.view.getBoundingClientRect();
		let matrix = this.worldTransform.clone();
		matrix.scale(this._resolution, this._resolution);
		matrix.scale(canvas_bounds.width / this._last_renderer.width,
			canvas_bounds.height / this._last_renderer.height);
		return matrix;
	}
	_pixiMatrixToCSS(m)
	{
		return 'matrix(' + [m.a, m.b, m.c, m.d, m.tx, m.ty].join(',') + ')';
	}
	_comparePixiMatrices(m1, m2)
	{
		if (!m1 || !m2)
		{
			return false;
		}
		return (
			m1.a == m2.a &&
			m1.b == m2.b &&
			m1.c == m2.c &&
			m1.d == m2.d &&
			m1.tx == m2.tx &&
			m1.ty == m2.ty
		);
	}
	_compareClientRects(r1, r2)
	{
		if (!r1 || !r2)
		{
			return false;
		}
		return (
			r1.left == r2.left &&
			r1.top == r2.top &&
			r1.width == r2.width &&
			r1.height == r2.height
		);
	}
}
function DefaultBoxGenerator(styles)
{
	styles = styles || {fill: 0xcccccc};
	if (styles.default)
	{
		styles.focused = styles.focused || styles.default;
		styles.disabled = styles.disabled || styles.default;
	}
	else
	{
		let temp_styles = styles;
		styles = {};
		styles.default = styles.focused = styles.disabled = temp_styles;
	}
	return function (w, h, state)
	{
		let style = styles[state.toLowerCase()];
		let box = new PIXI.Graphics();
		if (style.fill)
		{
			box.beginFill(style.fill);
		}
		if (style.stroke)
		{
			box.lineStyle(
				style.stroke.width || 1,
				style.stroke.color || 0,
				style.stroke.alpha || 1
			);
		}
		if (style.rounded)
		{
			box.drawRoundedRect(0, 0, w, h, style.rounded);
		}
		else
		{
			box.drawRect(0, 0, w, h);
		}
		box.endFill();
		box.closePath();
		return box;
	};
}

/**
 * Editable TextBox Stimulus.
 *
 * @author Alain Pitiot
 * @version 2020.2
 * @copyright (c) 2020 Ilixa Ltd. ({@link http://ilixa.com})
 * @license Distributed under the terms of the MIT License
 */
class TextBox extends mix(VisualStim).with(ColorMixin)
{
	constructor({name, win, pos, anchor, size, units, ori, opacity, depth, text, font, letterHeight, bold, italic, alignment, color, contrast, flipHoriz, flipVert, fillColor, borderColor, borderWidth, padding, editable, clipMask, autoDraw, autoLog} = {})
	{
		super({name, win, pos, size, units, ori, opacity, depth, clipMask, autoDraw, autoLog});
		this._addAttribute('text', text, '', this._onChange(true, true));
		this._addAttribute('anchor', anchor, 'center', this._onChange(false, true));
		this._addAttribute('flipHoriz', flipHoriz, false, this._onChange(true, true));
		this._addAttribute('flipVert', flipVert, false, this._onChange(true, true));
		this._addAttribute('font', font, 'Arial', this._onChange(true, true));
		this._addAttribute(
			'letterHeight',
			letterHeight,
			this._getDefaultLetterHeight(),
			this._onChange(true, true)
		);
		this._addAttribute('bold', bold, false, this._onChange(true, true));
		this._addAttribute('italic', italic, false, this._onChange(true, true));
		this._addAttribute('alignment', alignment, 'left', this._onChange(true, true));
		this._addAttribute('color', color, 'white', this._onChange(true, false));
		this._addAttribute('fillColor', fillColor, 'lightgrey', this._onChange(true, false));
		this._addAttribute('borderColor', borderColor, 'white', this._onChange(true, false));
		this._addAttribute('contrast', contrast, 1.0, this._onChange(true, false));
		this._addAttribute(
			'borderWidth',
			borderWidth,
			to_unit([1, 0], 'pix', win, this._units)[0],
			this._onChange(true, true)
		);
		this._addAttribute(
			'padding',
			padding,
			this._letterHeight / 2.0,
			this._onChange(true, true)
		);
		this._addAttribute('editable', editable, false, this._onChange(true, true));
		this._estimateBoundingBox();
		if (this._autoLog)
		{
			this._psychoJS.experimentLogger.exp(`Created ${this.name} = ${this.toString()}`);
		}
	}
	setSize(size, log)
	{
		let isSizeUndefined = (
			(typeof size === 'undefined') || (size === null) ||
			( Array.isArray(size) && size.every( v => typeof v === 'undefined' || v === null) )
		);
		if (isSizeUndefined)
		{
			size = TextBox._defaultSizeMap.get(this._units);
			if (typeof size === 'undefined')
			{
				throw {
					origin: 'TextBox.setSize',
					context: 'when setting the size of TextBox: ' + this._name,
					error: 'no default size for unit: ' + this._units
				};
			}
		}
		const hasChanged = this._setAttribute('size', size, log);
		if (hasChanged)
		{
			this._needUpdate = true;
			this._needPixiUpdate = true;
			this._estimateBoundingBox();
		}
	}
	_getDefaultLetterHeight()
	{
		const height = TextBox._defaultLetterHeightMap.get(this._units);
		if (typeof height === 'undefined')
		{
			throw {
				origin: 'TextBox._getDefaultLetterHeight',
				context: 'when getting the default height of TextBox: ' + this._name,
				error: 'no default letter height for unit: ' + this._units
			};
		}
		return height;
	}
	_getTextInputOptions()
	{
		const letterHeight_px = Math.round(this._getLengthPix(this._letterHeight));
		const padding_px = Math.round(this._getLengthPix(this._padding));
		const width_px = Math.round(this._getLengthPix(this._size[0]));
		const borderWidth_px = Math.round(this._getLengthPix(this._borderWidth));
		return {
			input: {
				fontFamily: this._font,
				fontSize: letterHeight_px + 'px',
				color: new Color(this._color).hex,
				fontWeight: (this._bold) ? 'bold' : 'normal',
				fontStyle: (this._italic) ? 'italic' : 'normal',
				padding: padding_px + 'px',
				width: (width_px - 2 * padding_px) + 'px'
			},
			box: {
				fill: new Color(this._fillColor).int,
				rounded: 5,
				stroke: {
					color: new Color(this._borderColor).int,
					width: borderWidth_px
				}
			}
		};
	}
	_estimateBoundingBox()
	{
		const boxHeight = this._letterHeight + 2 * this._padding + 2 * this._borderWidth;
		const anchor = this._getAnchor();
		this._boundingBox = new PIXI.Rectangle(
			this._pos[0] - anchor[0] * this._size[0],
			this._pos[1] - anchor[1] * boxHeight,
			this._size[0],
			boxHeight
		);
	}
	_updateIfNeeded()
	{
		if (!this._needUpdate)
		{
			return;
		}
		this._needUpdate = false;
		if (this._needPixiUpdate)
		{
			this._needPixiUpdate = false;
			if (typeof this._pixi !== 'undefined')
			{
				this._pixi.destroy(true);
			}
			this._pixi = new TextInput(this._getTextInputOptions());
			if (this._editable)
			{
				this._pixi.placeholder = this._text;
			}
			else
			{
				this._pixi.text = this._text;
			}
		}
		this._pixi.disabled = !this._editable;
		const anchor = this._getAnchor();
		this._pixi.pivot.x = anchor[0] * this._pixi.width;
		this._pixi.pivot.y = anchor[1] * this._pixi.height;
		this._pixi.scale.x = this._flipHoriz ? -1 : 1;
		this._pixi.scale.y = this._flipVert ? 1 : -1;
		this._pixi.rotation = this._ori * Math.PI / 180;
		[this._pixi.x, this._pixi.y] = to_px(this._pos, this._units, this._win);
		this._pixi.alpha = this._opacity;
		this._pixi.zIndex = this._depth;
		this._pixi.mask = this._clipMask;
	}
	_getAnchor()
	{
		const anchor = [0.5, 0.5];
		if (this._anchor.indexOf('left') > -1)
		{
			anchor[0] = 0;
		}
		else if (this._anchor.indexOf('right') > -1)
		{
			anchor[0] = 1;
		}
		if (this._anchor.indexOf('top') > -1)
		{
			anchor[1] = 0;
		}
		else if (this._anchor.indexOf('bottom') > -1)
		{
			anchor[1] = 1;
		}
		return anchor;
	}
}
TextBox._defaultLetterHeightMap = new Map([
	['cm', 1.0],
	['deg', 1.0],
	['degs', 1.0],
	['degFlatPos', 1.0],
	['degFlat', 1.0],
	['norm', 0.1],
	['height', 0.2],
	['pix', 20],
	['pixels', 20]
]);
TextBox._defaultSizeMap = new Map([
	['cm', [15.0, -1]],
	['deg', [15.0, -1]],
	['degs', [15.0, -1]],
	['degFlatPos', [15.0, -1]],
	['degFlat', [15.0, -1]],
	['norm', [1, -1]],
	['height', [1, -1]],
	['pix', [500, -1]],
	['pixels', [500, -1]]
]);

/**
 * Slider Stimulus.
 *
 * @author Alain Pitiot
 * @version 2020.5
 * @copyright (c) 2020 Ilixa Ltd. ({@link http://ilixa.com})
 * @license Distributed under the terms of the MIT License
 */
class Slider extends mix(VisualStim).with(ColorMixin, WindowMixin)
{
	constructor({name, win, pos, size, ori, units, color, contrast, opacity, style, ticks, labels, labelHeight, granularity, flip, readOnly, font, bold, italic, fontSize, compact, clipMask, autoDraw, autoLog} = {})
	{
		super({name, win, units, ori, opacity, pos, size, clipMask, autoDraw, autoLog});
		this._needMarkerUpdate = false;
		const onChange = (withPixi = false, withBoundingBox = false, withSanitize = false) =>
		{
			const visualOnChange = this._onChange(withPixi, withBoundingBox);
			return () =>
			{
				visualOnChange();
				if (withSanitize)
				{
					this._sanitizeAttributes();
				}
			};
		};
		this._addAttribute(
			'style',
			style,
			[Slider.Style.RATING],
			onChange(true, true, true)
		);
		this._addAttribute(
			'ticks',
			ticks,
			[1, 2, 3, 4, 5],
			onChange(true, false, true)
		);
		this._addAttribute(
			'labels',
			labels,
			[],
			onChange(true, true, true)
		);
		this._addAttribute(
			'granularity',
			granularity,
			0,
			this._onChange(false, false)
		);
		this._addAttribute(
			'readOnly',
			readOnly,
			false
		);
		this._addAttribute(
			'compact',
			compact,
			false,
			this._onChange(true, true)
		);
		this._addAttribute(
			'font',
			font,
			'Helvetica',
			this._onChange(true, true)
		);
		this._addAttribute(
			'fontSize',
			fontSize,
			(this._units === 'pix') ? 14 : 0.03,
			this._onChange(true, true)
		);
		this._addAttribute(
			'bold',
			bold,
			true,
			this._onChange(true, true)
		);
		this._addAttribute(
			'italic',
			italic,
			false,
			this._onChange(true, true)
		);
		this._addAttribute(
			'labelHeight',
			labelHeight,
			undefined,
			this._onChange(true, true)
		);
		this._addAttribute(
			'flip',
			flip,
			false,
			this._onChange(true, true)
		);
		this._addAttribute(
			'color',
			color,
			'lightgray',
			this._onChange(true, false)
		);
		this._addAttribute(
			'contrast',
			contrast,
			1.0,
			this._onChange(true, false)
		);
		this._addAttribute('rating', undefined);
		this._addAttribute('markerPos', undefined);
		this._addAttribute('history', []);
		this._addAttribute('lineAspectRatio', 0.01);
		this._sanitizeAttributes();
		this._estimateBoundingBox();
		this._responseClock = new Clock();
		if (this._autoLog)
		{
			this._psychoJS.experimentLogger.exp(`Created ${this.name} = ${this.toString()}`);
		}
	}
	refresh()
	{
		super.refresh();
		this._needMarkerUpdate = true;
	}
	reset()
	{
		this.psychoJS.logger.debug('reset Slider: ', this._name);
		this._markerPos = undefined;
		this._history = [];
		this._rating = undefined;
		this._responseClock.reset();
		this.status = PsychoJS.Status.NOT_STARTED;
		this._needPixiUpdate = true;
		this._needUpdate = true;
		if (typeof this._marker !== 'undefined')
		{
			this._marker.alpha = 0;
		}
	}
	getRating()
	{
		const historyLength = this._history.length;
		if (historyLength > 0)
		{
			return this._history[historyLength - 1].rating;
		}
		else
		{
			return undefined;
		}
	}
	getRT()
	{
		const historyLength = this._history.length;
		if (historyLength > 0)
		{
			return this._history[historyLength - 1].responseTime;
		}
		else
		{
			return undefined;
		}
	}
	setReadOnly(readOnly = true, log = false)
	{
		const hasChanged = this._setAttribute('readOnly', readOnly, log);
		if (hasChanged)
		{
			if (readOnly)
			{
				this._opacity /= 2.0;
			}
			else
			{
				this._opacity *= 2.0;
			}
			this._needUpdate = true;
		}
	}
	setMarkerPos(displayedRating, log = false)
	{
		const previousMarkerPos = this._markerPos;
		this._markerPos = this._granularise(displayedRating);
		if (previousMarkerPos !== this._markerPos)
		{
			this._needMarkerUpdate = true;
			this._needUpdate = true;
		}
	}
	setRating(rating, log = false)
	{
		rating = this._granularise(rating);
		this._markerPos = rating;
		if (this._isCategorical)
		{
			rating = this._labels[Math.round(rating)];
		}
		this._setAttribute('rating', rating, log);
	}
	_estimateBoundingBox()
	{
		this._setupStyle();
		this._tickSize_px = to_px(this._tickSize, this._units, this._win);
		this._fontSize_px = this._getLengthPix(this._fontSize);
		this._barSize_px = to_px(this._barSize, this._units, this._win, true).map(v => Math.max(1, v));
		this._markerSize_px = to_px(this._markerSize, this._units, this._win, true);
		const tickPositions = this._ratingToPos(this._ticks);
		this._tickPositions_px = tickPositions.map(p => to_px(p, this._units, this._win));
		const size_px = to_px(this._size, this._units, this._win);
		const limits_px = [
			Number.POSITIVE_INFINITY,
			Number.POSITIVE_INFINITY,
			Number.NEGATIVE_INFINITY,
			Number.NEGATIVE_INFINITY
		];
		this._labelPositions_px = new Array(this._labels.length);
		const labelTextStyle = this._getTextStyle();
		let prevLabelBounds = null;
		let prevNonOverlapOffset = 0;
		const tolerance = 10;
		for (let l = 0; l < this._labels.length; ++l)
		{
			const tickPositionIndex = Math.round( l / (this._labels.length - 1) * (this._ticks.length - 1) );
			this._labelPositions_px[l] = this._tickPositions_px[tickPositionIndex];
			const labelBounds = PIXI.TextMetrics.measureText(this._labels[l], labelTextStyle);
			if (this._isHorizontal())
			{
				if (this._flip)
				{
					this._labelPositions_px[l][1] -= labelBounds.height + this._tickSize_px[1];
				}
				else
				{
					this._labelPositions_px[l][1] += this._tickSize_px[1];
				}
				if (this._style.indexOf(Slider.Style.LABELS45) === -1)
				{
					this._labelPositions_px[l][0] -= labelBounds.width / 2;
					if (this._compact)
					{
						this._labelPositions_px[l][0] = Math.min(size_px[0] / 2 - labelBounds.width, Math.max(-size_px[0] / 2, this._labelPositions_px[l][0]));
					}
					if (prevLabelBounds &&
						(this._labelPositions_px[l - 1][0] + prevLabelBounds.width + tolerance >= this._labelPositions_px[l][0]))
					{
						if (prevNonOverlapOffset === 0)
						{
							prevNonOverlapOffset = prevLabelBounds.height;
							this._labelPositions_px[l][1] += prevNonOverlapOffset;
						}
						else
						{
							prevNonOverlapOffset = 0;
						}
					}
					prevLabelBounds = labelBounds;
				}
			}
			else
			{
				this._labelPositions_px[l][1] -= labelBounds.height / 2;
				if (this._compact)
				{
					this._labelPositions_px[l][1] = Math.min(size_px[1] / 2 - labelBounds.width, Math.max(-size_px[1] / 2, this._labelPositions_px[l][1]));
				}
				if (this._flip)
				{
					this._labelPositions_px[l][0] += this._tickSize_px[0] * 2;
				}
				else if (this._labelOri === 0)
				{
					this._labelPositions_px[l][0] -= labelBounds.width + this._tickSize_px[0] * 2;
				}
				else
				{
					this._labelPositions_px[l][0] -= this._tickSize_px[0];
				}
			}
			limits_px[0] = Math.min(limits_px[0], this._labelPositions_px[l][0]);
			limits_px[1] = Math.min(limits_px[1], this._labelPositions_px[l][1]);
			limits_px[2] = Math.max(limits_px[2], this._labelPositions_px[l][0] + labelBounds.width);
			limits_px[3] = Math.max(limits_px[3], this._labelPositions_px[l][1] + labelBounds.height);
		}
		if (this._isHorizontal())
		{
			limits_px[1] -= this._tickSize_px[1] * 2;
		}
		const position = this._getPosition();
		this._boundingBox = new PIXI.Rectangle(
			position[0] + this._getLengthUnits(limits_px[0]),
			position[1] + this._getLengthUnits(limits_px[1]),
			this._getLengthUnits(limits_px[2] - limits_px[0]),
			this._getLengthUnits(limits_px[3] - limits_px[1])
		);
	}
	_sanitizeAttributes()
	{
		this._style.forEach( (style, index) =>
		{
			if (typeof style === 'string')
			{
				this._style[index] = Symbol.for(style.toUpperCase());
			}
		});
		this._isCategorical = (this._ticks.length === 0);
		if (this._isCategorical)
		{
			this._ticks = [...Array(this._labels.length)].map( (_, i) => i );
			this._granularity = 1.0;
		}
	}
	_recordRating(rating, responseTime = undefined, log = false)
	{
		if (typeof responseTime === 'undefined')
		{
			responseTime = this._responseClock.getTime();
		}
		this.setRating(rating, log);
		this._history.push({rating: this._rating, responseTime});
		this.psychoJS.logger.debug('record a new rating: ', this._rating, 'with response time: ', responseTime, 'for Slider: ', this._name);
		this._needMarkerUpdate = true;
		this._needUpdate = true;
	}
	_updateIfNeeded()
	{
		if (!this._needUpdate)
		{
			return;
		}
		this._needUpdate = false;
		this._setupSlider();
		this._updateMarker();
		this._pixi.scale.x = 1;
		this._pixi.scale.y = -1;
		this._pixi.rotation = this._ori * Math.PI / 180;
		this._pixi.position = this._getPosition();
		this._pixi.alpha = this._opacity;
	}
	_getPosition()
	{
		const position = to_pixiPoint(this.pos, this.units, this.win, true);
		if (this._compact &&
			(this._style.indexOf(Slider.Style.RADIO) > -1 || this._style.indexOf(Slider.Style.RATING) > -1))
		{
			if (this._isHorizontal())
			{
				position.y -= this._getLengthPix(this._tickSize[1]) * (this._flip ? -1 : 1);
			}
			else
			{
				position.x += this._getLengthPix(this._tickSize[0]) * (this._flip ? -1 : 1);
			}
		}
		return position;
	}
	_updateMarker()
	{
		if (!this._needMarkerUpdate)
		{
			return;
		}
		this._needMarkerUpdate = false;
		if (typeof this._marker !== 'undefined')
		{
			if (typeof this._markerPos !== 'undefined')
			{
				const visibleMarkerPos = this._ratingToPos([this._markerPos]);
				this._marker.position = to_pixiPoint(visibleMarkerPos[0], this.units, this.win, true);
				this._marker.alpha = 1;
			}
			else
			{
				this._marker.alpha = 0;
			}
		}
	}
	_setupSlider()
	{
		if (!this._needPixiUpdate)
		{
			return;
		}
		this._needPixiUpdate = false;
		this._setupStyle();
		this._tickSize_px = to_px(this._tickSize, this._units, this._win);
		this._fontSize_px = this._getLengthPix(this._fontSize);
		this._barSize_px = to_px(this._barSize, this._units, this._win, true).map(v => Math.max(1, v));
		this._markerSize_px = to_px(this._markerSize, this._units, this._win, true);
		const tickPositions = this._ratingToPos(this._ticks);
		this._tickPositions_px = tickPositions.map(p => to_px(p, this._units, this._win));
		if (typeof this._pixi !== 'undefined')
		{
			this._pixi.destroy(true);
		}
		this._pixi = new PIXI.Container();
		this._pixi.interactive = true;
		this._pixi.mask = this._clipMask;
		this._body = new PIXI.Graphics();
		this._body.interactive = true;
		this._pixi.addChild(this._body);
		this._setupBar();
		this._setupTicks();
		this._setupLabels();
		this._setupMarker();
	}
	_setupBar()
	{
		if (this._barLineWidth_px > 0)
		{
			this._body.lineStyle(this._barLineWidth_px, this._barLineColor.int, 1, 0.5);
			if (typeof this._barFillColor !== 'undefined')
			{
				this._body.beginFill(this._barFillColor.int, 1);
			}
			this._body.drawRect(
				Math.round(-this._barSize_px[0] / 2),
				Math.round(-this._barSize_px[1] / 2),
				Math.round(this._barSize_px[0]),
				Math.round(this._barSize_px[1])
			);
			if (typeof this._barFillColor !== 'undefined')
			{
				this._body.endFill();
			}
		}
	}
	_setupMarker()
	{
		const eventCaptureRectangle = new PIXI.Graphics();
		eventCaptureRectangle.beginFill(0, 0);
		eventCaptureRectangle.drawRect(
			-this._barSize_px[0] / 2 - this._tickSize_px[0] / 2,
			-this._barSize_px[1] / 2 - this._tickSize_px[1] / 2,
			this._barSize_px[0] + this._tickSize_px[0],
			this._barSize_px[1] + this._tickSize_px[1]
		);
		eventCaptureRectangle.endFill();
		this._pixi.addChild(eventCaptureRectangle);
		this._marker = new PIXI.Graphics();
		this._marker.alpha = 0;
		this._marker.interactive = true;
		this._pixi.addChild(this._marker);
		const halfMarkerSize_px = Math.round(Math.max(...this._markerSize_px) / 2);
		if (this._markerType === Slider.Shape.DISC)
		{
			this._marker.lineStyle(1, this._markerColor.int, 1, 0.5);
			this._marker.beginFill(this._markerColor.int, 1);
			this._marker.drawCircle(0, 0, halfMarkerSize_px);
			this._marker.endFill();
		}
		else if (this._markerType === Slider.Shape.TRIANGLE)
		{
			this._marker.lineStyle(1, this._markerColor.int, 1, 0.5);
			this._marker.beginFill(this._markerColor.int, 1);
			this._marker.moveTo(0, 0);
			if (this._isHorizontal())
			{
				if (this._flip)
				{
					this._marker.lineTo(halfMarkerSize_px, halfMarkerSize_px);
					this._marker.lineTo(-halfMarkerSize_px, halfMarkerSize_px);
				}
				else
				{
					this._marker.lineTo(halfMarkerSize_px, -halfMarkerSize_px);
					this._marker.lineTo(-halfMarkerSize_px, -halfMarkerSize_px);
				}
			}
			else
			{
				if (this._flip)
				{
					this._marker.lineTo(-halfMarkerSize_px, halfMarkerSize_px);
					this._marker.lineTo(-halfMarkerSize_px, -halfMarkerSize_px);
				}
				else
				{
					this._marker.lineTo(halfMarkerSize_px, halfMarkerSize_px);
					this._marker.lineTo(halfMarkerSize_px, -halfMarkerSize_px);
				}
			}
			this._marker.endFill();
		}
		else if (this._markerType === Slider.Shape.BOX)
		{
			this._marker.lineStyle(1, this.getContrastedColor(this._markerColor, 0.5).int, 1, 0.5);
			this._marker.beginFill(this._markerColor.int, 1);
			this._marker.drawRect(
				Math.round(-this._markerSize_px[0] / 2),
				Math.round(-this._markerSize_px[1] / 2),
				this._markerSize_px[0],
				this._markerSize_px[1]
			);
			this._marker.endFill();
		}
		const self = this;
		self._markerDragging = false;
		this._marker.pointerdown = this._marker.mousedown = this._marker.touchstart = (event) =>
		{
			if (event.data.button === 0)
			{
				self._markerDragging = true;
			}
			event.stopPropagation();
		};
		this._marker.pointerup = this._marker.mouseup = this._marker.touchend = (event) =>
		{
			if (self._markerDragging)
			{
				self._markerDragging = false;
				const mouseLocalPos_px = event.data.getLocalPosition(self._pixi);
				const rating = self._posToRating([mouseLocalPos_px.x, mouseLocalPos_px.y]);
				self._recordRating(rating);
				event.stopPropagation();
			}
		};
		this._marker.pointerupoutside = this._marker.mouseupoutside = this._marker.touchendoutside = (event) =>
		{
			if (self._markerDragging)
			{
				const mouseLocalPos_px = event.data.getLocalPosition(self._pixi);
				const rating = self._posToRating([mouseLocalPos_px.x, mouseLocalPos_px.y]);
				self._recordRating(rating);
				self._markerDragging = false;
				event.stopPropagation();
			}
		};
		this._marker.pointermove = (event) =>
		{
			if (self._markerDragging)
			{
				const mouseLocalPos_px = event.data.getLocalPosition(self._pixi);
				const rating = self._posToRating([mouseLocalPos_px.x, mouseLocalPos_px.y]);
				self.setMarkerPos(rating);
				event.stopPropagation();
			}
		};
		this._pixi.pointerup = this._pixi.mouseup = this._pixi.touchend = (event) =>
		{
			const mouseLocalPos_px = event.data.getLocalPosition(self._body);
			const rating = self._posToRating([mouseLocalPos_px.x, mouseLocalPos_px.y]);
			self._recordRating(rating);
			event.stopPropagation();
		};
	}
	_setupTicks()
	{
		if (this._style.indexOf(Slider.Style.SLIDER) > -1)
		{
			return;
		}
		const maxTickSize = Math.max(this._tickSize_px[0], this._tickSize_px[1]);
		this._body.lineStyle(this._barLineWidth_px * 2, this._tickColor.int, 1, 0.5);
		for (let tickPosition_px of this._tickPositions_px)
		{
			if (this._tickType === Slider.Shape.LINE)
			{
				this._body.moveTo(tickPosition_px[0] - this._tickSize_px[0] / 2, tickPosition_px[1] - this._tickSize_px[1] / 2);
				this._body.lineTo(tickPosition_px[0] + this._tickSize_px[0] / 2, tickPosition_px[1] + this._tickSize_px[1] / 2);
			}
			else if (this._tickType === Slider.Shape.DISC)
			{
				this._body.beginFill(this._tickColor.int, 1);
				this._body.drawCircle(tickPosition_px[0], tickPosition_px[1], maxTickSize);
				this._body.endFill();
			}
		}
	}
	_getTextStyle()
	{
		this._fontSize_px = this._getLengthPix(this._fontSize);
		return new PIXI.TextStyle({
			fontFamily: this._font,
			fontSize: Math.round(this._fontSize_px),
			fontWeight: (this._bold) ? 'bold' : 'normal',
			fontStyle: (this._italic) ? 'italic' : 'normal',
			fill: this.getContrastedColor(this._labelColor, this._contrast).hex,
			align: 'center',
		});
	}
	_setupLabels()
	{
		const labelTextStyle = this._getTextStyle();
		for (let l = 0; l < this._labels.length; ++l)
		{
			const labelText = new PIXI.Text(this._labels[l], labelTextStyle);
			labelText.position.x = this._labelPositions_px[l][0];
			labelText.position.y = this._labelPositions_px[l][1];
			labelText.rotation = (this._ori + this._labelOri) * Math.PI / 180;
			labelText.anchor = this._labelAnchor;
			labelText.alpha = 1;
			this._pixi.addChild(labelText);
		}
	}
	_setupStyle()
	{
		if (this._isHorizontal())
		{
			this._barSize = [this._size[0], 0];
			this._tickSize = [0, this._size[1]];
			this._labelAnchor = new PIXI.Point(0, 0);
		}
		else
		{
			this._barSize = [0, this._size[1]];
			this._tickSize = [this._size[0], 0];
			this._labelAnchor = new PIXI.Point(0, 0);
		}
		this._barLineWidth_px = 1;
		this._barLineColor = new Color(this._color);
		this._barFillColor = undefined;
		this._tickType = Slider.Shape.LINE;
		this._tickColor = new Color(this._color);
		this._markerColor = new Color('red');
		this._markerType = Slider.Shape.DISC;
		this._markerSize = this._tickSize;
		this._labelColor = new Color(this._color);
		this._labelOri = 0;
		if (this._style.indexOf(Slider.Style.RATING) > -1)
		;
		if (this._style.indexOf(Slider.Style.TRIANGLE_MARKER) > -1)
		{
			this._markerType = Slider.Shape.TRIANGLE;
			this._markerSize = this._markerSize.map(s => s * 2);
		}
		if (this._style.indexOf(Slider.Style.SLIDER) > -1)
		{
			this._markerType = Slider.Shape.BOX;
			this._markerSize = (this._isHorizontal()) ?
				[this._size[0] / (this._ticks[1] - this._ticks[0]), this._size[1]] :
				[this._size[0], this._size[1] / (this._ticks[1] - this._ticks[0])];
			this._barSize = [this._size[0], this._size[1]];
			this._barFillColor = this.getContrastedColor(new Color(this.color), 0.5);
		}
		if (this._style.indexOf(Slider.Style.WHITE_ON_BLACK) > -1)
		{
			this._barLineColor = new Color('black');
			this._tickColor = new Color('black');
			this._markerColor = new Color('white');
			this._labelColor = new Color('black');
		}
		if (this._style.indexOf(Slider.Style.LABELS45) > -1)
		{
			this._labelOri = -45;
			if (this._flip)
			{
				this._labelAnchor = new PIXI.Point(0, 0.5);
			}
			else
			{
				this._labelAnchor = new PIXI.Point(1, 0);
			}
		}
		if (this._style.indexOf(Slider.Style.RADIO) > -1)
		{
			this._barLineWidth_px = 0;
			this._tickType = Slider.Shape.DISC;
			this._markerSize = this._markerSize.map(s => s * 0.7);
		}
	}
	_ratingToPos(ratings)
	{
		const range = this._ticks[this._ticks.length - 1] - this._ticks[0];
		if (this._isHorizontal())
		{
			if (this._compact && this._style.indexOf(Slider.Style.RADIO) > -1)
			{
				return ratings.map(v => [
					((v - this._ticks[0]) / range) * (this._size[0] - this._tickSize[1]*2) -
					(this._size[0] / 2) + this._tickSize[1],
						0]);
			}
			else if (this._style.indexOf(Slider.Style.SLIDER) > -1)
			{
				return ratings.map(v => [
					(1.0 - ((v - this._ticks[0]) / range - 0.5)) * (this._size[0] - this._markerSize[0]),
					0]);
			}
			else
			{
				return ratings.map(v => [((v - this._ticks[0]) / range - 0.5) * this._size[0], 0]);
			}
		}
		else
		{
			if (this._compact && this._style.indexOf(Slider.Style.RADIO) > -1)
			{
				return ratings.map(v => [0,
					((v - this._ticks[0]) / range) * (this._size[1] - this._tickSize[0]*2) -
					(this._size[1] / 2) + this._tickSize[0]]);
			}
			else if (this._style.indexOf(Slider.Style.SLIDER) > -1)
			{
				return ratings.map(v => [
					0,
					((v - this._ticks[0]) / range - 0.5) * (this._size[1] - this._markerSize[1])]);
			}
			else
			{
				return ratings.map(v => [0, (1.0 - (v - this._ticks[0]) / range - 0.5) * this._size[1]]);
			}
		}
	}
	_posToRating(pos_px)
	{
		const range = this._ticks[this._ticks.length - 1] - this._ticks[0];
		const size_px = to_px(this._size, this._units, this._win);
		if (this._isHorizontal())
		{
			if (this._style.indexOf(Slider.Style.SLIDER) > -1)
			{
				return (1.0 - (pos_px[0] / size_px[0] + 0.5)) * range;
			}
			else
			{
				return (pos_px[0] / size_px[0] + 0.5) * range + this._ticks[0];
			}
		}
		else
		{
			if (this._style.indexOf(Slider.Style.SLIDER) > -1)
			{
				const markerSize_px = to_px(this._markerSize, this._units, this._win);
				return (pos_px[1] / (size_px[1] - markerSize_px[1]) + 0.5) * range;
			}
			else
			{
				return (1.0 - (pos_px[1] / size_px[1] + 0.5)) * range + this._ticks[0];
			}
		}
	}
	_isHorizontal()
	{
		return (this._size[0] > this._size[1]);
	}
	_granularise(rating)
	{
		if (typeof rating === 'undefined')
		{
			return undefined;
		}
		if (this._granularity > 0)
		{
			rating = Math.round(rating / this._granularity) * this._granularity;
		}
		rating = Math.min(Math.max(this._ticks[0], rating), this._ticks[this._ticks.length - 1]);
		return rating;
	}
}
Slider.Shape = {
	DISC: Symbol.for('DISC'),
	TRIANGLE: Symbol.for('TRIANGLE'),
	LINE: Symbol.for('LINE'),
	BOX: Symbol.for('BOX')
};
Slider.Style = {
	RATING: Symbol.for('RATING'),
	TRIANGLE_MARKER: Symbol.for('TRIANGLEMARKER'),
	SLIDER: Symbol.for('SLIDER'),
	WHITE_ON_BLACK: Symbol.for('WHITEONBLACK'),
	LABELS45: Symbol.for('LABELS45'),
	RADIO: Symbol.for('RADIO')
};

/**
 * Form Stimulus.
 *
 * @author Alain Pitiot
 * @version 2020.5
 * @copyright (c) 2020 Ilixa Ltd. ({@link http://ilixa.com})
 * @license Distributed under the terms of the MIT License
 */
class Form extends mix(VisualStim).with(ColorMixin)
{
	constructor({name, win, pos, size, units, color, contrast, opacity, depth, items, randomize, itemPadding, fontFamily, bold, italic, fontSize, clipMask, autoDraw, autoLog} = {})
	{
		super({name, win, units, opacity, depth, pos, size, clipMask, autoDraw, autoLog});
		this._addAttribute(
			'itemPadding',
			itemPadding,
			to_unit([20, 0], 'pix', win, this._units)[0],
			this._onChange(true, false)
		);
		this._addAttribute(
			'color',
			color,
			'white',
			this._onChange(true, false)
		);
		this._addAttribute(
			'contrast',
			contrast,
			1.0,
			this._onChange(true, false)
		);
		this._addAttribute(
			'fontFamily',
			fontFamily,
			'Helvetica',
			this._onChange(true, true)
		);
		this._addAttribute(
			'fontSize',
			fontSize,
			(this._units === 'pix') ? 14 : 0.03,
			this._onChange(true, true)
		);
		this._addAttribute(
			'bold',
			bold,
			false,
			this._onChange(true, true)
		);
		this._addAttribute(
			'italic',
			italic,
			false,
			this._onChange(true, true)
		);
		const onItemChange = () =>
		{
			this._processItems();
			this._setupStimuli();
			this._onChange(true, true)();
		};
		this._addAttribute(
			'items',
			items,
			[],
			onItemChange);
		this._addAttribute(
			'randomize',
			randomize,
			false,
			onItemChange);
		this._scrollbarWidth = 0.02;
		this._responseTextHeightRatio = 0.8;
		this._processItems();
		this._setupStimuli();
		if (this._autoLog)
		{
			this._psychoJS.experimentLogger.exp(`Created ${this.name} = ${this.toString()}`);
		}
	}
	refresh()
	{
		super.refresh();
		for (let i = 0; i < this._items.length; ++i)
		{
			const textStim = this._visual.textStims[i];
			textStim.refresh();
			const responseStim = this._visual.responseStims[i];
			if (responseStim)
			{
				responseStim.refresh();
			}
		}
	}
	draw()
	{
		if (this._scrollbar.markerPos !== this._prevScrollbarMarkerPos)
		{
			this._prevScrollbarMarkerPos = this._scrollbar.markerPos;
			this._needUpdate = true;
		}
		super.draw();
		for (let i = 0; i < this._items.length; ++i)
		{
			if (this._visual.visibles[i])
			{
				const textStim = this._visual.textStims[i];
				textStim.draw();
				const responseStim = this._visual.responseStims[i];
				if (responseStim)
				{
					responseStim.draw();
				}
			}
		}
		this._scrollbar.draw();
	}
	hide()
	{
		super.hide();
		if (typeof this._items !== 'undefined')
		{
			for (let i = 0; i < this._items.length; ++i)
			{
				if (this._visual.visibles[i])
				{
					const textStim = this._visual.textStims[i];
					textStim.hide();
					const responseStim = this._visual.responseStims[i];
					if (responseStim)
					{
						responseStim.hide();
					}
				}
			}
			this._scrollbar.hide();
		}
	}
	reset()
	{
		this.psychoJS.logger.debug('reset Form: ', this._name);
		for (let i = 0; i < this._items.length; ++i)
		{
			const textStim = this._visual.textStims[i];
			textStim.reset();
			const responseStim = this._visual.responseStims[i];
			if (responseStim)
			{
				responseStim.reset();
			}
		}
		this._needUpdate = true;
	}
	getData()
	{
		let nbIncompleteResponse = 0;
		for (let i = 0; i < this._items.length; ++i)
		{
			const item = this._items[i];
			const responseStim = this._visual.responseStims[i];
			if (responseStim)
			{
				if (item.type === Form.Types.CHOICE || item.type === Form.Types.RATING)
				{
					item.response = responseStim.getRating();
					item.rt = responseStim.getRT();
					if (typeof item.response === 'undefined')
					{
						++ nbIncompleteResponse;
					}
				}
				else if (item.type === Form.Types.FREE_TEXT)
				{
					item.response = responseStim.text;
					item.rt = undefined;
					if (item.response.length === 0)
					{
						++ nbIncompleteResponse;
					}
				}
			}
		}
		this._items._complete = (nbIncompleteResponse === 0);
		return this._items.map(item => Object.assign({}, item));
	}
	addDataToExp(experiment, format = 'rows')
	{
		const addAsColumns = ['cols', 'columns'].includes(format.toLowerCase());
		const data = this.getData();
		const _doNotSave = [
			'itemCtrl', 'responseCtrl',
			'itemColor', 'options', 'ticks', 'tickLabels',
				'responseWidth', 'responseColor', 'layout'
		];
		for (const item of this.getData())
		{
			let index = 0;
			for (const field in item)
			{
				if (!_doNotSave.includes(field))
				{
					const columnName = (addAsColumns) ? `${this._name}[${index}]${field}` : `${this._name}${field}`;
					experiment.addData(columnName, item[field]);
				}
				++ index;
			}
			if (!addAsColumns)
			{
				experiment.nextEntry();
			}
		}
		if (addAsColumns)
		{
			experiment.nextEntry();
		}
	}
	_processItems()
	{
		const response = {
			origin: 'Form._processItems',
			context: 'when processing the form items'
		};
		try
		{
			if (this._autoLog)
			{
				this._psychoJS.experimentLogger.exp('Importing items...');
			}
			this._importItems();
			this._sanitizeItems();
			if (this._randomize)
			{
				shuffle(this._items);
			}
		}
		catch (error)
		{
			throw Object.assign(response, {error});
		}
	}
	_importItems()
	{
		const response = {
			origin: 'Form._importItems',
			context: 'when importing the form items'
		};
		try
		{
			const itemsType = typeof this._items;
			if (itemsType === 'undefined')
			{
				this._items = [Form._defaultItems];
			}
			else if (itemsType === 'string')
			{
				this._items = TrialHandler.importConditions(this._psychoJS.serverManager, this._items);
			}
			else
			{
				throw `unable to import items of unknown type: ${itemsType}`;
			}
			if (Array.isArray(this._items) && this._items.length === 0)
			{
				this._items = [Form._defaultItems];
			}
		}
		catch (error)
		{
			throw Object.assign(response, {error});
		}
	}
	_sanitizeItems()
	{
		const response = {
			origin: 'Form._sanitizeItems',
			context: 'when sanitizing the form items'
		};
		try
		{
			for (const item of this._items)
			{
				if (typeof item.questionText !== 'undefined')
				{
					item.itemText = item.questionText;
					delete item.questionText;
					item.itemWidth = item.questionWidth;
					delete item.questionWidth;
					if (item.type === 'rating')
					{
						item.ticks = item.options;
						item.options = undefined;
					}
				}
			}
			const defaultKeys = Object.keys(Form._defaultItems);
			const missingKeys = new Set();
			for (const item of this._items)
			{
				const itemKeys = Object.keys(item);
				for (const key of defaultKeys)
				{
					if (!itemKeys.includes(key))
					{
						missingKeys.add(key);
						item[key] = Form._defaultItems[key];
					}
					else if (typeof item[key] === 'undefined')
					{
						item[key] = Form._defaultItems[key];
					}
				}
			}
			if (missingKeys.size > 0)
			{
				this._psychoJS.logger.warn(`Missing headers: ${Array.from(missingKeys).join(', ')}\nNote, headers are case sensitive and must match: ${Array.from(defaultKeys).join(', ')}`);
			}
			const formTypes = Object.getOwnPropertyNames(Form.Types);
			for (const item of this._items)
			{
				item.type = item.type.toUpperCase().replace(' ', '_');
				if (!formTypes.includes(item.type))
				{
					throw `${item.type} is not a valid type for item: ${item.itemText}`;
				}
				item.type = Symbol.for(item.type);
				if (item.type === Form.Types.CHOICE)
				{
					item.options = item.options.split(',');
					if (item.options.length < 2)
					{
						throw `at least two choices should be provided for choice item: ${item.itemText}`;
					}
				}
				else if (item.type === Form.Types.RATING)
				{
					item.ticks = item.ticks.split(',').map( (_,t) => parseInt(t) );
					item.tickLabels = (item.tickLabels.length > 0) ? item.tickLabels.split(',') : [];
				}
			}
			const formLayouts = ['HORIZ', 'VERT'];
			for (const item of this._items)
			{
				item.layout = item.layout.toUpperCase();
				if (!formLayouts.includes(item.layout))
				{
					throw `${item.layout} is not a valid layout for item: ${item.itemText}`;
				}
				item.layout = (item.layout === 'HORIZ') ? Form.Layout.HORIZONTAL : Form.Layout.VERTICAL;
			}
		}
		catch (error)
		{
			throw Object.assign(response, {error});
		}
	}
	_estimateBoundingBox()
	{
		this._boundingBox = new PIXI.Rectangle(
			this._pos[0] - this._size[0] / 2.0,
			this._pos[1] - this._size[1] / 2.0,
			this._size[0],
			this._size[1]
		);
	}
	_setupStimuli()
	{
		if (this._autoLog)
		{
			this._psychoJS.experimentLogger.exp(`Setting layout of Form: ${this.name}`);
		}
		if (typeof this._visual !== 'undefined')
		{
			for (const textStim of this._visual.textStims)
			{
				textStim.release();
			}
			for (const responseStim of this._visual.responseStims)
			{
				responseStim.release();
			}
		}
		this._visual = {
			rowHeights: [],
			textStims: [],
			responseStims: [],
			visibles: [],
			stimuliTotalHeight: 0
		};
		this._stimuliClipMask = new PIXI.Graphics();
		const textStimOption = {
			win: this._win,
			name: 'item text',
			font: 'Arial',
			units: this._units,
			alignHoriz: 'left',
			alignVert: 'top',
			height: this._fontSize,
			color: 'white',
			ori: 0,
			opacity: 1,
			depth: this._depth + 1,
			clipMask: this._stimuliClipMask
		};
		const sliderOption = {
			win: this._win,
			name: 'choice response',
			units: this._units,
			flip: false,
			fontFamily: 'Arial',
			bold: false,
			italic: false,
			fontSize: this._fontSize * this._responseTextHeightRatio,
			color: this._color,
			opacity: 1,
			depth: this._depth + 1,
			clipMask: this._stimuliClipMask,
			granularity: 1
		};
		const textBoxOption = {
			win: this._win,
			name: 'free text response',
			units: this._units,
			anchor: 'left-top',
			flip: false,
			opacity: 1,
			depth: this._depth + 1,
			font: 'Arial',
			letterHeight: this._fontSize * this._responseTextHeightRatio,
			bold: false,
			italic: false,
			alignment: 'left',
			color: this._color,
			contrast: 1.0,
			borderColor: this._color,
			borderWidth: 0.002,
			padding: 0.01,
			editable: true,
			clipMask: this._stimuliClipMask
		};
		const textStim = new TextStim(Object.assign(textStimOption, { text: 'Ag', pos: [0, 0]}));
		const textMetrics_px = textStim.getTextMetrics();
		const sliderTickSize = this._getLengthUnits(textMetrics_px.height) / 2;
		textStim.release(false);
		let stimulusOffset = - this._itemPadding;
		for (const item of this._items)
		{
			this._visual.visibles.push(false);
			let rowWidth;
			if (item.type === Form.Types.HEADING || item.type === Form.Types.DESCRIPTION ||
				(item.type === Form.Types.CHOICE && item.layout === Form.Layout.VERTICAL))
			{
				rowWidth = (this._size[0] - this._itemPadding * 2 - this._scrollbarWidth);
			}
			else
			{
				rowWidth = (this._size[0] - this._itemPadding * 3 - this._scrollbarWidth);
			}
			const itemWidth = rowWidth *  item.itemWidth;
			const textStim = new TextStim(
				Object.assign(textStimOption, {
					text: item.itemText,
					wrapWidth: itemWidth
				}));
			textStim._relativePos = [this._itemPadding, stimulusOffset];
			const textHeight = textStim.boundingBox.height;
			this._visual.textStims.push(textStim);
			let responseStim = null;
			let responseHeight = 0;
			let compact;
			let flip;
			const responseWidth = rowWidth * item.responseWidth;
			if (item.type === Form.Types.CHOICE || item.type === Form.Types.RATING)
			{
				let sliderSize;
				if (item.layout === Form.Layout.HORIZONTAL)
				{
					sliderSize = [responseWidth, sliderTickSize];
					compact = true;
					flip = false;
				}
				else
				{
					sliderSize = [sliderTickSize, (sliderTickSize*1.5) * item.options.length];
					compact = false;
					flip = true;
				}
				let style, labels, ticks;
				if (item.type === Form.Types.CHOICE)
				{
					style = [Slider.Style.RATING, Slider.Style.RADIO];
					labels = item.options;
					ticks = [];
				}
				else
				{
					style = [Slider.Style.RATING];
					labels = item.tickLabels;
					ticks = item.ticks;
				}
				responseStim = new Slider(
					Object.assign(sliderOption, {
						size: sliderSize,
						style,
						labels,
						ticks,
						compact,
						flip
					})
				);
				responseHeight = responseStim.boundingBox.height;
				if (item.layout === Form.Layout.HORIZONTAL)
				{
					responseStim._relativePos = [
						this._itemPadding * 2 + itemWidth + responseWidth / 2,
						stimulusOffset
					];
				}
				else
				{
					responseStim._relativePos = [
						this._itemPadding * 2 + itemWidth,
						stimulusOffset - responseHeight / 2 - textHeight - this._itemPadding
					];
					responseHeight += textHeight + this._itemPadding;
				}
			}
			else if (item.type === Form.Types.FREE_TEXT)
			{
				responseStim = new TextBox(
					Object.assign(textBoxOption, {
						text: item.options,
						size: [responseWidth, -1]
					})
				);
				responseHeight = responseStim.boundingBox.height;
				responseStim._relativePos = [
					this._itemPadding * 2 + itemWidth,
					stimulusOffset
				];
			}
			this._visual.responseStims.push(responseStim);
			const rowHeight = Math.max(textHeight, responseHeight);
			this._visual.rowHeights.push(rowHeight);
			stimulusOffset -= rowHeight + this._itemPadding;
		}
		this._visual.stimuliTotalHeight = stimulusOffset;
		this._scrollbar = new Slider({
			win: this._win,
			name: 'scrollbar',
			units: this._units,
			color: this._color,
			depth: this._depth + 1,
			pos: [0, 0],
			size: [this._scrollbarWidth, this._size[1]],
			style: [Slider.Style.SLIDER],
			ticks: [0, -this._visual.stimuliTotalHeight / this._size[1]],
		});
		this._prevScrollbarMarkerPos = 0;
		this._scrollbar.setMarkerPos(this._prevScrollbarMarkerPos);
		this._estimateBoundingBox();
		if (this._autoLog)
		{
			this._psychoJS.experimentLogger.exp(`Layout set for: ${this.name}`);
		}
	}
	_updateIfNeeded()
	{
		if (!this._needUpdate)
		{
			return;
		}
		this._needUpdate = false;
		this._leftEdge = this._pos[0] - this._size[0] / 2.0;
		this._rightEdge = this._pos[0] + this._size[0] / 2.0;
		this._topEdge = this._pos[1] + this._size[1] / 2.0;
		this._bottomEdge = this._pos[1] - this._size[1] / 2.0;
		[this._leftEdge_px, this._topEdge_px] = to_px(
			[this._leftEdge, this._topEdge],
			this.units,
			this.win,
			true);
		[this._rightEdge_px, this._bottomEdge_px] = to_px(
			[this._rightEdge, this._bottomEdge],
			this.units,
			this.win,
			true);
		this._itemPadding_px = this._getLengthPix(this._itemPadding);
		this._scrollbarWidth_px = this._getLengthPix(this._scrollbarWidth, true);
		this._size_px = to_px(this._size, this.units, this.win, true);
		this._stimuliClipMask.clear();
		this._stimuliClipMask.beginFill(0xFFFFFF);
		this._stimuliClipMask.drawRect(
			this._win._rootContainer.position.x + this._leftEdge_px + 2,
			this._win._rootContainer.position.y + this._bottomEdge_px + 2,
			this._size_px[0] - 4,
			this._size_px[1] - 6
		);
		this._stimuliClipMask.endFill();
		this._scrollbar.setPos([this._rightEdge - this._scrollbarWidth / 2, this._pos[1]], false);
		this._scrollbar.setOpacity(0.5);
		this._scrollbarOffset = this._prevScrollbarMarkerPos * (this._visual.stimuliTotalHeight + this._size[1]) / (-this._visual.stimuliTotalHeight / this._size[1]);
		this._updateVisibleStimuli();
		this._updateDecorations();
	}
	_updateVisibleStimuli()
	{
		for (let i = 0; i < this._items.length; ++i)
		{
			const textStim = this._visual.textStims[i];
			const textStimPos = [
				this._leftEdge + textStim._relativePos[0],
				this._topEdge + textStim._relativePos[1] - this._scrollbarOffset
			];
			textStim.setPos(textStimPos);
			const responseStim = this._visual.responseStims[i];
			if (responseStim)
			{
				const responseStimPos = [
					this._leftEdge + responseStim._relativePos[0],
					this._topEdge + responseStim._relativePos[1] - this._scrollbarOffset
				];
				responseStim.setPos(responseStimPos);
			}
			if (textStimPos[1] > this._bottomEdge && textStimPos[1] - this._visual.rowHeights[i] <= this._topEdge)
			{
				this._visual.visibles[i] = true;
			}
			else
			{
				if (this._visual.visibles[i])
				{
					textStim.hide();
					if (responseStim)
					{
						responseStim.hide();
					}
				}
				this._visual.visibles[i] = false;
			}
		}
	}
	_updateDecorations()
	{
		if (typeof this._pixi !== 'undefined')
		{
			this._pixi.destroy(true);
		}
		this._pixi = new PIXI.Graphics();
		this._pixi.scale.x = 1;
		this._pixi.scale.y = 1;
		this._pixi.rotation = 0;
		this._pixi.position = to_pixiPoint(this.pos, this.units, this.win);
		this._pixi.alpha = this._opacity;
		this._pixi.zIndex = this._depth;
		this._pixi.mask = this._clipMask;
		this._pixi.lineStyle(1, new Color('lightgray').int, this._opacity, 0.5);
		this._pixi.drawRect(this._leftEdge_px, this._bottomEdge_px, this._size_px[0], this._size_px[1]);
		this._decorations = new PIXI.Graphics();
		this._pixi.addChild(this._decorations);
		this._decorations.mask = this._stimuliClipMask;
		this._decorations.lineStyle(1, new Color('gray').int, this._opacity, 0.5);
		this._decorations.alpha = 0.5;
		for (let i = 0; i < this._items.length; ++i)
		{
			if (this._visual.visibles[i])
			{
				const item = this._items[i];
				if (item.type === Form.Types.HEADING || item.type === Form.Types.DESCRIPTION)
				{
					const textStim = this._visual.textStims[i];
					const textStimPos = [
						this._leftEdge + textStim._relativePos[0],
						this._topEdge + textStim._relativePos[1] - this._scrollbarOffset
					];
					const textStimPos_px = to_px(textStimPos, this._units, this._win);
					this._decorations.beginFill(new Color('darkgray').int);
					this._decorations.drawRect(
						textStimPos_px[0] - this._itemPadding_px / 2,
						textStimPos_px[1] + this._itemPadding_px / 2,
						this._size_px[0] - this._itemPadding_px - this._scrollbarWidth_px,
						-this._getLengthPix(this._visual.rowHeights[i]) - this._itemPadding_px
					);
					this._decorations.endFill();
				}
			}
		}
	}
}
Form.Types = {
	HEADING: Symbol.for('HEADING'),
	DESCRIPTION: Symbol.for('DESCRIPTION'),
	RATING: Symbol.for('RATING'),
	SLIDER: Symbol.for('SLIDER'),
	FREE_TEXT: Symbol.for('FREE_TEXT'),
	CHOICE: Symbol.for('CHOICE')
};
Form.Layout = {
	HORIZONTAL: Symbol.for('HORIZONTAL'),
	VERTICAL: Symbol.for('VERTICAL')
};
Form._defaultItems = {
	'itemText': 'Default question',
	'type': 'rating',
	'options': 'Yes, No',
	'tickLabels': '',
	'itemWidth': 0.7,
	'itemColor': 'white',
	'responseWidth': 0.3,
	'responseColor': 'white',
	'index': 0,
	'layout': 'horiz'
};

/**
 * Image Stimulus.
 *
 * @author Alain Pitiot
 * @version 2020.5
 * @copyright (c) 2020 Ilixa Ltd. ({@link http://ilixa.com})
 * @license Distributed under the terms of the MIT License
 */
class ImageStim extends mix(VisualStim).with(ColorMixin)
{
	constructor({name, win, image, mask, pos, units, ori, size, color, opacity, contrast, texRes, depth, interpolate, flipHoriz, flipVert, autoDraw, autoLog} = {})
	{
		super({name, win, units, ori, opacity, depth, pos, size, autoDraw, autoLog});
		this._addAttribute(
			'image',
			image
		);
		this._addAttribute(
			'mask',
			mask
		);
		this._addAttribute(
			'color',
			color,
			'white',
			this._onChange(true, false)
		);
		this._addAttribute(
			'contrast',
			contrast,
			1.0,
			this._onChange(true, false)
		);
		this._addAttribute(
			'texRes',
			texRes,
			128,
			this._onChange(true, false)
		);
		this._addAttribute(
			'interpolate',
			interpolate,
			false,
			this._onChange(true, false)
		);
		this._addAttribute(
			'flipHoriz',
			flipHoriz,
			false,
			this._onChange(false, false)
		);
		this._addAttribute(
			'flipVert',
			flipVert,
			false,
			this._onChange(false, false)
		);
		this._estimateBoundingBox();
		if (this._autoLog)
		{
			this._psychoJS.experimentLogger.exp(`Created ${this.name} = ${this.toString()}`);
		}
	}
	setImage(image, log = false)
	{
		const response = {
			origin: 'ImageStim.setImage',
			context: 'when setting the image of ImageStim: ' + this._name
		};
		try
		{
			if (typeof image === 'undefined')
			{
				this.psychoJS.logger.warn('setting the image of ImageStim: ' + this._name + ' with argument: undefined.');
				this.psychoJS.logger.debug('set the image of ImageStim: ' + this._name + ' as: undefined');
			}
			else
			{
				if (typeof image === 'string')
				{
					image = this.psychoJS.serverManager.getResource(image);
				}
				if (!(image instanceof HTMLImageElement))
				{
					throw 'the argument: ' + image.toString() + ' is not an image" }';
				}
				this.psychoJS.logger.debug('set the image of ImageStim: ' + this._name + ' as: src= ' + image.src + ', size= ' + image.width + 'x' + image.height);
			}
			this._setAttribute('image', image, log);
			this._onChange(true, true)();
		}
		catch (error)
		{
			throw Object.assign(response, {error});
		}
	}
	setMask(mask, log = false)
	{
		const response = {
			origin: 'ImageStim.setMask',
			context: 'when setting the mask of ImageStim: ' + this._name
		};
		try
		{
			if (typeof mask === 'undefined')
			{
				this.psychoJS.logger.warn('setting the mask of ImageStim: ' + this._name + ' with argument: undefined.');
				this.psychoJS.logger.debug('set the mask of ImageStim: ' + this._name + ' as: undefined');
			}
			else
			{
				if (typeof mask === 'string')
				{
					mask = this.psychoJS.serverManager.getResource(mask);
				}
				if (!(mask instanceof HTMLImageElement))
				{
					throw 'the argument: ' + mask.toString() + ' is not an image" }';
				}
				this.psychoJS.logger.debug('set the mask of ImageStim: ' + this._name + ' as: src= ' + mask.src + ', size= ' + mask.width + 'x' + mask.height);
			}
			this._setAttribute('mask', mask, log);
			this._onChange(true, false)();
		}
		catch (error)
		{
			throw Object.assign(response, {error});
		}
	}
	_estimateBoundingBox()
	{
		const size = this._getDisplaySize();
		if (typeof size !== 'undefined')
		{
			this._boundingBox = new PIXI.Rectangle(
				this._pos[0] - this._size[0] / 2,
				this._pos[1] - this._size[1] / 2,
				this._size[0],
				this._size[1]
			);
		}
	}
	_updateIfNeeded()
	{
		if (!this._needUpdate)
		{
			return;
		}
		this._needUpdate = false;
		if (this._needPixiUpdate)
		{
			this._needPixiUpdate = false;
			if (typeof this._pixi !== 'undefined')
			{
				this._pixi.destroy(true);
			}
			this._pixi = undefined;
			if (typeof this._image === 'undefined')
			{
				return;
			}
			this._texture = new PIXI.Texture(new PIXI.BaseTexture(this._image));
			this._pixi = new PIXI.Sprite(this._texture);
			if (typeof this._mask !== 'undefined')
			{
				this._maskTexture = new PIXI.Texture(new PIXI.BaseTexture(this._mask));
				this._pixi.mask = new PIXI.Sprite(this._maskTexture);
				this._pixi.mask.anchor.x = 0.5;
				this._pixi.mask.anchor.y = 0.5;
				this._pixi.addChild(this._pixi.mask);
			}
			if (this._texture.width === 0)
			{
				this._needUpdate = true;
				this._needPixiUpdate = true;
				return;
			}
		}
		this._pixi.zIndex = this._depth;
		this._pixi.alpha = this.opacity;
		const displaySize = this._getDisplaySize();
		const size_px = to_px(displaySize, this.units, this.win);
		const scaleX = size_px[0] / this._texture.width;
		const scaleY = size_px[1] / this._texture.height;
		this._pixi.scale.x = this.flipHoriz ? -scaleX : scaleX;
		this._pixi.scale.y = this.flipVert ? scaleY : -scaleY;
		this._pixi.position = to_pixiPoint(this.pos, this.units, this.win);
		this._pixi.rotation = this.ori * Math.PI / 180;
		this._pixi.anchor.x = 0.5;
		this._pixi.anchor.y = 0.5;
		this._estimateBoundingBox();
	}
	_getDisplaySize()
	{
		let displaySize = this.size;
		if (typeof displaySize === 'undefined')
		{
			if (typeof this._texture !== 'undefined' && this._texture.width > 0)
			{
				const textureSize = [this._texture.width, this._texture.height];
				displaySize = to_unit(textureSize, 'pix', this.win, this.units);
			}
		}
		return displaySize;
	}
}

/**
 * Movie Stimulus.
 *
 * @author Alain Pitiot
 * @version 2020.5
 * @copyright (c) 2020 Ilixa Ltd. ({@link http://ilixa.com})
 * @license Distributed under the terms of the MIT License
 */
class MovieStim extends VisualStim
{
	constructor({
								name,
								win,
								movie,
								pos,
								units,
								ori,
								size,
								color = new Color('white'),
								opacity = 1.0,
								contrast = 1.0,
								interpolate = false,
								flipHoriz = false,
								flipVert = false,
								loop = false,
								volume = 1.0,
								noAudio = false,
								autoPlay = true,
								autoDraw,
								autoLog
							} = {})
	{
		super({name, win, units, ori, opacity, pos, size, autoDraw, autoLog});
		this.psychoJS.logger.debug('create a new MovieStim with name: ', name);
		this._addAttributes(MovieStim, movie, color, contrast, interpolate, flipHoriz, flipVert, loop, volume, noAudio, autoPlay);
		this._estimateBoundingBox();
		const videoElement = document.createElement('video');
		this._hasFastSeek = (typeof videoElement.fastSeek === 'function');
		if (this._autoLog)
		{
			this._psychoJS.experimentLogger.exp(`Created ${this.name} = ${this.toString()}`);
		}
	}
	setMovie(movie, log = false)
	{
		const response = {
			origin: 'MovieStim.setMovie',
			context: 'when setting the movie of MovieStim: ' + this._name
		};
		try
		{
			if (typeof movie === 'undefined')
			{
				this.psychoJS.logger.warn('setting the movie of MovieStim: ' + this._name + ' with argument: undefined.');
				this.psychoJS.logger.debug('set the movie of MovieStim: ' + this._name + ' as: undefined');
			}
			else
			{
				if (typeof movie === 'string')
				{
					movie = this.psychoJS.serverManager.getResource(movie);
				}
				if (!(movie instanceof HTMLVideoElement))
				{
					throw 'the argument: ' + movie.toString() + ' is not a video" }';
				}
				this.psychoJS.logger.debug(`set the movie of MovieStim: ${this._name} as: src= ${movie.src}, size= ${movie.videoWidth}x${movie.videoHeight}, duration= ${movie.duration}s`);
			}
			this._setAttribute('movie', movie, log);
			this._movie.onended = () =>
			{
				this.status = PsychoJS.Status.FINISHED;
			};
			this._needUpdate = true;
			this._needPixiUpdate = true;
		}
		catch (error)
		{
			throw Object.assign(response, {error});
		}
	}
	setVolume(volume, log = false)
	{
		const hasChanged = this._setAttribute('volume', volume, log);
		if (hasChanged)
		{
			this._needUpdate = true;
		}
	}
	setNoAudio(noAudio, log = false)
	{
		const hasChanged = this._setAttribute('noAudio', noAudio, log);
		if (hasChanged)
		{
			this._needUpdate = true;
		}
	}
	setFlipVert(flipVert, log = false)
	{
		const hasChanged = this._setAttribute('flipVert', flipVert, log);
		if (hasChanged)
		{
			this._needUpdate = true;
		}
	}
	setFlipHoriz(flipHoriz, log = false)
	{
		const hasChanged = this._setAttribute('flipHoriz', flipHoriz, log);
		if (hasChanged)
		{
			this._needUpdate = true;
		}
	}
	reset(log = false)
	{
		this.status = PsychoJS.Status.NOT_STARTED;
		this._movie.pause();
		if (this._hasFastSeek)
		{
			this._movie.fastSeek(0);
		}
	}
	play(log = false)
	{
		this.status = PsychoJS.Status.STARTED;
		this._movie.play();
	}
	pause(log = false)
	{
		this.status = PsychoJS.Status.STOPPED;
		this._movie.pause();
	}
	stop(log = false)
	{
		this.status = PsychoJS.Status.STOPPED;
		this._movie.pause();
		if (this._hasFastSeek)
		{
			this._movie.fastSeek(0);
		}
	}
	seek(timePoint, log = false)
	{
		if (timePoint < 0 || timePoint > this._movie.duration)
		{
			throw {
				origin: 'MovieStim.seek',
				context: `when seeking to timepoint: ${timePoint} of MovieStim: ${this._name}`,
				error: `the timepoint does not belong to [0, ${this._movie.duration}`
			};
		}
		if (this._hasFastSeek)
		{
			this._movie.fastSeek(timePoint);
		}
	}
	_estimateBoundingBox()
	{
		const size = this._getDisplaySize();
		if (typeof size !== 'undefined')
		{
			this._boundingBox = new PIXI.Rectangle(
				this._pos[0] - this._size[0] / 2,
				this._pos[1] - this._size[1] / 2,
				this._size[0],
				this._size[1]
			);
		}
	}
	_updateIfNeeded()
	{
		if (!this._needUpdate)
		{
			return;
		}
		this._needUpdate = false;
		if (this._needPixiUpdate)
		{
			this._needPixiUpdate = false;
			if (typeof this._pixi !== 'undefined')
			{
				this._pixi.destroy(true);
			}
			this._pixi = undefined;
			if (typeof this._movie === 'undefined')
			{
				return;
			}
			this._texture = PIXI.Texture.fromVideo(this._movie);
			this._pixi = new PIXI.Sprite(this._texture);
			if (this._texture.width === 0)
			{
				this._needUpdate = true;
				this._needPixiUpdate = true;
				return;
			}
		}
		this._movie.muted = this._noAudio;
		this._movie.volume = this._volume;
		this._texture.baseTexture.autoPlay = this.autoPlay;
		this._movie.loop = this._loop;
		this._pixi.alpha = this.opacity;
		const displaySize = this._getDisplaySize();
		const size_px = to_px(displaySize, this.units, this.win);
		const scaleX = size_px[0] / this._texture.width;
		const scaleY = size_px[1] / this._texture.height;
		this._pixi.scale.x = this.flipHoriz ? -scaleX : scaleX;
		this._pixi.scale.y = this.flipVert ? scaleY : -scaleY;
		this._pixi.position = to_pixiPoint(this.pos, this.units, this.win);
		this._pixi.rotation = this.ori * Math.PI / 180;
		this._pixi.anchor.x = 0.5;
		this._pixi.anchor.y = 0.5;
		this._estimateBoundingBox();
	}
	_getDisplaySize()
	{
		let displaySize = this.size;
		if (typeof displaySize === 'undefined')
		{
			if (typeof this._texture !== 'undefined' && this._texture.width > 0)
			{
				const textureSize = [this._texture.width, this._texture.height];
				displaySize = to_unit(textureSize, 'pix', this.win, this.units);
			}
		}
		return displaySize;
	}
}

/**
 * Basic Shape Stimulus.
 *
 * @author Alain Pitiot
 * @version 2020.5
 * @copyright (c) 2020 Ilixa Ltd. ({@link http://ilixa.com})
 * @license Distributed under the terms of the MIT License
 */
class ShapeStim extends mix(VisualStim).with(ColorMixin, WindowMixin)
{
	constructor({name, win, lineWidth, lineColor, fillColor, opacity, vertices, closeShape, pos, size, ori, units, contrast, depth, interpolate, autoDraw, autoLog} = {})
	{
		super({name, win, units, ori, opacity, pos, depth, size, autoDraw, autoLog});
		this._pixiPolygon_px = undefined;
		this._vertices_px = undefined;
		if (typeof size === 'undefined' || size === null)
		{
			this.size = [1.0, 1.0];
		}
		this._addAttribute(
			'vertices',
			vertices,
			[[-0.5, 0], [0, 0.5], [0.5, 0]]
		);
		this._addAttribute(
			'closeShape',
			closeShape,
			true,
			this._onChange(true, false)
		);
		this._addAttribute(
			'interpolate',
			interpolate,
			true,
			this._onChange(true, false)
		);
		this._addAttribute(
			'lineWidth',
			lineWidth,
			1.5,
			this._onChange(true, true)
		);
		this._addAttribute(
			'lineColor',
			lineColor,
			'white',
			this._onChange(true, false)
		);
		this._addAttribute(
			'fillColor',
			fillColor,
			undefined,
			this._onChange(true, false)
		);
		this._addAttribute(
			'contrast',
			contrast,
			1.0,
			this._onChange(true, false)
		);
		this._addAttribute(
			'opacity',
			opacity,
			1.0,
			this._onChange(false, false)
		);
	}
	setVertices(vertices, log = false)
	{
		const response = {
			origin: 'ShapeStim.setVertices',
			context: 'when setting the vertices of ShapeStim: ' + this._name
		};
		this._psychoJS.logger.debug('set the vertices of ShapeStim:', this.name);
		try
		{
			if (typeof vertices === 'string')
			{
				if (vertices in ShapeStim.KnownShapes)
				{
					vertices = ShapeStim.KnownShapes[vertices];
				}
				else
				{
					throw `unknown shape: ${vertices}`;
				}
			}
			this._setAttribute('vertices', vertices, log);
			this._onChange(true, true)();
		}
		catch (error)
		{
			throw Object.assign(response, {error: error});
		}
	}
	contains(object, units)
	{
		const objectPos_px = getPositionFromObject(object, units);
		if (typeof objectPos_px === 'undefined')
		{
			throw {
				origin: 'VisualStim.contains',
				context: 'when determining whether VisualStim: ' + this._name + ' contains object: ' + toString(object),
				error: 'unable to determine the position of the object'
			};
		}
		const pos_px = to_px(this.pos, this.units, this.win);
		this._getVertices_px();
		const polygon_px = this._vertices_px.map(v => [v[0] + pos_px[0], v[1] + pos_px[1]]);
		return IsPointInsidePolygon(objectPos_px, polygon_px);
	}
	_estimateBoundingBox()
	{
		this._getVertices_px();
		const limits_px = [
			Number.POSITIVE_INFINITY,
			Number.POSITIVE_INFINITY,
			Number.NEGATIVE_INFINITY,
			Number.NEGATIVE_INFINITY
		];
		for (const vertex of this._vertices_px)
		{
			limits_px[0] = Math.min(limits_px[0], vertex[0]);
			limits_px[1] = Math.min(limits_px[1], vertex[1]);
			limits_px[2] = Math.max(limits_px[2], vertex[0]);
			limits_px[3] = Math.max(limits_px[3], vertex[1]);
		}
		this._boundingBox = new PIXI.Rectangle(
			this._pos[0] + this._getLengthUnits(limits_px[0]),
			this._pos[1] + this._getLengthUnits(limits_px[1]),
			this._getLengthUnits(limits_px[2] - limits_px[0]),
			this._getLengthUnits(limits_px[3] - limits_px[1])
		);
	}
	_updateIfNeeded()
	{
		if (!this._needUpdate)
		{
			return;
		}
		this._needUpdate = false;
		if (this._needPixiUpdate)
		{
			this._needPixiUpdate = false;
			if (typeof this._pixi !== 'undefined')
			{
				this._pixi.destroy(true);
			}
			this._pixi = undefined;
			this._getPixiPolygon();
			this._pixi = new PIXI.Graphics();
			this._pixi.lineStyle(this._lineWidth, this._lineColor.int, this._opacity, 0.5);
			if (typeof this._fillColor !== 'undefined' && this._fillColor !== null)
			{
				this._pixi.beginFill(this._fillColor.int, this._opacity);
			}
			this._pixi.drawPolygon(this._pixiPolygon_px);
			if (typeof this._fillColor !== 'undefined' && this._fillColor !== null)
			{
				this._pixi.endFill();
			}
		}
		this._pixi.position = to_pixiPoint(this.pos, this.units, this.win);
		this._pixi.rotation = this.ori * Math.PI / 180.0;
	}
	_getPixiPolygon()
	{
		this._getVertices_px();
		let coords_px = [];
		for (const vertex_px of this._vertices_px)
		{
			coords_px.push.apply(coords_px, vertex_px);
		}
		if (coords_px.length >= 6 && this._closeShape)
		{
			const n = coords_px.length;
			if (coords_px[0] !== coords_px[n - 2] || coords_px[1] !== coords_px[n - 1])
			{
				coords_px.push(coords_px[0]);
				coords_px.push(coords_px[1]);
			}
		}
		this._pixiPolygon_px = new PIXI.Polygon(coords_px);
		return this._pixiPolygon_px;
	}
	_getVertices_px()
	{
		let flip = [1.0, 1.0];
		if ('_flipHoriz' in this && this._flipHoriz)
		{
			flip[0] = -1.0;
		}
		if ('_flipVert' in this && this._flipVert)
		{
			flip[1] = -1.0;
		}
		this._vertices_px = this._vertices.map(v => to_px(
			[v[0] * this._size[0] * flip[0], v[1] * this._size[1] * flip[1]],
			this._units,
			this._win)
		);
		return this._vertices_px;
	}
}
ShapeStim.KnownShapes = {
	cross: [
		[-0.1, +0.5],
		[+0.1, +0.5],
		[+0.1, +0.1],
		[+0.5, +0.1],
		[+0.5, -0.1],
		[+0.1, -0.1],
		[+0.1, -0.5],
		[-0.1, -0.5],
		[-0.1, -0.1],
		[-0.5, -0.1],
		[-0.5, +0.1],
		[-0.1, +0.1]
	],
	star7: [
		[0.0, 0.5],
		[0.09, 0.18],
		[0.39, 0.31],
		[0.19, 0.04],
		[0.49, -0.11],
		[0.16, -0.12],
		[0.22, -0.45],
		[0.0, -0.2],
		[-0.22, -0.45],
		[-0.16, -0.12],
		[-0.49, -0.11],
		[-0.19, 0.04],
		[-0.39, 0.31],
		[-0.09, 0.18]
	]
};

/**
 * Polygonal Stimulus.
 *
 * @author Alain Pitiot
 * @version 2020.5
 * @copyright (c) 2020 Ilixa Ltd. ({@link http://ilixa.com})
 * @license Distributed under the terms of the MIT License
 */
class Polygon extends ShapeStim
{
	constructor({name, win, lineWidth, lineColor, fillColor, opacity, edges, radius, pos, size, ori, units, contrast, depth, interpolate, autoDraw, autoLog} = {})
	{
		super({
			name,
			win,
			lineWidth,
			lineColor,
			fillColor,
			opacity,
			pos,
			ori,
			size,
			units,
			contrast,
			depth,
			interpolate,
			autoDraw,
			autoLog
		});
		this._psychoJS.logger.debug('create a new Polygon with name: ', name);
		this._addAttribute(
			'edges',
			edges,
			3
		);
		this._addAttribute(
			'radius',
			radius,
			0.5
		);
		this._updateVertices();
		if (this._autoLog)
		{
			this._psychoJS.experimentLogger.exp(`Created ${this.name} = ${this.toString()}`);
		}
	}
	setRadius(radius, log = false)
	{
		const hasChanged = this._setAttribute('radius', radius, log);
		if (hasChanged)
		{
			this._updateVertices();
		}
	}
	setEdges(edges, log = false)
	{
		const hasChanged = this._setAttribute('edges', Math.round(edges), log);
		if (hasChanged)
		{
			this._updateVertices();
		}
	}
	_updateVertices()
	{
		this._psychoJS.logger.debug('update the vertices of Polygon: ', this.name);
		const angle = 2.0 * Math.PI / this._edges;
		const vertices = [];
		for (let v = 0; v < this._edges; ++v)
		{
			vertices.push([Math.sin(v * angle) * this._radius, Math.cos(v * angle) * this._radius]);
		}
		this.setVertices(vertices);
	}
}

/**
 * Rectangular Stimulus.
 *
 * @author Alain Pitiot
 * @version 2020.5
 * @copyright (c) 2020 Ilixa Ltd. ({@link http://ilixa.com})
 * @license Distributed under the terms of the MIT License
 */
class Rect extends ShapeStim
{
	constructor({name, win, lineWidth, lineColor, fillColor, opacity, width, height, pos, size, ori, units, contrast, depth, interpolate, autoDraw, autoLog} = {})
	{
		super({
			name,
			win,
			lineWidth,
			lineColor,
			fillColor,
			opacity,
			pos,
			ori,
			size,
			units,
			contrast,
			depth,
			interpolate,
			autoDraw,
			autoLog
		});
		this._psychoJS.logger.debug('create a new Rect with name: ', name);
		this._addAttribute(
			'width',
			width,
			0.5
		);
		this._addAttribute(
			'height',
			height,
			0.5
		);
		this._updateVertices();
		if (this._autoLog)
		{
			this._psychoJS.experimentLogger.exp(`Created ${this.name} = ${this.toString()}`);
		}
	}
	setWidth(width, log = false)
	{
		this._psychoJS.logger.debug('set the width of Rect: ', this.name, 'to: ', width);
		const hasChanged = this._setAttribute('width', width, log);
		if (hasChanged)
		{
			this._updateVertices();
		}
	}
	setHeight(height, log = false)
	{
		this._psychoJS.logger.debug('set the height of Rect: ', this.name, 'to: ', height);
		const hasChanged = this._setAttribute('height', height, log);
		if (hasChanged)
		{
			this._updateVertices();
		}
	}
	_updateVertices()
	{
		this._psychoJS.logger.debug('update the vertices of Rect: ', this.name);
		const halfWidth = this._width / 2.0;
		const halfHeight = this._height / 2.0;
		this.setVertices([
			[-halfWidth, -halfHeight],
			[halfWidth, -halfHeight],
			[halfWidth, halfHeight],
			[-halfWidth, halfHeight]
		]);
	}
}

export { Form, ImageStim, MovieStim, Polygon, Rect, ShapeStim, Slider, TextBox, TextInput, TextStim, VisualStim };
