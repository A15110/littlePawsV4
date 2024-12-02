interface EmailParams {
  to: string;
  subject: string;
  content: string;
}

export async function sendEmail({ to, subject, content }: EmailParams) {
  try {
    const response = await fetch('https://api.resend.com/v1/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Little Paws JAX <noreply@littlepawsjax.com>',
        to,
        subject,
        text: content
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    // Don't throw error to prevent booking process from failing
    return false;
  }
}