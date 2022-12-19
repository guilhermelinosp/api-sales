/* eslint-disable @typescript-eslint/no-extraneous-class */

import nodemailer from 'nodemailer'
import { HandlebarsTemplate } from './handlebars.template'

interface ITemplates {
  file: string
  variables: {
    [key: string]: string | number
  }
}

interface IMailContact {
  name: string
  email: string
}

interface ISendMail {
  to: IMailContact
  from?: IMailContact
  subject: string
  template: ITemplates
}

export default class Mail {
  static async sendMail({ to, from, subject, template }: ISendMail): Promise<void> {
    const mailTemplate = new HandlebarsTemplate()

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    const message = {
      from: {
        name: from?.name ?? 'Team API',
        address: from?.email ?? 'suport@teamapi.com.br'
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await mailTemplate.parse(template)
    }

    transporter.sendMail(message, (err, info) => {
      if (err != null) {
        console.log(err)
      } else {
        console.log(info)
      }
    })
  }
}
