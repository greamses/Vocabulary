const OPTIONS = ['there', 'their', "they're"];

// Each passage has 3 blanks.
// `correct`  = the right homophone for that gap.
// `displayed` = the wrong homophone shown at the start (must differ from correct,
//               and all three displayed values within a passage are distinct).
const passages = [
  {
    template: "The students forgot {0} pencils at home. I heard {1} going to borrow some. Please put the extras over {2}.",
    blanks: [
      { displayed: "they're", correct: "their"  },
      { displayed: "there",   correct: "they're" },
      { displayed: "their",   correct: "there"   }
    ]
  },
  {
    template: "The twins left {0} coats on the bench. You can sit over {1} in the shade. I think {2} ready to go home.",
    blanks: [
      { displayed: "there",   correct: "their"   },
      { displayed: "they're", correct: "there"   },
      { displayed: "their",   correct: "they're" }
    ]
  },
  {
    template: "I think {0} the nicest family on the street. Have you seen {1} new house? It is somewhere over {2}.",
    blanks: [
      { displayed: "their",   correct: "they're" },
      { displayed: "there",   correct: "their"   },
      { displayed: "they're", correct: "there"   }
    ]
  },
  {
    template: "The players know {0} going to win the cup. Look over {1} at the scoreboard. The coach praised {2} teamwork.",
    blanks: [
      { displayed: "there",   correct: "they're" },
      { displayed: "their",   correct: "there"   },
      { displayed: "they're", correct: "their"   }
    ]
  },
  {
    template: "My friend lives over {0} on Oak Street. I borrowed {1} bicycle yesterday. I think {2} still at the park.",
    blanks: [
      { displayed: "their",   correct: "there"   },
      { displayed: "they're", correct: "their"   },
      { displayed: "there",   correct: "they're" }
    ]
  }
];

let currentPassage = null;
let lastIndex = -1;

function pickPassage() {
  let idx;
  do {
    idx = Math.floor(Math.random() * passages.length);
  } while (passages.length > 1 && idx === lastIndex);
  lastIndex = idx;
  return passages[idx];
}

function renderPassage(passage) {
  const passageEl = document.getElementById('passage');
  passageEl.innerHTML = '';

  // Split template on {0}, {1}, {2} markers
  const parts = passage.template.split(/\{(\d+)\}/);

  parts.forEach(part => {
    if (/^\d+$/.test(part)) {
      const idx = parseInt(part);
      const blank = passage.blanks[idx];

      const select = document.createElement('select');
      select.className = 'word-select';
      select.dataset.index = idx;

      OPTIONS.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt;
        option.textContent = opt;
        if (opt === blank.displayed) option.selected = true;
        select.appendChild(option);
      });

      passageEl.appendChild(select);
    } else {
      passageEl.appendChild(document.createTextNode(part));
    }
  });
}

function submit() {
  const selects = document.querySelectorAll('.word-select');
  let score = 0;

  selects.forEach(select => {
    const idx = parseInt(select.dataset.index);
    const correct = currentPassage.blanks[idx].correct;
    const isCorrect = select.value === correct;

    select.disabled = true;
    select.classList.add(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) score++;
  });

  const messages = [
    "Keep practising — you'll get there!",
    "Good try — one more round!",
    "Almost there — well done!",
    "Perfect score — you are the Grammar Police!"
  ];

  const scoreText = document.getElementById('scoreText');
  scoreText.textContent = `${score} / 3 — ${messages[score]}`;

  document.getElementById('submitBtn').hidden = true;
  document.getElementById('result').hidden = false;
}

function startGame() {
  currentPassage = pickPassage();
  renderPassage(currentPassage);
  document.getElementById('result').hidden = true;
  document.getElementById('submitBtn').hidden = false;
}

document.getElementById('submitBtn').addEventListener('click', submit);
document.getElementById('retryBtn').addEventListener('click', startGame);

startGame();
