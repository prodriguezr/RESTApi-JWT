export const env = {
    Port: process.env.PORT ?? 3000,
    MongoDBUri: process.env.MONGODB_URI ?? '',
    JwtKey: process.env.JWT_KEY ?? ''
}