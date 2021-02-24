
# Angular infinite Scroller

An infinite scroll directive for Angular
## Demo
https://stackblitz.com/github/AregSargsyan/infinite-scroll-demo/tree/main/scroller-demo  

**Step 1:** Install angular-infinite-scroller

```sh
npm i angular11-infinite-scroller
```
**Step 2:** Import angular infinite-scroller  module into your app module

```ts
....
import { NgaInfiniteScrollerModule } from 'angular11-infinite-scroller';

....

@NgModule({
    ...
    imports: [
        ....
        NgaInfiniteScrollerModule
    ],
    ....
})
export class AppModule { }
```

**Step 3:** Add ts code to the component
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div infiniteScroll (scrolled)="increaseingArray()" infiniteScrollDistance="0.8">
    <p *ngFor="let item of arr">{{item}}</p>
  </div>
  `,
  styles: [`div{height: 70vh; overflow-y: auto;}`]
})
export class AppComponent {
  arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]

  increaseingArray() {
    console.log("scroll event triggered")
    for (let i = 0; i < 50; i++) {
      this.arr.push(this.arr[this.arr.length - 1] + 1)
    }
  }
}

```
## API

| Output         | Description
|----------------|------------
| scrolled()       |  This event fires when the distance threshold is reached when scrolling down

| Input          | Required   | Description
|----------------|------------|------------
| infiniteScrollDistance | Optional | (Default=0.9) the bottom point of the scroll nob relatively to the  container (i.e, 0.8 (0.8 * 100 = 80%)  event is triggered when 80% has been scrolled).


## Further help

In case of questions feel free to contact me https://linkedin.com/in/areg-sargsyan

## License
[MIT](https://choosealicense.com/licenses/mit/)
