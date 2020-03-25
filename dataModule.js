var dataModule = (function() {
  var lineReturn = "|";
  //SHUFFLE FUNCTION
  var shuffle = function(array) {
    var newArray = [];
    var randomIndex;
    var randomElement;
    while (array.length > 0) {
      //take a random element from array and add it to a new array
      randomIndex = Math.floor(Math.random() * array.length);
      randomElement = array[randomIndex];
      newArray.push(randomElement);
      //delete random element from array
      array.splice(randomIndex, 1);
    }
    return newArray;
  };

  //CAPITALIZE FUNCTION
  String.prototype.capitalize = function() {
    var newString = "";
    var firstCharCap = this.charAt(0).toUpperCase();
    var remainingChar = this.slice(1);
    newString = firstCharCap + remainingChar;
    return newString;
  };
  //capitalixe random function
  var capitalizeRandom = function(arrayofStrings) {
    return arrayofStrings.map(function(currentWord) {
      var x = Math.floor(4 * Math.random()); //chances of x = 3 is 25%
      return x == 3 ? currentWord.capitalize() : currentWord;
    });
  };

  //ADDRANDOM PUNC FUNTION
  var addRandomPunctuation = function(arrayofStrings) {
    return arrayofStrings.map(function(currentWord) {
      var randomPunctuation;
      var items = [
        lineReturn,
        "?",
        ",",
        ",",
        ",",
        ",",
        ".",
        ".",
        ".",
        ".",
        "!",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ];
      randomIndex = Math.floor(Math.random() * items.length);
      var randomPunctuation = items[randomIndex];
      return currentWord + randomPunctuation;
    });
  };
  //CHARCTER CALL BACK USED TO CALCULATE THE NUMBER OF CORRECT characters inside the current word
  var nbCorrectChar;
  var charCallback = function(currentElement, index) {
    nbCorrectChar += currentElement == this.characters.user[index] ? 1 : 0;
  };

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
      currentWordIndex: -1,
      testWords: [],
      currentWord: {}
    }
  };
  //word constructor
  // {
  //   value:{correct:"",user:'',isCorrect:false},
  //   characters:{correct:""user:'',totalCorrect:0,totalTest:0}
  // }

  var word = function(index) {
    //word values: correct vs user's
    this.value = {
      correct: appData.words.testWords[index] + " ",
      user: "",
      isCorrect: false
    };
    //characters: correct vs user's
    this.characters = {
      correct: this.value.correct.split(""),
      user: [],
      totalCorrect: 0,
      totalTest: this.value.correct.length
    };
  };

  //updateMethod
  word.prototype.update = function(value) {
    //update the user input
    this.value.user = value;
    //update the word status(correct or not)
    this.value.isCorrect = this.value.correct == this.value.user;
    //update user characters
    this.characters.user = this.value.user.split("");
    //calculate the number of correct characters
    nbCorrectChar = 0;

    var charCallback2 = charCallback.bind(this);
    this.characters.correct.forEach(charCallback2);

    this.characters.totalCorrect = nbCorrectChar;
  };
  return {
    //Indicators - Test Control
    setTestTime: function(x) {
      appData.indicators.totalTestTime = x;
    }, //sets the total test time to x
    getTimeLeft: function() {
      return appData.indicators.timeLeft;
    },
    //intialiazes time left to total test time
    intializeTimeLeft: function() {
      appData.indicators.timeLeft = appData.indicators.totalTestTime;
    },
    //starts the test
    startTest: function() {
      appData.indicators.testStarted = true;
    },
    endTest: function() {}, //ends the test
    //reduces the time by one second
    reduceTime: function() {
      appData.indicators.timeLeft--;
      return appData.indicators.timeLeft;
    },
    //checks if there is time left to continue the test,
    timeLeft: function() {
      return appData.indicators.timeLeft != 0;
    },
    testEnded: function() {
      return appData.indicators.testEnded;
    },
    testStarted: function() {
      return appData.indicators.testStarted;
    },
    //results
    calculateWpm: function() {
      var wpmOld = appData.results.wpm;
      var numOfCorrectWords = appData.results.numOfCorrectWords;
      if (appData.indicators.timeLeft != appData.indicators.totalTestTime) {
        appData.results.wpm = Math.round(
          (60 * numOfCorrectWords) /
            (appData.indicators.totalTestTime - appData.indicators.timeLeft)
        );
      } else {
        appData.results.wpm = 0;
      }
      appData.results.wpmChange = appData.results.wpm - wpmOld;
      return [appData.results.wpm, appData.results.wpmChange];
    },
    calculateCpm: function() {
      var cpmOld = appData.results.cpm;
      var numOfCorrectCharacters = appData.results.numOfCorrectCharacters;
      if (appData.indicators.timeLeft != appData.indicators.totalTestTime) {
        appData.results.cpm = Math.round(
          (60 * numOfCorrectCharacters) /
            (appData.indicators.totalTestTime - appData.indicators.timeLeft)
        );
      } else {
        appData.results.cpm = 0;
      }
      appData.results.cpmChange = appData.results.cpm - cpmOld;
      return [appData.results.cpm, appData.results.cpmChange];
    },
    calculateAccuracy: function() {
      var accuracyOld = appData.results.accuracy;
      var numOfCorrectCharacters = appData.results.numOfCorrectCharacters;
      var numOfTestCharacters = appData.results.numOfTestCharacters;
      if (appData.indicators.timeLeft != appData.indicators.totalTestTime) {
        if (numOfTestCharacters != 0) {
          appData.results.accuracy = Math.round(
            (100 * numOfCorrectCharacters) / numOfTestCharacters
          );
        } else {
          appData.results.accuracy = 0;
        }
      } else {
        appData.results.accuracy = 0;
      }
      appData.results.accuracyChange = appData.results.accuracy - accuracyOld;
      return [appData.results.accuracy, appData.results.accuracyChange];
    },
    //fill list with test words
    fillListOfTestWords: function(textNumber, words) {
      var result = words.split(" ");
      if (textNumber == 0) {
        //SHUFFLE WORDS
        result = shuffle(result);
        //CAPITALIZE RANDOM WORDS
        result = capitalizeRandom(result);
        //ADD A RANDOM PANCTUATION
        result = addRandomPunctuation(result);
      }
      appData.words.testWords = result;
    },
    getListOfTestWords: function() {
      return appData.words.testWords;
    },
    moveToNewWord: function() {
      if (appData.words.currentWordIndex > -1) {
        //update the number of correct words
        if (appData.words.currentWord.value.isCorrect == true) {
          appData.results.numOfCorrectWords++;
        }
        //update number of correct characters
        appData.results.numOfCorrectCharacters +=
          appData.words.currentWord.characters.totalCorrect;
        //upadate number of test characters
        appData.results.numOfTestCharacters +=
          appData.words.currentWord.characters.totalTest;
      }
      appData.words.currentWordIndex++;
      var currentIndex = appData.words.currentWordIndex;
      var newWord = new word(currentIndex);
      appData.words.currentWord = newWord;
    },
    getCurrentWordIndex() {
      return appData.words.currentWordIndex;
    },
    getCurrentWord() {
      var currentWord = appData.words.currentWord;
      return {
        value: {
          correct: currentWord.value.correct,
          user: currentWord.value.user
        }
      };
    },
    updateCurrentWord: function(value) {
      appData.words.currentWord.update(value);
    },
    returnDAta() {
      console.log(appData);
    },
    getLineReturn() {
      return lineReturn;
    }
  };
})();
