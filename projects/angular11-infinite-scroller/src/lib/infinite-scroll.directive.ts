import { Directive, ElementRef, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output } from "@angular/core";
import { fromEvent, Subscription } from "rxjs";
import { debounceTime, filter } from "rxjs/operators";

@Directive({
  selector: '[infiniteScroll]'
})
export class InfiniteScrollDirective implements OnInit, OnDestroy{

  previousScrollPosition: number = 0
  subscription$!: Subscription
  @Output() scrolled = new EventEmitter<void>()
  @Input() infiniteScrollDistance = "0.9"

  constructor(private el: ElementRef, private ngZone: NgZone) { }

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => this.detectingScrolledPosition())
  }

  private detectingScrolledPosition(): void {
    const hostElFixedHeight = parseInt(getComputedStyle(this.el.nativeElement).height)
    this.subscription$ = fromEvent<Event>(this.el.nativeElement, "scroll").
      pipe(debounceTime(300), filter((e: Event) => (e.target as Element).scrollTop > this.previousScrollPosition))
      .subscribe((e: Event) => {
        this.previousScrollPosition = (e.target as Element).scrollTop
        const scrolledAreaHeight = (e.target as Element).scrollTop
        const hostElementContentHeight = this.el.nativeElement.scrollHeight;
        (hostElFixedHeight + scrolledAreaHeight) / hostElementContentHeight > +this.infiniteScrollDistance && this.emitEvent()
      })
  }

  private emitEvent(): void {
    this.ngZone.run(() => this.scrolled.emit())
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }
}
