export interface Attribute {
    type        : 'object' | 'number' | 'boolean' | 'string' | string[],
    required?   : boolean,
    value?      : any
}

export interface AttributeSetup {
    [name : string] : Attribute 
}