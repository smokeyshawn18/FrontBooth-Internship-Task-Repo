
    export type RemoteKeys = 'product_remote/ProductCard' | 'product_remote/ProductPage';
    type PackageType<T> = T extends 'product_remote/ProductPage' ? typeof import('product_remote/ProductPage') :T extends 'product_remote/ProductCard' ? typeof import('product_remote/ProductCard') :any;