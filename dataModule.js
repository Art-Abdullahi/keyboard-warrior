var dataModule = (function() {
  var appData = {
    indicators: {
      testStarted: false,
      testEnded: false,
      totalTestTime: 0,
      timeLeft: 0
    },
    results: {
      wpm: 0,
      wpmChange: 0,
      cpm: 0,
      cpmChange: 0,
      accuracy: 0,
      accuracyChange: 0,
      numOfCorrectWords: 0,
      numOfCorrectCharacters: 0,
      numOfTestCharacters: 0
    },
    words: {
      currentWordIndex: 0,
      testWoords: [],
      currentWord: {}
    }
  };
  //word constructor
  // {
  //   value:{correct:"",user:'',isCorrect:false},
  //   characters:{correct:""user:'',totalCorrect:0,totalTest:0}
  // }

  var word = function(index) {};

  //updateMethod
  word.prototype.update = function(value) {};
  return {
    //Indicators - Test Control
    setTestTime: function(x) {}, //sets the total test time to x
    getTimeLeft: function() {},
    intializeTimeLeft: function() {}, //intialiazes time left to total test time
    startTest: function() {}, //starts the test
    endTest: function() {}, //ends the test
    reduceTime: function() {}, //reduces the time by one second
    timeLeft: function() {}, //checks if there is time left,
    testEnded: function() {},
    testStarted: function() {},
    //results
    calculateWpm: function() {},
    calculateCpm: function() {},
    calculateAccuracy: function() {},
    fillListOfTestWords: function(textNumber) {},
    getListOfTestWords: function() {},
    moveToNewWord: function() {},
    updateCurrentWord: function(value) {}
  };
})();
