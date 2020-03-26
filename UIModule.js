var UIModule = (function() {
  var DOMElements = {
    //indicators - test control
    timeLeft: document.getElementById("timeLeft"), //Html element displaying time left
    //test results
    wpm: document.getElementById("wpm"),
    wpmChange: document.getElementById("wpmChange"),
    cpm: document.getElementById("cpm"),
    cpmChange: document.getElementById("cpmChange"),
    accuracy: document.getElementById("accuracy"),
    accuracyChange: document.getElementById("accuracyChange"),
    //user input
    textInput: document.querySelector("#input"),
    nameInput: document.querySelector(".form-group"),
    //test words
    content: document.getElementById("content"),
    activeWord: "",
    //modal
    modal: $("#myModal")
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
  var userValue;
  var returnCharClass = function(currentCharacter, index) {
    return index < userValue.length
      ? currentCharacter == userValue[index]
        ? "correctCharacter"
        : "wrongCharacter"
      : "0";
  };
  var updateChanges = function(value, changeElement) {
    //determine class to add to the change element and html to insert
    var classToAdd, html;
    [classToAdd, html] =
      value >= 0 ? ["scoreUp", "+" + value] : ["scoreDown", value];
    //add % to the percantage change
    if (changeElement == DOMElements.accuracyChange) {
      html += "%";
    }
    //update the change element
    changeElement.innerHTML = html;
    //style the change element
    changeElement.removeAttribute("class");
    changeElement.className = classToAdd;
    //fade element
    fadeElement(changeElement);
  };
  var fadeElement = function(element) {
    element.style.opacity = 1;
    setTimeout(function() {
      element.style.opacity = 0.9;
    }, 100);
  };
  return {
    //get DomElements
    getDomeElements: function() {
      return {
        textInput: DOMElements.textInput
      };
    },
    //indicators -Test Control
    updateTimeLeft: function(x) {
      DOMElements.timeLeft.innerHTML = x;
    },
    //results
    updateResults: function(results) {
      //update wpm
      DOMElements.wpm.innerHTML = results.wpm;
      //update cpm
      DOMElements.cpm.innerHTML = results.cpm;
      //update accuracy
      DOMElements.accuracy.innerHTML = results.accuracy + "%";
      //update changes
      updateChanges(results.wpmChange, DOMElements.wpmChange);
      updateChanges(results.cpmChange, DOMElements.cpmChange);
      updateChanges(results.accuracyChange, DOMElements.accuracyChange);
    },
    fillModal: function(wpm) {
      var html =
        '<div><p>You are a %type%!</p><p>You type at a speed of %wpm% words per minute</p><img src="img/%image%"></div>';
    },
    showModal: function() {
      DOMElements.modal.modal("show");
    },
    //user Input
    inputFocus: function() {
      DOMElements.textInput.focus();
    },
    isNameEmpty() {},
    flagNameInput() {},
    spacePressed: function(event) {
      return event.data == " ";
    },
    enterPressed: function(lineReturn) {
      return DOMElements.textInput.value.includes(lineReturn + " ");
    },
    emptyInput: function() {
      DOMElements.textInput.value = "";
    },
    getTypedWord: function() {
      console.log(DOMElements.textInput.value);
      return DOMElements.textInput.value;
    },
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
      //format individual character
      var correctValue = wordObject.value.correct;
      userValue = wordObject.value.user;

      var classes = Array.prototype.map.call(correctValue, returnCharClass);
      //get active word
      var activeWord = DOMElements.activeWord;
      //HTML collection
      var characters = activeWord.children;
      //add classes to children
      for (let i = 0; i < characters.length; i++) {
        characters[i].removeAttribute("class");
        characters[i].className = classes[i];
      }
    },
    setActiveWord: function(index) {
      DOMElements.activeWord = DOMElements.content.children[index];
    },
    deactivateCurrentWord: function() {
      DOMElements.activeWord.removeAttribute("class");
    },
    scroll: function() {
      var activeWord = DOMElements.activeWord;
      var top1 = activeWord.offsetTop;
      var top2 = DOMElements.content.offsetTop;
      var diff = top1 - top2;
      //scroll the content of the content box
      DOMElements.content.scrollTop = diff - 40;
    }
  };
})();
