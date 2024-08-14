const flashcard = document.getElementById('flashcard');
const cardImage = document.getElementById('cardImage');
const cardWord = document.getElementById('cardWord');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const flashcards = [
  { image: 'image1.jpg', word: 'Dolphin' },
  { image: 'image2.jpg', word: 'Turtle' },
  { image: 'image3.jpg', word: 'Shark' },
  { image: 'image4.jpg', word: 'Jellyfish' },
  { image: 'image5.jpg', word: 'Clownfish' },
  { image: 'image6.jpg', word: 'Starfish' },
  { image: 'image7.jpg', word: 'Crab' },
  { image: 'image8.jpg', word: 'Seahorse' },
  { image: 'image9.jpg', word: 'Puffer fish' },
  { image: 'image10.jpg', word: 'Squid' },
];

let currentCard = 0;

function updateFlashcard() {
  cardImage.src = flashcards[currentCard].image;
  cardWord.textContent = flashcards[currentCard].word;
  prevBtn.disabled = currentCard === 0;
  nextBtn.disabled = currentCard === flashcards.length - 1;
}

flashcard.addEventListener('click', () => {
  flashcard.classList.toggle('flipped');
});

prevBtn.addEventListener('click', () => {
  flashcard.classList.remove('flipped');
  setTimeout(() => {
    if (currentCard > 0) {
      currentCard--;
      updateFlashcard();
    }
  }, 200)

});

nextBtn.addEventListener('click', () => {
  flashcard.classList.remove('flipped');
  setTimeout(() => {

    if (currentCard < flashcards.length - 1) {
      currentCard++;
      updateFlashcard();
    }
  }, 200)
});

updateFlashcard();