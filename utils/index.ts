export const isMethodAllowed = (method: string, methods: string[]): boolean  => {
    return methods.filter(m => m.toLowerCase().trim() === method.toLowerCase().trim()).length > 0;
}

