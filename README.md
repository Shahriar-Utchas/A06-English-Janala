## API Endpoints
1. **Get All Levels:**  
   `https://openapi.programming-hero.com/api/levels/all`
2. **Get Words by Levels:**  
   `https://openapi.programming-hero.com/api/level/{id}`
3. **Get Word Details:**  
   `https://openapi.programming-hero.com/api/word/{id}`
4. **Get All Words:**  
   `https://openapi.programming-hero.com/api/words/all`

## Features
  - Displays only the Banner and Footer initially.
  - Reveals sections based on user login status.
  - Displays lesson buttons dynamically from API.
  - Shows words for selected lessons in a card format with pronunciation and meanings.
  - Highlights active lesson button.
  - Displays message if no words are found.
  - Provides detailed modal with pronunciation, example sentences, and synonyms.
  - "Complete Learning" button to close modal.
  - Implements smooth scrolling.
  - Prevents displaying `undefined` or `null` values.
  - Shows appropriate messages when no data is found.
  - Displays a spinner when fetching vocabulary from API.
  - Replaces all default alerts with Sweet Alert notifications.
  - Implements voice pronunciation using the `SpeechSynthesisUtterance` API.




