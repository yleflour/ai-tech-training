<template name="controller">
# {CONTROLLER NAME}

{Controller Description}

<!-- For each route in the controller -->
## {Route Name}

<!--
REST equivalent of the route
- Use ":paramName" for the route parameters (e.g. /api/users/:userId)
-->
- URL: "path/to/route" 
- Method: "GET" | "POST" | "PUT" | "DELETE"
- Description: {Route Description}
- Content Type: "application/json" | "text/html"
- View: [page-name](relative/path/to/page.md/from/this/markdown/file)

### Data model
```ts
declare namespace {RouteName} {
  export namespace Request {
    // If POST
    interface Body {
      /*...fields*/
    }

    // If GET
    interface Params {
      /*...fields*/
    }
  }

  export namespace Response { 
    // If not a view
    export interface Body {
      /*...fields*/
    }
  }
}
```

### Business Logic
<!-- Rewrite the logic to be stack agnostic -->
```mermaid
sequenceDiagram
  ...
```

### Relevant models
- [ModelName](./{model-name}.md)

### Relevant files
<!-- Relevant files from the legacy codebase -->
- [FileName.ext](relative/path/to/file/from/this/markdown/file)
- ...

<!-- End for -->
</template>

<instructions>
pages = globs("teardown/pages/*.md")
models = globs("teardown/models/*.md")
pages.read()

controllers = inferControllers(pages)

for (each controller in controllers)
  file("./teardown/controllers/{controller.name}.md").write(<template name="controller" />, controller)

file("./teardown/controllers.md").write(mermaid-diagram, controllers)
<instructions>.execute()
