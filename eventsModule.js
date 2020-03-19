var eventsModule = (function(dModule, uModule, wModule, certificateModule) {
  var addEventListeners = function() {
    //character typing event listener
    //click on download button  event
    //click on restart button event
  };
  return {
    //init function,initializies the test before start
    init: function(duration, textNumber) {
      //fill the list of test words:data module
      var words = wModule.getWords(textNumber);

      dModule.fillListOfTestWords(textNumber, words);
      //fill the list of test words: ui module
      var lineReturn = dModule.getLineReturn();
      var testWords = dModule.getListOfTestWords();
      uModule.fillContent(testWords, lineReturn);
      //set the total test time: data module
      dModule.setTestTime(duration);

      //update Time left:data modeule
      dModule.intializeTimeLeft();
      //update time left: ui module
      var timeLeft = dModule.getTimeLeft();
      uModule.updateTimeLeft(timeLeft);
      //move to a new word: data module
      dModule.moveToNewWord();
      //set active word: ui module
      var index = dModule.getCurrentWordIndex();
      uModule.setActiveWord(index);
      //format the active word:ui module
      var currentWord = dModule.getCurrentWord();
      uModule.formatWord(currentWord);
      //focus on text input: ui module
      uModule.inputFocus();
      addEventListeners();
    }
  };
})(dataModule, UIModule, wordsModule, certificateModule);
