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
        const text = convertInput.value;
        let newVal;
        if (newSubstring.value == '') {
            newVal = ';';
        } else {
            newVal = newSubstring.value;
        }

        convertOutput.value = text.replace(/\n/g, newVal);
    });
}

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
                            newElement.textContent = 'null';
                            entrant.appendChild(newElement);
                        }
                    }
                }

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
    console.log(url)
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
}