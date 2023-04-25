/// <reference types="vite/client" />
declare module '*.styl' {
    const value: { [key: string]: string };
    export default value;
}

declare module '.styl' {
    const value: string;
    export default value;
}
