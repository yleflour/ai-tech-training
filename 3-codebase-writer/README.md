# COBOL Airlines

A modern Django web application migrated from a legacy COBOL-based airline management system.

## Requirements

- Python 3.12+
- [uv](https://docs.astral.sh/uv/) (Python package manager)

## Installation

1. Install dependencies:

```bash
uv sync
```

2. Run database migrations:

```bash
uv run python manage.py migrate
```

3. Create a superuser (optional, for admin access):

```bash
uv run python manage.py createsuperuser
```

## Running the Development Server

```bash
uv run python manage.py runserver
```

The application will be available at http://127.0.0.1:8000/

Admin interface: http://127.0.0.1:8000/admin/

