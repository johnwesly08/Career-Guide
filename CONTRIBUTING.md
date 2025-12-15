# Contributing to Career Compass

First off, thank you for considering contributing to Career Compass! 🎉

It's people like you that make Career Compass such a great tool for the developer community.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Community](#community)

---

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of:
- Age, body size, disability, ethnicity
- Gender identity and expression
- Level of experience, education
- Nationality, personal appearance
- Race, religion, or sexual identity and orientation

### Our Standards

**Positive behavior includes:**
- ✅ Using welcoming and inclusive language
- ✅ Being respectful of differing viewpoints
- ✅ Gracefully accepting constructive criticism
- ✅ Focusing on what is best for the community
- ✅ Showing empathy towards other community members

**Unacceptable behavior includes:**
- ❌ Trolling, insulting/derogatory comments, and personal attacks
- ❌ Public or private harassment
- ❌ Publishing others' private information without permission
- ❌ Other conduct which could reasonably be considered inappropriate

---

## 🤝 How Can I Contribute?

### Reporting Bugs 🐛

Before creating bug reports, please check existing issues to avoid duplicates.

**When submitting a bug report, include:**

- **Clear title**: Describe the issue in one sentence
- **Steps to reproduce**: Detailed steps to recreate the bug
- **Expected behavior**: What you expected to happen
- **Actual behavior**: What actually happened
- **Screenshots**: If applicable
- **Environment details**:
  - OS: [e.g., Windows 11, macOS 14, Ubuntu 22.04]
  - Browser: [e.g., Chrome 120, Firefox 121]
  - Node version: [e.g., 18.17.0]
  - Python version: [e.g., 3.12]

**Example Bug Report:**

```markdown
## Bug: Resume upload fails with large PDF files

### Steps to Reproduce
1. Navigate to /analyze
2. Upload a PDF file larger than 10MB
3. Fill in job description
4. Click "Analyze Resume"

### Expected Behavior
File uploads successfully and analysis begins

### Actual Behavior
Error message: "File upload failed" appears

### Environment
- OS: Windows 11
- Browser: Chrome 120.0.6099.109
- File size: 12.5MB
```

### Suggesting Enhancements 💡

Enhancement suggestions are tracked as GitHub issues.

**When suggesting an enhancement:**

- **Use a clear title**: Describe the enhancement succinctly
- **Provide detailed description**: Explain the feature and its benefits
- **Include examples**: Show how the feature would work
- **Explain alternatives**: Describe other solutions you've considered

**Example Enhancement:**

```markdown
## Feature: Export analysis results as PDF

### Description
Allow users to download their resume analysis results as a formatted PDF report.

### Benefits
- Users can save results for future reference
- Easy sharing with career counselors
- Professional presentation of insights

### Proposed Implementation
Add "Export as PDF" button in ResumeAnalyzer component that:
1. Formats analysis data into PDF template
2. Includes match score, skills gaps, recommendations
3. Downloads file named: `career-compass-analysis-{date}.pdf`

### Alternatives Considered
- Export as Word document (less portable)
- Email results (requires backend email service)
```

### Your First Code Contribution 🎯

Unsure where to begin? Look for issues labeled:

- `good first issue` - Simple issues perfect for newcomers
- `help wanted` - Issues where we need community help
- `beginner-friendly` - Great starting points

**First-time contributor checklist:**

- [ ] Read the entire CONTRIBUTING.md
- [ ] Set up development environment
- [ ] Pick an issue labeled `good first issue`
- [ ] Comment on the issue to claim it
- [ ] Fork the repository
- [ ] Create a feature branch
- [ ] Make your changes
- [ ] Write tests
- [ ] Submit pull request

---

## 🛠️ Development Setup

### Prerequisites

- **Node.js** 18+ and npm/yarn
- **Python** 3.12+
- **Git**
- **Docker** (optional, recommended)
- **Code Editor**: VS Code recommended

### Step 1: Fork and Clone

```bash
# Fork on GitHub, then clone your fork
git clone https://github.com/YOUR-USERNAME/career-compass.git
cd career-compass

# Add upstream remote
git remote add upstream https://github.com/original-owner/career-compass.git
```

### Step 2: Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
pip install -r requirements-dev.txt  # Development dependencies

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run backend
uvicorn app.main:app --reload --port 8000
```

### Step 3: Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your configuration

# Run development server
npm run dev
```

### Step 4: Verify Setup

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "ms-python.python",
    "ms-python.vscode-pylance",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-azuretools.vscode-docker"
  ]
}
```

---

## 📏 Coding Standards

### Python (Backend)

#### Style Guide
- Follow **PEP 8** style guide
- Use **Black** for code formatting
- Use **Ruff** for linting
- Maximum line length: **88 characters** (Black default)

#### Formatting Commands

```bash
# Format code with Black
black app/ tests/

# Check formatting
black --check app/ tests/

# Lint with Ruff
ruff check app/ tests/

# Auto-fix issues
ruff check --fix app/ tests/
```

#### Best Practices

```python
# ✅ Good
from typing import Optional
from pydantic import BaseModel

class AnalysisRequest(BaseModel):
    """Request model for resume analysis."""
    resume_text: str
    job_description: str
    include_suggestions: Optional[bool] = True

# ❌ Bad
class AnalysisRequest(BaseModel):
    resume_text = None
    job_description = None
```

**Key principles:**
- Use type hints everywhere
- Write docstrings for all functions/classes
- Keep functions small and focused
- Use meaningful variable names
- Avoid global variables

### TypeScript/React (Frontend)

#### Style Guide
- Follow **Airbnb JavaScript Style Guide**
- Use **ESLint** and **Prettier**
- Prefer **functional components** with hooks
- Use **TypeScript** for all new code

#### Formatting Commands

```bash
# Format code with Prettier
npm run format

# Check formatting
npm run format:check

# Lint with ESLint
npm run lint

# Auto-fix issues
npm run lint:fix
```

#### Best Practices

```typescript
// ✅ Good
interface ResumeAnalyzerProps {
  result: AnalysisResult;
  onReset: () => void;
}

export default function ResumeAnalyzer({ result, onReset }: ResumeAnalyzerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="space-y-6">
      {/* Component content */}
    </div>
  );
}

// ❌ Bad
export default function ResumeAnalyzer(props: any) {
  return <div>{props.result}</div>;
}
```

**Key principles:**
- Always define prop interfaces
- Use `const` for components
- Destructure props in function signature
- Use meaningful component/variable names
- Keep components small and reusable
- Use React hooks appropriately

### File Naming Conventions

```
Backend (Python):
- snake_case for files: resume_parser.py
- PascalCase for classes: class ResumeParser
- snake_case for functions: def parse_resume()

Frontend (TypeScript/React):
- PascalCase for components: ResumeUploader.tsx
- camelCase for utilities: api.ts
- kebab-case for CSS: resume-uploader.module.css
```

---

## 📝 Commit Guidelines

We follow the **Conventional Commits** specification.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Maintenance tasks

### Examples

```bash
# Feature
feat(analyze): add PDF password protection support

Add ability to handle password-protected PDFs during upload.
Prompts user for password if PDF is encrypted.

Closes #123

# Bug Fix
fix(chat): resolve session memory not persisting

Session IDs were not being properly stored in localStorage,
causing chat history to be lost on page refresh.

Fixes #456

# Documentation
docs(readme): update installation instructions

Add Docker installation steps and troubleshooting section.

# Refactoring
refactor(backend): simplify LLM factory initialization

Extract common initialization logic into separate function
to reduce code duplication across modules.

# Breaking Change
feat(api)!: change analyze endpoint response format

BREAKING CHANGE: Analysis response now returns skills as
object with categories instead of flat array.

Before: { skills: ["Python", "React"] }
After: { skills: { languages: ["Python"], frameworks: ["React"] } }
```

### Commit Best Practices

- **Keep commits atomic**: One logical change per commit
- **Write clear messages**: Explain what and why, not how
- **Reference issues**: Use "Closes #123" or "Fixes #456"
- **Use present tense**: "Add feature" not "Added feature"
- **Keep subject line under 50 characters**
- **Wrap body at 72 characters**

---

## 🔄 Pull Request Process

### Before Submitting

**Checklist:**

- [ ] Code follows project style guidelines
- [ ] All tests pass (`npm test` and `pytest`)
- [ ] New tests added for new features
- [ ] Documentation updated if needed
- [ ] Commit messages follow conventions
- [ ] No merge conflicts with main branch
- [ ] Code has been self-reviewed
- [ ] No console.log or debugging code left

### Creating Pull Request

1. **Update your fork**

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

2. **Create feature branch**

```bash
git checkout -b feature/your-feature-name
```

3. **Make changes and commit**

```bash
git add .
git commit -m "feat: add your feature"
```

4. **Push to your fork**

```bash
git push origin feature/your-feature-name
```

5. **Create Pull Request on GitHub**

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)
- [ ] Breaking change
- [ ] Documentation update

## How Has This Been Tested?
Describe the tests you ran

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Added tests
- [ ] All tests passing
- [ ] No merge conflicts
```

### Review Process

1. **Automated Checks**: CI/CD runs tests and linting
2. **Code Review**: Maintainers review your code
3. **Feedback**: Address any requested changes
4. **Approval**: Once approved, PR will be merged
5. **Cleanup**: Delete your feature branch

**Review timelines:**
- Minor fixes: 1-2 days
- Features: 3-5 days
- Major changes: 5-7 days

---

## 🧪 Testing Guidelines

### Backend Testing

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app tests/

# Run specific test
pytest tests/test_api.py::test_analyze_endpoint -v

# Run tests in parallel
pytest -n auto
```

**Test structure:**

```python
def test_analyze_endpoint_success():
    """Test successful resume analysis."""
    # Arrange
    client = TestClient(app)
    resume_file = ("resume.pdf", b"fake pdf content", "application/pdf")
    data = {"job_description": "Python Developer position"}
    
    # Act
    response = client.post("/api/v1/analyze", files={"resume": resume_file}, data=data)
    
    # Assert
    assert response.status_code == 200
    assert "overallScore" in response.json()
```

### Frontend Testing

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run in watch mode
npm test -- --watch

# Run specific test
npm test -- ResumeUploader.test.tsx
```

**Test structure:**

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import ResumeUploader from './ResumeUploader';

describe('ResumeUploader', () => {
  it('should upload file successfully', () => {
    // Arrange
    const mockOnFileSelect = jest.fn();
    render(<ResumeUploader onFileSelect={mockOnFileSelect} selectedFile={null} />);
    
    // Act
    const file = new File(['resume'], 'resume.pdf', { type: 'application/pdf' });
    const input = screen.getByLabelText(/upload/i);
    fireEvent.change(input, { target: { files: [file] } });
    
    // Assert
    expect(mockOnFileSelect).toHaveBeenCalledWith(file);
  });
});
```

### Coverage Requirements

- **Minimum coverage**: 80%
- **Critical paths**: 100% coverage required
- **New features**: Must include tests

---

## 📚 Documentation

### Code Documentation

**Python docstrings:**

```python
def analyze_resume(resume_text: str, job_description: str) -> AnalysisResult:
    """
    Analyze resume against job description.
    
    Args:
        resume_text: Extracted text from resume PDF
        job_description: Job posting requirements
        
    Returns:
        AnalysisResult containing match score and recommendations
        
    Raises:
        ValueError: If resume_text or job_description is empty
        
    Example:
        >>> result = analyze_resume("Python developer...", "Looking for Python...")
        >>> print(result.overall_score)
        85
    """
    pass
```

**TypeScript documentation:**

```typescript
/**
 * Upload and parse resume file
 * 
 * @param file - PDF resume file
 * @param onSuccess - Callback when upload succeeds
 * @param onError - Callback when upload fails
 * @returns Promise resolving to parsed resume data
 * 
 * @example
 * ```typescript
 * await uploadResume(file, 
 *   (data) => console.log('Success:', data),
 *   (error) => console.error('Error:', error)
 * );
 * ```
 */
export async function uploadResume(
  file: File,
  onSuccess: (data: ResumeData) => void,
  onError: (error: Error) => void
): Promise<void> {
  // Implementation
}
```

### README Updates

When adding features, update:
- Main README.md
- API documentation section
- Configuration examples
- Usage examples

---

## 👥 Community

### Getting Help

- 💬 **Discord**: [Join our server](https://discord.gg/careercompass)
- 📧 **Email**: dev@careercompass.dev
- 🐦 **Twitter**: [@CareerCompassAI](https://twitter.com/CareerCompassAI)
- 📖 **Docs**: [docs.careercompass.dev](https://docs.careercompass.dev)

### Recognition

Contributors are recognized in:
- README.md contributors section
- CHANGELOG.md for each release
- Monthly contributor spotlight on Discord

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and ideas
- **Discord**: Real-time chat and community support
- **Twitter**: Project updates and announcements

---

## 🎖️ Recognition

We appreciate all contributions! Contributors will be:

- Listed in README.md
- Mentioned in release notes
- Invited to contributor Discord channel
- Eligible for contributor swag (coming soon!)

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## ❓ Questions?

Don't hesitate to ask! Create a GitHub Discussion or join our Discord.

**Thank you for contributing to Career Compass!** 🚀

---

*Last updated: December 2024*
