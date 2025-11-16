# Jenkins Hands-On Guide for Test Automation Framework

## Overview

This guide provides step-by-step instructions for setting up Jenkins CI/CD pipelines for your generated test automation frameworks with proper reporting integration.

## Prerequisites

- Jenkins installed and running (version 2.387+)
- Java 11 or higher installed
- Git installed
- Test framework generated from the Test Framework Generator

## Scenario 1: Basic Jenkins Pipeline Setup

### Step 1: Install Required Jenkins Plugins

1. Navigate to **Jenkins Dashboard > Manage Jenkins > Manage Plugins**
2. Install the following plugins:
   - Pipeline
   - Git Plugin
   - HTML Publisher Plugin (for Extent Reports)
   - TestNG Results Plugin (for Java/TestNG)
   - Junit Plugin
   - Workspace Cleanup Plugin

### Step 2: Create a New Pipeline Job

1. Click **New Item** from Jenkins Dashboard
2. Enter job name: `TestAutomation-Pipeline`
3. Select **Pipeline** and click **OK**
4. Configure the pipeline with your generated `Jenkinsfile`

### Step 3: Configure Source Code Management

1. In Pipeline configuration, scroll to **Pipeline** section
2. Select **Pipeline script from SCM**
3. Choose **Git** as SCM
4. Enter your repository URL
5. Add credentials if required
6. Specify branch: `*/main` or `*/master`
7. Script Path: `Jenkinsfile`

## Scenario 2: Fixing Extent Report Integration

### Common Extent Report Errors and Solutions

#### Error 1: ClassNotFoundException for ExtentReports

**Problem:** Missing Extent Reports dependencies

**Solution for Java/Maven Projects:**

Add to `pom.xml`:
```xml
<dependency>
    <groupId>com.aventstack</groupId>
    <artifactId>extentreports</artifactId>
    <version>5.1.1</version>
</dependency>
```

**Solution for Python Projects:**

Add to `requirements.txt`:
```
extent-reports==0.1.5
pytest-html-reporter==0.2.9
```

#### Error 2: Report Not Generated

**Problem:** Incorrect report path or permissions

**Solution:** Ensure your test base class has proper reporting setup:

```java
// For Java
public class BaseTest {
    protected static ExtentReports extent;
    protected ExtentTest test;
    
    @BeforeSuite
    public void setupReport() {
        ExtentSparkReporter spark = new ExtentSparkReporter("target/extent-reports/extent-report.html");
        extent = new ExtentReports();
        extent.attachReporter(spark);
    }
    
    @AfterSuite
    public void teardownReport() {
        extent.flush();
    }
}
```

### Step 4: Configure HTML Publisher for Extent Reports

In your Jenkinsfile, add this post-build action:

```groovy
post {
    always {
        publishHTML([
            reportDir: 'target/extent-reports',
            reportFiles: 'extent-report.html',
            reportName: 'Extent Test Report',
            keepAll: true,
            alwaysLinkToLastBuild: true,
            allowMissing: false
        ])
    }
}
```

## Scenario 3: Complete Jenkinsfile with Extent Reports

### For Java/Selenium/Maven Projects

```groovy
pipeline {
    agent any
    
    tools {
        maven 'Maven 3.9.0'
        jdk 'JDK 11'
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', 
                    url: 'https://github.com/your-repo/test-automation.git'
            }
        }
        
        stage('Build') {
            steps {
                sh 'mvn clean compile'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'mvn test -Dsurefire.suiteXmlFiles=testng.xml'
            }
        }
    }
    
    post {
        always {
            // Publish TestNG Results
            publishTestNG reportFilenamePattern: 'target/surefire-reports/testng-results.xml'
            
            // Publish Extent Reports
            publishHTML([
                reportDir: 'target/extent-reports',
                reportFiles: 'extent-report.html',
                reportName: 'Extent Test Report',
                keepAll: true,
                alwaysLinkToLastBuild: true,
                allowMissing: false
            ])
            
            // Clean workspace
            cleanWs()
        }
        
        success {
            echo 'Tests passed successfully!'
        }
        
        failure {
            echo 'Tests failed. Check reports for details.'
        }
    }
}
```

### For Python/Selenium Projects

```groovy
pipeline {
    agent any
    
    stages {
        stage('Setup') {
            steps {
                sh 'python3 -m venv venv'
                sh '. venv/bin/activate && pip install -r requirements.txt'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh '. venv/bin/activate && pytest tests/ --html=reports/report.html --self-contained-html'
            }
        }
    }
    
    post {
        always {
            publishHTML([
                reportDir: 'reports',
                reportFiles: 'report.html',
                reportName: 'Test Report',
                keepAll: true
            ])
        }
    }
}
```

## Scenario 4: Parameterized Build

### Step 1: Add Parameters to Jenkins Job

1. In job configuration, check **This project is parameterized**
2. Add parameters:
   - **String Parameter:** `BROWSER` (default: `chrome`)
   - **String Parameter:** `ENVIRONMENT` (default: `qa`)
   - **Choice Parameter:** `TEST_SUITE` (choices: `smoke`, `regression`, `full`)

### Step 2: Update Jenkinsfile to Use Parameters

```groovy
pipeline {
    agent any
    
    parameters {
        choice(name: 'BROWSER', choices: ['chrome', 'firefox', 'edge'], description: 'Browser to run tests')
        choice(name: 'ENVIRONMENT', choices: ['qa', 'staging', 'prod'], description: 'Environment')
        choice(name: 'TEST_SUITE', choices: ['smoke', 'regression', 'full'], description: 'Test suite to execute')
    }
    
    stages {
        stage('Run Tests') {
            steps {
                sh "mvn test -Dbrowser=${params.BROWSER} -Denv=${params.ENVIRONMENT} -Dsuite=${params.TEST_SUITE}"
            }
        }
    }
}
```

## Scenario 5: Scheduled Builds

### Configure Cron-based Scheduling

In Jenkins job configuration:

1. Under **Build Triggers**, select **Build periodically**
2. Add cron expression:

```
# Run every day at 2 AM
H 2 * * *

# Run every 6 hours
H */6 * * *

# Run Monday to Friday at 9 AM
H 9 * * 1-5
```

Or add to Jenkinsfile:

```groovy
pipeline {
    agent any
    
    triggers {
        cron('H 2 * * *')  // Daily at 2 AM
    }
    
    stages {
        // ... your stages
    }
}
```

## Scenario 6: Parallel Execution

### Execute Tests in Parallel

```groovy
pipeline {
    agent any
    
    stages {
        stage('Parallel Tests') {
            parallel {
                stage('Chrome Tests') {
                    steps {
                        sh 'mvn test -Dbrowser=chrome -Dsuite=smoke'
                    }
                }
                stage('Firefox Tests') {
                    steps {
                        sh 'mvn test -Dbrowser=firefox -Dsuite=smoke'
                    }
                }
                stage('Edge Tests') {
                    steps {
                        sh 'mvn test -Dbrowser=edge -Dsuite=smoke'
                    }
                }
            }
        }
    }
}
```

## Scenario 7: Email Notifications

### Configure Email Notifications

Add to Jenkinsfile:

```groovy
post {
    always {
        emailext(
            subject: "Test Execution: ${currentBuild.result} - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            body: """
                <h2>Test Execution Summary</h2>
                <p>Job: ${env.JOB_NAME}</p>
                <p>Build Number: ${env.BUILD_NUMBER}</p>
                <p>Status: ${currentBuild.result}</p>
                <p>Check console output: ${env.BUILD_URL}</p>
                <p>View Extent Report: ${env.BUILD_URL}Extent_Test_Report/</p>
            """,
            to: 'team@example.com',
            mimeType: 'text/html',
            attachLog: true
        )
    }
}
```

## Scenario 8: Docker Integration

### Run Tests in Docker Container

```groovy
pipeline {
    agent {
        docker {
            image 'maven:3.9.0-eclipse-temurin-11'
            args '-v $HOME/.m2:/root/.m2'
        }
    }
    
    stages {
        stage('Test') {
            steps {
                sh 'mvn clean test'
            }
        }
    }
}
```

## Troubleshooting

### Issue 1: Extent Report Not Visible in Jenkins

**Solution:**
1. Go to **Manage Jenkins > Script Console**
2. Run: `System.setProperty("hudson.model.DirectoryBrowserSupport.CSP", "")`
3. Or add to Jenkins startup: `-Dhudson.model.DirectoryBrowserSupport.CSP=""`

### Issue 2: Tests Fail in Jenkins but Pass Locally

**Possible Causes:**
- Missing dependencies
- Different Java/Maven versions
- Headless browser not configured
- Incorrect paths

**Solution:**
```groovy
stage('Setup') {
    steps {
        sh 'mvn dependency:resolve'
        sh 'mvn --version'
        sh 'java -version'
    }
}
```

### Issue 3: HTML Reports Show as Plain Text

**Solution:**
Configure Content Security Policy in Jenkins:
```
Manage Jenkins > Script Console
System.setProperty("hudson.model.DirectoryBrowserSupport.CSP", "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline';")
```

## Best Practices

1. **Always use workspace cleanup** after builds
2. **Archive artifacts** (test reports, screenshots)
3. **Use environment variables** for sensitive data
4. **Implement retry logic** for flaky tests
5. **Set timeout** for long-running tests
6. **Use descriptive stage names**
7. **Add comments** in Jenkinsfile
8. **Version control** your Jenkinsfile
9. **Use shared libraries** for common functions
10. **Monitor build times** and optimize

## Resources

- Jenkins Documentation: https://www.jenkins.io/doc/
- Extent Reports: https://extentreports.com/
- TestNG: https://testng.org/
- Selenium: https://www.selenium.dev/

## Next Steps

1. Clone your generated framework
2. Push to Git repository
3. Create Jenkins job using this guide
4. Configure Extent Reports as shown
5. Run your first automated build
6. Schedule regular test executions
7. Monitor and maintain your pipeline

---

For additional support, refer to the main PROJECT_GUIDE.md documentation.
