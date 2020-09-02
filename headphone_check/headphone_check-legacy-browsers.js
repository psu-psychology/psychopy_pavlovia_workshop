/************************ 
 * Headphone_Check Test *
 ************************/

// init psychoJS:
const psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: true,
  color: new util.Color([0, 0, 0]),
  units: 'height',
  waitBlanking: true
});

// store info about the experiment session:
let expName = 'headphone_check';  // from the Builder filename that created this script
let expInfo = {'participant': '1', 'version': '1'};

// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
  dictionary: expInfo,
  title: expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
flowScheduler.add(instr_HCRoutineBegin());
flowScheduler.add(instr_HCRoutineEachFrame());
flowScheduler.add(instr_HCRoutineEnd());
flowScheduler.add(instr_HC_2RoutineBegin());
flowScheduler.add(instr_HC_2RoutineEachFrame());
flowScheduler.add(instr_HC_2RoutineEnd());
flowScheduler.add(instr_HC_3RoutineBegin());
flowScheduler.add(instr_HC_3RoutineEachFrame());
flowScheduler.add(instr_HC_3RoutineEnd());
const HC_repeatLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(HC_repeatLoopBegin, HC_repeatLoopScheduler);
flowScheduler.add(HC_repeatLoopScheduler);
flowScheduler.add(HC_repeatLoopEnd);
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
    {'name': 'materials/HC_repeat_cond.xlsx', 'path': 'materials/HC_repeat_cond.xlsx'},
    {'name': 'materials/silence.wav', 'path': 'materials/silence.wav'},
    {'name': 'materials/antiphase_HC_OIS.wav', 'path': 'materials/antiphase_HC_OIS.wav'},
    {'name': 'materials/antiphase_HC_SIO.wav', 'path': 'materials/antiphase_HC_SIO.wav'},
    {'name': 'materials/antiphase_HC_ISO.wav', 'path': 'materials/antiphase_HC_ISO.wav'},
    {'name': 'materials/antiphase_HC_OSI.wav', 'path': 'materials/antiphase_HC_OSI.wav'},
    {'name': 'materials/antiphase_HC_IOS.wav', 'path': 'materials/antiphase_HC_IOS.wav'},
    {'name': 'materials/HC_cond.xlsx', 'path': 'materials/HC_cond.xlsx'},
    {'name': 'materials/antiphase_HC_SOI.wav', 'path': 'materials/antiphase_HC_SOI.wav'}
  ]
});


var frameDur;
function updateInfo() {
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2020.2.3';
  expInfo['OS'] = window.navigator.platform;

  // store frame rate of monitor if we can measure it successfully
  expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

  // add info from the URL:
  util.addInfoFromUrl(expInfo);
  
  return Scheduler.Event.NEXT;
}


var instr_HCClock;
var title_HC;
var instruction_HC;
var space;
var space_resp;
var instr_HC_2Clock;
var title_HC_2;
var instruction_HC_2;
var instruction_HC_3;
var demo_quiet_rating;
var space_2;
var space_resp_2;
var instr_HC_3Clock;
var title_HC_3;
var instruction_HC_4;
var space_3;
var space_resp_3;
var pauseClock;
var pause_silence;
var play_HCClock;
var HC_fix_cross;
var HC_play_tones;
var rate_HCClock;
var num_correct;
var quietest_tone;
var quiet_rating;
var quiet_silence;
var pass_HCClock;
var title_passed;
var you_passed;
var space_4;
var space_resp_4;
var fail_HC_r1Clock;
var title_fail;
var you_failed;
var space_5;
var space_resp_5;
var fail_HC_r2Clock;
var title_fail_2;
var you_failed_2;
var space_6;
var space_resp_6;
var globalClock;
var routineTimer;
function experimentInit() {
  // Initialize components for Routine "instr_HC"
  instr_HCClock = new util.Clock();
  title_HC = new visual.TextStim({
    win: psychoJS.window,
    name: 'title_HC',
    text: 'Headphone Check',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.33], height: 0.045,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  instruction_HC = new visual.TextStim({
    win: psychoJS.window,
    name: 'instruction_HC',
    text: 'Before we begin the study, you will complete a short task to confirm that you are wearing headphones.\n\nHeadphones are required for the entirety of this experiment, so please connect your headphones and put them on now.',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.04,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  space = new visual.TextStim({
    win: psychoJS.window,
    name: 'space',
    text: 'Press the [SPACE] bar \nonce you are wearing headphones',
    font: 'Arial',
    units: undefined, 
    pos: [0, (- 0.33)], height: 0.035,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -2.0 
  });
  
  space_resp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "instr_HC_2"
  instr_HC_2Clock = new util.Clock();
  title_HC_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'title_HC_2',
    text: 'Headphone Check',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.33], height: 0.045,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  instruction_HC_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'instruction_HC_2',
    text: 'In this task, you will hear three tones played in a row. \nOne of these tones will sound quieter than the other two.\n\nAfter the tones finish playing, you will select which was the quietest by using a rating scale like the one below:',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.16], height: 0.032,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  instruction_HC_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'instruction_HC_3',
    text: 'You will rate six sets of tones. To pass the headphone check,\nyou must get at least FIVE out of SIX sets correct.',
    font: 'Arial',
    units: undefined, 
    pos: [0, (- 0.17)], height: 0.033,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -2.0 
  });
  
  demo_quiet_rating = new visual.Slider({
    win: psychoJS.window, name: 'demo_quiet_rating',
    size: [0.7, 0.032], pos: [0, 0], units: 'height',
    labels: ["", "Tone 1", "Tone 2", "Tone 3", ""], ticks: [0.8, 1, 2, 3, 3.2],
    granularity: 1, style: [visual.Slider.Style.RATING],
    color: new util.Color('White'), 
    fontFamily: 'Arial', bold: true, italic: false, 
    flip: false,
  });
  
  space_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'space_2',
    text: 'Press the [SPACE] bar \nto continue reading the instructions',
    font: 'Arial',
    units: undefined, 
    pos: [0, (- 0.33)], height: 0.035,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -4.0 
  });
  
  space_resp_2 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "instr_HC_3"
  instr_HC_3Clock = new util.Clock();
  title_HC_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'title_HC_3',
    text: 'Headphone Check',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.33], height: 0.045,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  instruction_HC_4 = new visual.TextStim({
    win: psychoJS.window,
    name: 'instruction_HC_4',
    text: 'If you are wearing headphones, this task should be easy to complete! Without them, you will have a much harder time rating the tones acccurately.\n\nIf you fail the task, you will have one more chance to retry it before proceeding to the experiment.',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.04,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  space_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'space_3',
    text: 'Press the [SPACE] bar \nto BEGIN the headphone check',
    font: 'Arial',
    units: undefined, 
    pos: [0, (- 0.33)], height: 0.035,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -2.0 
  });
  
  space_resp_3 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "pause"
  pauseClock = new util.Clock();
  pause_silence = new sound.Sound({
    win: psychoJS.window,
    value: 'materials/silence.wav',
    secs: (- 1),
    });
  pause_silence.setVolume(0);
  // Initialize components for Routine "play_HC"
  play_HCClock = new util.Clock();
  HC_fix_cross = new visual.ShapeStim ({
    win: psychoJS.window, name: 'HC_fix_cross', 
    vertices: 'cross', size:[0.04, 0.04],
    ori: 0, pos: [0, 0],
    lineWidth: 0.0005, lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([1, 1, 1]),
    opacity: 1, depth: 0, interpolate: true,
  });
  
  HC_play_tones = new sound.Sound({
    win: psychoJS.window,
    value: 'A',
    secs: (- 1),
    });
  HC_play_tones.setVolume(1.25);
  // Initialize components for Routine "rate_HC"
  rate_HCClock = new util.Clock();
  // Correct response counter
  num_correct = 0;
  
  quietest_tone = new visual.TextStim({
    win: psychoJS.window,
    name: 'quietest_tone',
    text: 'Which tone was the quietest?',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.15], height: 0.04,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  quiet_rating = new visual.Slider({
    win: psychoJS.window, name: 'quiet_rating',
    size: [0.7, 0.032], pos: [0, 0.05], units: 'height',
    labels: ["", "Tone 1", "Tone 2", "Tone 3", ""], ticks: [0.8, 1, 2, 3, 3.2],
    granularity: 1, style: [visual.Slider.Style.RATING],
    color: new util.Color('White'), 
    fontFamily: 'Arial', bold: true, italic: false, 
    flip: false,
  });
  
  quiet_silence = new sound.Sound({
    win: psychoJS.window,
    value: 'materials/silence.wav',
    secs: (- 1),
    });
  quiet_silence.setVolume(0);
  // Initialize components for Routine "pass_HC"
  pass_HCClock = new util.Clock();
  title_passed = new visual.TextStim({
    win: psychoJS.window,
    name: 'title_passed',
    text: 'You passed the headphone check!',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.3], height: 0.045,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  you_passed = new visual.TextStim({
    win: psychoJS.window,
    name: 'you_passed',
    text: 'You can now proceed to the experiment.',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.04,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -2.0 
  });
  
  space_4 = new visual.TextStim({
    win: psychoJS.window,
    name: 'space_4',
    text: 'Press the [SPACE] bar \nto proceed to the experiment',
    font: 'Arial',
    units: undefined, 
    pos: [0, (- 0.33)], height: 0.035,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -3.0 
  });
  
  space_resp_4 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "fail_HC_r1"
  fail_HC_r1Clock = new util.Clock();
  title_fail = new visual.TextStim({
    win: psychoJS.window,
    name: 'title_fail',
    text: 'You failed the headphone check',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.3], height: 0.045,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  you_failed = new visual.TextStim({
    win: psychoJS.window,
    name: 'you_failed',
    text: 'Please make sure that you are wearing headphones and try the task again.',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.04,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -2.0 
  });
  
  space_5 = new visual.TextStim({
    win: psychoJS.window,
    name: 'space_5',
    text: 'Press the [SPACE] bar \nto RETRY the headphone check',
    font: 'Arial',
    units: undefined, 
    pos: [0, (- 0.33)], height: 0.035,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -3.0 
  });
  
  space_resp_5 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "fail_HC_r2"
  fail_HC_r2Clock = new util.Clock();
  title_fail_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'title_fail_2',
    text: 'You failed the headphone check',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.3], height: 0.045,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  you_failed_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'you_failed_2',
    text: 'Again, please make sure that you are wearing headphones before continuing.\n\nThe headphone check is now finished and you can proceed to the experiment.',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.04,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -2.0 
  });
  
  space_6 = new visual.TextStim({
    win: psychoJS.window,
    name: 'space_6',
    text: 'Press the [SPACE] bar \nto BEGIN the experiment',
    font: 'Arial',
    units: undefined, 
    pos: [0, (- 0.33)], height: 0.035,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -3.0 
  });
  
  space_resp_6 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var _space_resp_allKeys;
var instr_HCComponents;
function instr_HCRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'instr_HC'-------
    t = 0;
    instr_HCClock.reset(); // clock
    frameN = -1;
    // update component parameters for each repeat
    space_resp.keys = undefined;
    space_resp.rt = undefined;
    _space_resp_allKeys = [];
    // keep track of which components have finished
    instr_HCComponents = [];
    instr_HCComponents.push(title_HC);
    instr_HCComponents.push(instruction_HC);
    instr_HCComponents.push(space);
    instr_HCComponents.push(space_resp);
    
    instr_HCComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    
    return Scheduler.Event.NEXT;
  };
}


var continueRoutine;
function instr_HCRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'instr_HC'-------
    let continueRoutine = true; // until we're told otherwise
    // get current time
    t = instr_HCClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *title_HC* updates
    if (t >= 0.0 && title_HC.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      title_HC.tStart = t;  // (not accounting for frame time here)
      title_HC.frameNStart = frameN;  // exact frame index
      
      title_HC.setAutoDraw(true);
    }

    
    // *instruction_HC* updates
    if (t >= 0.0 && instruction_HC.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      instruction_HC.tStart = t;  // (not accounting for frame time here)
      instruction_HC.frameNStart = frameN;  // exact frame index
      
      instruction_HC.setAutoDraw(true);
    }

    
    // *space* updates
    if (t >= 0.0 && space.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space.tStart = t;  // (not accounting for frame time here)
      space.frameNStart = frameN;  // exact frame index
      
      space.setAutoDraw(true);
    }

    
    // *space_resp* updates
    if (t >= 0.0 && space_resp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_resp.tStart = t;  // (not accounting for frame time here)
      space_resp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { space_resp.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { space_resp.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { space_resp.clearEvents(); });
    }

    if (space_resp.status === PsychoJS.Status.STARTED) {
      let theseKeys = space_resp.getKeys({keyList: ['space'], waitRelease: false});
      _space_resp_allKeys = _space_resp_allKeys.concat(theseKeys);
      if (_space_resp_allKeys.length > 0) {
        space_resp.keys = _space_resp_allKeys[_space_resp_allKeys.length - 1].name;  // just the last key pressed
        space_resp.rt = _space_resp_allKeys[_space_resp_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    instr_HCComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function instr_HCRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'instr_HC'-------
    instr_HCComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('space_resp.keys', space_resp.keys);
    if (typeof space_resp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('space_resp.rt', space_resp.rt);
        routineTimer.reset();
        }
    
    space_resp.stop();
    // the Routine "instr_HC" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _space_resp_2_allKeys;
var instr_HC_2Components;
function instr_HC_2RoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'instr_HC_2'-------
    t = 0;
    instr_HC_2Clock.reset(); // clock
    frameN = -1;
    // update component parameters for each repeat
    demo_quiet_rating.reset()
    space_resp_2.keys = undefined;
    space_resp_2.rt = undefined;
    _space_resp_2_allKeys = [];
    // keep track of which components have finished
    instr_HC_2Components = [];
    instr_HC_2Components.push(title_HC_2);
    instr_HC_2Components.push(instruction_HC_2);
    instr_HC_2Components.push(instruction_HC_3);
    instr_HC_2Components.push(demo_quiet_rating);
    instr_HC_2Components.push(space_2);
    instr_HC_2Components.push(space_resp_2);
    
    instr_HC_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    
    return Scheduler.Event.NEXT;
  };
}


function instr_HC_2RoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'instr_HC_2'-------
    let continueRoutine = true; // until we're told otherwise
    // get current time
    t = instr_HC_2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *title_HC_2* updates
    if (t >= 0.0 && title_HC_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      title_HC_2.tStart = t;  // (not accounting for frame time here)
      title_HC_2.frameNStart = frameN;  // exact frame index
      
      title_HC_2.setAutoDraw(true);
    }

    
    // *instruction_HC_2* updates
    if (t >= 0.0 && instruction_HC_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      instruction_HC_2.tStart = t;  // (not accounting for frame time here)
      instruction_HC_2.frameNStart = frameN;  // exact frame index
      
      instruction_HC_2.setAutoDraw(true);
    }

    
    // *instruction_HC_3* updates
    if (t >= 0.0 && instruction_HC_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      instruction_HC_3.tStart = t;  // (not accounting for frame time here)
      instruction_HC_3.frameNStart = frameN;  // exact frame index
      
      instruction_HC_3.setAutoDraw(true);
    }

    
    // *demo_quiet_rating* updates
    if (t >= 0.0 && demo_quiet_rating.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      demo_quiet_rating.tStart = t;  // (not accounting for frame time here)
      demo_quiet_rating.frameNStart = frameN;  // exact frame index
      
      demo_quiet_rating.setAutoDraw(true);
    }

    
    // *space_2* updates
    if (t >= 0.0 && space_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_2.tStart = t;  // (not accounting for frame time here)
      space_2.frameNStart = frameN;  // exact frame index
      
      space_2.setAutoDraw(true);
    }

    
    // *space_resp_2* updates
    if (t >= 0.0 && space_resp_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_resp_2.tStart = t;  // (not accounting for frame time here)
      space_resp_2.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { space_resp_2.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { space_resp_2.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { space_resp_2.clearEvents(); });
    }

    if (space_resp_2.status === PsychoJS.Status.STARTED) {
      let theseKeys = space_resp_2.getKeys({keyList: ['space'], waitRelease: false});
      _space_resp_2_allKeys = _space_resp_2_allKeys.concat(theseKeys);
      if (_space_resp_2_allKeys.length > 0) {
        space_resp_2.keys = _space_resp_2_allKeys[_space_resp_2_allKeys.length - 1].name;  // just the last key pressed
        space_resp_2.rt = _space_resp_2_allKeys[_space_resp_2_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    instr_HC_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function instr_HC_2RoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'instr_HC_2'-------
    instr_HC_2Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('demo_quiet_rating.response', demo_quiet_rating.getRating());
    psychoJS.experiment.addData('demo_quiet_rating.rt', demo_quiet_rating.getRT());
    psychoJS.experiment.addData('space_resp_2.keys', space_resp_2.keys);
    if (typeof space_resp_2.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('space_resp_2.rt', space_resp_2.rt);
        routineTimer.reset();
        }
    
    space_resp_2.stop();
    // the Routine "instr_HC_2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _space_resp_3_allKeys;
var instr_HC_3Components;
function instr_HC_3RoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'instr_HC_3'-------
    t = 0;
    instr_HC_3Clock.reset(); // clock
    frameN = -1;
    // update component parameters for each repeat
    space_resp_3.keys = undefined;
    space_resp_3.rt = undefined;
    _space_resp_3_allKeys = [];
    // keep track of which components have finished
    instr_HC_3Components = [];
    instr_HC_3Components.push(title_HC_3);
    instr_HC_3Components.push(instruction_HC_4);
    instr_HC_3Components.push(space_3);
    instr_HC_3Components.push(space_resp_3);
    
    instr_HC_3Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    
    return Scheduler.Event.NEXT;
  };
}


function instr_HC_3RoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'instr_HC_3'-------
    let continueRoutine = true; // until we're told otherwise
    // get current time
    t = instr_HC_3Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *title_HC_3* updates
    if (t >= 0.0 && title_HC_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      title_HC_3.tStart = t;  // (not accounting for frame time here)
      title_HC_3.frameNStart = frameN;  // exact frame index
      
      title_HC_3.setAutoDraw(true);
    }

    
    // *instruction_HC_4* updates
    if (t >= 0.0 && instruction_HC_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      instruction_HC_4.tStart = t;  // (not accounting for frame time here)
      instruction_HC_4.frameNStart = frameN;  // exact frame index
      
      instruction_HC_4.setAutoDraw(true);
    }

    
    // *space_3* updates
    if (t >= 0.0 && space_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_3.tStart = t;  // (not accounting for frame time here)
      space_3.frameNStart = frameN;  // exact frame index
      
      space_3.setAutoDraw(true);
    }

    
    // *space_resp_3* updates
    if (t >= 0.0 && space_resp_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_resp_3.tStart = t;  // (not accounting for frame time here)
      space_resp_3.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { space_resp_3.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { space_resp_3.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { space_resp_3.clearEvents(); });
    }

    if (space_resp_3.status === PsychoJS.Status.STARTED) {
      let theseKeys = space_resp_3.getKeys({keyList: ['space'], waitRelease: false});
      _space_resp_3_allKeys = _space_resp_3_allKeys.concat(theseKeys);
      if (_space_resp_3_allKeys.length > 0) {
        space_resp_3.keys = _space_resp_3_allKeys[_space_resp_3_allKeys.length - 1].name;  // just the last key pressed
        space_resp_3.rt = _space_resp_3_allKeys[_space_resp_3_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    instr_HC_3Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function instr_HC_3RoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'instr_HC_3'-------
    instr_HC_3Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('space_resp_3.keys', space_resp_3.keys);
    if (typeof space_resp_3.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('space_resp_3.rt', space_resp_3.rt);
        routineTimer.reset();
        }
    
    space_resp_3.stop();
    // the Routine "instr_HC_3" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var HC_repeat;
var currentLoop;
function HC_repeatLoopBegin(HC_repeatLoopScheduler) {
  // set up handler to look after randomisation of conditions etc
  HC_repeat = new TrialHandler({
    psychoJS: psychoJS,
    nReps: 1, method: TrialHandler.Method.SEQUENTIAL,
    extraInfo: expInfo, originPath: undefined,
    trialList: 'materials/HC_repeat_cond.xlsx',
    seed: undefined, name: 'HC_repeat'
  });
  psychoJS.experiment.addLoop(HC_repeat); // add the loop to the experiment
  currentLoop = HC_repeat;  // we're now the current loop

  // Schedule all the trials in the trialList:
  HC_repeat.forEach(function() {
    const snapshot = HC_repeat.getSnapshot();

    HC_repeatLoopScheduler.add(importConditions(snapshot));
    HC_repeatLoopScheduler.add(pauseRoutineBegin(snapshot));
    HC_repeatLoopScheduler.add(pauseRoutineEachFrame(snapshot));
    HC_repeatLoopScheduler.add(pauseRoutineEnd(snapshot));
    const HC_trialsLoopScheduler = new Scheduler(psychoJS);
    HC_repeatLoopScheduler.add(HC_trialsLoopBegin, HC_trialsLoopScheduler);
    HC_repeatLoopScheduler.add(HC_trialsLoopScheduler);
    HC_repeatLoopScheduler.add(HC_trialsLoopEnd);
    HC_repeatLoopScheduler.add(pass_HCRoutineBegin(snapshot));
    HC_repeatLoopScheduler.add(pass_HCRoutineEachFrame(snapshot));
    HC_repeatLoopScheduler.add(pass_HCRoutineEnd(snapshot));
    HC_repeatLoopScheduler.add(fail_HC_r1RoutineBegin(snapshot));
    HC_repeatLoopScheduler.add(fail_HC_r1RoutineEachFrame(snapshot));
    HC_repeatLoopScheduler.add(fail_HC_r1RoutineEnd(snapshot));
    HC_repeatLoopScheduler.add(fail_HC_r2RoutineBegin(snapshot));
    HC_repeatLoopScheduler.add(fail_HC_r2RoutineEachFrame(snapshot));
    HC_repeatLoopScheduler.add(fail_HC_r2RoutineEnd(snapshot));
    HC_repeatLoopScheduler.add(endLoopIteration(HC_repeatLoopScheduler, snapshot));
  });

  return Scheduler.Event.NEXT;
}


var HC_trials;
function HC_trialsLoopBegin(HC_trialsLoopScheduler) {
  // set up handler to look after randomisation of conditions etc
  HC_trials = new TrialHandler({
    psychoJS: psychoJS,
    nReps: 1, method: TrialHandler.Method.RANDOM,
    extraInfo: expInfo, originPath: undefined,
    trialList: 'materials/HC_cond.xlsx',
    seed: undefined, name: 'HC_trials'
  });
  psychoJS.experiment.addLoop(HC_trials); // add the loop to the experiment
  currentLoop = HC_trials;  // we're now the current loop

  // Schedule all the trials in the trialList:
  HC_trials.forEach(function() {
    const snapshot = HC_trials.getSnapshot();

    HC_trialsLoopScheduler.add(importConditions(snapshot));
    HC_trialsLoopScheduler.add(play_HCRoutineBegin(snapshot));
    HC_trialsLoopScheduler.add(play_HCRoutineEachFrame(snapshot));
    HC_trialsLoopScheduler.add(play_HCRoutineEnd(snapshot));
    HC_trialsLoopScheduler.add(rate_HCRoutineBegin(snapshot));
    HC_trialsLoopScheduler.add(rate_HCRoutineEachFrame(snapshot));
    HC_trialsLoopScheduler.add(rate_HCRoutineEnd(snapshot));
    HC_trialsLoopScheduler.add(endLoopIteration(HC_trialsLoopScheduler, snapshot));
  });

  return Scheduler.Event.NEXT;
}


function HC_trialsLoopEnd() {
  psychoJS.experiment.removeLoop(HC_trials);

  return Scheduler.Event.NEXT;
}


function HC_repeatLoopEnd() {
  psychoJS.experiment.removeLoop(HC_repeat);

  return Scheduler.Event.NEXT;
}


var pauseComponents;
function pauseRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'pause'-------
    t = 0;
    pauseClock.reset(); // clock
    frameN = -1;
    // update component parameters for each repeat
    pause_silence.setVolume(0);
    // keep track of which components have finished
    pauseComponents = [];
    pauseComponents.push(pause_silence);
    
    pauseComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    
    return Scheduler.Event.NEXT;
  };
}


function pauseRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'pause'-------
    let continueRoutine = true; // until we're told otherwise
    // get current time
    t = pauseClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // start/stop pause_silence
    if (t >= 0.0 && pause_silence.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pause_silence.tStart = t;  // (not accounting for frame time here)
      pause_silence.frameNStart = frameN;  // exact frame index
      
      psychoJS.window.callOnFlip(function(){ pause_silence.play(); });  // screen flip
      pause_silence.status = PsychoJS.Status.STARTED;
    }
    if (t >= (pause_silence.getDuration() + pause_silence.tStart)     && pause_silence.status === PsychoJS.Status.STARTED) {
      pause_silence.stop();  // stop the sound (if longer than duration)
      pause_silence.status = PsychoJS.Status.FINISHED;
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    pauseComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function pauseRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'pause'-------
    pauseComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    pause_silence.stop();  // ensure sound has stopped at end of routine
    // the Routine "pause" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var play_HCComponents;
function play_HCRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'play_HC'-------
    t = 0;
    play_HCClock.reset(); // clock
    frameN = -1;
    // update component parameters for each repeat
    HC_play_tones = new sound.Sound({
    win: psychoJS.window,
    value: tones,
    secs: -1,
    });
    HC_play_tones.setVolume(1.25);
    // keep track of which components have finished
    play_HCComponents = [];
    play_HCComponents.push(HC_fix_cross);
    play_HCComponents.push(HC_play_tones);
    
    play_HCComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    
    return Scheduler.Event.NEXT;
  };
}


function play_HCRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'play_HC'-------
    let continueRoutine = true; // until we're told otherwise
    // get current time
    t = play_HCClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *HC_fix_cross* updates
    if (t >= 0.5 && HC_fix_cross.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      HC_fix_cross.tStart = t;  // (not accounting for frame time here)
      HC_fix_cross.frameNStart = frameN;  // exact frame index
      
      HC_fix_cross.setAutoDraw(true);
    }

    if (HC_fix_cross.status === PsychoJS.Status.STARTED && Boolean((HC_play_tones.status == FINISHED))) {
      HC_fix_cross.setAutoDraw(false);
    }
    // start/stop HC_play_tones
    if (t >= 0.5 && HC_play_tones.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      HC_play_tones.tStart = t;  // (not accounting for frame time here)
      HC_play_tones.frameNStart = frameN;  // exact frame index
      
      psychoJS.window.callOnFlip(function(){ HC_play_tones.play(); });  // screen flip
      HC_play_tones.status = PsychoJS.Status.STARTED;
    }
    if (t >= (HC_play_tones.getDuration() + HC_play_tones.tStart)     && HC_play_tones.status === PsychoJS.Status.STARTED) {
      HC_play_tones.stop();  // stop the sound (if longer than duration)
      HC_play_tones.status = PsychoJS.Status.FINISHED;
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    play_HCComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function play_HCRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'play_HC'-------
    play_HCComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    HC_play_tones.stop();  // ensure sound has stopped at end of routine
    // the Routine "play_HC" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var rate_HCComponents;
function rate_HCRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'rate_HC'-------
    t = 0;
    rate_HCClock.reset(); // clock
    frameN = -1;
    // update component parameters for each repeat
    quiet_rating.reset()
    quiet_silence.setVolume(0);
    // keep track of which components have finished
    rate_HCComponents = [];
    rate_HCComponents.push(quietest_tone);
    rate_HCComponents.push(quiet_rating);
    rate_HCComponents.push(quiet_silence);
    
    rate_HCComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    
    return Scheduler.Event.NEXT;
  };
}


function rate_HCRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'rate_HC'-------
    let continueRoutine = true; // until we're told otherwise
    // get current time
    t = rate_HCClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *quietest_tone* updates
    if (t >= 0.5 && quietest_tone.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      quietest_tone.tStart = t;  // (not accounting for frame time here)
      quietest_tone.frameNStart = frameN;  // exact frame index
      
      quietest_tone.setAutoDraw(true);
    }

    if (quietest_tone.status === PsychoJS.Status.STARTED && Boolean((quiet_silence.status == FINISHED))) {
      quietest_tone.setAutoDraw(false);
    }
    
    // *quiet_rating* updates
    if (t >= 0.5 && quiet_rating.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      quiet_rating.tStart = t;  // (not accounting for frame time here)
      quiet_rating.frameNStart = frameN;  // exact frame index
      
      quiet_rating.setAutoDraw(true);
    }

    if (quiet_rating.status === PsychoJS.Status.STARTED && Boolean((quiet_silence.status == FINISHED))) {
      quiet_rating.setAutoDraw(false);
    }
    
    // Check quiet_rating for response to end routine
    if (quiet_rating.getRating() !== undefined && quiet_rating.status === PsychoJS.Status.STARTED) {
      continueRoutine = false; }
    // start/stop quiet_silence
    if ((quiet_rating.rating) && quiet_silence.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      quiet_silence.tStart = t;  // (not accounting for frame time here)
      quiet_silence.frameNStart = frameN;  // exact frame index
      
      psychoJS.window.callOnFlip(function(){ quiet_silence.play(); });  // screen flip
      quiet_silence.status = PsychoJS.Status.STARTED;
    }
    if (t >= (quiet_silence.getDuration() + quiet_silence.tStart)     && quiet_silence.status === PsychoJS.Status.STARTED) {
      quiet_silence.stop();  // stop the sound (if longer than duration)
      quiet_silence.status = PsychoJS.Status.FINISHED;
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    rate_HCComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function rate_HCRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'rate_HC'-------
    rate_HCComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // Add correct response
    if ((quiet_rating.rating === correct_resp)) {
        num_correct = (num_correct + 1);
    }
    
    psychoJS.experiment.addData('quiet_rating.response', quiet_rating.getRating());
    psychoJS.experiment.addData('quiet_rating.rt', quiet_rating.getRT());
    quiet_silence.stop();  // ensure sound has stopped at end of routine
    // the Routine "rate_HC" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _space_resp_4_allKeys;
var pass_HCComponents;
function pass_HCRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'pass_HC'-------
    t = 0;
    pass_HCClock.reset(); // clock
    frameN = -1;
    // update component parameters for each repeat
    space_resp_4.keys = undefined;
    space_resp_4.rt = undefined;
    _space_resp_4_allKeys = [];
    // keep track of which components have finished
    pass_HCComponents = [];
    pass_HCComponents.push(title_passed);
    pass_HCComponents.push(you_passed);
    pass_HCComponents.push(space_4);
    pass_HCComponents.push(space_resp_4);
    
    pass_HCComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    
    return Scheduler.Event.NEXT;
  };
}


function pass_HCRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'pass_HC'-------
    let continueRoutine = true; // until we're told otherwise
    // get current time
    t = pass_HCClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // Save variables
    psychoJS.experiment.addData('num_correct', num_correct)
    
    // Continue routine if passed
    if ((num_correct >= 5)) {
        continueRoutine = true;
    }
    
    // Abort routine if failed
    if ((num_correct < 5)) {
        continueRoutine = false;
    }
    
    // *title_passed* updates
    if (t >= 0.0 && title_passed.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      title_passed.tStart = t;  // (not accounting for frame time here)
      title_passed.frameNStart = frameN;  // exact frame index
      
      title_passed.setAutoDraw(true);
    }

    
    // *you_passed* updates
    if (t >= 0.0 && you_passed.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      you_passed.tStart = t;  // (not accounting for frame time here)
      you_passed.frameNStart = frameN;  // exact frame index
      
      you_passed.setAutoDraw(true);
    }

    
    // *space_4* updates
    if (t >= 0.0 && space_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_4.tStart = t;  // (not accounting for frame time here)
      space_4.frameNStart = frameN;  // exact frame index
      
      space_4.setAutoDraw(true);
    }

    
    // *space_resp_4* updates
    if (t >= 0.0 && space_resp_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_resp_4.tStart = t;  // (not accounting for frame time here)
      space_resp_4.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { space_resp_4.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { space_resp_4.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { space_resp_4.clearEvents(); });
    }

    if (space_resp_4.status === PsychoJS.Status.STARTED) {
      let theseKeys = space_resp_4.getKeys({keyList: ['space'], waitRelease: false});
      _space_resp_4_allKeys = _space_resp_4_allKeys.concat(theseKeys);
      if (_space_resp_4_allKeys.length > 0) {
        space_resp_4.keys = _space_resp_4_allKeys[_space_resp_4_allKeys.length - 1].name;  // just the last key pressed
        space_resp_4.rt = _space_resp_4_allKeys[_space_resp_4_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    pass_HCComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function pass_HCRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'pass_HC'-------
    pass_HCComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // Abort repeat loop if passed
    if ((num_correct >= 5)) {
        currentLoop.finished = true;
    }
    psychoJS.experiment.addData('space_resp_4.keys', space_resp_4.keys);
    if (typeof space_resp_4.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('space_resp_4.rt', space_resp_4.rt);
        routineTimer.reset();
        }
    
    space_resp_4.stop();
    // the Routine "pass_HC" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _space_resp_5_allKeys;
var fail_HC_r1Components;
function fail_HC_r1RoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'fail_HC_r1'-------
    t = 0;
    fail_HC_r1Clock.reset(); // clock
    frameN = -1;
    // update component parameters for each repeat
    space_resp_5.keys = undefined;
    space_resp_5.rt = undefined;
    _space_resp_5_allKeys = [];
    // keep track of which components have finished
    fail_HC_r1Components = [];
    fail_HC_r1Components.push(title_fail);
    fail_HC_r1Components.push(you_failed);
    fail_HC_r1Components.push(space_5);
    fail_HC_r1Components.push(space_resp_5);
    
    fail_HC_r1Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    
    return Scheduler.Event.NEXT;
  };
}


function fail_HC_r1RoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'fail_HC_r1'-------
    let continueRoutine = true; // until we're told otherwise
    // get current time
    t = fail_HC_r1Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // Continue routine if round 1 and failed
    if (((round === 1) && (num_correct < 5))) {
        continueRoutine = true;
        }
    
    // Abort routine if round 2 or passed
    if (((round === 2) || (num_correct >= 5))) {
        continueRoutine = false;
        }
    
    // *title_fail* updates
    if (t >= 0.0 && title_fail.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      title_fail.tStart = t;  // (not accounting for frame time here)
      title_fail.frameNStart = frameN;  // exact frame index
      
      title_fail.setAutoDraw(true);
    }

    
    // *you_failed* updates
    if (t >= 0.0 && you_failed.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      you_failed.tStart = t;  // (not accounting for frame time here)
      you_failed.frameNStart = frameN;  // exact frame index
      
      you_failed.setAutoDraw(true);
    }

    
    // *space_5* updates
    if (t >= 0.0 && space_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_5.tStart = t;  // (not accounting for frame time here)
      space_5.frameNStart = frameN;  // exact frame index
      
      space_5.setAutoDraw(true);
    }

    
    // *space_resp_5* updates
    if (t >= 0.0 && space_resp_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_resp_5.tStart = t;  // (not accounting for frame time here)
      space_resp_5.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { space_resp_5.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { space_resp_5.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { space_resp_5.clearEvents(); });
    }

    if (space_resp_5.status === PsychoJS.Status.STARTED) {
      let theseKeys = space_resp_5.getKeys({keyList: ['space'], waitRelease: false});
      _space_resp_5_allKeys = _space_resp_5_allKeys.concat(theseKeys);
      if (_space_resp_5_allKeys.length > 0) {
        space_resp_5.keys = _space_resp_5_allKeys[_space_resp_5_allKeys.length - 1].name;  // just the last key pressed
        space_resp_5.rt = _space_resp_5_allKeys[_space_resp_5_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    fail_HC_r1Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function fail_HC_r1RoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'fail_HC_r1'-------
    fail_HC_r1Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('space_resp_5.keys', space_resp_5.keys);
    if (typeof space_resp_5.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('space_resp_5.rt', space_resp_5.rt);
        routineTimer.reset();
        }
    
    space_resp_5.stop();
    // the Routine "fail_HC_r1" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _space_resp_6_allKeys;
var fail_HC_r2Components;
function fail_HC_r2RoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'fail_HC_r2'-------
    t = 0;
    fail_HC_r2Clock.reset(); // clock
    frameN = -1;
    // update component parameters for each repeat
    space_resp_6.keys = undefined;
    space_resp_6.rt = undefined;
    _space_resp_6_allKeys = [];
    // keep track of which components have finished
    fail_HC_r2Components = [];
    fail_HC_r2Components.push(title_fail_2);
    fail_HC_r2Components.push(you_failed_2);
    fail_HC_r2Components.push(space_6);
    fail_HC_r2Components.push(space_resp_6);
    
    fail_HC_r2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    
    return Scheduler.Event.NEXT;
  };
}


function fail_HC_r2RoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'fail_HC_r2'-------
    let continueRoutine = true; // until we're told otherwise
    // get current time
    t = fail_HC_r2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // Continue routine if round 2 and failed
    if (((round === 2) && (num_correct >= 5))) {
        continueRoutine = false;
    }
    
    // Abort routine if round 1 or passed
    if (((round === 1) || (num_correct >= 5))) {
        num_correct = 0;
        continueRoutine = false;
    }
    
    // *title_fail_2* updates
    if (t >= 0.0 && title_fail_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      title_fail_2.tStart = t;  // (not accounting for frame time here)
      title_fail_2.frameNStart = frameN;  // exact frame index
      
      title_fail_2.setAutoDraw(true);
    }

    
    // *you_failed_2* updates
    if (t >= 0.0 && you_failed_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      you_failed_2.tStart = t;  // (not accounting for frame time here)
      you_failed_2.frameNStart = frameN;  // exact frame index
      
      you_failed_2.setAutoDraw(true);
    }

    
    // *space_6* updates
    if (t >= 0.0 && space_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_6.tStart = t;  // (not accounting for frame time here)
      space_6.frameNStart = frameN;  // exact frame index
      
      space_6.setAutoDraw(true);
    }

    
    // *space_resp_6* updates
    if (t >= 0.0 && space_resp_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_resp_6.tStart = t;  // (not accounting for frame time here)
      space_resp_6.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { space_resp_6.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { space_resp_6.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { space_resp_6.clearEvents(); });
    }

    if (space_resp_6.status === PsychoJS.Status.STARTED) {
      let theseKeys = space_resp_6.getKeys({keyList: ['space'], waitRelease: false});
      _space_resp_6_allKeys = _space_resp_6_allKeys.concat(theseKeys);
      if (_space_resp_6_allKeys.length > 0) {
        space_resp_6.keys = _space_resp_6_allKeys[_space_resp_6_allKeys.length - 1].name;  // just the last key pressed
        space_resp_6.rt = _space_resp_6_allKeys[_space_resp_6_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    fail_HC_r2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function fail_HC_r2RoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'fail_HC_r2'-------
    fail_HC_r2Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('space_resp_6.keys', space_resp_6.keys);
    if (typeof space_resp_6.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('space_resp_6.rt', space_resp_6.rt);
        routineTimer.reset();
        }
    
    space_resp_6.stop();
    // the Routine "fail_HC_r2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


function endLoopIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        const thisTrial = snapshot.getCurrentTrial();
        if (typeof thisTrial === 'undefined' || !('isTrials' in thisTrial) || thisTrial.isTrials) {
          psychoJS.experiment.nextEntry(snapshot);
        }
      }
    return Scheduler.Event.NEXT;
    }
  };
}


function importConditions(currentLoop) {
  return function () {
    psychoJS.importAttributes(currentLoop.getCurrentTrial());
    return Scheduler.Event.NEXT;
    };
}


function quitPsychoJS(message, isCompleted) {
  // Check for and save orphaned data
  if (psychoJS.experiment.isEntryEmpty()) {
    psychoJS.experiment.nextEntry();
  }
  
  
  
  
  
  
  
  
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});
  
  return Scheduler.Event.QUIT;
}
