export class MissingRequiredPropsVariable extends Error {
    constructor(props: string){
        super(`[react-github-issue] missing required props variable => '${props}'`);
    }
}