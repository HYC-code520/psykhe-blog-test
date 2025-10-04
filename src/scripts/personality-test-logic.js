// Main JavaScript logic extracted from big-5-personality-test.astro
// Import trait content - this will be loaded separately
// import { traitContent } from './trait-content-data.js';

// This will reference the global traitContent from window
function getTraitContent() {
  return window.traitContent || {};
}

// Global state - will be initialized by the Astro page
const state = {
  disclaimerShown: false,
  currentSurveyIndex: 0,
  currentVisualIndex: 0,
  userInfoStep: false,
  firstName: '',
  lastName: '',
  email: '',
  retailerNames: '',
  optInUpdate: false,
  optInParticipateInRetails: false,
  agreedToTerms: false,
  selectedMobileTrait: 'openness',
  activeTabIndex: 0,
  ocean: { O: -1, C: -1, E: -1, A: -1, N: -1 },
  surveyResponses: [],
  visualResponses: [],
  showTraitHint: false,
  animatedProgress: 0
};

// These will be set by the Astro page
let surveyQuestions = [];
let visualQuestions = [];

// Initialize function to be called from Astro page
function initializePersonalityTest(surveyData, visualData) {
  surveyQuestions = surveyData;
  visualQuestions = visualData;
  
  // Initialize response arrays with correct lengths
  state.surveyResponses = Array(surveyQuestions.length).fill(null);
  state.visualResponses = Array(visualQuestions.length).fill(null).map(() => []);
}

// Initialize flip counter
function initFlipCounter() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
  const diffMs = now.getTime() - startOfYear.getTime();
  const minutes = Math.floor(diffMs / 60000);
  const count = Math.floor(230000 + minutes / 15);
  const counterElement = document.getElementById('counter-value');
  if (counterElement) {
    counterElement.textContent = count.toLocaleString();
  }
}

// Section management
function getCurrentSection() {
  if (state.currentSurveyIndex < surveyQuestions.length) return 'survey';
  if (state.currentVisualIndex < visualQuestions.length) return 'visual';
  if (!state.userInfoStep) return 'userInfo';
  return 'complete';
}

function getCompletedQuestions() {
  return state.currentSurveyIndex + state.currentVisualIndex;
}

function getTotalQuestions() {
  return surveyQuestions.length + visualQuestions.length;
}

function canNavigateNext() {
  const section = getCurrentSection();
  if (section === 'survey') {
    return state.surveyResponses[state.currentSurveyIndex] !== null;
  }
  if (section === 'visual') {
    const visualResponse = state.visualResponses[state.currentVisualIndex];
    return Array.isArray(visualResponse) && visualResponse.length > 0;
  }
  return false;
}

function isFirstQuestion() {
  return state.currentSurveyIndex === 0 && state.currentVisualIndex === 0;
}

// Test flow functions
function startTest() {
  state.disclaimerShown = true;
  document.getElementById('disclaimer-screen').style.display = 'none';
  document.getElementById('test-screen').style.display = 'block';
  showCurrentSection();
  updateProgress();
}

function showCurrentSection() {
  // Hide all sections
  document.getElementById('survey-section').style.display = 'none';
  document.getElementById('visual-section').style.display = 'none';
  document.getElementById('user-info-section').style.display = 'none';
  document.getElementById('results-section').style.display = 'none';

  const section = getCurrentSection();
  
  if (section === 'survey') {
    document.getElementById('survey-section').style.display = '';
    showSurveyQuestion();
  } else if (section === 'visual') {
    document.getElementById('visual-section').style.display = '';
    showVisualQuestion();
  } else if (section === 'userInfo') {
    document.getElementById('user-info-section').style.display = '';
    document.getElementById('progress-container').style.display = 'none';
    document.getElementById('bottom-progress').style.display = 'none';
  } else if (section === 'complete') {
    document.getElementById('results-section').style.display = '';
    document.getElementById('progress-container').style.display = 'none';
    document.getElementById('bottom-progress').style.display = 'none';
    showResults();
  }

  updateNavigation();
}

function showSurveyQuestion() {
  const question = surveyQuestions[state.currentSurveyIndex];
  const completed = getCompletedQuestions();
  const total = getTotalQuestions();

  document.getElementById('question-indicator').textContent = `Question ${completed + 1} of ${total}`;
  document.getElementById('question-text').textContent = question.text;
  const form = document.getElementById('survey-form');
  form.innerHTML = question.answers.map(answer => `
    <div class="survey-question-answer survey-answer mb-0 sm:mb-1 md:mb-3 ${state.surveyResponses[state.currentSurveyIndex] === answer.id ? 'survey-question-answer-selected' : ''}">
      <input
        id="survey-${question.id}-${answer.id}"
        type="radio"
        value="${answer.id}"
        ${state.surveyResponses[state.currentSurveyIndex] === answer.id ? 'checked' : ''}
      />
      <label for="survey-${question.id}-${answer.id}" class="block w-full py-4 px-5 sm:max-w-[60%] sm:mx-auto md:max-w-none md:mx-0 text-center border border-black bg-white hover:bg-gradient-to-r hover:from-green-400 hover:to-blue-500 hover:text-white transition-all duration-150 cursor-pointer" onclick="selectSurveyAnswer(${answer.id})">
        <span class="block w-full text-center">${answer.text}</span>
      </label>
    </div>
  `).join('');

  updateQuestionCircleProgress();
}

function showVisualQuestion() {
  const question = visualQuestions[state.currentVisualIndex];
  const completed = getCompletedQuestions();
  const total = getTotalQuestions();

  document.getElementById('visual-question-indicator').textContent = `Question ${completed + 1} of ${total}`;
  document.getElementById('visual-question-text').textContent = question.text;

  const form = document.getElementById('visual-form');
  form.innerHTML = question.answers.map(answer => `
    <div class="survey-question-answer mb-0 sm:mb-2 md:mb-3.5 ${state.visualResponses[state.currentVisualIndex].includes(answer.id) ? 'survey-question-answer-selected' : ''}">
      <label for="visual-${question.id}-${answer.id}" class="flex items-center w-full py-3 px-5 sm:max-w-[60%] sm:mx-auto md:max-w-none md:mx-0 border border-black bg-white hover:bg-gradient-to-r hover:from-green-400 hover:to-blue-500 hover:text-white transition-all duration-150 cursor-pointer min-h-[60px] max-h-[60px] ${question.id === 104 ? 'min-h-[80px] max-h-[80px] py-4' : ''}">
        <input
          id="visual-${question.id}-${answer.id}"
          type="checkbox"
          value="${answer.id}"
          class="visual-checkbox mr-4 w-5 h-5 flex-shrink-0"
          ${state.visualResponses[state.currentVisualIndex].includes(answer.id) ? 'checked' : ''}
          onchange="toggleVisualAnswer(${answer.id})"
        />
        ${answer.icon ? `<img src="${answer.icon}" alt="${answer.text}" class="w-14 h-14 rounded-full object-cover ml-4 mr-3 flex-shrink-0" />` : ''}
        <span class="flex-1 text-left text-sm leading-tight">${answer.text}</span>
      </label>
    </div>
  `).join('');

  updateQuestionCircleProgress();
}

function selectSurveyAnswer(answerId) {
  state.surveyResponses[state.currentSurveyIndex] = answerId;
  showSurveyQuestion(); // Refresh to show selection
  
  setTimeout(() => {
    if (state.currentSurveyIndex < surveyQuestions.length - 1) {
      navigateNext();
    } else if (canNavigateNext()) {
      navigateNext();
    }
  }, 300);
}

function toggleVisualAnswer(answerId) {
  const responses = state.visualResponses[state.currentVisualIndex];
  const index = responses.indexOf(answerId);
  
  if (index > -1) {
    responses.splice(index, 1);
  } else {
    responses.push(answerId);
  }
  
  showVisualQuestion(); // Refresh to show selection
  updateNavigation();
}

// Progress animation function
function animateProgress(targetProgress, currentProgress, callback) {
  const duration = 600; // 600ms animation duration
  const startTime = performance.now();
  const startProgress = currentProgress;

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out cubic easing function
    const easeOutCubic = 1 - (1 - progress) ** 3;

    const newProgress = startProgress + (targetProgress - startProgress) * easeOutCubic;
    
    // Update the progress value
    callback(newProgress);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      // Ensure final value is exact
      callback(targetProgress);
    }
  };

  requestAnimationFrame(animate);
}

// Enhanced progress update with smooth animation
function updateQuestionCircleProgress() {
  const targetProgress = (getCompletedQuestions() / getTotalQuestions()) * 100;
  const circles = document.querySelectorAll('.question-circle');
  
  if (circles.length === 0) return;
  
  // Get current progress from the first circle
  const currentProgress = parseFloat(circles[0].style.getPropertyValue('--progress') || '0');
  
  // Animate to target progress
  animateProgress(targetProgress, currentProgress, (newProgress) => {
    circles.forEach(circle => {
      circle.style.setProperty('--progress', newProgress);
    });
  });
}

function updateProgress() {
  const progress = (getCompletedQuestions() / getTotalQuestions()) * 100;
  const progressElements = document.querySelectorAll('.progress-fill');
  progressElements.forEach(el => {
    el.style.width = `${progress}%`;
  });
}

function updateNavigation() {
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  
  // Show/hide previous button
  if (prevBtn) prevBtn.style.display = isFirstQuestion() ? 'none' : 'block';
  
  // Always show next button, but enable/disable it based on whether user can proceed
  if (nextBtn) {
    nextBtn.style.display = 'block';
    nextBtn.disabled = !canNavigateNext();
  }
}

function navigateNext() {
  if (!canNavigateNext()) return;

  const section = getCurrentSection();
  if (section === 'survey') {
    state.currentSurveyIndex++;
  } else if (section === 'visual') {
    state.currentVisualIndex++;
  }

  showCurrentSection();
  updateProgress();
}

function navigatePrevious() {
  const section = getCurrentSection();
  
  if (section === 'visual') {
    if (state.currentVisualIndex > 0) {
      state.currentVisualIndex--;
    } else if (surveyQuestions.length > 0) {
      state.currentSurveyIndex = surveyQuestions.length - 1;
    }
  } else if (section === 'survey') {
    if (state.currentSurveyIndex > 0) {
      state.currentSurveyIndex--;
    }
  } else if (section === 'userInfo') {
    if (visualQuestions.length > 0) {
      state.currentVisualIndex = visualQuestions.length - 1;
    }
  }

  showCurrentSection();
  updateProgress();
}

// User info functions
function validateUserInfoForm(showHint = false) {
  const firstName = document.getElementById('firstName');
  const email = document.getElementById('email');
  const termsConsent = document.getElementById('termsConsent');
  
  const isValid = firstName.value.trim() && 
                  email.value.trim() && 
                  isValidEmail(email.value) && 
                  termsConsent.checked;
  
  // Only show validation hint if explicitly requested (on submit)
  if (showHint) {
    showValidationHint(!isValid);
  }
  
  return isValid;
}

function showValidationHint(showHint) {
  let hintDiv = document.querySelector('.form-validation-hint');
  
  if (showHint) {
    if (!hintDiv) {
      hintDiv = document.createElement('div');
      hintDiv.className = 'form-validation-hint';
      
      const form = document.querySelector('.user-info-form');
      const submitButton = document.querySelector('.submit-user-info');
      
      // Insert the hint div right before the submit button
      form.insertBefore(hintDiv, submitButton);
    }
    
    hintDiv.innerHTML = `
      <span class="hint-icon">⚠️</span>
      Please complete the required fields
    `;
    hintDiv.classList.add('show');
  } else if (hintDiv) {
    hintDiv.classList.remove('show');
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function submitUserInfo() {
  // Only show validation hint when user tries to submit
  if (validateUserInfoForm(true)) {
    // Calculate OCEAN scores from survey responses
    calculateOceanScores();
    
    // Get form data
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const retailerNames = document.getElementById('retailerNames').value.trim();
    const optInUpdate = document.getElementById('optInUpdate').checked;
    const optInParticipateInRetails = document.getElementById('optInParticipateInRetails').checked;
    
    // Store user data in state
    state.userData = {
      firstName,
      lastName,
      email,
      retailerNames,
      optInUpdate,
      optInParticipateInRetails
    };
    
    console.log('Form is valid, showing results...', state.ocean);
    
    // Hide user info section and show results
    document.getElementById('user-info-section').style.display = 'none';
    document.getElementById('results-section').style.display = 'block';
    
    // Show the results
    showResults();
  }
}

function calculateOceanScores() {
  const traitScores = { O: [], C: [], E: [], A: [], N: [] };

  surveyQuestions.forEach((question, index) => {
    const response = state.surveyResponses[index];
    if (response !== null) {
      traitScores[question.quality].push(response);
    }
  });

  // Calculate averages and round
  Object.keys(traitScores).forEach(trait => {
    if (traitScores[trait].length > 0) {
      const sum = traitScores[trait].reduce((total, score) => total + score, 0);
      const average = sum / traitScores[trait].length;
      state.ocean[trait] = Math.round(average);
    }
  });
}

// Results functions
function showResults() {
  // Hide navigation controls on results page
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const surveyControls = document.querySelector('.survey-controls');
  
  if (prevBtn) prevBtn.style.display = 'none';
  if (nextBtn) nextBtn.style.display = 'none';
  if (surveyControls) surveyControls.style.display = 'none';
  
  updateProfileTitle();
  updateTraitBars();
  updateDesktopTabs();
  updateCurrentTraitDisplay();
  showTraitHintIfNeeded();
}

function updateProfileTitle() {
  const personalityCode = `${state.ocean.O}${state.ocean.C}${state.ocean.E}${state.ocean.A}${state.ocean.N}`;
  const firstName = state.userData?.firstName || 'there';
  document.getElementById('profile-title').innerHTML = `
    <span>Hi ${firstName},</span> your personality code is ${personalityCode}
    <button
      class="info-popup-trigger"
      onmouseover="showInfoPopup()"
      onmouseleave="hideInfoPopup()"
    ></button>
  `;
}

function updateTraitBars() {
  const traits = [
    { key: 'O', name: 'openness', label: 'OPENNESS' },
    { key: 'C', name: 'conscientiousness', label: 'CONSCIENTIOUSNESS' },
    { key: 'E', name: 'extroversion', label: 'EXTROVERSION' },
    { key: 'A', name: 'agreeableness', label: 'AGREEABLENESS' },
    { key: 'N', name: 'neuroticism', label: 'NEUROTICISM' }
  ];

  const barsHTML = traits.map(trait => `
    <a class="trait-bar ${state.selectedMobileTrait === trait.name ? 'active' : ''}" onclick="selectMobileTrait('${trait.name}')">
      <span class="trait-text">${trait.label}: <b>${state.ocean[trait.key]}</b></span>
      <span class="trait-bar-inner" style="width: ${toPercentage(state.ocean[trait.key])}%; background: linear-gradient(90deg, #0cc0df, #ffde59);"></span>
    </a>
  `).join('');

  document.getElementById('mobile-trait-bars').innerHTML = barsHTML;
}

function updateDesktopTabs() {
  const traits = [
    { key: 'O', name: 'openness', label: 'Openness' },
    { key: 'C', name: 'conscientiousness', label: 'Conscientiousness' },
    { key: 'E', name: 'extroversion', label: 'Extroversion' },
    { key: 'A', name: 'agreeableness', label: 'Agreeableness' },
    { key: 'N', name: 'neuroticism', label: 'Neuroticism' }
  ];

  const tabsHTML = `
    <div class="nav nav-tabs" role="tablist">
      ${traits.map((trait, index) => `
        <div class="nav-item">
          <a class="nav-link ${index === state.activeTabIndex ? 'active' : ''}" onclick="changeTab(${index})">
            <span class="block md:hidden">${trait.label}: <strong>${state.ocean[trait.key]}</strong></span>
            <span class="hidden md:block">${trait.label}: <strong>${state.ocean[trait.key]}</strong></span>
          </a>
        </div>
      `).join('')}
    </div>
    <div class="tab-content">
      <div id="desktop-trait-content" class="tab-pane active">
        <!-- Desktop trait content will be inserted here -->
      </div>
    </div>
  `;

  document.getElementById('desktop-tabs').innerHTML = tabsHTML;
  updateCurrentTraitDisplay();
}

function updateCurrentTraitDisplay() {
  const traits = [
    { key: 'O', name: 'openness' },
    { key: 'C', name: 'conscientiousness' },
    { key: 'E', name: 'extroversion' },
    { key: 'A', name: 'agreeableness' },
    { key: 'N', name: 'neuroticism' }
  ];

  const currentTrait = traits[state.activeTabIndex];
  const score = state.ocean[currentTrait.key];
  const level = toHuman(score);

  // Update photo
  const photoPath = `/media/b2c/personality-test/${currentTrait.name}/${level}.jpg`;
  document.getElementById('result-photo').src = photoPath;
  document.getElementById('photo-label').textContent = `${currentTrait.name.toUpperCase()} ${score}`;

  // Get trait content from global object
  const traitContent = getTraitContent();
  
  // Update trait content for desktop
  const desktopTraitContent = document.getElementById('desktop-trait-content');
  if (desktopTraitContent && traitContent[currentTrait.name] && traitContent[currentTrait.name][level]) {
    const content = traitContent[currentTrait.name][level];
    desktopTraitContent.innerHTML = `
      <div class="profile-trait-section">
        <div class="tab-pane show profile-tab active" role="tabpanel">
          <div class="flex flex-wrap -mx-4">
            <div class="w-full px-4">
              <h3 class="mob-hide-sm trait-title">You scored ${level} on ${currentTrait.name}</h3>
              ${content.paragraphs.map(p => `<p>${p}</p>`).join('')}
            </div>
          </div>
        </div>
        <hr class="border-t border-gray-300 my-4" />
        <div class="legend">
          <span>HIGH = 5</span>
          <span>MODERATE-HIGH = 4</span>
          <span>MODERATE = 3</span>
          <span>MODERATE-LOW = 2</span>
          <span>LOW = 1</span>
        </div>
      </div>
    `;
  } else {
    console.error('Trait content not found for:', currentTrait.name, level, traitContent);
  }

  // Update mobile trait content
  const mobileTraitContent = document.getElementById('mobile-trait-content');
  if (mobileTraitContent) {
    const mobileTrait = traits.find(t => t.name === state.selectedMobileTrait);
    if (mobileTrait && traitContent[mobileTrait.name]) {
      const mobileScore = state.ocean[mobileTrait.key];
      const mobileLevel = toHuman(mobileScore);
      const mobileContent = traitContent[mobileTrait.name][mobileLevel];
      
      if (mobileContent) {
        mobileTraitContent.innerHTML = `
          <div class="profile-trait-section">
            ${mobileContent.paragraphs.map(p => `<p>${p}</p>`).join('')}
            <hr class="border-t border-gray-300 my-4" />
            <div class="legend">
              <span>HIGH = 5</span>
              <span>MODERATE-HIGH = 4</span>
              <span>MODERATE = 3</span>
              <span>MODERATE-LOW = 2</span>
              <span>LOW = 1</span>
            </div>
          </div>
        `;
      }
    }
  }

  // Update mobile header
  document.getElementById('mobile-trait-header').textContent = `${state.selectedMobileTrait.toUpperCase()}: ${getCurrentMobileTraitScore()}`;

  // Update navigation arrow state
  const traitPrevBtn = document.getElementById('trait-prev');
  if (traitPrevBtn) {
    traitPrevBtn.disabled = state.activeTabIndex === 0;
  }
}

function toHuman(score) {
  switch (score) {
    case 1: return 'low';
    case 2: return 'moderate-low';
    case 3: return 'moderate';
    case 4: return 'moderate-high';
    case 5: return 'high';
    default: return 'unknown';
  }
}

function toPercentage(score) {
  switch (score) {
    case 1: return '0';
    case 2: return '25';
    case 3: return '50';
    case 4: return '75';
    case 5: return '100';
    default: return '0';
  }
}

function selectMobileTrait(trait) {
  state.selectedMobileTrait = trait;
  updateTraitBars();
  updateCurrentTraitDisplay();
  dismissTraitHint();
}

function getCurrentMobileTraitScore() {
  switch (state.selectedMobileTrait) {
    case 'openness': return state.ocean.O;
    case 'conscientiousness': return state.ocean.C;
    case 'extroversion': return state.ocean.E;
    case 'agreeableness': return state.ocean.A;
    case 'neuroticism': return state.ocean.N;
    default: return state.ocean.O;
  }
}

function changeTab(index) {
  state.activeTabIndex = index;
  updateDesktopTabs();
  updateCurrentTraitDisplay();
  dismissTraitHint();
}

function navigateTrait(direction) {
  const newIndex = state.activeTabIndex + direction;
  
  if (direction > 0) {
    state.activeTabIndex = newIndex > 4 ? 0 : newIndex;
  } else {
    state.activeTabIndex = newIndex < 0 ? 4 : newIndex;
  }
  
  updateDesktopTabs();
  updateCurrentTraitDisplay();
}

// Action functions
function downloadResults() {
  showNotification('Feature coming soon!');
}

function shareResults() {
  const shareMessage = `Hey! I just took this fascinating Big Five personality test that reveals your unique personality profile. 🧠
It only takes 3 minutes and gives you insights into the 5 key traits psychologists use to understand people and their preferences.
Take the test here: ${window.location.origin}/big-5-personality-test
Let me know what you get! 😊`;

  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(shareMessage)
      .then(() => showNotification('✅ Test link copied to clipboard! Share it with your friends.'))
      .catch(() => fallbackCopyToClipboard(shareMessage));
  } else {
    fallbackCopyToClipboard(shareMessage);
  }
}

function fallbackCopyToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  document.body.appendChild(textArea);
  textArea.select();

  try {
    document.execCommand('copy');
    showNotification('✅ Test link copied to clipboard! Share it with your friends.');
  } catch (_err) {
    showNotification('❌ Failed to copy link. Please try again.');
  } finally {
    document.body.removeChild(textArea);
  }
}

function retakeTest() {
  window.location.reload();
}

function showNotification(message) {
  document.getElementById('notification-text').textContent = message;
  document.getElementById('download-notification').style.display = 'block';
  
  setTimeout(() => {
    document.getElementById('download-notification').style.display = 'none';
  }, 4000);
}

function showInfoPopup() {
  document.getElementById('info-popup').style.display = 'block';
}

function hideInfoPopup() {
  document.getElementById('info-popup').style.display = 'none';
}

function showTraitHintIfNeeded() {
  setTimeout(() => {
    document.getElementById('trait-hint').style.display = 'block';
    
    setTimeout(() => {
      document.getElementById('trait-hint').style.display = 'none';
    }, 15000);
  }, 1500);
}

function dismissTraitHint() {
  document.getElementById('trait-hint').style.display = 'none';
}

function setupFormValidation() {
  const firstName = document.getElementById('firstName');
  const email = document.getElementById('email');
  const termsConsent = document.getElementById('termsConsent');
  
  // Add event listeners but don't show validation hints during interaction
  if (firstName && !firstName.hasAttribute('data-validation-setup')) {
    // Remove validation from input events - only validate silently for internal state
    firstName.addEventListener('input', () => validateUserInfoForm(false));
    firstName.addEventListener('blur', () => validateUserInfoForm(false));
    firstName.setAttribute('data-validation-setup', 'true');
  }
  
  if (email && !email.hasAttribute('data-validation-setup')) {
    email.addEventListener('input', () => validateUserInfoForm(false));
    email.addEventListener('blur', () => validateUserInfoForm(false));
    email.setAttribute('data-validation-setup', 'true');
  }
  
  if (termsConsent && !termsConsent.hasAttribute('data-validation-setup')) {
    termsConsent.addEventListener('change', () => validateUserInfoForm(false));
    termsConsent.setAttribute('data-validation-setup', 'true');
  }
  
  // Don't run any initial validation
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initFlipCounter();
  
  // Set up form validation when user info section becomes visible
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
        const userInfoSection = document.getElementById('user-info-section');
        if (userInfoSection && userInfoSection.style.display !== 'none') {
          setupFormValidation();
        }
      }
    });
  });
  
  const userInfoSection = document.getElementById('user-info-section');
  if (userInfoSection) {
    observer.observe(userInfoSection, { attributes: true });
  }
  
  // Also set up validation immediately if the section is already visible
  if (userInfoSection && userInfoSection.style.display !== 'none') {
    setupFormValidation();
  }
});

// Make functions globally available
window.startTest = startTest;
window.navigateNext = navigateNext;
window.navigatePrevious = navigatePrevious;
window.selectSurveyAnswer = selectSurveyAnswer;
window.toggleVisualAnswer = toggleVisualAnswer;
window.submitUserInfo = submitUserInfo;
window.selectMobileTrait = selectMobileTrait;
window.changeTab = changeTab;
window.navigateTrait = navigateTrait;
window.downloadResults = downloadResults;
window.shareResults = shareResults;
window.retakeTest = retakeTest;
window.showInfoPopup = showInfoPopup;
window.hideInfoPopup = hideInfoPopup;
window.dismissTraitHint = dismissTraitHint;
window.initializePersonalityTest = initializePersonalityTest;
