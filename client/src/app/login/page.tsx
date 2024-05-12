import LoginForm from '@/components/form/LoginForm'

export default function Login() {
   return (
      <section className="flex lg:flex-row flex-col justify-center min-h-[88vh] p-6">
         <LoginForm />
      </section>
   )
}

export function generateMetadata() {
   return {
      title: 'Login | Getogether',
      description: "Login to Getogether. Let's get started with Getogether.",
      image: '/next.svg',
      url: 'https://getogether.com/login',
   }
}
