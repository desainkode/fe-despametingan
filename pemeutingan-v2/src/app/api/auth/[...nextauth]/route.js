import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  site: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        nik: { label: 'NIK', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        // Logika login menggunakan NIK warga
        // Contoh sederhana untuk testing:
        if (credentials.nik === '1234567890123456' && credentials.password === 'pameutingan123') {
          return Promise.resolve({ 
            id: '1', 
            name: 'Warga Contoh', 
            nik: credentials.nik 
          });
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  pages: {
    signIn: '/layanan-masyarakat/signin',
  },
  session: {
    strategy: 'jwt',
  }
});
export { handler as GET, handler as POST };
