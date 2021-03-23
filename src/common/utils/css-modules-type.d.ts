// Stylesheet
declare module '*.scss' {
    interface SubClass {
        [str: string]: string;
    }
    const classNames: SubClass;
    export = classNames;
}
declare module '*.css' {
    interface SubClass {
        [str: string]: string;
    }
    const classNames: SubClass;
    export = classNames;
}

// Image
declare module "*.png"
declare module "*.jpg"
declare module "*.svg"