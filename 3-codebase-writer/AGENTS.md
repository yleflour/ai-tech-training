The objective of this project is to migrate the ./COBOL-AIRLINES to a modern website.

## Context
- Legacy Codebase: ./legacy/COBOL-AIRLINES
- Specification: ./legacy/teardown/overview.md

## Specifications
- Path: ./legacy/teardown/
- Models:
  - Overview: ./legacy/teardown/models.md
  - Documentation: ./legacy/teardown/models/{table-name}.md
- Pages:
  - Overview: ./legacy/teardown/pages.md
  - Documentation: ./legacy/teardown/pages/{page-name}.md
- Controllers:
  - Overview: ./legacy/teardown/controllers.md
  - Documentation: ./legacy/teardown/controllers/{controller-name}.md
- Services:
  - Overview: ./legacy/teardown/services.md
  - Documentation: ./legacy/teardown/services/{service-name}.md
- Fixtures:
  - Overview: ./legacy/teardown/fixtures.md
  - Documentation: ./legacy/teardown/fixtures/{fixture-name}.md

## Stack
- Language:Python 3.13
- Runtime + Package Manager: uvicorn
- Framework: Django 6
- Database: SQLite
- Type: SSR
- UI Framework: Tailwind CSS