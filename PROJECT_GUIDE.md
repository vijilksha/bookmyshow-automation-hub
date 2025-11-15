# Test Framework Generator - Project Guide

## Overview

The Test Framework Generator is an AI-powered tool that automatically creates complete test automation frameworks with proper folder structures, Page Object Model (POM) design pattern, 25 comprehensive test cases, and CI/CD pipeline configuration.

## Supported Technologies

1. **Java + Selenium** (Maven + TestNG)
2. **Python + Selenium** (Pytest)
3. **JavaScript + Selenium** (WebdriverIO)
4. **C# + Selenium** (NUnit)
5. **TypeScript + Playwright**
6. **JavaScript + Cypress**

## Features

- ✅ AI-powered framework generation using Lovable AI
- ✅ Page Object Model (POM) architecture
- ✅ 25 comprehensive test cases covering:
  - Login scenarios
  - Search functionality
  - Booking/Purchase flows
  - Navigation testing
  - Form validation
  - Error handling
  - API integration tests
- ✅ Proper folder structure for each technology
- ✅ Jenkins pipeline configuration
- ✅ Base classes and utility functions
- ✅ Configuration management
- ✅ Download as ZIP with complete project structure

## Step-by-Step Instructions

### Step 1: Access the Application

Open the Test Framework Generator in your web browser.

### Step 2: Enter Target Website URL

1. Locate the **"Target Website URL"** input field
2. Enter the full URL of the website you want to test (e.g., `https://www.example.com`)
3. Make sure to include `https://` or `http://` in the URL

**Example URLs:**
- E-commerce: `https://www.amazon.com`
- Booking: `https://www.booking.com`
- Social Media: `https://www.facebook.com`

### Step 3: Select Technology Stack

1. Click on the **"Technology Stack"** dropdown
2. Choose your preferred testing framework:
   - **Java (Maven + TestNG)** - For Java developers using Maven
   - **Python (Pytest)** - For Python developers
   - **JavaScript (WebdriverIO)** - For Node.js developers using Selenium
   - **C# (NUnit)** - For .NET developers
   - **TypeScript (Playwright)** - For modern TypeScript testing
   - **JavaScript (Cypress)** - For end-to-end Cypress testing

### Step 4: Generate Framework

1. Click the **"Generate Framework"** button
2. Wait for the AI to generate your complete framework (usually 15-30 seconds)
3. You'll see a success notification when generation is complete

### Step 5: Review Generated Files

Once generated, you'll see the following sections:

1. **Page Objects** - Page Object Model classes for your website
2. **Test Cases** - 25 comprehensive test cases
3. **Configuration** - Project configuration files (pom.xml, package.json, etc.)
4. **Jenkins Pipeline** - CI/CD pipeline configuration
5. **Base Classes** - Base test classes with setup/teardown
6. **Utilities** - Helper functions and utilities

### Step 6: Download Framework

1. Click the **"Download All Files"** button
2. A ZIP file will be downloaded with the complete project structure
3. Extract the ZIP file to your desired location

## Project Structure by Technology

### Java + Selenium (Maven)
```
project-root/
├── src/
│   ├── main/
│   │   └── java/
│   │       ├── pages/        # Page Object classes
│   │       ├── base/         # Base test classes
│   │       └── utils/        # Utility classes
│   └── test/
│       └── java/
│           └── tests/        # Test cases
├── pom.xml                   # Maven configuration
└── Jenkinsfile              # Jenkins pipeline
```

### Python + Selenium
```
project-root/
├── pages/                    # Page Object classes
├── tests/                    # Test cases
├── base/                     # Base test classes
├── utils/                    # Utility functions
├── requirements.txt          # Python dependencies
└── Jenkinsfile              # Jenkins pipeline
```

### JavaScript + Selenium (WebdriverIO)
```
project-root/
├── src/
│   ├── pages/               # Page Object classes
│   ├── base/                # Base test classes
│   └── utils/               # Utility functions
├── test/                    # Test cases
├── package.json             # Node dependencies
└── Jenkinsfile             # Jenkins pipeline
```

### C# + Selenium (NUnit)
```
project-root/
├── Pages/                   # Page Object classes
├── Tests/                   # Test cases
├── Base/                    # Base test classes
├── Utils/                   # Utility classes
├── *.csproj                 # C# project file
└── Jenkinsfile             # Jenkins pipeline
```

### TypeScript + Playwright
```
project-root/
├── pages/                   # Page Object classes
├── tests/                   # Test cases
├── fixtures/                # Test fixtures
├── utils/                   # Utility functions
├── playwright.config.ts     # Playwright configuration
└── Jenkinsfile             # Jenkins pipeline
```

### JavaScript + Cypress
```
project-root/
├── cypress/
│   ├── e2e/                 # Test cases
│   ├── pages/               # Page Object classes
│   └── support/             # Support files
│       └── utils/           # Utility functions
├── cypress.config.js        # Cypress configuration
└── Jenkinsfile             # Jenkins pipeline
```

## What You Get

### 1. Page Objects
- Well-structured page classes following POM pattern
- Element locators using best practices
- Reusable page methods
- Proper abstraction of UI interactions

### 2. Test Cases (25 Total)
- **Login Tests**: Valid/invalid credentials, remember me, forgot password
- **Search Tests**: Basic search, filters, no results handling
- **Booking/Purchase Flow**: Add to cart, checkout, payment
- **Navigation Tests**: Menu navigation, breadcrumbs, footer links
- **Form Validation**: Required fields, format validation, error messages
- **Error Handling**: 404 pages, network errors, timeout handling
- **API Integration**: API calls, response validation

### 3. Configuration Files
- Dependency management (Maven, pip, npm, NuGet)
- Test execution configuration
- Browser settings
- Reporting configuration

### 4. Jenkins Pipeline
- Multi-stage pipeline
- Automated test execution
- Reporting and notifications
- Parallel execution support

### 5. Base Classes
- Browser initialization
- Setup and teardown methods
- Screenshot capture on failure
- Logging configuration

### 6. Utilities
- Wait helpers
- File operations
- Data generators
- Assertion helpers

## Requirements

### For Using the Generator
- Modern web browser
- Internet connection
- Target website URL

### For Running Generated Tests

**Java:**
- JDK 11 or higher
- Maven 3.6+
- Chrome/Firefox browser

**Python:**
- Python 3.8+
- pip package manager
- Chrome/Firefox browser

**JavaScript (Selenium):**
- Node.js 14+
- npm or yarn
- Chrome/Firefox browser

**C#:**
- .NET 6.0+
- NuGet package manager
- Chrome/Firefox browser

**Playwright:**
- Node.js 14+
- npm or yarn
- Browsers installed via Playwright CLI

**Cypress:**
- Node.js 14+
- npm or yarn
- Chrome/Firefox/Edge browser

## Running Your Generated Tests

### Java (Maven)
```bash
# Install dependencies
mvn clean install

# Run tests
mvn test

# Run specific test
mvn test -Dtest=TestClassName
```

### Python
```bash
# Install dependencies
pip install -r requirements.txt

# Run tests
pytest tests/

# Run with HTML report
pytest tests/ --html=report.html
```

### JavaScript (WebdriverIO)
```bash
# Install dependencies
npm install

# Run tests
npm test

# Run specific test
npm test -- --spec=test/testfile.js
```

### C#
```bash
# Restore dependencies
dotnet restore

# Build project
dotnet build

# Run tests
dotnet test
```

### Playwright
```bash
# Install dependencies
npm install

# Install browsers
npx playwright install

# Run tests
npx playwright test

# Run with UI
npx playwright test --ui
```

### Cypress
```bash
# Install dependencies
npm install

# Run tests (headless)
npx cypress run

# Open Cypress UI
npx cypress open
```

## Best Practices

1. **Review Generated Code**: Always review and customize the generated code for your specific needs
2. **Update Locators**: Verify element locators match your target website
3. **Add Test Data**: Customize test data for your scenarios
4. **Configure Browsers**: Set up browser preferences in configuration files
5. **Set Up CI/CD**: Integrate Jenkins pipeline with your CI/CD system
6. **Maintain Tests**: Keep tests updated as the application changes
7. **Use Version Control**: Commit generated framework to Git

## Troubleshooting

### Generation Failed
- Check if the URL is valid and accessible
- Verify you have selected a technology
- Try again after a few seconds

### Tests Not Running
- Ensure all dependencies are installed
- Verify browser drivers are available
- Check configuration file settings

### Element Not Found
- Update element locators in page objects
- Add explicit waits for dynamic elements
- Verify the website structure hasn't changed

## Support and Resources

- For issues with the generator, contact your development team
- For framework-specific questions, refer to official documentation:
  - Selenium: https://www.selenium.dev/
  - Playwright: https://playwright.dev/
  - Cypress: https://www.cypress.io/
  - TestNG: https://testng.org/
  - Pytest: https://pytest.org/

## Tips for Success

1. **Start Small**: Generate framework for a simple website first
2. **Customize Gradually**: Make small changes and test frequently
3. **Follow Conventions**: Keep the generated structure and naming conventions
4. **Write Clean Tests**: Add comments and maintain readability
5. **Use Page Objects**: Don't bypass the POM pattern
6. **Version Control**: Commit changes regularly
7. **Continuous Integration**: Set up automated test runs

## License

This generated framework is provided as-is for your testing needs. Customize and use according to your project requirements.
