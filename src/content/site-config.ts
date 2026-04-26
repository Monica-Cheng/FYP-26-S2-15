export const siteConfig = {
  name: "WiseWorkout",
  tagline: "Train smarter. Level up.",
  description:
    "The AI-powered fitness app that builds personalised workout plans, coaches you in real-time, and makes training addictive with XP, badges, and leaderboards.",

  navLinks: [
    { label: "Features", href: "/#features" },
    { label: "How it Works", href: "/#how-it-works" },
    { label: "Team", href: "/team" },
    { label: "Updates", href: "/updates" },
    { label: "About", href: "/about" },
  ],

  features: [
    {
      eyebrow: "WiseCoach AI",
      title: "Know what to do after every workout",
      hook:
        "WiseCoach reads your training performance, fatigue signals, and fitness goals in context.",
      explanation:
        "Instead of leaving you with charts and guesswork, it turns each session into guidance you can act on immediately.",
      outcome:
        "So your next step feels coached, not improvised.",
      visualType: "coach",
      accent: "indigo",
    },
    {
      eyebrow: "Smart workout plans",
      title: "Stop building your training out of fragments",
      hook:
        "WiseWorkout brings your plan, session structure, and progression logic into one guided system.",
      explanation:
        "Your workouts adapt around your goals, schedule, equipment, and progress instead of living across scattered notes and saved videos.",
      outcome:
        "So training feels structured from week to week, not pieced together on the fly.",
      visualType: "plans",
      accent: "purple",
    },
    {
      eyebrow: "Gamification and squads",
      title: "Consistency is easier when progress feels social",
      hook:
        "XP, badges, streaks, and squads turn each session into visible momentum rather than a private checkbox.",
      explanation:
        "You are not only tracking effort for yourself. You can stay accountable through friends, shared progress, and lightweight competition.",
      outcome:
        "So motivation has something to hold onto when discipline dips.",
      visualType: "social",
      accent: "amber",
    },
    {
      eyebrow: "Progress analytics",
      title: "Data matters when it changes your next move",
      hook:
        "Track calories, training volume, running pace, heart rate, and trends in one place.",
      explanation:
        "WiseWorkout does more than visualise numbers. It connects your data back to recovery, coaching, and training decisions.",
      outcome:
        "So progress becomes actionable instead of decorative.",
      visualType: "analytics",
      accent: "teal",
    },
  ],

  stats: [
    { value: "47", label: "Sessions tracked" },
    { value: "38.2km", label: "Distance covered" },
    { value: "7", label: "Day streak record" },
    { value: "1,240kg", label: "Volume lifted" },
  ],
};
