#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
This experiment was created using PsychoPy3 Experiment Builder (v2020.2.3),
    on Tue Sep  1 22:12:35 2020
If you publish work using this script the most relevant publication is:

    Peirce J, Gray JR, Simpson S, MacAskill M, Höchenberger R, Sogo H, Kastman E, Lindeløv JK. (2019) 
        PsychoPy2: Experiments in behavior made easy Behav Res 51: 195. 
        https://doi.org/10.3758/s13428-018-01193-y

"""

from __future__ import absolute_import, division

import psychopy
psychopy.useVersion('2020.2.3')


from psychopy import locale_setup
from psychopy import prefs
prefs.hardware['audioLib'] = 'sounddevice'
from psychopy import sound, gui, visual, core, data, event, logging, clock
from psychopy.constants import (NOT_STARTED, STARTED, PLAYING, PAUSED,
                                STOPPED, FINISHED, PRESSED, RELEASED, FOREVER)

import numpy as np  # whole numpy lib is available, prepend 'np.'
from numpy import (sin, cos, tan, log, log10, pi, average,
                   sqrt, std, deg2rad, rad2deg, linspace, asarray)
from numpy.random import random, randint, normal, shuffle
import os  # handy system and path functions
import sys  # to get file system encoding

from psychopy.hardware import keyboard



# Ensure that relative paths start from the same directory as this script
_thisDir = os.path.dirname(os.path.abspath(__file__))
os.chdir(_thisDir)

# Store info about the experiment session
psychopyVersion = '2020.2.3'
expName = 'headphone_check'  # from the Builder filename that created this script
expInfo = {'participant': '1', 'version': '1'}
dlg = gui.DlgFromDict(dictionary=expInfo, sort_keys=False, title=expName)
if dlg.OK == False:
    core.quit()  # user pressed cancel
expInfo['date'] = data.getDateStr()  # add a simple timestamp
expInfo['expName'] = expName
expInfo['psychopyVersion'] = psychopyVersion

# Data file name stem = absolute path + name; later add .psyexp, .csv, .log, etc
filename = _thisDir + os.sep + u'data/%s_%s_%s' % (expInfo['participant'], expName, expInfo['date'])

# An ExperimentHandler isn't essential but helps with data saving
thisExp = data.ExperimentHandler(name=expName, version='',
    extraInfo=expInfo, runtimeInfo=None,
    originPath='/Users/allisonlink/Downloads/PsychoPy Tutorial/Code Demos/headphone_check/headphone_check_lastrun.py',
    savePickle=True, saveWideText=True,
    dataFileName=filename)
# save a log file for detail verbose info
logFile = logging.LogFile(filename+'.log', level=logging.DEBUG)
logging.console.setLevel(logging.WARNING)  # this outputs to the screen, not a file

endExpNow = False  # flag for 'escape' or other condition => quit the exp
frameTolerance = 0.001  # how close to onset before 'same' frame

# Start Code - component code to be run before the window creation

# Setup the Window
win = visual.Window(
    size=[2560, 1440], fullscr=True, screen=0, 
    winType='pyglet', allowGUI=False, allowStencil=False,
    monitor='testMonitor', color=[0,0,0], colorSpace='rgb',
    blendMode='avg', useFBO=True, 
    units='height')
# store frame rate of monitor if we can measure it
expInfo['frameRate'] = win.getActualFrameRate()
if expInfo['frameRate'] != None:
    frameDur = 1.0 / round(expInfo['frameRate'])
else:
    frameDur = 1.0 / 60.0  # could not measure, so guess

# create a default keyboard (e.g. to check for escape)
defaultKeyboard = keyboard.Keyboard()

# Initialize components for Routine "instr_HC"
instr_HCClock = core.Clock()
title_HC = visual.TextStim(win=win, name='title_HC',
    text='Headphone Check',
    font='Arial',
    pos=(0, .33), height=0.045, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=0.0);
instruction_HC = visual.TextStim(win=win, name='instruction_HC',
    text='Before we begin the study, you will complete a short task to confirm that you are wearing headphones.\n\nHeadphones are required for the entirety of this experiment, so please connect your headphones and put them on now.',
    font='Arial',
    pos=(0, 0), height=0.04, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-1.0);
space = visual.TextStim(win=win, name='space',
    text='Press the [SPACE] bar \nonce you are wearing headphones',
    font='Arial',
    pos=(0, -.33), height=0.035, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-2.0);
space_resp = keyboard.Keyboard()

# Initialize components for Routine "instr_HC_2"
instr_HC_2Clock = core.Clock()
title_HC_2 = visual.TextStim(win=win, name='title_HC_2',
    text='Headphone Check',
    font='Arial',
    pos=(0, .33), height=0.045, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=0.0);
instruction_HC_2 = visual.TextStim(win=win, name='instruction_HC_2',
    text='In this task, you will hear three tones played in a row. \nOne of these tones will sound quieter than the other two.\n\nAfter the tones finish playing, you will select which was the quietest by using a rating scale like the one below:',
    font='Arial',
    pos=(0, 0.16), height=0.032, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-1.0);
instruction_HC_3 = visual.TextStim(win=win, name='instruction_HC_3',
    text='You will rate six sets of tones. To pass the headphone check,\nyou must get at least FIVE out of SIX sets correct.',
    font='Arial',
    pos=(0, -0.17), height=0.033, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-2.0);
demo_quiet_rating = visual.Slider(win=win, name='demo_quiet_rating',
    size=(0.7, 0.032), pos=(0, 0), units=None,
    labels=["","Tone 1","Tone 2","Tone 3",""], ticks=(.8, 1, 2, 3, 3.2),
    granularity=1, style=['rating'],
    color='White', font='Arial',
    flip=False)
space_2 = visual.TextStim(win=win, name='space_2',
    text='Press the [SPACE] bar \nto continue reading the instructions',
    font='Arial',
    pos=(0, -.33), height=0.035, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-4.0);
space_resp_2 = keyboard.Keyboard()

# Initialize components for Routine "instr_HC_3"
instr_HC_3Clock = core.Clock()
title_HC_3 = visual.TextStim(win=win, name='title_HC_3',
    text='Headphone Check',
    font='Arial',
    pos=(0, .33), height=0.045, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=0.0);
instruction_HC_4 = visual.TextStim(win=win, name='instruction_HC_4',
    text='If you are wearing headphones, this task should be easy to complete! Without them, you will have a much harder time rating the tones acccurately.\n\nIf you fail the task, you will have one more chance to retry it before proceeding to the experiment.',
    font='Arial',
    pos=(0, 0), height=0.04, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-1.0);
space_3 = visual.TextStim(win=win, name='space_3',
    text='Press the [SPACE] bar \nto BEGIN the headphone check',
    font='Arial',
    pos=(0, -.33), height=0.035, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-2.0);
space_resp_3 = keyboard.Keyboard()

# Initialize components for Routine "pause"
pauseClock = core.Clock()
pause_silence = sound.Sound('materials/silence.wav', secs=-1, stereo=True, hamming=True,
    name='pause_silence')
pause_silence.setVolume(0)

# Initialize components for Routine "play_HC"
play_HCClock = core.Clock()
HC_fix_cross = visual.ShapeStim(
    win=win, name='HC_fix_cross', vertices='cross',
    size=(0.04, 0.04),
    ori=0, pos=(0, 0),
    lineWidth=.0005, lineColor=[1,1,1], lineColorSpace='rgb',
    fillColor=[1,1,1], fillColorSpace='rgb',
    opacity=1, depth=0.0, interpolate=True)
HC_play_tones = sound.Sound('A', secs=-1, stereo=True, hamming=True,
    name='HC_play_tones')
HC_play_tones.setVolume(1.25)

# Initialize components for Routine "rate_HC"
rate_HCClock = core.Clock()
# Correct response counter
num_correct = 0
quietest_tone = visual.TextStim(win=win, name='quietest_tone',
    text='Which tone was the quietest?',
    font='Arial',
    pos=(0, 0.15), height=0.04, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-1.0);
quiet_rating = visual.Slider(win=win, name='quiet_rating',
    size=(0.7, 0.032), pos=(0, .05), units=None,
    labels=["","Tone 1","Tone 2","Tone 3",""], ticks=(.8, 1, 2, 3, 3.2),
    granularity=1, style=['rating'],
    color='White', font='Arial',
    flip=False)
quiet_silence = sound.Sound('materials/silence.wav', secs=-1, stereo=True, hamming=True,
    name='quiet_silence')
quiet_silence.setVolume(0)

# Initialize components for Routine "pass_HC"
pass_HCClock = core.Clock()
title_passed = visual.TextStim(win=win, name='title_passed',
    text='You passed the headphone check!',
    font='Arial',
    pos=(0, 0.3), height=0.045, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-1.0);
you_passed = visual.TextStim(win=win, name='you_passed',
    text='You can now proceed to the experiment.',
    font='Arial',
    pos=(0, 0), height=0.04, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-2.0);
space_4 = visual.TextStim(win=win, name='space_4',
    text='Press the [SPACE] bar \nto proceed to the experiment',
    font='Arial',
    pos=(0, -.33), height=0.035, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-3.0);
space_resp_4 = keyboard.Keyboard()

# Initialize components for Routine "fail_HC_r1"
fail_HC_r1Clock = core.Clock()
title_fail = visual.TextStim(win=win, name='title_fail',
    text='You failed the headphone check',
    font='Arial',
    pos=(0, 0.3), height=0.045, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-1.0);
you_failed = visual.TextStim(win=win, name='you_failed',
    text='Please make sure that you are wearing headphones and try the task again.',
    font='Arial',
    pos=(0, 0), height=0.04, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-2.0);
space_5 = visual.TextStim(win=win, name='space_5',
    text='Press the [SPACE] bar \nto RETRY the headphone check',
    font='Arial',
    pos=(0, -.33), height=0.035, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-3.0);
space_resp_5 = keyboard.Keyboard()

# Initialize components for Routine "fail_HC_r2"
fail_HC_r2Clock = core.Clock()
title_fail_2 = visual.TextStim(win=win, name='title_fail_2',
    text='You failed the headphone check',
    font='Arial',
    pos=(0, 0), height=0.1, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-1.0);
you_failed_2 = visual.TextStim(win=win, name='you_failed_2',
    text='Again, please make sure that you are wearing headphones before continuing.\n\nThe headphone check is now finished and you can proceed to the experiment.',
    font='Arial',
    pos=(0, 0), height=0.04, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-2.0);
space_6 = visual.TextStim(win=win, name='space_6',
    text='Press the [SPACE] bar \nto BEGIN the headphone check',
    font='Arial',
    pos=(0, -.33), height=0.035, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-3.0);
space_resp_6 = keyboard.Keyboard()

# Create some handy timers
globalClock = core.Clock()  # to track the time since experiment started
routineTimer = core.CountdownTimer()  # to track time remaining of each (non-slip) routine 

# ------Prepare to start Routine "instr_HC"-------
continueRoutine = True
# update component parameters for each repeat
space_resp.keys = []
space_resp.rt = []
_space_resp_allKeys = []
# keep track of which components have finished
instr_HCComponents = [title_HC, instruction_HC, space, space_resp]
for thisComponent in instr_HCComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
instr_HCClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
frameN = -1

# -------Run Routine "instr_HC"-------
while continueRoutine:
    # get current time
    t = instr_HCClock.getTime()
    tThisFlip = win.getFutureFlipTime(clock=instr_HCClock)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *title_HC* updates
    if title_HC.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        title_HC.frameNStart = frameN  # exact frame index
        title_HC.tStart = t  # local t and not account for scr refresh
        title_HC.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(title_HC, 'tStartRefresh')  # time at next scr refresh
        title_HC.setAutoDraw(True)
    
    # *instruction_HC* updates
    if instruction_HC.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        instruction_HC.frameNStart = frameN  # exact frame index
        instruction_HC.tStart = t  # local t and not account for scr refresh
        instruction_HC.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(instruction_HC, 'tStartRefresh')  # time at next scr refresh
        instruction_HC.setAutoDraw(True)
    
    # *space* updates
    if space.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        space.frameNStart = frameN  # exact frame index
        space.tStart = t  # local t and not account for scr refresh
        space.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(space, 'tStartRefresh')  # time at next scr refresh
        space.setAutoDraw(True)
    
    # *space_resp* updates
    waitOnFlip = False
    if space_resp.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        space_resp.frameNStart = frameN  # exact frame index
        space_resp.tStart = t  # local t and not account for scr refresh
        space_resp.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(space_resp, 'tStartRefresh')  # time at next scr refresh
        space_resp.status = STARTED
        # keyboard checking is just starting
        waitOnFlip = True
        win.callOnFlip(space_resp.clock.reset)  # t=0 on next screen flip
        win.callOnFlip(space_resp.clearEvents, eventType='keyboard')  # clear events on next screen flip
    if space_resp.status == STARTED and not waitOnFlip:
        theseKeys = space_resp.getKeys(keyList=['space'], waitRelease=False)
        _space_resp_allKeys.extend(theseKeys)
        if len(_space_resp_allKeys):
            space_resp.keys = _space_resp_allKeys[-1].name  # just the last key pressed
            space_resp.rt = _space_resp_allKeys[-1].rt
            # a response ends the routine
            continueRoutine = False
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in instr_HCComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# -------Ending Routine "instr_HC"-------
for thisComponent in instr_HCComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
thisExp.addData('title_HC.started', title_HC.tStartRefresh)
thisExp.addData('title_HC.stopped', title_HC.tStopRefresh)
thisExp.addData('instruction_HC.started', instruction_HC.tStartRefresh)
thisExp.addData('instruction_HC.stopped', instruction_HC.tStopRefresh)
thisExp.addData('space.started', space.tStartRefresh)
thisExp.addData('space.stopped', space.tStopRefresh)
# check responses
if space_resp.keys in ['', [], None]:  # No response was made
    space_resp.keys = None
thisExp.addData('space_resp.keys',space_resp.keys)
if space_resp.keys != None:  # we had a response
    thisExp.addData('space_resp.rt', space_resp.rt)
thisExp.addData('space_resp.started', space_resp.tStartRefresh)
thisExp.addData('space_resp.stopped', space_resp.tStopRefresh)
thisExp.nextEntry()
# the Routine "instr_HC" was not non-slip safe, so reset the non-slip timer
routineTimer.reset()

# ------Prepare to start Routine "instr_HC_2"-------
continueRoutine = True
# update component parameters for each repeat
demo_quiet_rating.reset()
space_resp_2.keys = []
space_resp_2.rt = []
_space_resp_2_allKeys = []
# keep track of which components have finished
instr_HC_2Components = [title_HC_2, instruction_HC_2, instruction_HC_3, demo_quiet_rating, space_2, space_resp_2]
for thisComponent in instr_HC_2Components:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
instr_HC_2Clock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
frameN = -1

# -------Run Routine "instr_HC_2"-------
while continueRoutine:
    # get current time
    t = instr_HC_2Clock.getTime()
    tThisFlip = win.getFutureFlipTime(clock=instr_HC_2Clock)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *title_HC_2* updates
    if title_HC_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        title_HC_2.frameNStart = frameN  # exact frame index
        title_HC_2.tStart = t  # local t and not account for scr refresh
        title_HC_2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(title_HC_2, 'tStartRefresh')  # time at next scr refresh
        title_HC_2.setAutoDraw(True)
    
    # *instruction_HC_2* updates
    if instruction_HC_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        instruction_HC_2.frameNStart = frameN  # exact frame index
        instruction_HC_2.tStart = t  # local t and not account for scr refresh
        instruction_HC_2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(instruction_HC_2, 'tStartRefresh')  # time at next scr refresh
        instruction_HC_2.setAutoDraw(True)
    
    # *instruction_HC_3* updates
    if instruction_HC_3.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        instruction_HC_3.frameNStart = frameN  # exact frame index
        instruction_HC_3.tStart = t  # local t and not account for scr refresh
        instruction_HC_3.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(instruction_HC_3, 'tStartRefresh')  # time at next scr refresh
        instruction_HC_3.setAutoDraw(True)
    
    # *demo_quiet_rating* updates
    if demo_quiet_rating.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        demo_quiet_rating.frameNStart = frameN  # exact frame index
        demo_quiet_rating.tStart = t  # local t and not account for scr refresh
        demo_quiet_rating.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(demo_quiet_rating, 'tStartRefresh')  # time at next scr refresh
        demo_quiet_rating.setAutoDraw(True)
    
    # *space_2* updates
    if space_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        space_2.frameNStart = frameN  # exact frame index
        space_2.tStart = t  # local t and not account for scr refresh
        space_2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(space_2, 'tStartRefresh')  # time at next scr refresh
        space_2.setAutoDraw(True)
    
    # *space_resp_2* updates
    waitOnFlip = False
    if space_resp_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        space_resp_2.frameNStart = frameN  # exact frame index
        space_resp_2.tStart = t  # local t and not account for scr refresh
        space_resp_2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(space_resp_2, 'tStartRefresh')  # time at next scr refresh
        space_resp_2.status = STARTED
        # keyboard checking is just starting
        waitOnFlip = True
        win.callOnFlip(space_resp_2.clock.reset)  # t=0 on next screen flip
        win.callOnFlip(space_resp_2.clearEvents, eventType='keyboard')  # clear events on next screen flip
    if space_resp_2.status == STARTED and not waitOnFlip:
        theseKeys = space_resp_2.getKeys(keyList=['space'], waitRelease=False)
        _space_resp_2_allKeys.extend(theseKeys)
        if len(_space_resp_2_allKeys):
            space_resp_2.keys = _space_resp_2_allKeys[-1].name  # just the last key pressed
            space_resp_2.rt = _space_resp_2_allKeys[-1].rt
            # a response ends the routine
            continueRoutine = False
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in instr_HC_2Components:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# -------Ending Routine "instr_HC_2"-------
for thisComponent in instr_HC_2Components:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
thisExp.addData('title_HC_2.started', title_HC_2.tStartRefresh)
thisExp.addData('title_HC_2.stopped', title_HC_2.tStopRefresh)
thisExp.addData('instruction_HC_2.started', instruction_HC_2.tStartRefresh)
thisExp.addData('instruction_HC_2.stopped', instruction_HC_2.tStopRefresh)
thisExp.addData('instruction_HC_3.started', instruction_HC_3.tStartRefresh)
thisExp.addData('instruction_HC_3.stopped', instruction_HC_3.tStopRefresh)
thisExp.addData('demo_quiet_rating.response', demo_quiet_rating.getRating())
thisExp.addData('demo_quiet_rating.rt', demo_quiet_rating.getRT())
thisExp.addData('demo_quiet_rating.started', demo_quiet_rating.tStartRefresh)
thisExp.addData('demo_quiet_rating.stopped', demo_quiet_rating.tStopRefresh)
thisExp.addData('space_2.started', space_2.tStartRefresh)
thisExp.addData('space_2.stopped', space_2.tStopRefresh)
# check responses
if space_resp_2.keys in ['', [], None]:  # No response was made
    space_resp_2.keys = None
thisExp.addData('space_resp_2.keys',space_resp_2.keys)
if space_resp_2.keys != None:  # we had a response
    thisExp.addData('space_resp_2.rt', space_resp_2.rt)
thisExp.addData('space_resp_2.started', space_resp_2.tStartRefresh)
thisExp.addData('space_resp_2.stopped', space_resp_2.tStopRefresh)
thisExp.nextEntry()
# the Routine "instr_HC_2" was not non-slip safe, so reset the non-slip timer
routineTimer.reset()

# ------Prepare to start Routine "instr_HC_3"-------
continueRoutine = True
# update component parameters for each repeat
space_resp_3.keys = []
space_resp_3.rt = []
_space_resp_3_allKeys = []
# keep track of which components have finished
instr_HC_3Components = [title_HC_3, instruction_HC_4, space_3, space_resp_3]
for thisComponent in instr_HC_3Components:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
instr_HC_3Clock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
frameN = -1

# -------Run Routine "instr_HC_3"-------
while continueRoutine:
    # get current time
    t = instr_HC_3Clock.getTime()
    tThisFlip = win.getFutureFlipTime(clock=instr_HC_3Clock)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *title_HC_3* updates
    if title_HC_3.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        title_HC_3.frameNStart = frameN  # exact frame index
        title_HC_3.tStart = t  # local t and not account for scr refresh
        title_HC_3.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(title_HC_3, 'tStartRefresh')  # time at next scr refresh
        title_HC_3.setAutoDraw(True)
    
    # *instruction_HC_4* updates
    if instruction_HC_4.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        instruction_HC_4.frameNStart = frameN  # exact frame index
        instruction_HC_4.tStart = t  # local t and not account for scr refresh
        instruction_HC_4.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(instruction_HC_4, 'tStartRefresh')  # time at next scr refresh
        instruction_HC_4.setAutoDraw(True)
    
    # *space_3* updates
    if space_3.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        space_3.frameNStart = frameN  # exact frame index
        space_3.tStart = t  # local t and not account for scr refresh
        space_3.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(space_3, 'tStartRefresh')  # time at next scr refresh
        space_3.setAutoDraw(True)
    
    # *space_resp_3* updates
    waitOnFlip = False
    if space_resp_3.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        space_resp_3.frameNStart = frameN  # exact frame index
        space_resp_3.tStart = t  # local t and not account for scr refresh
        space_resp_3.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(space_resp_3, 'tStartRefresh')  # time at next scr refresh
        space_resp_3.status = STARTED
        # keyboard checking is just starting
        waitOnFlip = True
        win.callOnFlip(space_resp_3.clock.reset)  # t=0 on next screen flip
        win.callOnFlip(space_resp_3.clearEvents, eventType='keyboard')  # clear events on next screen flip
    if space_resp_3.status == STARTED and not waitOnFlip:
        theseKeys = space_resp_3.getKeys(keyList=['space'], waitRelease=False)
        _space_resp_3_allKeys.extend(theseKeys)
        if len(_space_resp_3_allKeys):
            space_resp_3.keys = _space_resp_3_allKeys[-1].name  # just the last key pressed
            space_resp_3.rt = _space_resp_3_allKeys[-1].rt
            # a response ends the routine
            continueRoutine = False
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in instr_HC_3Components:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# -------Ending Routine "instr_HC_3"-------
for thisComponent in instr_HC_3Components:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
thisExp.addData('title_HC_3.started', title_HC_3.tStartRefresh)
thisExp.addData('title_HC_3.stopped', title_HC_3.tStopRefresh)
thisExp.addData('instruction_HC_4.started', instruction_HC_4.tStartRefresh)
thisExp.addData('instruction_HC_4.stopped', instruction_HC_4.tStopRefresh)
thisExp.addData('space_3.started', space_3.tStartRefresh)
thisExp.addData('space_3.stopped', space_3.tStopRefresh)
# check responses
if space_resp_3.keys in ['', [], None]:  # No response was made
    space_resp_3.keys = None
thisExp.addData('space_resp_3.keys',space_resp_3.keys)
if space_resp_3.keys != None:  # we had a response
    thisExp.addData('space_resp_3.rt', space_resp_3.rt)
thisExp.addData('space_resp_3.started', space_resp_3.tStartRefresh)
thisExp.addData('space_resp_3.stopped', space_resp_3.tStopRefresh)
thisExp.nextEntry()
# the Routine "instr_HC_3" was not non-slip safe, so reset the non-slip timer
routineTimer.reset()

# set up handler to look after randomisation of conditions etc
HC_repeat = data.TrialHandler(nReps=1, method='sequential', 
    extraInfo=expInfo, originPath=-1,
    trialList=data.importConditions('materials/HC_repeat_cond.xlsx'),
    seed=None, name='HC_repeat')
thisExp.addLoop(HC_repeat)  # add the loop to the experiment
thisHC_repeat = HC_repeat.trialList[0]  # so we can initialise stimuli with some values
# abbreviate parameter names if possible (e.g. rgb = thisHC_repeat.rgb)
if thisHC_repeat != None:
    for paramName in thisHC_repeat:
        exec('{} = thisHC_repeat[paramName]'.format(paramName))

for thisHC_repeat in HC_repeat:
    currentLoop = HC_repeat
    # abbreviate parameter names if possible (e.g. rgb = thisHC_repeat.rgb)
    if thisHC_repeat != None:
        for paramName in thisHC_repeat:
            exec('{} = thisHC_repeat[paramName]'.format(paramName))
    
    # ------Prepare to start Routine "pause"-------
    continueRoutine = True
    # update component parameters for each repeat
    pause_silence.setSound('materials/silence.wav', hamming=True)
    pause_silence.setVolume(0, log=False)
    # keep track of which components have finished
    pauseComponents = [pause_silence]
    for thisComponent in pauseComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    pauseClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
    frameN = -1
    
    # -------Run Routine "pause"-------
    while continueRoutine:
        # get current time
        t = pauseClock.getTime()
        tThisFlip = win.getFutureFlipTime(clock=pauseClock)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        # start/stop pause_silence
        if pause_silence.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            pause_silence.frameNStart = frameN  # exact frame index
            pause_silence.tStart = t  # local t and not account for scr refresh
            pause_silence.tStartRefresh = tThisFlipGlobal  # on global time
            pause_silence.play(when=win)  # sync with win flip
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in pauseComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # -------Ending Routine "pause"-------
    for thisComponent in pauseComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    pause_silence.stop()  # ensure sound has stopped at end of routine
    HC_repeat.addData('pause_silence.started', pause_silence.tStartRefresh)
    HC_repeat.addData('pause_silence.stopped', pause_silence.tStopRefresh)
    # the Routine "pause" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    
    # set up handler to look after randomisation of conditions etc
    HC_trials = data.TrialHandler(nReps=1, method='random', 
        extraInfo=expInfo, originPath=-1,
        trialList=data.importConditions('materials/HC_cond.xlsx'),
        seed=None, name='HC_trials')
    thisExp.addLoop(HC_trials)  # add the loop to the experiment
    thisHC_trial = HC_trials.trialList[0]  # so we can initialise stimuli with some values
    # abbreviate parameter names if possible (e.g. rgb = thisHC_trial.rgb)
    if thisHC_trial != None:
        for paramName in thisHC_trial:
            exec('{} = thisHC_trial[paramName]'.format(paramName))
    
    for thisHC_trial in HC_trials:
        currentLoop = HC_trials
        # abbreviate parameter names if possible (e.g. rgb = thisHC_trial.rgb)
        if thisHC_trial != None:
            for paramName in thisHC_trial:
                exec('{} = thisHC_trial[paramName]'.format(paramName))
        
        # ------Prepare to start Routine "play_HC"-------
        continueRoutine = True
        # update component parameters for each repeat
        HC_play_tones.setSound(tones, hamming=True)
        HC_play_tones.setVolume(1.25, log=False)
        # keep track of which components have finished
        play_HCComponents = [HC_fix_cross, HC_play_tones]
        for thisComponent in play_HCComponents:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        play_HCClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
        frameN = -1
        
        # -------Run Routine "play_HC"-------
        while continueRoutine:
            # get current time
            t = play_HCClock.getTime()
            tThisFlip = win.getFutureFlipTime(clock=play_HCClock)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            
            # *HC_fix_cross* updates
            if HC_fix_cross.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
                # keep track of start time/frame for later
                HC_fix_cross.frameNStart = frameN  # exact frame index
                HC_fix_cross.tStart = t  # local t and not account for scr refresh
                HC_fix_cross.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(HC_fix_cross, 'tStartRefresh')  # time at next scr refresh
                HC_fix_cross.setAutoDraw(True)
            if HC_fix_cross.status == STARTED:
                if bool(HC_play_tones.status == FINISHED):
                    # keep track of stop time/frame for later
                    HC_fix_cross.tStop = t  # not accounting for scr refresh
                    HC_fix_cross.frameNStop = frameN  # exact frame index
                    win.timeOnFlip(HC_fix_cross, 'tStopRefresh')  # time at next scr refresh
                    HC_fix_cross.setAutoDraw(False)
            # start/stop HC_play_tones
            if HC_play_tones.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
                # keep track of start time/frame for later
                HC_play_tones.frameNStart = frameN  # exact frame index
                HC_play_tones.tStart = t  # local t and not account for scr refresh
                HC_play_tones.tStartRefresh = tThisFlipGlobal  # on global time
                HC_play_tones.play(when=win)  # sync with win flip
            
            # check for quit (typically the Esc key)
            if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
                core.quit()
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in play_HCComponents:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # -------Ending Routine "play_HC"-------
        for thisComponent in play_HCComponents:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        HC_trials.addData('HC_fix_cross.started', HC_fix_cross.tStartRefresh)
        HC_trials.addData('HC_fix_cross.stopped', HC_fix_cross.tStopRefresh)
        HC_play_tones.stop()  # ensure sound has stopped at end of routine
        HC_trials.addData('HC_play_tones.started', HC_play_tones.tStartRefresh)
        HC_trials.addData('HC_play_tones.stopped', HC_play_tones.tStopRefresh)
        # the Routine "play_HC" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset()
        
        # ------Prepare to start Routine "rate_HC"-------
        continueRoutine = True
        # update component parameters for each repeat
        quiet_rating.reset()
        quiet_silence.setSound('materials/silence.wav', hamming=True)
        quiet_silence.setVolume(0, log=False)
        # keep track of which components have finished
        rate_HCComponents = [quietest_tone, quiet_rating, quiet_silence]
        for thisComponent in rate_HCComponents:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        rate_HCClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
        frameN = -1
        
        # -------Run Routine "rate_HC"-------
        while continueRoutine:
            # get current time
            t = rate_HCClock.getTime()
            tThisFlip = win.getFutureFlipTime(clock=rate_HCClock)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            
            # *quietest_tone* updates
            if quietest_tone.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
                # keep track of start time/frame for later
                quietest_tone.frameNStart = frameN  # exact frame index
                quietest_tone.tStart = t  # local t and not account for scr refresh
                quietest_tone.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(quietest_tone, 'tStartRefresh')  # time at next scr refresh
                quietest_tone.setAutoDraw(True)
            if quietest_tone.status == STARTED:
                if bool(quiet_silence.status == FINISHED):
                    # keep track of stop time/frame for later
                    quietest_tone.tStop = t  # not accounting for scr refresh
                    quietest_tone.frameNStop = frameN  # exact frame index
                    win.timeOnFlip(quietest_tone, 'tStopRefresh')  # time at next scr refresh
                    quietest_tone.setAutoDraw(False)
            
            # *quiet_rating* updates
            if quiet_rating.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
                # keep track of start time/frame for later
                quiet_rating.frameNStart = frameN  # exact frame index
                quiet_rating.tStart = t  # local t and not account for scr refresh
                quiet_rating.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(quiet_rating, 'tStartRefresh')  # time at next scr refresh
                quiet_rating.setAutoDraw(True)
            if quiet_rating.status == STARTED:
                if bool(quiet_silence.status == FINISHED):
                    # keep track of stop time/frame for later
                    quiet_rating.tStop = t  # not accounting for scr refresh
                    quiet_rating.frameNStop = frameN  # exact frame index
                    win.timeOnFlip(quiet_rating, 'tStopRefresh')  # time at next scr refresh
                    quiet_rating.setAutoDraw(False)
            
            # Check quiet_rating for response to end routine
            if quiet_rating.getRating() is not None and quiet_rating.status == STARTED:
                continueRoutine = False
            # start/stop quiet_silence
            if quiet_silence.status == NOT_STARTED and quiet_rating.rating:
                # keep track of start time/frame for later
                quiet_silence.frameNStart = frameN  # exact frame index
                quiet_silence.tStart = t  # local t and not account for scr refresh
                quiet_silence.tStartRefresh = tThisFlipGlobal  # on global time
                quiet_silence.play(when=win)  # sync with win flip
            
            # check for quit (typically the Esc key)
            if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
                core.quit()
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in rate_HCComponents:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # -------Ending Routine "rate_HC"-------
        for thisComponent in rate_HCComponents:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        # Add correct response
        if quiet_rating.rating == correct_resp:
            num_correct = num_correct + 1
        HC_trials.addData('quietest_tone.started', quietest_tone.tStartRefresh)
        HC_trials.addData('quietest_tone.stopped', quietest_tone.tStopRefresh)
        HC_trials.addData('quiet_rating.response', quiet_rating.getRating())
        HC_trials.addData('quiet_rating.rt', quiet_rating.getRT())
        HC_trials.addData('quiet_rating.started', quiet_rating.tStartRefresh)
        HC_trials.addData('quiet_rating.stopped', quiet_rating.tStopRefresh)
        quiet_silence.stop()  # ensure sound has stopped at end of routine
        HC_trials.addData('quiet_silence.started', quiet_silence.tStartRefresh)
        HC_trials.addData('quiet_silence.stopped', quiet_silence.tStopRefresh)
        # the Routine "rate_HC" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset()
        thisExp.nextEntry()
        
    # completed 1 repeats of 'HC_trials'
    
    
    # ------Prepare to start Routine "pass_HC"-------
    continueRoutine = True
    # update component parameters for each repeat
    # Save variables
    thisExp.addData('num_correct', num_correct)
    
    # Continue routine if passed
    if num_correct >= 5:
        continueRoutine = True
    
    # Abort routine if failed
    if num_correct < 5:
        continueRoutine = False
    space_resp_4.keys = []
    space_resp_4.rt = []
    _space_resp_4_allKeys = []
    # keep track of which components have finished
    pass_HCComponents = [title_passed, you_passed, space_4, space_resp_4]
    for thisComponent in pass_HCComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    pass_HCClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
    frameN = -1
    
    # -------Run Routine "pass_HC"-------
    while continueRoutine:
        # get current time
        t = pass_HCClock.getTime()
        tThisFlip = win.getFutureFlipTime(clock=pass_HCClock)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *title_passed* updates
        if title_passed.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            title_passed.frameNStart = frameN  # exact frame index
            title_passed.tStart = t  # local t and not account for scr refresh
            title_passed.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(title_passed, 'tStartRefresh')  # time at next scr refresh
            title_passed.setAutoDraw(True)
        
        # *you_passed* updates
        if you_passed.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            you_passed.frameNStart = frameN  # exact frame index
            you_passed.tStart = t  # local t and not account for scr refresh
            you_passed.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(you_passed, 'tStartRefresh')  # time at next scr refresh
            you_passed.setAutoDraw(True)
        
        # *space_4* updates
        if space_4.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            space_4.frameNStart = frameN  # exact frame index
            space_4.tStart = t  # local t and not account for scr refresh
            space_4.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(space_4, 'tStartRefresh')  # time at next scr refresh
            space_4.setAutoDraw(True)
        
        # *space_resp_4* updates
        waitOnFlip = False
        if space_resp_4.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            space_resp_4.frameNStart = frameN  # exact frame index
            space_resp_4.tStart = t  # local t and not account for scr refresh
            space_resp_4.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(space_resp_4, 'tStartRefresh')  # time at next scr refresh
            space_resp_4.status = STARTED
            # keyboard checking is just starting
            waitOnFlip = True
            win.callOnFlip(space_resp_4.clock.reset)  # t=0 on next screen flip
            win.callOnFlip(space_resp_4.clearEvents, eventType='keyboard')  # clear events on next screen flip
        if space_resp_4.status == STARTED and not waitOnFlip:
            theseKeys = space_resp_4.getKeys(keyList=['space'], waitRelease=False)
            _space_resp_4_allKeys.extend(theseKeys)
            if len(_space_resp_4_allKeys):
                space_resp_4.keys = _space_resp_4_allKeys[-1].name  # just the last key pressed
                space_resp_4.rt = _space_resp_4_allKeys[-1].rt
                # a response ends the routine
                continueRoutine = False
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in pass_HCComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # -------Ending Routine "pass_HC"-------
    for thisComponent in pass_HCComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    # Abort repeat loop if passed
    if num_correct >= 5:
        HC_repeat.finished = True
    HC_repeat.addData('title_passed.started', title_passed.tStartRefresh)
    HC_repeat.addData('title_passed.stopped', title_passed.tStopRefresh)
    HC_repeat.addData('you_passed.started', you_passed.tStartRefresh)
    HC_repeat.addData('you_passed.stopped', you_passed.tStopRefresh)
    HC_repeat.addData('space_4.started', space_4.tStartRefresh)
    HC_repeat.addData('space_4.stopped', space_4.tStopRefresh)
    # check responses
    if space_resp_4.keys in ['', [], None]:  # No response was made
        space_resp_4.keys = None
    HC_repeat.addData('space_resp_4.keys',space_resp_4.keys)
    if space_resp_4.keys != None:  # we had a response
        HC_repeat.addData('space_resp_4.rt', space_resp_4.rt)
    HC_repeat.addData('space_resp_4.started', space_resp_4.tStartRefresh)
    HC_repeat.addData('space_resp_4.stopped', space_resp_4.tStopRefresh)
    # the Routine "pass_HC" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    
    # ------Prepare to start Routine "fail_HC_r1"-------
    continueRoutine = True
    # update component parameters for each repeat
    # Continue routine if round 1 and failed
    if round == 1 and num_correct < 5:
        continueRoutine = True
    
    # Abort routine if round 2 or passed
    if round == 2 or num_correct >= 5:
        continueRoutine = False
    space_resp_5.keys = []
    space_resp_5.rt = []
    _space_resp_5_allKeys = []
    # keep track of which components have finished
    fail_HC_r1Components = [title_fail, you_failed, space_5, space_resp_5]
    for thisComponent in fail_HC_r1Components:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    fail_HC_r1Clock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
    frameN = -1
    
    # -------Run Routine "fail_HC_r1"-------
    while continueRoutine:
        # get current time
        t = fail_HC_r1Clock.getTime()
        tThisFlip = win.getFutureFlipTime(clock=fail_HC_r1Clock)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *title_fail* updates
        if title_fail.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            title_fail.frameNStart = frameN  # exact frame index
            title_fail.tStart = t  # local t and not account for scr refresh
            title_fail.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(title_fail, 'tStartRefresh')  # time at next scr refresh
            title_fail.setAutoDraw(True)
        
        # *you_failed* updates
        if you_failed.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            you_failed.frameNStart = frameN  # exact frame index
            you_failed.tStart = t  # local t and not account for scr refresh
            you_failed.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(you_failed, 'tStartRefresh')  # time at next scr refresh
            you_failed.setAutoDraw(True)
        
        # *space_5* updates
        if space_5.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            space_5.frameNStart = frameN  # exact frame index
            space_5.tStart = t  # local t and not account for scr refresh
            space_5.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(space_5, 'tStartRefresh')  # time at next scr refresh
            space_5.setAutoDraw(True)
        
        # *space_resp_5* updates
        waitOnFlip = False
        if space_resp_5.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            space_resp_5.frameNStart = frameN  # exact frame index
            space_resp_5.tStart = t  # local t and not account for scr refresh
            space_resp_5.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(space_resp_5, 'tStartRefresh')  # time at next scr refresh
            space_resp_5.status = STARTED
            # keyboard checking is just starting
            waitOnFlip = True
            win.callOnFlip(space_resp_5.clock.reset)  # t=0 on next screen flip
            win.callOnFlip(space_resp_5.clearEvents, eventType='keyboard')  # clear events on next screen flip
        if space_resp_5.status == STARTED and not waitOnFlip:
            theseKeys = space_resp_5.getKeys(keyList=['space'], waitRelease=False)
            _space_resp_5_allKeys.extend(theseKeys)
            if len(_space_resp_5_allKeys):
                space_resp_5.keys = _space_resp_5_allKeys[-1].name  # just the last key pressed
                space_resp_5.rt = _space_resp_5_allKeys[-1].rt
                # a response ends the routine
                continueRoutine = False
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in fail_HC_r1Components:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # -------Ending Routine "fail_HC_r1"-------
    for thisComponent in fail_HC_r1Components:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    HC_repeat.addData('title_fail.started', title_fail.tStartRefresh)
    HC_repeat.addData('title_fail.stopped', title_fail.tStopRefresh)
    HC_repeat.addData('you_failed.started', you_failed.tStartRefresh)
    HC_repeat.addData('you_failed.stopped', you_failed.tStopRefresh)
    HC_repeat.addData('space_5.started', space_5.tStartRefresh)
    HC_repeat.addData('space_5.stopped', space_5.tStopRefresh)
    # check responses
    if space_resp_5.keys in ['', [], None]:  # No response was made
        space_resp_5.keys = None
    HC_repeat.addData('space_resp_5.keys',space_resp_5.keys)
    if space_resp_5.keys != None:  # we had a response
        HC_repeat.addData('space_resp_5.rt', space_resp_5.rt)
    HC_repeat.addData('space_resp_5.started', space_resp_5.tStartRefresh)
    HC_repeat.addData('space_resp_5.stopped', space_resp_5.tStopRefresh)
    # the Routine "fail_HC_r1" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    
    # ------Prepare to start Routine "fail_HC_r2"-------
    continueRoutine = True
    # update component parameters for each repeat
    # Continue routine if round 2 and failed
    if round == 2 and num_correct < 5:
        num_correct = 0
        continueRoutine = True
    
    # Abort routine if round 1 or passed
    if round == 1 or num_correct >= 5:
        num_correct = 0
        continueRoutine = False
    space_resp_6.keys = []
    space_resp_6.rt = []
    _space_resp_6_allKeys = []
    # keep track of which components have finished
    fail_HC_r2Components = [title_fail_2, you_failed_2, space_6, space_resp_6]
    for thisComponent in fail_HC_r2Components:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    fail_HC_r2Clock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
    frameN = -1
    
    # -------Run Routine "fail_HC_r2"-------
    while continueRoutine:
        # get current time
        t = fail_HC_r2Clock.getTime()
        tThisFlip = win.getFutureFlipTime(clock=fail_HC_r2Clock)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *title_fail_2* updates
        if title_fail_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            title_fail_2.frameNStart = frameN  # exact frame index
            title_fail_2.tStart = t  # local t and not account for scr refresh
            title_fail_2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(title_fail_2, 'tStartRefresh')  # time at next scr refresh
            title_fail_2.setAutoDraw(True)
        
        # *you_failed_2* updates
        if you_failed_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            you_failed_2.frameNStart = frameN  # exact frame index
            you_failed_2.tStart = t  # local t and not account for scr refresh
            you_failed_2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(you_failed_2, 'tStartRefresh')  # time at next scr refresh
            you_failed_2.setAutoDraw(True)
        
        # *space_6* updates
        if space_6.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            space_6.frameNStart = frameN  # exact frame index
            space_6.tStart = t  # local t and not account for scr refresh
            space_6.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(space_6, 'tStartRefresh')  # time at next scr refresh
            space_6.setAutoDraw(True)
        
        # *space_resp_6* updates
        waitOnFlip = False
        if space_resp_6.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            space_resp_6.frameNStart = frameN  # exact frame index
            space_resp_6.tStart = t  # local t and not account for scr refresh
            space_resp_6.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(space_resp_6, 'tStartRefresh')  # time at next scr refresh
            space_resp_6.status = STARTED
            # keyboard checking is just starting
            waitOnFlip = True
            win.callOnFlip(space_resp_6.clock.reset)  # t=0 on next screen flip
            win.callOnFlip(space_resp_6.clearEvents, eventType='keyboard')  # clear events on next screen flip
        if space_resp_6.status == STARTED and not waitOnFlip:
            theseKeys = space_resp_6.getKeys(keyList=['space'], waitRelease=False)
            _space_resp_6_allKeys.extend(theseKeys)
            if len(_space_resp_6_allKeys):
                space_resp_6.keys = _space_resp_6_allKeys[-1].name  # just the last key pressed
                space_resp_6.rt = _space_resp_6_allKeys[-1].rt
                # a response ends the routine
                continueRoutine = False
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in fail_HC_r2Components:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # -------Ending Routine "fail_HC_r2"-------
    for thisComponent in fail_HC_r2Components:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    HC_repeat.addData('title_fail_2.started', title_fail_2.tStartRefresh)
    HC_repeat.addData('title_fail_2.stopped', title_fail_2.tStopRefresh)
    HC_repeat.addData('you_failed_2.started', you_failed_2.tStartRefresh)
    HC_repeat.addData('you_failed_2.stopped', you_failed_2.tStopRefresh)
    HC_repeat.addData('space_6.started', space_6.tStartRefresh)
    HC_repeat.addData('space_6.stopped', space_6.tStopRefresh)
    # check responses
    if space_resp_6.keys in ['', [], None]:  # No response was made
        space_resp_6.keys = None
    HC_repeat.addData('space_resp_6.keys',space_resp_6.keys)
    if space_resp_6.keys != None:  # we had a response
        HC_repeat.addData('space_resp_6.rt', space_resp_6.rt)
    HC_repeat.addData('space_resp_6.started', space_resp_6.tStartRefresh)
    HC_repeat.addData('space_resp_6.stopped', space_resp_6.tStopRefresh)
    # the Routine "fail_HC_r2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
# completed 1 repeats of 'HC_repeat'


# Flip one final time so any remaining win.callOnFlip() 
# and win.timeOnFlip() tasks get executed before quitting
win.flip()

# these shouldn't be strictly necessary (should auto-save)
thisExp.saveAsWideText(filename+'.csv', delim='auto')
thisExp.saveAsPickle(filename)
logging.flush()
# make sure everything is closed down
thisExp.abort()  # or data files will save again on exit
win.close()
core.quit()
