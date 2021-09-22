import React, { Component } from 'react';
import classes from './UploadSyllabus.css';
import Button from '../../UI/Button/Button';
import Tesseract from 'tesseract.js';
import { stopwordRemover, stemmer } from '../../../utilities/pre-processing';

class UploadSyllabus extends Component {

    state = {
        uploads: [],
        text: '',
        syllabus: {
            abbrevation: 'NOV/DEC',
            year: '2019',
            extraDetail: 'RC 2016-17',
            data: [
                {
                    unit1: {
                        topics: ["introduction to data communication", "components of data communication", "networks", "protocols", "standards", "network models", "layered task", "the osi reference model", "tcp/ip protocol suite", "addressing basic concepts of data communication", "line conﬁguration", "point to—point", "multipoint", "topology", "mesh", "star", "tree", "bus", "ring", "hybrid technologies", "transmission modes", "simplex", "half duplex", "full duplex", "categories of networks", "lan", "man", "wan", "inter networks", "transmission media", "guided media", "twisted pair cable", "coaxial cable", "optical ﬁbre", "unguided media", "wireless communication", "terrestrial microwave", "satellite communication", "cellular telephony", "transmission impairments", "shannon's theorem", "comparison of different media", "distortion", "attenuation", "noise"],
                        words: [["introduction", "data", "communication"], ["components", "data", "communication"], ["networks"], ["protocols"], ["standards"], ["network", "models"], ["layered", "task"], ["osi", "reference", "model"], ["tcp/ip", "protocol", "suite"], ["addressing", "basic", "concepts", "data", "communication"], ["line", "conﬁguration"], ["point", "to—point"], ["multipoint"], ["topology"], ["mesh"], ["star"], ["tree"], ["bus"], ["ring"], ["hybrid", "technologies"], ["transmission", "modes"], ["simplex"], ["half", "duplex"], ["full", "duplex"], ["categories", "networks"], ["lan"], ["man"], ["wan"], ["inter", "networks"], ["transmission", "media"], ["guided", "media"], ["twisted", "pair", "cable"], ["coaxial", "cable"], ["optical", "ﬁbre"], ["unguided", "media"], ["wireless", "communication"], ["terrestrial", "microwave"], ["satellite", "communication"], ["cellular", "telephony"], ["transmission", "impairments"], ["shannon's", "theorem"], ["comparison", "different", "media"], ["distortion"], ["attenuation"], ["noise"]],
                        stemmedWords: [["introduct", "data", "commun"], ["compon", "data", "commun"], ["network"], ["protocol"], ["standard"], ["network", "model"], ["layer", "task"], ["osi", "refer", "model"], ["tcp/ip", "protocol", "suit"], ["address", "basic", "concept", "data", "commun"], ["line", "conﬁgur"], ["point", "to—point"], ["multipoint"], ["topolog"], ["mesh"], ["star"], ["tree"], ["bu"], ["ring"], ["hybrid", "technolog"], ["transmiss", "mode"], ["simplex"], ["half", "duplex"], ["full", "duplex"], ["categori", "network"], ["lan"], ["man"], ["wan"], ["inter", "network"], ["transmiss", "media"], ["guid", "media"], ["twist", "pair", "cabl"], ["coaxial", "cabl"], ["optic", "ﬁbre"], ["unguid", "media"], ["wireless", "commun"], ["terrestri", "microwav"], ["satellit", "commun"], ["cellular", "telephoni"], ["transmiss", "impair"], ["shannon'", "theorem"], ["comparison", "differ", "media"], ["distort"], ["attenu"], ["nois"]]
                    }
                },
                {
                    unit2: {
                        topics: ["data encoding", "analog data", "digital data", "analog signal", "digital signals", "spread spectrum", "direct sequence", "frequency hopping", "cdma", "data communication interface", "the physical layer", "asynchronous", "synchronous transmission", "interfacing", "v.24/eia 232 f", "isdn physical interface"],
                        words: [["data", "encoding"], ["analog", "data"], ["digital", "data"], ["analog", "signal"], ["digital", "signals"], ["spread", "spectrum"], ["direct", "sequence"], ["frequency", "hopping"], ["cdma"], ["data", "communication", "interface"], ["physical", "layer"], ["asynchronous"], ["synchronous", "transmission"], ["interfacing"], ["v.24/eia", "232", "f"], ["isdn", "physical", "interface"]],
                        stemmedWords: [["data", "encod"], ["analog", "data"], ["digit", "data"], ["analog", "signal"], ["digit", "signal"], ["spread", "spectrum"], ["direct", "sequenc"], ["frequenc", "hop"], ["cdma"], ["data", "commun", "interfac"], ["physic", "layer"], ["asynchron"], ["synchron", "transmiss"], ["interfac"], ["v.24/eia", "232", "f"], ["isdn", "physic", "interfac"]]
                    }
                },
                {
                    unit3: {
                        topics: ["data link layer", "flow control", "stop", "wait flow control", "sliding window", "error detection", "types of errors", "detection methods", "parity check", "cyclic redundancy check using modulo 2", "polynomials", "crc 16", "crc 32", "error control", "stop", "wait arq go back n arq", "selective<reject arq", "data link protocols", "asynchronous protocols", "synchronous protocols", "character oriented protocols", "bsc", "bit oriented protocols", "hdlc", "conﬁguration", "types of frames", "modes of communication", "operation", "packet switching", "message switching", "circuit switching"],
                        words: [["data", "link", "layer"], ["flow", "control"], ["stop"], ["wait", "flow", "control"], ["sliding", "window"], ["error", "detection"], ["types", "errors"], ["detection", "methods"], ["parity", "check"], ["cyclic", "redundancy", "check", "using", "modulo", "2"], ["polynomials"], ["crc", "16"], ["crc", "32"], ["error", "control"], ["stop"], ["wait", "arq", "go", "back", "n", "arq"], ["selective<reject", "arq"], ["data", "link", "protocols"], ["asynchronous", "protocols"], ["synchronous", "protocols"], ["character", "oriented", "protocols"], ["bsc"], ["bit", "oriented", "protocols"], ["hdlc"], ["conﬁguration"], ["types", "frames"], ["modes", "communication"], ["operation"], ["packet", "switching"], ["message", "switching"], ["circuit", "switching"]],
                        stemmedWords: [["data", "link", "layer"], ["flow", "control"], ["stop"], ["wait", "flow", "control"], ["slide", "window"], ["error", "detect"], ["type", "error"], ["detect", "method"], ["pariti", "check"], ["cyclic", "redund", "check", "us", "modulo", "2"], ["polynomi"], ["crc", "16"], ["crc", "32"], ["error", "control"], ["stop"], ["wait", "arq", "go", "back", "n", "arq"], ["selective<reject", "arq"], ["data", "link", "protocol"], ["asynchron", "protocol"], ["synchron", "protocol"], ["charact", "orient", "protocol"], ["bsc"], ["bit", "orient", "protocol"], ["hdlc"], ["conﬁgur"], ["type", "frame"], ["mode", "commun"], ["oper"], ["packet", "switch"], ["messag", "switch"], ["circuit", "switch"]]
                    }
                },
                {
                    unit4: {
                        topics: ["local area networks", "topologies", "bus", "ring star", "tree", "transmission media", "lan protocol architecture", "llc", "logical link control", "medium access control", "mac", "introduction to networking", "internetworking devices", "repeaters", "routers", "gateways", "bridges", "functions", "protocol architecture", "spanning tree approach", "wireless wan's", "cellular telephony", "satellite networks", "high speed lans", "emergence", "ethernet", "token ring", "fiber channel"],
                        words: [["local", "area", "networks"], ["topologies"], ["bus"], ["ring", "star"], ["tree"], ["transmission", "media"], ["lan", "protocol", "architecture"], ["llc"], ["logical", "link", "control"], ["medium", "access", "control"], ["mac"], ["introduction", "networking"], ["internetworking", "devices"], ["repeaters"], ["routers"], ["gateways"], ["bridges"], ["functions"], ["protocol", "architecture"], ["spanning", "tree", "approach"], ["wireless", "wan's"], ["cellular", "telephony"], ["satellite", "networks"], ["high", "speed", "lans"], ["emergence"], ["ethernet"], ["token", "ring"], ["fiber", "channel"]],
                        stemmedWords: [["local", "area", "network"], ["topolog"], ["bu"], ["ring", "star"], ["tree"], ["transmiss", "media"], ["lan", "protocol", "architectur"], ["llc"], ["logic", "link", "control"], ["medium", "access", "control"], ["mac"], ["introduct", "network"], ["internetwork", "devic"], ["repeat"], ["router"], ["gatewai"], ["bridg"], ["function"], ["protocol", "architectur"], ["span", "tree", "approach"], ["wireless", "wan'"], ["cellular", "telephoni"], ["satellit", "network"], ["high", "speed", "lan"], ["emerg"], ["ethernet"], ["token", "ring"], ["fiber", "channel"]]
                    }
                }
            ]
        },
        qpapers: [{
            id: 'one',
            patternType: 'pattern1',
            data: [
                {
                    module1: {
                        questions: ["what are the fundamental characteristics that determine the effectiveness of data communication system",
                            "what is a topology ? explain star and tree topology. list their advantages and disadvantages"],
                        words: [["fundamental", "characteristics", "determine", "effectiveness", "data", "communication", "system"],
                        ["topology", "?", "explain", "star", "tree", "topology", "list", "advantages", "disadvantages"]],
                        stemmedWords: [["fundament", "characterist", "determin", "effect", "data", "commun", "system"],
                        ["topolog", "?", "explain", "star", "tree", "topolog", "list", "advantag", "disadvantag"]]
                    }
                },
                {
                    module2: {
                        questions: ["list the steps that take an analog signal to a pcm digital code.",
                            "draw a neat diagram of the lsdn physical interface and explain its electrical specifications."],
                        words: [["list", "steps", "take", "analog", "signal", "pcm", "digital", "code"],
                        ["draw", "neat", "diagram", "lsdn", "physical", "interface", "explain", "electrical", "specifications"]],
                        stemmedWords: [["list", "step", "take", "analog", "signal", "pcm", "digit", "code"],
                        ["draw", "neat", "diagram", "lsdn", "physic", "interfac", "explain", "electr", "specif"]]
                    }
                },
                {
                    module3: {
                        questions: ["how are synchronous protocols classified ? explain the process of multi-block and multi-frame transmission.",
                            "with the help of a diagram explain the select/response mechanism in hdlc."],
                        words: [["synchronous", "protocols", "classified", "?", "explain", "process", "multi", "block", "multi", "frame", "transmission"],
                        ["help", "diagram", "explain", "select/response", "mechanism", "hdlc"]],
                        stemmedWords: [["synchron", "protocol", "classifi", "?", "explain", "process", "multi", "block", "multi", "frame", "transmiss"],
                        ["help", "diagram", "explain", "select/respons", "mechan", "hdlc"]]
                    }
                },
                {
                    module4: {
                        questions: ["application of wireless of lans",
                            "spanning tree approach"],
                        words: [["application", "wireless", "lans"],
                        ["spanning", "tree", "approach"]],
                        stemmedWords: [["applic", "wireless", "lan"],
                        ["span", "tree", "approach"]]
                    }
                }
            ]
        },
        {
            id: 'two',
            patternType: 'pattern1',
            data: [
                {
                    module1: {
                        questions: ["what are the fundamental characteristics that determine the effectiveness of data communication system",
                            "what is a topology ? explain star and tree topology. list their advantages and disadvantages"],
                        words: [["fundamental", "characteristics", "determine", "effectiveness", "data", "communication", "system"],
                        ["topology", "?", "explain", "star", "tree", "topology", "list", "advantages", "disadvantages"]],
                        stemmedWords: [["fundament", "characterist", "determin", "effect", "data", "commun", "system"],
                        ["topolog", "?", "explain", "star", "tree", "topolog", "list", "advantag", "disadvantag"]]
                    }
                },
                {
                    module2: {
                        questions: ["list the steps that take an analog signal to a pcm digital code.",
                            "draw a neat diagram of the lsdn physical interface and explain its electrical specifications."],
                        words: [["list", "steps", "take", "analog", "signal", "pcm", "digital", "code"],
                        ["draw", "neat", "diagram", "lsdn", "physical", "interface", "explain", "electrical", "specifications"]],
                        stemmedWords: [["list", "step", "take", "analog", "signal", "pcm", "digit", "code"],
                        ["draw", "neat", "diagram", "lsdn", "physic", "interfac", "explain", "electr", "specif"]]
                    }
                },
                {
                    module3: {
                        questions: ["how are synchronous protocols classified ? explain the process of multi-block and multi-frame transmission.",
                            "with the help of a diagram explain the select/response mechanism in hdlc."],
                        words: [["synchronous", "protocols", "classified", "?", "explain", "process", "multi", "block", "multi", "frame", "transmission"],
                        ["help", "diagram", "explain", "select/response", "mechanism", "hdlc"]],
                        stemmedWords: [["synchron", "protocol", "classifi", "?", "explain", "process", "multi", "block", "multi", "frame", "transmiss"],
                        ["help", "diagram", "explain", "select/respons", "mechan", "hdlc"]]
                    }
                },
                {
                    module4: {
                        questions: ["application of wireless of lans",
                            "spanning tree approach"],
                        words: [["application", "wireless", "lans"],
                        ["spanning", "tree", "approach"]],
                        stemmedWords: [["applic", "wireless", "lan"],
                        ["span", "tree", "approach"]]
                    }
                }
            ]
        },
        {
            id: 'three',
            patternType: 'pattern2',
            data: [
                {
                    partA: {
                        questions: ["what are the fundamental characteristics that determine the effectiveness of data communication system",
                            "what is a topology ? explain star and tree topology. list their advantages and disadvantages",
                            "list the steps that take an analog signal to a pcm digital code.",
                            "draw a neat diagram of the lsdn physical interface and explain its electrical specifications."],
                        words: [["fundamental", "characteristics", "determine", "effectiveness", "data", "communication", "system"],
                        ["topology", "?", "explain", "star", "tree", "topology", "list", "advantages", "disadvantages"],
                        ["list", "steps", "take", "analog", "signal", "pcm", "digital", "code"],
                        ["draw", "neat", "diagram", "lsdn", "physical", "interface", "explain", "electrical", "specifications"]],
                        stemmedWords: [["fundament", "characterist", "determin", "effect", "data", "commun", "system"],
                        ["topolog", "?", "explain", "star", "tree", "topolog", "list", "advantag", "disadvantag"],
                        ["list", "step", "take", "analog", "signal", "pcm", "digit", "code"],
                        ["draw", "neat", "diagram", "lsdn", "physic", "interfac", "explain", "electr", "specif"]]
                    }
                },
                {
                    partB: {
                        questions: ["how are synchronous protocols classified ? explain the process of multi-block and multi-frame transmission.",
                            "with the help of a diagram explain the select/response mechanism in hdlc.",
                            "application of wireless of lans",
                            "spanning tree approach"],
                        words: [["synchronous", "protocols", "classified", "?", "explain", "process", "multi", "block", "multi", "frame", "transmission"],
                        ["help", "diagram", "explain", "select/response", "mechanism", "hdlc"],
                        ["application", "wireless", "lans"],
                        ["spanning", "tree", "approach"]],
                        stemmedWords: [["synchron", "protocol", "classifi", "?", "explain", "process", "multi", "block", "multi", "frame", "transmiss"],
                        ["help", "diagram", "explain", "select/respons", "mechan", "hdlc"],
                        ["applic", "wireless", "lan"],
                        ["span", "tree", "approach"]]
                    }
                },
                {
                    partC: {
                        questions: ["why are standards needed ?",
                            "briefly explain the working of cdma with an example.↵"],
                        words: [["standards", "needed", "?"],
                        ["briefly", "explain", "working", "cdma", "example."]],
                        stemmedWords: [["standard", "need", "?"],
                        ["briefli", "explain", "work", "cdma", "example."]]
                    }
                }
            ]
        }
        ]
    }

    loadData = async () => {
        const result = await Tesseract.recognize(
            this.state.uploads[0],
            'eng'
        );
        this.setState({ text: result.text });
    }

    handleChange = (event) => {
        const uploads = [];
        let upload = event.target.files[0]
        uploads.push(URL.createObjectURL(upload))

        this.setState({
            uploads: uploads
        })
        // this.loadData();        
    }

    cancelUploadHandler = () => {
        this.loadData();
    }

    createSyllabusData = () => {

        const syllabusFixes = {
            unitFixes: {
                prefixes: ['unit-1', 'unit -1', 'unit- 1', 'unit - 1', 'unit 1', 'unit1',
                    'unit-2', 'unit -2', 'unit- 2', 'unit - 2', 'unit 2', 'unit2',
                    'unit-3', 'unit -3', 'unit- 3', 'unit - 3', 'unit 3', 'unit3',
                    'unit-4', 'unit -4', 'unit- 4', 'unit - 4', 'unit 4', 'unit4'
                ],
                fix: '@UNIT@',
            },
            symbolFixes: {
                comma: {
                    prefixes: [/[:;&)(]/g, / -/g, /- /g, / - /g, / ~/g, /~ /g, / ~ /g, / ,/g, /, /g, / , /g, /\.$/g],
                    fix: ','
                },
                space: {
                    prefixes: [/[-~]/g, /\n+/g],
                    fix: ' '
                }
            },
            keyNames: ['unit1', 'unit2', 'unit3', 'unit4']
        }
        const allTopics = [];
        const finalSyllabusData = [];


        let editedText = this.state.text;

        for (let prefix of syllabusFixes.unitFixes.prefixes) {          //-- fixing units
            editedText = editedText.replace(prefix, syllabusFixes.unitFixes.fix);
        }

        let splitText = editedText.split(syllabusFixes.unitFixes.fix);           //-- splitting units
        splitText = splitText.filter(text => text !== '');

        for (let text of splitText) {                                      //-- filtering symbols, creating topics
            const topics = [];
            let newText = text;
            for (let key in syllabusFixes.symbolFixes) {
                for (let prefix of syllabusFixes.symbolFixes[key].prefixes) {
                    newText = newText.replace(prefix, syllabusFixes.symbolFixes[key].fix);
                    newText = newText.split('. ').join(',');
                    newText = newText.split(' .').join(',');
                    newText = newText.split(' and ').join(',')
                }
            }
            newText = newText.split(' ');
            const regexForDot = /[a-z]\.[a-z]/g;
            for (let key in newText) {
                if (regexForDot.test(newText[key])) {
                    newText[key] = newText[key].replace(/\./g, ',');
                }
            }
            newText = newText.join(' ').split(',');
            newText = newText.filter(text => text !== '');
            for (let key in newText) {
                newText[key] = newText[key].trim();
            }

            for (let topic of newText) {
                topics.push({
                    topic: topic,
                    words: stopwordRemover(topic),
                    stemmedWords: stemmer(topic),
                    count: 0,
                    qpapers: [],
                    questions: []
                });
            }
            allTopics.push(topics);
        }


        for (let key in syllabusFixes.keyNames) {
            finalSyllabusData.push({
                [syllabusFixes.keyNames[key]]: allTopics[key]
            });
        }

        return finalSyllabusData;
    }

    createQpaperData = (patternType) => {

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
            type2KeyNames: ['partA', 'partB', 'partC'],
            stopwords: ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now']
        }
        let allQuestions = [];
        const allWords = [];
        const allStemmedWords = [];
        const finalQpaperData = [];

        let editedText = this.state.text;

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


        for (let module in allQuestions) {                             //-- creating words, removing stopwords
            let wordModule = [...allQuestions[module]]
            for (let question in wordModule) {
                wordModule[question] = wordModule[question].split('. ').join(' ');
                wordModule[question] = wordModule[question].split(' .').join(' ');
                for (let prefix of qpaperFixes.symbolFixes.space.prefixes) {
                    wordModule[question] = wordModule[question].replace(prefix, qpaperFixes.symbolFixes.space.fix);
                }
                wordModule[question] = wordModule[question].split(' ');
                let words = [];
                for (let word of wordModule[question]) {
                    if (!qpaperFixes.stopwords.includes(word.trim())) {
                        words.push(word.trim());
                    }
                }
                words = words.filter(text => text !== '');
                wordModule[question] = [...words];
            }
            allWords.push(wordModule);
        }


        for (let module in allWords) {                                       //-- stemming
            let stemmedModule = [...allWords[module]];
            for (let words in stemmedModule) {
                let stemmedWords = [];
                for (let word of stemmedModule[words]) {
                    stemmedWords.push(stemmer(word));
                }
                stemmedWords = stemmedWords.filter(text => text !== '');
                stemmedModule[words] = [...stemmedWords];
            }
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

    generateScore = () => {
        let syllabusData = JSON.parse(localStorage.getItem('finalSyllabusData'));

        for(let topic in syllabusData[0].unit1){
            
            let count = [+syllabusData[0].unit1[topic].count];
            let questions = [...syllabusData[0].unit1[topic].questions];
            let qpapers = [...syllabusData[0].unit1[topic].qpapers];

            for(let word of syllabusData[0].unit1[topic].words){
                let wordCount = 0;
                for(let qpaper of this.state.qpapers){

                    if(qpaper.patternType === 'pattern1'){
                        for(let question in qpaper.data[0].module1.words){
                            if(qpaper.data[0].module1.words[question].includes(word)){
                                wordCount = wordCount + 1;
                                if(!questions.includes(qpaper.data[0].module1.questions[question])){
                                    questions.push(qpaper.data[0].module1.questions[question]);
                                }
                                if(!qpapers.includes(qpaper.id)){
                                    qpapers.push(qpaper.id);
                                }
                            }
                        }
                    }

                    if(qpaper.patternType === 'pattern2'){
                        for(let question in qpaper.data[0].partA.words){
                            if(qpaper.data[0].partA.words[question].includes(word)){
                                wordCount = wordCount + 1;
                                if(!questions.includes(qpaper.data[0].partA.questions[question])){
                                    questions.push(qpaper.data[0].partA.questions[question]);
                                }
                                if(!qpapers.includes(qpaper.id)){
                                    qpapers.push(qpaper.id);
                                }
                            }
                        }
                        for(let question in qpaper.data[2].partC.words){
                            if(qpaper.data[2].partC.words[question].includes(word)){
                                wordCount = wordCount + 1;
                                if(!questions.includes(qpaper.data[2].partC.questions[question])){
                                    questions.push(qpaper.data[2].partC.questions[question]);
                                }
                                if(!qpapers.includes(qpaper.id)){
                                    qpapers.push(qpaper.id);
                                }
                            }
                        }
                    }
                }
                count.push(wordCount);
            }

            syllabusData[0].unit1[topic].count = Math.max.apply(null, count);
            syllabusData[0].unit1[topic].questions = [...questions];
            syllabusData[0].unit1[topic].qpapers = [...qpapers];
        }

        for(let topic in syllabusData[1].unit2){
            
            let count = [+syllabusData[1].unit2[topic].count];
            let questions = [...syllabusData[1].unit2[topic].questions];
            let qpapers = [...syllabusData[1].unit2[topic].qpapers];

            for(let word of syllabusData[1].unit2[topic].words){
                let wordCount = 0;
                for(let qpaper of this.state.qpapers){

                    if(qpaper.patternType === 'pattern1'){
                        for(let question in qpaper.data[1].module2.words){
                            if(qpaper.data[1].module2.words[question].includes(word)){
                                wordCount = wordCount + 1;
                                if(!questions.includes(qpaper.data[1].module2.questions[question])){
                                    questions.push(qpaper.data[1].module2.questions[question]);
                                }
                                if(!qpapers.includes(qpaper.id)){
                                    qpapers.push(qpaper.id);
                                }
                            }
                        }
                    }

                    if(qpaper.patternType === 'pattern2'){
                        for(let question in qpaper.data[0].partA.words){
                            if(qpaper.data[0].partA.words[question].includes(word)){
                                wordCount = wordCount + 1;
                                if(!questions.includes(qpaper.data[0].partA.questions[question])){
                                    questions.push(qpaper.data[0].partA.questions[question]);
                                }
                                if(!qpapers.includes(qpaper.id)){
                                    qpapers.push(qpaper.id);
                                }
                            }
                        }
                        for(let question in qpaper.data[2].partC.words){
                            if(qpaper.data[2].partC.words[question].includes(word)){
                                wordCount = wordCount + 1;
                                if(!questions.includes(qpaper.data[2].partC.questions[question])){
                                    questions.push(qpaper.data[2].partC.questions[question]);
                                }
                                if(!qpapers.includes(qpaper.id)){
                                    qpapers.push(qpaper.id);
                                }
                            }
                        }
                    }
                }
                count.push(wordCount);
            }

            syllabusData[1].unit2[topic].count = Math.max.apply(null, count);
            syllabusData[1].unit2[topic].questions = [...questions];
            syllabusData[1].unit2[topic].qpapers = [...qpapers];
        }

        for(let topic in syllabusData[2].unit3){
            
            let count = [+syllabusData[2].unit3[topic].count];
            let questions = [...syllabusData[2].unit3[topic].questions];
            let qpapers = [...syllabusData[2].unit3[topic].qpapers];

            for(let word of syllabusData[2].unit3[topic].words){
                let wordCount = 0;
                for(let qpaper of this.state.qpapers){

                    if(qpaper.patternType === 'pattern1'){
                        for(let question in qpaper.data[2].module3.words){
                            if(qpaper.data[2].module3.words[question].includes(word)){
                                wordCount = wordCount + 1;
                                if(!questions.includes(qpaper.data[2].module3.questions[question])){
                                    questions.push(qpaper.data[2].module3.questions[question]);
                                }
                                if(!qpapers.includes(qpaper.id)){
                                    qpapers.push(qpaper.id);
                                }
                            }
                        }
                    }

                    if(qpaper.patternType === 'pattern2'){
                        for(let question in qpaper.data[1].partB.words){
                            if(qpaper.data[1].partB.words[question].includes(word)){
                                wordCount = wordCount + 1;
                                if(!questions.includes(qpaper.data[1].partB.questions[question])){
                                    questions.push(qpaper.data[1].partB.questions[question]);
                                }
                                if(!qpapers.includes(qpaper.id)){
                                    qpapers.push(qpaper.id);
                                }
                            }
                        }
                        for(let question in qpaper.data[2].partC.words){
                            if(qpaper.data[2].partC.words[question].includes(word)){
                                wordCount = wordCount + 1;
                                if(!questions.includes(qpaper.data[2].partC.questions[question])){
                                    questions.push(qpaper.data[2].partC.questions[question]);
                                }
                                if(!qpapers.includes(qpaper.id)){
                                    qpapers.push(qpaper.id);
                                }
                            }
                        }
                    }
                }
                count.push(wordCount);
            }

            syllabusData[2].unit3[topic].count = Math.max.apply(null, count);
            syllabusData[2].unit3[topic].questions = [...questions];
            syllabusData[2].unit3[topic].qpapers = [...qpapers];
        }

        for(let topic in syllabusData[3].unit4){
            
            let count = [+syllabusData[3].unit4[topic].count];
            let questions = [...syllabusData[3].unit4[topic].questions];
            let qpapers = [...syllabusData[3].unit4[topic].qpapers];

            for(let word of syllabusData[3].unit4[topic].words){
                let wordCount = 0;
                for(let qpaper of this.state.qpapers){

                    if(qpaper.patternType === 'pattern1'){
                        for(let question in qpaper.data[3].module4.words){
                            if(qpaper.data[3].module4.words[question].includes(word)){
                                wordCount = wordCount + 1;
                                if(!questions.includes(qpaper.data[3].module4.questions[question])){
                                    questions.push(qpaper.data[3].module4.questions[question]);
                                }
                                if(!qpapers.includes(qpaper.id)){
                                    qpapers.push(qpaper.id);
                                }
                            }
                        }
                    }

                    if(qpaper.patternType === 'pattern2'){
                        for(let question in qpaper.data[1].partB.words){
                            if(qpaper.data[1].partB.words[question].includes(word)){
                                wordCount = wordCount + 1;
                                if(!questions.includes(qpaper.data[1].partB.questions[question])){
                                    questions.push(qpaper.data[1].partB.questions[question]);
                                }
                                if(!qpapers.includes(qpaper.id)){
                                    qpapers.push(qpaper.id);
                                }
                            }
                        }
                        for(let question in qpaper.data[2].partC.words){
                            if(qpaper.data[2].partC.words[question].includes(word)){
                                wordCount = wordCount + 1;
                                if(!questions.includes(qpaper.data[2].partC.questions[question])){
                                    questions.push(qpaper.data[2].partC.questions[question]);
                                }
                                if(!qpapers.includes(qpaper.id)){
                                    qpapers.push(qpaper.id);
                                }
                            }
                        }
                    }
                }
                count.push(wordCount);
            }

            syllabusData[3].unit4[topic].count = Math.max.apply(null, count);
            syllabusData[3].unit4[topic].questions = [...questions];
            syllabusData[3].unit4[topic].qpapers = [...qpapers];
        }

        console.log(syllabusData);
    }

    textChangeHandler = (event) => {

        let editedText = event.target.value;
        editedText = editedText.toLowerCase();

        this.setState({ text: editedText });
    }

    render() {

        let uploadAreaContent = <React.Fragment>
            <label htmlFor="inp" >Upload Image</label>
            <input type="file" id="inp" onChange={this.handleChange} style={{ display: 'none' }} />
        </React.Fragment>;
        if (this.state.uploads.length > 0) {
            uploadAreaContent = <img src={this.state.uploads[0]} />;
        }
        if (this.state.text) {
            uploadAreaContent = <textarea value={this.state.text} onChange={this.textChangeHandler} />
        }

        return (
            <div className={classes.UploadSyllabus} >
                <div className={classes.UploadArea} >
                    {uploadAreaContent}
                </div>
                <div>
                    <Button btnType="Danger" clicked={this.cancelUploadHandler} >CANCEL</Button>
                    <Button btnType="SuccessRegular" clicked={this.generateScore} >SAVE</Button>
                </div>
            </div>
        );
    }
}

export default UploadSyllabus;