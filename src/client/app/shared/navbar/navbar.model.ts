export class NavbarModel {
    sections: Array<NavbarSectionModel>;

    constructor(sectionModules: any[]) {
        this.sections = sectionModules.map(this.createNavbarSectionModel);
    }

    createNavbarSectionModel(section: any): NavbarSectionModel {
        return new NavbarSectionModel(section.displayName, section.modules);
    }

    collapseAllSection() {
        this.sections.forEach(itm => itm.isExpanded = false);
    }
}

export class NavbarSectionModel {
    displayName: string;
    isExpanded: boolean = false;
    items: Array<NavbarItemModel>;

    constructor(displayName: string, modules: any[]) {
        this.displayName = displayName;
        this.items = modules.map(this.createNavbarItemModel);
    }

    createNavbarItemModel(item: any): NavbarItemModel {
        return new NavbarItemModel(item.name, item.path);
    }

}

export class NavbarItemModel {
    path: string;
    displayName: string;

    constructor(name: string, path: string) {
        this.path = path;
        this.displayName = name;
    }
}