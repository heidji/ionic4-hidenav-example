import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HidenavShService {

    data = [];
    mode: any = 'ios';

    scroll: any = new EventEmitter();

    constructor() {
    }

    initiate(name) {
        let names = [];
        for (let key in this.data) {
            if (this.data[key].parent == name)
                names.push(key);
        }
        for(let name of names){
            this.initiate2(name);
        }
        if(names.length == 0)
            this.initiate2(name);
    }

    initiate2(name){
        if (!(this.data[name] && (this.data[name].parent && this.data[this.data[name].parent] && this.data[this.data[name].parent].tabscontent && this.data[name].content && this.data[this.data[name].parent].header) || (!this.data[name].parent && this.data[name].content && this.data[name].header)))
            return false;
        let parent = this.data[name].parent;
        let content = this.data[name].content;
        if (this.data[name].lastscroll == null)
            this.data[name].lastscroll = 0;
        if (this.data[name].guardEvents == null)
            this.data[name].guardEvents = true;
        content.scrollEvents = true;
        if (!parent) {
            let header = this.data[name].header;
            if (this.data[name].static) {
                this.data[name].static.forEach(el => {
                    el.nativeElement.style.position = 'absolute';
                    el.nativeElement.style.zIndex = 102;
                });
            }

            if (header) {
                let parentElem = header.nativeElement.parentNode;
                let elem = header.nativeElement;
                if (elem.getAttribute('init-expanded') == 'true')
                    this.data[name].initExpanded = true;
                this.data[name].shrinkexpandheaderHeight = parseInt(elem.getAttribute('header-height'), 10);
                this.data[name].opacityFactor = parseInt(elem.getAttribute('opacity-factor'), 10);
                this.data[name].opacityColor = elem.getAttribute('opacity-color');
                parentElem.style.height = this.data[name].shrinkexpandheaderHeight + 'px';
                parentElem.style.overflow = 'hidden';
                parentElem.style.position = 'absolute';
                elem.style.position = 'absolute';
                parentElem.style.width = '100%';
                elem.style.width = '100%';
                this.waitforelem(name, 'this.data[name].header.nativeElement.scrollHeight', 'proceedShrinkExpand');
            }
        } else if (parent) {
            let header = this.data[parent].header;
            let tabscontentElem = this.data[parent].tabscontentElem;
            if (this.data[parent].static) {
                this.data[parent].static.forEach(el => {
                    el.nativeElement.style.position = 'absolute';
                    el.nativeElement.style.zIndex = 102;
                });
            }

            if (header) {
                let supertabsToolbar: any = tabscontentElem.nativeElement.querySelector('super-tabs-toolbar');
                let parentElem = header.nativeElement.parentNode;
                let elem = header.nativeElement;
                if (elem.getAttribute('init-expanded') == 'true')
                    this.data[name].initExpanded = true;
                this.data[name].shrinkexpandheaderHeight = parseInt(elem.getAttribute('header-height'), 10);
                this.data[name].opacityFactor = parseInt(elem.getAttribute('opacity-factor'), 10);
                this.data[name].opacityColor = elem.getAttribute('opacity-color');
                parentElem.style.height = this.data[name].shrinkexpandheaderHeight + 'px';
                parentElem.style.overflow = 'hidden';
                parentElem.style.position = 'absolute';
                elem.style.position = 'absolute';
                parentElem.style.width = '100%';
                elem.style.width = '100%';
                supertabsToolbar.style.position = 'absolute';
                supertabsToolbar.style.transform = 'translate3d(0, ' + this.data[name].shrinkexpandheaderHeight + 'px, 0)';
                parentElem.style.zIndex = 101;
                this.waitforelemTabs(name, 'this.data[this.data[name].parent].header.nativeElement.scrollHeight',  "this.data[this.data[name].parent].tabscontentElem.nativeElement.querySelector('super-tabs-toolbar').clientHeight",'proceedShrinkExpandTabs');
            }
        }
    }

    waitforelem(name, evaluate, func) {
        let x = eval(evaluate);
        if (!{x} || x < this.data[name].shrinkexpandheaderHeight) {
            window.requestAnimationFrame(this.waitforelem.bind(this, name, evaluate, func));
        } else {
            this[func](name);
        }
    }

    waitforelemTabs(name, evaluate, evaluate2, func) {
        let x = eval(evaluate);
        let y = eval(evaluate2);
        if (!{x} || x < this.data[name].shrinkexpandheaderHeight || !{y} || y == 0) {
            window.requestAnimationFrame(this.waitforelemTabs.bind(this, name, evaluate, evaluate2, func));
        } else {
            this[func](name);
        }
    }

    proceedShrinkExpand(name) {
        let parentElem = this.data[name].header.nativeElement.parentNode;
        let elem = this.data[name].header.nativeElement;
        let overlay = this.data[name].header.nativeElement.parentNode.querySelector('.overlay');
        if (this.data[name].opacityColor) {
            overlay.style.setProperty('--color', this.data[name].opacityColor);
        }
        if (this.data[name].opacityFactor > 0) {
            //angular decides that opacity it bad and changes it to alpha which doesn't work lol
            overlay.style.setProperty('filter', 'opacity(var(--opacity))');
            overlay.style.setProperty('--opacity', this.data[name].opacityFactor / 10);
        }
        this.data[name].shrinkexpandHeight = this.data[name].shrinkexpandheaderHeight;
        this.data[name].shrinkexpandHeight = this.data[name].header.nativeElement.scrollHeight;
        elem.style.transform = 'translate3d(0, ' + -((this.data[name].shrinkexpandHeight - this.data[name].shrinkexpandheaderHeight) / 2) + 'px, 0)';
        this.data[name].content.getScrollElement().then(res => {
            this.data[name].contentElem = res;
            this.data[name].contentElem.style.paddingTop = (this.data[name].shrinkexpandHeight) + 'px';
            //this.data[name].contentElem.style.marginTop = this.data[name].shrinkexpandheaderHeight + 'px';
            let elemPad = document.createElement('div');
            let x = this.data[name].contentElem.scrollHeight + (this.data[name].shrinkexpandHeight - this.data[name].shrinkexpandheaderHeight);
            //experimental height
            elemPad.style.height = x + 'px';
            setTimeout(() => {
                //check if height is still ok and adjust if not
                elemPad.style.height = Math.max(0, (x - (this.data[name].contentElem.scrollHeight - this.data[name].contentElem.offsetHeight) + (this.data[name].shrinkexpandHeight - this.data[name].shrinkexpandheaderHeight))) + 'px';
            }, 10);
            this.data[name].contentElem.appendChild(elemPad);
            let scrollDist = this.data[name].initExpanded ? 2 : (this.data[name].shrinkexpandHeight - this.data[name].shrinkexpandheaderHeight);
            this.data[name].content.scrollByPoint(0, scrollDist, 0).then(() => {
                this.data[name].content.scrollEvents = true;
                this.data[name].content.ionScroll.subscribe(e => {
                    if (this.data[name].initExpanded) {
                        this.data[name].content.scrollToPoint(0, 0, 0).then(() => {
                            this.data[name].initExpanded = false;
                        });
                    }
                    let height = Math.max(Math.min(this.data[name].shrinkexpandHeight, this.data[name].shrinkexpandHeight - e.detail.scrollTop), this.data[name].shrinkexpandheaderHeight);
                    elem.style.transform = 'translate3d(0, ' + -(Math.min((this.data[name].shrinkexpandHeight - this.data[name].shrinkexpandheaderHeight) / 2, e.detail.scrollTop / 2)) + 'px, 0)';
                    parentElem.style.height = height + 'px';
                    overlay.style.setProperty('--opacity', this.data[name].opacityFactor / 10 * Math.min(e.detail.scrollTop / (this.data[name].shrinkexpandHeight / 2), 1));
                    //event emitter
                    setTimeout(() => {
                        this.data[name].guardEvents = false;
                    }, 10);
                    if (this.data[name].lastscroll != height && !this.data[name].guardEvents) {
                        this.scroll.emit({name: this.data[name].parent ? this.data[name].parent : name, height: height});
                    }
                    this.data[name].lastscroll = height;
                    //
                });
            });
        });
    }

    proceedShrinkExpandTabs(name) {
        let parent = this.data[name].parent;
        let parentElem = this.data[parent].header.nativeElement.parentNode;
        let elem = this.data[parent].header.nativeElement;
        let tabscontentElem = this.data[parent].tabscontentElem;
        let supertabsToolbar: any = tabscontentElem.nativeElement.querySelector('super-tabs-toolbar');
        let overlay = this.data[parent].header.nativeElement.parentNode.querySelector('.overlay');
        if (this.data[name].opacityColor) {
            overlay.style.setProperty('--color', this.data[name].opacityColor);
        }
        if (this.data[name].opacityFactor > 0) {
            //angular decides that opacity it bad and changes it to alpha which doesn't work lol
            overlay.style.setProperty('filter', 'opacity(var(--opacity))');
            overlay.style.setProperty('--opacity', this.data[name].opacityFactor / 10);
        }
        this.data[name].shrinkexpandHeight = this.data[name].shrinkexpandheaderHeight;
        this.data[name].shrinkexpandHeight = elem.scrollHeight;
        elem.style.transform = 'translate3d(0, ' + -((this.data[name].shrinkexpandHeight - this.data[name].shrinkexpandheaderHeight) / 2) + 'px, 0)';
        this.data[name].content.getScrollElement().then(res => {
            this.data[name].contentElem = res;
            this.data[name].contentElem.style.paddingTop = (this.data[name].shrinkexpandHeight + supertabsToolbar.clientHeight) + 'px';
            //this.data[name].contentElem.style.marginTop = this.data[name].shrinkexpandheaderHeight + 'px';
            let elemPad = document.createElement('div');
            let x = this.data[name].contentElem.scrollHeight + (this.data[name].shrinkexpandHeight - this.data[name].shrinkexpandheaderHeight);
            //experimental height
            elemPad.style.height = x + 'px';
            setTimeout(() => {
                //check if height is still ok and adjust if not
                elemPad.style.height = Math.max(0, (x - (this.data[name].contentElem.scrollHeight - this.data[name].contentElem.offsetHeight) + (this.data[name].shrinkexpandHeight - this.data[name].shrinkexpandheaderHeight))) + 'px';
            }, 10);
            this.data[name].contentElem.appendChild(elemPad);
            let scrollDist = this.data[name].initExpanded ? 2 : (this.data[name].shrinkexpandHeight - this.data[name].shrinkexpandheaderHeight);
            this.data[name].content.scrollByPoint(0, scrollDist, 0).then(() => {
                this.data[name].content.scrollEvents = true;
                this.data[name].content.ionScroll.subscribe(e => {
                    if (this.data[name].initExpanded) {
                        this.data[name].content.scrollToPoint(0, 0, 0).then(() => {
                            this.data[name].initExpanded = false;
                        });
                    }
                    let height = Math.max(Math.min(this.data[name].shrinkexpandHeight, this.data[name].shrinkexpandHeight - e.detail.scrollTop), this.data[name].shrinkexpandheaderHeight);
                    elem.style.transform = 'translate3d(0, ' + -(Math.min((this.data[name].shrinkexpandHeight - this.data[name].shrinkexpandheaderHeight) / 2, e.detail.scrollTop / 2)) + 'px, 0)';
                    parentElem.style.height = height + 'px';
                    overlay.style.setProperty('--opacity', this.data[name].opacityFactor / 10 * Math.min(e.detail.scrollTop / (this.data[name].shrinkexpandHeight / 2), 1));
                    supertabsToolbar.style.transform = 'translate3d(0, ' + height + 'px, 0)';
                    //event emitter
                    setTimeout(() => {
                        this.data[name].guardEvents = false;
                    }, 10);
                    if (this.data[name].lastscroll != height && !this.data[name].guardEvents) {
                        this.scroll.emit({name: this.data[name].parent ? this.data[name].parent : name, height: height});
                    }
                    this.data[name].lastscroll = height;
                    //
                });
            });
        });
    }

    resetContent(name){
        let parent = this.data[name].parent;
        let height = parseInt(this.data[parent].header.nativeElement.parentNode.style.height, 10);
        if(height <= this.data[name].shrinkexpandHeight && height > this.data[name].shrinkexpandheaderHeight || height == this.data[name].shrinkexpandheaderHeight && this.data[name].contentElem.scrollTop < (this.data[name].shrinkexpandHeight - this.data[name].shrinkexpandheaderHeight)){
            this.data[name].contentElem.scrollTop = this.data[name].shrinkexpandHeight - height;
        }

        /*if (this.data[name].contentElem.scrollTop < (this.data[name].shrinkexpandHeight - this.data[name].shrinkexpandheaderHeight))
           this.data[name].content.scrollToPoint(0, height - (this.data[name].shrinkexpandHeight - this.data[name].shrinkexpandheaderHeight));*/
    }

    public expand(parent, duration = 200) {
        let names = [];
        for (let key in this.data) {
            if (this.data[key].parent == parent)
                names.push(key);
        }
        for(let name of names)
            this.data[name].content.scrollToPoint(0, 0, duration);
    }

    public shrink(parent, duration = 200) {
        let names = [];
        for (let key in this.data) {
            if (this.data[key].parent == parent)
                names.push(key);
        }
        for(let name of names){
            if (this.data[name].contentElem.scrollTop < (this.data[name].shrinkexpandHeight - this.data[name].shrinkexpandheaderHeight))
                this.data[name].content.scrollToPoint(0, (this.data[name].shrinkexpandHeight - this.data[name].shrinkexpandheaderHeight), duration);
        }
    }

    public toggle(parent, duration = 200) {
        let names = [];
        for (let key in this.data) {
            if (this.data[key].parent == parent)
                names.push(key);
        }
        for(let name of names) {
            if (this.data[name].contentElem.scrollTop < (this.data[name].shrinkexpandHeight - this.data[name].shrinkexpandheaderHeight))
                this.data[name].content.scrollToPoint(0, (this.data[name].shrinkexpandHeight - this.data[name].shrinkexpandheaderHeight), duration);
            else
                this.data[name].content.scrollToPoint(0, 0, duration);
        }
    }
}
