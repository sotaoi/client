declare const setPackage: (name: string, pkg: any) => void;
declare const getPackage: <PackageType = any>(name: string) => PackageType;
export { setPackage, getPackage };
