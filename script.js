const latinToMorse = {
	'A':'.-',
	'B':'-...',
	'C':'-.-.',
	'D':'-..',
	'E':'.',
	'F':'..-.',
	'G':'--.',
	'H':'....',
	'I':'..',
	'J':'.---',
	'K':'-.-',
	'L':'.-..',
	'M':'--',
	'N':'-.',
	'O':'---',
	'P':'.--.',
	'Q':'--.-',
	'R':'.-.',
	'S':'...',
	'T':'-',
	'U':'..-',
	'V':'...-',
	'W':'.--',
	'X':'-..-',
	'Y':'-.--',
	'Z':'--..'
}

const morseToLatin = {
	'-': "T",
	'--': "M",
	'---': "O",
	'--.': "G",
	'--.-': "Q",
	'--..': "Z",
	'-.': "N",
	'-.-': "K",
	'-.--': "Y",
	'-.-.': "C",
	'-..': "D",
	'-..-': "X",
	'-...': "B",
	'.': "E",
	'.-': "A",
	'.--': "W",
	'.---': "J",
	'.--.': "P",
	'.-.': "R",
	'.-..': "L",
	'..': "I",
	'..-': "U",
	'..-.': "F",
	'...': "S",
	'...-': "V",
	'....': "H"
}

let str

const latinInput = document.querySelector('#latinInput');
const latin = document.querySelector('#Latin');
let latinToMorse_str = document.querySelector('#latinToMorse');

const morseInput = document.querySelector('#morseInput');
const morse = document.querySelector('#Morse');
let morseToLatin_str = document.querySelector('#morseToLatin');

latin.addEventListener('click', () => {
	morseToLatin_str.innerText = ""
	str = encode(latinInput.value)
	latinToMorse_str.innerText = "Translation : " + str
	latinInput.value = ""
})

morse.addEventListener('click', () => {
	latinToMorse_str.innerText = ""
	str = decode(morseInput.value)
	morseToLatin_str.innerText = "Translation : " + str
	morseInput.value = ""
})


function getLatinCharacterList(str)
{
	let tab = []
	for (let i = 0; i < str.length; i++)
	{
		tab.push(str.charAt(i))
	}
	return (tab)
}

function getMorseCharacterList(str)
{
	let tab = []
	let j = 0
	for (let i = 0; i < str.length; i++)
	{
		if (str.charAt(i) == " ")
		{
			tab.push(str.substr(j, i - j))
			j = i + 1
		}
		if (str.charAt(i) == "/")
		{
			tab.push(str.substr(j, i - j))
			tab.push(str.charAt(i))
			j = i + 1
		}
		if (i == (str.length - 1))
		{
			tab.push(str.substr(j, i - j + 1))
		}
	}
	return (tab)
}

function translateLatinCharacter(char)
{
	for (letter in latinToMorse)
	{
		if (letter == char)
		{
			return (latinToMorse[letter])
		}
	}
	return (char)
}

function translateMorseCharacter(char)
{
	for (morseChar in morseToLatin)
	{
		if (morseChar == char)
		{
			return (morseToLatin[morseChar])
		}
	}
	return (char)
}

function encode(str) {
	str = str.toUpperCase()
	let tab = getLatinCharacterList(str)
	let translated = []
	let morseStr = ""
	for (let i = 0; i < tab.length; i++)
	{
		if (tab[i] == " ")
		{
			translated.push("/")
		}
		else
		{
			translated.push(translateLatinCharacter(tab[i]))
		}
	}
	for (let i = 0; i < translated.length; i++)
	{
		morseStr += translated[i]
		if (translated[i + 1] != "/" && translated[i] != "/" && i != (translated.length - 1))
		{
			morseStr += " "
		}
	}
	return (morseStr)
}

function decode(str)
{
	let tab = getMorseCharacterList(str)
	let translated = []
	let latinStr = ""
	for (let i = 0; i < tab.length; i++)
	{
		if (tab[i] == "/")
		{
			translated.push(" ")
		}
		else
		{
			translated.push(translateMorseCharacter(tab[i]))
		}
	}
	for (let i = 0; i < translated.length; i++)
	{
		latinStr += translated[i]
	}
	return (latinStr)
}