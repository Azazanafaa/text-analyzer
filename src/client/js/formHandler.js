const baseUrl = 'http://localhost:8082'
const formText = document.getElementById('name')
const resultList = document.getElementById('result-text')
const resultUrl = document.getElementById('result-url')
const textHeader = document.getElementById('text-header')
const urlHeader = document.getElementById('url-header')
const noResult = document.getElementById('no-result')
import { isUrl } from './checkForUrl'



// Event listener for onclik submit form
function handleSubmit(event) {
    event.preventDefault()
    if (!isUrl(formText.value)) {
        textHeader.style.visibility = 'hidden'
        getAnalysis('/fetchAnalysis', formText.value).then(res => {
            if (res) {
                return getAllData('/getAnalysis')
            }
        }).then((res) => {
            if (res) {
                updateUi(res)
                console.log(res)
            }
        });
    } else {
        urlHeader.style.visibility = 'hidden'
        getAnalysis('/fetchUrlAnalysis', formText.value).then(res => {
            if (res) {
                return getAllData('/getUrlAnalysis')
            }
        }).then((res) => {
            if (res) {
                updateUrlUi(res)
                console.log(res)
            }
        });
    }
}

// Invoking the server to search for analysis by what user entered
const getAnalysis = async (url = '', data) => {
    const response = await fetch(baseUrl + url, {
        method: 'POST',
        mode: 'cors',
        cridentials: 'same-orgin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: data })
    })
    try {
        const res = await response
        if (res.status == 500) {
            console.log("Something went wrong")
            return
        }
        return res.status
    } catch (error) {
        console.log(error)
    }
}

// Get all analysis from the server
const getAllData = async (url = '') => {
    const response = await fetch(baseUrl + url)
    try {
        const allData = await response.json()
        console.log(allData)
        return allData
    } catch (error) {
        console.log(error)
    }
}

// Updates the Ui with the new search
function updateUi(data) {
    resultList.innerHTML = ''
    for (let card of data) {
        const text = card.text
        let classification = ''
        let lang = ''
        let tags = `<div class="result-hastags"><strong>Hashtags: </strong>`
        for (let res of card.results) {
            if (res.endpoint == "classify") {
                classification = res.result.categories[0].label
                lang = res.result.language
            } else {
                if (res.result.hashtags.length) {
                    for (let tag of res.result.hashtags) {
                        tags = `${tags}<span class="hastag-tag">${tag}</span>`
                    }
                    tags = `${tags}</div>`
                } else {
                    tags = ''
                }
            }
        }
        const content = `<div class="result-card" ><p>${text}</p>
                <div class="result-language"><strong>Language: </strong>${lang.toUpperCase()}</div>
                ${tags}
                <div class="result-classification"><strong>Classification: </strong>${classification}</div>
                </div>`
        resultList.insertAdjacentHTML('afterbegin', content);
    }

}

function updateUrlUi(data) {
    console.log('url check', data);
    resultUrl.innerHTML = ''
    for (let url of data ) {
        const content = `<div class="result-card" ><p><strong>Url: </strong>${url.text}</p>
        <div><strong>Polarity: </strong>${url.polarity}</div>
        <div><strong>Subjectivity: </strong>${url.subjectivity}</div>
        </div>`
        resultUrl.insertAdjacentHTML('afterbegin', content)
    }
    
}




// Exporting handling submit to be imported in index.js
export { handleSubmit, getAllData }
