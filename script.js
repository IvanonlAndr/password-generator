const passwordInput = document.getElementById('password')
const inputs = [...document.querySelectorAll(`input:not([type = 'text'])`)]
const lengthInput = document.getElementById('length')
const lengthText = document.getElementById('lengthText')
const copyButton = document.querySelector('.copy')

const symbols = ['@', '#', '$', '%']
const numbers = [2, 3, 4, 5, 6, 7, 8, 9]
const similarLowerCaseLetters = ['i', 'l', 'o']
const similarUpperCaseLetters = ['L', 'O']
const similarNumbers = [0, 1]

const characterSkipCodes = [8, 11, 14]
const characterCodes = Array.from(Array(26)).map((_, i) => i + 97)
console.log(characterCodes)
const lowerCaseLetters = characterCodes.map(code => String.fromCharCode(code)).filter((_, i) => !characterSkipCodes.includes(i))
console.log(lowerCaseLetters)
const upperCaseLetters = lowerCaseLetters.map(lowerCaseLetter => lowerCaseLetter.toUpperCase())

copyButton.addEventListener('click', function(){
    navigator.clipboard.writeText(passwordInput.value)
    copyButton.classList.add('copied')
    setTimeout(() => {copyButton.classList.remove('copied')}, 3000)
})

const updatePassword = () => {
    const length = lengthInput.value
    const checkboxValues = inputs.slice(1).map(item => item.checked)
    console.log(checkboxValues)
    const password = generatePassword(length, ...checkboxValues)
    passwordInput.value = password
    lengthText.textContent = `${length} characters`
}
inputs.forEach(input => input.addEventListener('input', updatePassword));
const generatePassword = (length, hasSymbols, hasNumbers, hasLowercase, hasUppercase, hasSimilars) => {
    // console.log(length, hasSymbols, hasNumbers, hasLowercase, hasUppercase, hasSimilar)\
    let avaliableCharacters = [
        ...(hasSymbols ? symbols : []),
        ...(hasNumbers ? numbers : []),
        ...(hasLowercase ? lowerCaseLetters : []),
        ...(hasUppercase ? upperCaseLetters : [])
    ]
    if(hasSimilars){
        if(hasLowercase){
            avaliableCharacters = [...avaliableCharacters,...similarLowerCaseLetters]
        }
        if(hasUppercase){
            avaliableCharacters = [...avaliableCharacters,...similarUpperCaseLetters]
        }
        if(hasNumbers){
            avaliableCharacters = [...avaliableCharacters,...similarNumbers]
        }

    }
    console.log(avaliableCharacters)
    let resultPassword = ''
    if(avaliableCharacters.length == 0) return ''
    for(let i = 0; i<length; i++){
        const randomIndex = Math.floor(Math.random()*avaliableCharacters.length) 
        console.log(randomIndex)
        resultPassword += avaliableCharacters[randomIndex] 
    }
    return resultPassword
}

updatePassword()

// if (hasSymbols) {
//     // добовляем массив symbols
// } else {
//     // не добовляем
// }

// hasSymbols ? // добовляем массив symbols : // не добовляем
