
const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(json => displayLessons(json.data))

};

const removeActive = () => {
    const lessonButtons = document.getElementsByClassName('lesson-btn');
    for(let btn of lessonButtons){
        btn.classList.remove('active');
    }
};


const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        clickBtn.classList.add('active');
        displayLevelWord(data.data)
    })
};

const loadWordDetail = async(id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
}

const displayWordDetails = (word) => {
    console.log(word);
    const detailsBox = document.getElementById('details-container');
    detailsBox.innerHTML = `<h3 class="font-bold text-lg mb-3">${word.word}</h3>`;
    

}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";

    if(words.length == 0){
        wordContainer.innerHTML = ` <div id="default-word-message" class="text-center col-span-full rounded py-10" style="display:block;">
          <p class="font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
          <p class="text-2xl font-bold font-bangla">নেক্সট Lesson এ যান</p>
        </div>`;
        return;
    }
    
    for(let word of words){
        const card = document.createElement('div');
        
        card.innerHTML = ` 
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
        <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
        <p class="font-semibold">Meaning/Pronounciation</p>
        <div class="font-bangla text-2xl font-medium">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি" } / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"  } "</div>
        <div class="flex justify-between items-center">
         <button onclick="loadWordDetail(${word.id})" class="bg-gray-100 p-2 rounded-l"><i class="fa-solid fa-circle-info"></i></button>
         
         <button class="bg-gray-100 p-2 rounded-l"><i class="fa-solid fa-volume-high "></i></button>

        </div>

      </div>`
      
        wordContainer.appendChild(card);
        
    }
};



const displayLessons = (lessons) => {
// get the container and empty
const levelContainer = document.getElementById('level-container');
levelContainer.innerHTML = '';
// get into every lessons
for(let lesson of lessons){
// create element
const btnDiv = document.createElement('div');
btnDiv.innerHTML = `<button id="lesson-btn-${lesson.level_no}" onclick= "loadLevelWord(${lesson.level_no})" class="btn btn-outline  btn-primary lesson-btn"><i class="fa-solid fa-book-open "></i>Lesson - ${lesson.level_no} </button>`;
// append into container
levelContainer.appendChild(btnDiv);
}

};


loadLessons();

