import transporter from "../config/mailer.js";

const enviarCorreo = async (destinatario, codigo) => {
  await transporter.sendMail({
    from: '"Blog de Recetas" <no-reply@blogrecetas.com>',
    to: destinatario,
    subject: "Código de verificación",
    text: `Tu código de verificación es: ${codigo}`,
    html: `
      <h1>Blog de Recetas</h1>

      <p>Tu código de verificación es:</p>

      <h2>${codigo}</h2>

      <p>Este código es válido durante 10 minutos.</p>
    `,
  });
};

export default enviarCorreo;