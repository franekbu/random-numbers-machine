// PIERWSZY PRZEDZIAŁ
const START_FIRST_RAGE_NUMBER = document.querySelector('#start__number')
const END_FIRST_RAGE_NUMBER = document.querySelector('#end__number')
// KOLEJNY PRZEDZIAŁ
const START_NEXT_RAGE_NUMBER = document.querySelector('#start__next__number')
const END_NEXT_RAGE_NUMBER = document.querySelector('#end__next__number')
// CHECKBOX OD UNIKALNYCH LICZB
const UNICAL_NUMBERS_CHECKBOX = document.querySelector('#unical__numbers')
// CHECKBOX DO POKAZYWANIA PO KOLEJII
const SHOWING_SEQUENCE_CHECKBOX = document.querySelector('#showing__in__sequence')
// BUTTON DO LOSOWANIA LICZBY 
const GENERATE_NUMBERS_BUTTON = document.querySelector('.search__random__number')
// POKAZYWANIE WYGENEROWANYCH LICZB
const SHOWN_GENERATED_NUMBERS = document.querySelector('#generated__number')
// BUTTON DO POKAZYWANIA POPRZEDNIEJ LICZBY 
const SHOW_PREVIOUS_NUMBER_BUTTON = document.querySelector('.show__previous__number')
// BUTTON DO POKAZYWANIA NASTĘPNEJ LICZBY
const SHOW_NEXT_NUMBER_BUTTON = document.querySelector('.show__next__number')

// ARRAY DO PRZETRZYMYWANIA WYGENEROWANYCH LICZB 
let receivedGeneratedNumbers = []

// BUTTON DO DODANIA PRZEDZIAŁÓW
const ADD_RAGE_BUTTON = document.querySelector('.add__number__range')
ADD_RAGE_BUTTON.addEventListener('click', () => {
    const FIRST_RAGE = document.querySelector('.start__next__number--fieldset')
    const SECOND_RAGE = document.querySelector('.end__next__number--fieldset')
    const SPAN = document.querySelector('#label__add__number__range')
    if ( FIRST_RAGE.classList.contains('hidden') && SECOND_RAGE.classList.contains('hidden')) {
        FIRST_RAGE.classList.remove('hidden')
        SECOND_RAGE.classList.remove('hidden')
        ADD_RAGE_BUTTON.innerHTML = ('Usuń przedział')
        SPAN.classList.add('hidden')
    } else {
        FIRST_RAGE.classList.add('hidden')
        START_NEXT_RAGE_NUMBER.value = ''
        SECOND_RAGE.classList.add('hidden')
        END_NEXT_RAGE_NUMBER.value = ''
        ADD_RAGE_BUTTON.innerHTML = ('Dodaj przedział')
        SPAN.classList.remove('hidden')
    }
})


let forbiddenNumbers = []   // ARRAY DO  LICZB ZAKAZANYCH 
const ACCEPT_FORBIDDEN_NUMBER_BUTTON = document.querySelector('.accept__unwanted__number')// NASTEPNA ZAKAZANA LICZBA BUTTON 
const SHOWING_FORBIDDEN_NUMBERS_INPUT = document.querySelector('#show__unwanted__numbers')// INPUT DO POKAZYWANIA ZAKAZANYCH LICZB
ACCEPT_FORBIDDEN_NUMBER_BUTTON.addEventListener('click', gettingForbiddenNumbers)
function gettingForbiddenNumbers() {
    const FORBIDDEN_NUMBERS_INPUT = document.querySelector('#unwanted__numbers')// ZAKAZANE LICZBY INPUT 
    const ERROR_IN_FORBIDDEN_NUMBERS_= document.querySelector('.allert__same__number__again')// ALERT POWTÓŻONEJ LICZBY 
    if( FORBIDDEN_NUMBERS_INPUT.value ) {
        if ( forbiddenNumbers.includes(Number(FORBIDDEN_NUMBERS_INPUT.value)) ){
            ERROR_IN_FORBIDDEN_NUMBERS_.classList.remove('hidden')
        } else {
            ERROR_IN_FORBIDDEN_NUMBERS_.classList.add('hidden')
            forbiddenNumbers.push(Number(FORBIDDEN_NUMBERS_INPUT.value))       
            SHOWING_FORBIDDEN_NUMBERS_INPUT.value = forbiddenNumbers
        }
        FORBIDDEN_NUMBERS_INPUT.value = ''
    }
}
// USUWANIE ZAKAZANYCH 
const REMOVE_FORBIDDEN_NUMBERS = document.querySelector('.remove__unwanted__numbers')
REMOVE_FORBIDDEN_NUMBERS.addEventListener('click', () => {
    forbiddenNumbers = []
    SHOWING_FORBIDDEN_NUMBERS_INPUT.value = ''
})


//  UODPARNIANIE NA GŁÓPCA
const ERROR_START_NUMBER = document.querySelector('.allert__start__number')
const ERROR_END_NUMBER = document.querySelector('.allert__end__number')
const ERROR_START_NEXT_NUMBER = document.querySelector('.allert__start__next__number')
const ERROR_END_NEXT_NUMBER = document.querySelector('.allert__end__next__number')
GENERATE_NUMBERS_BUTTON.addEventListener( 'click', protectingFromFools )
function protectingFromFools() {
    // wywołuje dwa razy bo to jest brane po onclicku ale jest w funkcji wiec nie bede miał w drugiej
    let firstMin = Number(START_FIRST_RAGE_NUMBER.value) 
    let firstMax = Number(END_FIRST_RAGE_NUMBER.value)
    let nextMin = Number(START_NEXT_RAGE_NUMBER.value)
    let nextMax = Number(END_NEXT_RAGE_NUMBER.value)
    let bug1
    let bug2
    // PIERWSZY PRZEDZIAŁ
    if ( !END_FIRST_RAGE_NUMBER.value || !START_FIRST_RAGE_NUMBER.value ) {
        ERROR_START_NUMBER.innerHTML = 'Przedział wymagany'
        ERROR_END_NUMBER.innerHTML = 'Przedział wymagany'
        bug1 = true
    } else if ( firstMin >= firstMax ){
        ERROR_START_NUMBER.innerHTML = 'Start przedziału nie może być wiekszy lub równy końcowi przedziału'
        ERROR_END_NUMBER.innerHTML = ''
        bug1 = true
    } else {
        ERROR_START_NUMBER.innerHTML = ''
        ERROR_END_NUMBER.innerHTML = ''
        bug1 = false
    } 
    // DRUGI PRZEDZIAŁ
    if( (START_NEXT_RAGE_NUMBER.value&&!END_NEXT_RAGE_NUMBER.value) || (!START_NEXT_RAGE_NUMBER.value&&END_NEXT_RAGE_NUMBER.value) ) {
        ERROR_START_NEXT_NUMBER.innerHTML = 'Obydwa przedziały muszą być pełne lub puste'
        ERROR_END_NEXT_NUMBER.innerHTML = 'Obydwa przedziały muszą być pełne lub puste'
        bug2 = true
    } else if( (firstMax >= nextMin) && (START_NEXT_RAGE_NUMBER.value)) {
        ERROR_START_NEXT_NUMBER.innerHTML = 'Drugi przedział nie może zawierać/być mniejszym od pierwszego'
        ERROR_END_NEXT_NUMBER.innerHTML = ''
        bug2 = true
    } else if ( nextMin >= nextMax  && (START_NEXT_RAGE_NUMBER.value&&END_NEXT_RAGE_NUMBER.value)) {
        ERROR_START_NEXT_NUMBER.innerHTML = 'Start przedziału nie może być wiekszy lub równy końcowi przedziału'
        ERROR_END_NEXT_NUMBER.innerHTML = ''
        bug2 = true
    } else {
        ERROR_START_NEXT_NUMBER.innerHTML = ''
        ERROR_END_NEXT_NUMBER.innerHTML = ''
        bug2 = false
    }
    if ( bug1 === false && bug2 === false ) {
        mainFunction() 
    } 
}


// GENERATE_NUMBERS_BUTTON.addEventListener( 'click', mainFunction )
function mainFunction() {
    // WYMAZYWANIE TABLICY 
    receivedGeneratedNumbers = []
    // wywołuje dwa razy bo to jest brane po onclicku ale jest w funkcji wiec nie bede miał w drugiej
    let firstMin = Number(START_FIRST_RAGE_NUMBER.value) 
    let firstMax = Number(END_FIRST_RAGE_NUMBER.value)
    let nextMin = Number(START_NEXT_RAGE_NUMBER.value)
    let nextMax = Number(END_NEXT_RAGE_NUMBER.value)
    let number
    const HOW_MANY_TO_GENERATE = document.querySelector('#how__many__numbers')
    let howManyToGenerate = Number(HOW_MANY_TO_GENERATE.value)

    if ( START_NEXT_RAGE_NUMBER.value && END_NEXT_RAGE_NUMBER.value ) {
        if( UNICAL_NUMBERS_CHECKBOX.checked ) {
            let numberOfAvaliable = (firstMax+nextMax-firstMin-nextMin+2)-forbiddenNumbers.length
            if ( numberOfAvaliable < howManyToGenerate ) {// W PIERWSZYCH ZA DUZA ZADAJA 
                for ( let i=0; i < numberOfAvaliable; i++) {
                    do{
                        number = Math.round( Math.random() * ( nextMax - firstMin ) + firstMin )
                    } while( (number>firstMax && number<nextMin) || forbiddenNumbers.includes(number) || receivedGeneratedNumbers.includes(number) )
                    receivedGeneratedNumbers.push(number)
                }
            } else {// INNY FOR
                for ( let i=0; i < howManyToGenerate; i++) {
                    do{
                        number = Math.round( Math.random() * ( nextMax - firstMin ) + firstMin )
                    } while( (number>firstMax && number<nextMin) || forbiddenNumbers.includes(number) || receivedGeneratedNumbers.includes(number) )
                    receivedGeneratedNumbers.push(number)
                }
            }
        } else {// INNY STATEMENT
            for ( let i=0; i < howManyToGenerate; i++) {
                do{
                    number = Math.round( Math.random() * ( nextMax - firstMin ) + firstMin )
                } while( (number>firstMax && number<nextMin) || forbiddenNumbers.includes(number) )
                receivedGeneratedNumbers.push(number)
            }
        }
    } else {
        if( UNICAL_NUMBERS_CHECKBOX.checked ) {
            let numberOfAvaliable = (firstMax-firstMin+1)-forbiddenNumbers.length
            if ( numberOfAvaliable < howManyToGenerate ) {// W PIERWSZYCH ZA DUZA ZADAJA 
                for ( let i=0; i < numberOfAvaliable; i++) {
                    do{
                        number = Math.round( Math.random() * ( firstMax - firstMin ) + firstMin )
                    } while( forbiddenNumbers.includes(number) || receivedGeneratedNumbers.includes(number) )
                    receivedGeneratedNumbers.push(number)
                }
            } else {// INNY FOR
                for ( let i=0; i < howManyToGenerate; i++) {
                    do{
                        number = Math.round( Math.random() * ( firstMax - firstMin ) + firstMin )
                    } while( forbiddenNumbers.includes(number) || receivedGeneratedNumbers.includes(number) )
                    receivedGeneratedNumbers.push(number)
                }
            }
        } else {// INNY STATEMENT
            for ( let i=0; i < howManyToGenerate; i++) {
                do{
                    number = Math.round( Math.random() * ( firstMax - firstMin ) + firstMin )
                } while( forbiddenNumbers.includes(number) )
                receivedGeneratedNumbers.push(number)
            }
        }
    }
    
    const WHICH_NUMBER_SHOWED = document.querySelector('.which__number__showing')
    if ( SHOWING_SEQUENCE_CHECKBOX.checked ) {
        SHOW_NEXT_NUMBER_BUTTON.classList.remove('hidden')
        SHOW_PREVIOUS_NUMBER_BUTTON.classList.remove('hidden')
        WHICH_NUMBER_SHOWED.classList.remove('hidden')
        let i = 0
        SHOWN_GENERATED_NUMBERS.value = receivedGeneratedNumbers[i]
        WHICH_NUMBER_SHOWED.innerHTML = i + 1
        SHOW_PREVIOUS_NUMBER_BUTTON.addEventListener('click', () => {
            if ( i === 0 ) {
                i = receivedGeneratedNumbers.length - 1
            } else {
                i--
            }
            SHOWN_GENERATED_NUMBERS.value = receivedGeneratedNumbers[i]
            WHICH_NUMBER_SHOWED.innerHTML = i + 1
        })
        SHOW_NEXT_NUMBER_BUTTON.addEventListener('click', () => {
            if ( i === receivedGeneratedNumbers.length - 1 ) {
                i = 0
            } else {
                i++
            }
            SHOWN_GENERATED_NUMBERS.value = receivedGeneratedNumbers[i]
            WHICH_NUMBER_SHOWED.innerHTML = i + 1
        })
    } else {
        SHOWN_GENERATED_NUMBERS.value = receivedGeneratedNumbers
        WHICH_NUMBER_SHOWED.classList.add('hidden')
        SHOW_NEXT_NUMBER_BUTTON.classList.add('hidden')
        SHOW_PREVIOUS_NUMBER_BUTTON.classList.add('hidden')
    }
    console.log(receivedGeneratedNumbers)
}