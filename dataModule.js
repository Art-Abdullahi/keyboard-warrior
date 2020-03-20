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
  word.prototype.update = function(value) {};
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
    startTest: function() {}, //starts the test
    endTest: function() {}, //ends the test
    reduceTime: function() {}, //reduces the time by one second
    timeLeft: function() {}, //checks if there is time left,
    testEnded: function() {
      return appData.indicators.testEnded;
    },
    testStarted: function() {},
    //results
    calculateWpm: function() {},
    calculateCpm: function() {},
    calculateAccuracy: function() {},
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
        //update number of correct characters
        //upadate number of test characters
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
