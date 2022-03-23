describe('The Words Widget', function () {
    beforeEach(function () {
        // runs before each test in this block
        localStorage.clear();
    });
    describe('Should analyze a sentence', function () {
        it('should add a <mark> tag to any words in the sentence over 4 characters', function () {
            let wordsInit = WordsWidget();
            wordsInit.analyzeSentence('The quick brown fox jumped over the fence', 4)

            assert.deepEqual(('The <mark>quick</mark> <mark>brown</mark> fox <mark2>jumped</mark2> over the <mark>fence</mark> '), wordsInit.returnAnalyzedSentence());
        });
        it('should wrap any words under 5 characters inside a hide div', function () {
            let wordsInit = WordsWidget();
            let check = true
            wordsInit.hideUnderFive('The quick brown fox jumped over the fence', check, 4)

            assert.deepEqual(('<div class="hideItems">The</div> <mark>quick</mark> <mark>brown</mark> <div class="hideItems">fox</div> <mark2>jumped</mark2> <div class="hideItems">over</div> <div class="hideItems">the</div> <mark>fence</mark> '), wordsInit.returnAnalyzedSentence());
        });
        it('should add a <mark2> tag to the longest words in the sentence', function () {
            let wordsInit = WordsWidget();
            wordsInit.analyzeSentence('The quick brown fox jumped over the fence', 4)

            assert.deepEqual(('The <mark>quick</mark> <mark>brown</mark> fox <mark2>jumped</mark2> over the <mark>fence</mark> '), wordsInit.returnAnalyzedSentence());
        });
        it('should return the "green" since the word count for the sentence entered is higher than average', function () {
            let wordsInit = WordsWidget();
            wordsInit.analyzeSentence('The fox was tired today', 4)
            wordsInit.analyzeSentence('He was wearing a red jacket', 4)

            assert.deepEqual(('green'), wordsInit.theDot('The quick brown fox jumped over the fence'));
        });
        it('should return "there are 5 words in this sentence" since the word count for the sentence entered is 5', function () {
            let wordsInit = WordsWidget();
            wordsInit.analyzeSentence('This is a short sentence', 4)

            assert.deepEqual(('there are 5 words in this sentence'), wordsInit.returnTheWordCount());
        });
    });
    describe('Should test the slider functionality', function () {
        it('should add a <mark> tag to any words in the sentence over 7 characters since the character limit was changed using the slider', function () {
            let wordsInit = WordsWidget();
            wordsInit.analyzeSentence('I am suspicious of anyone who sincerely enjoys grapefruit', 5)

            assert.deepEqual(('I am <mark2>suspicious</mark2> of <mark>anyone</mark> who <mark>sincerely</mark> <mark>enjoys</mark> <mark2>grapefruit</mark2> '), wordsInit.returnAnalyzedSentence());
        });
        it('should add a <mark> tag to any words in the sentence over 3 characters since the character limit was changed using the slider', function () {
            let wordsInit = WordsWidget();
            wordsInit.analyzeSentence('I am suspicious of anyone who sincerely enjoys grapefruit', 3)

            assert.deepEqual(('I am <mark2>suspicious</mark2> of <mark>anyone</mark> who <mark>sincerely</mark> <mark>enjoys</mark> <mark2>grapefruit</mark2> '), wordsInit.returnAnalyzedSentence());
        });
        it('should not add a <mark> tag to any words in the sentence since the character limit was changed to 0 using the slider', function () {
            let wordsInit = WordsWidget();
            wordsInit.analyzeSentence('I am suspicious of anyone who sincerely enjoys grapefruit', 0)

            assert.deepEqual(('I am <mark2>suspicious</mark2> of anyone who sincerely enjoys <mark2>grapefruit</mark2> '), wordsInit.returnAnalyzedSentence());
        });
    });
    describe('Should return error messages', function () {
        it('should return "no sentence found" since no sentence was entered', function () {
            let wordsInit = WordsWidget();
            wordsInit.analyzeSentence('', 4)

            assert.deepEqual(('no sentence found'), wordsInit.errorMessage());
        });
        it('should return "no sentence found" since a sentence with less than 5 words was entered', function () {
            let wordsInit = WordsWidget();
            wordsInit.analyzeSentence('Hi', 4)

            assert.deepEqual(('no sentence found'), wordsInit.errorMessage());
        });
        it('should return "this sentence was already analyzed" since a duplicate sentence was entered', function () {
            let wordsInit = WordsWidget();
            wordsInit.analyzeSentence('The quick brown fox jumped over the fence', 4)
            wordsInit.analyzeSentence('The quick brown fox jumped over the fence', 4)

            assert.deepEqual(('this sentence has already been analyzed'), wordsInit.errorMessage());
        });
    });
});
