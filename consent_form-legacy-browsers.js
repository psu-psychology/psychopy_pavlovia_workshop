/********************* 
 * Consent_Form Test *
 *********************/

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
let expName = 'consent_form';  // from the Builder filename that created this script
let expInfo = {'participant': '1', 'condition': '1'};

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
flowScheduler.add(consent_instrRoutineBegin());
flowScheduler.add(consent_instrRoutineEachFrame());
flowScheduler.add(consent_instrRoutineEnd());
const consent_repeatLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(consent_repeatLoopBegin, consent_repeatLoopScheduler);
flowScheduler.add(consent_repeatLoopScheduler);
flowScheduler.add(consent_repeatLoopEnd);
flowScheduler.add(agree_disagreeRoutineBegin());
flowScheduler.add(agree_disagreeRoutineEachFrame());
flowScheduler.add(agree_disagreeRoutineEnd());
flowScheduler.add(goodbyeRoutineBegin());
flowScheduler.add(goodbyeRoutineEachFrame());
flowScheduler.add(goodbyeRoutineEnd());
flowScheduler.add(instrRoutineBegin());
flowScheduler.add(instrRoutineEachFrame());
flowScheduler.add(instrRoutineEnd());
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
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


var consent_instrClock;
var title_consent_welcome;
var consent_info;
var space_consent;
var space_resp_consent;
var consent_1Clock;
var title_consent;
var consent_info_2;
var space_consent_2;
var space_resp_consent_2;
var consent_2Clock;
var title_consent_2;
var consent_info_3;
var space_consent_3;
var space_resp_consent_3;
var consent_3Clock;
var title_consent_3;
var consent_info_4;
var space_consent_4;
var space_resp_consent_4;
var repeatClock;
var would_you_like;
var please_click;
var yes;
var no;
var mouse;
var agree_disagreeClock;
var title_consent_4;
var do_you_consent;
var please_click_2;
var if_you;
var i_agree;
var i_disagree;
var mouse_2;
var goodbyeClock;
var thank_you_disagree;
var instrClock;
var thank_you_agree;
var key_resp;
var globalClock;
var routineTimer;
function experimentInit() {
  // Initialize components for Routine "consent_instr"
  consent_instrClock = new util.Clock();
  title_consent_welcome = new visual.TextStim({
    win: psychoJS.window,
    name: 'title_consent_welcome',
    text: 'Welcome to the experiment!',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.33], height: 0.045,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  consent_info = new visual.TextStim({
    win: psychoJS.window,
    name: 'consent_info',
    text: 'Before beginning the experiment, please read \nthe consent form carefully and indicate whether\nor not you agree to participate in this study.',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.04,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  space_consent = new visual.TextStim({
    win: psychoJS.window,
    name: 'space_consent',
    text: 'Press the [SPACE] bar \nto read the consent form',
    font: 'Arial',
    units: undefined, 
    pos: [0, (- 0.33)], height: 0.035,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -2.0 
  });
  
  space_resp_consent = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "consent_1"
  consent_1Clock = new util.Clock();
  title_consent = new visual.TextStim({
    win: psychoJS.window,
    name: 'title_consent',
    text: 'Consent Form (Part 1/3)',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.33], height: 0.045,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  consent_info_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'consent_info_2',
    text: '1. Purpose of the Study: The purpose of this research study is to explore how people acquire languages.\n\n2. Procedures to be followed: You will be asked to listen to a stream of sentences spoken in a foreign language using headphones while seated at a computer. To check whether you are wearing headphones, you will be asked to complete a task where you will listen to some tones and make judgements about their volume. While listening to the sentences, you will also be asked to listen to some tones and make judgements about the number of tones that you heard. After approximately 25 minutes, you will listen to some sentences presented one at a time and be asked to choose whether they came from the language that you listened to at the beginning of the experiment.',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.03,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  space_consent_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'space_consent_2',
    text: 'Press the [SPACE] bar\nto continue reading the consent form',
    font: 'Arial',
    units: undefined, 
    pos: [0, (- 0.33)], height: 0.035,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -2.0 
  });
  
  space_resp_consent_2 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "consent_2"
  consent_2Clock = new util.Clock();
  title_consent_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'title_consent_2',
    text: 'Consent Form (Part 2/3)',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.33], height: 0.045,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  consent_info_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'consent_info_3',
    text: '3. Discomforts and Risks: There are no risks in participating in this research beyond those experienced in everyday life.\n\n4. Benefits: This study is designed to further our understanding of language acquisition. Gaining an understanding of basic mechanisms supporting language acquisition may ultimately have clinical implications in the future and will inform the basic science related to how language is acquired.\n\n5. Duration: It will take approximately 35 minutes to complete this study.\n\n6. Statement of Confidentiality: Your participation in this research is confidential. The data will be stored in a secure server hosted by Pavlovia (Open Science Tools Ltd.), and can only be accessed by the researchers conducting this study. The Pennsylvania State University’s Office for Research Protections and Institutional Review Board and the Office for Human Research Protections in the Department of Health and Human Services may review records related to this research study. In the event of a publication or presentation resulting from the research, no personally identifiable information will be shared.',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.025,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  space_consent_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'space_consent_3',
    text: 'Press the [SPACE] bar\nto continue reading the consent form',
    font: 'Arial',
    units: undefined, 
    pos: [0, (- 0.33)], height: 0.035,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -2.0 
  });
  
  space_resp_consent_3 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "consent_3"
  consent_3Clock = new util.Clock();
  title_consent_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'title_consent_3',
    text: 'Consent Form (Part 3/3)',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.33], height: 0.045,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  consent_info_4 = new visual.TextStim({
    win: psychoJS.window,
    name: 'consent_info_4',
    text: '7. Right to Ask Questions: Please contact the Language and Cognition Lab via email at PSULanguageLearningExp@gmail.com with questions, complaints, or concerns about this research. You can also contact this email address if you feel that this study has harmed you. If you have any questions, concerns, problems about your rights as a research participant or would like to offer input, please contact The Pennsylvania State University’s Office for Research Protections (ORP) at (814) 865-1775. The ORP cannot answer questions about research procedures. Questions about research procedures can be answered by the research team.\n\n8. Payment for participation: In return for your participation, you will earn 9.51 USD per hour. The average time to complete this study is 35 minutes, so a payment of about 5.55 USD is typical.\n\n9. Voluntary Participation: Your decision to be in this research is voluntary. You can stop at any time by clicking the “esc” key on your keyboard or by exiting your browser. Refusal to take part in or withdrawing from this study will involve no penalty and you will forfeit any monetary earnings that you would otherwise receive via Prolific for your participation.',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.025,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  space_consent_4 = new visual.TextStim({
    win: psychoJS.window,
    name: 'space_consent_4',
    text: 'Press the [SPACE] bar\nto continue',
    font: 'Arial',
    units: undefined, 
    pos: [0, (- 0.33)], height: 0.035,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -2.0 
  });
  
  space_resp_consent_4 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "repeat"
  repeatClock = new util.Clock();
  would_you_like = new visual.TextStim({
    win: psychoJS.window,
    name: 'would_you_like',
    text: 'Would you like to go back and \nread the consent form again?',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.21], height: 0.04,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  please_click = new visual.TextStim({
    win: psychoJS.window,
    name: 'please_click',
    text: 'Please click one of the options below',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.14], height: 0.03,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -2.0 
  });
  
  yes = new visual.TextStim({
    win: psychoJS.window,
    name: 'yes',
    text: 'Yes',
    font: 'Arial',
    units: undefined, 
    pos: [(- 0.25), 0], height: 0.045,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -3.0 
  });
  
  no = new visual.TextStim({
    win: psychoJS.window,
    name: 'no',
    text: 'No',
    font: 'Arial',
    units: undefined, 
    pos: [0.25, 0], height: 0.045,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -4.0 
  });
  
  mouse = new core.Mouse({
    win: psychoJS.window,
  });
  mouse.mouseClock = new util.Clock();
  // Initialize components for Routine "agree_disagree"
  agree_disagreeClock = new util.Clock();
  title_consent_4 = new visual.TextStim({
    win: psychoJS.window,
    name: 'title_consent_4',
    text: 'Agreement of Consent',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.33], height: 0.045,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  do_you_consent = new visual.TextStim({
    win: psychoJS.window,
    name: 'do_you_consent',
    text: 'Do you give your consent to participate in this study?',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.16], height: 0.04,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  please_click_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'please_click_2',
    text: 'Please click one of the options below',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.11], height: 0.033,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -2.0 
  });
  
  if_you = new visual.TextStim({
    win: psychoJS.window,
    name: 'if_you',
    text: 'If you agree, you will continue on to the experiment\nIf you disagree, the experiment will end automatically',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.025], height: 0.03,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -3.0 
  });
  
  i_agree = new visual.TextStim({
    win: psychoJS.window,
    name: 'i_agree',
    text: 'I agree',
    font: 'Arial',
    units: undefined, 
    pos: [(- 0.3), (- 0.08)], height: 0.045,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -4.0 
  });
  
  i_disagree = new visual.TextStim({
    win: psychoJS.window,
    name: 'i_disagree',
    text: 'I disagree',
    font: 'Arial',
    units: undefined, 
    pos: [0.3, (- 0.08)], height: 0.045,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -5.0 
  });
  
  mouse_2 = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_2.mouseClock = new util.Clock();
  // Initialize components for Routine "goodbye"
  goodbyeClock = new util.Clock();
  thank_you_disagree = new visual.TextStim({
    win: psychoJS.window,
    name: 'thank_you_disagree',
    text: 'Thank you for taking the time \nto consider participating in this study.',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.043,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  // Initialize components for Routine "instr"
  instrClock = new util.Clock();
  thank_you_agree = new visual.TextStim({
    win: psychoJS.window,
    name: 'thank_you_agree',
    text: 'Thank you for agreeing to participate in our study!',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.043,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  key_resp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var _space_resp_consent_allKeys;
var consent_instrComponents;
function consent_instrRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'consent_instr'-------
    t = 0;
    consent_instrClock.reset(); // clock
    frameN = -1;
    // update component parameters for each repeat
    space_resp_consent.keys = undefined;
    space_resp_consent.rt = undefined;
    _space_resp_consent_allKeys = [];
    // keep track of which components have finished
    consent_instrComponents = [];
    consent_instrComponents.push(title_consent_welcome);
    consent_instrComponents.push(consent_info);
    consent_instrComponents.push(space_consent);
    consent_instrComponents.push(space_resp_consent);
    
    consent_instrComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    
    return Scheduler.Event.NEXT;
  };
}


var continueRoutine;
function consent_instrRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'consent_instr'-------
    let continueRoutine = true; // until we're told otherwise
    // get current time
    t = consent_instrClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *title_consent_welcome* updates
    if (t >= 0.0 && title_consent_welcome.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      title_consent_welcome.tStart = t;  // (not accounting for frame time here)
      title_consent_welcome.frameNStart = frameN;  // exact frame index
      
      title_consent_welcome.setAutoDraw(true);
    }

    
    // *consent_info* updates
    if (t >= 0.0 && consent_info.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      consent_info.tStart = t;  // (not accounting for frame time here)
      consent_info.frameNStart = frameN;  // exact frame index
      
      consent_info.setAutoDraw(true);
    }

    
    // *space_consent* updates
    if (t >= 0.0 && space_consent.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_consent.tStart = t;  // (not accounting for frame time here)
      space_consent.frameNStart = frameN;  // exact frame index
      
      space_consent.setAutoDraw(true);
    }

    
    // *space_resp_consent* updates
    if (t >= 0.0 && space_resp_consent.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_resp_consent.tStart = t;  // (not accounting for frame time here)
      space_resp_consent.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { space_resp_consent.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { space_resp_consent.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { space_resp_consent.clearEvents(); });
    }

    if (space_resp_consent.status === PsychoJS.Status.STARTED) {
      let theseKeys = space_resp_consent.getKeys({keyList: ['space'], waitRelease: false});
      _space_resp_consent_allKeys = _space_resp_consent_allKeys.concat(theseKeys);
      if (_space_resp_consent_allKeys.length > 0) {
        space_resp_consent.keys = _space_resp_consent_allKeys[_space_resp_consent_allKeys.length - 1].name;  // just the last key pressed
        space_resp_consent.rt = _space_resp_consent_allKeys[_space_resp_consent_allKeys.length - 1].rt;
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
    consent_instrComponents.forEach( function(thisComponent) {
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


function consent_instrRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'consent_instr'-------
    consent_instrComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('space_resp_consent.keys', space_resp_consent.keys);
    if (typeof space_resp_consent.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('space_resp_consent.rt', space_resp_consent.rt);
        routineTimer.reset();
        }
    
    space_resp_consent.stop();
    // the Routine "consent_instr" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var consent_repeat;
var currentLoop;
function consent_repeatLoopBegin(consent_repeatLoopScheduler) {
  // set up handler to look after randomisation of conditions etc
  consent_repeat = new TrialHandler({
    psychoJS: psychoJS,
    nReps: 10, method: TrialHandler.Method.RANDOM,
    extraInfo: expInfo, originPath: undefined,
    trialList: undefined,
    seed: undefined, name: 'consent_repeat'
  });
  psychoJS.experiment.addLoop(consent_repeat); // add the loop to the experiment
  currentLoop = consent_repeat;  // we're now the current loop

  // Schedule all the trials in the trialList:
  consent_repeat.forEach(function() {
    const snapshot = consent_repeat.getSnapshot();

    consent_repeatLoopScheduler.add(importConditions(snapshot));
    consent_repeatLoopScheduler.add(consent_1RoutineBegin(snapshot));
    consent_repeatLoopScheduler.add(consent_1RoutineEachFrame(snapshot));
    consent_repeatLoopScheduler.add(consent_1RoutineEnd(snapshot));
    consent_repeatLoopScheduler.add(consent_2RoutineBegin(snapshot));
    consent_repeatLoopScheduler.add(consent_2RoutineEachFrame(snapshot));
    consent_repeatLoopScheduler.add(consent_2RoutineEnd(snapshot));
    consent_repeatLoopScheduler.add(consent_3RoutineBegin(snapshot));
    consent_repeatLoopScheduler.add(consent_3RoutineEachFrame(snapshot));
    consent_repeatLoopScheduler.add(consent_3RoutineEnd(snapshot));
    consent_repeatLoopScheduler.add(repeatRoutineBegin(snapshot));
    consent_repeatLoopScheduler.add(repeatRoutineEachFrame(snapshot));
    consent_repeatLoopScheduler.add(repeatRoutineEnd(snapshot));
    consent_repeatLoopScheduler.add(endLoopIteration(consent_repeatLoopScheduler, snapshot));
  });

  return Scheduler.Event.NEXT;
}


function consent_repeatLoopEnd() {
  psychoJS.experiment.removeLoop(consent_repeat);

  return Scheduler.Event.NEXT;
}


var _space_resp_consent_2_allKeys;
var consent_1Components;
function consent_1RoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'consent_1'-------
    t = 0;
    consent_1Clock.reset(); // clock
    frameN = -1;
    // update component parameters for each repeat
    space_resp_consent_2.keys = undefined;
    space_resp_consent_2.rt = undefined;
    _space_resp_consent_2_allKeys = [];
    // keep track of which components have finished
    consent_1Components = [];
    consent_1Components.push(title_consent);
    consent_1Components.push(consent_info_2);
    consent_1Components.push(space_consent_2);
    consent_1Components.push(space_resp_consent_2);
    
    consent_1Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    
    return Scheduler.Event.NEXT;
  };
}


function consent_1RoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'consent_1'-------
    let continueRoutine = true; // until we're told otherwise
    // get current time
    t = consent_1Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *title_consent* updates
    if (t >= 0.0 && title_consent.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      title_consent.tStart = t;  // (not accounting for frame time here)
      title_consent.frameNStart = frameN;  // exact frame index
      
      title_consent.setAutoDraw(true);
    }

    
    // *consent_info_2* updates
    if (t >= 0.0 && consent_info_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      consent_info_2.tStart = t;  // (not accounting for frame time here)
      consent_info_2.frameNStart = frameN;  // exact frame index
      
      consent_info_2.setAutoDraw(true);
    }

    
    // *space_consent_2* updates
    if (t >= 0.0 && space_consent_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_consent_2.tStart = t;  // (not accounting for frame time here)
      space_consent_2.frameNStart = frameN;  // exact frame index
      
      space_consent_2.setAutoDraw(true);
    }

    
    // *space_resp_consent_2* updates
    if (t >= 0.0 && space_resp_consent_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_resp_consent_2.tStart = t;  // (not accounting for frame time here)
      space_resp_consent_2.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { space_resp_consent_2.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { space_resp_consent_2.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { space_resp_consent_2.clearEvents(); });
    }

    if (space_resp_consent_2.status === PsychoJS.Status.STARTED) {
      let theseKeys = space_resp_consent_2.getKeys({keyList: ['space'], waitRelease: false});
      _space_resp_consent_2_allKeys = _space_resp_consent_2_allKeys.concat(theseKeys);
      if (_space_resp_consent_2_allKeys.length > 0) {
        space_resp_consent_2.keys = _space_resp_consent_2_allKeys[_space_resp_consent_2_allKeys.length - 1].name;  // just the last key pressed
        space_resp_consent_2.rt = _space_resp_consent_2_allKeys[_space_resp_consent_2_allKeys.length - 1].rt;
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
    consent_1Components.forEach( function(thisComponent) {
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


function consent_1RoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'consent_1'-------
    consent_1Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('space_resp_consent_2.keys', space_resp_consent_2.keys);
    if (typeof space_resp_consent_2.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('space_resp_consent_2.rt', space_resp_consent_2.rt);
        routineTimer.reset();
        }
    
    space_resp_consent_2.stop();
    // the Routine "consent_1" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _space_resp_consent_3_allKeys;
var consent_2Components;
function consent_2RoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'consent_2'-------
    t = 0;
    consent_2Clock.reset(); // clock
    frameN = -1;
    // update component parameters for each repeat
    space_resp_consent_3.keys = undefined;
    space_resp_consent_3.rt = undefined;
    _space_resp_consent_3_allKeys = [];
    // keep track of which components have finished
    consent_2Components = [];
    consent_2Components.push(title_consent_2);
    consent_2Components.push(consent_info_3);
    consent_2Components.push(space_consent_3);
    consent_2Components.push(space_resp_consent_3);
    
    consent_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    
    return Scheduler.Event.NEXT;
  };
}


function consent_2RoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'consent_2'-------
    let continueRoutine = true; // until we're told otherwise
    // get current time
    t = consent_2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *title_consent_2* updates
    if (t >= 0.0 && title_consent_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      title_consent_2.tStart = t;  // (not accounting for frame time here)
      title_consent_2.frameNStart = frameN;  // exact frame index
      
      title_consent_2.setAutoDraw(true);
    }

    
    // *consent_info_3* updates
    if (t >= 0.0 && consent_info_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      consent_info_3.tStart = t;  // (not accounting for frame time here)
      consent_info_3.frameNStart = frameN;  // exact frame index
      
      consent_info_3.setAutoDraw(true);
    }

    
    // *space_consent_3* updates
    if (t >= 0.0 && space_consent_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_consent_3.tStart = t;  // (not accounting for frame time here)
      space_consent_3.frameNStart = frameN;  // exact frame index
      
      space_consent_3.setAutoDraw(true);
    }

    
    // *space_resp_consent_3* updates
    if (t >= 0.0 && space_resp_consent_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_resp_consent_3.tStart = t;  // (not accounting for frame time here)
      space_resp_consent_3.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { space_resp_consent_3.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { space_resp_consent_3.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { space_resp_consent_3.clearEvents(); });
    }

    if (space_resp_consent_3.status === PsychoJS.Status.STARTED) {
      let theseKeys = space_resp_consent_3.getKeys({keyList: ['space'], waitRelease: false});
      _space_resp_consent_3_allKeys = _space_resp_consent_3_allKeys.concat(theseKeys);
      if (_space_resp_consent_3_allKeys.length > 0) {
        space_resp_consent_3.keys = _space_resp_consent_3_allKeys[_space_resp_consent_3_allKeys.length - 1].name;  // just the last key pressed
        space_resp_consent_3.rt = _space_resp_consent_3_allKeys[_space_resp_consent_3_allKeys.length - 1].rt;
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
    consent_2Components.forEach( function(thisComponent) {
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


function consent_2RoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'consent_2'-------
    consent_2Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('space_resp_consent_3.keys', space_resp_consent_3.keys);
    if (typeof space_resp_consent_3.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('space_resp_consent_3.rt', space_resp_consent_3.rt);
        routineTimer.reset();
        }
    
    space_resp_consent_3.stop();
    // the Routine "consent_2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _space_resp_consent_4_allKeys;
var consent_3Components;
function consent_3RoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'consent_3'-------
    t = 0;
    consent_3Clock.reset(); // clock
    frameN = -1;
    // update component parameters for each repeat
    space_resp_consent_4.keys = undefined;
    space_resp_consent_4.rt = undefined;
    _space_resp_consent_4_allKeys = [];
    // keep track of which components have finished
    consent_3Components = [];
    consent_3Components.push(title_consent_3);
    consent_3Components.push(consent_info_4);
    consent_3Components.push(space_consent_4);
    consent_3Components.push(space_resp_consent_4);
    
    consent_3Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    
    return Scheduler.Event.NEXT;
  };
}


function consent_3RoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'consent_3'-------
    let continueRoutine = true; // until we're told otherwise
    // get current time
    t = consent_3Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *title_consent_3* updates
    if (t >= 0.0 && title_consent_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      title_consent_3.tStart = t;  // (not accounting for frame time here)
      title_consent_3.frameNStart = frameN;  // exact frame index
      
      title_consent_3.setAutoDraw(true);
    }

    
    // *consent_info_4* updates
    if (t >= 0.0 && consent_info_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      consent_info_4.tStart = t;  // (not accounting for frame time here)
      consent_info_4.frameNStart = frameN;  // exact frame index
      
      consent_info_4.setAutoDraw(true);
    }

    
    // *space_consent_4* updates
    if (t >= 0.0 && space_consent_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_consent_4.tStart = t;  // (not accounting for frame time here)
      space_consent_4.frameNStart = frameN;  // exact frame index
      
      space_consent_4.setAutoDraw(true);
    }

    
    // *space_resp_consent_4* updates
    if (t >= 0.0 && space_resp_consent_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_resp_consent_4.tStart = t;  // (not accounting for frame time here)
      space_resp_consent_4.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { space_resp_consent_4.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { space_resp_consent_4.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { space_resp_consent_4.clearEvents(); });
    }

    if (space_resp_consent_4.status === PsychoJS.Status.STARTED) {
      let theseKeys = space_resp_consent_4.getKeys({keyList: ['space'], waitRelease: false});
      _space_resp_consent_4_allKeys = _space_resp_consent_4_allKeys.concat(theseKeys);
      if (_space_resp_consent_4_allKeys.length > 0) {
        space_resp_consent_4.keys = _space_resp_consent_4_allKeys[_space_resp_consent_4_allKeys.length - 1].name;  // just the last key pressed
        space_resp_consent_4.rt = _space_resp_consent_4_allKeys[_space_resp_consent_4_allKeys.length - 1].rt;
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
    consent_3Components.forEach( function(thisComponent) {
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


function consent_3RoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'consent_3'-------
    consent_3Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('space_resp_consent_4.keys', space_resp_consent_4.keys);
    if (typeof space_resp_consent_4.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('space_resp_consent_4.rt', space_resp_consent_4.rt);
        routineTimer.reset();
        }
    
    space_resp_consent_4.stop();
    // the Routine "consent_3" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var gotValidClick;
var repeatComponents;
function repeatRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'repeat'-------
    t = 0;
    repeatClock.reset(); // clock
    frameN = -1;
    // update component parameters for each repeat
    // setup some python lists for storing info about the mouse
    mouse.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    repeatComponents = [];
    repeatComponents.push(would_you_like);
    repeatComponents.push(please_click);
    repeatComponents.push(yes);
    repeatComponents.push(no);
    repeatComponents.push(mouse);
    
    repeatComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    
    return Scheduler.Event.NEXT;
  };
}


var prevButtonState;
function repeatRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'repeat'-------
    let continueRoutine = true; // until we're told otherwise
    // get current time
    t = repeatClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // Repeat consent form
    if (yes.contains(mouse) && mouse.getPressed()[0] === 1) {
        continueRoutine = true;
    }
    
    // Move on to agreement
    if (no.contains(mouse) && mouse.getPressed()[0] === 1) {
        consent_repeat.finished = true;
    }
    
    // *would_you_like* updates
    if (t >= 0.0 && would_you_like.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      would_you_like.tStart = t;  // (not accounting for frame time here)
      would_you_like.frameNStart = frameN;  // exact frame index
      
      would_you_like.setAutoDraw(true);
    }

    
    // *please_click* updates
    if (t >= 0.0 && please_click.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      please_click.tStart = t;  // (not accounting for frame time here)
      please_click.frameNStart = frameN;  // exact frame index
      
      please_click.setAutoDraw(true);
    }

    
    // *yes* updates
    if (t >= 0.0 && yes.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      yes.tStart = t;  // (not accounting for frame time here)
      yes.frameNStart = frameN;  // exact frame index
      
      yes.setAutoDraw(true);
    }

    
    // *no* updates
    if (t >= 0.0 && no.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      no.tStart = t;  // (not accounting for frame time here)
      no.frameNStart = frameN;  // exact frame index
      
      no.setAutoDraw(true);
    }

    // *mouse* updates
    if (t >= 0.0 && mouse.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse.tStart = t;  // (not accounting for frame time here)
      mouse.frameNStart = frameN;  // exact frame index
      
      mouse.status = PsychoJS.Status.STARTED;
      mouse.mouseClock.reset();
      prevButtonState = mouse.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      let buttons = mouse.getPressed();
      if (!buttons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = buttons;
        if (buttons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [yes, no]) {
            if (obj.contains(mouse)) {
              gotValidClick = true;
              mouse.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // abort routine on response
            continueRoutine = false;
          }
        }
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
    repeatComponents.forEach( function(thisComponent) {
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


function repeatRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'repeat'-------
    repeatComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // store data for thisExp (ExperimentHandler)
    const xys = mouse.getPos();
    const buttons = mouse.getPressed();
    psychoJS.experiment.addData('mouse.x', xys[0]);
    psychoJS.experiment.addData('mouse.y', xys[1]);
    psychoJS.experiment.addData('mouse.leftButton', buttons[0]);
    psychoJS.experiment.addData('mouse.midButton', buttons[1]);
    psychoJS.experiment.addData('mouse.rightButton', buttons[2]);
    if (mouse.clicked_name.length > 0) {
      psychoJS.experiment.addData('mouse.clicked_name', mouse.clicked_name[0]);}
    // the Routine "repeat" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var agree_disagreeComponents;
function agree_disagreeRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'agree_disagree'-------
    t = 0;
    agree_disagreeClock.reset(); // clock
    frameN = -1;
    // update component parameters for each repeat
    // setup some python lists for storing info about the mouse_2
    mouse_2.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    agree_disagreeComponents = [];
    agree_disagreeComponents.push(title_consent_4);
    agree_disagreeComponents.push(do_you_consent);
    agree_disagreeComponents.push(please_click_2);
    agree_disagreeComponents.push(if_you);
    agree_disagreeComponents.push(i_agree);
    agree_disagreeComponents.push(i_disagree);
    agree_disagreeComponents.push(mouse_2);
    
    agree_disagreeComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    
    return Scheduler.Event.NEXT;
  };
}


function agree_disagreeRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'agree_disagree'-------
    let continueRoutine = true; // until we're told otherwise
    // get current time
    t = agree_disagreeClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *title_consent_4* updates
    if (t >= 0.0 && title_consent_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      title_consent_4.tStart = t;  // (not accounting for frame time here)
      title_consent_4.frameNStart = frameN;  // exact frame index
      
      title_consent_4.setAutoDraw(true);
    }

    if (title_consent_4.status === PsychoJS.Status.STARTED && Boolean(1.0)) {
      title_consent_4.setAutoDraw(false);
    }
    
    // *do_you_consent* updates
    if (t >= 0.0 && do_you_consent.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      do_you_consent.tStart = t;  // (not accounting for frame time here)
      do_you_consent.frameNStart = frameN;  // exact frame index
      
      do_you_consent.setAutoDraw(true);
    }

    
    // *please_click_2* updates
    if (t >= 0.0 && please_click_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      please_click_2.tStart = t;  // (not accounting for frame time here)
      please_click_2.frameNStart = frameN;  // exact frame index
      
      please_click_2.setAutoDraw(true);
    }

    
    // *if_you* updates
    if (t >= 0.0 && if_you.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      if_you.tStart = t;  // (not accounting for frame time here)
      if_you.frameNStart = frameN;  // exact frame index
      
      if_you.setAutoDraw(true);
    }

    
    // *i_agree* updates
    if (t >= 0.0 && i_agree.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      i_agree.tStart = t;  // (not accounting for frame time here)
      i_agree.frameNStart = frameN;  // exact frame index
      
      i_agree.setAutoDraw(true);
    }

    
    // *i_disagree* updates
    if (t >= 0.0 && i_disagree.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      i_disagree.tStart = t;  // (not accounting for frame time here)
      i_disagree.frameNStart = frameN;  // exact frame index
      
      i_disagree.setAutoDraw(true);
    }

    // *mouse_2* updates
    if (t >= 0.0 && mouse_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_2.tStart = t;  // (not accounting for frame time here)
      mouse_2.frameNStart = frameN;  // exact frame index
      
      mouse_2.status = PsychoJS.Status.STARTED;
      mouse_2.mouseClock.reset();
      prevButtonState = mouse_2.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse_2.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      let buttons = mouse_2.getPressed();
      if (!buttons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = buttons;
        if (buttons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [i_agree, i_disagree]) {
            if (obj.contains(mouse_2)) {
              gotValidClick = true;
              mouse_2.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // abort routine on response
            continueRoutine = false;
          }
        }
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
    agree_disagreeComponents.forEach( function(thisComponent) {
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


function agree_disagreeRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'agree_disagree'-------
    agree_disagreeComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // store data for thisExp (ExperimentHandler)
    const xys = mouse_2.getPos();
    const buttons = mouse_2.getPressed();
    psychoJS.experiment.addData('mouse_2.x', xys[0]);
    psychoJS.experiment.addData('mouse_2.y', xys[1]);
    psychoJS.experiment.addData('mouse_2.leftButton', buttons[0]);
    psychoJS.experiment.addData('mouse_2.midButton', buttons[1]);
    psychoJS.experiment.addData('mouse_2.rightButton', buttons[2]);
    if (mouse_2.clicked_name.length > 0) {
      psychoJS.experiment.addData('mouse_2.clicked_name', mouse_2.clicked_name[0]);}
    // the Routine "agree_disagree" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var goodbyeComponents;
function goodbyeRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'goodbye'-------
    t = 0;
    goodbyeClock.reset(); // clock
    frameN = -1;
    routineTimer.add(4.000000);
    // update component parameters for each repeat
    // End experiment if participant disagrees
    if (i_disagree.contains(mouse_2) && mouse_2.getPressed()[0] === 1) {
        return quitPsychoJS('We appreciate that you considered participating in our study.', false);
    }
    // keep track of which components have finished
    goodbyeComponents = [];
    goodbyeComponents.push(thank_you_disagree);
    
    goodbyeComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    
    return Scheduler.Event.NEXT;
  };
}


var frameRemains;
function goodbyeRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'goodbye'-------
    let continueRoutine = true; // until we're told otherwise
    // get current time
    t = goodbyeClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // Continue experiment if participant agrees
    if (i_agree.contains(mouse_2) && mouse_2.getPressed()[0] === 1) {
        continueRoutine = false;
    }
    
    
    // *thank_you_disagree* updates
    if (t >= 0.0 && thank_you_disagree.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      thank_you_disagree.tStart = t;  // (not accounting for frame time here)
      thank_you_disagree.frameNStart = frameN;  // exact frame index
      
      thank_you_disagree.setAutoDraw(true);
    }

    frameRemains = 4  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (thank_you_disagree.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      thank_you_disagree.setAutoDraw(false);
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
    goodbyeComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function goodbyeRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'goodbye'-------
    goodbyeComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    return Scheduler.Event.NEXT;
  };
}


var _key_resp_allKeys;
var instrComponents;
function instrRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'instr'-------
    t = 0;
    instrClock.reset(); // clock
    frameN = -1;
    // update component parameters for each repeat
    key_resp.keys = undefined;
    key_resp.rt = undefined;
    _key_resp_allKeys = [];
    // keep track of which components have finished
    instrComponents = [];
    instrComponents.push(thank_you_agree);
    instrComponents.push(key_resp);
    
    instrComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    
    return Scheduler.Event.NEXT;
  };
}


function instrRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'instr'-------
    let continueRoutine = true; // until we're told otherwise
    // get current time
    t = instrClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *thank_you_agree* updates
    if (t >= 0.0 && thank_you_agree.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      thank_you_agree.tStart = t;  // (not accounting for frame time here)
      thank_you_agree.frameNStart = frameN;  // exact frame index
      
      thank_you_agree.setAutoDraw(true);
    }

    
    // *key_resp* updates
    if (t >= 0.0 && key_resp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp.tStart = t;  // (not accounting for frame time here)
      key_resp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp.clearEvents(); });
    }

    if (key_resp.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp.getKeys({keyList: ['space'], waitRelease: false});
      _key_resp_allKeys = _key_resp_allKeys.concat(theseKeys);
      if (_key_resp_allKeys.length > 0) {
        key_resp.keys = _key_resp_allKeys[_key_resp_allKeys.length - 1].name;  // just the last key pressed
        key_resp.rt = _key_resp_allKeys[_key_resp_allKeys.length - 1].rt;
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
    instrComponents.forEach( function(thisComponent) {
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


function instrRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'instr'-------
    instrComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('key_resp.keys', key_resp.keys);
    if (typeof key_resp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp.rt', key_resp.rt);
        routineTimer.reset();
        }
    
    key_resp.stop();
    // the Routine "instr" was not non-slip safe, so reset the non-slip timer
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
