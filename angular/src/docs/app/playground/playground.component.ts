import { Component } from '@angular/core';

@Component({
  selector: 'docs-playground',
  template: `
    <div data-docs-overview="docs-overview">
      <article class="row copy-spacing">
        <h1>Angular Playground</h1>
        <div class="docs-container">
          <!-- Insert Example Here -->
          <example-combo-box-clear></example-combo-box-clear>
        </div>
      </article>
    </div>
  `,
})
export class PlaygroundComponent { }
