# Playwright TypeScript Automation Framework with Page Object Model (POM)

## Introduction

This repository contains an automation framework developed using Playwright and TypeScript, following the Page Object Model (POM) design pattern. The framework aims to provide a scalable, maintainable, and reliable solution for automating web application testing.

## Features

- **Page Object Model (POM):** Organized using the Page Object Model design pattern, promoting code reusability, readability, and maintenance.

- **Playwright:** Utilizes Playwright, a powerful library for browser automation, offering cross-browser support and rich functionality.

- **TypeScript:** Developed using TypeScript for strong typing, enhanced code quality, and improved developer experience.

- **Test Suite Organization:** Test suites are logically organized for easy navigation and execution.

- **Configurable:** Highly configurable through configuration files, allowing customization of browsers, environments, and other settings.

## Getting Started

### URL

The URL for accessing the application is [https://www.saucedemo.com/]

### Prerequisites

Before running the tests, ensure you have the following installed:

- Node.js
- Playwright
- TypeScript

### Installation

1. Clone this repository to your local machine:

git clone <git@github.com:nikhilgangwar/Playwright-ts-Project.git>

2. Navigate to the project directory:

cd <project-directory> (i.e. your project directory where you want to install the Wdio project)

3. Install dependencies:

npm install

### Configuration

1. Customize configuration files (`tsconfig.json`, `playwright.config.ts`, etc.) as per your requirements. Update browser configurations, test suites, and other settings.

2. Add necessary environment configurations if required.

## Credentials Management

### Local Execution

For local execution of the tests, credentials are stored in a `.env` file. You will need to create a `.env` file in the root directory of the project and provide the necessary credentials in the following format:

STANDARDUSER=

LOCKEDUSER=

PERFORMANCEGLITCHUSER=

PROBLEMUSER=

PASSWORD=

Ensure that you include the `.env` file in your `.gitignore` to prevent accidentally committing sensitive information.

### Continuous Integration (CI) Pipeline

For the CI pipeline, credentials are stored as environment variables. These variables should be configured within your CI/CD platform (e.g., azure devops, github actions, Jenkins) to maintain security and confidentiality. Avoid hardcoding credentials directly in the CI configuration files and utilize the platform's secure storage options for sensitive data.

### Running Tests

Execute the following command to run the tests:

npm test

### Writing Tests

1. Create new test files under the `tests` directory.

2. Utilize the Page Object Model by creating page objects under the `page-objects` directory.

3. Keep test data under the `test-data` directory.

4. Write test cases using Playwright API, utilizing the created page objects.

## Contributors

- [Nikhil Gangwar]

## License

This project is licensed under the [MIT License](LICENSE).
