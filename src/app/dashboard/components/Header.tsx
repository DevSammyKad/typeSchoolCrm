import { Search } from 'lucide-react';

// import { useTheme } from 'next-themes';
import MobileSidebar from './MobileSidebar';
import KindeUserComponent from '@/components/KindeUserComponent';
import { ThemeToggle } from './ThemeToggle';
// import { EngageSpotNotification } from '@/app/components/dashboard/EngageSpotNotification';
import { Button } from '@/components/ui/button';

export default async function Header() {
  // const { setTheme } = useTheme();

  // const [isFullscreen, setIsFullscreen] = useState(false);

  // function toggleFullScreen() {
  //   if (!document.fullscreenElement) {
  //     document.documentElement
  //       .requestFullscreen()
  //       .then(() => {
  //         setIsFullscreen(true);
  //       })
  //       .catch((err) => {
  //         console.error(
  //           `Error attempting to enable full-screen mode: ${err.message}`
  //         );
  //       });
  //   } else {
  //     document
  //       .exitFullscreen()
  //       .then(() => {
  //         setIsFullscreen(false);
  //       })
  //       .catch((err) => {
  //         console.error(
  //           `Error attempting to exit full-screen mode: ${err.message}`
  //         );
  //       });
  //   }
  // }

  return (
    <div>
      <nav className="mx-2 flex h-24 items-center justify-between shadow-sm">
        <MobileSidebar />
        <div className="relative max-sm:hidden">
          <input
            type="text"
            className="border-border-stroke h-12 w-full rounded-lg border pl-5 text-base font-normal text-slate-500 outline-none transition-all duration-300 ease-in-out lg:placeholder:pl-5"
            placeholder="Search..."
          />
          <Search className="absolute right-4 top-3 h-5 w-5" color="gray" />
        </div>
        <div className="flex items-center justify-center">
          {/* <NotificationPanel /> */}
          {/* <Button
            onClick={toggleFullScreen}
            variant="outline"
            className="mr-2"
            size="icon"
            aria-label={
              isFullscreen ? 'Exit full-screen mode' : 'Enter full-screen mode'
            }
          >
            {isFullscreen ? <Minimize /> : <Maximize />}
          </Button> */}
          {/* <ModeToggle /> */}
          <div className="mr-2 ">
            {' '}
            {/* <Button variant="secondary">
              {' '}
              <EngageSpotNotification /> 
            </Button> */}
          </div>
          <ThemeToggle />
          <KindeUserComponent />
        </div>
      </nav>
      {/* <PlanModal isOpen={showPlanModal} onClose={handleClosePlanModal} />
      <TeamMembers
        isOpen={showTeamMemberDialog}
        onClose={handleHideTeamMemberDialog}
      /> */}
    </div>
  );
}
