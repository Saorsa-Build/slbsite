import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const resend = new Resend("re_cSPWUYVM_Q8kgEssCwV4JQDKvyq4Pb9vD");
const POST = async ({ request }) => {
  try {
    const { name, email, phone, message } = await request.json();
    await resend.emails.send({
      from: "SLB Designs <onboarding@resend.dev>",
      to: "ethanwalker576@gmail.com",
      replyTo: email,
      subject: `New message from ${name}`,
      html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `
    });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to send message" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
