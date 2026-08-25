# cyb-plan

Interactive degree planner for the **Taibah University Cybersecurity program**.

The goal is to turn the official study plan into something a student can actually use: understand prerequisites, explore the degree structure, track completed courses, and plan future semesters.

## Planned features

- Official curriculum data in structured JSON
- Semester-by-semester degree map
- Course explorer
- Prerequisite dependency graph
- Progress tracking
- Next-semester eligibility checks
- What-if analysis for delayed courses
- Elective exploration

## Project principles

1. **Official data first** — curriculum information should come from Taibah University sources.
2. **No invented prerequisites** — unknown relationships stay unknown until verified.
3. **Logic before UI** — prerequisite and planning rules should be testable independently of the web interface.
4. **Student-first** — every feature should answer a real planning question.

## Current source

The curriculum is based on the current Taibah University Cybersecurity program page and individual course pages. The university page currently lists a 5-year plan with 10 terms and publishes course codes, names, credit units, and course structure.

- https://www.taibahu.edu.sa/en/admission-and-study/programs/cyber-security-0

## Status

Early MVP. The repository currently establishes the data model and static planner foundation; verified prerequisite coverage will be expanded course-by-course.
