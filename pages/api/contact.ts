import {NextApiHandler} from 'next'
import {mailOptions, transporter} from '../../config/nodemailer'
type Data = {
  name: string
  email: string
  subject: string
  message: string
}
const handler: NextApiHandler<any> = async (req, res) => {
  if (req.method === 'POST') {
    const data: Data = req.body
    if (!data.name || !data.email) {
      return res.status(400).json({message: 'Bad Request'})
    }
    try {
      await transporter.sendMail({
        ...mailOptions,
        subject: data.subject ? data.subject : 'NEWSLETTER',
        text: 'This is test string',
        html: `${
          data.subject
            ? `${data.name} has sent you a message regarding ${data.subject}`
            : 'Please Sign me up for the newsletter'
        }
         ${
           data.message
             ? `The message reads as: 
         Their contact email is ${data.email}`
             : `${data.email}`
         }`,
      })
      return res.status(200).json({sucess: true})
    } catch (error: any) {
      return res.status(400).json({message: error.message})
    }
  }
  return res.status(400).json({message: 'Bad Request'})
}
export default handler
