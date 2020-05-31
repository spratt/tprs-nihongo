srs = {};
(function(){
    ////////////////////////////////////////////////////////////////////////////////
    // Reset Button: reset all localStorage
    const resetBtn = document.getElementById('reset');
    if(resetBtn) {
        resetBtn.addEventListener('click', function() {
            localStorage.clear();
        });
    }

    ////////////////////////////////////////////////////////////////////////////////
    // A minimal http framework
    function xhr(method, url) {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.withCredentials = true;
            req.addEventListener('load', () => {
                if(req.status == 200) resolve(req);
                else reject(req);
            });
            req.addEventListener('error', () => { reject(req) });
            req.addEventListener('abort', () => { reject(req) });
            req.open(method, url);
            req.send();
        });
    }

    function get(url, query) {
        if(query) {
            return xhr('GET', url + formatParams(query));
        }
        return xhr('GET', url);
    }

    ////////////////////////////////////////////////////////////////////////////////
    // Scoring

    // Initially, score is null but will be filled in by data from the yaml
    var score = null;

    function initScore(data, level) {
        score = data;
        score.Level = level;
        const start = new Date();
        start.setMinutes(0);
        start.setSeconds(0);
        start.setMilliseconds(0);
        score.Start = start;
        for (var i = 0; i < score.Sets.length; i++) {
            for (var j = 0; j < score.Sets[i].Phrases.length; j++) {
                score.Sets[i].Phrases[j].Score = 0;
                score.Sets[i].Phrases[j].Incorrect = 0;
                score.Sets[i].Phrases[j].LockedUntil = start;
            }
        }
    }

    function changeScore(id, correct) {
        let set, phrase, value;
        [set, phrase] = id;
        if (correct) {
            value = 1;
            score.Sets[set].Phrases[phrase].Incorrect = 0;
        } else {
            let incorrect = score.Sets[set].Phrases[phrase].Incorrect;
            incorrect++;
            score.Sets[set].Phrases[phrase].Incorrect = incorrect;
            value = -Math.ceil(incorrect/2);
            if (score.Sets[set].Phrases[phrase].Score > 5) {
                value -= 2;
            } else {
                value -= 1;
            }            
        }
        score.Sets[set].Phrases[phrase].Score += value;
        // Never go below 0
        if (score.Sets[set].Phrases[phrase].Score < 0) {
            score.Sets[set].Phrases[phrase].Score = 0;
        }
        // Set this phrase to be locked until a specific time
        const lockedUntil = new Date();
        const delay = 1;
        lockedUntil.setTime(score.Start.getTime() + (delay*60*60*1000));
        score.Sets[set].Phrases[phrase].LockedUntil = lockedUntil;
    }

    function stringToScore(scoreObject) {
        for (var i in scoreObject) {
            let set, phrase;
            [set, phrase] = JSON.parse(i);
            score.Sets[set].Phrases[phrase].Score = scoreObject[i].Score;
            score.Sets[set].Phrases[phrase].Incorrect = scoreObject[i].Incorrect;
            const lockedUntil = new Date();
            lockedUntil.setTime(scoreObject[i].LockedUntil);
            score.Sets[set].Phrases[phrase].LockedUntil = lockedUntil;
        }
    }

    function scoreToString() {
        var scoreObject = {};
        for (var i = 0; i < score.Sets.length; i++) {
            for (var j = 0; j < score.Sets[i].Phrases.length; j++) {
                scoreObject[JSON.stringify([i,j])] = {
                    'Score': score.Sets[i].Phrases[j].Score,
                    'Incorrect': score.Sets[i].Phrases[j].Incorrect,
                    'LockedUntil': score.Sets[i].Phrases[j].LockedUntil.getTime(),
                };
            }
        }
        return JSON.stringify(scoreObject);
    }

    function saveScore() {
        window.localStorage.setItem('score', scoreToString());
    }

    function restoreScore(data, level) {
        initScore(data, level);
        var scoreObject = window.localStorage.getItem('score');
        if (scoreObject) {
            stringToScore(JSON.parse(scoreObject));
        } else {
            saveScore();
        }
    }

    srs.getScore = function() {
        return score;
    }

    srs.displayScore = function(levelSpan, apprenticeList, guruList, masterList, enlightenedList, burnedList) {
        levelSpan.innerHTML = score.Level;
        const thresholds = {
            'guru': 4,
            'master': 6,
            'enlightened': 7,
            'burned': 8,
        }
        for (var i = 0; i <= score.Level && i < score.Sets.length; i++) {
            const set = score.Sets[i];
            for (var j = 0; j < set.Phrases.length; j++) {
                const phrase = set.Phrases[j];
                const li = document.createElement('li');
                li.innerHTML = `${phrase.Value}: ${phrase.Score}`;
                if (phrase.Score < thresholds['guru']) {
                    apprenticeList.appendChild(li);
                } else if (phrase.Score < thresholds['master']) {
                    guruList.appendChild(li);
                } else if (phrase.Score < thresholds['enlightened']) {
                    masterList.appendChild(li);
                } else if (phrase.Score < thresholds['burned']) {
                    enlightenedList.appendChild(li);
                } else {
                    burnedList.appendChild(li);
                }
            }
        }
    }

    srs.levelUp = function() {
        score.Level++;
        window.localStorage.setItem('level', score.Level.toString());
    }

    ////////////////////////////////////////////////////////////////////////////////
    // Generate Questions
    function randomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    
    function randomChoice(arr) {
        return arr[randomInt(arr.length)];
    }

    function randomChoices(arr, n) {
        if (arr.length < n) {
            return arr;
        }
        const options = arr.slice();
        const choices = [];
        while (choices.length < n) {
            let i = randomInt(options.length);
            choices.push(options[i]);
            options.splice(i, 1);
        }
        return choices;
    }

    function shuffle(arr) {
        return randomChoices(arr, arr.length);
    }
    
    function askForPhrase(phrase, phrases) {
        let allPhrases = phrases.
            map((phrase) => phrase.Value).
            filter((value) => value !== phrase.Value);
        return {
            "Prompt": phrase.Meaning,
            "Answer": phrase.Value,
            "Options": randomChoices(allPhrases, 3),
        };
    }

    function askForMeaning(phrase, phrases) {
        let allMeanings = phrases.
            map((phrase) => phrase.Meaning).
            filter((meaning) => meaning != phrase.Meaning);
        return {
            "Prompt": phrase.Value,
            "Answer": phrase.Meaning,
            "Options": randomChoices(allMeanings, 3),
        };
    }

    function askForPronunciation(phrase, phrases) {
        let allPhrases = phrases.
            map((phrase) => phrase.Value).
            filter((value) => value !== phrase.Value);
        let options = randomChoices(allPhrases, 3).
            map((value) => wanakana.toRomaji(value));
        return {
            "Prompt": phrase.Value,
            "Answer": wanakana.toRomaji(phrase.Value),
            "Options": options,
        };
    }

    const askers = [
        askForPhrase,
        askForMeaning,
        askForPronunciation,
    ];

    function generateQuestion(phrase, phrases) {
        let question = randomChoice(askers)(phrase, phrases);
        question.id = phrase.id;
        return question;
    }

    function ask(question) {
        const promptElmt = document.getElementById('prompt');
        const optionBtns = document.getElementsByClassName('option');
        let options = question.Options.slice();
        options.push(question.Answer);

        // Validate input
        if (!promptElmt || optionBtns.length !== options.length) return;

        // Set the prompt
        promptElmt.innerHTML = question.Prompt;

        // Build the onclick function
        function onclick(evt) {
            if (evt.target.innerHTML !== question.Answer) {
                evt.target.className += ' incorrect';
                changeScore(question.id, false);
            } else {
                changeScore(question.id, true);
            }
            saveScore();
            for (var i in options) {
                let optionBtn = optionBtns[i];
                optionBtn.removeEventListener('click', onclick);
                if (optionBtn.innerHTML === question.Answer) {
                    optionBtn.className += ' correct';
                    optionBtn.addEventListener('click', srs.nextQuestion);
                } else {
                    optionBtn.disabled = true;
                }
            }
        }

        // Build the options
        options = shuffle(options);
        for (var i in options) {
            let option = options[i];
            let optionBtn = optionBtns[i];
            optionBtn.disabled = false;
            optionBtn.className = 'option';
            optionBtn.innerHTML = option;
            optionBtn.removeEventListener('click', srs.nextQuestion);
            optionBtn.addEventListener('click', onclick);
        }
    }

    function dataToPhrases(data, level) {
        var phrases = [];
        for (var i in data.Sets) {
            if (i > level) break;
            for (var j in data.Sets[i].Phrases) {
                const phrase = data.Sets[i].Phrases[j];
                phrase.id = [i,j];
                phrases.push(phrase);
            }
        }
        return phrases;
    }

    function askRandomPhrase(phrasesLeft, allPhrases) {
        let phrase = randomChoice(phrasesLeft);
        ask(generateQuestion(phrase, allPhrases));
        return phrase;
    }

    function done() {
        const promptElmt = document.getElementById('prompt');
        const optionBtns = document.getElementsByClassName('option');
        promptElmt.innerHTML = "Great job!  You're done (for now).";
        [...optionBtns].forEach((btn) => {
            btn.className += ' hidden';
        });
    }
    
    function start(data) {
        var level = window.localStorage.getItem('level');
        if (level) {
            level = parseInt(level, 10);
        } else {
            level = 0;
            window.localStorage.setItem('level', level.toString());
        }
        restoreScore(data, level);

        // Ready the phrases
        const allPhrases = dataToPhrases(score, level);
        var phrases = allPhrases.filter((p) => p.LockedUntil <= score.Start);
        srs.nextQuestion = function() {
            if (phrases.length === 0) {
                done();
                return;
            }
            let phrase = askRandomPhrase(phrases, allPhrases);
            phrases = phrases.filter((p) => p !== phrase);
        }
    }
    srs.start = start;

    ////////////////////////////////////////////////////////////////////////////////
    // Load the question data
    srs.load = function() {
        console.log('srs.js loaded');
        return get('data.yaml').then((req) => {
            start(jsyaml.load(req.response));
        }).catch((x) => { console.error(x); });
    };
}());
