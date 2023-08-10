const newSubstring = document.getElementById('new');

const clearButton = document.getElementById('clear');
if (clearButton) {
    clearButton.addEventListener('click', () => {
        document.querySelectorAll('textarea').forEach(textarea => {
            textarea.value = '';
        })
    });
}

const convertButton = document.getElementById('convert');
const convertInput = document.getElementById('input');
const convertOutput = document.getElementById('output');
if (convertButton) {
    convertButton.addEventListener('click', () => {
        document.querySelector('.spinner').style.display = 'block';
        const text = convertInput.value;
        let newVal;
        if (newSubstring.value == '') {
            newVal = ';';
        } else {
            newVal = newSubstring.value;
        }

        convertOutput.value = text.replace(/\n/g, newVal);
        document.querySelector('.spinner').style.display = 'none';
    });
}

const newParse = document.getElementById('new-parse');
const outputParseCheck = document.getElementById('output-parse-check');
const parseButton = document.getElementById('parse');
const input = document.getElementById('input-parse');
const output = document.getElementById('output');
if (parseButton) {
    parseButton.addEventListener('click', () => {
        const file = input.files[0];
        let text = '';
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                text = reader.result;
                const inp = text;
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(inp, 'text/xml');
                const fields = [
                    'Snils', 'GuidEntrant', 'Priority', 'TopPriority', 'Rating',
                    'WithoutTests', 'EntranceTest1', 'Result1', 'EntranceTest2',
                    'Result2', 'EntranceTest3', 'Result3', 'AchievementsMark',
                    'EntranceTestMark', 'SumMark', 'Benefit', 'Original'
                ];

                const entrants = xmlDoc.getElementsByTagName('Entrant');
                for (let i = 0; i < entrants.length; i ++) {
                    const entrant = entrants[i];
                    for (const field of fields) {
                        if (!entrant.getElementsByTagName(field).length) {
                            const newElement = xmlDoc.createElement(field);
                            if (newParse.value === '') {
                                newElement.textContent = 'null';
                            } else {
                                newElement.textContent = newParse.value;
                            }
                            entrant.appendChild(newElement);
                        }
                    }
                }

                const PackageData = xmlDoc.getElementsByTagName('PackageData');
                const RankedCompetition = xmlDoc.getElementsByTagName('RankedCompetition');
                const UidCompetition = xmlDoc.getElementsByTagName('UidCompetition');
                const Snils = xmlDoc.getElementsByTagName('Snils');
                const GuidEntrant = xmlDoc.getElementsByTagName('GuidEntrant');
                const Priority = xmlDoc.getElementsByTagName('Priority');
                const TopPriority = xmlDoc.getElementsByTagName('TopPriority');
                const Rating = xmlDoc.getElementsByTagName('Rating');
                const WithoutTests = xmlDoc.getElementsByTagName('WithoutTests');
                const EntranceTest1 = xmlDoc.getElementsByTagName('EntranceTest1');
                const Result1 = xmlDoc.getElementsByTagName('Result1');
                const EntranceTest2 = xmlDoc.getElementsByTagName('EntranceTest2');
                const Result2 = xmlDoc.getElementsByTagName('Result2');
                const EntranceTest3 = xmlDoc.getElementsByTagName('EntranceTest3');
                const Result3 = xmlDoc.getElementsByTagName('Result3');
                const AchievementsMark = xmlDoc.getElementsByTagName('AchievementsMark');
                const EntranceTestMark = xmlDoc.getElementsByTagName('EntranceTestMark');
                const SumMark = xmlDoc.getElementsByTagName('SumMark');
                const Benefit = xmlDoc.getElementsByTagName('Benefit');
                const Original = xmlDoc.getElementsByTagName('Original');

                let checkString = `
                PackageData: ${PackageData.length}
                RankedCompetition: ${RankedCompetition.length}
                UidCompetition: ${UidCompetition.length}
                entrants: ${entrants.length}
                Snils: ${Snils.length} 
                GuidEntrant: ${GuidEntrant.length}
                Priority: ${Priority.length}
                TopPriority: ${TopPriority.length}
                Rating: ${Rating.length}
                WithoutTests: ${WithoutTests.length}
                EntranceTest1: ${EntranceTest1.length}
                Result1: ${Result1.length}
                EntranceTest2: ${EntranceTest2.length}
                Result2: ${Result2.length}
                EntranceTest3: ${EntranceTest3.length}
                Result3: ${Result3.length}
                AchievementsMark: ${AchievementsMark.length}
                EntranceTestMark: ${EntranceTestMark.length}
                SumMark: ${SumMark.length}
                Benefit: ${Benefit.length}
                Original: ${Original.length}
                `;
                console.log(checkString);
                outputParseCheck.value = checkString;

                const serializer = new XMLSerializer();
                const updatedXMLString = serializer.serializeToString(xmlDoc);
                downloadFile(updatedXMLString, 'output.txt');
            }
            reader.readAsText(file);
        }
    })
}

function downloadFile(content, filename) {
    const blob = new Blob([content], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}