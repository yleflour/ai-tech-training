<template name="screen">
# {SCREEN NAME}

{Screen Description}

## Data model
<!-- The view's data model -->
```ts
interface {ScreenName}Data {
  /*...fields*/
}
```

## Actions
- {action-name}: {Action Description}

## Layout
```html
<!--
An pseudo-html layout of the screen
<rule>Exclude any Cobol specific layout attributes like col, line, pos, ...</rule>
-->

<!-- Example -->
<screen>
  <header>{Screen Title}</header>
  <main>
    <section>
      <form onsubmit="{action-name}">
        <input type="text" name="field" placeholder="Input" />
        <button type="submit">Submit</button>
      </form>
    </section>
    <section>
      <button onclick="{action-name}">{Action Label}</button>
    </section>
  </main>
</screen>
<!-- End of Example -->
```

## Business Logic
<!-- For each business rule in the screen -->
```
// Gerkin syntax rule
```
<!-- End for -->

<!-- If form in screen -->
## Form validation
```ts
const schema = z4.object({/*...*/});
```
<!-- End if -->

## User Flow
```mermaid
/*
  Mermaid diagram with:
  - User flow
  - Actions
  - Events
*/
```

## Relevant files
<!-- Relevant files from the legacy codebase -->
- [FileName.ext](relative/path/to/file/from/this/markdown/file)
- ...

</template>

<instructions>
screens = CobolProject.screens

for (each screen in screens)
  file("./teardown/pages/{screen.name}.md").write(<template name="screen" />, screen)

file("./teardown/pages.md").write(`
  - Mermaid flowchart of screens and their relationships
  - Put feature related screens in the same subgraph
`, screens)
</instructions>.execute()