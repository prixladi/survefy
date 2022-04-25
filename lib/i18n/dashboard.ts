const dashboard = {
  title: 'Dashboard',
  surveys: {
    new: {
      title: 'Create New Survey',
      name: 'Survey Name',
      namePlaceholder: 'Enter survey name',
      nameRequired: 'Survey Name is required',
      type: 'Survey Type',
      typeRequired: 'Survey Type is required',
      question: 'Survey Question',
      questionPlaceholder: 'Enter survey question',
      questionRequired: 'Survey Question is required',
      button: 'Create Survey',
      tooManySurveys: 'You have too many surveys. Please delete some to create a new one.',
    },
  },
  surveyTypes: {
    multichoice: 'Multiple Choice',
    input: 'Free Answer',
  }
};

export default dashboard;
