const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
})

async function main() {
    const email = 'admin@vintvate.com'
    const password = 'adminpassword'
    const hashedPassword = await bcrypt.hash(password, 10)

    console.log('Creating admin user...')

    const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            email,
            password: hashedPassword,
            name: 'Admin User',
            role: 'ADMIN',
        },
    })

    console.log('Admin user created/found:', user.email)
    console.log('Login with: admin@vintvate.com / adminpassword')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
