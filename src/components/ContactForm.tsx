'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, LoaderIcon, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
  phone: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  title?: string;
  subtitle?: string;
  email?: string;
  address?: string;
  className?: string;
}

const ContactForm = ({
  title = "Let's Talk",
  subtitle = 'Have a project in mind? We would love to hear from you.',
  email = 'spencerbrry@gmail.com',
  address = 'Boston, MA',
  className,
}: ContactFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const handleFormSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setIsSubmitted(true);
      setShowSuccess(true);
      form.reset();
      setTimeout(() => setShowSuccess(false), 4500);
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch {
      form.setError('root', {
        message: 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <section className={cn('relative min-h-screen bg-muted/30', className)}>
      <div className="container flex min-h-screen flex-col justify-center py-20">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col justify-center">
            <h1 className="mb-6 text-5xl font-medium tracking-tight md:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="mb-12 text-xl text-muted-foreground md:text-2xl">
              {subtitle}
            </p>
            <div className="space-y-6">
              <a href={`mailto:${email}`} className="group flex items-center gap-4 text-lg">
                <div className="flex size-12 items-center justify-center border border-border bg-background shadow-sm">
                  <Mail className="size-5 text-primary" />
                </div>
                <span className="group-hover:text-primary transition-colors">{email}</span>
              </a>
              <div className="flex items-center gap-4 text-lg">
                <div className="flex size-12 items-center justify-center border border-border bg-background shadow-sm">
                  <MapPin className="size-5 text-primary" />
                </div>
                <span className="text-muted-foreground">{address}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="w-full border border-border bg-background p-8 shadow-md md:p-10"
            >
              <h2 className="mb-8 text-2xl font-semibold">Send a Message</h2>
              {isSubmitted && (
                <div className={cn(
                  'mb-6 transition-opacity duration-500',
                  showSuccess ? 'opacity-100' : 'opacity-0'
                )}>
                  <Alert className="border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400">
                    <CheckCircle2 className="size-4" />
                    <AlertDescription>
                      Thank you! Your message has been sent.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
              <FieldGroup>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Controller
                    control={form.control}
                    name="name"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Name <span className="text-primary">*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Your name"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Email <span className="text-primary">*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          type="email"
                          aria-invalid={fieldState.invalid}
                          placeholder="you@example.com"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
                <Controller
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                      />
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name="message"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Message <span className="text-primary">*</span>
                      </FieldLabel>
                      <Textarea
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Tell us about your project..."
                        rows={5}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                {form.formState.errors.root && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.root.message}
                  </p>
                )}
                <Button
                  size="lg"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <LoaderIcon className="mr-2 size-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </FieldGroup>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ContactForm };