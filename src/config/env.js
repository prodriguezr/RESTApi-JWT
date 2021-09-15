export const env = {
    Port: process.env.PORT ?? 3000,
    MongoDBUri: process.env.MONGODB_URI ?? '',
    JwtKey: process.env.JWT_KEY ?? '',
    Domain: process.env.DOMAIN,
    TopLevelDomain: process.env.TOP_LEVEL_DOMAIN,
    AdminEmail: 'prodrigu75@prodrigu.cl',
    ROLES: [ "user", "admin" ]
}