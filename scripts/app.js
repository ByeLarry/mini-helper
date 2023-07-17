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
const input = document.getElementById('input');
const output = document.getElementById('output');
if (convertButton) {
    convertButton.addEventListener('click', () => {
        const text = input.value;
        let newVal;
        if (newSubstring.value == '') {
            newVal = ';';
        } else {
            newVal = newSubstring.value;
        }

        output.value = text.replace(/\n/g, newVal);
    });
}