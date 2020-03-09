var eventsModule = (function(
  dataModule,
  UIModule,
  wordsModule,
  certificateModule
) {
  var addEventListeners = function() {
    //character typing event listener
    //click on download button  event
    //click on restart button event
  };
  return {
    //init function,initializies the test before start
    init: function(duration, textNumber) {
      //fill the list of test words:data module
      var words = wordsModule.getWords(textNumber);

      dataModule.fillListOfTestWords(textNumber);
      //fill the list of test words: ui module

      //set the total test time

      //update Time left:data modeule

      //update time left: ui module

      //move to a new word: data module

      //set active word: ui module

      //format the active word:ui module

      //focus on text input: ui module
      addEventListeners();
    }
  };
})(dataModule, UIModule, wordsModule, certificateModule);
