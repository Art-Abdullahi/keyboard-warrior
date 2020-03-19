var UIModule = (function() {
  var DOMElements = {
    //indicators - test control
    timeLeft: document.getElementById("timeLeft"), //Html element displaying time left
    //test results
    wpm: document.getElementById("wpm"),
    wpmChange: document.getElementById("wpmChange"),
    cpm: document.getElementById("cpm"),
    cpmChamge: document.getElementById("cpmChange"),
    accuracy: document.getElementById("accuracy"),
    accuracyChange: document.getElementById("accuracyChange"),
    //user input
    textInput: document.querySelector("#input"),
    nameInput: document.querySelector(".form-group"),
    //test words
    content: document.getElementById("content"),
    activeWord: "",
    //modal
    modal: $("myModal")
  };
  var splitArray = function(string) {
    return string.split("");
  };
  var addSpace = function(array) {
    array.push(" ");
    return array;
  };
  var addSpanTags = function(array) {
    return array.map(function(currentCharacter) {
      return "<span>" + currentCharacter + "</span>";
    });
  };
  var addWordSpanTags = function(array) {
    array.push("</span>");
    array.unshift("<span>");
    return array;
  };
  var joinEachWord = function(array) {
    return array.join("");
  };
  return {
    //get DomElements
    getDomeElements: function() {},
    //indicators -Test Control
    updateTimeLeft: function(x) {
      DOMElements.timeLeft.innerHTML = x;
    },
    //results
    updateResults: function() {},
    fillModal: function() {},
    showModal: function() {},
    //user Input
    inputFocus: function() {
      DOMElements.textInput.focus();
    },
    isNameEmpty() {},
    flagNameInput() {},
    spacePressed: function() {},
    enterPressed: function() {},
    emptyInput: function() {},
    //test words
    fillContent: function(array, lineReturn) {
      var content = array.map(splitArray);

      content = content.map(addSpace);

      content = content.map(addSpanTags);

      content = content.map(addWordSpanTags);

      content = content.map(joinEachWord);

      content = content.join("");

      content = content.split("<span>|</span>").join("<span>&crarr;</span>");
      //fill content in the browser
      DOMElements.content.innerHTML = content;
    },
    formatWord: function(wordObject) {
      var activeWord = DOMElements.activeWord;
      //highlight current word
      activeWord.className = "activeWord";
    },
    setActiveWord: function(index) {
      DOMElements.activeWord = DOMElements.content.children[index];
    },
    deactivateCurrentWord: function() {},
    scroll: function() {}
  };
})();
