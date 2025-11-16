# Test Framework Generator - Hands-On Training Guide for Freshers

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Activity 1: Understanding the Tool](#activity-1-understanding-the-tool)
3. [Activity 2: Generate Your First Framework](#activity-2-generate-your-first-framework)
4. [Activity 3: Explore Generated Files](#activity-3-explore-generated-files)
5. [Activity 4: Setup Local Environment](#activity-4-setup-local-environment)
6. [Activity 5: Run Tests Locally](#activity-5-run-tests-locally)
7. [Activity 6: Customize Tests](#activity-6-customize-tests)
8. [Activity 7: Setup Jenkins Pipeline](#activity-7-setup-jenkins-pipeline)
9. [Common Mistakes to Avoid](#common-mistakes-to-avoid)
10. [Practice Exercises](#practice-exercises)

---

## Prerequisites

Before starting this hands-on training, ensure you have:

### Software Requirements
- ✅ Modern web browser (Chrome, Firefox, or Edge)
- ✅ Internet connection
- ✅ Text editor (VS Code recommended)
- ✅ Git installed on your machine

### Knowledge Requirements
- ✅ Basic understanding of web applications
- ✅ Familiarity with command line/terminal
- ✅ Basic programming concepts (for your chosen language)

### Accounts Required
- ✅ GitHub account (optional but recommended)
- ✅ Jenkins account or local Jenkins installation (for Activity 7)

---

## Activity 1: Understanding the Tool

### Objective
Understand what the Test Framework Generator does and its benefits.

### Steps

#### Step 1.1: Open the Application
1. Navigate to the Test Framework Generator URL in your browser
2. You should see the main interface with:
   - A URL input field
   - A technology dropdown
   - A "Generate Framework" button

#### Step 1.2: Review Supported Technologies
1. Click on the "Technology Stack" dropdown
2. Note down all available options:
   ```
   - Java (Maven + TestNG)
   - Python (Pytest)
   - JavaScript (WebdriverIO)
   - C# (NUnit)
   - TypeScript (Playwright)
   - JavaScript (Cypress)
   ```

#### Step 1.3: Read the Documentation
1. Open the PROJECT_GUIDE.md file
2. Read the "Features" section
3. Understand what components get generated:
   - Page Objects
   - 25 Test Cases
   - Configuration Files
   - Jenkins Pipeline
   - Base Classes
   - Utilities

### Expected Outcome
✅ You understand what the tool generates  
✅ You know which technologies are supported  
✅ You're familiar with the interface

### Time Required: 15 minutes

---

## Activity 2: Generate Your First Framework

### Objective
Generate a complete test automation framework for a sample website.

### Steps

#### Step 2.1: Choose a Target Website
For this exercise, use one of these practice websites:
- **E-commerce**: `https://www.saucedemo.com`
- **Booking**: `https://www.demoblaze.com`
- **Forms**: `https://demoqa.com`

**For this activity, we'll use**: `https://www.saucedemo.com`

#### Step 2.2: Enter the URL
1. Click on the "Target Website URL" input field
2. Type: `https://www.saucedemo.com`
3. Verify the URL is correct and includes `https://`

#### Step 2.3: Select Technology Stack
1. Click on the "Technology Stack" dropdown
2. For beginners, we recommend starting with **Python (Pytest)**
3. Select "Python (Pytest)" from the dropdown

#### Step 2.4: Generate Framework
1. Click the "Generate Framework" button
2. Wait for the generation process (15-30 seconds)
3. You'll see a loading indicator
4. Watch for the success notification

#### Step 2.5: Review Generation Status
1. Check for the success message: "Framework generated successfully!"
2. Verify that file sections appear on the screen:
   - Page Objects
   - Test Cases
   - Configuration
   - Jenkins Pipeline
   - Base Classes
   - Utilities

### Expected Outcome
✅ Framework generated without errors  
✅ All file sections are visible  
✅ Success notification received

### Time Required: 5 minutes

### Troubleshooting
**Problem**: "Generation failed" error  
**Solution**: 
- Check your internet connection
- Verify the URL is accessible in your browser
- Try again after a few seconds

**Problem**: Generation takes too long  
**Solution**:
- Wait up to 60 seconds
- Refresh the page and try again if it exceeds 60 seconds

---

## Activity 3: Explore Generated Files

### Objective
Understand the structure and content of generated files.

### Steps

#### Step 3.1: Review Page Objects
1. Scroll to the "Page Objects" section
2. Click to expand and view the code
3. Observe the structure:
   ```python
   class LoginPage:
       def __init__(self, driver):
           self.driver = driver
           # Locators
           self.username_field = (By.ID, "user-name")
           self.password_field = (By.ID, "password")
           
       def login(self, username, password):
           # Methods to interact with page
   ```

#### Step 3.2: Review Test Cases
1. Navigate to the "Test Cases" section
2. Count the number of test files (should be multiple files covering 25 tests)
3. Open one test file and observe:
   - Test class structure
   - Setup and teardown methods
   - Test methods with assertions
   - Comments explaining each test

#### Step 3.3: Review Configuration
1. Check the configuration file (e.g., `requirements.txt` for Python)
2. Note the dependencies listed:
   ```
   selenium==4.x.x
   pytest==7.x.x
   pytest-html==3.x.x
   extentreports==1.x.x
   ```

#### Step 3.4: Review Base Classes
1. Open the Base Test class
2. Understand the setup method:
   - Browser initialization
   - Implicit waits
   - Window maximization
3. Understand the teardown method:
   - Screenshot capture on failure
   - Browser cleanup

#### Step 3.5: Review Jenkins Pipeline
1. Open the Jenkinsfile
2. Identify the pipeline stages:
   - Checkout
   - Install Dependencies
   - Run Tests
   - Publish Reports
3. Note the Extent Reports configuration

### Expected Outcome
✅ You understand the POM structure  
✅ You can identify different test types  
✅ You know what each file does  
✅ You understand the Jenkins pipeline stages

### Time Required: 20 minutes

---

## Activity 4: Setup Local Environment

### Objective
Download the framework and set up your local development environment.

### Steps

#### Step 4.1: Download the Framework
1. Click the "Download All Files" button
2. Save the ZIP file to your computer
3. Note the download location (e.g., Downloads folder)

#### Step 4.2: Extract the ZIP File
1. Navigate to the download location
2. Right-click on the ZIP file
3. Select "Extract All" or "Extract Here"
4. Create a new folder named: `saucedemo-automation`
5. Extract contents to this folder

#### Step 4.3: Verify Folder Structure
1. Open the extracted folder
2. Verify you have these folders/files:
   ```
   saucedemo-automation/
   ├── pages/
   ├── tests/
   ├── base/
   ├── utils/
   ├── requirements.txt
   └── Jenkinsfile
   ```

#### Step 4.4: Install Required Software (Python Example)

**Install Python:**
1. Download Python 3.8+ from python.org
2. Run the installer
3. ✅ Check "Add Python to PATH"
4. Click "Install Now"
5. Verify installation:
   ```bash
   python --version
   ```
   Expected output: `Python 3.x.x`

**Install pip (if not included):**
```bash
python -m ensurepip --upgrade
```

#### Step 4.5: Install Browser Driver

**For Chrome:**
1. Check your Chrome version (Settings → About Chrome)
2. Download matching ChromeDriver from https://chromedriver.chromium.org
3. Extract chromedriver.exe
4. Add to system PATH or place in project folder

**Alternative (Automatic):**
Install webdriver-manager:
```bash
pip install webdriver-manager
```

#### Step 4.6: Install Project Dependencies
1. Open terminal/command prompt
2. Navigate to project folder:
   ```bash
   cd path/to/saucedemo-automation
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Wait for installation to complete
5. Verify installation:
   ```bash
   pip list
   ```

### Expected Outcome
✅ Framework extracted to local folder  
✅ Python installed and accessible  
✅ All dependencies installed successfully  
✅ Browser driver available

### Time Required: 30 minutes

### Troubleshooting

**Problem**: "Python is not recognized"  
**Solution**: Add Python to system PATH or restart terminal

**Problem**: "pip install fails"  
**Solution**: 
- Try: `python -m pip install -r requirements.txt`
- Use administrator/sudo privileges
- Check internet connection

**Problem**: ChromeDriver version mismatch  
**Solution**: Use webdriver-manager or download exact matching version

---

## Activity 5: Run Tests Locally

### Objective
Execute the generated test cases on your local machine.

### Steps

#### Step 5.1: Update Configuration (if needed)
1. Open `base/base_test.py` (or equivalent for your framework)
2. Verify browser configuration:
   ```python
   def setUp(self):
       self.driver = webdriver.Chrome()  # or Firefox, Edge
       self.driver.maximize_window()
       self.driver.implicitly_wait(10)
       self.driver.get("https://www.saucedemo.com")
   ```

#### Step 5.2: Run a Single Test
1. Open terminal in project directory
2. Run one test file:
   ```bash
   # Python
   pytest tests/test_login.py -v
   
   # Java
   mvn test -Dtest=LoginTest
   
   # JavaScript (WebdriverIO)
   npm test -- --spec=test/login.test.js
   ```
3. Watch the browser open and execute the test
4. Check the terminal output for results

#### Step 5.3: Run All Tests
1. Execute all tests:
   ```bash
   # Python
   pytest tests/ -v
   
   # Java
   mvn test
   
   # JavaScript
   npm test
   ```
2. Tests will run sequentially
3. Note any failures

#### Step 5.4: Generate HTML Report
1. Run tests with HTML report:
   ```bash
   # Python
   pytest tests/ --html=report.html --self-contained-html
   ```
2. Open `report.html` in a browser
3. Review the detailed report with:
   - Test results summary
   - Pass/fail status for each test
   - Execution time
   - Screenshots (if configured)

#### Step 5.5: Review Extent Reports
1. After test execution, locate the Extent Report
2. Path: `target/extent-reports/extent-report.html` (Java) or similar
3. Open in browser
4. Explore the dashboard:
   - Test summary pie chart
   - Category view
   - Exception details
   - Screenshots

### Expected Outcome
✅ Single test runs successfully  
✅ All tests execute without errors  
✅ HTML report generated  
✅ Extent Report displays correctly

### Time Required: 20 minutes

### Common Test Results

**Expected Failures:**
- Some tests may fail due to locator changes on the live website
- This is normal and expected with automated test generation
- You'll fix these in Activity 6

### Troubleshooting

**Problem**: "Element not found" errors  
**Solution**: The website structure may have changed. This is covered in Activity 6.

**Problem**: Browser doesn't open  
**Solution**: 
- Verify driver is in PATH
- Check driver version matches browser
- Try webdriver-manager

**Problem**: Tests run too fast  
**Solution**: Increase implicit wait time in base test setup

---

## Activity 6: Customize Tests

### Objective
Learn to modify and customize generated tests for your needs.

### Steps

#### Step 6.1: Update Element Locators
1. Open a page object file (e.g., `pages/login_page.py`)
2. Open the target website in a browser
3. Use browser DevTools (F12) to inspect elements
4. Update locators if they've changed:

**Before:**
```python
self.username_field = (By.ID, "user-name")
```

**After (if ID changed):**
```python
self.username_field = (By.CSS_SELECTOR, "input[data-test='username']")
```

#### Step 6.2: Update Test Data
1. Open a test file (e.g., `tests/test_login.py`)
2. Locate the test data section
3. Replace with valid test data:

```python
def test_valid_login(self):
    login_page = LoginPage(self.driver)
    login_page.login("standard_user", "secret_sauce")  # Valid credentials
    # Add assertion
    assert "inventory.html" in self.driver.current_url
```

#### Step 6.3: Add Custom Assertions
1. Identify what to verify after actions
2. Add appropriate assertions:

```python
# Verify successful login
assert self.driver.find_element(By.CLASS_NAME, "title").text == "Products"

# Verify error message
error = self.driver.find_element(By.CSS_SELECTOR, "[data-test='error']")
assert "Epic sadface" in error.text
```

#### Step 6.4: Add Wait Conditions
1. Add explicit waits for dynamic elements:

```python
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

wait = WebDriverWait(self.driver, 10)
element = wait.until(EC.presence_of_element_located((By.ID, "item")))
```

#### Step 6.5: Create a New Test Case
1. Copy an existing test file
2. Rename it (e.g., `test_cart.py`)
3. Write a new test:

```python
def test_add_to_cart(self):
    # Login first
    login_page = LoginPage(self.driver)
    login_page.login("standard_user", "secret_sauce")
    
    # Add item to cart
    inventory_page = InventoryPage(self.driver)
    inventory_page.add_item_to_cart("Sauce Labs Backpack")
    
    # Verify cart badge
    cart_badge = self.driver.find_element(By.CLASS_NAME, "shopping_cart_badge")
    assert cart_badge.text == "1"
```

#### Step 6.6: Run Your Custom Test
1. Save all changes
2. Run the new test:
   ```bash
   pytest tests/test_cart.py -v
   ```
3. Verify it passes

### Expected Outcome
✅ Locators updated successfully  
✅ Tests run with correct data  
✅ Custom assertions added  
✅ New test case created and passing

### Time Required: 45 minutes

---

## Activity 7: Setup Jenkins Pipeline

### Objective
Configure Jenkins to run your tests automatically.

### Steps

#### Step 7.1: Install Jenkins (if needed)
1. Download Jenkins from jenkins.io
2. Install and start Jenkins
3. Access Jenkins at `http://localhost:8080`
4. Complete initial setup wizard
5. Install suggested plugins

#### Step 7.2: Install Required Plugins
1. Go to: Manage Jenkins → Manage Plugins
2. Install these plugins:
   - HTML Publisher Plugin
   - Email Extension Plugin
   - Pipeline Plugin (should be pre-installed)
3. Restart Jenkins if required

#### Step 7.3: Create a New Pipeline Job
1. Click "New Item"
2. Enter name: `SauceDemo-Automation`
3. Select "Pipeline"
4. Click "OK"

#### Step 7.4: Configure Pipeline
1. In the configuration page:
   - **Description**: "Automated tests for SauceDemo website"
   - **Build Triggers**: Choose as needed (e.g., "Poll SCM" or "Build periodically")

2. Scroll to "Pipeline" section
3. Select "Pipeline script from SCM"
4. **SCM**: Git
5. **Repository URL**: Your Git repository URL (or use local path for testing)
6. **Script Path**: `Jenkinsfile`

#### Step 7.5: Review Jenkinsfile
1. Open the generated `Jenkinsfile`
2. Understand each stage:

```groovy
pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'pip install -r requirements.txt'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'pytest tests/ --html=report.html --self-contained-html'
            }
        }
        
        stage('Publish Reports') {
            steps {
                publishHTML([
                    reportDir: '.',
                    reportFiles: 'report.html',
                    reportName: 'Test Report'
                ])
            }
        }
    }
}
```

#### Step 7.6: Run the Pipeline
1. Click "Build Now"
2. Watch the pipeline execution in real-time
3. Check each stage's output
4. View console output for details

#### Step 7.7: View Reports in Jenkins
1. After build completes, click on the build number
2. Click "Test Report" link
3. Explore the HTML report
4. Check Extent Reports (if configured)

#### Step 7.8: Configure Email Notifications (Optional)
1. Go back to job configuration
2. Add post-build action: "Editable Email Notification"
3. Configure:
   - **Project Recipient List**: your-email@example.com
   - **Triggers**: Add "Always" or "Failure"
4. Save configuration

### Expected Outcome
✅ Jenkins pipeline created successfully  
✅ Pipeline runs without errors  
✅ Reports published in Jenkins  
✅ Email notifications configured (if done)

### Time Required: 60 minutes

### Troubleshooting

**Problem**: Jenkins can't find Python/pip  
**Solution**: 
- Add Python to system PATH
- Use full path in Jenkinsfile: `/usr/bin/python3 -m pip install...`

**Problem**: HTML Publisher plugin not showing reports  
**Solution**: 
- Check Jenkins security settings
- Allow CSS/JS: Manage Jenkins → Script Console, run:
  ```groovy
  System.setProperty("hudson.model.DirectoryBrowserSupport.CSP", "")
  ```

**Problem**: Tests fail in Jenkins but work locally  
**Solution**:
- Check Jenkins workspace permissions
- Verify browser drivers available on Jenkins server
- Use headless mode for Jenkins

---

## Common Mistakes to Avoid

### 1. Invalid URL Format
❌ **Wrong**: `www.example.com` or `example.com`  
✅ **Correct**: `https://www.example.com`

### 2. Skipping Dependency Installation
❌ **Wrong**: Running tests immediately after download  
✅ **Correct**: Always run `pip install -r requirements.txt` first

### 3. Not Updating Locators
❌ **Wrong**: Using generated locators without verification  
✅ **Correct**: Verify and update locators against actual website

### 4. Running All Tests Immediately
❌ **Wrong**: Running entire test suite without checking one test  
✅ **Correct**: Run and fix one test first, then expand

### 5. Ignoring Test Data
❌ **Wrong**: Using dummy data that doesn't match application  
✅ **Correct**: Update test data to match your application's requirements

### 6. Not Using Version Control
❌ **Wrong**: Keeping tests only on local machine  
✅ **Correct**: Initialize Git repository and commit regularly

### 7. Hard-Coding Values
❌ **Wrong**: Hard-coding URLs, credentials in test files  
✅ **Correct**: Use configuration files or environment variables

### 8. Not Adding Waits
❌ **Wrong**: Assuming elements are immediately available  
✅ **Correct**: Add appropriate waits for dynamic elements

---

## Practice Exercises

### Exercise 1: Generate Framework for Different Website
**Difficulty**: Easy  
**Time**: 30 minutes

**Task**: Generate a test framework for https://demoqa.com
1. Use Java with Maven + TestNG
2. Download and extract
3. Run the login tests
4. Document any failures you encounter

### Exercise 2: Fix Failing Tests
**Difficulty**: Medium  
**Time**: 45 minutes

**Task**: Fix 3 failing tests in your generated framework
1. Identify why tests are failing (use browser DevTools)
2. Update locators as needed
3. Adjust test data
4. Verify tests pass

### Exercise 3: Add New Test Suite
**Difficulty**: Medium  
**Time**: 60 minutes

**Task**: Create a new test suite for shopping cart functionality
1. Create new page object: `cart_page.py`
2. Add methods: `add_item()`, `remove_item()`, `get_cart_count()`
3. Create test file: `test_cart.py`
4. Write 5 test cases covering different cart scenarios
5. Run and verify all tests pass

### Exercise 4: Parameterize Tests
**Difficulty**: Hard  
**Time**: 60 minutes

**Task**: Make login tests data-driven
1. Create a CSV file with multiple test credentials
2. Modify test to read from CSV
3. Use pytest parametrize (Python) or DataProvider (Java)
4. Run tests with all data sets

### Exercise 5: Setup Complete CI/CD
**Difficulty**: Hard  
**Time**: 90 minutes

**Task**: Create a complete CI/CD pipeline
1. Push code to GitHub
2. Configure Jenkins to pull from GitHub
3. Add stages for:
   - Code checkout
   - Dependency installation
   - Test execution
   - Report generation
   - Email notification
4. Set up scheduled builds (nightly runs)
5. Configure parallel execution for faster results

---

## Assessment Checklist

After completing all activities, verify you can:

- [ ] Generate a test framework for any website
- [ ] Download and extract the framework
- [ ] Set up local development environment
- [ ] Install all required dependencies
- [ ] Run a single test successfully
- [ ] Run the complete test suite
- [ ] Generate and view HTML reports
- [ ] View and understand Extent Reports
- [ ] Update element locators using DevTools
- [ ] Modify test data
- [ ] Add new test cases
- [ ] Create custom page objects
- [ ] Set up Jenkins pipeline
- [ ] Configure Jenkins to run tests
- [ ] View reports in Jenkins
- [ ] Troubleshoot common errors

---

## Next Steps

After mastering this hands-on training:

1. **Explore Advanced Features**
   - Learn parallel test execution
   - Implement retry mechanisms
   - Add screenshot capture
   - Set up video recording

2. **Learn Best Practices**
   - Study Page Object Model in depth
   - Understand test independence
   - Learn data-driven testing
   - Master wait strategies

3. **Expand Your Skills**
   - Learn different testing frameworks
   - Study API testing integration
   - Explore mobile testing
   - Learn performance testing basics

4. **Contribute to Projects**
   - Join open-source testing projects
   - Create reusable test utilities
   - Share knowledge with team
   - Document lessons learned

---

## Additional Resources

### Official Documentation
- Selenium: https://www.selenium.dev/documentation/
- Pytest: https://docs.pytest.org/
- TestNG: https://testng.org/doc/documentation-main.html
- Playwright: https://playwright.dev/docs/intro
- Cypress: https://docs.cypress.io/

### Learning Platforms
- Selenium with Python: https://selenium-python.readthedocs.io/
- Test Automation University: https://testautomationu.applitools.com/
- Jenkins Documentation: https://www.jenkins.io/doc/

### Practice Websites
- https://demoqa.com/
- https://www.saucedemo.com/
- https://www.demoblaze.com/
- https://automationexercise.com/

---

## Support and Feedback

If you encounter issues or have questions:

1. **Check Troubleshooting Section**: Review the troubleshooting guide for your specific error
2. **Review Documentation**: Refer to PROJECT_GUIDE.md and JENKINS_HANDS_ON.md
3. **Search Online**: Use Stack Overflow, GitHub Issues for similar problems
4. **Ask Your Mentor**: Reach out to your training supervisor

---

## Glossary

**Page Object Model (POM)**: Design pattern that creates an object repository for web elements

**Locator**: Method to identify web elements (ID, CSS Selector, XPath, etc.)

**Assertion**: Verification point in tests to check expected vs actual results

**Test Suite**: Collection of test cases that are executed together

**CI/CD**: Continuous Integration/Continuous Deployment - automated build and deployment

**WebDriver**: Protocol for browser automation

**Extent Reports**: HTML reporting library for test results

**Jenkins Pipeline**: Automated workflow defined in code

**Implicit Wait**: Global wait applied to all elements in the test

**Explicit Wait**: Wait applied to specific elements with conditions

---

**Remember**: Practice makes perfect. Don't hesitate to experiment and make mistakes - that's how you learn! 🚀
