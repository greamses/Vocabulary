const OPTIONS = ['there', 'their', "they're"];

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

function closeAllDropdowns() {
  document.querySelectorAll('.word-dropdown.open').forEach(d => d.classList.remove('open'));
}

function createDropdown(idx, displayed) {
  const wrapper = document.createElement('div');
  wrapper.className = 'word-dropdown';
  wrapper.dataset.index = idx;
  wrapper.dataset.value = displayed;

  const trigger = document.createElement('button');
  trigger.className = 'dropdown-trigger';
  trigger.type = 'button';

  const label = document.createElement('span');
  label.className = 'dropdown-label';
  label.textContent = displayed;

  const arrow = document.createElement('span');
  arrow.className = 'dropdown-arrow';
  arrow.textContent = '▾';

  trigger.appendChild(label);
  trigger.appendChild(arrow);

  const menu = document.createElement('ul');
  menu.className = 'dropdown-menu';

  OPTIONS.forEach(opt => {
    const li = document.createElement('li');
    li.textContent = opt;
    li.dataset.value = opt;
    if (opt === displayed) li.classList.add('selected');

    li.addEventListener('click', e => {
      e.stopPropagation();
      wrapper.dataset.value = opt;
      label.textContent = opt;
      menu.querySelectorAll('li').forEach(item => item.classList.remove('selected'));
      li.classList.add('selected');
      wrapper.classList.remove('open');
    });

    menu.appendChild(li);
  });

  trigger.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = wrapper.classList.contains('open');
    closeAllDropdowns();
    if (!isOpen) wrapper.classList.add('open');
  });

  wrapper.appendChild(trigger);
  wrapper.appendChild(menu);
  return wrapper;
}

function renderPassage(passage) {
  const passageEl = document.getElementById('passage');
  passageEl.innerHTML = '';

  const parts = passage.template.split(/\{(\d+)\}/);

  parts.forEach(part => {
    if (/^\d+$/.test(part)) {
      const idx = parseInt(part);
      passageEl.appendChild(createDropdown(idx, passage.blanks[idx].displayed));
    } else {
      passageEl.appendChild(document.createTextNode(part));
    }
  });
}

function submit() {
  closeAllDropdowns();

  const dropdowns = document.querySelectorAll('.word-dropdown');
  let score = 0;

  dropdowns.forEach(dropdown => {
    const idx = parseInt(dropdown.dataset.index);
    const correct = currentPassage.blanks[idx].correct;
    const isCorrect = dropdown.dataset.value === correct;

    dropdown.classList.add(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) score++;
  });

  const messages = [
    "Keep practising — you'll get there!",
    "Good try — one more round!",
    "Almost there — well done!",
    "Perfect score — you are the Grammar Police!"
  ];

  document.getElementById('scoreText').textContent = `${score} / 3 — ${messages[score]}`;
  document.getElementById('submitBtn').hidden = true;
  document.getElementById('result').hidden = false;
}

function startGame() {
  currentPassage = pickPassage();
  renderPassage(currentPassage);
  document.getElementById('result').hidden = true;
  document.getElementById('submitBtn').hidden = false;
}

document.addEventListener('click', closeAllDropdowns);
document.getElementById('submitBtn').addEventListener('click', submit);
document.getElementById('retryBtn').addEventListener('click', startGame);

startGame();
