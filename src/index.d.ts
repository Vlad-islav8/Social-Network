declare module "*.jpg"; declare module "*.png"
declare module '*.svg' { const content: string; export default content; }
declare module '*.jsx' {
    var _: () => any;
    export default _;
}
declare module '*.module.css';