export interface ProfilePreferenceQuestion {
  id: number;
  text: string;
  heading?: string;
  subheading?: string;
  preference: string;
  answers: ProfilePreferenceAnswer[];
  responses: ProfilePreferenceResponse[];
}

export interface ProfilePreferenceAnswer {
  id: number;
  title: string;
  details: string;
  value: string;
}

export interface ProfilePreferenceResponse {
  profile_preference_question_id: number;
  profile_preference_question_answer_id?: number;
}
