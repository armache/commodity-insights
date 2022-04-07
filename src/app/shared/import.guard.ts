export class EnsureModuleLoadedOnceGuard{
    constructor(targetModule: any){
        throw new Error(`${targetModule.constructor.name} has already been loaded. 
            Import this module only in the AppModule.`);
    }
}