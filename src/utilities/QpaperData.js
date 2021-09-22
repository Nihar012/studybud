import { stopwordRemover, stemmer } from './pre-processing';


export const createQpaperData = (text, patternType) => {

    const qpaperFixes = {
        moduleFixes: {
            prefixes: ['module-1', 'module -1', 'module- 1', 'module - 1', 'module 1', 'module1',
                'section-1', 'section -1', 'section- 1', 'section - 1', 'section 1', 'section1',
                'part-a', 'part -a', 'part- a', 'part - a', 'part a', 'parta',
                'module-2', 'module -2', 'module- 2', 'module - 2', 'module 2', 'module2',
                'section-2', 'section -2', 'section- 2', 'section - 2', 'section 2', 'section2',
                'part-b', 'part -b', 'part- b', 'part - b', 'part b', 'partb',
                'module-3', 'module -3', 'module- 3', 'module - 3', 'module 3', 'module3',
                'section-3', 'section -3', 'section- 3', 'section - 3', 'section 3', 'section3',
                'part-c', 'part -c', 'part- c', 'part - c', 'part c', 'partc',
                'module-4', 'module -4', 'module- 4', 'module - 4', 'module 4', 'module4',
                'section-4', 'section -4', 'section- 4', 'section - 4', 'section 4', 'section4',
            ],
            fix: '@MODULE@'
        },
        mainBulletFixes: {
            prefixes: [/[\n+][1][.][ ]/g, /[\n+][2][.][ ]/g, /[\n+][3][.][ ]/g, /[\n+][4][.][ ]/g, /[\n+][5][.][ ]/g, /[\n+][6][.][ ]/g, /[\n+][7][.][ ]/g, /[\n+][8][.][ ]/g],
            fix: '@MAINBULLET@ '
        },
        subBulletFixes: {
            prefixes: [/[ |\n+][a][)][ ]/g, /[ |\n+][b][)][ ]/g, /[ |\n+][c][)][ ]/g, /[ |\n+][d][)][ ]/g, /[ |\n+][e][)][ ]/g, /[ |\n+][f][)][ ]/g, /[ |\n+][g][)][ ]/g, /[ |\n+][h][)][ ]/g],
            fix: '@SUBBULLET@'
        },
        symbolFixes: {
            space: {
                prefixes: [/[-~:;&)(]/g, / -/g, /- /g, / - /g, / ~/g, /~ /g, / ~ /g, / ,/g, /, /g, / , /g, /\n+/g, /\.$/g],
                fix: ' '
            }
        },
        type1KeyNames: ['module1', 'module2', 'module3', 'module4'],
        type2KeyNames: ['partA', 'partB', 'partC']
    }
    let allQuestions = [];
    const allWords = [];
    const allStemmedWords = [];
    const finalQpaperData = [];

    let editedText = text;

    for (let prefix of qpaperFixes.moduleFixes.prefixes) {                   //-- fixing modules
        editedText = editedText.replace(prefix, qpaperFixes.moduleFixes.fix);
    }

    for (let prefix of qpaperFixes.mainBulletFixes.prefixes) {               //-- fixing mainBullets
        editedText = editedText.replace(prefix, qpaperFixes.mainBulletFixes.fix);
    }

    for (let prefix of qpaperFixes.subBulletFixes.prefixes) {                //-- fixing subBullets
        editedText = editedText.replace(prefix, qpaperFixes.subBulletFixes.fix);
    }

    let splitText = editedText.split(qpaperFixes.moduleFixes.fix);         //-- splitting modules
    splitText = splitText.filter(text => text !== '');

    for (let key in splitText) {                                            //-- splitting mainBullets
        splitText[key] = splitText[key].split(qpaperFixes.mainBulletFixes.fix.trim());
        splitText[key] = splitText[key].filter(text => text !== '');
    }

    for (let key in splitText) {
        for (let innerKey in splitText[key]) {                            //-- splitting subBullets
            splitText[key][innerKey] = splitText[key][innerKey].split(qpaperFixes.subBulletFixes.fix);
            splitText[key][innerKey] = splitText[key][innerKey].filter(text => text !== '');
        }
    }

    for (let key in splitText) {                                        //-- concatinating questions
        splitText[key] = splitText[key].reduce((initialValue, el) => {
            return initialValue.concat(el);
        }, []);
    }
    allQuestions = [...splitText];


    for (let module in allQuestions) {                             //-- creating words, removing stopwords, stemming
        let wordModule = [...allQuestions[module]];
        let stemmedModule = [...allQuestions[module]];
        for (let question in wordModule) {
            wordModule[question] = wordModule[question].split('. ').join(' ');
            wordModule[question] = wordModule[question].split(' .').join(' ');

            stemmedModule[question] = stemmedModule[question].split('. ').join(' ');
            stemmedModule[question] = stemmedModule[question].split(' .').join(' ');
            for (let prefix of qpaperFixes.symbolFixes.space.prefixes) {
                wordModule[question] = wordModule[question].replace(prefix, qpaperFixes.symbolFixes.space.fix);

                stemmedModule[question] = stemmedModule[question].replace(prefix, qpaperFixes.symbolFixes.space.fix);
            }
            let words = stopwordRemover(wordModule[question]).filter(text => text !== '');
            wordModule[question] = [...words];

            let stemmedWords = stemmer(stemmedModule[question]).filter(text => text !== '');
            stemmedModule[question] = [...stemmedWords];
        }
        allWords.push(wordModule);
        allStemmedWords.push(stemmedModule);
    }


    if (patternType === 'pattern1') {
        for (let key in qpaperFixes.type1KeyNames) {
            finalQpaperData.push({
                [qpaperFixes.type1KeyNames[key]]: {
                    questions: allQuestions[key],
                    words: allWords[key],
                    stemmedWords: allStemmedWords[key]
                }
            });
        }
    } else if (patternType === 'pattern2') {
        for (let key in qpaperFixes.type2KeyNames) {
            finalQpaperData.push({
                [qpaperFixes.type2KeyNames[key]]: {
                    questions: allQuestions[key],
                    words: allWords[key],
                    stemmedWords: allStemmedWords[key]
                }
            });
        }
    }


    return finalQpaperData;
}

export const validateQpaperData = (qpaperData, patternType) => {
    let validity = {
        isValid: false,
        errorMessage: ''
    };

    if (patternType === 'pattern1') {
        if (qpaperData.length == 4) {
            if (qpaperData[0].module1.questions && qpaperData[0].module1.questions.length > 0) {
                if (qpaperData[0].module1.words && qpaperData[0].module1.words.length > 0) {
                    if (qpaperData[0].module1.stemmedWords && qpaperData[0].module1.stemmedWords.length > 0) {
                        if (qpaperData[1].module2.questions && qpaperData[1].module2.questions.length > 0) {
                            if (qpaperData[1].module2.words && qpaperData[1].module2.words.length > 0) {
                                if (qpaperData[1].module2.stemmedWords && qpaperData[1].module2.stemmedWords.length > 0) {
                                    if (qpaperData[2].module3.questions && qpaperData[2].module3.questions.length > 0) {
                                        if (qpaperData[2].module3.words && qpaperData[2].module3.words.length > 0) {
                                            if (qpaperData[2].module3.stemmedWords && qpaperData[2].module3.stemmedWords.length > 0) {
                                                if (qpaperData[3].module4.questions && qpaperData[3].module4.questions.length > 0) {
                                                    if (qpaperData[3].module4.words && qpaperData[3].module4.words.length > 0) {
                                                        if (qpaperData[3].module4.stemmedWords && qpaperData[3].module4.stemmedWords.length > 0) {
                                                            validity.isValid = true;
                                                        } else {
                                                            validity.isValid = false;
                                                            validity.errorMessage = 'Module 4 stemmed words incorrect';
                                                        }
                                                    } else {
                                                        validity.isValid = false;
                                                        validity.errorMessage = 'Module 4 words incorrect';
                                                    }
                                                } else {
                                                    validity.isValid = false;
                                                    validity.errorMessage = 'Module 4 questions incorrect';
                                                }
                                            } else {
                                                validity.isValid = false;
                                                validity.errorMessage = 'Module 3 stemmed words incorrect';
                                            }
                                        } else {
                                            validity.isValid = false;
                                            validity.errorMessage = 'Module 3 words incorrect';
                                        }
                                    } else {
                                        validity.isValid = false;
                                        validity.errorMessage = 'Module 3 questions incorrect';
                                    }
                                } else {
                                    validity.isValid = false;
                                    validity.errorMessage = 'Module 2 stemmed words incorrect';
                                }
                            } else {
                                validity.isValid = false;
                                validity.errorMessage = 'Module 2 words incorrect';
                            }
                        } else {
                            validity.isValid = false;
                            validity.errorMessage = 'Module 2 questions incorrect';
                        }
                    } else {
                        validity.isValid = false;
                        validity.errorMessage = 'Module 1 stemmed words incorrect';
                    }
                } else {
                    validity.isValid = false;
                    validity.errorMessage = 'Module 1 words incorrect';
                }
            } else {
                validity.isValid = false;
                validity.errorMessage = 'Module 1 questions incorrect';
            }
        } else {
            validity.isValid = false;
            validity.errorMessage = 'Incorrect no. of sections';
        }
    } else if (patternType === 'pattern2') {
        if (qpaperData.length == 3) {
            if (qpaperData[0].partA.questions && qpaperData[0].partA.questions.length > 0) {
                if (qpaperData[0].partA.words && qpaperData[0].partA.words.length > 0) {
                    if (qpaperData[0].partA.stemmedWords && qpaperData[0].partA.stemmedWords.length > 0) {
                        if (qpaperData[1].partB.questions && qpaperData[1].partB.questions.length > 0) {
                            if (qpaperData[1].partB.words && qpaperData[1].partB.words.length > 0) {
                                if (qpaperData[1].partB.stemmedWords && qpaperData[1].partB.stemmedWords.length > 0) {
                                    if (qpaperData[2].partC.questions && qpaperData[2].partC.questions.length > 0) {
                                        if (qpaperData[2].partC.words && qpaperData[2].partC.words.length > 0) {
                                            if (qpaperData[2].partC.stemmedWords && qpaperData[2].partC.stemmedWords.length > 0) {
                                                validity.isValid = true;
                                            } else {
                                                validity.isValid = false;
                                                validity.errorMessage = 'Part C stemmed words incorrect';
                                            }
                                        } else {
                                            validity.isValid = false;
                                            validity.errorMessage = 'Part C words incorrect';
                                        }
                                    } else {
                                        validity.isValid = false;
                                        validity.errorMessage = 'Part C questions incorrect';
                                    }
                                } else {
                                    validity.isValid = false;
                                    validity.errorMessage = 'Part B stemmed words incorrect';
                                }
                            } else {
                                validity.isValid = false;
                                validity.errorMessage = 'Part B words incorrect';
                            }
                        } else {
                            validity.isValid = false;
                            validity.errorMessage = 'Part B questions incorrect';
                        }
                    } else {
                        validity.isValid = false;
                        validity.errorMessage = 'Part A stemmed words incorrect';
                    }
                } else {
                    validity.isValid = false;
                    validity.errorMessage = 'Part A words incorrect';
                }
            } else {
                validity.isValid = false;
                validity.errorMessage = 'Part A questions incorrect';
            }
        } else {
            validity.isValid = false;
            validity.errorMessage = 'Incorrect no. of sections';
        }
    }


    return validity;
}