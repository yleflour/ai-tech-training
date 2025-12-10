The objective of this project is to migrate the ./COBOL-AIRLINES to a modern website.

## Context
- Legacy Codebase: ./COBOL-AIRLINES
- Specification: ./teardown/overview.md

## Specifications
- Path: ./teardown/
- Models:
  - Overview: ./teardown/models.md
  - Documentation: ./teardown/models/{table-name}.md
- Pages:
  - Overview: ./teardown/pages.md
  - Documentation: ./teardown/pages/{page-name}.md
- Controllers:
  - Overview: ./teardown/controllers.md
  - Documentation: ./teardown/controllers/{controller-name}.md
- Services:
  - Overview: ./teardown/services.md
  - Documentation: ./teardown/services/{service-name}.md
- Fixtures:
  - Overview: ./teardown/fixtures.md
  - Documentation: ./teardown/fixtures/{fixture-name}.md

## Stack
- Language:Python 3.13
- Runtime + Package Manager: uvicorn
- Framework: Django 6
- Database: SQLite
- Type: SSR
- UI Framework: Tailwind CSS