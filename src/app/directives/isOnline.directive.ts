import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[isOnline]',
})
export class IsOnlineDirective {
  @Input()
  set isOnline(isOnline: boolean) {
    isOnline ? this.viewContainer.createEmbeddedView(this.templateRef)
             : this.viewContainer.clear();
  }

  public online: boolean;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,) {}
}
