export const dictionary = {
  greetings: ["Hello", "Good Morning", "Good Evening", "How are you?", "Nice to meet you", "Welcome"],
  daily: ["Yes", "No", "Please", "Thank you", "Sorry", "I'm hungry", "I'm thirsty", "Bathroom", "Water", "Food", "Sleep", "Home", "Work", "School"],
  emergency: ["Help", "Emergency", "Doctor", "Medical", "Pain", "Hurt", "Medicine", "Allergy", "Hospital", "Police", "Fire", "Danger", "Stop"],
  emotions: ["Okay", "Good", "Fine", "Clear", "Repeat", "Underlooked"],
  common: ["Who", "What", "When", "Where", "Why", "How", "Maybe", "Consult", "Wait", "Family", "Friend"]
};

export const allWords = [
  ...dictionary.greetings,
  ...dictionary.daily,
  ...dictionary.emergency,
  ...dictionary.emotions,
  ...dictionary.common
];

// Total count is current 51 words.
