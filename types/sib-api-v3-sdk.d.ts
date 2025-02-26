declare module 'sib-api-v3-sdk' {
  export interface SendSmtpEmail {
    subject: string
    htmlContent: string
    sender: {
      name: string
      email: string
    }
    to: Array<{
      email: string
      name: string
    }>
    cc?: Array<{
      email: string
      name: string
    }>
    replyTo?: {
      email: string
      name: string
    }
    attachment?: Array<{
      name: string
      content: string
    }>
  }

  export class SendSmtpEmail {
    constructor()
    subject: string
    htmlContent: string
    sender: {
      name: string
      email: string
    }
    to: Array<{
      email: string
      name: string
    }>
    cc?: Array<{
      email: string
      name: string
    }>
    replyTo?: {
      email: string
      name: string
    }
    attachment?: Array<{
      name: string
      content: string
    }>
  }

  export class TransactionalEmailsApi {
    sendTransacEmail(sendSmtpEmail: SendSmtpEmail): Promise<any>
  }

  export class ApiClient {
    static instance: ApiClient
    authentications: {
      'api-key': {
        apiKey: string
      }
    }
  }
} 