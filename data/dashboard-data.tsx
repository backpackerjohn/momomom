
import React from 'react';

const topLeftSubtitle = (
    <>
        transform <span className="text-accent-text">big task</span> into <br />{' '}
        <span className="text-accent-text">small steps</span>
    </>
);

const topRightSubtitle = (
    <>
        Track the Momentum <br /> You've <span className="text-accent-text">Gained</span>
    </>
);

const bottom1Subtitle = (
    <>
        A Place to <span className="text-text-on-dark-light">Organize</span> <br /> Your Random{' '}
        <span className="text-text-on-dark-light">Thoughts</span>.
    </>
);

const bottom2Subtitle = (
    <>
        Easy Things to <br /> Knock Out <span className="text-accent-text">Today</span>.
    </>
);

const bottom3Subtitle = (
    <>
        Smart Reminders for <br /> Building Healthy{' '}
        <span className="text-accent-text">Habits</span>.
    </>
);


export const cardData = {
  topLeft: {
    className: "bg-[#4A4E5A] hover:shadow-2xl focus-within:shadow-2xl hover:shadow-indigo-500/10 focus-within:shadow-indigo-500/10 h-auto md:h-full min-h-[16rem] p-8 sm:p-10 md:p-12 lg:p-16 flex flex-col justify-center",
    title: "MOMENTUM",
    titleClassName: "text-5xl sm:text-6xl md:text-7xl text-text-on-dark",
    subtitle: topLeftSubtitle,
    subtitleClassName: "mt-4 text-xl sm:text-2xl md:text-3xl text-text-on-dark-muted max-w-md",
    links: [
      { href: "#", text: "Create a Momentum Map", ariaLabel: "Create a new Momentum Map", className: "text-accent-text text-xl font-normal underline underline-offset-4 transition-colors hover:text-accent-secondary" },
      { pageId: "maps", text: "My Maps", ariaLabel: "View your existing Momentum Maps", className: "text-accent-text text-xl font-normal underline underline-offset-4 transition-colors hover:text-accent-secondary" },
    ],
    linksContainerClassName: "flex items-center space-x-8 mt-12",
    style: {
      backgroundImage: "url('https://raw.githubusercontent.com/backpackerjohn/images/8132cf1a558b709d0e32dccda94e70a6c7d20a28/backpackerstephen_Create_a_logo_for_an_Adhd_Productivity_App__a8238f01-c97f-4b2c-b861-1b74cffc413a_0%20(1).png')",
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 5rem center',
      backgroundSize: 'auto 110%',
    },
  },
  topRight: {
    className: "bg-gradient-to-br from-secondary-primary to-secondary-secondary hover:shadow-2xl focus-within:shadow-2xl hover:shadow-cyan-500/10 focus-within:shadow-cyan-500/10 shadow-[inset_0_4px_15px_rgba(255,255,255,0.6)] h-full min-h-[16rem] p-8 flex flex-col justify-center",
    title: "Progress",
    titleClassName: "text-3xl sm:text-4xl text-text-on-light-primary",
    subtitle: topRightSubtitle,
    subtitleClassName: "mt-4 text-xl text-text-on-light-muted max-w-md",
    links: [
        { href: "#", text: "See What You've Achieved", ariaLabel: "View your progress and achievements", className: "mt-12 text-xl text-text-on-light-primary font-normal underline underline-offset-4 transition-colors hover:text-dark-secondary" }
    ]
  },
  bottom: [
    {
      className: "bg-gradient-to-br from-accent-primary to-accent-secondary hover:shadow-2xl focus-within:shadow-2xl hover:shadow-orange-500/20 focus-within:shadow-orange-500/20 h-[16rem] p-8 flex flex-col justify-between",
      title: "Brain Dump",
      titleClassName: "text-3xl sm:text-4xl text-text-on-dark",
      subtitle: bottom1Subtitle,
      subtitleClassName: "mt-4 text-xl text-text-on-dark-light max-w-md",
      links: [
        { href: "#", text: "Clean up my brain", ariaLabel: "Open Brain Dump to organize your thoughts", className: "text-xl text-text-on-dark font-normal underline underline-offset-4 transition-colors hover:text-white" }
      ],
      illustrationSrc: "https://raw.githubusercontent.com/backpackerjohn/images/fcd0d43ce51eb78a7572ae1fd6f5198817000052/Brain%20Dump%20Image.png",
      illustrationClassName: "absolute top-1/2 -translate-y-1/2 -right-4 h-[60%] w-auto",
    },
    {
      className: "bg-gradient-to-br from-light-primary to-light-secondary hover:shadow-2xl focus-within:shadow-2xl hover:shadow-yellow-800/10 focus-within:shadow-yellow-800/10 h-[16rem] p-8 flex flex-col justify-between",
      title: "Today",
      titleClassName: "text-3xl sm:text-4xl text-text-on-light-primary",
      subtitle: bottom2Subtitle,
      subtitleClassName: "mt-4 text-xl text-text-on-light-muted max-w-md",
      links: [
          { href: "#", text: "Get Things Done Today", ariaLabel: "View tasks to do today", className: "text-xl text-text-on-light-primary font-normal underline underline-offset-4 transition-colors hover:text-dark-secondary" }
      ],
      illustrationSrc: "https://raw.githubusercontent.com/backpackerjohn/images/fcd0d43ce51eb78a7572ae1fd6f5198817000052/Today%20Image.png",
      illustrationClassName: "absolute top-1/2 -translate-y-1/2 -right-8 h-[90%] w-auto",
    },
    {
      className: "bg-gradient-to-br from-dark-primary to-dark-secondary hover:shadow-2xl focus-within:shadow-2xl hover:shadow-indigo-500/10 focus-within:shadow-indigo-500/10 h-[16rem] p-8 flex flex-col justify-between",
      title: "Scheduler",
      titleClassName: "text-3xl sm:text-4xl text-text-on-dark",
      subtitle: bottom3Subtitle,
      subtitleClassName: "mt-4 text-xl text-text-on-dark-muted max-w-md",
      links: [
          { href: "#", text: "Let's Build Healthy Habits", ariaLabel: "Open the scheduler to build healthy habits", className: "text-xl text-accent-text font-normal underline underline-offset-4 transition-colors hover:text-accent-secondary" }
      ],
      illustrationSrc: "https://raw.githubusercontent.com/backpackerjohn/images/fcd0d43ce51eb78a7572ae1fd6f5198817000052/Smart%20Reminders%20logo.png",
      illustrationClassName: "absolute top-1/2 -translate-y-1/2 -right-4 h-[70%] w-auto",
    }
  ]
};
