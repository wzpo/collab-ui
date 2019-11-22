import { Component } from '@angular/core';

@Component({
  selector: 'docs-playground',
  template: `
    <div data-docs-overview="docs-overview">
      <article class="row copy-spacing">
        <h1>Angular Playground</h1>
        <div class="docs-container">
          <!-- Insert Example Here -->
          <example-data-table-multi-select-checkbox></example-data-table-multi-select-checkbox>
          
<!--
          <example-data-table-multi-dropdown-select></example-data-table-multi-dropdown-select>
          <example-data-table-multi-select-resize-scroll></example-data-table-multi-select-resize-scroll>
          
          

          
          
          
-->
        </div>
      </article>
    </div>
  `,
})
export class PlaygroundComponent { }
