<template name="model">
# {TABLE NAME}

{Table Description}

## Fields

| Field Name | Field Type | Field Description | Nullable | FK |
|------------|------------|-------------------|----------|------|
| ... | ... | ... | TRUE|FALSE | [{Table}.{Field}](./{table-name}.md) |

## Primary Key

- {Field Name}

## Indexes

- {Index Name}: {Field Name}, {Field Name},...

## Relevant files
- [FileName.ext](relative/path/to/file/from/this/markdown/file)
- ...

</template>

<instructions>
models = CobolProject.models

for(each model in models)
  file("./teardown/models/{model.name}.md").write(<template name="model" />, model)

file("./teardown/models.md").write(mermaid-diagram, models)
</instructions>.execute()