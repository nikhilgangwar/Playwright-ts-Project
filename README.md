Playwright Automation Project
Overview
This project utilizes Playwright, a powerful automation tool for web browsers, to automate the testing and interaction with web applications. It provides a framework for writing robust, maintainable, and scalable automated tests for web applications.

Installation
Clone this repository to your local machine.
Install Node.js if you haven't already: Node.js.
Navigate to the project directory in your terminal.
Run npm install to install the necessary dependencies.
Getting Started
Ensure you have Playwright installed globally by running npm install -g playwright.
Configure your environment variables, such as the target URL, browser type, and any other necessary settings. You can do this by creating a .env file and adding your variables there.
Write your test scripts in the tests/ directory using the Playwright API. Refer to the Playwright documentation for guidance.
Run your tests using the command npm test. This will execute all tests defined in the tests/ directory.
Directory Structure
tests/: Contains test scripts written using Playwright.
page-objects/: Contains utility functions or modules used across tests.
config/: Contains configuration for different environments
screenshots/: Automatically generated screenshots for failed tests.
test-data/: Contains test test data for automation tests
playwright-report/: Contains test execution report for the Playwright test execution

.env: Environment variables configuration file. Contains all the secrets, username, passwords and tokens.
Contributing
Fork this repository.
Create a new branch for your feature or bug fix: git checkout -b feature/your-feature.
Make your changes and commit them: git commit -am 'Add new feature'.
Push to your branch: git push origin feature/your-feature.
Submit a pull request detailing your changes.
License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgements
Playwright: https://playwright.dev/
Node.js: https://nodejs.org/

Contact
For any inquiries or feedback, please contact [nikhilgangwar23@gmail.com].
