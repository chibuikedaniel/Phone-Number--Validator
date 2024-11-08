const userInput = document.getElementById('user-input');
        const checkBtn = document.getElementById('check-btn');
        const clearBtn = document.getElementById('clear-btn');
        const resultsDiv = document.getElementById('results-div');

        function validatePhoneNumber(phoneNumber) {
            // Remove all whitespace first to make pattern matching easier
            const cleanNumber = phoneNumber.trim();
            
            // Regular expression to match valid US phone number formats
            const phoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})[-\s]?(\d{3})[-\s]?(\d{4})$/;
            
            // Additional checks for invalid formats
            const invalidPatterns = [
                /^\d{1,9}$/, // Less than 10 digits
                /^[2-9]/, // Starts with anything other than 1 or area code
                /^\(\d{3}\)\)/, // Double closing parenthesis
                /\(\d{3}\)\d{3}\)\d{4}/, // Multiple parenthesis groups
                /[a-zA-Z]/, // Contains letters
                /[*&!#]/, // Contains special characters
                /^1[2-9]/, // Country code other than 1
                /^0/, // Starts with 0
                /^-/, // Starts with -
                /^10/, // Starts with 10
                /\(\d{3}$/, // Unclosed parenthesis
                /^\)\d{3}/, // Starting with closing parenthesis
                /\?\)/, // Contains question mark and parenthesis
                /^\d{2}\s\d{2}/, // Invalid grouping of numbers
            ];

            // Check for invalid patterns first
            for (const pattern of invalidPatterns) {
                if (pattern.test(cleanNumber)) {
                    return false;
                }
            }

            // Check if the number matches the valid format
            return phoneRegex.test(cleanNumber);
        }

        function displayResult(input) {
            const isValid = validatePhoneNumber(input);
            resultsDiv.textContent = `${isValid ? 'Valid' : 'Invalid'} US number: ${input}`;
            resultsDiv.className = isValid ? 'valid' : 'invalid';
            resultsDiv.classList.remove('hidden');
        }

        checkBtn.addEventListener('click', () => {
            const input = userInput.value.trim();
            if (!input) {
                alert('Please provide a phone number');
                return;
            }
            displayResult(input);
        });

        clearBtn.addEventListener('click', () => {
            userInput.value = '';
            resultsDiv.textContent = '';
            resultsDiv.className = 'hidden';
        });

        // Add keyboard support for better accessibility
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkBtn.click();
            }
        });