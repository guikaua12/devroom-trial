// Write a program that takes a string as input and outputs the most common word in the string. If there are multiple words with the same frequency, the program should output all of them. Use JavaScript to write the program.

function getMostCommonWords(string) {
    const words = string.trim().split(" ");

    if(words.length < 1 || words.some(v => v === "")) return "";

    const newArray = [];

    for (let word of words) {
        if(!newArray[word]) {
            newArray[word] = 1;
        }else {
            newArray[word] += 1;
        }
    }

    let maxValue = {
        key: '',
        value: -1
    }
    for (let [key, value] of Object.entries(newArray)) {
        if(value > maxValue.value) {
            maxValue.key = key;
            maxValue.value = value;
        }
    }

    const newWords = Object.entries(newArray).filter(([_, value]) => value === maxValue.value).map(([key]) => key);

    console.log(newWords.join(", "));
}

getMostCommonWords("mouse mouse mouse pizza pizza cobblestone keyboard keyboard");
getMostCommonWords("pizza mouse keyboard");