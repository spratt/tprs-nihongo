(function(){
    console.log('main.js loaded');

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
    
    function askForPhrase(phrase, data) {
        let allPhrases = data.Phrases.
            map((phrase) => phrase.Value).
            filter((value) => value !== phrase.Value);
        return {
            "Prompt": phrase.Meaning,
            "Answer": phrase.Value,
            "Options": randomChoices(allPhrases, 3),
        };
    }

    function askForMeaning(phrase, data) {
        let allMeanings = data.Phrases.
            map((phrase) => phrase.Meaning).
            filter((meaning) => meaning != phrase.Meaning);
        return {
            "Prompt": phrase.Value,
            "Answer": phrase.Meaning,
            "Options": randomChoices(allMeanings, 3),
        };
    }

    function askForPronunciation(phrase, data) {
        let allPhrases = data.Phrases.
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

    function generateQuestion(phrase, data) {
        return randomChoice(askers)(phrase, data);
    }

    function ask(question, data) {
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
            }
            for (var i in options) {
                let optionBtn = optionBtns[i];
                optionBtn.removeEventListener('click', onclick);
                if (optionBtn.innerHTML === question.Answer) {
                    optionBtn.className += ' correct';
                    optionBtn.addEventListener('click', nextQuestion);
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
            optionBtn.removeEventListener('click', nextQuestion);
            optionBtn.addEventListener('click', onclick);
        }
    }

    function hiragana(data) {
        const seen = {};
        data.Phrases.forEach((phrase) => {
            phrase.Value.split('').forEach((ch) => seen[ch] = true);
        });
        return Object.keys(seen);
    }

    function askRandomQuestion(data) {
        ask(generateQuestion(randomChoice(data.Phrases), data), data);
    }

    var nextQuestion = function() {}
    
    function start(data) {
        askRandomQuestion(data);

        nextQuestion = function() {
            askRandomQuestion(data);
        }
    }

    ////////////////////////////////////////////////////////////////////////////////
    // Load the question data
    get('data.yaml').then((req) => {
        start(jsyaml.load(req.response));
    }).catch((x) => { console.error(x); });
}());
