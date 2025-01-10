import CreateOrganizationPage from '@/components/CreateOrganization';

import DotPattern from '@/components/magicui/dot-pattern';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  RegisterLink,
  LoginLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
// import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Features from '../components/websitecomp/Features';
import BentoGrid from '../components/websitecomp/BentoGrid';
import Testimonials from '../components/websitecomp/Testimonials';
import { ThemeToggle } from '../dashboard/components/ThemeToggle';
import { Spotlight } from '@/components/magicui/Spotlight';
import { TextScramble } from '@/components/ui/text-scramble';
import { TextEffectWithExit } from '@/components/TextEffectWithExit';
import Footer from '../components/websitecomp/Footer';

export default async function IndexPage() {
  // const { isAuthenticated } = getKindeServerSession();

  // if (!(await isAuthenticated())) {
  //   redirect('/api/auth/login');
  // }
  return (
    <main className="p-5">
      <Spotlight className="sm:ml-[15%] md:ml-[25%]" />
      <header className="flex items-center justify-between my-3">
        <div>
          <h1>Next.js + RSAI CRM</h1>
        </div>

        <div className="flex items-center gap-5">
          <ThemeToggle />
          <LoginLink>
            <Button>Sign in</Button>
          </LoginLink>
          <RegisterLink>
            <Button variant="ghost">Sign up</Button>
          </RegisterLink>
        </div>
      </header>

      <div className="relative flex h-[500px]  w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
        <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white">
          School CRM All in One Place
        </p>
        <TextScramble
          className="font-mono text-sm my-5 h-3"
          duration={1.2}
          characterSet=". "
        >
          Simplify Operations, Foster Growth, Empower Success
        </TextScramble>

        <div className="h-5">
          <TextEffectWithExit />
        </div>

        <div className="my-4 z-10 flex items-center justify-between gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Get Early Access</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <CreateOrganizationPage />
            </DialogContent>
          </Dialog>

          <Button variant="outline" className="z-10">
            Download PDF
          </Button>
        </div>
        <DotPattern
          className={cn(
            '[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]'
          )}
        />
      </div>
      <BentoGrid />

      <Features />

      <Testimonials />
      <div className="my-5">{/* <BentoGrid /> */}</div>
      <Footer />
    </main>
  );
}
