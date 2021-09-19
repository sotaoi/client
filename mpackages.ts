const mpackages: { [key: string]: any } = {};

const setPackage = (name: string, pkg: any): void => {
  mpackages[name] = pkg;
};

const getPackage = <PackageType = any>(name: string): PackageType => {
  return mpackages[name];
};

export { setPackage, getPackage };
