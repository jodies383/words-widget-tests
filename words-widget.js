const WordsWidget = () => {
    let sentenceList = []
    let analyzedSentence = ""
    let theWordCount = ""
    let wordLength = []
    let error = ""

    if (localStorage['sentences']) {
        sentenceList = JSON.parse(localStorage.getItem('sentences'));

    }
    const highlightWord = (sentence, range) => {
        analyzedSentence = ""
        let lettersOnly = sentence.replace(/[^\w\s]|_/g, "")
            .replace(/\s+/g, " ");
        let splitSentence = lettersOnly.split(" ")
        let longestWord = ""
        let wordLength = 0;
        for (let i = 0; i < splitSentence.length; i++) {
            if (splitSentence[i].length > wordLength) {
                wordLength = splitSentence[i].length;
                longestWord = splitSentence[i]
            }
        }

        const highlightedWords = splitSentence.map(word => {
            let filWord = splitSentence.filter((words) => {
                return words.length == longestWord.length;
            });
            if (filWord.includes(word)) {
                return `<mark2>${word}</mark2>`
            }
            else if (!filWord.includes(word) && word.length > range && range > 0) {
                return `<mark>${word}</mark>`
            }
            return word
        })
        for (let i = 0; i < highlightedWords.length; i++) {
            analyzedSentence += highlightedWords[i] + " ";
        }
        theWordCount = `there are ${longestWord.length} words in this sentence`
    }
    const analyzeSentence = (sentence, range) => {
        let lettersOnly = sentence.replace(/[^\w\s]|_/g, "")
            .replace(/\s+/g, " ");
        let splitSentence = lettersOnly.split(" ")
        
        analyzedSentence = ""
        
        if (sentence && sentence.length >= 5) {
            sentenceList.push(sentence)
            wordLength.push(splitSentence.length)
            
            localStorage.setItem('sentences', JSON.stringify(sentenceList));
            highlightWord(sentence, range)
            error = ""
            
        }
        else {
            analyzedSentence = ""
            theWordCount = ""
            error = "no sentence found"
        }

    }
    const hideUnderFive = (sentence, check, range) => {
        analyzedSentence = ""
        let lettersOnly = sentence.replace(/[^\w\s]|_/g, "")
            .replace(/\s+/g, " ");
        let splitSentence = lettersOnly.split(" ")
        let longestWord = ""
        var wordLength = 0;
        for (var i = 0; i < splitSentence.length; i++) {
            if (splitSentence[i].length > wordLength) {
                wordLength = splitSentence[i].length;
                longestWord = splitSentence[i]
            }
        }
        if (sentence && splitSentence.length >= 5) {
            if (check == true) {
                const highlightedWords = splitSentence.map(word => {
                    let filWord = splitSentence.filter((words) => {
                        return words.length == longestWord.length;
                    });
                    if (word.length < 5) {
                        return `<div class="hideItems">${word}</div>`
                    }
                    if (filWord.includes(word)) {
                        return `<mark2>${word}</mark2>`
                    }
                    else if (!filWord.includes(word) && word.length > range && range > 0) {
                        return `<mark>${word}</mark>`
                    }
                    return word
                })
                for (let i = 0; i < highlightedWords.length; i++) {
                    analyzedSentence += highlightedWords[i] + " ";
                }
            } else {
                highlightWord(sentence, range)
            }
        }
        else {
            analyzedSentence = ""
            theWordCount = ""
            error = "no sentence found"

        }

    }
    const theDot = (sentence) => {
        let lettersOnly = sentence.replace(/[^\w\s]|_/g, "")
            .replace(/\s+/g, " ");
        let splitSentence = lettersOnly.split(" ")
        let topFive = wordLength.slice(0).slice(-5)
        let avg = topFive.reduce((a, b) => a + b, 0) / topFive.length;

        if (splitSentence.length >= avg.toFixed(2)) {
            return ("green")

        } else if ((splitSentence.length <= avg.toFixed(2))) {
            return ("orange")
        }
    }
    const returnSentenceList = () => sentenceList

    const returnAnalyzedSentence = () => analyzedSentence

    const returnTheWordCount = () => theWordCount

    const errorMessage = () => error


    return {
        highlightWord,
        analyzeSentence,
        hideUnderFive,
        theDot,
        returnSentenceList,
        returnAnalyzedSentence,
        returnTheWordCount,
        errorMessage,
    }
}
