var UIModule = function() {
  var DOMElements = {
    //indicators - test control
    timeLeft, //Html element displaying time left
    //test results
    wpm,
    wpmChange,
    cpm,
    cpmChamge,
    accuracy,
    accuracyChange,
    //user input
    textInput,
    nameInput,
    //test words
    content,
    activeWord,
    //modal
    modal
  };
  return {
    //get DomElements
    getDomeElements: function() {},
    //indicators -Test Control
    updateTimeLeft: function() {},
    //results
    updateResults: function() {},
    fillModal: function() {},
    showModal: function() {},
    //user Input
    inputFocus: function() {},
    isNameEmpty() {},
    flagNameInput() {},
    spacePressed: function() {},
    enterPressed: function() {},
    emptyInput: function() {},
    //test words
    fillContent: function() {},
    formatWord: function(wordObject, wordHtml) {},
    setActiveWord: function(index) {},
    deactivateCurrentWord: function() {},
    scroll: function() {}
  };
};
