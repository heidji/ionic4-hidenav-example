import {
    AfterViewInit,
    Component,
    ContentChild,
    ElementRef,
    OnInit,
    Input,
    EventEmitter,
    Output,
    ContentChildren,
    QueryList, HostBinding
} from '@angular/core';
import {IonContent} from '@ionic/angular';

@Component({
    selector: 'hidenav-stretchheader',
    template: `
        <style>
            .overlay {
                position: absolute;
                height: inherit;
                width: inherit;
                z-index: 101;
                pointer-events: none;
                /*opacity: var(--opacity);*/
                background: var(--color);
                filter: opacity(0);
                --opacity: 0;
                --color: black;
            }
            :host{
                z-index: 1;
            }
            :host.md{
                -webkit-box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.53);
                -moz-box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.53);
                box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.53);
            }
            :host.ios {
                border-bottom: 1px solid #5a5e63;
            }
        </style>
        <div class="overlay"></div>
        <ng-content></ng-content>
    `
})
export class HidenavStretchheaderComponent implements OnInit, AfterViewInit {
    @ContentChild('shrinkexpand', {read: ElementRef}) shrinkexpand: ElementRef;
    @ContentChildren('static', {read: ElementRef}) static: any;
    @HostBinding('class') class: any;
    @Input('hidenav-rel-content') content: IonContent;

    @Output() scroll: EventEmitter<number> = new EventEmitter<number>();

    shrinkexpandHeight: number;
    shrinkexpandheaderHeight: number;

    private lastscroll = 0;

    opacityFactor: any;
    opacityColor: any;
    initExpanded = false;

    contentElem;
    guardEvents = true;

    mode: any = 'ios';

    constructor(public el: ElementRef) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.mode = document.querySelector('html').getAttribute('mode');
        setTimeout(() => {
            this.class += ' '+this.mode;
        }, 0);
        if (this.static) {
            this.static.forEach(el => {
                el.nativeElement.style.position = 'absolute';
                el.nativeElement.style.zIndex = 102;
            })
        }

        if (this.shrinkexpand) {
            let parent = this.shrinkexpand.nativeElement.parentNode;
            let elem = this.shrinkexpand.nativeElement;
            if(elem.getAttribute('init-expanded'))
                this.initExpanded = true;
            this.shrinkexpandheaderHeight = parseInt(elem.getAttribute('header-height'), 10);
            this.opacityFactor = parseInt(elem.getAttribute('opacity-factor'), 10);
            this.opacityColor = elem.getAttribute('opacity-color');
            parent.style.height = this.shrinkexpandheaderHeight + 'px';
            parent.style.overflow = 'hidden';
            parent.style.position = 'absolute';
            elem.style.position = 'absolute';
            parent.style.width = '100%';
            elem.style.width = '100%';
            this.waitforelem([parent, elem], 'this.shrinkexpand.nativeElement.scrollHeight', 'proceedShrinkExpand');
        }

    }

    waitforelem(obj, evaluate, func) {
        let x = eval(evaluate);
        if (!{x} || x < this.shrinkexpandheaderHeight) {
            window.requestAnimationFrame(this.waitforelem.bind(this, obj, evaluate, func));
        } else {
            this[func](obj);
        }
    }

    proceedShrinkExpand(obj) {
        let parent = obj[0];
        let elem = obj[1];
        let overlay = this.shrinkexpand.nativeElement.parentNode.querySelector('.overlay');
        if(this.opacityColor){
            overlay.style.setProperty('--color', this.opacityColor);
        }
        if(this.opacityFactor > 0){
            //angular decides that opacity it bad and changes it to alpha which doesn't work lol
            overlay.style.setProperty('filter', 'opacity(var(--opacity))');
            overlay.style.setProperty('--opacity', this.opacityFactor / 10);
        }
        this.shrinkexpandHeight = this.shrinkexpandheaderHeight;
        this.shrinkexpandHeight = this.shrinkexpand.nativeElement.scrollHeight;
        elem.style.transform = 'translate3d(0, ' + -((this.shrinkexpandHeight - this.shrinkexpandheaderHeight) / 2) + 'px, 0)';
        this.content.getScrollElement().then(res => {
            this.contentElem = res;
            this.contentElem.style.paddingTop = (this.shrinkexpandHeight) + 'px';
            //this.contentElem.style.marginTop = this.shrinkexpandheaderHeight + 'px';
            let elemPad = document.createElement('div');
            let x = this.contentElem.scrollHeight + (this.shrinkexpandHeight - this.shrinkexpandheaderHeight);
            //experimental height
            elemPad.style.height = x + 'px';
            setTimeout(() => {
                //check if height is still ok and adjust if not
                elemPad.style.height = Math.max(0, (x - (this.contentElem.scrollHeight - this.contentElem.offsetHeight) + (this.shrinkexpandHeight - this.shrinkexpandheaderHeight))) + 'px';
            }, 10);
            this.contentElem.appendChild(elemPad);
            let scrollDist = this.initExpanded ? 2 : (this.shrinkexpandHeight - this.shrinkexpandheaderHeight);
            this.content.scrollByPoint(0, scrollDist, 0).then(() => {
                this.content.scrollEvents = true;
                this.content.ionScroll.subscribe(e => {
                    if(this.initExpanded){
                        this.content.scrollToPoint(0, 0, 0).then(() => {
                            this.initExpanded = false;
                        })
                    }
                    let height = Math.max(Math.min(this.shrinkexpandHeight, this.shrinkexpandHeight - e.detail.scrollTop), this.shrinkexpandheaderHeight)
                    elem.style.transform = 'translate3d(0, ' + -(Math.min((this.shrinkexpandHeight - this.shrinkexpandheaderHeight) / 2, e.detail.scrollTop / 2)) + 'px, 0)';
                    parent.style.height = height + 'px';
                    overlay.style.setProperty('--opacity', this.opacityFactor / 10 * Math.min(e.detail.scrollTop / (this.shrinkexpandHeight / 2), 1));
                    //event emitter
                    setTimeout(() => {
                        this.guardEvents = false;
                    }, 10);
                    if(this.lastscroll != height && !this.guardEvents){
                        this.scroll.emit(height);
                    }
                    this.lastscroll = height
                    //
                });
            });
        });
    }

    public expand(duration = 200) {
        this.content.scrollToPoint(0, 0, duration);
    }

    shrink(duration = 200) {
        if(this.contentElem.scrollTop < (this.shrinkexpandHeight - this.shrinkexpandheaderHeight))
            this.content.scrollToPoint(0, (this.shrinkexpandHeight - this.shrinkexpandheaderHeight), duration);
    }

    toggle(duration = 200) {
        if(this.contentElem.scrollTop < (this.shrinkexpandHeight - this.shrinkexpandheaderHeight))
            this.content.scrollToPoint(0, (this.shrinkexpandHeight - this.shrinkexpandheaderHeight), duration);
        else
            this.content.scrollToPoint(0, 0, duration);
    }
}
