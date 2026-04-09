import { NextAuthOptions } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from './prisma'
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM || 'ATLAS OPS <contact@atlasops.fr>',
      sendVerificationRequest: async ({ identifier: email, url, provider }) => {
        await transport.sendMail({
          to: email,
          from: provider.from,
          subject: 'Votre lien de connexion ATLAS OPS',
          html: `
            <!DOCTYPE html>
            <html lang="fr">
            <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
            <body style="font-family:Inter,system-ui,sans-serif;background:#f8fafc;padding:40px 20px;margin:0">
              <div style="max-width:480px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0">
                <div style="background:#0f172a;padding:32px;text-align:center">
                  <div style="display:inline-flex;align-items:center;gap:10px">
                    <div style="width:32px;height:32px;background:#4263eb;border-radius:8px;display:flex;align-items:center;justify-content:center">
                      <span style="color:white;font-weight:800;font-size:13px">AO</span>
                    </div>
                    <span style="color:white;font-weight:600;font-size:16px">ATLAS OPS</span>
                  </div>
                </div>
                <div style="padding:40px 32px">
                  <h1 style="color:#0f172a;font-size:22px;font-weight:800;margin:0 0 12px">Votre lien de connexion</h1>
                  <p style="color:#64748b;font-size:15px;margin:0 0 28px;line-height:1.6">
                    Cliquez sur le bouton ci-dessous pour vous connecter à votre espace ATLAS OPS.
                    Ce lien est valable pendant 24 heures.
                  </p>
                  <a href="${url}" style="display:block;background:#4263eb;color:white;text-decoration:none;text-align:center;padding:14px 24px;border-radius:12px;font-weight:600;font-size:15px">
                    Se connecter →
                  </a>
                  <p style="color:#94a3b8;font-size:12px;margin:24px 0 0;text-align:center">
                    Si vous n'avez pas demandé ce lien, ignorez cet email.
                  </p>
                </div>
                <div style="background:#f8fafc;padding:16px 32px;text-align:center;border-top:1px solid #e2e8f0">
                  <p style="color:#94a3b8;font-size:11px;margin:0">ATLAS OPS · contact@atlasops.fr · atlasops.fr</p>
                </div>
              </div>
            </body>
            </html>
          `,
          text: `Connexion ATLAS OPS\n\nCliquez sur ce lien pour vous connecter :\n${url}\n\nCe lien est valable 24h.`,
        })
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        session.user.role = (user as any).role
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    verifyRequest: '/login/verify',
    error: '/login',
  },
  session: { strategy: 'database' },
}
