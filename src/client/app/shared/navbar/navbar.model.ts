export class NavbarModel {
    public sections: Array<NavbarSectionModel>;
    constructor(sectionModules: any[]) {
        this.sections = sectionModules.map(this.createNavbarSectionModel);
    }

    createNavbarSectionModel(section: any): NavbarSectionModel {
        return new NavbarSectionModel(section.displayName, section.modules, section.hidden);
    }

    expandSection(section: string) {
        //console.log("Section:", section);
        this.sections.forEach(itm => itm.isExpanded = itm.displayName == section);
    }
}

export class NavbarSectionModel {
    displayName: string;
    isExpanded: boolean = false;
    items: Array<NavbarItemModel>;
    isHidden: boolean = false;

    constructor(displayName: string, modules: any[], hidden: boolean) {
        this.displayName = displayName;
        this.items = modules.map(this.createNavbarItemModel);
        this.isHidden = hidden;
    }

    createNavbarItemModel(item: any): NavbarItemModel {
        return new NavbarItemModel(item.name, item.path, item.longPath, item.hidden);
    }
}

export class NavbarItemModel {
    path: string;
    displayName: string;
    longPath: string;
    hidden: boolean;

    constructor(name: string, path: string, longPath: string, hidden: boolean) {
        this.path = path;
        this.longPath = longPath;
        this.displayName = name;
        this.hidden = hidden;
    }
}