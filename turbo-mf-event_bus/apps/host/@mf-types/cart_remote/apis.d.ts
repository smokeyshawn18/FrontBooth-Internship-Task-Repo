
    export type RemoteKeys = 'cart_remote/CartWidget' | 'cart_remote/CartPage';
    type PackageType<T> = T extends 'cart_remote/CartPage' ? typeof import('cart_remote/CartPage') :T extends 'cart_remote/CartWidget' ? typeof import('cart_remote/CartWidget') :any;