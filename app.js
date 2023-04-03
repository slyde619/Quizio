// Variables Declarations and assignment
const launchBtn = document.querySelector('.btn-start')
const quizContainer = document.querySelector('.quiz-container')
const optionList = document.querySelector('.option-list')
const nextBtn = document.querySelector('.btn-next')
let randomNum = generateRandomNumber()
const restartBtn = document.querySelector('.restart')

let userScore = 0
let counter = 0;
let footerCount = 1

/**
Displays The Quiz Box 
If the launch btn is clicked
**/
launchBtn.addEventListener('click', () => {
    quizContainer.style.display = 'block';
    quizContainer.style.transition = 'all 0.4s ease-in'
    launchBtn.style.display = 'none'
    displayQuestions(randomNum)
    // Display question counter for footer
    footerCounter(footerCount)
})



/**
Get questions, options from array and display
**/
function displayQuestions(randomNum){
    const questionTitle = document.querySelector('.question-title')
    let questionTextContent = `<h3>${questions[counter].id}. ${questions[randomNum].question}</h3>`
    let choice = `
        <div class="option">${questions[randomNum].options[0]}</div>
        <div class="option">${questions[randomNum].options[1]}</div>
        <div class="option">${questions[randomNum].options[2]}</div>
        <div class="option">${questions[randomNum].options[3]}</div>
    `
    questionTitle.innerHTML = questionTextContent
    optionList.innerHTML = choice
    // Fetch all options and loop through
    const allOption = optionList.querySelectorAll('.option')
    allOption.forEach(option => {
        option.setAttribute('onclick', 'selectedOption(this)')
    })
}

/** 
Display next question when next btn 
Is clicked
**/
nextBtn.addEventListener('click', () => {
    // check number of total questions
    if(counter < questions.length - 1){
        // assign randomNum to counter
        randomNum = counter++
        footerCount++
        displayQuestions(randomNum)
        footerCounter(footerCount)
        nextBtn.style.display = 'none'
    }else{
        console.log('Question completed...');
        showResult()
    }
})

// SelectedOption to check users answer
function selectedOption(answer){
    let userAns = answer.textContent
    let correctAns = questions[randomNum].answer
    // Check if user's answer is true
    if(userAns == correctAns){
        answer.classList.add('correct')
        userScore +=1
        console.log('Correct!!!');
    }else{
        answer.classList.add('incorrect')
        console.log('Incorrect...');
    }

    // Disable all options once an option is selected
    let totalOptions = optionList.children.length
    for(let index = 0; index < totalOptions; index++){
        optionList.children[index].classList.add('disabled')
    }

    // Next Button to display
    nextBtn.style.display = 'block'

} 

/**
 Footer Question Counter
**/
function footerCounter(index){
    const footerTotalCount = quizContainer.querySelector('.total')
    let totalCount = `<p><span><strong>${index}</strong></span> 
        of <span><strong>${questions.length}</strong></span> Questions.
        </p>
    `
    footerTotalCount.innerHTML = totalCount
}


// ShowResult 
function showResult(){
    quizContainer.style.display = 'none';
    const div = document.createElement('div')
    div.innerHTML = `<h3>You've completed the quiz!
    You scored ${userScore} out of 5</h3>`
    document.body.prepend(div)
    restartBtn.style.display = 'block'
}

restartBtn.addEventListener('click', restartQuiz)

function restartQuiz(){
    // Reload the page
    window.location.reload()
}




// Random Number Generator
function generateRandomNumber(){
    return Math.floor(Math.random() * questions.length + 1)
}
