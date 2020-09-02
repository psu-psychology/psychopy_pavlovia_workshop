#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
This experiment was created using PsychoPy3 Experiment Builder (v2020.2.3),
    on Tue Sep  1 21:23:54 2020
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
expName = 'consent_form'  # from the Builder filename that created this script
expInfo = {'participant': '1', 'condition': '1'}
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
    originPath='/Users/allisonlink/Desktop/PsychoPy Tutorial/Code Demos/consent_form/consent_form_lastrun.py',
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

# Initialize components for Routine "consent_instr"
consent_instrClock = core.Clock()
title_consent_welcome = visual.TextStim(win=win, name='title_consent_welcome',
    text='Welcome to the experiment!',
    font='Arial',
    pos=(0, .33), height=0.045, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=0.0);
consent_info = visual.TextStim(win=win, name='consent_info',
    text='Before beginning the experiment, please read \nthe consent form carefully and indicate whether\nor not you agree to participate in this study.',
    font='Arial',
    pos=(0, 0), height=0.04, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-1.0);
space_consent = visual.TextStim(win=win, name='space_consent',
    text='Press the [SPACE] bar \nto read the consent form',
    font='Arial',
    pos=(0, -.33), height=0.035, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-2.0);
space_resp_consent = keyboard.Keyboard()

# Initialize components for Routine "consent_1"
consent_1Clock = core.Clock()
title_consent = visual.TextStim(win=win, name='title_consent',
    text='Consent Form (Part 1/3)',
    font='Arial',
    pos=(0, .33), height=0.045, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=0.0);
consent_info_2 = visual.TextStim(win=win, name='consent_info_2',
    text='1. Purpose of the Study: The purpose of this research study is to explore how people acquire languages.\n\n2. Procedures to be followed: You will be asked to listen to a stream of sentences spoken in a foreign language using headphones while seated at a computer. To check whether you are wearing headphones, you will be asked to complete a task where you will listen to some tones and make judgements about their volume. While listening to the sentences, you will also be asked to listen to some tones and make judgements about the number of tones that you heard. After approximately 25 minutes, you will listen to some sentences presented one at a time and be asked to choose whether they came from the language that you listened to at the beginning of the experiment.',
    font='Arial',
    pos=(0, 0), height=0.03, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-1.0);
space_consent_2 = visual.TextStim(win=win, name='space_consent_2',
    text='Press the [SPACE] bar\nto continue reading the consent form',
    font='Arial',
    pos=(0, -.33), height=0.035, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-2.0);
space_resp_consent_2 = keyboard.Keyboard()

# Initialize components for Routine "consent_2"
consent_2Clock = core.Clock()
title_consent_2 = visual.TextStim(win=win, name='title_consent_2',
    text='Consent Form (Part 2/3)',
    font='Arial',
    pos=(0, .33), height=0.045, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=0.0);
consent_info_3 = visual.TextStim(win=win, name='consent_info_3',
    text='3. Discomforts and Risks: There are no risks in participating in this research beyond those experienced in everyday life.\n\n4. Benefits: This study is designed to further our understanding of language acquisition. Gaining an understanding of basic mechanisms supporting language acquisition may ultimately have clinical implications in the future and will inform the basic science related to how language is acquired.\n\n5. Duration: It will take approximately 35 minutes to complete this study.\n\n6. Statement of Confidentiality: Your participation in this research is confidential. The data will be stored in a secure server hosted by Pavlovia (Open Science Tools Ltd.), and can only be accessed by the researchers conducting this study. The Pennsylvania State University’s Office for Research Protections and Institutional Review Board and the Office for Human Research Protections in the Department of Health and Human Services may review records related to this research study. In the event of a publication or presentation resulting from the research, no personally identifiable information will be shared.',
    font='Arial',
    pos=(0, 0), height=0.025, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-1.0);
space_consent_3 = visual.TextStim(win=win, name='space_consent_3',
    text='Press the [SPACE] bar\nto continue reading the consent form',
    font='Arial',
    pos=(0, -.33), height=0.035, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-2.0);
space_resp_consent_3 = keyboard.Keyboard()

# Initialize components for Routine "consent_3"
consent_3Clock = core.Clock()
title_consent_3 = visual.TextStim(win=win, name='title_consent_3',
    text='Consent Form (Part 3/3)',
    font='Arial',
    pos=(0, .33), height=0.045, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=0.0);
consent_info_4 = visual.TextStim(win=win, name='consent_info_4',
    text='7. Right to Ask Questions: Please contact the Language and Cognition Lab via email at PSULanguageLearningExp@gmail.com with questions, complaints, or concerns about this research. You can also contact this email address if you feel that this study has harmed you. If you have any questions, concerns, problems about your rights as a research participant or would like to offer input, please contact The Pennsylvania State University’s Office for Research Protections (ORP) at (814) 865-1775. The ORP cannot answer questions about research procedures. Questions about research procedures can be answered by the research team.\n\n8. Payment for participation: In return for your participation, you will earn 9.51 USD per hour. The average time to complete this study is 35 minutes, so a payment of about 5.55 USD is typical.\n\n9. Voluntary Participation: Your decision to be in this research is voluntary. You can stop at any time by clicking the “esc” key on your keyboard or by exiting your browser. Refusal to take part in or withdrawing from this study will involve no penalty and you will forfeit any monetary earnings that you would otherwise receive via Prolific for your participation.',
    font='Arial',
    pos=(0, 0), height=0.025, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-1.0);
space_consent_4 = visual.TextStim(win=win, name='space_consent_4',
    text='Press the [SPACE] bar\nto continue',
    font='Arial',
    pos=(0, -.33), height=0.035, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-2.0);
space_resp_consent_4 = keyboard.Keyboard()

# Initialize components for Routine "repeat"
repeatClock = core.Clock()
would_you_like = visual.TextStim(win=win, name='would_you_like',
    text='Would you like to go back and \nread the consent form again?',
    font='Arial',
    pos=(0, .21), height=0.04, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-1.0);
please_click = visual.TextStim(win=win, name='please_click',
    text='Please click one of the options below',
    font='Arial',
    pos=(0, .14), height=0.03, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-2.0);
yes = visual.TextStim(win=win, name='yes',
    text='Yes',
    font='Arial',
    pos=(-0.25, 0), height=0.045, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-3.0);
no = visual.TextStim(win=win, name='no',
    text='No',
    font='Arial',
    pos=(0.25, 0), height=0.045, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-4.0);
mouse = event.Mouse(win=win)
x, y = [None, None]
mouse.mouseClock = core.Clock()

# Initialize components for Routine "agree_disagree"
agree_disagreeClock = core.Clock()
title_consent_4 = visual.TextStim(win=win, name='title_consent_4',
    text='Agreement of Consent',
    font='Arial',
    pos=(0, .33), height=0.045, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=0.0);
do_you_consent = visual.TextStim(win=win, name='do_you_consent',
    text='Do you give your consent to participate in this study?',
    font='Arial',
    pos=(0, .16), height=0.04, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-1.0);
please_click_2 = visual.TextStim(win=win, name='please_click_2',
    text='Please click one of the options below',
    font='Arial',
    pos=(0, .11), height=0.033, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-2.0);
if_you = visual.TextStim(win=win, name='if_you',
    text='If you agree, you will continue on to the experiment\nIf you disagree, the experiment will end automatically',
    font='Arial',
    pos=(0, 0.025), height=0.03, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-3.0);
i_agree = visual.TextStim(win=win, name='i_agree',
    text='I agree',
    font='Arial',
    pos=(-0.3, -0.08), height=0.045, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-4.0);
i_disagree = visual.TextStim(win=win, name='i_disagree',
    text='I disagree',
    font='Arial',
    pos=(0.3, -0.08), height=0.045, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-5.0);
mouse_2 = event.Mouse(win=win)
x, y = [None, None]
mouse_2.mouseClock = core.Clock()

# Initialize components for Routine "goodbye"
goodbyeClock = core.Clock()
thank_you_disagree = visual.TextStim(win=win, name='thank_you_disagree',
    text='Thank you for taking the time \nto consider participating in this study.',
    font='Arial',
    pos=(0, 0), height=0.043, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-1.0);

# Initialize components for Routine "instr"
instrClock = core.Clock()
thank_you_agree = visual.TextStim(win=win, name='thank_you_agree',
    text='Thank you for agreeing to participate in our study!',
    font='Arial',
    pos=(0, 0), height=0.043, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=0.0);
key_resp = keyboard.Keyboard()

# Create some handy timers
globalClock = core.Clock()  # to track the time since experiment started
routineTimer = core.CountdownTimer()  # to track time remaining of each (non-slip) routine 

# ------Prepare to start Routine "consent_instr"-------
continueRoutine = True
# update component parameters for each repeat
space_resp_consent.keys = []
space_resp_consent.rt = []
_space_resp_consent_allKeys = []
# keep track of which components have finished
consent_instrComponents = [title_consent_welcome, consent_info, space_consent, space_resp_consent]
for thisComponent in consent_instrComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
consent_instrClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
frameN = -1

# -------Run Routine "consent_instr"-------
while continueRoutine:
    # get current time
    t = consent_instrClock.getTime()
    tThisFlip = win.getFutureFlipTime(clock=consent_instrClock)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *title_consent_welcome* updates
    if title_consent_welcome.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        title_consent_welcome.frameNStart = frameN  # exact frame index
        title_consent_welcome.tStart = t  # local t and not account for scr refresh
        title_consent_welcome.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(title_consent_welcome, 'tStartRefresh')  # time at next scr refresh
        title_consent_welcome.setAutoDraw(True)
    
    # *consent_info* updates
    if consent_info.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        consent_info.frameNStart = frameN  # exact frame index
        consent_info.tStart = t  # local t and not account for scr refresh
        consent_info.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(consent_info, 'tStartRefresh')  # time at next scr refresh
        consent_info.setAutoDraw(True)
    
    # *space_consent* updates
    if space_consent.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        space_consent.frameNStart = frameN  # exact frame index
        space_consent.tStart = t  # local t and not account for scr refresh
        space_consent.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(space_consent, 'tStartRefresh')  # time at next scr refresh
        space_consent.setAutoDraw(True)
    
    # *space_resp_consent* updates
    waitOnFlip = False
    if space_resp_consent.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        space_resp_consent.frameNStart = frameN  # exact frame index
        space_resp_consent.tStart = t  # local t and not account for scr refresh
        space_resp_consent.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(space_resp_consent, 'tStartRefresh')  # time at next scr refresh
        space_resp_consent.status = STARTED
        # keyboard checking is just starting
        waitOnFlip = True
        win.callOnFlip(space_resp_consent.clock.reset)  # t=0 on next screen flip
        win.callOnFlip(space_resp_consent.clearEvents, eventType='keyboard')  # clear events on next screen flip
    if space_resp_consent.status == STARTED and not waitOnFlip:
        theseKeys = space_resp_consent.getKeys(keyList=['space'], waitRelease=False)
        _space_resp_consent_allKeys.extend(theseKeys)
        if len(_space_resp_consent_allKeys):
            space_resp_consent.keys = _space_resp_consent_allKeys[-1].name  # just the last key pressed
            space_resp_consent.rt = _space_resp_consent_allKeys[-1].rt
            # a response ends the routine
            continueRoutine = False
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in consent_instrComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# -------Ending Routine "consent_instr"-------
for thisComponent in consent_instrComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
thisExp.addData('title_consent_welcome.started', title_consent_welcome.tStartRefresh)
thisExp.addData('title_consent_welcome.stopped', title_consent_welcome.tStopRefresh)
thisExp.addData('consent_info.started', consent_info.tStartRefresh)
thisExp.addData('consent_info.stopped', consent_info.tStopRefresh)
thisExp.addData('space_consent.started', space_consent.tStartRefresh)
thisExp.addData('space_consent.stopped', space_consent.tStopRefresh)
# check responses
if space_resp_consent.keys in ['', [], None]:  # No response was made
    space_resp_consent.keys = None
thisExp.addData('space_resp_consent.keys',space_resp_consent.keys)
if space_resp_consent.keys != None:  # we had a response
    thisExp.addData('space_resp_consent.rt', space_resp_consent.rt)
thisExp.addData('space_resp_consent.started', space_resp_consent.tStartRefresh)
thisExp.addData('space_resp_consent.stopped', space_resp_consent.tStopRefresh)
thisExp.nextEntry()
# the Routine "consent_instr" was not non-slip safe, so reset the non-slip timer
routineTimer.reset()

# set up handler to look after randomisation of conditions etc
consent_repeat = data.TrialHandler(nReps=10, method='random', 
    extraInfo=expInfo, originPath=-1,
    trialList=[None],
    seed=None, name='consent_repeat')
thisExp.addLoop(consent_repeat)  # add the loop to the experiment
thisConsent_repeat = consent_repeat.trialList[0]  # so we can initialise stimuli with some values
# abbreviate parameter names if possible (e.g. rgb = thisConsent_repeat.rgb)
if thisConsent_repeat != None:
    for paramName in thisConsent_repeat:
        exec('{} = thisConsent_repeat[paramName]'.format(paramName))

for thisConsent_repeat in consent_repeat:
    currentLoop = consent_repeat
    # abbreviate parameter names if possible (e.g. rgb = thisConsent_repeat.rgb)
    if thisConsent_repeat != None:
        for paramName in thisConsent_repeat:
            exec('{} = thisConsent_repeat[paramName]'.format(paramName))
    
    # ------Prepare to start Routine "consent_1"-------
    continueRoutine = True
    # update component parameters for each repeat
    space_resp_consent_2.keys = []
    space_resp_consent_2.rt = []
    _space_resp_consent_2_allKeys = []
    # keep track of which components have finished
    consent_1Components = [title_consent, consent_info_2, space_consent_2, space_resp_consent_2]
    for thisComponent in consent_1Components:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    consent_1Clock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
    frameN = -1
    
    # -------Run Routine "consent_1"-------
    while continueRoutine:
        # get current time
        t = consent_1Clock.getTime()
        tThisFlip = win.getFutureFlipTime(clock=consent_1Clock)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *title_consent* updates
        if title_consent.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            title_consent.frameNStart = frameN  # exact frame index
            title_consent.tStart = t  # local t and not account for scr refresh
            title_consent.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(title_consent, 'tStartRefresh')  # time at next scr refresh
            title_consent.setAutoDraw(True)
        
        # *consent_info_2* updates
        if consent_info_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            consent_info_2.frameNStart = frameN  # exact frame index
            consent_info_2.tStart = t  # local t and not account for scr refresh
            consent_info_2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(consent_info_2, 'tStartRefresh')  # time at next scr refresh
            consent_info_2.setAutoDraw(True)
        
        # *space_consent_2* updates
        if space_consent_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            space_consent_2.frameNStart = frameN  # exact frame index
            space_consent_2.tStart = t  # local t and not account for scr refresh
            space_consent_2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(space_consent_2, 'tStartRefresh')  # time at next scr refresh
            space_consent_2.setAutoDraw(True)
        
        # *space_resp_consent_2* updates
        waitOnFlip = False
        if space_resp_consent_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            space_resp_consent_2.frameNStart = frameN  # exact frame index
            space_resp_consent_2.tStart = t  # local t and not account for scr refresh
            space_resp_consent_2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(space_resp_consent_2, 'tStartRefresh')  # time at next scr refresh
            space_resp_consent_2.status = STARTED
            # keyboard checking is just starting
            waitOnFlip = True
            win.callOnFlip(space_resp_consent_2.clock.reset)  # t=0 on next screen flip
            win.callOnFlip(space_resp_consent_2.clearEvents, eventType='keyboard')  # clear events on next screen flip
        if space_resp_consent_2.status == STARTED and not waitOnFlip:
            theseKeys = space_resp_consent_2.getKeys(keyList=['space'], waitRelease=False)
            _space_resp_consent_2_allKeys.extend(theseKeys)
            if len(_space_resp_consent_2_allKeys):
                space_resp_consent_2.keys = _space_resp_consent_2_allKeys[-1].name  # just the last key pressed
                space_resp_consent_2.rt = _space_resp_consent_2_allKeys[-1].rt
                # a response ends the routine
                continueRoutine = False
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in consent_1Components:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # -------Ending Routine "consent_1"-------
    for thisComponent in consent_1Components:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    consent_repeat.addData('title_consent.started', title_consent.tStartRefresh)
    consent_repeat.addData('title_consent.stopped', title_consent.tStopRefresh)
    consent_repeat.addData('consent_info_2.started', consent_info_2.tStartRefresh)
    consent_repeat.addData('consent_info_2.stopped', consent_info_2.tStopRefresh)
    consent_repeat.addData('space_consent_2.started', space_consent_2.tStartRefresh)
    consent_repeat.addData('space_consent_2.stopped', space_consent_2.tStopRefresh)
    # check responses
    if space_resp_consent_2.keys in ['', [], None]:  # No response was made
        space_resp_consent_2.keys = None
    consent_repeat.addData('space_resp_consent_2.keys',space_resp_consent_2.keys)
    if space_resp_consent_2.keys != None:  # we had a response
        consent_repeat.addData('space_resp_consent_2.rt', space_resp_consent_2.rt)
    consent_repeat.addData('space_resp_consent_2.started', space_resp_consent_2.tStartRefresh)
    consent_repeat.addData('space_resp_consent_2.stopped', space_resp_consent_2.tStopRefresh)
    # the Routine "consent_1" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    
    # ------Prepare to start Routine "consent_2"-------
    continueRoutine = True
    # update component parameters for each repeat
    space_resp_consent_3.keys = []
    space_resp_consent_3.rt = []
    _space_resp_consent_3_allKeys = []
    # keep track of which components have finished
    consent_2Components = [title_consent_2, consent_info_3, space_consent_3, space_resp_consent_3]
    for thisComponent in consent_2Components:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    consent_2Clock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
    frameN = -1
    
    # -------Run Routine "consent_2"-------
    while continueRoutine:
        # get current time
        t = consent_2Clock.getTime()
        tThisFlip = win.getFutureFlipTime(clock=consent_2Clock)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *title_consent_2* updates
        if title_consent_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            title_consent_2.frameNStart = frameN  # exact frame index
            title_consent_2.tStart = t  # local t and not account for scr refresh
            title_consent_2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(title_consent_2, 'tStartRefresh')  # time at next scr refresh
            title_consent_2.setAutoDraw(True)
        
        # *consent_info_3* updates
        if consent_info_3.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            consent_info_3.frameNStart = frameN  # exact frame index
            consent_info_3.tStart = t  # local t and not account for scr refresh
            consent_info_3.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(consent_info_3, 'tStartRefresh')  # time at next scr refresh
            consent_info_3.setAutoDraw(True)
        
        # *space_consent_3* updates
        if space_consent_3.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            space_consent_3.frameNStart = frameN  # exact frame index
            space_consent_3.tStart = t  # local t and not account for scr refresh
            space_consent_3.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(space_consent_3, 'tStartRefresh')  # time at next scr refresh
            space_consent_3.setAutoDraw(True)
        
        # *space_resp_consent_3* updates
        waitOnFlip = False
        if space_resp_consent_3.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            space_resp_consent_3.frameNStart = frameN  # exact frame index
            space_resp_consent_3.tStart = t  # local t and not account for scr refresh
            space_resp_consent_3.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(space_resp_consent_3, 'tStartRefresh')  # time at next scr refresh
            space_resp_consent_3.status = STARTED
            # keyboard checking is just starting
            waitOnFlip = True
            win.callOnFlip(space_resp_consent_3.clock.reset)  # t=0 on next screen flip
            win.callOnFlip(space_resp_consent_3.clearEvents, eventType='keyboard')  # clear events on next screen flip
        if space_resp_consent_3.status == STARTED and not waitOnFlip:
            theseKeys = space_resp_consent_3.getKeys(keyList=['space'], waitRelease=False)
            _space_resp_consent_3_allKeys.extend(theseKeys)
            if len(_space_resp_consent_3_allKeys):
                space_resp_consent_3.keys = _space_resp_consent_3_allKeys[-1].name  # just the last key pressed
                space_resp_consent_3.rt = _space_resp_consent_3_allKeys[-1].rt
                # a response ends the routine
                continueRoutine = False
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in consent_2Components:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # -------Ending Routine "consent_2"-------
    for thisComponent in consent_2Components:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    consent_repeat.addData('title_consent_2.started', title_consent_2.tStartRefresh)
    consent_repeat.addData('title_consent_2.stopped', title_consent_2.tStopRefresh)
    consent_repeat.addData('consent_info_3.started', consent_info_3.tStartRefresh)
    consent_repeat.addData('consent_info_3.stopped', consent_info_3.tStopRefresh)
    consent_repeat.addData('space_consent_3.started', space_consent_3.tStartRefresh)
    consent_repeat.addData('space_consent_3.stopped', space_consent_3.tStopRefresh)
    # check responses
    if space_resp_consent_3.keys in ['', [], None]:  # No response was made
        space_resp_consent_3.keys = None
    consent_repeat.addData('space_resp_consent_3.keys',space_resp_consent_3.keys)
    if space_resp_consent_3.keys != None:  # we had a response
        consent_repeat.addData('space_resp_consent_3.rt', space_resp_consent_3.rt)
    consent_repeat.addData('space_resp_consent_3.started', space_resp_consent_3.tStartRefresh)
    consent_repeat.addData('space_resp_consent_3.stopped', space_resp_consent_3.tStopRefresh)
    # the Routine "consent_2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    
    # ------Prepare to start Routine "consent_3"-------
    continueRoutine = True
    # update component parameters for each repeat
    space_resp_consent_4.keys = []
    space_resp_consent_4.rt = []
    _space_resp_consent_4_allKeys = []
    # keep track of which components have finished
    consent_3Components = [title_consent_3, consent_info_4, space_consent_4, space_resp_consent_4]
    for thisComponent in consent_3Components:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    consent_3Clock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
    frameN = -1
    
    # -------Run Routine "consent_3"-------
    while continueRoutine:
        # get current time
        t = consent_3Clock.getTime()
        tThisFlip = win.getFutureFlipTime(clock=consent_3Clock)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *title_consent_3* updates
        if title_consent_3.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            title_consent_3.frameNStart = frameN  # exact frame index
            title_consent_3.tStart = t  # local t and not account for scr refresh
            title_consent_3.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(title_consent_3, 'tStartRefresh')  # time at next scr refresh
            title_consent_3.setAutoDraw(True)
        
        # *consent_info_4* updates
        if consent_info_4.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            consent_info_4.frameNStart = frameN  # exact frame index
            consent_info_4.tStart = t  # local t and not account for scr refresh
            consent_info_4.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(consent_info_4, 'tStartRefresh')  # time at next scr refresh
            consent_info_4.setAutoDraw(True)
        
        # *space_consent_4* updates
        if space_consent_4.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            space_consent_4.frameNStart = frameN  # exact frame index
            space_consent_4.tStart = t  # local t and not account for scr refresh
            space_consent_4.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(space_consent_4, 'tStartRefresh')  # time at next scr refresh
            space_consent_4.setAutoDraw(True)
        
        # *space_resp_consent_4* updates
        waitOnFlip = False
        if space_resp_consent_4.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            space_resp_consent_4.frameNStart = frameN  # exact frame index
            space_resp_consent_4.tStart = t  # local t and not account for scr refresh
            space_resp_consent_4.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(space_resp_consent_4, 'tStartRefresh')  # time at next scr refresh
            space_resp_consent_4.status = STARTED
            # keyboard checking is just starting
            waitOnFlip = True
            win.callOnFlip(space_resp_consent_4.clock.reset)  # t=0 on next screen flip
            win.callOnFlip(space_resp_consent_4.clearEvents, eventType='keyboard')  # clear events on next screen flip
        if space_resp_consent_4.status == STARTED and not waitOnFlip:
            theseKeys = space_resp_consent_4.getKeys(keyList=['space'], waitRelease=False)
            _space_resp_consent_4_allKeys.extend(theseKeys)
            if len(_space_resp_consent_4_allKeys):
                space_resp_consent_4.keys = _space_resp_consent_4_allKeys[-1].name  # just the last key pressed
                space_resp_consent_4.rt = _space_resp_consent_4_allKeys[-1].rt
                # a response ends the routine
                continueRoutine = False
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in consent_3Components:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # -------Ending Routine "consent_3"-------
    for thisComponent in consent_3Components:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    consent_repeat.addData('title_consent_3.started', title_consent_3.tStartRefresh)
    consent_repeat.addData('title_consent_3.stopped', title_consent_3.tStopRefresh)
    consent_repeat.addData('consent_info_4.started', consent_info_4.tStartRefresh)
    consent_repeat.addData('consent_info_4.stopped', consent_info_4.tStopRefresh)
    consent_repeat.addData('space_consent_4.started', space_consent_4.tStartRefresh)
    consent_repeat.addData('space_consent_4.stopped', space_consent_4.tStopRefresh)
    # check responses
    if space_resp_consent_4.keys in ['', [], None]:  # No response was made
        space_resp_consent_4.keys = None
    consent_repeat.addData('space_resp_consent_4.keys',space_resp_consent_4.keys)
    if space_resp_consent_4.keys != None:  # we had a response
        consent_repeat.addData('space_resp_consent_4.rt', space_resp_consent_4.rt)
    consent_repeat.addData('space_resp_consent_4.started', space_resp_consent_4.tStartRefresh)
    consent_repeat.addData('space_resp_consent_4.stopped', space_resp_consent_4.tStopRefresh)
    # the Routine "consent_3" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    
    # ------Prepare to start Routine "repeat"-------
    continueRoutine = True
    # update component parameters for each repeat
    # setup some python lists for storing info about the mouse
    mouse.clicked_name = []
    gotValidClick = False  # until a click is received
    # keep track of which components have finished
    repeatComponents = [would_you_like, please_click, yes, no, mouse]
    for thisComponent in repeatComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    repeatClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
    frameN = -1
    
    # -------Run Routine "repeat"-------
    while continueRoutine:
        # get current time
        t = repeatClock.getTime()
        tThisFlip = win.getFutureFlipTime(clock=repeatClock)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        # Repeat consent form
        if mouse.isPressedIn(yes):
            continueRoutine = True
            
        # Move on to agreement
        if mouse.isPressedIn(no):
            consent_repeat.finished = True
        
        # *would_you_like* updates
        if would_you_like.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            would_you_like.frameNStart = frameN  # exact frame index
            would_you_like.tStart = t  # local t and not account for scr refresh
            would_you_like.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(would_you_like, 'tStartRefresh')  # time at next scr refresh
            would_you_like.setAutoDraw(True)
        
        # *please_click* updates
        if please_click.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            please_click.frameNStart = frameN  # exact frame index
            please_click.tStart = t  # local t and not account for scr refresh
            please_click.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(please_click, 'tStartRefresh')  # time at next scr refresh
            please_click.setAutoDraw(True)
        
        # *yes* updates
        if yes.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            yes.frameNStart = frameN  # exact frame index
            yes.tStart = t  # local t and not account for scr refresh
            yes.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(yes, 'tStartRefresh')  # time at next scr refresh
            yes.setAutoDraw(True)
        
        # *no* updates
        if no.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            no.frameNStart = frameN  # exact frame index
            no.tStart = t  # local t and not account for scr refresh
            no.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(no, 'tStartRefresh')  # time at next scr refresh
            no.setAutoDraw(True)
        # *mouse* updates
        if mouse.status == NOT_STARTED and t >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            mouse.frameNStart = frameN  # exact frame index
            mouse.tStart = t  # local t and not account for scr refresh
            mouse.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(mouse, 'tStartRefresh')  # time at next scr refresh
            mouse.status = STARTED
            mouse.mouseClock.reset()
            prevButtonState = mouse.getPressed()  # if button is down already this ISN'T a new click
        if mouse.status == STARTED:  # only update if started and not finished!
            buttons = mouse.getPressed()
            if buttons != prevButtonState:  # button state changed?
                prevButtonState = buttons
                if sum(buttons) > 0:  # state changed to a new click
                    # check if the mouse was inside our 'clickable' objects
                    gotValidClick = False
                    for obj in [yes, no]:
                        if obj.contains(mouse):
                            gotValidClick = True
                            mouse.clicked_name.append(obj.name)
                    if gotValidClick:  # abort routine on response
                        continueRoutine = False
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in repeatComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # -------Ending Routine "repeat"-------
    for thisComponent in repeatComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    consent_repeat.addData('would_you_like.started', would_you_like.tStartRefresh)
    consent_repeat.addData('would_you_like.stopped', would_you_like.tStopRefresh)
    consent_repeat.addData('please_click.started', please_click.tStartRefresh)
    consent_repeat.addData('please_click.stopped', please_click.tStopRefresh)
    consent_repeat.addData('yes.started', yes.tStartRefresh)
    consent_repeat.addData('yes.stopped', yes.tStopRefresh)
    consent_repeat.addData('no.started', no.tStartRefresh)
    consent_repeat.addData('no.stopped', no.tStopRefresh)
    # store data for consent_repeat (TrialHandler)
    x, y = mouse.getPos()
    buttons = mouse.getPressed()
    if sum(buttons):
        # check if the mouse was inside our 'clickable' objects
        gotValidClick = False
        for obj in [yes, no]:
            if obj.contains(mouse):
                gotValidClick = True
                mouse.clicked_name.append(obj.name)
    consent_repeat.addData('mouse.x', x)
    consent_repeat.addData('mouse.y', y)
    consent_repeat.addData('mouse.leftButton', buttons[0])
    consent_repeat.addData('mouse.midButton', buttons[1])
    consent_repeat.addData('mouse.rightButton', buttons[2])
    if len(mouse.clicked_name):
        consent_repeat.addData('mouse.clicked_name', mouse.clicked_name[0])
    consent_repeat.addData('mouse.started', mouse.tStart)
    consent_repeat.addData('mouse.stopped', mouse.tStop)
    # the Routine "repeat" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    thisExp.nextEntry()
    
# completed 10 repeats of 'consent_repeat'


# ------Prepare to start Routine "agree_disagree"-------
continueRoutine = True
# update component parameters for each repeat
# setup some python lists for storing info about the mouse_2
mouse_2.clicked_name = []
gotValidClick = False  # until a click is received
# keep track of which components have finished
agree_disagreeComponents = [title_consent_4, do_you_consent, please_click_2, if_you, i_agree, i_disagree, mouse_2]
for thisComponent in agree_disagreeComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
agree_disagreeClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
frameN = -1

# -------Run Routine "agree_disagree"-------
while continueRoutine:
    # get current time
    t = agree_disagreeClock.getTime()
    tThisFlip = win.getFutureFlipTime(clock=agree_disagreeClock)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *title_consent_4* updates
    if title_consent_4.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        title_consent_4.frameNStart = frameN  # exact frame index
        title_consent_4.tStart = t  # local t and not account for scr refresh
        title_consent_4.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(title_consent_4, 'tStartRefresh')  # time at next scr refresh
        title_consent_4.setAutoDraw(True)
    if title_consent_4.status == STARTED:
        if bool(1.0):
            # keep track of stop time/frame for later
            title_consent_4.tStop = t  # not accounting for scr refresh
            title_consent_4.frameNStop = frameN  # exact frame index
            win.timeOnFlip(title_consent_4, 'tStopRefresh')  # time at next scr refresh
            title_consent_4.setAutoDraw(False)
    
    # *do_you_consent* updates
    if do_you_consent.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        do_you_consent.frameNStart = frameN  # exact frame index
        do_you_consent.tStart = t  # local t and not account for scr refresh
        do_you_consent.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(do_you_consent, 'tStartRefresh')  # time at next scr refresh
        do_you_consent.setAutoDraw(True)
    
    # *please_click_2* updates
    if please_click_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        please_click_2.frameNStart = frameN  # exact frame index
        please_click_2.tStart = t  # local t and not account for scr refresh
        please_click_2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(please_click_2, 'tStartRefresh')  # time at next scr refresh
        please_click_2.setAutoDraw(True)
    
    # *if_you* updates
    if if_you.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        if_you.frameNStart = frameN  # exact frame index
        if_you.tStart = t  # local t and not account for scr refresh
        if_you.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(if_you, 'tStartRefresh')  # time at next scr refresh
        if_you.setAutoDraw(True)
    
    # *i_agree* updates
    if i_agree.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        i_agree.frameNStart = frameN  # exact frame index
        i_agree.tStart = t  # local t and not account for scr refresh
        i_agree.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(i_agree, 'tStartRefresh')  # time at next scr refresh
        i_agree.setAutoDraw(True)
    
    # *i_disagree* updates
    if i_disagree.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        i_disagree.frameNStart = frameN  # exact frame index
        i_disagree.tStart = t  # local t and not account for scr refresh
        i_disagree.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(i_disagree, 'tStartRefresh')  # time at next scr refresh
        i_disagree.setAutoDraw(True)
    # *mouse_2* updates
    if mouse_2.status == NOT_STARTED and t >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        mouse_2.frameNStart = frameN  # exact frame index
        mouse_2.tStart = t  # local t and not account for scr refresh
        mouse_2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(mouse_2, 'tStartRefresh')  # time at next scr refresh
        mouse_2.status = STARTED
        mouse_2.mouseClock.reset()
        prevButtonState = mouse_2.getPressed()  # if button is down already this ISN'T a new click
    if mouse_2.status == STARTED:  # only update if started and not finished!
        buttons = mouse_2.getPressed()
        if buttons != prevButtonState:  # button state changed?
            prevButtonState = buttons
            if sum(buttons) > 0:  # state changed to a new click
                # check if the mouse was inside our 'clickable' objects
                gotValidClick = False
                for obj in [i_agree, i_disagree]:
                    if obj.contains(mouse_2):
                        gotValidClick = True
                        mouse_2.clicked_name.append(obj.name)
                if gotValidClick:  # abort routine on response
                    continueRoutine = False
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in agree_disagreeComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# -------Ending Routine "agree_disagree"-------
for thisComponent in agree_disagreeComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
thisExp.addData('title_consent_4.started', title_consent_4.tStartRefresh)
thisExp.addData('title_consent_4.stopped', title_consent_4.tStopRefresh)
thisExp.addData('do_you_consent.started', do_you_consent.tStartRefresh)
thisExp.addData('do_you_consent.stopped', do_you_consent.tStopRefresh)
thisExp.addData('please_click_2.started', please_click_2.tStartRefresh)
thisExp.addData('please_click_2.stopped', please_click_2.tStopRefresh)
thisExp.addData('if_you.started', if_you.tStartRefresh)
thisExp.addData('if_you.stopped', if_you.tStopRefresh)
thisExp.addData('i_agree.started', i_agree.tStartRefresh)
thisExp.addData('i_agree.stopped', i_agree.tStopRefresh)
thisExp.addData('i_disagree.started', i_disagree.tStartRefresh)
thisExp.addData('i_disagree.stopped', i_disagree.tStopRefresh)
# store data for thisExp (ExperimentHandler)
x, y = mouse_2.getPos()
buttons = mouse_2.getPressed()
if sum(buttons):
    # check if the mouse was inside our 'clickable' objects
    gotValidClick = False
    for obj in [i_agree, i_disagree]:
        if obj.contains(mouse_2):
            gotValidClick = True
            mouse_2.clicked_name.append(obj.name)
thisExp.addData('mouse_2.x', x)
thisExp.addData('mouse_2.y', y)
thisExp.addData('mouse_2.leftButton', buttons[0])
thisExp.addData('mouse_2.midButton', buttons[1])
thisExp.addData('mouse_2.rightButton', buttons[2])
if len(mouse_2.clicked_name):
    thisExp.addData('mouse_2.clicked_name', mouse_2.clicked_name[0])
thisExp.addData('mouse_2.started', mouse_2.tStart)
thisExp.addData('mouse_2.stopped', mouse_2.tStop)
thisExp.nextEntry()
# the Routine "agree_disagree" was not non-slip safe, so reset the non-slip timer
routineTimer.reset()

# ------Prepare to start Routine "goodbye"-------
continueRoutine = True
routineTimer.add(4.000000)
# update component parameters for each repeat
# keep track of which components have finished
goodbyeComponents = [thank_you_disagree]
for thisComponent in goodbyeComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
goodbyeClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
frameN = -1

# -------Run Routine "goodbye"-------
while continueRoutine and routineTimer.getTime() > 0:
    # get current time
    t = goodbyeClock.getTime()
    tThisFlip = win.getFutureFlipTime(clock=goodbyeClock)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    # Continue experiment if participant agrees
    if mouse_2.isPressedIn(i_agree):
        continueRoutine = False
    
    # *thank_you_disagree* updates
    if thank_you_disagree.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        thank_you_disagree.frameNStart = frameN  # exact frame index
        thank_you_disagree.tStart = t  # local t and not account for scr refresh
        thank_you_disagree.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(thank_you_disagree, 'tStartRefresh')  # time at next scr refresh
        thank_you_disagree.setAutoDraw(True)
    if thank_you_disagree.status == STARTED:
        # is it time to stop? (based on local clock)
        if tThisFlip > 4-frameTolerance:
            # keep track of stop time/frame for later
            thank_you_disagree.tStop = t  # not accounting for scr refresh
            thank_you_disagree.frameNStop = frameN  # exact frame index
            win.timeOnFlip(thank_you_disagree, 'tStopRefresh')  # time at next scr refresh
            thank_you_disagree.setAutoDraw(False)
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in goodbyeComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# -------Ending Routine "goodbye"-------
for thisComponent in goodbyeComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
# End experiment if participant disagrees
if mouse_2.isPressedIn(i_disagree):
    win.close()
    core.quit()
thisExp.addData('thank_you_disagree.started', thank_you_disagree.tStartRefresh)
thisExp.addData('thank_you_disagree.stopped', thank_you_disagree.tStopRefresh)

# ------Prepare to start Routine "instr"-------
continueRoutine = True
# update component parameters for each repeat
key_resp.keys = []
key_resp.rt = []
_key_resp_allKeys = []
# keep track of which components have finished
instrComponents = [thank_you_agree, key_resp]
for thisComponent in instrComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
instrClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
frameN = -1

# -------Run Routine "instr"-------
while continueRoutine:
    # get current time
    t = instrClock.getTime()
    tThisFlip = win.getFutureFlipTime(clock=instrClock)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *thank_you_agree* updates
    if thank_you_agree.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        thank_you_agree.frameNStart = frameN  # exact frame index
        thank_you_agree.tStart = t  # local t and not account for scr refresh
        thank_you_agree.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(thank_you_agree, 'tStartRefresh')  # time at next scr refresh
        thank_you_agree.setAutoDraw(True)
    
    # *key_resp* updates
    waitOnFlip = False
    if key_resp.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        key_resp.frameNStart = frameN  # exact frame index
        key_resp.tStart = t  # local t and not account for scr refresh
        key_resp.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(key_resp, 'tStartRefresh')  # time at next scr refresh
        key_resp.status = STARTED
        # keyboard checking is just starting
        waitOnFlip = True
        win.callOnFlip(key_resp.clock.reset)  # t=0 on next screen flip
        win.callOnFlip(key_resp.clearEvents, eventType='keyboard')  # clear events on next screen flip
    if key_resp.status == STARTED and not waitOnFlip:
        theseKeys = key_resp.getKeys(keyList=['space'], waitRelease=False)
        _key_resp_allKeys.extend(theseKeys)
        if len(_key_resp_allKeys):
            key_resp.keys = _key_resp_allKeys[-1].name  # just the last key pressed
            key_resp.rt = _key_resp_allKeys[-1].rt
            # a response ends the routine
            continueRoutine = False
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in instrComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# -------Ending Routine "instr"-------
for thisComponent in instrComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
thisExp.addData('thank_you_agree.started', thank_you_agree.tStartRefresh)
thisExp.addData('thank_you_agree.stopped', thank_you_agree.tStopRefresh)
# check responses
if key_resp.keys in ['', [], None]:  # No response was made
    key_resp.keys = None
thisExp.addData('key_resp.keys',key_resp.keys)
if key_resp.keys != None:  # we had a response
    thisExp.addData('key_resp.rt', key_resp.rt)
thisExp.addData('key_resp.started', key_resp.tStartRefresh)
thisExp.addData('key_resp.stopped', key_resp.tStopRefresh)
thisExp.nextEntry()
# the Routine "instr" was not non-slip safe, so reset the non-slip timer
routineTimer.reset()

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
