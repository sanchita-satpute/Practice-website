document.addEventListener('DOMContentLoaded', () => {
  const moodImages = document.querySelectorAll('.emojis img');
  const noteInput = document.getElementById('note');
  const saveButton = document.getElementById('save-btn');
  const resetButton = document.getElementById('reset-btn');
  const moodResult = document.querySelector('.lastpara');
  const saveMessage = document.querySelector('.last');
  const body = document.body;

  const moods = ['happy', 'sad', 'angry', 'tired', 'exhausted'];
  let selectedMood = null;
  const today = new Date().toLocaleDateString();

  // Helper function
  function setMoodBackground(mood) {
    body.classList.remove(...moods);
    if (mood) {
      body.classList.add(mood);
    }
  }

  // Load today’s mood if exists
  const storedData = JSON.parse(localStorage.getItem('moodData')) || {};
  if (storedData[today]) {
    const { mood, note } = storedData[today];
    selectedMood = mood;
    noteInput.value = note;
    setMoodBackground(mood);
    moodResult.innerHTML = `<h3>Your Mood: ${mood}</h3>`;
    saveMessage.innerHTML = `<p>Your mood has been saved!</p>`;
  }

  // Emoji click handler
  moodImages.forEach(img => {
    img.addEventListener('click', () => {
      moodImages.forEach(i => i.classList.remove('selected'));
      img.classList.add('selected');
      selectedMood = img.dataset.mood;
      setMoodBackground(selectedMood);
    });
  });

  // Save mood
  saveButton.addEventListener('click', () => {
    if (!selectedMood) {
      alert('Please select a mood.');
      return;
    }

    const note = noteInput.value;
    storedData[today] = { mood: selectedMood, note };
    localStorage.setItem('moodData', JSON.stringify(storedData));

    moodResult.innerHTML = `<h3>Your Mood: ${selectedMood}</h3>`;
    saveMessage.innerHTML = `<p>Your mood has been saved!</p>`;
  });

  // Reset mood
  resetButton.addEventListener('click', () => {
    delete storedData[today];
    localStorage.setItem('moodData', JSON.stringify(storedData));
    selectedMood = null;
    noteInput.value = '';
    moodImages.forEach(i => i.classList.remove('selected'));
    body.classList.remove(...moods);
    moodResult.innerHTML = '';
    saveMessage.innerHTML = '';
    alert('Mood reset for today!');
  });
});
