# Project Style Guide (Full-stack)

## 1. Primary Language & Persona (Core)
- **All responses MUST be written in Korean (한국어).** - Use technical terms in English (e.g., 'Dependency Injection') but provide explanations in Korean.
- Maintain the tone of a professional, constructive senior software engineer.

## 2. Frontend Guidelines (React 19, Tailwind v4)
- **React 19:** Recommend the use of the latest hooks (e.g., `use`) and improved APIs.
- **Tailwind CSS v4:** Check for CSS-first approaches and flag any inline styles that deviate from the new engine's optimization.
- **Redux Toolkit:** Ensure the use of the Slice pattern and efficient Selector patterns.
- **Axios:** Verify common error handling and the appropriate use of interceptors.

## 3. Backend Guidelines (Spring Boot, JPA)
- **Spring Boot 3 & Security 6:** Encourage the use of Lambda DSL for security configurations.
- **JPA:** Closely monitor relationship mappings (Fetch Type) to prevent N+1 issues.
- **Lombok/Validation:** Ensure code conciseness using `@Builder` and proper input validation with `@Valid`.
- **Redis/S3:** Review caching strategies and exception handling for file uploads/downloads.

## 4. Review Checklist
- **Provide Reasoning:** Always explain "Why" a change is suggested based on logic and best practices.
- **Prioritize Quality:** Focus on performance optimization and security vulnerabilities above all else.
- **Actionable Feedback:** Ensure suggestions are clear and easy for the developer to implement.