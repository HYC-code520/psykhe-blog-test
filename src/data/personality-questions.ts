import type { SurveyAnswer, SurveyQuestion } from '~/types/personality-test/survey-question';

const agreeOne: SurveyAnswer[] = [
  {
    id: 1,
    text: 'Strongly agree'
  },
  {
    id: 2,
    text: 'Agree'
  },
  {
    id: 3,
    text: 'Somewhat - neutral'
  },
  {
    id: 4,
    text: 'Disagree'
  },
  {
    id: 5,
    text: 'Strongly disagree'
  }
];

const agreeFive: SurveyAnswer[] = [
  {
    id: 5,
    text: 'Strongly agree'
  },
  {
    id: 4,
    text: 'Agree'
  },
  {
    id: 3,
    text: 'Somewhat - neutral'
  },
  {
    id: 2,
    text: 'Disagree'
  },
  {
    id: 1,
    text: 'Strongly disagree'
  }
];

export const SurveyQuestions: SurveyQuestion[] = [
  // O
  {
    id: 1,
    quality: 'O',
    text: 'I am original and creative, often coming up with new ideas.',
    answers: agreeFive
  },
  {
    id: 2,
    quality: 'O',
    text: 'I avoid philosophical or theoretical discussions.',
    answers: agreeOne
  },
  {
    id: 3,
    quality: 'O',
    text: 'I am unconventional, and unsure if I believe in marriage.',
    answers: agreeFive
  },
  {
    id: 4,
    quality: 'O',
    text: 'I tend to vote for conservative political candidates.',
    answers: agreeOne
  },
  {
    id: 5,
    quality: 'O',
    text: 'I have many artistic interests.',
    answers: agreeFive
  },
  // C
  {
    id: 6,
    quality: 'C',
    text: 'I tend to be disorganized and often forget to put things back in their proper place.',
    answers: agreeOne
  },
  {
    id: 7,
    quality: 'C',
    text: 'I work hard.',
    answers: agreeFive
  },
  {
    id: 8,
    quality: 'C',
    text: 'I sometimes behave irresponsibly.',
    answers: agreeOne
  },
  {
    id: 9,
    quality: 'C',
    text: 'I have difficulty starting or finishing tasks.',
    answers: agreeOne
  },
  {
    id: 10,
    quality: 'C',
    text: 'I strive for high achievement in life.',
    answers: agreeFive
  },
  // E
  {
    id: 11,
    quality: 'E',
    text: 'I am talkative.',
    answers: agreeFive
  },
  {
    id: 12,
    quality: 'E',
    text: 'I prefer to have others lead and take charge.',
    answers: agreeOne
  },
  {
    id: 13,
    quality: 'E',
    text: 'I am sometimes shy, or introverted.',
    answers: agreeOne
  },
  {
    id: 14,
    quality: 'E',
    text: 'I often stay out way later than planned if the conversation is good and drinks are flowing.',
    answers: agreeFive
  },
  {
    id: 15,
    quality: 'E',
    text: 'I get very excited about life and am eager to make plans.',
    answers: agreeFive
  },
  // A
  {
    id: 16,
    quality: 'A',
    text: 'I have an assertive personality, I am not afraid to ask for what I want.',
    answers: agreeOne
  },
  {
    id: 17,
    quality: 'A',
    text: 'I always assume the best about people.',
    answers: agreeFive
  },
  {
    id: 18,
    quality: 'A',
    text: 'I tend to find fault with others.',
    answers: agreeOne
  },
  {
    id: 19,
    quality: 'A',
    text: 'I am nice, I treat all people with respect.',
    answers: agreeFive
  },
  {
    id: 20,
    quality: 'A',
    text: 'I can be rude sometimes.',
    answers: agreeOne
  },
  // N
  {
    id: 21,
    quality: 'N',
    text: 'I have a soft heart, and am compassionate.',
    answers: agreeFive
  },
  {
    id: 22,
    quality: 'N',
    text: 'I tend to worry a lot.',
    answers: agreeFive
  },
  {
    id: 23,
    quality: 'N',
    text: 'I can be tense.',
    answers: agreeFive
  },
  {
    id: 24,
    quality: 'N',
    text: 'I have an extreme personality, I do little in moderation.',
    answers: agreeFive
  },
  {
    id: 25,
    quality: 'N',
    text: 'I am relaxed, I handle stress well.',
    answers: agreeOne
  }
];
