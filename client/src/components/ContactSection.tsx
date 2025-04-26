import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  subject: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setIsSubmitting(true);
      // Send form data to backend
      await apiRequest('POST', '/api/contact', data);
      setIsSuccess(true);
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
        variant: "default",
      });
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="min-h-screen bg-background py-20 relative"
    >
      <div className="container mx-auto px-6">
        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUpVariant}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="inline-block text-3xl md:text-4xl font-orbitron font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Let's Connect!
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4"></div>
        </motion.div>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUpVariant}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <h3 className="font-poppins text-2xl font-semibold text-foreground">Get in Touch</h3>
            <p className="text-foreground/70">
              I'm currently seeking roles in aerospace/materials engineering to pioneer high-performance, sustainable solutions. Whether you have a question, a collaboration idea, or want to discuss opportunities, feel free to reach out!
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full">
                  <i className="fas fa-envelope text-primary"></i>
                </div>
                <div>
                  <p className="text-sm text-foreground/50">Email</p>
                  <a href="mailto:arjithav2911@gmail.com" className="text-primary hover:text-primary/80 transition-colors duration-300">arjithav2911@gmail.com</a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full">
                  <i className="fas fa-phone text-primary"></i>
                </div>
                <div>
                  <p className="text-sm text-foreground/50">Phone</p>
                  <p className="text-primary">+44 7553 689777</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full">
                  <i className="fas fa-map-marker-alt text-primary"></i>
                </div>
                <div>
                  <p className="text-sm text-foreground/50">Location</p>
                  <p className="text-foreground">Sheffield, England, United Kingdom</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full">
                  <i className="fab fa-linkedin-in text-primary"></i>
                </div>
                <div>
                  <p className="text-sm text-foreground/50">LinkedIn</p>
                  <a href="https://www.linkedin.com/in/arjith-a-v-467a49230/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors duration-300">Arjith A V</a>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUpVariant}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-background/30 backdrop-blur-sm p-8 rounded-lg border border-primary/20">
              <h3 className="font-poppins text-xl font-semibold text-foreground mb-6">Send Me a Message</h3>
              
              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="inline-block p-4 bg-secondary/20 rounded-full mb-4">
                    <i className="fas fa-check text-3xl text-secondary"></i>
                  </div>
                  <h3 className="font-poppins text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-foreground/70">Thank you for reaching out. I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground/70 mb-2">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      {...register('name')}
                      className={`w-full px-4 py-3 bg-background/50 border ${errors.name ? 'border-destructive' : 'border-primary/20'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300`} 
                      placeholder="Your Name" 
                    />
                    {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground/70 mb-2">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      {...register('email')}
                      className={`w-full px-4 py-3 bg-background/50 border ${errors.email ? 'border-destructive' : 'border-primary/20'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300`} 
                      placeholder="your.email@example.com" 
                    />
                    {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground/70 mb-2">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      {...register('subject')}
                      className="w-full px-4 py-3 bg-background/50 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300" 
                      placeholder="What is this regarding?" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground/70 mb-2">Message</label>
                    <textarea 
                      id="message" 
                      {...register('message')}
                      rows={4} 
                      className={`w-full px-4 py-3 bg-background/50 border ${errors.message ? 'border-destructive' : 'border-primary/20'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300`} 
                      placeholder="Your message here..." 
                    />
                    {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-foreground font-medium rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg shadow-primary/20 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span>Sending...</span>
                        <i className="fas fa-spinner fa-spin ml-2"></i>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <i className="fas fa-paper-plane ml-2"></i>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Paper plane SVG animation in background */}
      <div className="absolute bottom-0 right-0 pointer-events-none opacity-10 w-full h-full overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <path d="M0,0 L1200,400 L800,800 Z" fill="none" stroke="#57cc99" strokeWidth="2"></path>
        </svg>
      </div>
    </section>
  );
};

export default ContactSection;
