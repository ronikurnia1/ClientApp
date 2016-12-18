
export class Navigation {
    public isExpanded: boolean = false;
    public children: Array<Navigation> = [];

    constructor(public name: string,
        public displayName: string,
        public path: string,
        public longPath: string,
        public order: number,
        public hidden: boolean,
        public icon: string,
        public paddingLeftPx: number,
        children?: any[]) {
        if (children) {
            let self = this;
            this.children = children.map(function (child) {
                return new Navigation(child.name, child.displayName, child.path,
                    child.longPath, child.order, child.hidden, child.icon, self.paddingLeftPx + 20, child.children);
            });
        }
    }
}
