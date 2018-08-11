const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const creds = require('../../config/email_cred');

var transport = {
    host: 'smtp.gmail.com',
    auth: {
        user: creds.account,
        pass: creds.password
    }
}

var transporter = nodemailer.createTransport(transport);

// verify connection configuration
transporter.verify(function(error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take our messages');
    }
 });

// @route Post api/contact/contact_us
// @desc send feed back
// @access Public
router.post('/contact_us', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const service = req.body.service;
    const message = req.body.message;

    const output_to_server = `
    <h3>Details</h3>
        Name: ${name}
    <br>Email: ${email}
    <br>Phone: ${phone}
    <br>Service: ${service}
    <br>
    <h3>Message:</h3>
    <p>${message}</p>
    `

    const output_to_client = `
    <p>Hi, ${name}</p>
    <p>The following request has been received:</p>
    <p>Message: ${message}</p>
    <p>Required Service: ${service}</p>
    <p>Thank you for your feedback! We will get back to you as soon as possible.</p>
    <p>Best regards,</p>
    <p>wripple</p>
    `

    const mail_to_server = {
        from: '"wripple" <wrippleinc@gmail.com>',
        to: 'wrippleinc@gmail.com',
        subject: `New message from ${name}`,
        html: output_to_server
    }

    const mail_to_client = {
        from: '"wripple" <wrippleinc@gmail.com>',
        to: `${email}`,
        subject: `We have received your request`,
        html: output_to_client
    }

    transporter.sendMail(mail_to_server, (err, data) => {
        if (err) {
            console.log("failed to deliver to server")
        } else {
            console.log("success delivery to server")
        }
    })

    transporter.sendMail(mail_to_client, (err, data) => {
        if (err) {
            console.log("failed to deliver to client")
        } else {
            console.log("success delivery to client")
        }
    })
});

module.exports = router;